"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const util_1 = require("./util");
function balanceOut() {
    balance(true);
}
exports.balanceOut = balanceOut;
function balanceIn() {
    balance(false);
}
exports.balanceIn = balanceIn;
function balance(out) {
    if (!util_1.validate(false) || !vscode.window.activeTextEditor) {
        return;
    }
    const editor = vscode.window.activeTextEditor;
    let rootNode = util_1.parseDocument(editor.document);
    if (!rootNode) {
        return;
    }
    let getRangeFunction = out ? getRangeToBalanceOut : getRangeToBalanceIn;
    let newSelections = [];
    editor.selections.forEach(selection => {
        let range = getRangeFunction(editor.document, selection, rootNode);
        newSelections.push(range);
    });
    editor.selection = newSelections[0];
    editor.selections = newSelections;
}
function getRangeToBalanceOut(document, selection, rootNode) {
    let nodeToBalance = util_1.getNode(rootNode, selection.start);
    if (!nodeToBalance) {
        return selection;
    }
    if (!nodeToBalance.close) {
        return new vscode.Selection(nodeToBalance.start, nodeToBalance.end);
    }
    let innerSelection = new vscode.Selection(nodeToBalance.open.end, nodeToBalance.close.start);
    let outerSelection = new vscode.Selection(nodeToBalance.start, nodeToBalance.end);
    if (innerSelection.contains(selection) && !innerSelection.isEqual(selection)) {
        return innerSelection;
    }
    if (outerSelection.contains(selection) && !outerSelection.isEqual(selection)) {
        return outerSelection;
    }
    return selection;
}
function getRangeToBalanceIn(document, selection, rootNode) {
    let nodeToBalance = util_1.getNode(rootNode, selection.start, true);
    if (!nodeToBalance) {
        return selection;
    }
    if (selection.start.isEqual(nodeToBalance.start)
        && selection.end.isEqual(nodeToBalance.end)
        && nodeToBalance.close) {
        return new vscode.Selection(nodeToBalance.open.end, nodeToBalance.close.start);
    }
    if (!nodeToBalance.firstChild) {
        return selection;
    }
    if (selection.start.isEqual(nodeToBalance.firstChild.start)
        && selection.end.isEqual(nodeToBalance.firstChild.end)
        && nodeToBalance.firstChild.close) {
        return new vscode.Selection(nodeToBalance.firstChild.open.end, nodeToBalance.firstChild.close.start);
    }
    return new vscode.Selection(nodeToBalance.firstChild.start, nodeToBalance.firstChild.end);
}
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/0759f77bb8d86658bc935a10a64f6182c5a1eeba/extensions\emmet\out/balance.js.map
