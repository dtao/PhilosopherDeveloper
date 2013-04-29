In the course of profiling some performance-critical code today, I happened upon a method that gets called a *lot* in my company's application, which allocates new array objects on every run.

I thought, hey, maybe this could be optimized: instead of allocating a new array on every call, I could use [`[ThreadStatic]`](http://msdn.microsoft.com/en-us/library/system.threadstaticattribute.aspx) and re-use the same array whenever possible (each thread gets one, so race conditions shouldn't be an issue).

I [asked the community at Stack Overflow about this](http://stackoverflow.com/questions/4864974/using-threadstatic-to-replace-expensive-locals-good-idea), and got basically the answer I expected: **profile and see**. So that's what I did!

### The Test

Below is a relatively short program I wrote to test the performance difference between these two scenarios, both in terms of execution speed and that of memory allocation.

~~~{: lang=csharp }
using System;
using System.Diagnostics;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace ThreadStaticTest
{
    class PerformanceBenchmark
    {
        public PerformanceBenchmark(string name, TimeSpan elapsed, int gen0, int gen1, int gen2)
        {
            Name = name;
            Elapsed = elapsed;
            GCCollections = new int[] { gen0, gen1, gen2 };
        }

        public string Name { get; private set; }
        public TimeSpan Elapsed { get; private set; }
        public int[] GCCollections { get; private set; }
    }

    class Program
    {
        const int N = 50;
        const int Repetitions = 1000000;

        [ThreadStatic]
        static double[] _array;

        static void Main(string[] args)
        {
            Console.WriteLine("CPU count: {0}", Environment.ProcessorCount);

            Console.WriteLine("Testing local array allocation...");
            PerformanceBenchmark localArrayPerf = Benchmark(() => CalculateSum(AllocateArray()), Repetitions);

            Console.WriteLine("Testing ThreadStatic attribute...");
            PerformanceBenchmark threadStaticPerf = Benchmark(() => CalculateSum(GetThreadStaticArray()), Repetitions);

            Console.WriteLine("Finished! results:");
            Console.WriteLine();

            PrintBenchmark(localArrayPerf);

            PrintBenchmark(threadStaticPerf);

            Console.ReadLine();
        }

        static void PrintBenchmark(PerformanceBenchmark benchmark)
        {
            Console.WriteLine
            (
                "Results for '{0}':\n{1} ms, GC[{2}/{3}/{4}]",
                benchmark.Name,
                benchmark.Elapsed.TotalMilliseconds,
                benchmark.GCCollections[0],
                benchmark.GCCollections[1],
                benchmark.GCCollections[2]
            );
        }

        static PerformanceBenchmark Benchmark(Expression<Action> expression, int repetitions)
        {
            Action action = expression.Compile();

            GC.Collect();

            int gen0 = GC.CollectionCount(0);
            int gen1 = GC.CollectionCount(1);
            int gen2 = GC.CollectionCount(2);

            Stopwatch stopwatch = Stopwatch.StartNew();
            Parallel.For(0, repetitions, i => action());
            stopwatch.Stop();

            gen0 = GC.CollectionCount(0) - gen0;
            gen1 = GC.CollectionCount(1) - gen1;
            gen2 = GC.CollectionCount(2) - gen2;

            return new PerformanceBenchmark(expression.ToString(), stopwatch.Elapsed, gen0, gen1, gen2);
        }

        static double CalculateSum(double[] array)
        {
            double sum = 0.0;
            for (int i = 0; i < array.Length; ++i)
            {
                sum += i;
            }

            return sum;
        }

        static double[] AllocateArray()
        {
            var values = new double[N];
            for (int i = 0; i < values.Length; ++i)
            {
                values[i] = (double)i;
            }

            return values;
        }

        static double[] GetThreadStaticArray()
        {
            if (_array == null)
            {
                _array = AllocateArray();
            }

            return _array;
        }
    }
}
~~~

### The Result

Here is the output I got from the above test on a 24-core server:

    CPU count: 24
    Testing local array allocation...
    Testing ThreadStatic attribute...
    Finished! results:

    Results for '() => CalculateSum(AllocateArray())':
    **2183.7554 ms, GC[616/1/0]**
    Results for '() => CalculateSum(GetThreadStaticArray())':
    **70.9415 ms, GC[0/0/0]**

*Wow*, that's a big difference. Using `[ThreadStatic]` fields performed something like **30x faster**, and without *any* garbage collections compared to using local arrays instantiated on every call (which also caused **616** generation-0 GCs and even a generation-1 GC!).

So yeah, this was definitely worth trying out. Am I saying that you should replace all of your local variables with `[ThreadStatic]` fields? Of course not. It will naturally depend on the "cost" of the object being instantiated; in my test above, I deal with `double[]` arrays of 50-elements. That mirrors the method I originally set out to optimize. To me, that is something like a "medium" cost. But there are other factors to consider as well, as mentioned by some Stack Overflow users:

- This approach could definitely go horribly wrong with recursion. Keep that in mind.
- Using `[ThreadStatic]` is a messy implementation detail that should *definitely* be encapsulated, invisible to any external code (but that's just common sense, right?).
- This approach is far less obvious and therefore arguably less comprehensible/maintainable than the more straightforward local allocation approach. Whether it's an appropriate measure to take in a given context will depend on how critical performance is in that context, among other factors.

That said, I will definitely add this trick to my tool belt for cases like this that I might encounter in the future. The magnitude of the performance improvement was, to me, really quite shocking.
