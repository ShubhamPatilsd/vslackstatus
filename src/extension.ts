// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";

import { io } from "socket.io-client";

//Write to output.
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  //Create output channel

  const socket = io("https://vslackstatus-server-production.up.railway.app/", {
    reconnectionDelayMax: 10000,
    auth: {
      token: vscode.workspace.getConfiguration("vslackstatus").get("userToken"),
      signingSecret: vscode.workspace
        .getConfiguration("vslackstatus")
        .get("signingSecret"),
    },
    query: {
      emoji: vscode.workspace.getConfiguration("vslackstatus").get("emojiCode"),
    },
  });

  vscode.window.showInformationMessage("Beaming Status to Slack");

  const initialStatus = vscode.window.activeTextEditor?.document.fileName
    ? `Editing ${
        path.parse(vscode.window.activeTextEditor.document.fileName || "").base
      } in ${vscode.workspace.name}`
    : vscode.workspace.name
    ? `Idle in ${vscode.workspace.name}`
    : `Idle in VSCode`;

  socket.emit("updateStatus", initialStatus);

  let disposable = vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor?.document.fileName) {
      socket.emit(
        "updateStatus",
        vscode.workspace.name
          ? `Editing ${
              path.parse(editor?.document.fileName || "").base || ""
            } in ${vscode.workspace.name}`
          : `Editing ${path.parse(editor?.document.fileName || "").base || ""}`
      );
    }
  });

  context.subscriptions.push(disposable);
}

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// this method is called when your extension is deactivated
export async function deactivate() {
  // socket.disconnect();

  return undefined;
}
