using System;
using System.Collections.Generic;
using System.Threading;

namespace ConcurrentList
{
    public class ConcurrentList<T> : IList<T>
    {
        int m_index;
        int m_fuzzyCount;
        int m_concreteCount;
        T[][] m_array;

        public ConcurrentList()
        {
            m_array = new T[32][];
        }

        public T this[int index]
        {
            get
            {
                if (index < 0 || index >= m_fuzzyCount)
                {
                    throw new ArgumentOutOfRangeException("index");
                }

                int arrayIndex = GetArrayIndex(index);
                if (arrayIndex > 0)
                {
                    index -= ((int)Math.Pow(2, arrayIndex) - 1);
                }

                return m_array[arrayIndex][index];
            }
            set
            {
                if (index < 0 || index >= m_fuzzyCount)
                {
                    throw new ArgumentOutOfRangeException("index");
                }

                int arrayIndex = GetArrayIndex(index);
                if (arrayIndex > 0)
                {
                    index -= ((int)Math.Pow(2, arrayIndex) - 1);
                }

                m_array[arrayIndex][index] = value;
            }
        }

        public int Count
        {
            get
            {
                int count = m_index;

                SpinWait.SpinUntil(() => m_fuzzyCount >= count);

                return count;
            }
        }

        public void Add(T element)
        {
            int index = Interlocked.Increment(ref m_index) - 1;
            int adjustedIndex = index;

            int arrayIndex = GetArrayIndex(index);
            if (arrayIndex > 0)
            {
                adjustedIndex -= ((int)Math.Pow(2, arrayIndex) - 1);
            }

            if (m_array[arrayIndex] == null)
            {
                int arrayLength;

                if (arrayIndex > 0 && m_array[arrayIndex - 1] != null)
                {
                    arrayLength = m_array[arrayIndex - 1].Length * 2;
                }
                else
                {
                    arrayLength = (int)Math.Pow(2, arrayIndex);
                }

                Interlocked.CompareExchange(ref m_array[arrayIndex], new T[arrayLength], null);
            }

            m_array[arrayIndex][adjustedIndex] = element;

            Interlocked.Increment(ref m_fuzzyCount);
        }

        public bool Contains(T element)
        {
            return IndexOf(element) != -1;
        }

        public int IndexOf(T element)
        {
            IEqualityComparer<T> equalityComparer = EqualityComparer<T>.Default;

            for (int i = 0; i < m_fuzzyCount; i++)
            {
                if (equalityComparer.Equals(this[i], element))
                {
                    return i;
                }
            }

            return -1;
        }

        public void CopyTo(T[] array, int index)
        {
            int count = m_fuzzyCount;
            if (array == null)
            {
                throw new ArgumentNullException("array");
            }
            if (array.Length - index < count)
            {
                throw new ArgumentException("There is not enough available space in the destination array.");
            }

            int arrayIndex = 0;
            int elementsRemaining = count;
            while (elementsRemaining > 0)
            {
                T[] source = m_array[arrayIndex++];
                int elementsToCopy = Math.Min(source.Length, elementsRemaining);
                int startIndex = count - elementsRemaining;

                Array.Copy(source, 0, array, startIndex, elementsToCopy);

                elementsRemaining -= elementsToCopy;
            }
        }

        public IEnumerator<T> GetEnumerator()
        {
            int count = Count;
            for (int i = 0; i < count; i++)
            {
                yield return this[i];
            }
        }

        private void UpdateCount()
        {
            int fuzzyCount = Interlocked.Increment(ref m_fuzzyCount);
            if (fuzzyCount == m_index)
            {
                int initialCount, recentCount;
                do
                {
                    initialCount = m_concreteCount;
                    if (fuzzyCount < initialCount)
                    {
                        break;
                    }

                    recentCount = Interlocked.CompareExchange(ref m_concreteCount, fuzzyCount, initialCount);
                }
                while (initialCount != recentCount);
            }
        }

        private static int GetArrayIndex(int index)
        {
            double n = Math.Log(index + 1, 2);
            return (int)Math.Truncate(n);
        }

        void IList<T>.Insert(int index, T element)
        {
            throw new NotSupportedException();
        }

        void IList<T>.RemoveAt(int index)
        {
            throw new NotSupportedException();
        }

        bool ICollection<T>.IsReadOnly
        {
            get { return false; }
        }

        void ICollection<T>.Clear()
        {
            throw new NotSupportedException();
        }

        bool ICollection<T>.Remove(T element)
        {
            throw new NotSupportedException();
        }

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
