<template>
<CodeEditor value="const app = 22" :wrap="false" theme="github" :header="false" :line-nums="true"></CodeEditor>
</template>
<script>
import CodeEditor from "../SimpleCodeEditor/CodeEditor.vue";
export default {
  name: "Demo",
  components: {
    CodeEditor,
  }
}
</script>