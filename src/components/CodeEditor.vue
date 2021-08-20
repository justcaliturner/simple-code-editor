<template>
    <div class="code_editor" :style="{width: width, height: height}">
        <Selector width="105px" :mark="mark" :disabled="disableSelect" :hide="hide">
            <ul class="panel">
                <li v-for="lang in languageList" :key="lang" @click="this.mark = lang[1]; this.languageClass = 'language-' + lang[0]">
                    {{ lang[1] }}
                </li>
            </ul>
        </Selector>
        <textarea v-model="value"  @keydown.tab.prevent="tab" v-on:scroll="scroll" :disabled="disabled"></textarea>
            <pre>
                <code :class="languageClass" :style="{ top: top + 'px', left: left + 'px' }">{{ value }}</code>
            </pre>
        </div>
</template>

<script>
    import hljs from 'highlight.js';
    import Selector from "@/components/Selector";
    export default {
        components: {
            Selector
        },
        name: 'CodeEditor',
        props: {
            width: {
                type: String,
                default: '300px'
            },
            height: {
                type: String,
                default: '150px'
            },
            disableSelect: {
                type: Boolean,
                default: false
            },
            language: {
                type: Array
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data: function(){
            return {
                value: '<Selector width="100px" :language="code">',
                top: 0,
                left: 0,
                languageClass: this.language[0][0],
                mark: this.language[0][1],
                hide: false,
                languageList: this.language
            }
        },
        methods: {
            tab() {
                document.execCommand("insertText", false, '    ');
            },
            scroll(event) {
                this.top = -event.target.scrollTop;
                this.left = -event.target.scrollLeft
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
            caret-color: #ccc;
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
            background: #282c34;
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
    .selector {
        position: absolute;
        z-index: 2;
        top: 12px;
        right: 22px;
    }
    .panel {
        font-size: 13px;
        box-sizing: border-box;
        padding: 0;
        list-style: none;
        margin: 0;
        text-align: left;
        background: white;
        li {
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
</style>

<style>
/* theme */
    .hljs {
        color: #abb2bf;
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
    .hljs-link {
        text-decoration: underline;
    }
</style>