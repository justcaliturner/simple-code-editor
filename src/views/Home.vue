<template>
  <!-- demo -->
  <div
    class="demo"
    :class="{
      github_dark: githubDark,
      tomorrow_night_bright: tomorrowNightBright,
    }"
  >
    <h1 class="title">Simple CodeEditor for Vue.js</h1>
    <div class="container">
      <div class="subtitle">
        <p>
          It's easy to use, support both <mark>read-only</mark> and
          <mark>edit mode</mark>, hundreds of languages and theme styles powered
          by
          <a target="_blank" href="https://highlightjs.org/">highlight.js</a>,
          and you can directly use it in the browser or import the JavaScript
          modules via the NPM package
        </p>
      </div>
      <CodeEditor
        :autofocus="true"
        v-model="value1"
        width="100%"
        height="90px"
        :languages="[
          ['html', 'Template'],
          ['javascript', 'JavaScript'],
          ['css', 'CSS'],
        ]"
        :languageSelector="true"
      ></CodeEditor>
      <CodeEditor
        class="github"
        v-model="value2"
        width="100%"
        height="330px"
        :languageSelector="true"
      ></CodeEditor>
      <div class="button_group">
        <button :class="{ selected: atomOneDark }" @click="themeAtomOneDark">
          Atom one dark
        </button>
        <button :class="{ selected: githubDark }" @click="themeToGithubDark">
          Github dark
        </button>
        <button
          :class="{ selected: tomorrowNightBright }"
          @click="themeToTomorrowNightBright"
        >
          Tomorrow night bright
        </button>
        <button>
          <a target="_blank" href="https://highlightjs.org/static/demo/"
            >More themes</a
          >
        </button>
      </div>
    </div>
  </div>
  <!-- useage -->
  <div class="useage">
    <div class="container">
      <h2>Useage</h2>
      <!-- Browser -->
      <h3>In the Browser</h3>
      <p>Step 1. Add the CSS file.</p>
      <CodeEditor
        value='<link rel="stylesheet" href="/path/code_editor.min.css">'
        :languages="[['html', 'HTML']]"
        :readOnly="true"
        height="auto"
        width="100%"
      ></CodeEditor>
      <p>
        Step 2. Add the JavaScript files included the dependency
        <a target="_blank" href="https://highlightjs.org/">highlight.js</a>, and
        be careful with the order of the file, and the main script should be
        loaded after the dependency.
      </p>
      <CodeEditor
        value='<script src="/path/vue.js"></script>
// Dependency
<script src="/path/highlight.11.2.0.min.js"></script>
// Main script
<script src="/path/code_editor.prod.js"></script>'
        :languages="[['html', 'HTML']]"
        :readOnly="true"
        width="100%"
        height="auto"
      ></CodeEditor>
      <p>
        Step 3. Declaring the component in JavaScript, and using your customized
        tag into the HTML template. For all configure items please check the
        <a href="#api">API</a> list.
      </p>
      <CodeEditor
        value="const app = Vue.createApp({
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
      ></CodeEditor>

      <CodeEditor
        value="<code-editor v-model='value' :languages='[['javascript', 'JS']]'></code-editor>"
        :languages="[['html', 'HTML']]"
        :readOnly="true"
        height="auto"
        width="100%"
      ></CodeEditor>
      <!-- Install with NPM -->
      <h3 style="margin-top: 60px">Install with NPM</h3>
      <p>Step 1</p>
      <CodeEditor
        value="npm install CodeEditor --save"
        :languages="[['shell']]"
        :hideHeader="true"
        :readOnly="true"
        height="auto"
        width="100%"
      />
      <p>
        Step 2. Importing the component as a module and using the
        <code>&lt;CodeEditor&gt;</code> tag to load the component.
      </p>
      <CodeEditor
        value='<CodeEditor v-model="value"></CodeEditor>'
        :languages="[['html', 'Template']]"
        :readOnly="true"
        height="auto"
        width="100%"
      ></CodeEditor>

      <CodeEditor
        value="import CodeEditor from 'CodeEditor';
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
}"
        :languages="[['javascript', 'JS']]"
        :readOnly="true"
        height="auto"
        width="100%"
      ></CodeEditor>

      <h3 style="margin-top: 60px">Customizing theme style</h3>
      <p>
        The default theme is "Atom One Dark" by Daniel Gamage, you can also
        replace it with any other
        <a
          target="_blank"
          href="https://github.com/highlightjs/highlight.js/tree/main/src/styles"
          >highlight.js</a
        >
        theme, or you can customize it by yourself. And then link the theme's
        CSS file to your HTML file:
      </p>
      <CodeEditor
        value="<link rel='stylesheet' href='/path/github.css'>"
        :languages="[['html', 'HTML']]"
        :readOnly="true"
        height="auto"
        width="100%"
      ></CodeEditor>
      <p>
        If your build tool processes CSS imports, you can also import the theme
        directly as a module:
      </p>
      <CodeEditor
        value="import 'highlight.js/styles/github.css';"
        :languages="[['javascript', 'JS']]"
        :readOnly="true"
        height="auto"
        width="100%"
      ></CodeEditor>
    </div>
  </div>
  <!-- API -->
  <div class="api" id="api">
    <div class="container">
      <h2>API</h2>
      <h3 id="read_only">readOnly<label> - Boolean</label></h3>
      <p>Default: <code>false</code></p>
      <p>Description: whether the code is editable</p>
      <p>Example code:</p>
      <CodeEditor
        value="<CodeEditor :readOnly='true'></CodeEditor>"
        :languages="[['html', 'Template']]"
        :readOnly="true"
        height="auto"
        width="100%"
      ></CodeEditor>

      <h3>value<label> - String</label></h3>
      <p>Default: unset</p>
      <p>
        Description: show your code in the non-editable block, only the
        value of <code><a href="#read_only">readOnly</a></code> is
        <code>true</code> this property can be used. If you want to make the
        code editable you can use the property
        <a href="#v-model"><code>v-model</code></a>, and the value of <code><a href="#read_only">readOnly</a></code> should be <code>false</code>
      </p>
      <p>Example code:</p>
      <CodeEditor
        value="<CodeEditor value='some code'></CodeEditor>"
        :languages="[['html', 'Template']]"
        :readOnly="true"
        height="auto"
        width="100%"
      ></CodeEditor>

      <h3 id="v-model">v-model</h3>
      <p>
        Description: varies based on the value of form inputs element or output
        of components, the specific usage please check on
        <a
          target="_blank"
          href="https://v3.vuejs.org/api/directives.html#v-model"
          >Vue.js 3 Documentation</a
        >
      </p>

      <h3>languageSelector<label> - Boolean</label></h3>
      <p>Default: <code>false</code></p>
      <p>
        Description: whether the language selector is availed, if the value is
        <code>true</code>, you can use the property
        <a href="#languages"><code>languages</code></a> to set which language
        can be selected
      </p>
      <p>Example code:</p>
      <CodeEditor
        value="<CodeEditor :languageSelector='true'></CodeEditor>"
        :languages="[['html', 'Template']]"
        :readOnly="true"
        height="auto"
        width="100%"
      ></CodeEditor>
      <p>UI Rendering:</p>
      <CodeEditor
        value="console.log('This is a demo')"
        :languageSelector="true"
        :readOnly="true"
        height="auto"
        width="100%"
      ></CodeEditor>

      <h3>languages<label> - array</label></h3>
      <p>
        Default:
        <code>[["javascript", "JS"],["cpp", "C++"],["python", "Python"]]</code>
      </p>
      <p>
        Description: when the value of
        <a href="#languageSelector"><code>languageSelector</code></a> is
        <code>true</code>, you can set the language list to be selected. This
        property is a two-dimensional array, the first item of each child is the
        index of the language library for <a href="#">highlight.js </a>
        and it's required, the specific language library you can check the
        <a
          target="_blank"
          href="https://github.com/highlightjs/highlight.js/tree/main/src/languages"
        >
          language list of highlight.js</a
        >, the second item of each child is a displayed item which is used for
        the better user reading experience, it can be free to customize and
        optional, if it's not set, the UI display will be replaced with the
        index of the language library
      </p>
      <p>Example code:</p>
      <CodeEditor
        value="<CodeEditor :languages='[['css', 'CSS'],['javascript', 'JS'],['html', 'HTML']]'></CodeEditor>"
        :languages="[['html', 'Template']]"
        :readOnly="true"
        height="auto"
        width="100%"
      ></CodeEditor>
      <p>UI Rendering:</p>
      <CodeEditor
        value=".subtitle {
  color: var(--grey_7);
  margin: 20px 0;
  font-size: 16px;
}"
        :languages="[
          ['css', 'CSS'],
          ['javascript', 'JS'],
          ['html', 'HTML'],
        ]"
        :selectorDefaultDisplay="true"
        :languageSelector="true"
        :readOnly="true"
        height="auto"
        width="100%"
      ></CodeEditor>

      <h3>hideHeader<label> - Boolean</label></h3>
      <p>Default: <code>false</code></p>
      <p>Description: whether the header of code editor is displayed</p>
      <p>Example code:</p>
      <CodeEditor
        value="<CodeEditor :hideHeader='true'></CodeEditor>"
        :languages="[['html', 'Template']]"
        :readOnly="true"
        height="auto"
        width="100%"
      ></CodeEditor>
      <p>UI Rendering:</p>
      <CodeEditor
        value="console.log('This is a demo')"
        :readOnly="true"
        :hideHeader="true"
        height="auto"
        width="100%"
      ></CodeEditor>

      <h3>displayLanguage<label> - Boolean</label></h3>
      <p>Default: <code>true</code></p>
      <p>Description: whether the language name is displayed</p>

      <h3>copyCode<label> - string</label></h3>
      <p>Default: <code>true</code></p>
      <p>Description: whether the code can be copied by the icon button</p>

      <h3>fontSize<label> - String</label></h3>
      <p>Default: <code>17px</code></p>
      <p>Description: setting the font size in coding</p>

      <h3>width<label> - String</label></h3>
      <p>Default: <code>540px</code></p>
      <p>Description: setting the width of the code editor</p>

      <h3>height<label> - String</label></h3>
      <p>Default: <code>140px</code></p>
      <p>Description: setting the height of the code editor</p>

      <h3>maxWidth<label> - String</label></h3>
      <p>Default: <code>Unset</code></p>
      <p>Description: setting the max-width of the code editor</p>

      <h3>maxHeight<label> - String</label></h3>
      <p>Default: <code>Unset</code></p>
      <p>Description: setting the max-height of the code editor</p>

      <h3>borderRadius<label> - String</label></h3>
      <p>Default: <code>12px</code></p>
      <p>Description: setting the radius of the code editor</p>

      <h3>selectorWidth<label> - string</label></h3>
      <p>Default: <code>110px</code></p>
      <p>Description: setting the width of the selector</p>

      <h3>selectorHeight<label> - string</label></h3>
      <p>Default: <code>110px</code></p>
      <p>Description: setting the height of the selector</p>

      <h3>selectorDefaultDisplay<label> - Boolean</label></h3>
      <p>Default: <code>false</code></p>
      <p>Description: whether the selector is displayed by default</p>

      <h3>zIndex<label> - String</label></h3>
      <p>Default: <code>Unset</code></p>
      <p>Description: setting the stack order of the code editor</p>

      <h3>autofocus<label> - Boolean</label></h3>
      <p>Default: <code>false</code></p>
      <p>
        Description: whether the code editor should automatically get focus when
        the page loads
      </p>
    </div>
  </div>
</template>

<script>
import CodeEditor from "@/package/CodeEditor.vue";

export default {
  name: "Home",
  components: {
    CodeEditor,
  },
  data() {
    return {
      atomOneDark: true,
      githubDark: false,
      tomorrowNightBright: false,
      value1: `<CodeEditor v-model="value"></CodeEditor>`,
      value2: `import CodeEditor from 'CodeEditor';
export default {
    components: {
      CodeEditor
    },
    data() {
        return {
          value: ''
        }
    }
}`,
    };
  },
  methods: {
    themeAtomOneDark() {
      this.atomOneDark = true;
      this.githubDark = false;
      this.tomorrowNightBright = false;
    },
    themeToGithubDark() {
      this.atomOneDark = false;
      this.githubDark = true;
      this.tomorrowNightBright = false;
    },
    themeToTomorrowNightBright() {
      this.atomOneDark = false;
      this.githubDark = false;
      this.tomorrowNightBright = true;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/themes/dist/github-dark.min.css";
@import "../assets/themes/dist/tomorrow-night-bright.min.css";
@font-face {
  font-family: "Quicksand";
  src: url("../assets/font/Quicksand-Regular.woff2") format("woff2"),
    url("../assets/font/Quicksand-Regular.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

$body_width: 580px;

body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI Variable, Segoe UI,
    system-ui, ui-sans-serif, Helvetica, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji;
  margin: 0;
  background: var(--grey_1);
}
table {
  overflow: hidden;
  border-spacing: 0;
  font-size: 16px;
  text-align: left;
  box-sizing: border-box;
  border: 1px solid var(--grey_4);
  border-radius: 6px;
}
th,
td {
  color: var(--grey_9);
  padding: 12px 12px;
}
th + th,
td + td {
  border-left: 1px solid var(--grey_4);
}
td {
  border-top: 1px solid var(--grey_4);
}
a {
  color: var(--main_5);
  text-decoration: none;
  &:hover {
    color: var(--main_5);
    text-decoration: underline;
  }
}
h1,
h2,
h3,
h4,
p {
  a {
    font-family: Consolas, Monaco, monospace;
  }
}
h1,
h2,
h3,
h4 {
  font-family: "Quicksand";
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
  font-family: Consolas, Monaco, monospace;
  font-size: 85%;
  color: var(--main_5);
  background: var(--grey_2);
  padding: 0.2em 0.4em;
  border-radius: 0.3em;
}
mark {
  font-family: Consolas, Monaco, monospace;
  color: var(--main_5);
  background: none;
}
// demo
.demo {
  box-sizing: border-box;
  padding: 60px 20px 120px 20px;
  margin: 0 auto;
  background: var(--grey_0);
}
.subtitle {
  text-align: center;
  & + div {
    margin-top: 60px;
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
  padding: 60px 20px 100px 20px;
}
// api
.api {
  background: var(--grey_0);
  padding: 60px 20px;
  h3 {
    margin: 60px 0 12px 0;
  }
  p {
    margin: 0 0 4px 0;
    & + .code_editor {
      margin-top: 16px;
    }
  }
  .code_editor + p {
    margin-top: 16px;
  }
}
.button_group {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  a {
    color: unset;
  }
}
button {
  user-select: none;
  color: var(--grey_8);
  font-size: 14px;
  background: var(--grey_2);
  border-radius: 6px;
  cursor: pointer;
  border: none;
  padding: 8px 12px;
}
.selected {
  color: var(--main_5);
  background: var(--main_1);
}
</style>
