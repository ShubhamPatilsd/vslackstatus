// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";

import { App } from "@slack/bolt";

// const app = new App({
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   token: process.env.SLACK_BOT_TOKEN,
// });

const app = new App({
  signingSecret: "3c6568e6db44d9babe5c8b0c759be0d7",
  token:
    "xoxp-2210535565-2319185552498-4566684101556-5cd3c328c2cba97461054bf1fc929512",
});

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vslack" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.window.onDidChangeActiveTextEditor((editor) => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user

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

// this method is called when your extension is deactivated
export function deactivate() {
  app.client.users.profile.set({
    profile: JSON.stringify({
      status_text: ``,
    }),
  });
}
