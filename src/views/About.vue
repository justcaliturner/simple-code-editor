<template>
  <div class="about">
    <h1>This is an about page</h1>
    <CodeEditor
      v-model="value"
      width="600px"
      height="300px"
      dropdownWidth="110px"
      dropdownHeight="170px"
      :disableDropdown="true"
      :languageSwitch="true"
      :themeSwitch="true"
      :disableEdit="true"
      :language="[['html', 'HTML'], ['python', 'Python'], ['javascript', 'JS'], ['cpp', 'C++'], ['java', 'Java'], ['objectivec', 'Objective-C']]"
    ></CodeEditor>
    <div>{{ value }}</div>
  </div>
</template>

<script>
  import CodeEditor from "@/components/CodeEditor";
  export default {
    components: {
      CodeEditor
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
