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
      {
        tag: 'script',
        head: true,
        append: false,
        attrs: {
          async: true,
          'data-website-id': '69fb1455-48a9-42a7-bb7b-1dd5a94955d3',
          src: 'https://cloud.umami.is/script.js'
        }
      }
    ]
  },
  plugins: [pluginReact(), pluginNodePolyfill(), pluginLess()],
});
