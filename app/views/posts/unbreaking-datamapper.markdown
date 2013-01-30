Is DataMapper inherently broken?
--------------------------------

In a [strongly-worded blog post back in 2010](http://www.drmaciver.com/2010/04/datamapper-is-inherently-broken/), David MacIver asserted that there is fundamental flaw in [DataMapper](http://datamapper.org/), an ORM library for Ruby. The core of his complaint is[^present-tense] that DataMapper's default API for saving records hides errors, making it difficult to diagnose what went wrong when something fails. This in turn increases the likelihood of defects going unnoticed during development and testing, resulting in buggier software.

Borrowing from MacIver's post[^borrowing], the below is a boilerplate example of how one might attempt to save a record and report any failures using DataMapper:

~~~{: lang=ruby }
my_account = Account.new(:name => "Jose")
if my_account.save
  # my_account is valid and has been saved
else
  my_account.errors.each do |e|
    puts e
  end
end
~~~

The above can be pretty annoying to anyone who expects conciseness from an API. Most developers don't like the idea of having to write several lines of code just to save a record to a database.

Why not wrap the above into a common helper? This still won't consistently work, as MacIvers points out with the following example:

~~~{: lang=ruby }
my_account = Account.new(:customer => Customer.new(:name => "jose"))
my_account.save
~~~

In this case, an error could occur when saving *either* the `Account` object *or* the `Customer` object. And so a general-purpose helper wouldn't be enough; one would have to write a special helper for every model, accounting for each of that model's associations, in every application.

I certainly sympathize with MacIver's frustration.

Why use DataMapper at all, then?
--------------------------------

It's really a shame that such a "fundamental flaw"[^flaw-or-not] exists in DataMapper. Otherwise, I find it to be quite a nice ORM, with at least a couple of (admittedly subjective) advantages over the more popular [ActiveRecord](https://github.com/rails/rails/tree/master/activerecord):

1. With DataMapper, your database schema is defined in your models themselves. The ActiveRecord approach uses a separate file to define table schemas (schema.rb), making it sometimes awkward to reason about code in the classes used to interact with those tables. (The existence of gems such as [annotate](https://github.com/ctran/annotate_models) attests to this awkwardness.)
2. DataMapper adopts the philosophy of having a 1:1 mapping between database records and objects in memory. Whereas in ActiveRecord you might have multiple `Account` instances referencing the same record (with different dirty local states), in DataMapper this is not the case. The upshot is the elimination of an entire category of bugs (*what happened to my attributes?*).

Addressing the problem
----------------------

While I understand where MacIver was coming from when he wrote that original post, when I first read it I found myself scratching my head and wondering, *Why didn't he do something about it?* This is particularly vexing given that MacIver mentioned having worked with DataMapper for at least "several months" and bemoaned encountering the same flaw "time and time again." As a software developer, whenever I find myself repeatedly struggling with a tool[^struggling-with-a-tool]--*especially* [an open source one](https://github.com/datamapper)--I inevitably end up trying to patch it or otherwise find some way around its (perceived) shortcomings.

It should be noted that, probably at some point after MacIver's post, DataMapper *did* introduce [a `raise_on_save_failure` option](http://datamapper.org/docs/create_and_destroy.html) which (obviously) raises exceptions on save failures. However, these exceptions still don't include any useful information; and it seems [the DataMapper developers aren't receptive to the idea that they should](http://datamapper.lighthouseapp.com/projects/20609/tickets/1322-show-objecterrors-when-raise_on_save_failure-is-set)[^developer-pushback].

Luckily, it turns out that a solution to this problem isn't even particularly complicated. It's true that wrapping the above snippet into a helper in a *client application* doesn't solve the problem; but wrapping it in *DataMapper* does.

~~~{: lang=ruby }
module DataMapper
  module Resource
    alias_method :save?, :save

    def save
      return if self.save? || self.errors.empty?
      error_message = self.errors.map { |e| "#{self.class}: #{e.join(', ')}" }.join("; ")
      raise SaveFailureError.new(error_message, self)
    end
  end
end
~~~

How is the above any different from writing a wrapper in your application? Simple: every time a resource is saved in DataMapper, the `save` method is called (internally). This means that in the simple case--where saving a record fails because it is invalid--the exception raised will be informative by reporting the record's validation errors. In the more complex case--where saving a record fails because its child is invalid--the exception raised will be informative by reporting the *child's* validation errors.

Enter dm-noisy-failures
-----------------------

I'm sure you saw this one coming from a mile away. Yes, I wrote a gem to do what I'm describing: [dm-noisy-failures](http://dtao.github.com/dm-noisy-failures) (the excerpt above is taken directly from the library). This gem overwrites DataMapper's `save`, `update`, `create`, and `destroy` methods with variations that throw exceptions (with descriptive error messages) on failure. The original methods returning true and false are aliased as `save?`, `update?`, `create?`, and `destroy?`--a nice resolution, in my opinion, as it conforms to existing Ruby idioms.

[Check it out](https://github.com/dtao/dm-noisy-failures) and let me know what you think. <small>My quest to <a href="/making-yaml-safe-again.html">actually publicize my open source projects</a> continues!</small>

As [he still seems to be active](http://www.drmaciver.com/blog), and he also seems like a smart and thoughtful guy, I plan on contacting MacIver about my little gem to see what he thinks. It's very possible he's not even doing anything with DataMapper anymore; but it can't hurt to seek his feedback. While I'm at it I should probably get in touch with the DataMapper folks, who [are currently working on a major update](http://solnic.eu/2012/12/20/datamapper-2-status-and-roadmap.html).

[^present-tense]: To be fair, as the article was written in 2010, MacIver may have changed his stance between then and now. However, I did a brief search for any sort of retraction and couldn't find one; so I'm sticking with the present tense here.

[^borrowing]: Which in turn borrows from the [official DataMapper documentation](http://datamapper.org/docs/validations).

[^flaw-or-not]: I happen to agree with most of MacIver's points, so I do view DataMapper's API as flawed. But I'm also quite sure the library's developers had reasons for designing it that way--or anyway, I haven't seen any evidence to the contrary--so it's clearly debatable to some extent. Hence my use of quotes.

[^developer-pushback]: As far as I can tell, the DataMapper team's reasoning for excluding validation errors from exceptions is that "\[the\] #save command can return false for reasons other than validations being invalid." This seems to me like an unfortunate case of [*the perfect is the enemy of the good*](http://en.wikipedia.org/wiki/Perfect_is_the_enemy_of_good).
