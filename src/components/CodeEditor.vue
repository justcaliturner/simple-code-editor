<template>
    <div class="code_editor" :class="{dark: isDark, light: isLight}" :style="{width: width, height: height}">
        <Dropdown :width="dropdownWidth" :height="dropdownHeight" :mark="mark" :disabled="disableDropdown" :hide="hide">
            <div class="panel">
                <ul class="lang_list" :style="{height: isFullHeight}" v-if="languageSwitch">
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
        <textarea
            @keydown.tab.prevent="tab"
            v-on:scroll="scroll"
            :disabled="disableEdit"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            v-if="canEdit"
        ></textarea>
            <pre>
                <code
                    :class="languageClass"
                    :style="{ top: top + 'px', left: left + 'px' }"
                >{{ modelValue }}</code>
            </pre>
        </div>
</template>

<script>
    import hljs from 'highlight.js';
    import Dropdown from "@/components/Dropdown";
    export default {
        components: {
            Dropdown
        },
        name: 'CodeEditor',
        props: {
            modelValue: {},
            width: {
                type: String,
                default: '400px'
            },
            height: {
                type: String,
                default: '200px'
            },
            disableDropdown: {
                type: Boolean,
                default: false
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
                default: '36px'
            },
            languageSwitch: {
                type: Boolean,
                default: true
            },
            themeSwitch: {
                type: Boolean,
                default: true
            }
        },
        data (){
            return {
                top: 0,
                left: 0,
                languageClass: this.language[0][0],
                mark: this.language[0][1],
                hide: false,
                languageList: this.language,
                isDark: true,
                isLight: false
            }
        },
        computed: {
            isFullHeight(){
                return this.themeSwitch == false ? '100%' : 'calc(100% - 36px)'
            },
            canEdit(){
                return this.disableEdit == false ? true : false
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
                this.isDark = true;
                this.isLight = false
            },
            switchThemeToLight(){
                this.isDark = false;
                this.isLight = true
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
                 hljs.highlightAll()
            })
        }
    }
</script>

<style lang="scss" scoped>
    @font-face {
        font-family: 'source_code_proregular';
        src: url('../assets/fonts/sourcecodepro-regular-webfont.woff2') format('woff2'),
            url('../assets/fonts/sourcecodepro-regular-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    .code_editor {
        position: relative;
        font-size: 16px;
        > textarea {
            box-sizing: border-box;
            padding: 26px 20px;
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
            border-radius: 6px;
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
                padding: 26px 20px;
                display: block;
                font-family: 'source_code_proregular', monospace;
                font-size: 1em;
            }
        }
    }
    // selector
    .switch_theme {
        position: absolute;
        bottom: 0;
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
            & + li {
                box-shadow: inset 1px 0 0 0 #e2e5e9;
            }
            &:hover {
                background: #e2e5e9;
            }
        }
    }
    .dropdown {
        position: absolute;
        z-index: 2;
        top: 12px;
        right: 22px;
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
            & + ul {
                box-shadow: 0 -1px 0 0 #e2e5e9;
            }
        }

    }
</style>

<style lang="scss">
/* theme */
    .dark {
        pre {
        background: #282c34;
        }
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
        pre {
        background: #fafafa;
        }
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