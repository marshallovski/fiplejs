/**
 @name fiple.js
 @description Mini library for creating websites
 @copyright (c) marshallovski 2025
 @license MIT
 @version 1.1.6
 * Last updated: 28.12.2025
 */

'use strict';

class Fiple {
  constructor(root, disableHTMLErrors) {
    this.root = root;
    this.disableHTMLErrors = disableHTMLErrors;
  }

  _htmlError(desc) {
    if (!this.disableHTMLErrors) {
      const escapeHTML = str => String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/`/g, '&#96;');

      let safeDesc;

      switch (desc) {
        case 'RtreeEmpty':
          safeDesc = 'Render tree is empty.<br><a class="fiple_link" href="https://marshallovski.github.io/fiple/docs/?article=RtreeEmpty" target="_blank">Learn more</a>';
          break;

        case 'missingRootElem':
          safeDesc = 'You must provide the root element.<br><a class="fiple_link" href="https://marshallovski.github.io/fiple/docs/?article=missingRootElem" target="_blank">Learn more</a>';
          break;

        default:
          safeDesc = escapeHTML(desc).replace(/\r\n|\r|\n/g, '<br>');
          break;
      }

      this.root.innerHTML = `<br><div class="fiple_err"><h1>Render Error</h1><p class="fiple_desc">${safeDesc}</p><p class="fiple_sub">Powered by <a href="https://github.com/marshallovski/fiplejs">fiple.js</a></p></div>`;
    } else {
      console.error(desc);
    }
  }

  _init(ctx) {
    // checking if this.root is an HTML element
    if (!this.root || !(this.root instanceof HTMLElement)) return this._htmlError('missingRootElem');

    if (!ctx[0] || ctx[0].length === 0)
      return this._htmlError('RtreeEmpty');
  }

 async render(_ctx, _params = {}, _props = {}) {
    this._init(_ctx); // initialization, checking for root elements, etc.
    const fragment = document.createDocumentFragment();

    _ctx.forEach(el => {
      let elem = document.createElement(el.elem);

      if (typeof el.content === 'string') {
        const re = /<%([^%>]+)?%>/g; // regexp for <% %> in element content
        let match;

        while ((match = re.exec(el.content))) { // searching for variables in element content
          el.content = el.content.replaceAll(match[0], _props[match[1]]); // replacing with value from _props
        }
      }

      if (el.style) // checking for inline element styles
        Object.entries(el.style)
          .forEach(rule => elem.style[rule[0]] = rule[1]); // applying styles to element

      if (el.class) // checking for classes
        el.class.forEach(cl => elem.classList.add(cl)); // adding classes (ex.: {...class: ['test', 'lol', 'hehe'] })

      if (el.events) // checking for events
        Object.entries(el.events)
          .forEach(ev => elem.addEventListener(ev[0], ev[1])); // adding event(s) to element

      if (el.id) elem.id = el.id; // adding an "id" attr to element, if present
      if (el.content) elem.innerHTML = el.content; // adding content to element
      
      fragment.appendChild(elem); // add to fragment
    });

    this.root.appendChild(fragment); // append all elements at once
  }
};

export default Fiple;
