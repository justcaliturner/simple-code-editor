<template>
    <div class="code_editor" :style="{width: width, height: height}">
        <Selector width="105px" :language="code" :disabled="false">
            <ul class="panel">
                <li @click="switch_javascript">JavaScript</li>
                <li @click="switch_css">CSS</li>
                <li @click="switch_html">HTML</li>
            </ul>
        </Selector>
        <textarea v-model="value"  @keydown.tab.prevent="tab" v-on:scroll="scroll"></textarea>
            <pre>
                <code :class="language" :style="{ top: top + 'px', left: left + 'px' }">{{ value }}</code>
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
            }
        },
        data: function(){
            return {
                value: '<Selector width="100px" :language="code">',
                top: 0,
                left: 0,
                language: 'language-html',
                code: 'HTML'
            }
        },
        methods: {
            tab: function () {
                document.execCommand("insertText", false, '    ');
            },
            scroll: function (event) {
                this.top = -event.target.scrollTop;
                this.left = -event.target.scrollLeft
            },
            switch_javascript: function(){
                this.code = 'JS';
                this.language = 'language-javascript'
            },
            switch_css: function(){
                this.code = 'CSS';
                this.language = 'language-css'
            },
            switch_html: function(){
                this.code = 'HTML';
                this.language = 'language-html'
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
            padding: 22px 16px;
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
                padding: 22px 16px;
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
        top: 8px;
        right: 20px;
    }
    .panel {
        font-size: 13px;
        box-sizing: border-box;
        padding: 0;
        list-style: none;
        margin: 0;
        text-align: left;
        li {
            box-sizing: border-box;
            padding: 0 12px;
            font-family: 'source_code_proregular', monospace;
            font-weight: bold;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 28px;
            &:hover {
                background: #eee;
            }
        }
        li + li {
            border-top: 1px solid #ddd;
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