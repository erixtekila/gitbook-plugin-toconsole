GitBook plugin : Send javascript output to console
==============

You can use install it via NPM:

```bash
$ npm install gitbook-plugin-toconsole
```

And use it for your book with:

```bash
$ gitbook build ./ --plugins=toconsole
```

You can set the button message with the plugins configuration (command line option: `--pluginsConfig`) :

```javascript
{
    "toconsole": {
        "buttontext": "Evaluate in console"
    }
}
```