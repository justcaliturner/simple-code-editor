<template>
  <div
    :theme="theme"
    class="code-editor"
    :class="{
      'hide-header': !header,
      scroll: scroll,
      'read-only': readOnly,
      wrap: wrap,
    }"
    :style="{
      width: width,
      height: height,
      zIndex: zIndex,
      maxWidth: maxWidth,
      minWidth: minWidth,
      maxHeight: maxHeight,
      minHeight: minHeight,
    }"
  >
    <div class="hljs" :style="{ borderRadius: borderRadius }">
      <div
        class="header"
        :class="{ border: showLineNums }"
        v-if="header"
        :style="{ borderRadius: borderRadius + ' ' + borderRadius + ' 0 0' }"
      >
        <Dropdown
          v-if="displayLanguage"
          :width="langListWidth"
          :title="languageTitle"
          :disabled="languages.length <= 1"
          :defaultDisplay="langListDisplay"
        >
          <ul class="lang-list hljs" :style="{ height: langListHeight }">
            <li v-for="(lang, index) in languages" :key="index" @click="changeLang(lang)">
              {{ lang[1] ? lang[1] : lang[0] }}
            </li>
          </ul>
        </Dropdown>
        <CopyCode @click="copy" v-if="copyCode"></CopyCode>
      </div>
      <div
        class="code-area"
        :style="{ borderRadius: header ? '0 0 ' + borderRadius + ' ' + borderRadius : borderRadius }"
      >
        <div
          v-if="showLineNums"
          ref="refLineNums"
          class="line-nums hljs"
          :style="{
            fontSize: fontSize,
            paddingTop: header ? '10px' : padding,
            paddingBottom: padding,
            top: top + 'px',
          }"
        >
          <div>1</div>
          <div v-for="num in lineNum">{{ num + 1 }}</div>
          <div>&nbsp;</div>
        </div>
        <textarea
          ref="refTextarea"
          v-model="modelValue"
          title="textarea"
          :readOnly="readOnly"
          :style="{
            fontSize: fontSize,
            padding: !header ? padding : lineNums ? '10px ' + padding + ' ' + padding : '0 ' + padding + ' ' + padding,
            marginLeft: showLineNums ? lineNumsWidth + 'px' : '0',
            width: showLineNums ? 'calc(100% - ' + lineNumsWidth + 'px)' : '100%',
          }"
          :autofocus="autofocus"
          spellcheck="false"
          :value="modelValue"
          @keydown.tab.prevent.stop="tab"
          @scroll="calcScrollDistance"
          @paste="getPasteValue"
        ></textarea>
        <pre
          :style="{
            paddingRight: scrollBarWidth + 'px',
            paddingBottom: scrollBarHeight + 'px',
            marginLeft: showLineNums ? lineNumsWidth + 'px' : '0',
            width: showLineNums ? 'calc(100% - ' + lineNumsWidth + 'px)' : '100%',
          }"
        >
        <code
          ref="refCode"
          :class="languageClass"
          :style="{
            top: top + 'px',
            left: left + 'px',
            fontSize: fontSize,
            padding: !header ? padding : lineNums ? '10px ' + padding + ' ' + padding : '0 ' + padding + ' ' + padding,
          }">
        </code>
      </pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUpdated, ref } from 'vue';
import hljs from "highlight.js";
import Dropdown from "./Dropdown.vue";
import CopyCode from "./CopyCode.vue";
import "./themes/themes-base16.css";
import "./themes/themes.css";

const props = defineProps({
  lineNums: {
    type: Boolean,
    default: false
  },
  value: {
    type: String
  },
  theme: {
    type: String,
    default: 'github-dark'
  },
  tabSpaces: {
    type: Number,
    default: 2
  },
  wrap: {
    type: Boolean,
    default: false
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  header: {
    type: Boolean,
    default: true
  },
  width: {
    type: String,
    default: '540px'
  },
  height: {
    type: String,
    default: 'auto'
  },
  maxWidth: {
    type: String
  },
  minWidth: {
    type: String
  },
  maxHeight: {
    type: String
  },
  minHeight: {
    type: String
  },
  borderRadius: {
    type: String,
    default: '12px'
  },
  languages: {
    type: Array,
    default: () => [['javascript', 'JS']]
  },
  langListWidth: {
    type: String,
    default: '110px'
  },
  langListHeight: {
    type: String,
    default: 'auto'
  },
  langListDisplay: {
    type: Boolean,
    default: false
  },
  displayLanguage: {
    type: Boolean,
    default: true
  },
  copyCode: {
    type: Boolean,
    default: true
  },
  zIndex: {
    type: String,
    default: '0'
  },
  fontSize: {
    type: String,
    default: '17px'
  },
  padding: {
    type: String,
    default: '20px'
  }
});
const emits = defineEmits(['paste', 'focus']);

const modelValue = defineModel();

const refTextarea = ref(null);
const refLineNums = ref(null);
const refCode = ref(null);

const message = ref('Copy code');
const scrollBarWidth = ref(0);
const scrollBarHeight = ref(0);
const top = ref(0);
const left = ref(0);
const languageClass = ref(`hljs language-${props.languages[0][0]}`);
const languageTitle = props.languages[0][1] ? props.languages[0][1] : props.languages[0][0];
const content = ref(props.value);
const cursorPosition = ref(0);
const insertTab = ref(false);
const lineNum = ref(0);
const lineNumsWidth = ref(0);
const scrolling = ref(false);
const textareaHeight = ref(0);
const showLineNums = ref(props.wrap ? false : props.lineNums);

const tabWidth = computed(() => {
  let result = '';
  for (let i = 0; i < props.tabSpaces; i++) {
    result += ' ';
  }
  return result;
});
const scroll = computed(() => {
  return props.height !== 'auto';
});

function tab() {
  if (document.execCommand('insertText')) {
    document.execCommand('insertText', false, tabWidth.value);
  } else {
    const cursorPos = refTextarea.value.selectionStart;
    content.value =
      content.value.substring(0, cursorPos) + tabWidth.value + content.value.substring(cursorPos);
    cursorPosition.value = cursorPos + tabWidth.value.length;
    insertTab.value = true;
  }
};
function calcScrollDistance(e) {
  refCode.value.scrolling = true;
  scrolling.value = true;
  top.value = -e.target.scrollTop;
  left.value = -e.target.scrollLeft;
};
function resizer() {
  // textareaResizer
  const textareaResizer = new ResizeObserver((entries) => {
    scrollBarWidth.value = entries[0].target.offsetWidth - entries[0].target.clientWidth;
    scrollBarHeight.value = entries[0].target.offsetHeight - entries[0].target.clientHeight;
    textareaHeight.value = entries[0].target.offsetHeight;
  });
  textareaResizer.observe(refTextarea.value);
  // lineNumsResizer
  const lineNumsResizer = new ResizeObserver((entries) => {
    lineNumsWidth.value = entries[0].target.offsetWidth;
  });
  if (refLineNums.value) {
    lineNumsResizer.observe(refLineNums.value);
  }
};
function copy() {
  if (document.execCommand('copy')) {
    refTextarea.value.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    message.value = 'Copied!';
  } else {
    navigator.clipboard.writeText(refTextarea.value.value);
  }
};
function getLineNum() {
  // lineNum
  const str = refTextarea.value.value;
  let numLine = 0;
  let position = str.indexOf('\n');
  while (position !== -1) {
    numLine++;
    position = str.indexOf('\n', position + 1);
  }
  // heightNum
  const singleLineHeight = refLineNums.value.firstChild.offsetHeight;
  const heightNum = parseInt(textareaHeight.value / singleLineHeight) - 1;
  // displayed lineNum
  lineNum.value = props.height === 'auto' ? numLine : numLine > heightNum ? numLine : heightNum;
};
function getPasteValue(event) {
  const pasteValue = event.clipboardData.getData('text');
  emits('paste', pasteValue);
}
function updateHljs(){
  const code = hljs.highlightAuto(modelValue.value);
  refCode.value.innerHTML = code.value;
}

onMounted(() => {
  modelValue.value = modelValue.value === undefined ? props.value : modelValue.value;
  resizer();
  updateHljs();
});
onUpdated(() => {
  if (insertTab.value) {
    refTextarea.value.setSelectionRange(cursorPosition.value, cursorPosition.value);
    insertTab.value = false;
  }
  if (props.lineNums) {
    if (scrolling.value) {
      scrolling.value = false;
    } else {
      getLineNum();
    }
  }
  updateHljs();
});
</script>

<style>
.code-editor {
  position: relative;
}
.code-editor > div {
  width: 100%;
  height: 100%;
}
/* header */
.code-editor .header {
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  height: 34px;
}
.code-editor .header > .dropdown {
  position: absolute;
  top: 12px;
  left: 18px;
}
.code-editor .header > .copy-code {
  position: absolute;
  top: 10px;
  right: 12px;
}
/* code-area */
.code-editor .code-area {
  position: relative;
  z-index: 0;
  text-align: left;
  overflow: hidden;
}
/* font style */
.code-editor .code-area > textarea,
.code-editor .code-area > pre > code,
.code-editor .line-nums > div {
  font-family: Consolas, Monaco, monospace;
  line-height: 1.5;
}
.code-editor .code-area > textarea:hover,
.code-editor .code-area > textarea:focus-visible {
  outline: none;
}
.code-editor .code-area > textarea {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-y: hidden;
  box-sizing: border-box;
  caret-color: rgb(127, 127, 127);
  color: transparent;
  white-space: pre;
  word-wrap: normal;
  border: 0;
  width: 100%;
  height: 100%;
  background: none;
  resize: none;
}
.code-editor .code-area > pre {
  box-sizing: border-box;
  position: relative;
  z-index: 0;
  overflow: hidden;
  font-size: 0;
  margin: 0;
}
.code-editor .code-area > pre > code {
  background: none;
  display: block;
  position: relative;
  overflow-x: visible !important;
  border-radius: 0;
  box-sizing: border-box;
  margin: 0;
}
/* wrap code */
.code-editor.wrap .code-area > textarea,
.code-editor.wrap .code-area > pre > code {
  white-space: pre-wrap;
  word-wrap: break-word;
}
/* hide-header */
.code-editor.hide-header.scroll .code-area {
  height: 100%;
}
/* scroll */
.code-editor.scroll .code-area {
  height: calc(100% - 34px);
}
.code-editor.scroll .code-area > textarea {
  overflow: auto;
}
.code-editor.scroll .code-area > pre {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/* dropdown */
.code-editor .list {
  -webkit-user-select: none;
  user-select: none;
  height: 100%;
  font-family: sans-serif;
}
.code-editor .list > .lang-list {
  border-radius: 5px;
  box-sizing: border-box;
  overflow: auto;
  font-size: 13px;
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: left;
}
.code-editor .list > .lang-list > li {
  font-size: 13px;
  transition: background 0.16s ease, color 0.16s ease;
  box-sizing: border-box;
  padding: 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 30px;
}
.code-editor .list > .lang-list > li:first-child {
  padding-top: 5px;
}
.code-editor .list > .lang-list > li:last-child {
  padding-bottom: 5px;
}
.code-editor .list > .lang-list > li:hover {
  background: rgba(160, 160, 160, 0.4);
}
/* line-nums */
.code-editor .line-nums {
  min-width: 36px;
  text-align: right;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  padding-right: 8px;
  padding-left: 8px;
  opacity: 0.3;
}
.code-editor .line-nums::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-right: 1px solid currentColor;
  opacity: 0.5;
}
.code-editor .header.border::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 0;
  left: 0;
  background: currentColor;
  opacity: 0.15;
}
</style>
