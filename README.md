# fiple.js
Mini library for creating websites

# Features
* Lightweight (uses under 1MB ~~of RAM~~ and weighs **3kB unminified**)
* Templating
* Props for elements
* Built-in functions for styling text (`bold()` and `italics()`)
* Styles
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
1. Classes (will be in v1.1)
2. Events (will be in v1.1)
