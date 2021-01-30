---
title: Charts made dead simple with HighTables
date: 2013-04-10
published: true

javascript:
  - https://code.jquery.com/jquery-1.10.1.min.js
  - https://code.highcharts.com/highcharts.js
  - https://danieltao.com/HighTables/hightables.min.js
---

In a footnote to [my post a while ago on SafeYAML](/posts/making-yaml-safe-again.html)[^safe-yaml], I established a goal of writing more about my many open source projects, which I have a bad habit of not telling anyone about---sometimes even long after they're finished!

So today I want to write about a pretty good one that's relatively polished and full-featured. It's called [HighTables](http://dtao.github.io/HighTables/), and it's a JavaScript library that makes adding charts to existing sites with HTML tables *extremely* easy.

Here, I'll give you an example (**note**: this is probably not going to display properly for those of you on RSS readers; [visit the website](http://philosopherdeveloper.com/posts/charts-made-dead-simple-with-hightables.html) to see what I'm trying to show you!):

```html
<table class="render-to-bar-chart">
  <tr>
    <th>Method of rendering a chart</th>
    <th>How easy it is (scale from 1 to 10)</th>
  </tr>
  <tr>
    <td>Using Highcharts directly</td>
    <td>3</td>
  </tr>
  <tr>
    <td>Using HighTables</td>
    <td>10</td>
  </tr>
</table>
```

And the result:

<table class="render-to-bar-chart">
  <tr>
    <th>Method of rendering a chart</th>
    <th>How easy it is (scale from 1 to 10)</th>
  </tr>
  <tr>
    <td>Using Highcharts directly</td>
    <td>3</td>
  </tr>
  <tr>
    <td>Using HighTables</td>
    <td>10</td>
  </tr>
</table>

Pretty cool, right?

For what it's worth, HighTables itself isn't all that complicated. It leverages the power of two existing libraries, [Highcharts](http://www.highcharts.com/) and [jQuery](http://jquery.com/). If you don't know about Highcharts, it's a great library that lets you render all kinds of charts (line, area, bar, pie, etc.) in JavaScript. And if you don't know about jQuery, and you're a JavaScript developer, you should probably blow the dust off your keyboard and [ask any JS-related question on the internet](http://www.doxdesk.com/img/updates/20091116-so-large.gif) to learn more about it.

My problem with Highcharts in the past was that it has [a *behemoth* API](http://api.highcharts.com/highcharts). Rendering a chart was never a simple matter of calling `pieChart()`; instead, any chart-creation logic requires a whole ton of options that an average person is very unlikely to remember from one use to the next. And so I always found myself returning to the Highcharts website, perusing documentation, and following examples to ever get a chart to display on sites I've worked on.

<figure>
  <div class="pie-chart"
       data-title="Value of activity"
       data-source="table:last-of-type"
       data-value-columns="2"
       data-options="getChartOptions"></div>
  <div class="pie-chart"
       data-title="Time invested in activity"
       data-source="table:last-of-type"
       data-value-columns="3"
       data-options="getChartOptions"></div>
  <figcaption>Notice any discrepancy?</figcaption>
</figure>

Activity                       | Relative Value of activity | Hours spent on activity |
------------------------------ | -------------------------: | ----------------------- |
Implementing reporting backend | 10                         | 3                       |
Fiddling with chart rendering  | 1                          | 5                       |

Of course, like any good developer, I eventually would get around to writing reusable methods with easier-to-remember interfaces and use *those* to render my charts. But at some point I noticed a pattern: mostly I was putting charts **where tables already were**. The point of the chart was to display the data in a visual form, to make it a bit easier to parse for a human. The work of translating the data in the table to JavaScript code to render the chart was tedious, but easily repeatable.

And from there came the realization that I could (and probably should) just automate every bit of the process, and write a *library* to *always* render a chart from a table---provided that table had some class (like `render-to-line-chart`) associated with it. So that's exactly how HighTables works: you add one class to your table, include the library in your page, and charts display automatically. (The charts above are rendered from <a href="javascript:revealTable();">a hidden table</a>, by the way, in case you were confused!)

So, by all means, [try out HighTables](https://github.com/dtao/HighTables) and let me know what you think! I've already used it a good deal myself, and I can honestly say it's been really useful to me. But the more use it gets, the more useful it should become as bugs are fixed, features are introduced, yada yada. At least that's the hope.

[^safe-yaml]: Which [has come a long way](http://rubygems.org/gems/safe_yaml)!
