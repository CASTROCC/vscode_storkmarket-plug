// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as StatusBarItem from './View/StatusBarItem';
import * as SubScriptUtils from './Global/SubScriptUtils';
import * as HttpUtils from './Global/HttpUtils';


const storkMarketId: string = 'extension.storkmarketPlug';
// sh601006
const baseUrl: string = 'http://hq.sinajs.cn/list=';

export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.commands.registerCommand( storkMarketId, (param: string = "sz000568") => {

		let url = baseUrl + param;
		setInterval(()=>{
			HttpUtils.get(url, (data: string)=>{
				// vscode.window.showInformationMessage(`data is ${data}`);
				StatusBarItem.setOriginalData(data);
			});
		}, 500);
		vscode.window.showInformationMessage("hellow");
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
