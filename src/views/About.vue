<template>
  <div class="about">
    <h1>This is an about page</h1>
    <CodeEditor class="center"
      v-model="value"
      :copyCode="false"
      :activeSelect="false"
      :disableEdit="true"
      borderRadius="12px"
    ></CodeEditor>

    <CodeEditor class="center"
      v-model="value"
      :onlyRead="true"
    ></CodeEditor>

    <CodeEditor class="center"
      v-model="value2"
      height="230px"
      :defaultDropdownDisplay="true"
      :language="[['css', 'CSS'], ['javascript', 'JS'], ['html', 'HTML']]"
      :darkTheme="false"
    ></CodeEditor>
  </div>

  <div>{{ value }}</div>
</template>

<script>
  import CodeEditor from "@/components/CodeEditor";

  export default {
    components: {
      CodeEditor
    },
    data(){
      return {
        value: `import CodeEditor from '@/components/CodeEditor'`,
        value2:
`.switch_theme {
    width: 100%;
    font-size: 0;
    margin: 0;
    padding: 0;
    color: #878990;
}`
      }
    }
  }
</script>

<style lang="scss">
  body {
    background: #ccc;
  }
  .center {
    margin: 0 auto;
    margin-top: 20px;
  }

</style>
