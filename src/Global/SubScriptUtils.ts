import * as vscode from "vscode";

export function addToSubScripts(context: vscode.ExtensionContext, dis: vscode.Disposable) {

    if (!context) {
        return ;
    }
    context.subscriptions.push(dis)
}