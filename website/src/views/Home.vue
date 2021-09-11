<template>
<div>
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
          It's easy to use, both support <mark>read-only</mark> and
          <mark>edit mode</mark>, you can directly use it in the browser or import the JavaScript
          modules via the NPM package
        </p>
      </div>
      <CodeEditor
        value='<CodeEditor v-model="value"></CodeEditor>'
        z_index="3"
        width="100%"
        :languages="[
          ['html', 'HTML'],
          ['javascript', 'JavaScript'],
          ['css', 'CSS'],
        ]"
        :language_selector="true"
      ></CodeEditor>
      <CodeEditor
        value='import CodeEditor from &apos;CodeEditor&apos;;
export default {
    components: {
      CodeEditor
    },
    data() {
        return {
          value: &apos;&apos;
        }
    }
}'
        width="100%"
        height="332px"
        :language_selector="true"
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
        :read_only="true"
        width="100%"
      ></CodeEditor>
      <p>
        Step 2. Add the JavaScript files after the <code>vue.js</code> file.
      </p>
      <CodeEditor
        value='<script src="/path/highlight.11.2.0.min.js"></script>
<script src="/path/code_editor.prod.js"></script>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>
      <p>
        Step 3. Declaring the component, and using the customized
        tag into the HTML template. For all configure items please check the
        <a href="#api">API</a> list.
      </p>
      <CodeEditor
        value="const app = Vue.createApp({
  components: {
      'code-editor': CodeEditor
  }
})"
        :languages="[['javascript', 'JS']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>

      <CodeEditor
        value="<code-editor></code-editor>"
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>

      <!-- Install with NPM -->
      <h3 style="margin-top: 60px">Install with NPM</h3>
      <p>Step 1</p>
      <CodeEditor
        value="npm install simple-code-editor"
        :languages="[['shell']]"
        :hide_header="true"
        :read_only="true"
        width="100%"
      />
      <p>
        Step 2. Importing the component and registration.
      </p>
      <CodeEditor
        value="import CodeEditor from 'CodeEditor';
export default {
    name: 'PageName',
    components: {
      CodeEditor
    }
}"
        :languages="[['javascript', 'JS']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>

      <CodeEditor
        value="<CodeEditor></CodeEditor>"
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>

      <h3 style="margin-top: 60px">Customizing the theme style</h3>
      <p>
        You can cover the CSS file to customize the theme style.
      </p>
      <CodeEditor
        value='<link rel="stylesheet" href="/path/theme.css">'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>
    </div>
  </div>
  <!-- API -->
  <div class="api" id="api">
    <div class="container">
      <h2>API</h2>
      <h3 id="read_only">read_only<label> - Boolean</label></h3>
      <p>Default: <code>false</code></p>
      <p>Description: whether the code is editable</p>
      <CodeEditor
        value='<CodeEditor :read_only="true"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>
      <p>UI Rendering:</p>
      <CodeEditor
        :read_only="true"
        value="// Read-only mode"
        width="100%"
      ></CodeEditor>

      <h3>value<label> - String</label></h3>
      <p>Default: unset</p>
      <p>
        Description: setting the contents of a code editor. If you want to bind
        the data, please use the property
        <a href="#v-model"><code>v-model</code></a>
      </p>
      <CodeEditor
        value='<CodeEditor value="console.log(13)"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>
      <p>UI Rendering:</p>
      <CodeEditor value="console.log(13)" width="100%"></CodeEditor>

      <h3 id="v-model">v-model</h3>
      <p>
        Description: varies based on the value of form inputs element or output of components, the specific usage you can read the <a target="_blank" href="https://v3.vuejs.org/api/directives.html#v-model">Vue.js Documentation</a>
      </p>
      <CodeEditor
        value='<CodeEditor v-model="demo"></CodeEditor>
<CodeEditor v-model="demo"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>
      <p>UI Rendering:</p>
      <CodeEditor v-model="demo" width="100%" :hide_header="true"></CodeEditor>
      <CodeEditor v-model="demo" width="100%" :hide_header="true"></CodeEditor>

      <h3 id="language_selector">language_selector<label> - Boolean</label></h3>
      <p>Default: <code>false</code></p>
      <p>
        Description: whether the language selector is availed, if the value is
        <code>true</code>, you can use the property
        <a href="#languages"><code>languages</code></a> to set which languages
        can be selected
      </p>
      <CodeEditor
        value='<CodeEditor :language_selector="true"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>
      <p>UI Rendering:</p>
      <CodeEditor
        value="// You can select the language in the top left corner"
        :language_selector="true"
        width="100%"
      ></CodeEditor>

      <h3 id="languages">languages<label> - array</label></h3>
      <p>
        Default:
        <code>[["javascript", "JS"],["cpp", "C++"],["python", "Python"]]</code>
      </p>
      <p>
        Description: when the value of
        <a href="#language_selector"><code>language_selector</code></a> is
        <code>true</code>, you can set the language list to be selected. This
        property is a two-dimensional array, the first item of each child is an
        index of the language and it's required, the second item of each child is used for display, which is for the
        better user reading experience, it can be free to customize and
        optional, if it's unset the UI display will be replaced with the index
        of the language
      </p>
      <CodeEditor
        value="<CodeEditor :language_selector=&quot;true&quot; :languages=&quot;[['javascript', 'JS'],['python', 'Python']]&quot;></CodeEditor>"
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>
      <p>All the languages:</p>
      <CodeEditor
        :read_only="true"
        height="200px"
        value='[
    "1c",
    "abnf",
    "accesslog",
    "actionscript",
    "ada",
    "angelscript",
    "apache",
    "applescript",
    "arcade",
    "arduino",
    "armasm",
    "xml",
    "asciidoc",
    "aspectj",
    "autohotkey",
    "autoit",
    "avrasm",
    "awk",
    "axapta",
    "bash",
    "basic",
    "bnf",
    "brainfuck",
    "c",
    "cal",
    "capnproto",
    "ceylon",
    "clean",
    "clojure",
    "clojure-repl",
    "cmake",
    "coffeescript",
    "coq",
    "cos",
    "cpp",
    "crmsh",
    "crystal",
    "csharp",
    "csp",
    "css",
    "d",
    "markdown",
    "dart",
    "delphi",
    "diff",
    "django",
    "dns",
    "dockerfile",
    "dos",
    "dsconfig",
    "dts",
    "dust",
    "ebnf",
    "elixir",
    "elm",
    "ruby",
    "erb",
    "erlang-repl",
    "erlang",
    "excel",
    "fix",
    "flix",
    "fortran",
    "fsharp",
    "gams",
    "gauss",
    "gcode",
    "gherkin",
    "glsl",
    "gml",
    "go",
    "golo",
    "gradle",
    "groovy",
    "haml",
    "handlebars",
    "haskell",
    "haxe",
    "hsp",
    "http",
    "hy",
    "inform7",
    "ini",
    "irpf90",
    "isbl",
    "java",
    "javascript",
    "jboss-cli",
    "json",
    "julia",
    "julia-repl",
    "kotlin",
    "lasso",
    "latex",
    "ldif",
    "leaf",
    "less",
    "lisp",
    "livecodeserver",
    "livescript",
    "llvm",
    "lsl",
    "lua",
    "makefile",
    "mathematica",
    "matlab",
    "maxima",
    "mel",
    "mercury",
    "mipsasm",
    "mizar",
    "perl",
    "mojolicious",
    "monkey",
    "moonscript",
    "n1ql",
    "nestedtext",
    "nginx",
    "nim",
    "nix",
    "node-repl",
    "nsis",
    "objectivec",
    "ocaml",
    "openscad",
    "oxygene",
    "parser3",
    "pf",
    "pgsql",
    "php",
    "php-template",
    "plaintext",
    "pony",
    "powershell",
    "processing",
    "profile",
    "prolog",
    "properties",
    "protobuf",
    "puppet",
    "purebasic",
    "python",
    "python-repl",
    "q",
    "qml",
    "r",
    "reasonml",
    "rib",
    "roboconf",
    "routeros",
    "rsl",
    "ruleslanguage",
    "rust",
    "sas",
    "scala",
    "scheme",
    "scilab",
    "scss",
    "shell",
    "smali",
    "smalltalk",
    "sml",
    "sqf",
    "sql",
    "stan",
    "stata",
    "step21",
    "stylus",
    "subunit",
    "swift",
    "taggerscript",
    "yaml",
    "tap",
    "tcl",
    "thrift",
    "tp",
    "twig",
    "typescript",
    "vala",
    "vbnet",
    "vbscript",
    "vbscript-html",
    "verilog",
    "vhdl",
    "vim",
    "wasm",
    "wren",
    "x86asm",
    "xl",
    "xquery",
    "zephir"
]'
        :languages="[
          ['javascript', 'JS'],
          ['python', 'Python'],
        ]"
        :language_selector="true"
        width="100%"
      ></CodeEditor>

      <h3>wrap_code<label> - Boolean</label></h3>
      <p>Default: <code>false</code></p>
      <p>Description: whether the code is allowed to wrap automatically</p>
      <CodeEditor
        value='<CodeEditor :wrap_code="true"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>
      <p>UI Rendering:</p>
      <CodeEditor
        :languages="[['html', 'HTML']]"
        :wrap_code="true"
        value=" <!-- The code can wrap automatically -->
<CodeEditor :language_selector=&quot;true&quot; :hide_header=&quot;true&quot;></CodeEditor>"
        width="100%"
      ></CodeEditor>

      <h3>hide_header<label> - Boolean</label></h3>
      <p>Default: <code>false</code></p>
      <p>Description: whether the header of code editor is hidden</p>
      <CodeEditor
        value='<CodeEditor :hide_header="true"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>
      <p>UI Rendering:</p>
      <CodeEditor
        value="// The header is hidden"
        :hide_header="true"
        width="100%"
      ></CodeEditor>

      <h3>display_language<label> - Boolean</label></h3>
      <p>Default: <code>true</code></p>
      <p>Description: whether the language name is displayed</p>
      <CodeEditor
        value='<CodeEditor :display_language="false"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>
      <p>UI Rendering:</p>
      <CodeEditor
        value="// The language name is hidden"
        :display_language="false"
        width="100%"
      ></CodeEditor>

      <h3>copy_code<label> - string</label></h3>
      <p>Default: <code>true</code></p>
      <p>Description: whether the code can be copied by the icon button</p>
      <CodeEditor
        value='<CodeEditor :copy_code="true"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>
      <p>UI Rendering:</p>
      <CodeEditor
        value="// The icon button is hidden"
        :copy_code="false"
        width="100%"
      ></CodeEditor>

      <h3>font_size<label> - String</label></h3>
      <p>Default: <code>17px</code></p>
      <p>Description: setting the font size</p>
      <CodeEditor
        value='<CodeEditor font_size="17px"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>

      <h3>width<label> - String</label></h3>
      <p>Default: <code>540px</code></p>
      <p>Description: setting the width of the code editor</p>
      <CodeEditor
        value='<CodeEditor width="540px"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>

      <h3>height<label> - String</label></h3>
      <p>Default: <code>auto</code></p>
      <p>Description: the height of the container is adaptive by default, you can also set it to a specific value, and the scroll bar will work with a long text</p>
      <CodeEditor
        value='<CodeEditor height="150px"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>
      <p>UI Rendering:</p>
      <CodeEditor
        value="// The scroll bar will work with a long text"
        height="150px"
        width="100%"
      ></CodeEditor>

      <h3>min_width<label> - String</label></h3>
      <p>Default: <code>Unset</code></p>
      <p>Description: setting the min-width of the code editor</p>
      <CodeEditor
        value='<CodeEditor min_width="200px"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>

      <h3>min_height<label> - String</label></h3>
      <p>Default: <code>Unset</code></p>
      <p>Description: setting the min-height of the code editor</p>
      <CodeEditor
        value='<CodeEditor min_height="200px"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>

      <h3>max_width<label> - String</label></h3>
      <p>Default: <code>Unset</code></p>
      <p>Description: setting the max-width of the code editor</p>
      <CodeEditor
        value='<CodeEditor max_width="200px"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>

      <h3>max_height<label> - String</label></h3>
      <p>Default: <code>Unset</code></p>
      <p>Description: setting the max-height of the code editor</p>
      <CodeEditor
        value='<CodeEditor max_height="200px"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>

      <h3>border_radius<label> - String</label></h3>
      <p>Default: <code>12px</code></p>
      <p>Description: setting the radius of the code editor</p>
      <CodeEditor
        value='<CodeEditor border_radius="4px"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>
      <p>UI Rendering:</p>
      <CodeEditor
        :hide_header="false"
        value="// The border radius is 4px"
        border_radius="4px"
        width="100%"
      ></CodeEditor>

      <h3>selector_width<label> - string</label></h3>
      <p>Default: <code>110px</code></p>
      <p>Description: setting the width of the selector</p>
      <CodeEditor
        value='<CodeEditor selector_width="150px"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>
      <p>UI Rendering:</p>
      <CodeEditor
        :languages="[
          ['javascript', 'JS'],
          ['css', 'The width is 150px'],
        ]"
        :language_selector="true"
        :selector_displayed_by_default="true"
        value="// Demo"
        selector_width="150px"
        width="100%"
      ></CodeEditor>

      <h3>selector_height<label> - string</label></h3>
      <p>Default: <code>auto</code></p>
      <p>Description: setting the height of the selector</p>
      <CodeEditor
        value='<CodeEditor selector_height="90px"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>
      <p>UI Rendering:</p>
      <CodeEditor
        :languages="[
          ['javascript', 'JS'],
          ['css', 'The height is 90px'],
          ['rust', 'Rust'],
          ['python', 'Python'],
          ['cpp', ' C++'],
        ]"
        :language_selector="true"
        :selector_displayed_by_default="true"
        value="// Demo"
        selector_width="160px"
        selector_height="90px"
        width="100%"
      ></CodeEditor>

      <h3>selector_displayed_by_default<label> - Boolean</label></h3>
      <p>Default: <code>false</code></p>
      <p>Description: whether the selector is displayed by default</p>
      <CodeEditor
        value='<CodeEditor :selector_displayed_by_default="true"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>

      <h3>z_index<label> - String</label></h3>
      <p>Default: <code>Unset</code></p>
      <p>Description: setting the stack order of the code editor</p>
      <CodeEditor
        value='<CodeEditor z_index="6"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>

      <h3>autofocus<label> - Boolean</label></h3>
      <p>Default: <code>false</code></p>
      <p>
        Description: whether the code editor should automatically get focus when
        the page loads
      </p>
      <CodeEditor
        value='<CodeEditor :autofocus="true"></CodeEditor>'
        :languages="[['html', 'HTML']]"
        :read_only="true"
        width="100%"
      ></CodeEditor>
    </div>
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
      demo: "// Please edit it",
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
@media screen and (max-width: 560px) {
  .button_group {
    flex-wrap: wrap;
    margin-top: 0;
    button {
      width: calc(50% - 10px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-top: 20px;
      padding: 12px 12px;
    }
  }
}
</style>
