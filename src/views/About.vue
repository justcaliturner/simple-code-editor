<template>
  <div class="about">
    <h1>This is an about page</h1>
    <CodeEditor width="600px" height="300px" :disableSelect="false" :disabled="false" :language="[['css', 'CSS'], ['javascript', 'JavaScript ']]"></CodeEditor>
  </div>
</template>

<script>
  import CodeEditor from "@/components/CodeEditor";
  export default {
    components: {
      CodeEditor
    }
  }
</script>

