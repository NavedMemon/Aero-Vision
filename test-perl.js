const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);

async function testPerlAndLatexmk() {
  try {
    const perlResult = await execPromise("perl --version");
    console.log("Perl version:", perlResult.stdout);
    const latexmkResult = await execPromise("latexmk --version");
    console.log("latexmk version:", latexmkResult.stdout);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
testPerlAndLatexmk();
