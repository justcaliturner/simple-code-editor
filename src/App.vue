<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <div @click="switchTheme" class="float_button">Dark</div>
  <router-view></router-view>
</template>

<script>
  export default {
    methods: {
      switchTheme(){
        document.body.className === '' ? document.body.className = 'mirror' : document.body.className = ''
      }
    }
  }
</script>


<style lang="scss">
@import "./assets/theme/lisa.css";
@import "./assets/theme/lisa_mirror.css";

#nav {
  display: none;
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.float_button {
  cursor: pointer;
  color: var(--white);
  position: fixed;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--grey_9);
  text-align: center;
  line-height: 44px;
  bottom: 30px;
  right: 20px;
}
</style>
