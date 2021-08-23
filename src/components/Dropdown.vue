<template>
    <div class="dropdown" :class="{disabled: disabled}" @click="toggleDropdown" @focusout="hideDropdown" tabindex="0">
        <div class="arrow" v-if="showArrow"></div>
        <div class="mark" v-if="showMark">
            <div>{{ mark }}</div>
        </div>
        <transition name="fade">
            <div class="dropdown" :style="{ width: width, height: height }" v-if="show">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'Dropdown',
        props: {
            width: {
                type: String,
                default: '80px'
            },
            height: {
                type: String,
                default: 'auto'
            },
            mark: {
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
                return this.mark === '' ? true : false
            },
            showMark(){
                return this.mark === '' ? false : true
            }
        },
        methods: {
            toggleDropdown(){
                if (this.disabled == false) {
                    this.show == true ? this.show = false : this.show = true
                }
            },
            hideDropdown(){
                this.show = false
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
    .disabled {
        &:hover > .mark,
        &:hover > .arrow {
            opacity: .5 !important;
        }
    }
    .dropdown {
        cursor: pointer;
        position: relative;
        width: 14px;
        height: 14px;
        &:hover > .mark,
        &:hover > .arrow {
            opacity: 1;
        }
        .mark {
            transition: opacity .2s ease;
            position: absolute;
            opacity: .5;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row-reverse;
            > div {
                white-space:nowrap;
                font-family: sans-serif;
                font-size: 12px;
                color: #aaa;
                line-height: 16px;
                text-align: right;
            }
        }
        .arrow {
            transition: opacity .2s ease;
            position: absolute;
            opacity: .5;
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
                background: #aaa;
            }
            &:after {
                position: absolute;
                content: "";
                display: block;
                width: 2px; 
                height: 100%;
                border-radius: 1px;
                background: #aaa;
            }   
        }
        .dropdown {
            position: absolute;
            border-radius: 4px;
            overflow: hidden;
            top: 24px;
            right: 0;
            box-sizing: border-box;
            box-shadow: 0 2px 12px rgba(0, 0, 0, .15);
        }
    }
</style>
