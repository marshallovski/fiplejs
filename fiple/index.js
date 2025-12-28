/**
 @name fiple.js
 @description Mini library for creating websites
 @copyright (c) marshallovski 2025
 @license MIT
 @version 1.1.7
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

    const createFromSpec = spec => {
      const elNode = document.createElement(spec.elem);

      if (typeof spec.content === 'string') {
        const re = /<%([^%>]+)?%>/g; // regexp for <% %> in element content
        let match;
        while ((match = re.exec(spec.content))) {
          spec.content = spec.content.replaceAll(match[0], _props[match[1]]);
        }
      }

      if (spec.style)
        Object.entries(spec.style).forEach(rule => elNode.style[rule[0]] = rule[1]);

      if (spec.class)
        spec.class.forEach(cl => elNode.classList.add(cl));

      if (spec.events)
        Object.entries(spec.events).forEach(ev => elNode.addEventListener(ev[0], ev[1]));

      if (spec.id) elNode.id = spec.id;
      if (spec.content) elNode.innerHTML = spec.content;

      // set remaining simple attributes (like src, alt, title, value, etc.)
      Object.entries(spec).forEach(([k, v]) => {
        if (["elem", "style", "class", "events", "id", "content", "child"].includes(k)) return;
        try {
          elNode.setAttribute(k, v);
        } catch {
          // ignore attributes that can't be set
        }
      });

      // recursive child handling
      if (spec.child && Array.isArray(spec.child)) {
        spec.child.forEach(childSpec => {
          const childNode = createFromSpec(childSpec);
          elNode.appendChild(childNode);
        });
      }

      return elNode;
    };

    _ctx.forEach(spec => {
      const node = createFromSpec(spec);
      fragment.appendChild(node);
    });

    this.root.appendChild(fragment); // append all elements at once
  }
};

export default Fiple;
