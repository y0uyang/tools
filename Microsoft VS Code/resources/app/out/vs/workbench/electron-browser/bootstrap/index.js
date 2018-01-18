/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";function onError(e,n){n&&remote.getCurrentWebContents().openDevTools(),console.error("[uncaught exception]: "+e),e.stack&&console.error(e.stack)}function assign(e,n){return Object.keys(n).reduce(function(e,r){return e[r]=n[r],e},e)}function parseURLQueryArgs(){return(window.location.search||"").split(/[?&]/).filter(function(e){return!!e}).map(function(e){return e.split("=")}).filter(function(e){return 2===e.length}).reduce(function(e,n){return e[n[0]]=decodeURIComponent(n[1]),e},{})}function uriFromPath(e){var n=path.resolve(e).replace(/\\/g,"/");return n.length>0&&"/"!==n.charAt(0)&&(n="/"+n),encodeURI("file://"+n)}function registerListeners(e){var n;if(e){const e="darwin"===process.platform?"meta-alt-73":"ctrl-shift-73",r="darwin"===process.platform?"meta-82":"ctrl-82";n=function(n){const t=function(e){return[e.ctrlKey?"ctrl-":"",e.metaKey?"meta-":"",e.altKey?"alt-":"",e.shiftKey?"shift-":"",e.keyCode].join("")}(n)
;t===e?remote.getCurrentWebContents().toggleDevTools():t===r&&remote.getCurrentWindow().reload()},window.addEventListener("keydown",n)}return process.on("uncaughtException",function(n){onError(n,e)}),function(){n&&(window.removeEventListener("keydown",n),n=void 0)}}function main(){const e=require("electron").webFrame,n=parseURLQueryArgs(),r=JSON.parse(n.config||"{}")||{};assign(process.env,r.userEnv),perf.importEntries(r.perfEntries);var t={availableLanguages:{}};const o=process.env.VSCODE_NLS_CONFIG;if(o){process.env.VSCODE_NLS_CONFIG=o;try{t=JSON.parse(o)}catch(e){}}var s=t.availableLanguages["*"]||"en";"zh-tw"===s?s="zh-Hant":"zh-cn"===s&&(s="zh-Hans"),window.document.documentElement.setAttribute("lang",s);const i=(process.env.VSCODE_DEV||!!r.extensionDevelopmentPath)&&!r.extensionTestsPath,a=registerListeners(i),c=r.zoomLevel;e.setVisualZoomLevelLimits(1,1),"number"==typeof c&&0!==c&&e.setZoomLevel(c);const p=r.appRoot+"/out/vs/loader.js",l=require("fs").readFileSync(p);require("vm").runInThisContext(l,{
filename:p}),window.nodeRequire=require.__$__nodeRequire,define("fs",["original-fs"],function(e){return e}),window.MonacoEnvironment={};const d=window.MonacoEnvironment.onNodeCachedData=[];require.config({baseUrl:uriFromPath(r.appRoot)+"/out","vs/nls":t,recordStats:!!r.performance,nodeCachedDataDir:r.nodeCachedDataDir,onNodeCachedData:function(){d.push(arguments)},
nodeModules:["electron","original-fs","vsda","nan","applicationinsights","fast-plist","gc-signals","getmac","graceful-fs","http-proxy-agent","https-proxy-agent","iconv-lite","jschardet","keytar","minimist","native-keymap","native-watchdog","node-pty","nsfw","semver","spdlog","v8-inspect-profiler","vscode-chokidar","vscode-fsevents","vscode-debugprotocol","vscode-ripgrep","vscode-textmate","vsda","xterm","yauzl","windows-foreground-love","windows-mutex","windows-process-tree","agent-base","anymatch","async-each","bindings","buffer-crc32","chrome-remote-interface","debug","ms","extend","extract-opts","fd-slicer","fs-extra","glob-parent","inherits","is-binary-path","is-glob","lodash.isinteger","lodash.isundefined","mkdirp","oniguruma","path-is-absolute","promisify-node","readdirp","binary-extensions","commander","is-extglob","jsonfile","klaw","micromatch","normalize-path","minimatch","nodegit-promise","pend","readable-stream","rimraf","set-immediate-shim","typechecker","ws","arr-diff","array-unique","asap","async-limiter","brace-expansion","concat-map","braces","core-util-is","expand-brackets","extglob","filename-regex","glob","isarray","kind-of","object.omit","parse-glob","process-nextick-args","regex-cache","remove-trailing-separator","safe-buffer","string_decoder","ultron","util-deprecate","arr-flatten","balanced-match","expand-range","for-own","fs.realpath","glob-base","inflight","is-buffer","is-dotfile","is-equal-shallow","is-extendable","is-posix-bracket","is-primitive","once","preserve","repeat-element","fill-range","for-in","wrappy","is-number","isobject","randomatic","repeat-string","async_hooks","assert","buffer","child_process","console","constants","crypto","cluster","dgram","dns","domain","events","fs","http","http2","https","inspector","module","net","os","path","perf_hooks","process","punycode","querystring","readline","repl","stream","string_decoder","sys","timers","tls","tty","url","util","v8","vm","zlib"]
}),t.pseudo&&require(["vs/nls"],function(e){e.setPseudoTranslation(t.pseudo)});const u=window.MonacoEnvironment.timers={isInitialStartup:!!r.isInitialStartup,hasAccessibilitySupport:!!r.accessibilitySupport,start:r.perfStartTime,appReady:r.perfAppReady,windowLoad:r.perfWindowLoadTime,beforeLoadWorkbenchMain:Date.now()},m=perf.time("loadWorkbenchMain");require(["vs/workbench/workbench.main","vs/nls!vs/workbench/workbench.main","vs/css!vs/workbench/workbench.main"],function(){m.stop(),u.afterLoadWorkbenchMain=Date.now(),process.lazyEnv.then(function(){perf.mark("main/startup"),require("vs/workbench/electron-browser/main").startup(r).done(function(){a()},function(e){onError(e,i)})})})}const perf=require("../../../base/common/performance");perf.mark("renderer/started");const path=require("path"),electron=require("electron"),remote=electron.remote,ipc=electron.ipcRenderer;process.lazyEnv=new Promise(function(e){const n=setTimeout(function(){e(),console.warn("renderer did not receive lazyEnv in time")},1e4)
;ipc.once("vscode:acceptShellEnv",function(r,t){clearTimeout(n),assign(process.env,t),e(process.env)}),ipc.send("vscode:fetchShellEnv",remote.getCurrentWindow().id)}),main();
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/0759f77bb8d86658bc935a10a64f6182c5a1eeba/core/vs\workbench\electron-browser\bootstrap\index.js.map