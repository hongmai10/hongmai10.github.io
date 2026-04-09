// ==UserScript==
// @name         网页加载器
// @namespace    http://tampermonkey.net/
// @version      1.1
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
// @match        *://*.bilibili.com/*
// @match        *://bilibili.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const targetUrl = "https://hongmai10.github.io/tip";

    const gameKeywords = [
        "三角洲",
        "和平精英",
        "王者荣耀",
        "英雄联盟",
        "绝地求生",
        "Apex英雄",
        "CSGO",
        "CS:GO",
        "PUBG",
        "使命召唤",
        "穿越火线",
        "暗区突围",
        "明日方舟",
        "鸣潮",
        "蛋仔派对",
        "无畏契约"
    ];

    function isBilibili() {
        return window.location.hostname.includes('bilibili.com');
    }

    function isBilibiliHomepage() {
        const path = window.location.pathname;
        return path === '/' || path === '/index.html' || path === '/index.htm' || path === '';
    }

    function containsGameKeyword() {
        const bodyText = document.body?.innerText || "";
        return gameKeywords.some(keyword => bodyText.includes(keyword));
    }

    function redirectToTarget() {
        if (window.top === window.self) {
            window.location.replace(targetUrl);
        }
    }

    function handleBilibili() {
        if (window.top !== window.self) return;

        // Is Bilibili Homepage
        if (isBilibiliHomepage()) {
            return;
        }

        // Check immediately
        if (document.body && containsGameKeyword()) {
            redirectToTarget();
            return;
        }

        // Check on DOMContentLoaded
        window.addEventListener('DOMContentLoaded', () => {
            if (containsGameKeyword()) {
                redirectToTarget();
            }
        });

        // Check again on load
        window.addEventListener('load', () => {
            if (containsGameKeyword()) {
                redirectToTarget();
            }
        });
    }

    function handleOtherSites() {
        redirectToTarget();
    }

    if (isBilibili()) {
        handleBilibili();
    } else {
        handleOtherSites();
    }
})();
