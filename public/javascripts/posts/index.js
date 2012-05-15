$(document).ready(function() {
  $("a.delete").click(function() {
    var $link = $(this),
        $row = $link.closest("tr"),
        permalink = $link.data("post");

    $.ajax({
      url: "/posts/" + permalink,
      type: "delete",
      success: function(response) {
        $row.remove();
      }
    });
  });

  $("a.publish").click(function() {
    var $link = $(this),
        $cell = $link.closest("td"),
        permalink = $link.data("post");

    $.ajax({
      url: "/posts/" + permalink,
      type: "put",
      data: {
        publish: true
      },
      success: function(response) {
        $cell.empty();
        $("<i>").addClass("icon-ok").appendTo($cell);
      }
    });
  });
});
