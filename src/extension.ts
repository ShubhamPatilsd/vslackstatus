// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";

import { App } from "@slack/bolt";

const app = new App({
  signingSecret: vscode.workspace
    .getConfiguration("vslackstatus")
    .get("signingSecret"),
  token: vscode.workspace.getConfiguration("vslackstatus").get("userToken"),
});

const beforeStatus = app.client.users.profile.get().then((res) => {
  return res.profile;
});

//Write to output.
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  //Create output channel

  const initialStatus = vscode.window.activeTextEditor?.document.fileName
    ? {
        profile: JSON.stringify({
          status_text: `Editing ${
            path.parse(vscode.window.activeTextEditor.document.fileName || "")
              .base
          } in ${vscode.workspace.name}`,
          status_emoji: ":vsc:",
          status_expiration: 0,
        }),
      }
    : {
        profile: JSON.stringify({
          status_text: vscode.workspace.name
            ? `Idle in ${vscode.workspace.name}`
            : `Idle in VSCode`,
          status_emoji: ":vsc:",
          status_expiration: 0,
        }),
      };

  app.client.users.profile.set(initialStatus);

  let disposable = vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor?.document.fileName) {
      app.client.users.profile.set({
        profile: JSON.stringify({
          status_text: `Editing ${
            path.parse(editor?.document.fileName || "").base || ""
          } in ${vscode.workspace.name}`,
          status_emoji: ":vsc:",
          status_expiration: 0,
        }),
      });
    }
  });

  context.subscriptions.push(disposable);
}

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// this method is called when your extension is deactivated
export async function deactivate() {
  await timeout(2000);

  const status = await beforeStatus;

  const app = new App({
    signingSecret: vscode.workspace
      .getConfiguration("vslackstatus")
      .get("signingSecret"),
    token: vscode.workspace.getConfiguration("vslackstatus").get("userToken"),
  });

  await app.client.users.profile.set({
    profile: JSON.stringify({
      status_text: status?.status_text,
      status_emoji: status?.status_emoji,
      status_expiration: status?.status_expiration,
    }),
  });

  return undefined;
}
