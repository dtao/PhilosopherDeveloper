using System;
using System.Collections.Generic;
using System.Threading;

namespace ConcurrentList.Threading
{
    class ThreadLauncher : IDisposable
    {
        IEnumerable<Thread> m_threads;
        ManualResetEvent m_allThreadsLaunched;

        public ThreadLauncher(IEnumerable<Thread> unstartedThreads)
        {
            m_threads = unstartedThreads;
            m_allThreadsLaunched = new ManualResetEvent(false);

            ThreadPool.QueueUserWorkItem(LaunchThreads, m_threads);
        }

        public ThreadLauncher(params Thread[] threads) : this((IEnumerable<Thread>)threads)
        { }

        public void Dispose()
        {
            using (ManualResetEvent allThreadsLaunched = m_allThreadsLaunched)
            {
                if (allThreadsLaunched == null)
                {
                    return;
                }

                allThreadsLaunched.WaitOne();
                m_allThreadsLaunched = null;

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

        void LaunchThreads(object threadsObject)
        {
            try
            {
                var threads = threadsObject as IEnumerable<Thread>;
                if (threads != null)
                {
                    foreach (Thread t in threads)
                    {
                        if (t != null)
                        {
                            t.Start();
                        }
                    }
                }
            }
            finally
            {
                m_allThreadsLaunched.Set();
            }
        }
    }
}
