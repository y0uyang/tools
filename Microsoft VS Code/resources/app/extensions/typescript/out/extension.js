"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const commandManager_1 = require("./utils/commandManager");
const typescriptMain_1 = require("./typescriptMain");
const commands = require("./commands");
const taskProvider_1 = require("./features/taskProvider");
const plugins_1 = require("./utils/plugins");
const ProjectStatus = require("./utils/projectStatus");
const languageModeIds = require("./utils/languageModeIds");
const languageConfigurations = require("./utils/languageConfigurations");
const languageDescription_1 = require("./utils/languageDescription");
const managedFileContext_1 = require("./utils/managedFileContext");
const lazy_1 = require("./utils/lazy");
const fileSchemes = require("./utils/fileSchemes");
function activate(context) {
    const plugins = plugins_1.getContributedTypeScriptServerPlugins();
    const commandManager = new commandManager_1.CommandManager();
    context.subscriptions.push(commandManager);
    const lazyClientHost = createLazyClientHost(context, plugins, commandManager);
    registerCommands(commandManager, lazyClientHost);
    context.subscriptions.push(new taskProvider_1.default(lazyClientHost.map(x => x.serviceClient)));
    context.subscriptions.push(vscode.languages.setLanguageConfiguration(languageModeIds.jsxTags, languageConfigurations.jsxTags));
    const supportedLanguage = [].concat.apply([], languageDescription_1.standardLanguageDescriptions.map(x => x.modeIds).concat(plugins.map(x => x.languages)));
    function didOpenTextDocument(textDocument) {
        if (isSupportedDocument(supportedLanguage, textDocument)) {
            openListener.dispose();
            // Force activation
            // tslint:disable-next-line:no-unused-expression
            void lazyClientHost.value;
            context.subscriptions.push(new managedFileContext_1.default(resource => {
                return lazyClientHost.value.serviceClient.normalizePath(resource);
            }));
            return true;
        }
        return false;
    }
    const openListener = vscode.workspace.onDidOpenTextDocument(didOpenTextDocument, undefined, context.subscriptions);
    for (const textDocument of vscode.workspace.textDocuments) {
        if (didOpenTextDocument(textDocument)) {
            break;
        }
    }
}
exports.activate = activate;
function createLazyClientHost(context, plugins, commandManager) {
    return lazy_1.lazy(() => {
        const clientHost = new typescriptMain_1.TypeScriptServiceClientHost(languageDescription_1.standardLanguageDescriptions, context.workspaceState, plugins, commandManager);
        context.subscriptions.push(clientHost);
        const host = clientHost;
        clientHost.serviceClient.onReady().then(() => {
            context.subscriptions.push(ProjectStatus.create(host.serviceClient, host.serviceClient.telemetryReporter, path => new Promise(resolve => setTimeout(() => resolve(host.handles(path)), 750)), context.workspaceState));
        }, () => {
            // Nothing to do here. The client did show a message;
        });
        return clientHost;
    });
}
function registerCommands(commandManager, lazyClientHost) {
    commandManager.register(new commands.ReloadTypeScriptProjectsCommand(lazyClientHost));
    commandManager.register(new commands.ReloadJavaScriptProjectsCommand(lazyClientHost));
    commandManager.register(new commands.SelectTypeScriptVersionCommand(lazyClientHost));
    commandManager.register(new commands.OpenTsServerLogCommand(lazyClientHost));
    commandManager.register(new commands.RestartTsServerCommand(lazyClientHost));
    commandManager.register(new commands.TypeScriptGoToProjectConfigCommand(lazyClientHost));
    commandManager.register(new commands.JavaScriptGoToProjectConfigCommand(lazyClientHost));
}
function isSupportedDocument(supportedLanguage, document) {
    if (supportedLanguage.indexOf(document.languageId) < 0) {
        return false;
    }
    return fileSchemes.isSupportedScheme(document.uri.scheme);
}
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/0759f77bb8d86658bc935a10a64f6182c5a1eeba/extensions\typescript\out/extension.js.map
