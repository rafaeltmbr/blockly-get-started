window.addEventListener("load", () => {
  const runButton = document.querySelector("#run-button");
  const codeContainer = document.querySelector(".code-container");

  // create Blockly workspace
  const workspace = Blockly.inject("blocklyDiv", {
    media: "./blockly/media/", // audio and image files used in the workspace area
    toolbox: document.getElementById("toolbox"),
  });

  // insert the start code into Blockly workspace area (optional)
  Blockly.Xml.domToWorkspace(document.getElementById("startBlocks"), workspace);

  // keep track of every workspace change and update the javascript code shown in the left
  workspace.addChangeListener(() => {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    codeContainer.innerText = code;
  });

  // get the javascript parsed code from Blockly workspace and execute it
  runButton.addEventListener("click", () => {
    const code = Blockly.JavaScript.workspaceToCode(workspace);

    try {
      eval(code);
    } catch (e) {
      console.error(e.message);
      alert(e.message);
    }
  });
});
