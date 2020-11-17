# descriptive-statistics
Descriptive Statistics

## Installation

### Node.js

```bash
npm install https://github.com/PeterTadich/descriptive-statistics#main
```

### Google Chrome Web browser

No installation required for the Google Chrome Web browser.

## How to use

### Node.JS/Google Chrome Web browser

```js
import * as mcds from 'descriptive-statistics';
```

## Examples

### Node.js (server side)

Copy the following code to index.mjs

```js
import * as mcds from 'descriptive-statistics';

var x = [[0.0],[1.0],[2.0],[3.0],[4.0],[5.0],[6.0],[7.0],[8.0],[9.0],[10.0]];
console.log("min: " + x.reduce(mcds.min));
console.log("max: " + x.reduce(mcds.max));
console.log("sample standard deviation: " + mcds.sample_standard_deviation(x).toFixed(4));
```

The run:

```bash
npm init -y
npm install https://github.com/PeterTadich/descriptive-statistics#main
node index.mjs
```

If the above does not work modify the package.json file as follows:
Helpful ref: [https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node-js](https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node-js)

```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node --experimental-modules index.mjs"
  },
"type": "module"
```

```bash
npm init -y
npm install https://github.com/PeterTadich/descriptive-statistics#main
npm start
```

### Google Chrome Web browser (client side)

```js
import * as mcds from 'descriptive-statistics';
```

Server '*.conf' files may require modification.

mime.types file include:

```conf
text/javascript mjs js
```

httpd.conf file include:

```conf
AddType text/javascript .mjs
```

## License

[MIT](LICENSE)