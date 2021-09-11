<template>
  <div
    class="code_editor hljs"
    :class="{
      hide_header: withoutHeader,
      scroll: canScroll,
      read_only: read_only,
      wrap_code: wrap_code,
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
      this.containerWidth = event.target.clientWidth;
    },
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
      this.content =
        this.modelValue === undefined ? this.staticValue : this.modelValue;
    });
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