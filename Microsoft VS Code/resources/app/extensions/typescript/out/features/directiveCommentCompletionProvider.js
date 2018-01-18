"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const nls = require("vscode-nls");
const localize = nls.loadMessageBundle(__filename);
const directives = [
    {
        value: '@ts-check',
        description: localize(0, null)
    }, {
        value: '@ts-nocheck',
        description: localize(1, null)
    }, {
        value: '@ts-ignore',
        description: localize(2, null)
    }
];
class DirectiveCommentCompletionProvider {
    constructor(client) {
        this.client = client;
    }
    provideCompletionItems(document, position, _token) {
        if (!this.client.apiVersion.has230Features()) {
            return [];
        }
        const file = this.client.normalizePath(document.uri);
        if (!file) {
            return [];
        }
        const line = document.lineAt(position.line).text;
        const prefix = line.slice(0, position.character);
        const match = prefix.match(/^\s*\/\/+\s?(@[a-zA-Z\-]*)?$/);
        if (match) {
            return directives.map(directive => {
                const item = new vscode_1.CompletionItem(directive.value, vscode_1.CompletionItemKind.Snippet);
                item.detail = directive.description;
                item.range = new vscode_1.Range(position.line, Math.max(0, position.character - (match[1] ? match[1].length : 0)), position.line, position.character);
                return item;
            });
        }
        return [];
    }
    resolveCompletionItem(item, _token) {
        return item;
    }
}
exports.default = DirectiveCommentCompletionProvider;
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/0759f77bb8d86658bc935a10a64f6182c5a1eeba/extensions\typescript\out/features\directiveCommentCompletionProvider.js.map
