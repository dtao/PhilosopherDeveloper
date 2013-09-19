window.addEventListener('load', function() {
  var codeBlocks = document.querySelectorAll('pre > code');

  for (var i = 0; i < codeBlocks.length; ++i) {
    (function(codeBlock) {
      // Every code snippet looks like:
      // <pre><code class="language">...</code></pre>
      var lang = codeBlock.className,
          code = codeBlock.textContent;

      codeBlock.innerHTML = hljs.highlight(lang, code).value;

    }(codeBlocks[i]));
  }
});
