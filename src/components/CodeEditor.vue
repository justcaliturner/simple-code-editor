<template>
    <div class="code_editor" :class="{dark: isDark, light: isLight, simple_mode: isSimpleMode}" :style="{width: width, height: height, borderRadius: borderRadius}">
        <div class="header" v-if="showHeader">
            <Dropdown :width="dropdownWidth" :mark="mark" :disabled="disableDropdown" v-if="canSelect" :defaultDisplay="defaultDropdownDisplay">
                <div class="panel">
                    <ul class="lang_list" :style="{height: dropdownHeight}" v-if="languageSelect">
                        <li v-for="lang in languageList" :key="lang" @click="this.mark = lang[1]; this.languageClass = 'language-' + lang[0]">
                            {{ lang[1] }}
                        </li>
                    </ul>
                    <ul class="switch_theme" v-if="themeSwitch">
                        <li class="dark" :class="{selected: isDark}" @click="switchThemeToDark">Dark</li>
                        <li class="light" :class="{selected: isLight}" @click="switchThemeToLight">Light</li>
                    </ul>
                </div>
            </Dropdown>
            <Clipboard width="16px" height="16px" :content="content" v-if="canCopyCode"></Clipboard>
        </div>
        <div class="code_area" :style="{borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius}">
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
    import hljs from 'highlight.js';
    import Dropdown from "@/components/Dropdown";
    import Clipboard from "@/components/Clipboard";

    export default {
        components: {
            Dropdown,
            Clipboard
        },
        name: 'CodeEditor',
        props: {
            modelValue: {},
            width: {
                type: String,
                default: '540px'
            },
            height: {
                type: String,
                default: '140px'
            },
            borderRadius: {
                type: String,
                default: '12px'
            },
            language: {
                type: Array,
                default: function(){
                    return [['javascript', 'JS'], ['cpp', 'C++'], ['java', 'Java'], ['python', 'Python']]
                }
            },
            disableEdit: {
                type: Boolean,
                default: false
            },
            dropdownWidth: {
                type: String,
                default: '110px'
            },
            dropdownHeight: {
                type: String,
                default: 'auto'
            },
            languageSelect: {
                type: Boolean,
                default: true
            },
            activeSelect: {
                type: Boolean,
                default: true
            },
            themeSwitch: {
                type: Boolean,
                default: true
            },
            copyCode: {
                type: Boolean,
                default: true
            },
            defaultDropdownDisplay: {
                type: Boolean,
                default: false
            },
            darkTheme: {
                type: Boolean,
                default: true
            },
            onlyRead: {
                type: Boolean,
                default: false
            }
        },
        data (){
            return {
                top: 0,
                left: 0,
                languageClass: this.language[0][0],
                mark: this.language[0][1],
                languageList: this.language,
                content: this.modelValue,
                isDark: this.darkTheme
            }
        },
        computed: {
            canCopyCode(){
                if (this.onlyRead == true) {
                    return false
                } else {
                    return this.copyCode
                }
            },
            canSelect(){
                if (this.onlyRead == true) {
                    return false
                } else {
                    return this.activeSelect
                }
            },
            disabledEdit(){
                if (this.onlyRead == true) {
                    return true
                } else {
                    return this.disableEdit
                }
            },
            disableDropdown(){
                return this.languageSelect == false && this.themeSwitch == false ? true : false
            },
            showHeader(){
                return this.canSelect == false && this.canCopyCode == false ? false : true
            },
            isSimpleMode(){
                return this.canSelect == false && this.canCopyCode == false ? true : false
            },
            activeTextarea(){
                return this.canSelect == false && this.canCopyCode == false && this.disabledEdit == true ? false : true
            },
            isLight(){
                return this.isDark == true ? false : true
            }
        },
        methods: {
            tab() {
                document.execCommand("insertText", false, '    ');
            },
            scroll(event) {
                this.top = -event.target.scrollTop;
                this.left = -event.target.scrollLeft
            },
            switchThemeToDark(){
                this.isDark = true
            },
            switchThemeToLight(){
                this.isDark = false
            }
        },
        mounted (){
             this.$nextTick(function (){
                 hljs.highlightAll();
                 hljs.configure({ ignoreUnescapedHTML: true })
             })
        },
        updated (){
            this.$nextTick(function (){
                 hljs.highlightAll();
                 this.content = this.modelValue
            })
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        position: relative;
        z-index: 2;
        height: 34px;
        box-sizing: border-box;
        padding: 12px 12px 5px 18px;
        display: flex;
        justify-content: space-between;
    }
    @font-face {
        font-family: 'source_code_proregular';
        src: url('../assets/fonts/sourcecodepro-regular-webfont.woff2') format('woff2'),
            url('../assets/fonts/sourcecodepro-regular-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    .simple_mode {
        > .code_area {
            border-radius: v-bind(borderRadius);
            height: 100% !important;
            > textarea {
                padding: 20px !important;
            }
            > pre > code {
                padding: 20px !important;
            }
        }
    }
    .code_editor {
        font-size: 16px;
        > .code_area {
            position: relative;
            width: 100%;
            height: calc(100% - 34px);
            overflow: hidden;
            > textarea {
                box-sizing: border-box;
                padding: 0px 20px 12px 20px;
                caret-color: rgba(127,127,127);
                -webkit-text-fill-color: transparent;
                font-family: 'source_code_proregular', monospace;
                font-size: 1em;
                white-space:nowrap;
                border: 0;
                position: absolute;
                z-index: 1;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: none;
                resize: none;
                &:hover {
                    outline: none;
                }
                &:focus-visible {
                    outline: none;
                }
            }
            > pre {
                margin: 0;
                position: absolute;
                z-index: 0;
                top: 0;
                left: 0;
                overflow: auto;
                width: 100%;
                height: 100%;
                text-align: left;
                > code {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                    padding: 0px 20px 12px 20px;
                    display: block;
                    font-family: 'source_code_proregular', monospace;
                    font-size: 1em;
                }
            }
        }
    }
    // dropdown
    .switch_theme {
        width: 100%;
        font-size: 0;
        margin: 0;
        padding: 0;
        color: #878990;
        .selected {
            color: #1f232c;
            background: #f1f3f5;
        }
        > li {
            background: white;
            transition: background .2s ease;
            text-align: center;
            width: 50%;
            line-height: 36px;
            font-weight: bold;
            font-size: 12px;
            font-family: 'source_code_proregular', monospace;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            box-shadow: inset 0 1px 0 0 #e2e5e9;
            & + li {
                box-shadow: inset 1px 0 0 0 #e2e5e9, inset 0 1px 0 0 #e2e5e9;
            }
            &:hover {
                background: #e2e5e9;
            }
        }
    }
    .panel {
        height: 100%;
        > .lang_list {
            overflow: auto;
            height: calc(100% - 36px);
            font-size: 13px;
            box-sizing: border-box;
            padding: 0;
            list-style: none;
            margin: 0;
            text-align: left;
            background: white;
            > li {
                color: #282c34;
                transition: background .2s ease;
                box-sizing: border-box;
                padding: 0 12px;
                font-family: 'source_code_proregular', monospace;
                font-weight: bold;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 28px;
                &:first-child {
                    padding-top: 4px;
                }
                &:last-child {
                    padding-bottom: 4px;
                }
                &:hover {
                    background: #e2e5e9;
                }
            }
        }

    }
</style>

<style lang="scss">
/* theme */
    .dark {
        background: #282c34;
        .hljs {
        color: #abb2bf;
        background: #282c34;
        }

        .hljs-comment,
        .hljs-quote {
        color: #5c6370;
        font-style: italic;
        }

        .hljs-doctag,
        .hljs-keyword,
        .hljs-formula {
        color: #c678dd;
        }

        .hljs-section,
        .hljs-name,
        .hljs-selector-tag,
        .hljs-deletion,
        .hljs-subst {
        color: #e06c75;
        }

        .hljs-literal {
        color: #56b6c2;
        }

        .hljs-string,
        .hljs-regexp,
        .hljs-addition,
        .hljs-attribute,
        .hljs-meta .hljs-string {
        color: #98c379;
        }

        .hljs-attr,
        .hljs-variable,
        .hljs-template-variable,
        .hljs-type,
        .hljs-selector-class,
        .hljs-selector-attr,
        .hljs-selector-pseudo,
        .hljs-number {
        color: #d19a66;
        }

        .hljs-symbol,
        .hljs-bullet,
        .hljs-link,
        .hljs-meta,
        .hljs-selector-id,
        .hljs-title {
        color: #61aeee;
        }

        .hljs-built_in,
        .hljs-title.class_,
        .hljs-class .hljs-title {
        color: #e6c07b;
        }

        .hljs-emphasis {
        font-style: italic;
        }

        .hljs-strong {
        font-weight: bold;
        }

        .hljs-link {
        text-decoration: underline;
        }
    }

    .light {
        background: #fafafa;
        .hljs {
        color: #383a42;
        background: #fafafa;
        }

        .hljs-comment,
        .hljs-quote {
        color: #a0a1a7;
        font-style: italic;
        }

        .hljs-doctag,
        .hljs-keyword,
        .hljs-formula {
        color: #a626a4;
        }

        .hljs-section,
        .hljs-name,
        .hljs-selector-tag,
        .hljs-deletion,
        .hljs-subst {
        color: #e45649;
        }

        .hljs-literal {
        color: #0184bb;
        }

        .hljs-string,
        .hljs-regexp,
        .hljs-addition,
        .hljs-attribute,
        .hljs-meta .hljs-string {
        color: #50a14f;
        }

        .hljs-attr,
        .hljs-variable,
        .hljs-template-variable,
        .hljs-type,
        .hljs-selector-class,
        .hljs-selector-attr,
        .hljs-selector-pseudo,
        .hljs-number {
        color: #986801;
        }

        .hljs-symbol,
        .hljs-bullet,
        .hljs-link,
        .hljs-meta,
        .hljs-selector-id,
        .hljs-title {
        color: #4078f2;
        }

        .hljs-built_in,
        .hljs-title.class_,
        .hljs-class .hljs-title {
        color: #c18401;
        }

        .hljs-emphasis {
        font-style: italic;
        }

        .hljs-strong {
        font-weight: bold;
        }

        .hljs-link {
        text-decoration: underline;
        }
    }
</style>