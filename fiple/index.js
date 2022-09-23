/*!
 * fiple.js - Mini library for creating websites
 * Copyright (c) 2022-present marshallovski
 * MIT Licensed
 * Last updated: 23.09.2022
 */

const fiple = {
  root: document.body,
  htmlError(desc) {
    document.body.innerHTML = `<style>.fiple_err{width:300px;height:auto;background-color:#333;color:#fff;text-align:center;display:block;margin:auto;font-family:sans-serif;border:2px solid red;border-radius:16px;padding:16px}.fiple_sub{color:#666;font-size:12px;margin-top:1em}.fiple_link{color:#1e90ff;text-decoration:none}.fiple_desc{margin-top:10px}</style><br><div class="fiple_err"><h1>Render Error</h1><p class="fiple_desc">${desc}</p><p class="fiple_sub">Powered by fiple.js</p></div>`;
  },
  init(ctx) {
    if (!this.root)
      return this.htmlError('You must provide the root element.<br><a class="fiple_link" href="https://marshallovski.github.io/fiplejs/docs/?err=missingRootElem" target="_blank">Learn more</a>');

    if (!ctx[0]) return this.htmlError('Render tree is empty.<br><a class="fiple_link" href="https://marshallovski.github.io/fiplejs/docs/?err=RtreeEmpty" target="_blank">Learn more</a>');
  },
  render(_ctx, _params = {}, _props = {}) {
    this.init(_ctx); // initialization, checking for root elements, etc.

    _ctx.forEach(el => {
      let elem = document.createElement(el.elem);
      const re = /{([^}]+)?}/g; // regexp for {} in element content
      let match;

      while (match = re.exec(el.content)) // searching for variables in element content
        el.content = el.content.replace(match[0], _props[match[1]]); // replacing. example: "hello, {var}" will be replaced on "hello, _props.var"

      if (el.style) // checking for inline element styles
        Object.entries(el.style)
          .forEach(e => elem.style[e[0]] = e[1]); // applying styles to element

      elem.innerHTML = el.content; // adding content to element
      this.root.append(elem); // adding element to root element
    });
  },
  // some utils for something. (actually im don't know where you will use these functions)
  bold(str) {
    return `<b>${str}</b>`;
  },
  italic(str) {
    return `<i>${str}</i>`;
  }
};