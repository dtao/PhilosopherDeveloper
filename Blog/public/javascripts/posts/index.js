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
});
