using System;
using System.Threading;

namespace ConcurrentList
{
    public sealed class ConcurrentList<T> : ThreadSafeList<T>
    {
        static readonly int[] Sizes;
        static readonly int[] Counts;

        static ConcurrentList()
        {
            Sizes = new int[32];
            Counts = new int[32];

            int size = 1;
            int count = 1;
            for (int i = 0; i < Sizes.Length; i++)
            {
                Sizes[i] = size;
                Counts[i] = count;

                if (i < Sizes.Length - 1)
                {
                    size *= 2;
                    count += size;
                }
            }
        }

        int m_index;
        int m_fuzzyCount;
        T[][] m_array;

        public ConcurrentList()
        {
            m_array = new T[32][];
        }

        public override T this[int index]
        {
            get
            {
                if (index < 0 || index >= Count)
                {
                    throw new ArgumentOutOfRangeException("index");
                }

                int arrayIndex = GetArrayIndex(index + 1);
                if (arrayIndex > 0)
                {
                    index -= ((int)Math.Pow(2, arrayIndex) - 1);
                }

                return m_array[arrayIndex][index];
            }
            set
            {
                if (index < 0 || index >= Count)
                {
                    throw new ArgumentOutOfRangeException("index");
                }

                int arrayIndex = GetArrayIndex(index + 1);
                if (arrayIndex > 0)
                {
                    index -= ((int)Math.Pow(2, arrayIndex) - 1);
                }

                m_array[arrayIndex][index] = value;
            }
        }

        public override int Count
        {
            get
            {
                int count = m_index;

                if (count > m_fuzzyCount)
                {
                    SpinWait.SpinUntil(() => count <= m_fuzzyCount);
                }

                return count;
            }
        }

        public override void Add(T element)
        {
            int index = Interlocked.Increment(ref m_index) - 1;
            int adjustedIndex = index;

            int arrayIndex = GetArrayIndex(index + 1);
            if (arrayIndex > 0)
            {
                adjustedIndex -= Counts[arrayIndex - 1];
            }

            if (m_array[arrayIndex] == null)
            {
                int arrayLength = Sizes[arrayIndex];
                Interlocked.CompareExchange(ref m_array[arrayIndex], new T[arrayLength], null);
            }

            m_array[arrayIndex][adjustedIndex] = element;

            Interlocked.Increment(ref m_fuzzyCount);
        }
        public override void CopyTo(T[] array, int index)
        {
            if (array == null)
            {
                throw new ArgumentNullException("array");
            }

            int count = Count;
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

        private static int GetArrayIndex(int count)
        {
            int arrayIndex = 0;

            if ((count & 0xFFFF0000) != 0)
            {
                count >>= 16;
                arrayIndex |= 16;
            }

            if ((count & 0xFF00) != 0)
            {
                count >>= 8;
                arrayIndex |= 8;
            }

            if ((count & 0xF0) != 0)
            {
                count >>= 4;
                arrayIndex |= 4;
            }

            if ((count & 0xC) != 0)
            {
                count >>= 2;
                arrayIndex |= 2;
            }

            if ((count & 0x2) != 0)
            {
                count >>= 1;
                arrayIndex |= 1;
            }

            return arrayIndex;
        }
    }
}
