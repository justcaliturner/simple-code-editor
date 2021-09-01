<template>
<!-- demo -->
  <div class="demo">
    <h1 class="title">Simple CodeEditor for Vue.js</h1>
    <div class="container">
      <div class="subtitle">
        <p>It's easy to use, support both <mark>read-only</mark> and <mark>edit mode</mark>, hundreds of languages and theme styles powered by <a target="_blank" href="https://github.com/highlightjs/highlight.js#basic-usage">highlight.js</a>, you can directly use it in the browser or import the JavaScript modules via NPM package</p>
      </div>
      <CodeEditor v-model="value1" width="100%" height="120px" :languages="[['html', 'HTML'], ['javascript', 'JavaScript'], ['css', 'CSS']]" :languageSelector="true"></CodeEditor>
      <CodeEditor v-model="value2" width="100%" height="400px" :languageSelector="true"></CodeEditor>
    </div>
  </div>
  <!-- useage -->
  <div class="useage">
    <div class="container">
      <h2>Useage</h2>
      <!-- Browser -->
      <h3>In the Browser</h3>
      <p>Step 1. Add the CSS files, the first one is used for the style of the code editor, the other one is used for the theme style which can be replaced from any other theme style file or customized by userselves.</p>
      <CodeEditor value='<link rel="stylesheet" href="/path/code_editor.min.css">'
        :languages="[['html', 'HTML']]"
        :readOnly="true"
        height="auto"
        width="100%"
      />
      <p>Step 2. Add the JavaScript files including the dependency <a target="_blank" href="https://github.com/highlightjs/highlight.js#basic-usage">highlight.js</a>, and be careful to the files order, the main script should be loaded after the dependency.</p>
      <CodeEditor value='<script src="/path/highlight.11.2.0.min.js"></script>
<script src="/path/code_editor.prod.js"></script>'
        :languages="[['html', 'HTML']]"
        :readOnly="true"
        width="100%"
        height="auto"
      />
      <p>Step 3. Using the <code>code-editor</code> tag into the HTML template, and then embed the component in JavaScript. All the configuration options please check the <a href="#" target="_blank">API</a> list.</p>
      <CodeEditor value="<code-editor v-model='value' :languages='[['javascript', 'JS']]'></code-editor>"
        :languages="[['html', 'HTML']]"
        :readOnly="true"
        height="auto"
        width="100%"
      />
      <CodeEditor value="const app = Vue.createApp({
  components: {
      'code-editor': CodeEditor
  },
  data(){
      return {
          value: ''
      }
  }
})"
        :languages="[['javascript', 'JS']]"
        :readOnly="true"
        height="auto"
        width="100%"
      />
      <!-- Install with NPM -->
      <h3 style="margin-top: 60px;">Install with NPM</h3>
      <p>Step 1</p>
      <CodeEditor value='npm install CodeEditor --save'
        :languages="[['shell']]"
        :hideHeader="true"
        :readOnly="true"
        height="auto"
        width="100%"
      />
      <p>Step 2</p>
      <CodeEditor value="import CodeEditor from 'CodeEditor';
import 'highlight.js/styles/atom-one-dark.css';"
        :languages="[['javascript', 'JS']]"
        :readOnly="true"
        height="auto"
        width="100%"
      />
      <p>Step 3</p>
      <CodeEditor value="export default {
    name: 'PageName',
    components: {
      CodeEditor
    },
    data() {
        return {
          value: ''
        }
    }
}"
        :languages="[['javascript', 'JS']]"
        :readOnly="true"
        height="auto"
        width="100%"
      />
    </div>
  </div>
  <!-- API -->
  <div class="api">
    <div class="container">
      <h2>API</h2>
      <h3>ReadOnly
        <label>- Boolean</label>
      </h3>
      <p>The first step is to get your color into chroma.js. That's what the generic constructor chroma() does. This function attempts to guess the format of the input color for you. For instance, it will recognize any named color from the W3CX11 specification:</p>
    </div>
  </div>
</template>

<script>
import CodeEditor from '@/package/CodeEditor.vue';
import 'highlight.js/styles/atom-one-dark.css';

export default {
  name: 'Home',
  components: {
    CodeEditor,
  },
  data() {
    return {
      value1: `// template
<CodeEditor v-model="value"></CodeEditor>`,
      value2: `// script
import CodeEditor from 'CodeEditor';
export default {
    name: 'PageName',
    components: {
      CodeEditor
    },
    data() {
        return {
          value: ''
        }
    }
}`
    };
  },
};
</script>

<style lang="scss">
$body_width: 580px;

@font-face {
    font-family: 'Quicksand';
    src: url('../assets/font/Quicksand-Regular.woff2') format('woff2'),
        url('../assets/font/Quicksand-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

body {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI Variable,Segoe UI,system-ui,ui-sans-serif,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
  margin: 0;
  background: var(--grey_1);
}
a {
  color: var(--main_5);
  text-decoration: none;
  &:hover {
    color: var(--main_5);
    text-decoration: underline;
  }
}
h1, h2, h3, h4, p {
  a {
    font-family: Consolas,Monaco,monospace;
  }
}
h1, h2, h3, h4 {
  font-family: 'Quicksand';
  > label {
    color: var(--grey_4);
  }
}
h1 {
  color: var(--grey_8);
  margin: 50px 0;
  font-size: 46px;
  text-align: center;
}
h2 {
  color: var(--grey_8);
  margin: 40px 0;
  font-size: 34px;
}
h3 {
  color: var(--grey_8);
  margin: 20px 0;
  font-size: 20px;
}
h4 {
  color: var(--grey_7);
  margin: 20px 0;
  font-size: 16px;
}
p {
  color: var(--grey_8);
  line-height: 1.5;
}
code {
  font-family: Consolas,Monaco,monospace;
  font-size: 85%;
  color: var(--main_5);
  background: var(--grey_2);
  padding: .2em .4em;
  border-radius: .3em;
}
mark {
  font-family: Consolas,Monaco,monospace;
  color: var(--main_5);
  background: none;
}
// demo
.demo {
  box-sizing: border-box;
  padding: 60px 20px 120px 20px;
  margin: 0 auto;
  background: var(--grey_2);
}
.subtitle {
  text-align: center;
  & + div {
    margin-top: 70px;
  }
}
.code_editor {
  & + .code_editor {
    margin-top: 32px;
  }
  & + p {
    margin-top: 32px;
  }
}
.container {
  margin: 0 auto;
  max-width: $body_width;
}
// useage
.useage {
  background: var(--grey_3);
  padding: 60px 20px;
}
// api
.api {
  background: var(--grey_3);
  padding: 60px 20px;
}
</style>
