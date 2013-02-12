It is a well-known fact among my teammates that my tolerance for hacks is higher than most developers’. And so it is that sometimes I write code that others find horrifying.

Here’s one that I personally like, and which has caused more than one of my teammates to chuckle in half-approval. It came up again just today, as we are using [Padrino](http://www.padrinorb.com/) on my current project and a coworker wanted to know if Sinatra and/or Padrino had an equivalent to the Rails console (to allow a dev to poke around the system at some arbitrary point during the program’s execution--say, in the middle of handling a request at the controller level).

Frankly, I’m no Sinatra expert. For all I know there *is*[^sinatra-equivalent] an equivalent to the Rails console in Sinatra. I’ve never really cared, because if I want to poke around the code mid-request I just whip up something like this, which I shall call the **littlest Ruby debugger**:

~~~{: lang=ruby }
puts "Start typing away."
while (line = STDIN.readline).strip != ""
  puts eval(line)
end
~~~

Yes, yes, I know. Any developer who lets something like that slip into production code deserves to be shot. But I would honestly argue that the chances of that are so close to zero as to be completely unworthy of any serious consideration.

Here’s an example of the above hack in action, responding to a request on my local machine (with my commands highlighted):

<pre>  DEBUG -      GET (0.0120ms) /layouts/ - 200
0:0:0:0:0:0:0:1%0 - - [16/Mar/2012 16:22:44] "GET /layouts/ HTTP/1.1" 200 - 0.0160
Start typing away.
<span class="highlight-special">params.inspect</span>
{:layout_id=>"1"}
<span class="highlight-special">params[:layout_id]</span>
1
<span class="highlight-special">self.methods.select { |m| m.start_with?("c") }</span>
current_user
cache_action
check_box_tag
content_tag
content_for
concat_content
content_for?
concat
capture_html
capture
content_blocks
content_type
current_engine
current_path
call!
call
coffee
creole
cache_control
client_error?
com
class
clone
class_eval

  DEBUG - TEMPLATE (0.0010ms) /layouts/application
  DEBUG -      GET (24.3990ms) /layouts/1 - 200
0:0:0:0:0:0:0:1%0 - - [16/Mar/2012 16:23:12] "GET /layouts/1 HTTP/1.1" 200 - 24.4020</pre>

See, this is why you want people like me on your team. Otherwise, who’s going to hack up your code base?

[^sinatra-equivalent]: As it happens, there absolutely is an equivalent, at least in Padrino: `padrino console`. However, this isn't really the same as what I've described here, which is more analogous to calling `debugger` in the middle of a controller action in Rails.
