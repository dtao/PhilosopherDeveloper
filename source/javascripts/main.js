window.addEventListener('load', function() {
  var nav     = document.querySelector('nav'),
      content = document.getElementById('content'),
      article = content.querySelector('article');

  function scrolledPastNav() {
    return window.scrollY > (nav.offsetTop + nav.offsetHeight);
  }

  function adjustContentWidth() {
    if (scrolledPastNav()) {
      makeContentFullWidth();

    } else if (content.className === 'full-width') {
      resetContentWidth();
    }
  }

  function makeContentFullWidth() {
    // Exit early if we've already done this
    if (content.className === 'full-width') {
      return;
    }

    // Find the first visible child element
    var topElement = findTopElement();
    var distanceFromTop = window.scrollY - topElement.offsetTop;

    // Expand the content element
    content.className = 'full-width';

    window.scrollTo(0, topElement.offsetTop + distanceFromTop);
  }

  function resetContentWidth() {
    content.removeAttribute('class');
  }

  function findTopElement() {
    var children = article.children;

    for (var i = 0; i < children.length; ++i) {
      if (children[i].offsetTop + children[i].offsetHeight > window.scrollY) {
        return children[i];
      }
    }

    return article.firstChild;
  }

  window.addEventListener('scroll', adjustContentWidth);
  window.addEventListener('resize', adjustContentWidth);
});
