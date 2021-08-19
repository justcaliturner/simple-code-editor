<template>
    <div class="selector" v-on:click="toggle">
        <div :class="{arrow: showArrow, code: showCode}">
            {{ language }}
        </div>
        <transition name="fade">
            <div class="dropdown" :style="{ width: width, maxWidth: maxWidth }" v-if="show">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'Selector',
        props: {
            width: {
                type: String,
                default: '80px'
            },
            maxWidth: {
                type: String,
                default: '160px'
            },
            language: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                show: false
            }
        },
        computed: {
            showArrow(){
                return this.language === '' ? true : false
            },
            showCode(){
                return this.language === '' ? false : true
            }
        },
        methods: {
            toggle(){
                if (this.disabled == false) {
                    this.show == false ? this.show = true : this.show = false
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: transform .2s ease, opacity .2s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        transform: translateY(-10px);
    }
    .selector {
        cursor: pointer;
        position: relative;
        width: 10px;
        height: 10px;
        &:hover > .code,
        &:hover > .arrow {
            opacity: .5;
        }
        .code {
            transition: opacity .2s ease;
            font-family: sans-serif;
            position: absolute;
            top: 0;
            right: 0;
            font-size: 12px;
            color: white;
            opacity: .25;
            width: 36px;
            height: 16px;
            line-height: 16px;
            text-align: right;
        }
        .arrow {
            transition: opacity .2s ease;
            position: absolute;
            opacity: .25;
            top: -20%;
            left: -10%;
            width: 70%;
            height: 70%;
            transform: rotateZ(-135deg) translate(-50%);
            &:before {
                position: absolute;
                content: "";
                display: block;
                width: 100%; 
                height: 2px;
                border-radius: 1px;
                background: white;
            }
            &:after {
                position: absolute;
                content: "";
                display: block;
                width: 2px; 
                height: 100%;
                border-radius: 1px;
                background: white;
            }   
        }
        .dropdown {
            position: absolute;
            overflow: hidden;
            top: 20px;
            right: 0;
            border-radius: 4px;
            background: #fff;
            box-sizing: border-box;
            border: 1px solid #ddd;
            box-shadow: 0 2px 12px rgba(0, 0, 0, .15);
        }
    }
</style>
