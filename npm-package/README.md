# Simple CodeEditor for Vue.js

Vue.js 3 support

website: [simple-code-editor.vicuxd.com](https://simple-code-editor.vicuxd.com)

It's easy to use, both support read-only and edit mode with 200+ themes, you can directly use it in the browser or import it via the NPM package.

## Usage

There are 3 common ways that you can use the `simple-code-editor` package:

1. Vue in the browser
2. Vue via NPM
3. NuxtJS via NPM

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

Step 2. Importing the component and registration.

```javascript
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

### 3. Usage with NuxtJS via NPM

Step 1. Install the `simple-code-editor` package from NPM:

```shell
npm install simple-code-editor
```

Step 2. In your `nuxt.config.js` file, add the `simple-code-editor` module:

```js
modules: ["simple-code-editor/nuxt"];
```

Step 3. After adding the global module, you will be able to use the `code-editor` or `CodeEditor` component throughout your Nuxt project:

```vue
<template>
  <client-only>
    <code-editor value="console.log(13)"></code-editor>
    <!-- or -->
    <CodeEditor value="console.log(13)"></CodeEditor>
  </client-only>
  <template></template>
</template>
```

**NOTE:** While using the code editor with Nuxt, it is recommended to wrap each `CodeEditor` component with the `client-only` tags like the example above. This will prevent a client side hydration error.

## Props

### readOnly ` Boolean`

Default: `false`

Description: enable editable or not

```html
<CodeEditor :readOnly="true"></CodeEditor>
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

### tabSpaces `Number`

Default: `2`

```html
<CodeEditor :tabSpaces="4"></CodeEditor>
```

### wrap `Boolean`

Default: `false`

Description: enable word wrap or not

```html
<CodeEditor :wrap="true"></CodeEditor>
```

### hideHeader `Boolean`

Default: `false`

Description: enable header to show or not

```html
<CodeEditor :hideHeader="true"></CodeEditor>
```

### displayLanguage `Boolean`

Default: `true`

Description: enable language name to show or not

```html
<CodeEditor :displayLanguage="false"></CodeEditor>
```

### copyCode `Boolean`

Default: `true`

Description: enable copy icon to show or not

```html
<CodeEditor :copyCode="false"></CodeEditor>
```

### theme `String`

Default: `github-dark`

Description: freely switching between 200+ themes, [check all the themes](https://simple-code-editor.vicuxd.com)

```html
<CodeEditor theme="github-dark"></CodeEditor>
```

### fontSize `String`

Default: `17px`

```html
<CodeEditor fontSize="20px"></CodeEditor>
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

### minWidth `String`

Default: `unset`

```html
<CodeEditor minWidth="200px"></CodeEditor>
```

### minHeight `String`

Default: `unset`

```html
<CodeEditor minHeight="200px"></CodeEditor>
```

### maxWidth `String`

Default: `unset`

```html
<CodeEditor maxWidth="1000px"></CodeEditor>
```

### maxHeight `String`

Default: `unset`

```html
<CodeEditor maxHeight="200px"></CodeEditor>
```

### padding `String`

Default: `20px`

```html
<CodeEditor padding="30px"></CodeEditor>
```

### borderRadius `String`

Default: `12px`

```html
<CodeEditor borderRadius="4px"></CodeEditor>
```

### langListWidth `String`

Default: `110px`

Description: the width of language list

```html
<CodeEditor langListWidth="150px"></CodeEditor>
```

### langListHeight `String`

Default: `auto`

Description: the height of the language list

```html
<CodeEditor langListHeight="70px"></CodeEditor>
```

### langListDisplayed `Boolean`

Default: `false`

Description: enable language list to show by default or not

```html
<CodeEditor :langListDisplayed="true"></CodeEditor>
```

### zIndex `String`

Default: `0`

```html
<CodeEditor zIndex="6"></CodeEditor>
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
