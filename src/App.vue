<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <div @click="switchTheme" class="float_button">
    <div class="sun">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
    </div>
    <div class="moon">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
  export default {
    mounted() {
      this.$nextTick(function () {
        if (localStorage.getItem('lisa_theme'))
        localStorage.getItem('lisa_theme') == 'light' ? document.body.className = '' : document.body.className = 'mirror'
      })
    },
    methods: {
      switchTheme(){
        if (document.body.className === ''){
          document.body.className = 'mirror';
          localStorage.setItem('lisa_theme', 'mirror')
        } else {
          document.body.className = '';
          localStorage.setItem('lisa_theme', 'light')
        }
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
  z-index: 5;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--grey_9);
  text-align: center;
  line-height: 44px;
  bottom: 30px;
  right: 20px;
  opacity: .9;
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
</style>
