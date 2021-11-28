<template>
  <div
    class="code_editor hljs"
    :class="{
      hide_header: withoutHeader,
      scroll: canScroll,
      read_only: read_only,
      wrap_code: wrap_code,
      atom_one_dark: theme == 'dark',
      atom_one_light: theme == 'light',
    }"
    :style="{
      width: width,
      height: height,
      borderRadius: border_radius,
      zIndex: z_index,
      maxWidth: max_width,
      minWidth: min_width,
      maxHeight: max_height,
      minHeight: min_height,
    }"
  >
    <div class="header" v-if="withoutHeader == true ? false : true">
      <Dropdown
        :color="theme == 'dark' ? '#aaa' : '#999'"
        :width="selector_width"
        :mark="mark"
        :disabled="language_selector == false ? true : false"
        v-if="display_language"
        :default_display="selector_displayed_by_default"
      >
        <ul class="lang_list" :style="{ height: selector_height }">
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
      </Dropdown>
      <CopyCode
        width="16px"
        height="16px"
        :color="theme == 'dark' ? '#aaa' : '#999'"
        :content="content"
        v-if="copy_code"
      ></CopyCode>
    </div>
    <div
      class="code_area"
      :style="{
        borderBottomLeftRadius: border_radius,
        borderBottomRightRadius: border_radius,
        borderTopLeftRadius: withoutHeader == true ? border_radius : 0,
        borderTopRightRadius: withoutHeader == true ? border_radius : 0,
      }"
    >
      <textarea
        v-if="
          read_only == true ? false : modelValue === undefined ? true : false
        "
        ref="textarea"
        :autofocus="autofocus"
        @input="calcContainerWidth"
        @keydown.tab.prevent="tab"
        v-on:scroll="scroll"
        v-model="staticValue"
        :style="{ fontSize: font_size }"
      ></textarea>
      <textarea
        v-if="
          read_only == true ? false : modelValue === undefined ? false : true
        "
        ref="textarea"
        :autofocus="autofocus"
        @keydown.tab.prevent="tab"
        v-on:scroll="scroll"
        :value="modelValue"
        @input="
          $emit('update:modelValue', $event.target.value),
            calcContainerWidth($event)
        "
        :style="{ fontSize: font_size }"
      ></textarea>
      <pre
        :style="{ width: containerWidth === 0 ? '' : containerWidth + 'px' }"
      >
        <code
            :class="languageClass"
            :style="{ top: top + 'px', left: left + 'px', fontSize: font_size, borderBottomLeftRadius: read_only == true ? border_radius : 0, borderBottomRightRadius: read_only == true ? border_radius : 0 }"
        >{{ read_only == true ? value : modelValue === undefined ? staticValue + '\n' : modelValue + '\n' }}</code>
      </pre>
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js";
import Dropdown from "./Dropdown.vue";
import CopyCode from "./CopyCode.vue";

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
    wrap_code: {
      type: Boolean,
      default: false,
    },
    read_only: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    hide_header: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "540px",
    },
    height: {
      type: String,
      default: "auto",
    },
    max_width: {
      type: String,
    },
    min_width: {
      type: String,
    },
    max_height: {
      type: String,
    },
    min_height: {
      type: String,
    },
    border_radius: {
      type: String,
      default: "12px",
    },
    language_selector: {
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
    selector_width: {
      type: String,
      default: "110px",
    },
    selector_height: {
      type: String,
      default: "auto",
    },
    selector_displayed_by_default: {
      type: Boolean,
      default: false,
    },
    display_language: {
      type: Boolean,
      default: true,
    },
    copy_code: {
      type: Boolean,
      default: true,
    },
    z_index: {
      type: String,
    },
    font_size: {
      type: String,
      default: "17px",
    },
    theme: {
      type: String,
      default: "dark",
    },
  },
  data() {
    return {
      containerWidth: 0,
      staticValue: this.value,
      top: 0,
      left: 0,
      languageClass: this.languages[0][0],
      mark:
        this.languages[0][1] === undefined
          ? this.languages[0][0]
          : this.languages[0][1],
      languageList: this.languages,
      content:
        this.modelValue === undefined ? this.staticValue : this.modelValue,
    };
  },
  computed: {
    canScroll() {
      return this.height == "auto" ? false : true;
    },
    withoutHeader() {
      if (this.hide_header == true) {
        return true;
      } else {
        return this.display_language == false && this.copy_code == false
          ? true
          : false;
      }
    },
  },
  methods: {
    calcContainerWidth(event) {
      //  calculating the textarea's width while typing for syncing the width between textarea and highlight area
      this.containerWidth = event.target.clientWidth;
    },
    tab() {
      document.execCommand("insertText", false, "    ");
    },
    scroll(event) {
      this.top = -event.target.scrollTop;
      this.left = -event.target.scrollLeft;
    },
    resize(){
      // listen to the change of the textarea's width to resize the highlight area
      const resize = new ResizeObserver(entries => {
        for (let entry of entries) {
            const obj = entry.contentRect;
            this.containerWidth = obj.width + 40  // 40 is the padding
        }
      });
      // only the textarea is rendered the listener will run
      if(this.$refs.textarea){
        resize.observe(this.$refs.textarea);
      }
    }
  },
  mounted() {
    this.$nextTick(function () {
      hljs.highlightAll();
      hljs.configure({ ignoreUnescapedHTML: true });
      this.content =
        this.modelValue === undefined ? this.staticValue : this.modelValue;
    });
    this.resize()
  },
  updated() {
    this.$nextTick(function () {
      hljs.highlightAll();
      this.content =
        this.modelValue === undefined ? this.staticValue : this.modelValue;
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
  text-align: left;
}
.code_editor > .code_area {
  position: relative;
  overflow: hidden;
}
.code_editor > .code_area > textarea,
.code_editor > .code_area > pre > code {
  padding: 0px 20px 20px 20px;
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
  display: block;
  border: none;
  margin: 0;
}

/* hide_header */
.hide_header > .code_area > textarea,
.hide_header > .code_area > pre > code {
  padding: 20px;
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

/* wrap code */
.wrap_code > .code_area > textarea,
.wrap_code > .code_area > pre > code {
  white-space: pre-wrap;
  word-wrap: break-word;
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
  background: white;
}
.panel > .lang_list > li {
  font-size: 13px;
  color: #333;
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
  color: #111;
  background: #eee;
}
</style>

<style>
/*
Atom One Dark by Daniel Gamage
Original One Dark Syntax theme from https://github.com/atom/one-dark-syntax
*/
.atom_one_dark.hljs,
.atom_one_dark .hljs {
  color: #abb2bf;
  background: #282c34;
}
.atom_one_dark .hljs-comment,
.atom_one_dark .hljs-quote {
  color: #5c6370;
  font-style: italic;
}
.atom_one_dark .hljs-doctag,
.atom_one_dark .hljs-keyword,
.atom_one_dark .hljs-formula {
  color: #c678dd;
}
.atom_one_dark .hljs-section,
.atom_one_dark .hljs-name,
.atom_one_dark .hljs-selector-tag,
.atom_one_dark .hljs-deletion,
.atom_one_dark .hljs-subst {
  color: #e06c75;
}
.atom_one_dark .hljs-literal {
  color: #56b6c2;
}
.atom_one_dark .hljs-string,
.atom_one_dark .hljs-regexp,
.atom_one_dark .hljs-addition,
.atom_one_dark .hljs-attribute,
.atom_one_dark .hljs-meta .hljs-string {
  color: #98c379;
}
.atom_one_dark .hljs-attr,
.atom_one_dark .hljs-variable,
.atom_one_dark .hljs-template-variable,
.atom_one_dark .hljs-type,
.atom_one_dark .hljs-selector-class,
.atom_one_dark .hljs-selector-attr,
.atom_one_dark .hljs-selector-pseudo,
.atom_one_dark .hljs-number {
  color: #d19a66;
}
.atom_one_dark .hljs-symbol,
.atom_one_dark .hljs-bullet,
.atom_one_dark .hljs-link,
.atom_one_dark .hljs-meta,
.atom_one_dark .hljs-selector-id,
.atom_one_dark .hljs-title {
  color: #61aeee;
}
.atom_one_dark .hljs-built_in,
.atom_one_dark .hljs-title .class_,
.atom_one_dark .hljs-class .hljs-title {
  color: #e6c07b;
}
.atom_one_dark .hljs-emphasis {
  font-style: italic;
}
.atom_one_dark .hljs-strong {
  font-weight: bold;
}
.atom_one_dark .hljs-link {
  text-decoration: underline;
}
/*
Atom One Light by Daniel Gamage
Original One Light Syntax theme from https://github.com/atom/one-light-syntax
*/
.atom_one_light.hljs,
.atom_one_light .hljs {
  color: #383a42;
  background: #fafafa;
}
.atom_one_light .hljs-comment,
.atom_one_light .hljs-quote {
  color: #a0a1a7;
  font-style: italic;
}
.atom_one_light .hljs-doctag,
.atom_one_light .hljs-keyword,
.atom_one_light .hljs-formula {
  color: #a626a4;
}
.atom_one_light .hljs-section,
.atom_one_light .hljs-name,
.atom_one_light .hljs-selector-tag,
.atom_one_light .hljs-deletion,
.atom_one_light .hljs-subst {
  color: #e45649;
}
.atom_one_light .hljs-literal {
  color: #0184bb;
}
.atom_one_light .hljs-string,
.atom_one_light .hljs-regexp,
.atom_one_light .hljs-addition,
.atom_one_light .hljs-attribute,
.atom_one_light .hljs-meta .hljs-string {
  color: #50a14f;
}
.atom_one_light .hljs-attr,
.atom_one_light .hljs-variable,
.atom_one_light .hljs-template-variable,
.atom_one_light .hljs-type,
.atom_one_light .hljs-selector-class,
.atom_one_light .hljs-selector-attr,
.atom_one_light .hljs-selector-pseudo,
.atom_one_light .hljs-number {
  color: #986801;
}
.atom_one_light .hljs-symbol,
.atom_one_light .hljs-bullet,
.atom_one_light .hljs-link,
.atom_one_light .hljs-meta,
.atom_one_light .hljs-selector-id,
.atom_one_light .hljs-title {
  color: #4078f2;
}
.atom_one_light .hljs-built_in,
.atom_one_light .hljs-title .class_,
.atom_one_light .hljs-class .hljs-title {
  color: #c18401;
}
.atom_one_light .hljs-emphasis {
  font-style: italic;
}
.atom_one_light .hljs-strong {
  font-weight: bold;
}
.atom_one_light .hljs-link {
  text-decoration: underline;
}
</style>