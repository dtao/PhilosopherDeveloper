window.addEventListener('load', function() {
  var nav     = document.querySelector('nav'),
      content = document.getElementById('content');

  function scrolledPastNav() {
    return window.scrollY > (nav.offsetTop + nav.offsetHeight);
  }

  function adjustContentWidth() {
    if (scrolledPastNav()) {
      content.className = 'full-width';
    } else {
      content.removeAttribute('class');
    }
  }

  window.addEventListener('scroll', adjustContentWidth);
  window.addEventListener('resize', adjustContentWidth);
});
