import * as vscode from "vscode";

var bar: vscode.StatusBarItem ;
var original: any;

enum typeColor {
	up = "#FF0000",
	down = "#64D718",
	balance = "#6F6F6F"
}

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
	let perNum: number = ( (parseFloat(price) - start) / start * 100);
	let percent: string = perNum.toFixed(2);

	var color: string;
	let compare: number = Math.floor(perNum * 100) / 100
	if (compare > 0) {
		color = typeColor.up
	} else if (compare < 0) {
		color = typeColor.down
	} else {
		color = typeColor.balance;
	}

	bar.text = `${name}  ${price}  ${percent}%   ${time} `;
	bar.show();
	bar.color = color;
	
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


