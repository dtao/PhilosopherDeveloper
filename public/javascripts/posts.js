$(document).ready(function() {
  var $nextPageSection = $(".next-page");
  var $nextPageLink = $("a", $nextPageSection);

  $nextPageLink.click(function() {
    var page = $nextPageLink.hide().attr("href");

    $.get(page, function(html) {
      var $page = $(html);
      var $articles = $page.filter(function() { return this.tagName === "ARTICLE"; });
      var $nextNextPageSection = $page.filter(function() { return this.className === "next-page"; });

      $articles.insertBefore($nextPageSection);
      if ($nextNextPageSection.length > 0) {
        $nextPageLink.show().attr("href", $("a", $nextNextPageSection).attr("href"));
      } else {
        $nextPageSection.remove();
        $nextPageSection = null;
        $nextPageLink = null;
      }
    });

    return false;
  });
});
