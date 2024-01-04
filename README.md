# Simple CodeEditor for Vue.js 3

Support for **Vue.js 3**

website: [simple-code-editor.vicuxd.com](https://simple-code-editor.vicuxd.com)

It's easy to use, both support read-only and edit mode with 200+ themes, you can directly use it in the browser or import it via the NPM package.

## Usage

There are 2 common ways that you can use the `simple-code-editor` package:

1. Vue in the browser
2. Vue via NPM

### 1. Vue in the Browser

Step 1. Add the CSS files.

```html
<link rel="stylesheet" href="themes.css" />
<link rel="stylesheet" href="themes-base16.css" />
<link rel="stylesheet" href="simple-code-editor.css" />
```

Step 2. Add the JavaScript files after the `vue.js` file.

```html
<script src="highlight.min.js"></script>
<script src="simple-code-editor.js"></script>
```

Step 3. Declaring the component, and using the customized tag into the HTML template.

```javascript
const app = Vue.createApp({
  components: {
    "code-editor": CodeEditor,
  },
});
```

```html
<code-editor></code-editor>
```

### 2. Usage with Vue via NPM

Step 1. Install the package from NPM:

```shell
npm install simple-code-editor
```

Step 2. Importing the modules and registration.

```javascript
import hljs from 'highlight.js';
import CodeEditor from "simple-code-editor";
export default {
  components: {
    CodeEditor,
  },
};
```

```html
<CodeEditor></CodeEditor>
```

## Props

### read-only ` Boolean`

Default: `false`

Description: enable editable or not

```html
<CodeEditor :read-only="true"></CodeEditor>
```

### value `String`

Default: `unset`

Description: static content setting. If requiring data binding, please use the property: [`v-model`](#v-model)

```html
<CodeEditor value="console.log(13)"></CodeEditor>
```

### v-model

Description: varies based on the value of form inputs element or output of components

```html
<CodeEditor v-model="demo"></CodeEditor> <CodeEditor v-model="demo"></CodeEditor>
```

### line-nums `Boolean`

Default: `false`

Description: enable line numbers to show or not, but unable in wrap text mode

```html
<CodeEditor :line-nums="true"></CodeEditor>
```

### languages `Array`

Default: `[["javascript", "JS"]]`

Description: [["language name", "display name"], ["language name", "display name"], ...]. Multiple languages setting will enable the language selector automatically, the language name is necessary, and the display name is optional

```html
<CodeEditor :languages="[['cpp', 'C++']]" />
```

Multiple languages:

```html
<CodeEditor :languages="[['cpp', 'C++'],['python', 'Python'],['php', 'PHP']]" />
```

### tab-spaces `Number`

Default: `2`

```html
<CodeEditor :tab-spaces="4"></CodeEditor>
```

### wrap `Boolean`

Default: `false`

Description: enable wrap text or not

```html
<CodeEditor :wrap="true"></CodeEditor>
```

### header `Boolean`

Default: `true`

Description: enable header to show or not

```html
<CodeEditor :header="true"></CodeEditor>
```

### display-language `Boolean`

Default: `true`

Description: enable language name to show or not

```html
<CodeEditor :display-language="false"></CodeEditor>
```

### copy-code `Boolean`

Default: `true`

Description: enable copy icon to show or not

```html
<CodeEditor :copy-code="false"></CodeEditor>
```

### theme `String`

Default: `github-dark`

Description: freely switching between 200+ themes, [check all the themes](https://simple-code-editor.vicuxd.com)

```html
<CodeEditor theme="github-dark"></CodeEditor>
```

### font-size `String`

Default: `17px`

```html
<CodeEditor font-size="20px"></CodeEditor>
```

### width `String`

Default: `540px`

```html
<CodeEditor width="100%"></CodeEditor>
```

### height `String`

Default: `auto`

Description: the height of the container is adaptive by default, it also can be set as a specific value, and the scroll bar will work with overflow

```html
<CodeEditor height="150px"></CodeEditor>
```

### min-width `String`

Default: `unset`

```html
<CodeEditor min-width="200px"></CodeEditor>
```

### min-height `String`

Default: `unset`

```html
<CodeEditor min-height="200px"></CodeEditor>
```

### max-width `String`

Default: `unset`

```html
<CodeEditor max-width="1000px"></CodeEditor>
```

### max-height `String`

Default: `unset`

```html
<CodeEditor max-height="200px"></CodeEditor>
```

### padding `String`

Default: `20px`

```html
<CodeEditor padding="30px"></CodeEditor>
```

### border-radius `String`

Default: `12px`

```html
<CodeEditor border-radius="4px"></CodeEditor>
```

### lang-list-width `String`

Default: `110px`

Description: the width of language list

```html
<CodeEditor lang-list-width="150px"></CodeEditor>
```

### lang-list-height `String`

Default: `auto`

Description: the height of the language list

```html
<CodeEditor lang-list-height="70px"></CodeEditor>
```

### lang-list-display `Boolean`

Default: `false`

Description: enable language list to show by default or not

```html
<CodeEditor :lang-list-display="true"></CodeEditor>
```

### z-index `String`

Default: `0`

```html
<CodeEditor z-index="6"></CodeEditor>
```

### autofocus `Boolean`

Default: `false`

Description: enable textarea to get focused by default or not

```html
<CodeEditor :autofocus="true"></CodeEditor>
```

## Event

### @lang

Description: pass the current languange as an argument

```html
<CodeEditor @lang="getLanguage"></CodeEditor>
```

```javascript
getLanguage(lang) {
  console.log("The current language is: " + lang);
}
```

### @content

Description: pass the static content as an argument

```html
<CodeEditor @content="getContent"></CodeEditor>
```

```javascript
getContent(content) {
  console.log("The content is: " + content);
}
```

### @textarea

Description: pass the textarea element as an argument

```html
<CodeEditor @textarea="focus"></CodeEditor>
```

```javascript
focus(node) {
  node.focus();
}
```