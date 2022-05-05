// CopyCode
const CopyCode = {
  props: {
    content: {
      type: String,
    },
    width: {
      type: String,
      default: "20px",
    },
    height: {
      type: String,
      default: "20px",
    },
    color: {
      type: String,
      default: "#aaa",
    },
  },
  data() {
    return {
      message: "Copy code",
    };
  },
  methods: {
    selectContent() {
      let textArea = this.$refs.textarea;
      if (document.execCommand("copy") == true) {
        // older browser support
        let range, selection;
        textArea.focus();
        textArea.select();
        range = document.createRange();
        range.selectNodeContents(textArea);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, textArea.value.length);
        document.execCommand("copy");
      } else {
        // modern browser support (using the clipboard API)
        navigator.clipboard.writeText(textArea.value);
      }
    },
    copy(event) {
      this.selectContent();
      event.target.focus();
      this.message = "Copied!";
    },
    resetMessage() {
      this.message = "Copy code";
    },
  },
  template: `
    <div
    class="copy_code"
    @click="copy"
    @focusout="resetMessage"
    tabindex="0"
    :style="{ width: width, height: height }"
  >
    <div class="tooltip">{{ message }}</div>
    <textarea ref="textarea" :value="content" tabindex="1" read_only></textarea>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-copy"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  </div>
    `
};

// Dropdown
const Dropdown = {
  props: {
    width: {
      type: String,
      default: "80px",
    },
    height: {
      type: String,
      default: "auto",
    },
    mark: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "#aaa",
    },
    default_display: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: this.default_display,
    };
  },
  computed: {
    showArrow() {
      return this.disabled == true ? false : true;
    },
  },
  methods: {
    toggleDropdown() {
      if (this.disabled == false) {
        this.show == true ? (this.show = false) : (this.show = true);
      }
    },
    hideDropdown() {
      this.show = false;
    },
  },
  template: `
<div
    class="dropdown"
    :class="{ disabled: disabled }"
    @click="toggleDropdown"
    @focusout="hideDropdown"
    tabindex="0"
  >
    <div class="mark">
      <div :style="{color: color}">{{ mark }}</div>
      <svg
        v-if="showArrow"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-chevron-down"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
    <transition name="fade">
      <div class="panel" :style="{ width: width, height: height }" v-if="show">
        <slot></slot>
      </div>
    </transition>
  </div>`
};

// CodeEditor
const CodeEditor = {
  components: {
    'copy-code': CopyCode,
    'dropdown': Dropdown
  },
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
  directives: {
    highlight: {
      //vue2
      bind(el, binding) {
        el.textContent = binding.value
        hljs.highlightElement(el)
      },
      componentUpdated(el, binding) {
        el.textContent = binding.value
        hljs.highlightElement(el)
      },
      //vue3
      created(el, binding) {
        el.textContent = binding.value
        hljs.highlightElement(el)
      },
      updated(el, binding) {
        el.textContent = binding.value
        hljs.highlightElement(el)
      }
    }
  },
  data() {
    return {
      containerWidth: 0,
      staticValue: this.value,
      top: 0,
      left: 0,
      languageClass: 'hljs language-' + this.languages[0][0],
      mark:
        this.languages[0][1] === undefined
          ? this.languages[0][0]
          : this.languages[0][1],
      languageList: this.languages,
      content:
        this.modelValue === undefined ? this.staticValue : this.modelValue,
    };
  },
  watch: {
    value(value) {
      this.staticValue = value
    }
  },
  computed: {
    contentValue() {
      return this.read_only ?
        this.value : this.modelValue === undefined ?
          this.staticValue + '\n' : this.modelValue + '\n'
    },
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
    changeLang(lang) {
      this.mark = lang[1] === undefined ? lang[0] : lang[1];
      this.languageClass = 'language-' + lang[0];
      this.$emit('lang', lang[0]);
    },
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
    resize() {
      // listen to the change of the textarea's width to resize the highlight area
      const resize = new ResizeObserver(entries => {
        for (let entry of entries) {
          const obj = entry.contentRect;
          this.containerWidth = obj.width + 40 // 40 is the padding
        }
      });
      // only the textarea is rendered the listener will run
      if (this.$refs.textarea) {
        resize.observe(this.$refs.textarea);
      }
    }
  },
  mounted() {
    this.$emit('lang', this.languages[0][0]);
    this.$emit('langs', this.languages);
    this.$nextTick(function () {
      this.content =
        this.modelValue === undefined ? this.staticValue : this.modelValue;
    });
    this.resize()
  },
  updated() {
    this.$emit('input', this.staticValue)
    this.$nextTick(function () {
      this.content =
        this.modelValue === undefined ? this.staticValue : this.modelValue;
    });
  },
  template: `
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
      <dropdown
        :color="theme == 'dark' ? '#aaa' : '#999'"
        :width="selector_width"
        :mark="mark"
        :disabled="language_selector == false ? true : false"
        v-if="display_language"
        :default_display="selector_displayed_by_default"
      >
        <ul class="lang_list" :style="{ height: selector_height }">
          <li
            v-for="(lang, index) in languageList"
            :key="index"
            @click="changeLang(lang)"
          >
            {{ lang[1] === undefined ? lang[0] : lang[1] }}
          </li>
        </ul>
      </dropdown>
      <copy-code
        width="16px"
        height="16px"
        :color="theme == 'dark' ? '#aaa' : '#999'"
        :content="content"
        v-if="copy_code"
      ></copy-code>
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
        @keydown.tab.prevent.stop="tab"
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
        @keydown.tab.prevent.stop="tab"
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
            v-highlight="contentValue"
            :class="languageClass"
            :style="{ top: top + 'px', left: left + 'px', fontSize: font_size, borderBottomLeftRadius: read_only == true ? border_radius : 0, borderBottomRightRadius: read_only == true ? border_radius : 0 }"
        ></code>
      </pre>
    </div>
  </div>
`
}