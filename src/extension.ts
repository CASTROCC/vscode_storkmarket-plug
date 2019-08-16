// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as StatusBarItem from './View/StatusBarItem';
import * as SubScriptUtils from './Global/SubScriptUtils';
import * as HttpUtils from './Global/HttpUtils';


const storkMarketId: string = 'extension.storkmarketPlug';
// sh601006
const baseUrl: string = 'http://hq.sinajs.cn/list=';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "storkmarket-plug" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	
	let disposable = vscode.commands.registerCommand( storkMarketId, (param: string = "sz000568") => {

		// show Tips
		let n = StatusBarItem.getNumberOfSelectedLines(vscode.window.activeTextEditor);
		let url = baseUrl + param;
		setInterval(()=>{
			HttpUtils.get(url, (data: string)=>{
				// vscode.window.showInformationMessage(`data is ${data}`);
				StatusBarItem.setOriginalData(data);
			});
		}, 500);
		vscode.window.showInformationMessage(`Yeah, ${n} line(s) selected... Keep going!`);
	});

	SubScriptUtils.addToSubScripts(context, disposable);

	// create StatusBarItem
	let statusBar: vscode.StatusBarItem = StatusBarItem.createStatusBarItem(storkMarketId);		
	SubScriptUtils.addToSubScripts(context, statusBar);

	// SubScriptUtils.addToSubScripts(context, vscode.window.onDidChangeActiveTextEditor(StatusBarItem.updateStatusBarItem))
	// SubScriptUtils.addToSubScripts(context, vscode.window.onDidChangeTextEditorSelection(StatusBarItem.updateStatusBarItem))

	StatusBarItem.updateStatusBarItem();
}

// this method is called when your extension is deactivated
export function deactivate() {}
