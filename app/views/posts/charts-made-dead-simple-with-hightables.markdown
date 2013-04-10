<script src="/javascripts/jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="/javascripts/highcharts-3.1.min.js" type="text/javascript"></script>
<script src="/javascripts/hightables.min.js" type="text/javascript"></script>

In a footnote to [my post a while ago on SafeYAML](/posts/making-yaml-safe-again.html)[^safe-yaml], I established a goal of writing more about my many open source projects, which I have a bad habit of not telling anyone about--sometimes even long after they're finished!

So today I want to write about a pretty good one that's relatively polished and full-featured. It's called [HighTables](http://dtao.github.io/HighTables/), and it's a JavaScript library that makes adding charts to existing sites with HTML tables *extremely* easy.

For what it's worth, HighTables itself isn't all that complicated. It leverages the power of two existing libraries, [Highcharts](http://www.highcharts.com/) and [jQuery](http://jquery.com/). If you don't know about Highcharts, it's a great library that lets you render all kinds of charts (line, area, bar, pie, etc.) in JavaScript. And if you don't know about jQuery, and you're a JavaScript developer, you should probably blow the dust off your keyboard and [ask any JS-related question on the internet](http://www.doxdesk.com/img/updates/20091116-so-large.gif) to learn more about it.

My problem with Highcharts in the past was that it has [a *behemoth* API](http://api.highcharts.com/highcharts). Rendering a chart was never a simple matter of calling `pieChart()`; instead, any chart-creation logic requires a whole ton of options that an average person is very unlikely to remember from one use to the next. And so I always found myself returning to the Highcharts website, perusing documentation, and following examples to ever get a chart to display on sites I've worked on.

<figure class="hidden-in-abbreviated-version">
  <div class="pie-chart" data-title="Value" data-source="#activity-value-vs-time-table" data-value-columns="2"></div>
  <div class="pie-chart" data-title="Time Investment" data-source="#activity-value-vs-time-table" data-value-columns="3"></div>
  <figcaption>Notice any discrepancy?</figcaption>
</figure>

Activity                       | Relative Value of activity | Hours spent on activity |
-------------------------------|---------------------------:|------------------------:|
Implementing reporting backend | 10                         | 3                       |
Fiddling with chart rendering  | 1                          | 5                       |
{: #activity-value-vs-time-table .hidden }

Of course, like any good developer, I eventually would get around to writing reusable methods with easier-to-remember interfaces and use *those* to render my charts. But at some point I noticed a pattern: mostly I was putting charts **where tables already were**. The point of the chart was to display the data in a visual form, to make it a bit easier to parse for a human. The work of translating the data in the table to JavaScript code to render the chart was tedious, but easily repeatable.

And from there came the realization that I could (and probably should) just automate every bit of the process, and write a *library* to *always* render a chart from a table--provided that table had some class (like `render-to-line-chart`) associated with it. So that's exactly how HighTables works: you add one class to your table, include the library in your page, and charts display automatically. (The charts above are rendered from <a href="javascript:revealTable();">a hidden table</a>, by the way, in case you were confused!)

So, by all means, [try out HighTables](https://github.com/dtao/HighTables) and let me know what you think! I've already used it a good deal myself, and I can honestly say it's been really useful to me. But the more use it gets, the more useful it should become as bugs are fixed, features are introduced, yada yada. At least that's the hope.

<script type="text/javascript">
  function revealTable() {
    $("#activity-value-vs-time-table").toggleClass("hidden");
  }
</script>

[^safe-yaml]: Which [has come a long way](http://rubygems.org/gems/safe_yaml)!
