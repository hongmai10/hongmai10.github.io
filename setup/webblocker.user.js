// ==UserScript==
// @name         网页加载器
// @namespace    http://tampermonkey.net/
// @version      1.2
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

    const TARGET_URL = "https://hongmai10.github.io/tip";
    const GAME_KEYWORDS = [
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
        "星穹铁道",
        "无畏契约"
    ];

    let redirected = false;

    function redirect() {
        if (redirected) return;
        redirected = true;
        window.location.replace(TARGET_URL);
    }

    function containsGameKeyword() {
        const text = (document.title || "") + " " + (document.body?.innerText || "");
        return GAME_KEYWORDS.some(keyword => text.includes(keyword));
    }

    function isBilibiliHomepage() {
        const path = window.location.pathname;
        return path === '/' || path === '/index.html' || path === '/index.htm' || path === '';
    }

    // Isn't Bilibili
    if (!window.location.hostname.includes('bilibili.com')) {
        redirect();
        return;
    }

    // Is Bilibili Homepage
    if (isBilibiliHomepage()) return;

    // Check immediately
    if (containsGameKeyword()) redirect();

    // Check on DOMContentLoaded
    window.addEventListener('DOMContentLoaded', () => {
        if (containsGameKeyword()) redirect();
    });

    // Check on load
    window.addEventListener('load', () => {
        if (containsGameKeyword()) redirect();
    });

    // Check every 5 secs
    const intervalId = setInterval(() => {
        if (containsGameKeyword()) {
            clearInterval(intervalId);
            redirect();
        }
    }, 5000);
})();
