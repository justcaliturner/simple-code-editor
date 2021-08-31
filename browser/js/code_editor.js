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
            this.$refs.textarea.select();
            document.execCommand("copy");
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
<textarea ref="textarea" :value="content"></textarea>
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
        defaultDisplay: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            show: this.defaultDisplay,
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
</div>
    `
};

// CodeEditor
const CodeEditor = {
    components: {
        'copy-code': CopyCode,
        'dropdown': Dropdown
    },
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
    template: `
<div
    class="code_editor"
    :class="{ dark: isDark, light: isLight, read_only: isReadOnly }"
    :style="{ width: width, height: height, borderRadius: borderRadius, zIndex: zIndex }"
>
<div class="header" v-if="showHeader">
    <dropdown
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
                this.mark = lang[1] === undefined ? lang[0] : lang[1];
                this.languageClass = 'language-' + lang[0];
            "
        >
          {{ lang[1] === undefined ? lang[0] : lang[1] }}
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
    </dropdown>
    <copy-code
    width="16px"
    height="16px"
    :content="content"
    v-if="canCopyCode"
    ></copy-code>
</div>
<div
    class="code_area"
    :style="{
    borderTopLeftRadius: readOnly == true ? borderRadius : 0,
    borderTopRightRadius: readOnly == true ? borderRadius : 0,
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
`
}