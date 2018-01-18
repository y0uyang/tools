/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const previewContentProvider_1 = require("./features/previewContentProvider");
const nls = require("vscode-nls");
const localize = nls.loadMessageBundle(__filename);
var MarkdownPreviewSecurityLevel;
(function (MarkdownPreviewSecurityLevel) {
    MarkdownPreviewSecurityLevel[MarkdownPreviewSecurityLevel["Strict"] = 0] = "Strict";
    MarkdownPreviewSecurityLevel[MarkdownPreviewSecurityLevel["AllowInsecureContent"] = 1] = "AllowInsecureContent";
    MarkdownPreviewSecurityLevel[MarkdownPreviewSecurityLevel["AllowScriptsAndAllContent"] = 2] = "AllowScriptsAndAllContent";
})(MarkdownPreviewSecurityLevel = exports.MarkdownPreviewSecurityLevel || (exports.MarkdownPreviewSecurityLevel = {}));
class ExtensionContentSecurityPolicyArbiter {
    constructor(globalState, workspaceState) {
        this.globalState = globalState;
        this.workspaceState = workspaceState;
        this.old_trusted_workspace_key = 'trusted_preview_workspace:';
        this.security_level_key = 'preview_security_level:';
        this.should_disable_security_warning_key = 'preview_should_show_security_warning:';
    }
    getSecurityLevelForResource(resource) {
        // Use new security level setting first
        const level = this.globalState.get(this.security_level_key + this.getRoot(resource), undefined);
        if (typeof level !== 'undefined') {
            return level;
        }
        // Fallback to old trusted workspace setting
        if (this.globalState.get(this.old_trusted_workspace_key + this.getRoot(resource), false)) {
            return MarkdownPreviewSecurityLevel.AllowScriptsAndAllContent;
        }
        return MarkdownPreviewSecurityLevel.Strict;
    }
    setSecurityLevelForResource(resource, level) {
        return this.globalState.update(this.security_level_key + this.getRoot(resource), level);
    }
    shouldAllowSvgsForResource(resource) {
        const securityLevel = this.getSecurityLevelForResource(resource);
        return securityLevel === MarkdownPreviewSecurityLevel.AllowInsecureContent || securityLevel === MarkdownPreviewSecurityLevel.AllowScriptsAndAllContent;
    }
    shouldDisableSecurityWarnings() {
        return this.workspaceState.get(this.should_disable_security_warning_key, false);
    }
    setShouldDisableSecurityWarning(disabled) {
        return this.workspaceState.update(this.should_disable_security_warning_key, disabled);
    }
    getRoot(resource) {
        if (vscode.workspace.workspaceFolders) {
            const folderForResource = vscode.workspace.getWorkspaceFolder(resource);
            if (folderForResource) {
                return folderForResource.uri;
            }
            if (vscode.workspace.workspaceFolders.length) {
                return vscode.workspace.workspaceFolders[0].uri;
            }
        }
        return resource;
    }
}
exports.ExtensionContentSecurityPolicyArbiter = ExtensionContentSecurityPolicyArbiter;
class PreviewSecuritySelector {
    constructor(cspArbiter, contentProvider) {
        this.cspArbiter = cspArbiter;
        this.contentProvider = contentProvider;
    }
    async showSecutitySelectorForResource(resource) {
        function markActiveWhen(when) {
            return when ? '• ' : '';
        }
        const currentSecurityLevel = this.cspArbiter.getSecurityLevelForResource(resource);
        const selection = await vscode.window.showQuickPick([
            {
                type: MarkdownPreviewSecurityLevel.Strict,
                label: markActiveWhen(currentSecurityLevel === MarkdownPreviewSecurityLevel.Strict) + localize(0, null),
                description: localize(1, null),
            }, {
                type: MarkdownPreviewSecurityLevel.AllowInsecureContent,
                label: markActiveWhen(currentSecurityLevel === MarkdownPreviewSecurityLevel.AllowInsecureContent) + localize(2, null),
                description: localize(3, null),
            }, {
                type: MarkdownPreviewSecurityLevel.AllowScriptsAndAllContent,
                label: markActiveWhen(currentSecurityLevel === MarkdownPreviewSecurityLevel.AllowScriptsAndAllContent) + localize(4, null),
                description: localize(5, null),
            }, {
                type: 'moreinfo',
                label: localize(6, null),
                description: ''
            }, {
                type: 'toggle',
                label: this.cspArbiter.shouldDisableSecurityWarnings()
                    ? localize(7, null)
                    : localize(8, null),
                description: localize(9, null)
            },
        ], {
            placeHolder: localize(10, null),
        });
        if (!selection) {
            return;
        }
        if (selection.type === 'moreinfo') {
            vscode.commands.executeCommand('vscode.open', vscode.Uri.parse('https://go.microsoft.com/fwlink/?linkid=854414'));
            return;
        }
        const sourceUri = previewContentProvider_1.getMarkdownUri(resource);
        if (selection.type === 'toggle') {
            this.cspArbiter.setShouldDisableSecurityWarning(!this.cspArbiter.shouldDisableSecurityWarnings());
            this.contentProvider.update(sourceUri);
            return;
        }
        await this.cspArbiter.setSecurityLevelForResource(resource, selection.type);
        await vscode.commands.executeCommand('_workbench.htmlPreview.updateOptions', sourceUri, {
            allowScripts: true,
            allowSvgs: this.cspArbiter.shouldAllowSvgsForResource(resource)
        });
        this.contentProvider.update(sourceUri);
    }
}
exports.PreviewSecuritySelector = PreviewSecuritySelector;
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/0759f77bb8d86658bc935a10a64f6182c5a1eeba/extensions\markdown\out/security.js.map
