<template>
  <div class="about">
    <h1>This is an about page</h1>
    <CodeEditor class="center" v-model="value"></CodeEditor>
  </div>

  <div>{{ value }}</div>
</template>

<script>
import CodeEditor from "@/components/CodeEditor";

export default {
  components: {
    CodeEditor,
  },
  data() {
    return {
      value: `import CodeEditor from '@/components/CodeEditor'`,
    };
  },
};
</script>

<style lang="scss" scoped>
body {
  background: #ccc;
}
.center {
  margin: 0 auto;
  margin-top: 20px;
}
</style>
