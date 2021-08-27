<template>
  <div class="home">
    <h1 class="title">Simple CodeEditor for Vue.js</h1>
    <CodeEditor v-model="value" width="100%" height="100%"></CodeEditor>
    <h2 class="subtitle">API</h2>
    <h5 class="paragraph_title">ReadOnly
      <label>- Boolean</label>
    </h5>
    <p>The first step is to get your color into chroma.js. That's what the generic constructor chroma() does. This function attempts to guess the format of the input color for you. For instance, it will recognize any named color from the W3CX11 specification:</p>
  </div>
</template>

<script>
import CodeEditor from "@/components/CodeEditor.vue";

export default {
  name: "Home",
  components: {
    CodeEditor,
  },
  data() {
    return {
      value: `// template
<CodeEditor v-model="value"></CodeEditor>

// script
import CodeEditor from 'CodeEditor';
export default {
    name: 'PageName',
    components: {
      CodeEditor
    },
    data() {
        return {
          value: ''
        }
    }
}
`,
    };
  },
};
</script>

<style lang="scss">
@import "../assets/theme/lisa.css";
@import "../assets/theme/lisa_mirror.css";
@font-face {
    font-family: 'Quicksand';
    src: url('../assets/font/Quicksand-Regular.woff2') format('woff2'),
        url('../assets/font/Quicksand-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

body {
  margin: 0;
  background: var(--grey_1);
}
p {
  font-family: sans-serif;
  color: var(--grey_9);
}
.home {
  box-sizing: border-box;
  padding: 0 20px;
  max-width: 600px;
  height: 500px;
  margin: 0 auto;
  margin-top: 80px;
}
.code_editor {
  margin-top: 80px;
}
.title,
.subtitle,
.paragraph_title {
  font-family: 'Quicksand';
  > label {
    color: var(--grey_3);
  }
}
.title {
  color: var(--green_6);
  font-size: 42px;
  text-align: center;
}
.subtitle {
  color: var(--green_6);
  margin: 60px 0 40px 0;
  font-size: 34px;
}
.paragraph_title {
  color: var(--green_6);
  margin: 18px 0;
  font-size: 20px;
}
</style>
