import { defineConfig } from '@rsbuild/core';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  html: {
    title: 'Mind Link - AI聊天助手 / AI Chat Assistant',
    meta: {
      viewport:
        'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover',
      description:
        '完全开源且免费，探索AI的无限可能，Mind Link为您提供强大的AI交互体验，让科技创新触手可及。Completely Open Source and Free, explore the unlimited possibilities of AI. Mind Link offers you a powerful AI interaction experience, making technological innovation accessible.',
      keywords:
        'AI, Chat, Assistant, Mind Link, Open Source, Free, Privacy, RAG, MCP, Online, Compatible',
    },
    tags:[
      {tag: 'script', children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P7JDSGF9');`},
      {tag: 'noscript', children: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P7JDSGF9" height="0" width="0" style="display:none;visibility:hidden"></iframe>`},
    ]
  },
  plugins: [pluginReact(), pluginNodePolyfill(), pluginLess()],
});
