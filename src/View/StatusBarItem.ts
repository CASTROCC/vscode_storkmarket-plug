import * as vscode from "vscode";

var bar: vscode.StatusBarItem ;
var original: any;
export function createStatusBarItem(commandId: string): vscode.StatusBarItem {

    let myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1200);
    myStatusBarItem.command = commandId;
    bar = myStatusBarItem;
    return myStatusBarItem;
}

export function updateStatusBarItem(): void {
	// let n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
	let name: string = original[0];
	let price: string = original[3];
	let time: string = original[31];
	let start: number = parseFloat(original[1]);
	let percent: string = ( (parseFloat(price) - start) / start * 100).toFixed(2);

	bar.text = `${name}  ${price}  ${percent}%   ${time} `;
	bar.show();
	bar.color = "#FF9900";
	
}
/**
 * 设置原始数据
 * @param data 
 */
export function setOriginalData(data: string): void {
	if (!data) {
		return ;
	}
	let d = data.substring(data.indexOf("\"") + 1); 
	original = d.split(",");
	updateStatusBarItem();
}

export function getNumberOfSelectedLines(editor: vscode.TextEditor | undefined): number {
	let lines = 0;
	if (editor) {
		lines = editor.selections.reduce((prev, curr) => prev + (curr.end.line - curr.start.line), 0);
	}
	return lines;
}


