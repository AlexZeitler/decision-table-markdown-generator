// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { window } from 'vscode';
import { createDecisionTable } from 'decision-table-markdown/dist/createDecisionTable';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "decision-table-markdown-generator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.createDecisionTableMarkdown', async () => {
		// The code you place here will be executed every time your command is executed

		const result = await window.showInputBox({
			value: '',
			valueSelection: undefined,
			placeHolder: 'For example: 3',
			validateInput: text => {
				return !Number.isInteger(Number(text)) ? 'Input must be an integer' : null;
			}
		});

		const editor = vscode.window.activeTextEditor;
		if (!result) { return };
		const conditions = Number(result);

        if (editor) {
            editor.edit(editBuilder => {
				let table = `${Array(conditions + 3).join('| ')}|\n`;
				table += `${Array(conditions + 3).join('|-')}|\n`;
				table += `${createDecisionTable(Number(result)).join('\n')}`;
				editBuilder.insert(editor.selection.active, table);
            });
        }
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
