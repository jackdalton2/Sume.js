# Sume.js [![Build Status](https://travis-ci.com/jackdalton2/Sume.js.svg?branch=main)](https://travis-ci.com/jackdalton2/Sume.js)

Low effort DOM templating for the frontend

---
## CDN

[jsDelivr](https://cdn.jsdelivr.net/npm/sume@latest/dist/sume.min.js)

---

## Usage

```javascript
const Sume = require("sume");

let source = `
    <a href="{{ url }}">{{ title }}</a>

    <span>
        {{ content }}

        Escaped delimiters: \\{{ hello! }}
    </span>
`;

let template = Sume.compile(source);
let context = {
    url: "https://github.com/jackdalton2/Sume.js",
    title: "Sume.js",
    content: "Low effort DOM templating for the frontend"
};

let renderedElement = template(context);

```

`renderedElement` (String):
```html
<a href="https://github.com/jackdalton2/Sume.js/">Sume.js</a>

<span>
    Low effort DOM templating for the frontend

    Escaped delimiters: {{ hello! }}
</span>
```
