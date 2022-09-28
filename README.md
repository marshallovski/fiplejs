# fiple.js
Mini library for creating websites

# DEMO
[See the live demo here](https://marshallovski.github.io/fiple/demo/)

# Features
* Lightweight (uses under 1MB ~~of RAM~~ and weighs **1.5kB minified**)
* Templating
* Props for elements
* Built-in functions for styling text (`bold()` and `italics()`)
* Styles
* Events
* Applying classes, IDs to elements
## and more!

# Examples
*creating an h1 element with "Hello, World!"*

```js
fiple.root = document.getElementById('approot');

fiple.render(
  [{
    elem: 'h1',
    content: 'Hello, World!'
  }]
);
```

# TODO:
1. Reactivity
