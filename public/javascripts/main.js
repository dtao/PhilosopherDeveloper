$(document).ready(function() {
  // Hack to make browser load spinner image in advance.
  document.createElement("img").src = "/images/loading.gif";

  var $body = $("body");

  function closeDialogsOnEscape(e) {
    if (e.keyCode === 27) {
      $(".dialog").remove();
    }
  }

  // Update all links to open up an iframe w/ an option to open in a new window
  // (or tab).
  $("a").each(function() {
    var $anchor = $(this);
    var href    = $anchor.attr("href");

    // Skip links to pages this site.
    if (!href.match(/^https?:\/\//) || href.match(/^https?:\/\/(?:www\.)?philosopherdeveloper\.com/)) {
      return;
    }

    // Skip links w/ associated JavaScript.
    if (href.match(/^javascript:/) || $anchor.attr("onclick")) {
      return;
    }

    // Skip links w/ explicit targets.
    // TODO: figure out how to add targets w/ Maruku.
    if ($anchor.is(".new-window") || $anchor.attr("target")) {
      return;
    }

    $anchor.click(function() {
      var $dialog = $("<div>").addClass("dialog loading").appendTo($body);
      var $iframe = $("<iframe>").attr("src", href).appendTo($dialog);
      var $xLink  = $("<a>").addClass("close-dialog").appendTo($dialog);
      var $goLink = $("<a>").addClass("link-away").attr("href", href).appendTo($dialog);

      $iframe.one("load", function() {
        $dialog.removeClass("loading").addClass("finished");
      });

      return false;
    });
  });

  $body.on("click", "a.close-dialog", function() {
    $(this).closest(".dialog").remove();
  });

  // Close dialog if ESC key is pressed.
  $body.on("keyup", closeDialogsOnEscape);
});
