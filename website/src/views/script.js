import CodeEditor from "../SimpleCodeEditor/CodeEditor.vue";

export default {
  name: "Home",
  components: {
    CodeEditor,
  },
  data() {
    return {
      theme: "github-dark",
      demo: "// Please edit it",
      demoLanguages1: `<CodeEditor :languages="[['cpp', 'C++']]" />`,
      demoLanguages2: `<CodeEditor :languages="[['cpp', 'C++'],['python', 'Python'],['php', 'PHP']]" />`,
      isMenuDisplayed: false,
      code: '<CodeEditor v-model="value"></CodeEditor>',
      animationCode: "",
    };
  },
  computed: {
    themeDemo() {
      return `<CodeEditor theme="${this.theme}"></CodeEditor>`;
    },
  },
  methods: {
    switchTheme(theme) {
      this.theme = theme;
    },
    getLanguage(lang) {
      console.log("The current language is: " + lang);
    },
    getContent(content) {
      console.log("The content is: " + content);
    },
    getTextarea(node) {
      console.log("The textarea is: " + node);
    },
    toggleMenu() {
      this.isMenuDisplayed = this.isMenuDisplayed ? false : true;
    },
  },
  mounted() {
    let code = "<CodeEdit";
    let index = 9;
    const timer = setInterval(() => {
      code += this.code[index];
      this.animationCode = code;
      index++;
      if (code == this.code) {
        clearInterval(timer);
      }
    }, 100);
  },
};
