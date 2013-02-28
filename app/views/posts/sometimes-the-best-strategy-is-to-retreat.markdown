I have a few remarks to make about [my `ConcurrentList<T>` class](http://dtao.github.com/ConcurrentList/), which I have written about a [couple](/posts/how-to-build-a-thread-safe-lock-free-resizable-array.html) of [times](/posts/boy-can-dream.html) already.

*What, are you "retreating" from your concurrent list idea?* In a way, yes. Let me explain. From the beginning, my concept of the usefulness of a lock-free `IList<T>` implementation was that it would scale better than using a `List<T>` plus `lock` statements by eliminating contention when many threads are accessing the list concurrently.

Is this actually true? Accessing the list `how`?

Since a concurrent implementation of `Insert`, `RemoveAt` etc. is not supported in `ConcurrentList<T>`, there are really only a few operations that need to be considered:

* Getting/setting an item at a specified index
* Adding to the list
* Iterating over the list

Critically, I think the assumption is that one would need a lock-free data structure to optimize the scenario where multiple threads may be *reading* from the list (via accessing items at random indexes) while one or more other threads are *adding* to it. **I actually don't think you need a lock-free data structure for this at all.**

Here's the thing: if you've got a `List<T>`, and you synchronize all calls to `Add` with, e.g., a `lock` statement, **you don't need to also synchronize reads**. They will *always* be thread-safe. Accessing an element at an index of a `List<T>` that is *only* growing with calls to `Add` *will* work from multiple threads. If you are skeptical, consider what actually happens when `Add` is called (**warning: reliance upon specific implementation details ahead!**):

1. The `List<T>` gets the next available index in its internal array.
2. If the index is beyond the end of the array:
  1. A new array is allocated.
  2. The elements of the current array are copied over.
  3. A reference to this new array is assigned to the `List<T>`'s internal array field.
3. The element in the array at the index found in step 1 is assigned to the input value.

Assuming an always-accurate return value for `Count`, and assuming the above process is always synchronized, **there is no reason why threads reading from the list need to be synchronized**.

To demonstrate this, I added the `SynchronizedList<T>` class to [my GitHub repo](https://github.com/dtao/ConcurrentList). Take a look and see for yourself: this class, which simply uses a `List<T>` internally and synchronizes calls to `Add` while exposing everything else *without synchronization*, passes all unit tests.

Now, I told a little fib moments ago. I'm really *not* giving up on the concurrent list idea; rather, I am rethinking what its actual usefulness is. I still think there is value to having a lock-free `Add` implementation, which is **guaranteed contention-free growth**. On a plain `List<T>` the cost of `Add` is *very* small *most* of the time; but every now and then, it actually requires an expensive array allocation + full copy. In something like a real-time system, this might be a very bad thing to synchronize; the thread contention could create a pretty large albeit ephemeral bottleneck. So maybe the `ConcurrentList<T>` class can be a very specialized collection for scenarios like this.

I don't know. To be honest, though I've put a lot of thought into this topic, I haven't put a lot of thought into *this* blog post specifically; so it's possible I have not really provided a very compelling or convincing explanation of my feelings on the matter.

What I do know is this: *next* up, I'm going to propose a data structure which leverages the concept of fast thread-safe adds (whether synchronized via locking or lock-free) to provide O(1) random inserts and removals. Pretty exciting, huh?
