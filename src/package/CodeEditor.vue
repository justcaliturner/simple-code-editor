<template>
  <div
    class="code_editor"
    :class="{ dark: isDark, light: isLight, read_only: isReadOnly }"
    :style="{ width: width, height: height, borderRadius: borderRadius, zIndex: zIndex }"
  >
    <div class="header" v-if="showHeader">
      <Dropdown
        :width="dropdownWidth"
        :mark="mark"
        :disabled="disableDropdown"
        v-if="canSelect"
        :defaultDisplay="defaultDropdownDisplay"
      >
        <div class="panel">
          <ul
            class="lang_list"
            :style="{ height: dropdownHeight }"
            v-if="languageSelect"
          >
            <li
              v-for="lang in languageList"
              :key="lang"
              @click="
                this.mark = lang[1];
                this.languageClass = 'language-' + lang[0];
              "
            >
              {{ lang[1] }}
            </li>
          </ul>
          <ul class="switch_theme" v-if="themeSwitch">
            <li
              class="dark"
              :class="{ selected: isDark }"
              @click="switchThemeToDark"
            >
              Dark
            </li>
            <li
              class="light"
              :class="{ selected: isLight }"
              @click="switchThemeToLight"
            >
              Light
            </li>
          </ul>
        </div>
      </Dropdown>
      <Clipboard
        width="16px"
        height="16px"
        :content="content"
        v-if="canCopyCode"
      ></Clipboard>
    </div>
    <div
      class="code_area"
      :style="{
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
        fontSize: fontSize
      }"
    >
      <textarea
        v-if="activeTextarea"
        @keydown.tab.prevent="tab"
        v-on:scroll="scroll"
        :disabled="disabledEdit"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
      <pre>
        <code
            :class="languageClass"
            :style="{ top: top + 'px', left: left + 'px' }"
        >{{ modelValue }}</code>
      </pre>
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js";
import Dropdown from "./Dropdown";
import Clipboard from "./Clipboard";

export default {
  components: {
    Dropdown,
    Clipboard,
  },
  name: "CodeEditor",
  props: {
    modelValue: {},
    width: {
      type: String,
      default: "540px",
    },
    height: {
      type: String,
      default: "140px",
    },
    borderRadius: {
      type: String,
      default: "12px",
    },
    languages: {
      type: Array,
      default: function () {
        return [
          ["javascript", "JS"],
          ["cpp", "C++"],
          ["java", "Java"],
          ["python", "Python"],
          ["html", "HTML"],
        ];
      },
    },
    disableEdit: {
      type: Boolean,
      default: false,
    },
    dropdownWidth: {
      type: String,
      default: "110px",
    },
    dropdownHeight: {
      type: String,
      default: "auto",
    },
    languageSelect: {
      type: Boolean,
      default: true,
    },
    activeSelect: {
      type: Boolean,
      default: true,
    },
    themeSwitch: {
      type: Boolean,
      default: true,
    },
    copyCode: {
      type: Boolean,
      default: true,
    },
    defaultDropdownDisplay: {
      type: Boolean,
      default: false,
    },
    darkTheme: {
      type: Boolean,
      default: true,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: String,
      default: '',
    },
    fontSize: {
      type: String,
      default: '16px',
    }
  },
  data() {
    return {
      top: 0,
      left: 0,
      languageClass: this.languages[0][0],
      mark: this.languages[0][1],
      languageList: this.languages,
      content: this.modelValue,
      isDark: this.darkTheme,
    };
  },
  computed: {
    canCopyCode() {
      if (this.readOnly == true) {
        return false;
      } else {
        return this.copyCode;
      }
    },
    canSelect() {
      if (this.readOnly == true) {
        return false;
      } else {
        return this.activeSelect;
      }
    },
    disabledEdit() {
      if (this.readOnly == true) {
        return true;
      } else {
        return this.disableEdit;
      }
    },
    disableDropdown() {
      return this.languageSelect == false && this.themeSwitch == false
        ? true
        : false;
    },
    showHeader() {
      return this.canSelect == false && this.canCopyCode == false
        ? false
        : true;
    },
    isReadOnly() {
      return this.canSelect == false && this.canCopyCode == false
        ? true
        : false;
    },
    activeTextarea() {
      return this.canSelect == false &&
        this.canCopyCode == false &&
        this.disabledEdit == true
        ? false
        : true;
    },
    isLight() {
      return this.isDark == true ? false : true;
    },
  },
  methods: {
    tab() {
      document.execCommand("insertText", false, "    ");
    },
    scroll(event) {
      this.top = -event.target.scrollTop;
      this.left = -event.target.scrollLeft;
    },
    switchThemeToDark() {
      this.isDark = true;
    },
    switchThemeToLight() {
      this.isDark = false;
    },
  },
  mounted() {
    this.$nextTick(function () {
      hljs.highlightAll();
      hljs.configure({ ignoreUnescapedHTML: true });
    });
  },
  updated() {
    this.$nextTick(function () {
      hljs.highlightAll();
      this.content = this.modelValue;
    });
  },
};
</script>

<style scoped>
@font-face {
  font-family: "source_code_proregular";
  src: url("./fonts/sourcecodepro-regular-webfont.woff2") format("woff2"),
       url("./fonts/sourcecodepro-regular-webfont.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}
.header {
  position: relative;
  z-index: 3;
  height: 34px;
  box-sizing: border-box;
  padding: 12px 12px 5px 18px;
  display: flex;
  justify-content: space-between;
}
.read_only > .code_area {
  border-radius: v-bind(borderRadius);
  height: 100% !important;
}
.read_only > .code_area > textarea,
.read_only > .code_area > pre > code {
  padding: 20px !important;
}
.code_editor {
  position: relative;
  font-size: 16px;
}
.code_editor > .code_area {
  position: relative;
  width: 100%;
  height: calc(100% - 34px);
  overflow: hidden;
}
.code_editor > .code_area > textarea {
  box-sizing: border-box;
  padding: 0px 20px 12px 20px;
  caret-color: rgba(127, 127, 127);
  -webkit-text-fill-color: transparent;
  font-family: "source_code_proregular", monospace;
  font-size: 1em;
  white-space: nowrap;
  border: 0;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none;
  resize: none;
}
.code_editor > .code_area > textarea:hover,
.code_editor > .code_area > textarea:focus-visible {
  outline: none;
}
.code_editor > .code_area > pre {
  margin: 0;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  overflow: auto;
  width: 100%;
  height: 100%;
  text-align: left;
}
.code_editor > .code_area > pre > code {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0px 20px 12px 20px;
  display: block;
  font-family: "source_code_proregular", monospace;
  font-size: 1em;
}

/* dropdown */
.switch_theme {
  width: 100%;
  font-size: 0;
  margin: 0;
  padding: 0;
  color: #878990;
}
.switch_theme > .selected {
  color: #1f232c;
  background: #f1f3f5;
}
.switch_theme > li {
  background: white;
  transition: background 0.2s ease;
  text-align: center;
  width: 50%;
  line-height: 36px;
  font-weight: bold;
  font-size: 12px;
  font-family: "source_code_proregular", monospace;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: inset 0 1px 0 0 #e2e5e9;
}
.switch_theme > li + li {
  box-shadow: inset 1px 0 0 0 #e2e5e9, inset 0 1px 0 0 #e2e5e9;
}
.switch_theme > li:hover {
  background: #e2e5e9;
}
.panel {
  height: 100%;
}
.panel > .lang_list {
  overflow: auto;
  height: calc(100% - 36px);
  font-size: 13px;
  box-sizing: border-box;
  padding: 0;
  list-style: none;
  margin: 0;
  text-align: left;
  background: white;
}
.panel > .lang_list > li {
  color: #282c34;
  transition: background 0.2s ease;
  box-sizing: border-box;
  padding: 0 12px;
  font-family: "source_code_proregular", monospace;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 28px;
}
.panel > .lang_list > li:first-child {
  padding-top: 4px;
}
.panel > .lang_list > li:last-child {
  padding-bottom: 4px;
}
.panel > .lang_list > li:hover {
  background: #e2e5e9;
}
</style>

<style>
/* theme */
.dark {
  background: #282c34;
}
.dark .hljs {
  color: #abb2bf;
  background: #282c34;
}

.dark .hljs-comment,
.dark .hljs-quote {
  color: #5c6370;
  font-style: italic;
}

.dark .hljs-doctag,
.dark .hljs-keyword,
.dark .hljs-formula {
  color: #c678dd;
}

.dark .hljs-section,
.dark .hljs-name,
.dark .hljs-selector-tag,
.dark .hljs-deletion,
.dark .hljs-subst {
  color: #e06c75;
}

.dark .hljs-literal {
  color: #56b6c2;
}

.dark .hljs-string,
.dark .hljs-regexp,
.dark .hljs-addition,
.dark .hljs-attribute,
.dark .hljs-meta .hljs-string {
  color: #98c379;
}

.dark .hljs-attr,
.dark .hljs-variable,
.dark .hljs-template-variable,
.dark .hljs-type,
.dark .hljs-selector-class,
.dark .hljs-selector-attr,
.dark .hljs-selector-pseudo,
.dark .hljs-number {
  color: #d19a66;
}

.dark .hljs-symbol,
.dark .hljs-bullet,
.dark .hljs-link,
.dark .hljs-meta,
.dark .hljs-selector-id,
.dark .hljs-title {
  color: #61aeee;
}

.dark .hljs-built_in,
.dark .hljs-title.class_,
.dark .hljs-class .hljs-title {
  color: #e6c07b;
}

.dark .hljs-emphasis {
  font-style: italic;
}

.dark .hljs-strong {
  font-weight: bold;
}

.dark .hljs-link {
  text-decoration: underline;
}
/* light */
.light {
  background: #fafafa;
}
.light .hljs {
  color: #383a42;
  background: #fafafa;
}

.light .hljs-comment,
.light .hljs-quote {
  color: #a0a1a7;
  font-style: italic;
}

.light .hljs-doctag,
.light .hljs-keyword,
.light .hljs-formula {
  color: #a626a4;
}

.light .hljs-section,
.light .hljs-name,
.light .hljs-selector-tag,
.light .hljs-deletion,
.light .hljs-subst {
  color: #e45649;
}

.light .hljs-literal {
  color: #0184bb;
}

.light .hljs-string,
.light .hljs-regexp,
.light .hljs-addition,
.light .hljs-attribute,
.light .hljs-meta .hljs-string {
  color: #50a14f;
}

.light .hljs-attr,
.light .hljs-variable,
.light .hljs-template-variable,
.light .hljs-type,
.light .hljs-selector-class,
.light .hljs-selector-attr,
.light .hljs-selector-pseudo,
.light .hljs-number {
  color: #986801;
}

.light .hljs-symbol,
.light .hljs-bullet,
.light .hljs-link,
.light .hljs-meta,
.light .hljs-selector-id,
.light .hljs-title {
  color: #4078f2;
}

.light .hljs-built_in,
.light .hljs-title.class_,
.light .hljs-class .hljs-title {
  color: #c18401;
}

.light .hljs-emphasis {
  font-style: italic;
}

.light .hljs-strong {
  font-weight: bold;
}

.light .hljs-link {
  text-decoration: underline;
}
</style>