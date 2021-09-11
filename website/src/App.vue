<template>
<div>
  <a target="_blank" href="https://github.com/justcaliturner/simple-code-editor"
    ><svg
      width="80"
      height="80"
      viewBox="0 0 250 250"
      style="
        fill: var(--main_4);
        color: #fff;
        position: absolute;
        top: 0;
        border: 0;
        right: 0;
      "
    >
      <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
      <path
        d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
        fill="currentColor"
        style="transform-origin: 130px 106px"
        class="octo-arm"
      ></path>
      <path
        d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
        fill="currentColor"
        class="octo-body"
      ></path></svg
  ></a>
  <div @click="switchTheme" class="float_button">
    <div class="sun">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#222"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-sun"
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    </div>
    <div class="moon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-moon"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </div>
  </div>
  <Home></Home>
  <div class="footer">
    The color system powered by
    <a target="_blank" href="https://lisa.vicuxd.com/">Lisa color</a>
  </div>
</div>
</template>

<script>
import Home from "./views/Home";
export default {
  components: {
    Home,
  },
  mounted() {
    this.$nextTick(function () {
      if (localStorage.getItem("lisa_theme")) {
        localStorage.getItem("lisa_theme") == "light"
          ? (document.body.className = "")
          : (document.body.className = "mirror");
      } else {
        document.body.className = "mirror";
      }
    });
  },
  methods: {
    switchTheme() {
      if (document.body.className === "") {
        document.body.className = "mirror";
        localStorage.setItem("lisa_theme", "mirror");
      } else {
        document.body.className = "";
        localStorage.setItem("lisa_theme", "light");
      }
    },
  },
};
</script>


<style lang="scss">
@import "./assets/theme/lisa.css";
@import "./assets/theme/lisa_mirror.css";

.float_button {
  cursor: pointer;
  color: var(--white);
  position: fixed;
  z-index: 5;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--grey_9);
  text-align: center;
  line-height: 44px;
  bottom: 30px;
  right: 20px;
  opacity: 0.9;
  > div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > .sun {
    display: none;
  }
  > .moon {
    display: flex;
  }
}
.mirror {
  .sun {
    display: flex;
  }
  .moon {
    display: none;
  }
}
.footer {
  font-size: 13px;
  color: var(--grey_4);
  text-align: center;
  padding: 24px 0;
  a {
    color: var(--grey_4);
    &:hover {
      color: var(--main_5);
    }
  }
}
</style>
