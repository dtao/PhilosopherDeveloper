A [developer on Stack Overflow](http://stackoverflow.com/questions/2776130/c-implicit-conversions) was recently perplexed by the fact that the implicit operator he'd defined for his custom type didn't seem to be working.

The scenario was this: the developer had a `DataTable` whose columns corresponded to the names of properties for a certain type of object. He had a bunch of `PropertyInfo` objects, one of which was of type `Currency` (his custom type with the implicit operator), and he was trying to read the table to get the value of each of his object's properties. Obviously, since he couldn't put a `Currency` object in the `DataTable`, he used `decimal` values instead, and defined an implicit conversion from `decimal` to `Currency`. Seems pretty smart, right?

Here's the code he posted:

~~~{: lang=csharp }
foreach (PropertyInfo p in props)
{
    p.SetValue(this, table.Rows[0][p.Name], null);
}
~~~

When it came to the `Currency` property, the program was throwing an `ArgumentException`. *WTF?* this developer thought. *What happened to my implicit operator?*

Well, here's the first problem: the code above tries to pass a `decimal` to a call to `SetValue` for a `PropertyInfo` object whose `PropertyType` is `Currency`. So, presumably, the code could be fixed like this:

~~~{: lang=csharp }
foreach (PropertyInfo p in props)
{
    Currency c = (Currency)table.Rows[0][p.Name];
    p.SetValue(this, c, null);
}
~~~

That should work, right?

Well, no. Here's the thing: the `implicit` operator, as you may know, allows you to convert from one type to another without using an explicit cast. However, whenever you perform such a conversion, you're still dealing with two fundamentally different types.

When a value type is boxed inside a `System.Object`, *using* that value requires first *unboxing* it -- **as its original type**. Many C# developers are surprised to learn that the following code throws an exception:

~~~{: lang=csharp }
int int32 = 0;
object boxedInt32 = int32;
long int64 = (long)boxedInt32;
~~~

Even though converting from `int` to `long` is totally doable, the compiler doesn't *know* it's supposed to do this if it's just dealing with a `System.Object`.

To make this all a little more concrete, here's an obnoxious little dialogue I just wrote -- a dramatization of the above code snippet:

> **Programmer**: Here is an int.  
> **Compiler**: Thank you!  
> **Programmer**: Now please put that int in a box.  
> **Compiler**: OK! Done!  
> **Programmer**: Now, take a long out of that box.  
> **Compiler**: OK--**wait, WTF?**

And here's a similar dialogue depicting what happened with the Stack Overflow user's code:

> **Programmer**: Hey, Compiler, I'm sending you a box.  
> **Compiler**: Oh boy! I wonder what's in it?  
> **Programmer**: I'll give you a hint! It starts with "C" and rhymes with "urrency."  
> **Compiler**: A Currency! Sweet!  
> **Programmer**: Yep, that's right! Now here it is...  
> **Compiler** (*opening box*): Yesss, a Cur--wait a second.  
> **Programmer**: What's wrong, Compiler?  
> **Compiler**: You said this was going to be a Currency. It's clearly a decimal.  
> **Programmer**: So what? Aren't they the same thing to you?  
> **Compiler**: No. They're not. Are they the same to *you*? Geez. If you had *told* me this was a decimal, I could've brought my tools to *convert* it to a Currency, but...  
> **Programmer**: Come on, why didn't you just *know* it was a decimal?  
> **Compiler**: Screw you.

Moral of the story: even though the syntax happens to be the same, unboxing a value and converting from one type to another are two different operations.

Oh yeah, and here's the code that actually *does* work:

~~~{: lang=csharp }
foreach (PropertyInfo p in props)
{
     if (p.PropertyType == typeof(Currency))
     {
         // unbox, THEN use implicit operator
         Currency c = (decimal)table.Rows[0][p.Name];
         p.SetValue(this, c, null);
     }
     else
     {
         p.SetValue(this, table.Rows[0][p.Name], null);
     }
}
~~~
