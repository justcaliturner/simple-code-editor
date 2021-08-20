<template>
    <div class="selector" @click="toggleDropdown" @focusout="hideDropdown" tabindex="0">
        <div :class="{arrow: showArrow, mark: showMark}">
            {{ mark }}
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
        name: 'Selector',
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
    .selector {
        cursor: pointer;
        position: relative;
        width: 10px;
        height: 10px;
        &:hover > .mark,
        &:hover > .arrow {
            opacity: .5;
        }
        .mark {
            transition: opacity .2s ease;
            white-space:nowrap;
            direction: rtl;
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
            overflow: auto;
            top: 20px;
            right: 0;
            border-radius: 4px;
            box-sizing: border-box;
            box-shadow: 0 2px 12px rgba(0, 0, 0, .15);
        }
    }
</style>
