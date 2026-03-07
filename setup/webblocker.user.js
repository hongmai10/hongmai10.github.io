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
// @match        *://*.ixigua.com/*
// @match        *://ixigua.com/*
// @match        *://haokan.baidu.com/*
// @match        *://*.xiaohongshu.com/*
// @match        *://xiaohongshu.com/*
// @match        *://*.pipix.com/*
// @match        *://pipix.com/*
// @match        *://*.izuiyou.com/*
// @match        *://izuiyou.com/*
// @match        *://weishi.qq.com/*
// @match        *://*.huoshan.com/*
// @match        *://huoshan.com/*
// @match        *://*.weixin.qq.com/s/wevideo*
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
