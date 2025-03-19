# Mind-Link

<p align="center">
  <img src="public/assets/logo.png" alt="Mind-Link Logo" width="200"/>
</p>

<p align="center">
  <b>连接智慧，无限可能</b><br>
  <small>Connecting Intelligence, Unlimited Possibilities</small>
</p>

<div align="center">
  <a href="README.md">中文</a> | <a href="README.en.md">English</a>
</div>

## 📖 项目简介

Mind-Link 是一个基于现代前端技术构建的开源应用，旨在探索AI的无限可能。它为用户提供强大的AI交互体验，完全免费且开源，让科技创新触手可及。无论是个人知识管理、团队协作还是创意发散，Mind-Link都能成为您得力的思维助手。

## ✨ 核心特性

- 🤖 **AI增强**：集成先进的AI模型，提供智能补全、内容生成和思维拓展
- 📱 **响应式设计**：完美适配桌面、平板和手机等多种设备
- 🌍 **多语言支持**：国际化设计，支持中英文等多种语言
- 🔒 **数据安全**：本地优先，保护您的隐私和数据安全
- 🚀 **高性能**：优化的渲染和数据处理，确保流畅的使用体验

## 🚀 快速开始

### 环境要求

- Node.js 16+
- pnpm 7+

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

应用将在 http://localhost:3000 启动（或查看终端输出的URL）。

### 构建项目

```bash
pnpm build
```

构建产物将输出到 `dist` 目录。

## 🧰 技术栈

- **构建工具**: [Rsbuild](https://rsbuild.dev/) - 比Webpack更快的构建工具
- **前端框架**: [React 19](https://react.dev/) - 最新版React，具有更好的性能和新特性
- **状态管理**: [Zustand](https://zustand-demo.pmnd.rs/) - 轻量级且易用的状态管理方案
- **UI 组件**:
  - [DaisyUI](https://daisyui.com/) - 简洁优雅的组件库
  - [Headless UI](https://headlessui.com/) - 无样式的可访问性组件
- **CSS 框架**: [Tailwind CSS 4](https://tailwindcss.com/) - 实用优先的CSS框架
- **国际化**: [i18next](https://www.i18next.com/) - 强大的国际化解决方案
- **表单处理**: [React Hook Form](https://react-hook-form.com/) - 高性能表单处理库
- **数据验证**: [Zod](https://zod.dev/) - TypeScript优先的数据验证库
- **不可变数据**:
  - [Immer](https://immerjs.github.io/immer/) - 简化不可变数据更新
  - [use-immer](https://github.com/immerjs/use-immer) - React Hooks集成
- **API通信**: [Axios](https://axios-http.com/) - 可靠的HTTP客户端
- **Markdown渲染**: [React Markdown](https://remarkjs.github.io/react-markdown/) - 灵活的Markdown渲染
- **图标**: [Lucide React](https://lucide.dev/guide/packages/lucide-react) - 美观一致的图标系统
- **AI集成**: [LangChain](https://js.langchain.com/) - 构建AI应用的框架
- **代码格式化**: [Biome](https://biomejs.dev/) - 现代化的JS/TS工具链

## 📁 项目结构

```
src/
  ├── api/        # API请求封装和接口定义
  ├── bootstrap/  # 应用程序启动和初始化相关
  ├── components/ # 可复用UI组件
  ├── config/     # 应用配置和环境变量
  ├── engines/    # AI核心引擎
  ├── features/   # 按功能模块组织的代码
  ├── i18n/       # 国际化资源和配置
  ├── packages/   # 内部可重用功能包
  ├── routes/     # 路由配置和页面组件
  ├── services/   # 业务服务层
  └── store/      # 全局状态管理
```

## 🤝 贡献指南

我们欢迎所有形式的贡献，包括但不限于：

- 🐛 **提交Bug报告**：帮助我们发现和修复问题
- 🌟 **提出新功能建议**：分享您的创意和想法
- 📝 **改进文档**：修正错误或添加示例
- 🧪 **添加测试**：提高代码质量和稳定性 
- 💻 **贡献代码**：实现新功能或修复现有问题


## 📄 许可证

本项目采用 [MIT License](LICENSE) 许可证 - 查看[LICENSE](LICENSE)文件了解更多详情。
