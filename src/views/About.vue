<template>
  <div class="about">
    <h1>This is an about page</h1>
    <CodeEditor
      v-model="value"
      width="600px"
      height="300px"
      dropdownWidth="110px"
      dropdownHeight="auto"
      :disableDropdown="false"
      :languageSelect="true"
      :themeSwitch="true"
      :disableEdit="false"
      :copyCode="true"
      :language="[['html', 'HTML'], ['python', 'Python'], ['javascript', 'JS'], ['cpp', 'C++'], ['java', 'Java'], ['objectivec', 'Objective-C'], ['swift', 'Swift']]"
    ></CodeEditor>
    <div>{{ value }}</div>
    <Clipboard></Clipboard>
  </div>
</template>

<script>
  import CodeEditor from "@/components/CodeEditor";
  import Clipboard from "@/components/Clipboard";

  export default {
    components: {
      CodeEditor,
      Clipboard
    },
    data(){
      return {
        value: '<Selector width="100px" :language="code">'
      }
    }
  }
</script>

<style lang="scss">
  body {
    background: #eee;
  }

</style>
