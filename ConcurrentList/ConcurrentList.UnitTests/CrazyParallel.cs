using System;
using System.Collections.Generic;
using System.Threading;

namespace ConcurrentList.UnitTests
{
    static class CrazyParallel
    {
        class ThreadJoiner : IDisposable
        {
            IEnumerable<Thread> m_threads;

            public ThreadJoiner(IEnumerable<Thread> threads)
            {
                m_threads = threads;
            }

            public ThreadJoiner(params Thread[] threads) : this((IEnumerable<Thread>)threads)
            { }

            public void Dispose()
            {
                IEnumerable<Thread> threads = Interlocked.Exchange(ref m_threads, null);
                if (threads != null)
                {
                    foreach (Thread t in threads)
                    {
                        if (t != null)
                        {
                            t.Join();
                        }
                    }
                }
            }
        }

        public static IDisposable Do(Action action, TimeSpan timeout)
        {
            DateTime startTime = DateTime.Now;

            ThreadStart loop = () =>
            {
                while (DateTime.Now - startTime < timeout)
                {
                    action();
                }
            };

            var t = new Thread(loop);
            t.Start();

            return new ThreadJoiner(t);
        }

        public static IDisposable For(int fromInclusive, int toExclusive, Action<int> action)
        {
            var threads = new List<Thread>(toExclusive - fromInclusive);
            for (int i = fromInclusive; i < toExclusive; i++)
            {
                int local = i;
                threads.Add(new Thread(() => { Thread.Sleep(100); action(local); }));
            }

            foreach (Thread t in threads)
            {
                t.Start();
            }

            return new ThreadJoiner(threads);
        }

        public static IDisposable ForEach<T>(IEnumerable<T> source, Action<T> action)
        {
            var threads = new List<Thread>();
            foreach (T element in source)
            {
                T local = element;
                threads.Add(new Thread(() => { Thread.Sleep(100); action(local); }));
            }

            foreach (Thread t in threads)
            {
                t.Start();
            }

            return new ThreadJoiner(threads);
        }
    }
}
