<template>
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
</template>

<script>
export default {
  name: "Dropdown",
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
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.dropdown {
  cursor: pointer;
  position: relative;
}
.dropdown:focus {
  outline: none;
}
.disabled {
  cursor: default;
}
.disabled:hover > .mark {
  opacity: 0.5 !important;
}
.dropdown:hover > .mark {
  opacity: 1;
}
.dropdown > .mark {
  transition: opacity 0.2s ease;
  opacity: 0.5;
  display: flex;
  align-items: center;
  user-select: none;
}
.dropdown > .mark > div {
  white-space: nowrap;
  font-family: sans-serif;
  font-size: 12px;
  line-height: 16px;
}
.dropdown > .mark > svg {
  margin-left: 3px;
  margin-top: 1px;
}
.dropdown > .panel {
  position: absolute;
  border-radius: 6px;
  overflow: hidden;
  top: 24px;
  left: 0;
  box-sizing: border-box;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}
</style>
