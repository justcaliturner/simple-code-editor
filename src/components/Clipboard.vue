<template>
    <div class="clipboard" @click="copy" @focusout="resetMessage" tabindex="0" :style="{width: width, height: height}">
        <div class="tooltip">{{ message }}</div>
        <textarea ref="textarea" :value="content"></textarea>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
    </div>
</template>

<script>
export default {
    name: 'Clipboard',
    props: {
        content: {
            type: String
        },
        width: {
            type: String,
            default: '20px'
        },
        height: {
            type: String,
            default: '20px'
        },
        color: {
            type: String,
            default: '#aaa'
        }
    },
    data(){
        return {
            message: 'Copy code'
        }
    },
    methods: {
        selectContent(){
            this.$refs.textarea.select();
            document.execCommand('copy')
        },
        copy(event){
            this.selectContent();
            event.target.focus();
            this.message = 'Copied!'
        },
        resetMessage(){
            this.message = 'Copy code'
        }
    }
}
</script>

<style lang="scss" scoped>
    .clipboard {
        transition: .2s opacity ease;
        position: relative;
        opacity: .5;
        width: 20px;
        height: 20px;
        cursor: pointer;
        > textarea {
            position: absolute;
            padding: 0;
            width: 0;
            height: 0;
            background: transparent;
            resize: none;
            opacity: 0;
            border-color: rgba(0,0,0,0);
        }
        > svg {
            pointer-events: none;
        }
        &:hover {
            opacity: 1;
            > .tooltip {
                display: block;
            }
        }
        > .tooltip {
            font-family: sans-serif;
            display: none;
            position: absolute;
            bottom: -40px;
            left: -70px;
            font-size: 12px;
            color: white;
            width: 86px;
            height: 32px;
            line-height: 32px;
            background: rgba(0,0,0,.8);
            box-sizing: border-box;
            text-align: center;
            border-radius: 4px;
        }
    }
</style>