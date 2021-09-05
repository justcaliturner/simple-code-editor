<template>
  <div
    class="code_editor hljs"
    :class="{ display_header: displayHeader, no_scroll: noScroll }"
    :style="{ width: width, height: height, borderRadius: borderRadius, zIndex: zIndex, maxWidth: maxWidth, maxHeight: maxHeight }"
  >
    <div class="header" v-if="displayHeader">
      <Dropdown
        :width="selectorWidth"
        :mark="mark"
        :disabled="languageSelector == false ? true : false"
        v-if="displayLanguage"
        :defaultDisplay="selectorDefaultDisplay"
      >
        <div class="panel">
          <ul
            class="lang_list"
            :style="{ height: selectorHeight }"
          >
            <li
              v-for="lang in languageList"
              :key="lang"
              @click="
                this.mark = lang[1] === undefined ? lang[0] : lang[1];
                this.languageClass = 'language-' + lang[0];
              "
            >
              {{ lang[1] === undefined ? lang[0] : lang[1] }}
            </li>
          </ul>
        </div>
      </Dropdown>
      <CopyCode
        width="16px"
        height="16px"
        :content="content"
        v-if="copyCode"
      ></CopyCode>
    </div>
    <div
      class="code_area"
      :style="{
        borderTopLeftRadius: displayHeader == false ? borderRadius : 0,
        borderTopRightRadius: displayHeader == false ? borderRadius : 0,
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
        fontSize: fontSize
      }"
    >
      <textarea
        v-if="readOnly == true ? false : true"
        @keydown.tab.prevent="tab"
        v-on:scroll="scroll"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
      <pre :style="{borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius}">
        <code
            :class="languageClass"
            :style="{ top: top + 'px', left: left + 'px', overflow: readOnly == true ? 'auto' : 'visible' }"
        >{{ readOnly == true ? value : modelValue }}</code>
      </pre>
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js";
import 'highlight.js/styles/atom-one-dark.css';
import Dropdown from "./Dropdown";
import CopyCode from "./CopyCode";

export default {
  components: {
    Dropdown,
    CopyCode,
  },
  name: "CodeEditor",
  props: {
    modelValue: {},
    readOnly: {
      type: Boolean,
      default: false,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
    },
    width: {
      type: String,
      default: "540px",
    },
    height: {
      type: String,
      default: "140px",
    },
    maxWidth: {
      type: String,
    },
    maxHeight: {
      type: String,
    },
    borderRadius: {
      type: String,
      default: "12px",
    },
    languageSelector: {
      type: Boolean,
      default: false,
    },
    languages: {
      type: Array,
      default: function () {
        return [
          ["javascript", "JS"],
          ["cpp", "C++"],
          ["python", "Python"]
        ];
      },
    },
    selectorWidth: {
      type: String,
      default: "110px",
    },
    selectorHeight: {
      type: String,
      default: "auto",
    },
    displayLanguage: {
      type: Boolean,
      default: true,
    },
    copyCode: {
      type: Boolean,
      default: true,
    },
    selectorDefaultDisplay: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: String
    },
    fontSize: {
      type: String,
      default: '17px',
    }
  },
  data() {
    return {
      top: 0,
      left: 0,
      languageClass: this.languages[0][0],
      mark: this.languages[0][1] === undefined ? this.languages[0][0] : this.languages[0][1],
      languageList: this.languages,
      content: this.readOnly == true ? this.value : this.modelValue,
    };
  },
  computed: {
    noScroll(){
      return this.height === "auto" ? true : false
    },
    displayHeader() {
      if (this.hideHeader == true)
      return false
      else return this.displayLanguage == false && this.copyCode == false
        ? false
        : true;
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
.header {
  position: relative;
  z-index: 3;
  height: 34px;
  box-sizing: border-box;
}
.header > .dropdown {
  position: absolute;
  top: 12px;
  left: 18px;
}
.header > .copy_code {
  position: absolute;
  top: 10px;
  right: 12px;
}
.display_header > .code_area {
  height: calc(100% - 34px) !important;
}
.display_header > .code_area > textarea,
.display_header > .code_area > pre > code {
  padding: 0px 20px 16px 20px !important;
}
.code_editor {
  position: relative;
}
.code_editor > .code_area {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.code_editor > .code_area > textarea {
  box-sizing: border-box;
  padding: 20px;
  caret-color: rgba(127, 127, 127);
  -webkit-text-fill-color: transparent;
  font-family: Consolas,Monaco,monospace;
  line-height: 1.5;
  font-size: 1em;
  white-space: pre;
  word-wrap: normal;
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
.code_editor > .code_area > textarea:disabled {
  white-space: pre;
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
  overflow: hidden;
}
.code_editor > .code_area > pre > code {
  border-radius: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: block;
  font-family: Consolas,Monaco,monospace;
  line-height: 1.5;
  font-size: 1em;
  overflow: visible;
}
.no_scroll > .code_area {
  height: auto !important;
}
.no_scroll > .code_area > pre {
  display: flex;
  position: relative;
}
.no_scroll > .code_area > pre > code {
  position: relative;
}

/* dropdown */
.panel {
  height: 100%;
  font-family: sans-serif;
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
  font-size: 13px;
  color: #282c34;
  transition: background 0.2s ease;
  box-sizing: border-box;
  padding: 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 30px;
}
.panel > .lang_list > li:first-child {
  padding-top: 5px;
}
.panel > .lang_list > li:last-child {
  padding-bottom: 5px;
}
.panel > .lang_list > li:hover {
  background: #e2e5e9;
}
</style>