# Mind-Link

<p align="center">
  <img src="public/assets/logo.png" alt="Mind-Link Logo" width="200"/>
</p>

<p align="center">
  <b>连接智慧，无限可能</b>
</p>

## 📖 项目简介

Mind-Link 是一个基于现代前端技术构建的应用程序，探索AI的无限可能，Mind Link为您提供强大的AI交互体验，完全免费且开源，让科技创新触手可及。

## ✨ 核心特性

- 🧠 **智能思维导图**：创建和管理复杂的思维导图
- 🔄 **实时协作**：多人同时编辑和查看
- 📱 **响应式设计**：完美适配各种设备
- 🌍 **多语言支持**：国际化设计
- 🛠️ **丰富的工具集**：满足各种需求的工具和模板

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

### 构建项目

```bash
pnpm build
```

## 🧰 技术栈

- 构建工具: [Rsbuild](https://rsbuild.dev/)
- 前端框架: [React 19](https://react.dev/)
- 状态管理: [Zustand](https://zustand-demo.pmnd.rs/) (而非 Redux)
- UI 组件: [DaisyUI](https://daisyui.com/) + [Headless UI](https://headlessui.com/)
- CSS 框架: [Tailwind CSS 4](https://tailwindcss.com/)
- 国际化: [i18next](https://www.i18next.com/)
- 表单处理: [React Hook Form](https://react-hook-form.com/)
- 数据验证: [Zod](https://zod.dev/)
- 不可变数据: [Immer](https://immerjs.github.io/immer/) + [use-immer](https://github.com/immerjs/use-immer)
- API通信: [Axios](https://axios-http.com/)
- Markdown渲染: [React Markdown](https://remarkjs.github.io/react-markdown/)
- 图标: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- AI集成: [LangChain](https://js.langchain.com/)
- 代码格式化: [Biome](https://biomejs.dev/)

## 📁 项目结构

```
src/
  ├── api/        # API请求封装
  ├── bootstrap/  # 应用程序启动相关
  ├── components/ # 可复用组件
  ├── config/     # 配置文件
  ├── engines/    # 核心引擎
  ├── features/   # 功能模块
  ├── i18n/       # 国际化资源
  ├── packages/   # 内部包
  ├── routes/     # 路由配置
  ├── services/   # 服务层
  └── store/      # 状态管理
```

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！请参阅我们的贡献指南。

## 📄 许可证

[MIT License](LICENSE)
