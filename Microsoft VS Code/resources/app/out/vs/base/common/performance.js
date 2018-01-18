/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";global._performanceEntries=global._performanceEntries||[],"function"!=typeof define&&"object"==typeof module&&"object"==typeof module.exports&&(global.define=function(e,t){module.exports=t(),global.define=void 0}),define([],function(){function e(e){global._performanceEntries.push("mark",e,o(),0),"function"==typeof console.timeStamp&&console.timeStamp(e)}function t(e,t,r){let i,l,s=o();i=t?n(t):s,l=r?n(r)-i:s-i,global._performanceEntries.push("measure",e,i,l)}function n(e){const t=global._performanceEntries;for(let n=t.length-1;n>=0;n-=4)if(t[n-2]===e)return t[n-1];throw new Error(e+" not found")}const o=Date.now;return{mark:e,measure:t,time:function(n){let o=`${n}/start`;return e(o),{stop(){t(n,o)}}},getEntries:function(e){const t=[],n=global._performanceEntries;for(let o=0;o<n.length;o+=4)n[o]===e&&t.push({type:n[o],name:n[o+1],startTime:n[o+2],duration:n[o+3]});return t.sort((e,t)=>e.startTime-t.startTime)},importEntries:function(e){global._performanceEntries.splice(0,0,...e)},
exportEntries:function(){return global._performanceEntries.splice(0)}}});
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/0759f77bb8d86658bc935a10a64f6182c5a1eeba/core/vs\base\common\performance.js.map
