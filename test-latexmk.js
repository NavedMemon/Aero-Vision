// test-latexmk.js
const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);

async function testLatexmk() {
  try {
    const { stdout } = await execPromise("latexmk --version");
    console.log("latexmk version:", stdout);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
testLatexmk();
