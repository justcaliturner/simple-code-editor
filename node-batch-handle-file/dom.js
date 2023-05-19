import { writeFile, readdir } from "fs";

let dom = "";
// style
const inputFolder = "../my-vue-app/src/SimpleCodeEditor/node_modules/highlight.js/styles";
function styleToDom() {
  return new Promise((resolve) => {
    readdir(inputFolder, (error, files) => {
      if (error) console.error(error);
      files.map((fileName) => {
        if (fileName.indexOf(".css") != -1) {
          const theme = fileName.substring(0, fileName.length - 4);
          dom += `<li :class="{ selected: theme == '${theme}' }" @click="switchTheme('${theme}')">${theme}</li>\n`;
          resolve();
        }
      });
    });
  });
}
// base16 style
const base16InputFolder = "../my-vue-app/src/SimpleCodeEditor/node_modules/highlight.js/styles/base16";
function base16StyleToDom() {
  return new Promise((resolve) => {
    readdir(base16InputFolder, (error, files) => {
      if (error) console.error(error);
      files.forEach((fileName) => {
        if (fileName.indexOf(".css") != -1) {
          const theme = "base16-" + fileName.substring(0, fileName.length - 4);
          dom += `<li :class="{ selected: theme == '${theme}' }" @click="switchTheme('${theme}')">${theme}</li>\n`;
          resolve();
        }
      });
    });
  });
}
// output
function output() {
  return new Promise((resolve) => {
    writeFile("dom.html", dom, (err) => {
      if (err) console.error(err);
      resolve();
    });
  });
}

async function run() {
  await styleToDom();
  await base16StyleToDom();
  await output();
}

run();
