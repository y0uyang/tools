"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const languageModeIds = require("./languageModeIds");
exports.standardLanguageDescriptions = [
    {
        id: 'typescript',
        diagnosticSource: 'ts',
        modeIds: [languageModeIds.typescript, languageModeIds.typescriptreact],
        configFile: 'tsconfig.json'
    }, {
        id: 'javascript',
        diagnosticSource: 'js',
        modeIds: [languageModeIds.javascript, languageModeIds.javascriptreact],
        configFile: 'jsconfig.json'
    }
];
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/0759f77bb8d86658bc935a10a64f6182c5a1eeba/extensions\typescript\out/utils\languageDescription.js.map
