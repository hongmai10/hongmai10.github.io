// ==UserScript==
// @name         网页加载器
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  免费开源的网页加载器
// @author       XU
// @match        *://*.douyin.com/*
// @match        *://douyin.com/*
// @match        *://*.kuaishou.com/*
// @match        *://kuaishou.com/*
// @match        *://*.bilibili.com/*
// @match        *://bilibili.com/*
// @match        *://*.iqiyi.com/*
// @match        *://iqiyi.com/*
// @match        *://*.youku.com/*
// @match        *://youku.com/*
// @match        *://*.qq.com/*
// @match        *://v.qq.com/*
// @match        *://*.tudou.com/*
// @match        *://tudou.com/*
// @match        *://*.sohu.com/*
// @match        *://tv.sohu.com/*
// @match        *://*.mgtv.com/*
// @match        *://mgtv.com/*
// @match        *://*.wasu.cn/*
// @match        *://wasu.cn/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var targetUrl = "https://hongmai10.github.io/tip";

    if (window.top === window.self) {
        window.location.replace(targetUrl);
    }
})();