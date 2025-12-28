# fiple.js
Mini library for creating websites

# DEMO
[See the live demo here](https://marshallovski.github.io/fiple/demo/)

# Features
* Lightweight (weighs **1.6kB** minified)
* Templating
* Props for elements
* Styles
* Events
* Applying classes, IDs to elements
* Child elements for parent element
* **and more!**

# Docs
Read them [here](https://marshallovski.github.io/fiple/docs/). The docs are also powered by fiple.js!

# Examples
*creating an h1 element with "Hello, World!"*

```js
fiple.render(
  [{
    elem: 'h1',
    content: 'Hello, World!'
  }]
);
```

*creating a small page, with classes, inline styles, container, title, text and colored link*
```js
await fiple.render([
            {
                elem: 'div',
                child: [
                    {
                        elem: 'h1',
                        class: ['container-title'],
                        content: 'Big title!'
                    },
                    {
                        elem: 'p',
                        class: ['container-text'],
                        content: 'ghost under the umbrella',
                        child: [
                            {
                                elem: 'a',
                                href: 'https://open.spotify.com/track/58QIJpweGziQ4fg2jWHxnW',
                                target: '_blank',
                                style: {
                                    textDecoration: 'none',
                                    color: 'inherit'
                                },
                                content: ' - listen on ',
                                child: [
                                    {
                                        elem: 'span',
                                        style: {
                                            color: '#1ed760'
                                        },
                                        content: 'Spotify'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]);
```

# TODO:
1. Reactivity
