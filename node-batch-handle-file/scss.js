import { readFileSync, writeFile, readdir, copyFileSync } from "fs";

// styles
const inputFolder = "../my-vue-app/src/SimpleCodeEditor/node_modules/highlight.js/styles";
let content = "";
readdir(inputFolder, (error, files) => {
  if (error) console.error(error);
  files.forEach((fileName) => {
    if (fileName.indexOf(".css") != -1) {
      content +=
        "[theme='" +
        fileName.substring(0, fileName.length - 4) +
        "']" +
        "{" +
        readFileSync(`${inputFolder}/${fileName}`, "utf-8") +
        "}" +
        "\n\n";
    } else if (fileName.indexOf(".jpg") != -1 || fileName.indexOf(".png") != -1) {
      copyFileSync(`${inputFolder}/${fileName}`, `./dist/${fileName}`);
    }
  });
  writeFile("themes.scss", content, (err) => {
    if (err) {
      console.error(err);
    }
  });
});

// base16 style
const base16InputFolder = "../my-vue-app/src/SimpleCodeEditor/node_modules/highlight.js/styles/base16";
let base16Content = "";
readdir(base16InputFolder, (error, files) => {
  if (error) console.error(error);
  files.forEach((fileName) => {
    if (fileName.indexOf(".css") != -1) {
      base16Content +=
        "[theme='base16-" +
        fileName.substring(0, fileName.length - 4) +
        "']" +
        "{" +
        readFileSync(`${base16InputFolder}/${fileName}`, "utf-8") +
        "}" +
        "\n\n";
    } else if (fileName.indexOf(".jpg") != -1 || fileName.indexOf(".png") != -1) {
      copyFileSync(`${base16InputFolder}/${fileName}`, `./dist/${fileName}`);
    }
  });
  writeFile("themes-base16.scss", base16Content, (err) => {
    if (err) {
      console.error(err);
    }
  });
});
