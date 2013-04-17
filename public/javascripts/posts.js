$(document).ready(function() {
  var $nextPageSection = $(".next-page");
  var $nextPageLink = $("a", $nextPageSection);

  function parseHtmlBody(html) {
    return $(html.substring(html.indexOf("<body>"), html.lastIndexOf("</body>") + 7));
  }

  $nextPageLink.click(function() {
    var page = $nextPageLink.attr("href");

    $nextPageSection.addClass("loading");

    $.get(page, function(html) {
      var $page = $(html);
      var $articles = $page.filter(function() { return this.tagName === "ARTICLE"; });
      var $nextNextPageSection = $page.filter(function() { return this.className === "next-page"; });

      $articles.insertBefore($nextPageSection);
      if ($nextNextPageSection.length > 0) {
        $nextPageLink.attr("href", $("a", $nextNextPageSection).attr("href"));
        $nextPageSection.removeClass("loading");
      } else {
        $nextPageSection.remove();
        $nextPageSection = null;
        $nextPageLink = null;
      }
    });

    return false;
  });
});
