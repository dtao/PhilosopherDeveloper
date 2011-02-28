using System;
using System.Collections.Generic;
using System.Threading;

namespace ConcurrentList.Threading
{
    public static class CrazyParallel
    {
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

            return new ThreadLauncher(new Thread(loop));
        }

        public static IDisposable For(int fromInclusive, int toExclusive, Action<int> action)
        {
            var threads = new List<Thread>(toExclusive - fromInclusive);
            for (int i = fromInclusive; i < toExclusive; i++)
            {
                int local = i;
                threads.Add(new Thread(() => { Thread.Sleep(100); action(local); }));
            }

            return new ThreadLauncher(threads);
        }

        public static IDisposable ForEach<T>(IEnumerable<T> source, Action<T> action)
        {
            var threads = new List<Thread>();
            foreach (T element in source)
            {
                T local = element;
                threads.Add(new Thread(() => { Thread.Sleep(100); action(local); }));
            }

            return new ThreadLauncher(threads);
        }
    }
}
