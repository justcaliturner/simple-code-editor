<template>
  <div
    class="code_editor hljs"
    :class="{ hide_header: withoutHeader, scroll: canScroll, read_only: readOnly}"
    :style="{
      width: width,
      height: height,
      borderRadius: borderRadius,
      zIndex: zIndex,
      maxWidth: maxWidth,
      minWidth: minWidth,
      maxHeight: maxHeight,
      minHeight: minHeight,
    }"
  >
    <div class="header" v-if="withoutHeader == true ? false : true">
      <Dropdown
        :width="selectorWidth"
        :mark="mark"
        :disabled="languageSelector == false ? true : false"
        v-if="displayLanguage"
        :defaultDisplay="selectorDisplayedByDefault"
      >
        <div class="panel">
          <ul class="lang_list" :style="{ height: selectorHeight }">
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
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
        borderTopLeftRadius: hideHeader == true ? borderRadius : 0,
        borderTopRightRadius: hideHeader == true ? borderRadius : 0,
      }"
    >
      <textarea
        v-if="readOnly == true ? false : modelValue === undefined ? true : false"
        :autofocus="autofocus"
        @keydown.tab.prevent="tab"
        v-on:scroll="scroll"
        v-model="staticValue"
        :style="{ fontSize: fontSize }"
      ></textarea>
      <textarea
        v-if="readOnly == true ? false : modelValue === undefined ? false : true"
        :autofocus="autofocus"
        @keydown.tab.prevent="tab"
        v-on:scroll="scroll"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :style="{ fontSize: fontSize }"
      ></textarea>
      <pre>
        <code
            :class="languageClass"
            :style="{ top: top + 'px', left: left + 'px', fontSize: fontSize }"
        >{{ readOnly == true ? value : modelValue === undefined ? staticValue + '\n' : modelValue + '\n' }}</code>
      </pre>
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import Dropdown from "./Dropdown";
import CopyCode from "./CopyCode";

export default {
  components: {
    Dropdown,
    CopyCode,
  },
  name: "CodeEditor",
  props: {
    modelValue: {
      type: String,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    autofocus: {
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
      default: "auto",
    },
    maxWidth: {
      type: String,
    },
    minWidth: {
      type: String,
    },
    maxHeight: {
      type: String,
    },
    minHeight: {
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
          ["python", "Python"],
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
    selectorDisplayedByDefault: {
      type: Boolean,
      default: false,
    },
    displayLanguage: {
      type: Boolean,
      default: true,
    },
    copyCode: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: String,
    },
    fontSize: {
      type: String,
      default: "17px",
    },
  },
  data() {
    return {
      staticValue: "// You can use the v-model to bind data.",
      top: 0,
      left: 0,
      languageClass: this.languages[0][0],
      mark:
        this.languages[0][1] === undefined
          ? this.languages[0][0]
          : this.languages[0][1],
      languageList: this.languages,
      content: this.readOnly == true ? this.value : this.modelValue,
    };
  },
  computed: {
    canScroll() {
      return this.height == "auto" ? false : true;
    },
    withoutHeader() {
      if (this.hideHeader == true) {
        return true;
      } else {
        return this.displayLanguage == false && this.copyCode == false
          ? true
          : false;
      }
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
      console.log(1)
    });
  },
  updated() {
    this.$nextTick(function () {
      hljs.highlightAll();
      this.content = this.modelValue;
      console.log(2)
    });
  },
};
</script>

<style scoped>
/* header */
.header {
  position: relative;
  z-index: 2;
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

/* code_area */
.code_editor {
  display: flex;
  flex-direction: column;
  font-size: 0;
  position: relative;
}
.code_editor > .code_area {
  position: relative;
  overflow: hidden;
}
.code_editor > .code_area > textarea,
.code_editor > .code_area > pre > code {
  padding: 0px 20px 16px 20px;
  font-family: Consolas, Monaco, monospace;
  line-height: 1.5;
  font-size: 16px;
}
.code_editor > .code_area > textarea {
  overflow-y: hidden;
  box-sizing: border-box;
  caret-color: rgba(127, 127, 127);
  -webkit-text-fill-color: transparent;
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
.code_editor > .code_area > textarea:hover,
.code_editor > .code_area > textarea:focus-visible {
  outline: none;
}
.code_editor > .code_area > pre {
  position: relative;
  margin: 0;
}
.code_editor > .code_area > pre > code {
  position: relative;
  overflow-x: visible;
  border-radius: 0;
  box-sizing: border-box;
}

/* hide_header */
.hide_header > .code_area > textarea {
  padding: 16px 20px;
}
.hide_header > .code_area > pre > code {
  padding: 16px 20px;
}
.hide_header.scroll > .code_area {
  height: 100%;
}

/* read_only */
.read_only > .code_area > pre > code {
  width: 100%;
  height: 100%;
  overflow: auto !important;
}

/* scroll */
.scroll > .code_area {
  height: calc(100% - 34px);
}
.scroll > .code_area > textarea {
  overflow: auto;
}
.scroll > .code_area > pre {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* dropdown */
.panel {
  user-select: none;
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
  background: var(--grey_0);
}
.panel > .lang_list > li {
  font-size: 13px;
  color: var(--grey_8);
  transition: background 0.16s ease, color 0.16s ease;
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
  color: var(--main_5);
  background: var(--grey_2);
}
</style>