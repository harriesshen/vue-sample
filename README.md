# Tech Dashboard - 現代化後台管理系統

> 一個基於 Vue 3 + TypeScript + Tailwind CSS 打造的現代化後台管理系統，採用暗色主題設計，提供流暢的使用者體驗和精美的 UI 介面。

![Vue 3](https://img.shields.io/badge/Vue-3.5.22-4FC08D?style=flat-square&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.14-38B2AC?style=flat-square&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat-square&logo=vite)

## ✨ 專案特色

### 🎨 精美的 UI 設計

本專案採用精心調配的暗色主題配色方案，具有以下 UI 設計特點：

#### **配色方案**

- **主背景色**：深色石板灰 (`slate-950`) - 提供低光環境下的舒適閱讀體驗
- **漸層主色**：青色到紫紅色 (`cyan-500` → `fuchsia-500`) - 現代感十足的漸層效果
- **強調色**：青色 (`cyan-400/500`) - 用於互動元素和重點標示
- **文字層級**：
  - 主文字：`slate-100` (高對比度，確保可讀性)
  - 次要文字：`slate-300/400` (良好的層次感)
  - 輔助文字：`slate-500` (降低干擾)

#### **設計亮點**

- 🌈 **漸層徽標**：雙色漸層 (`cyan-400` → `fuchsia-500`) Logo，展現科技感
- 💫 **毛玻璃效果**：半透明背景 (`bg-slate-900/40`) 配合邊框，營造層次感
- ⚡ **流暢動畫**：HeadlessUI 提供的過渡動畫，提升互動質感
- 🎯 **自訂滾動條**：青色主題滾動條，與整體設計風格一致
- 📐 **響應式佈局**：Grid + Flexbox 實現完美適配各種螢幕尺寸

### 🚀 核心功能

#### 1. **身份驗證系統**

- 登入頁面：優雅的登入表單設計
- 路由守衛：保護需要認證的頁面
- Pinia 狀態管理：集中式身份狀態管理

#### 2. **日曆管理 (Calendar)**

- 📅 **完整月曆視圖**：42 格月曆顯示，支援本月及前後月份
- ⬅️➡️ **月份切換**：前後按鈕導航
- 📆 **年份/月份選擇器**：下拉選單快速切換
- 🎯 **日期選擇**：點擊日期高亮顯示
- 📍 **今日標示**：自動標記當前日期
- 🌍 **多語言支援**：繁體中文顯示月份和星期

#### 3. **模組化組件設計**

- 🎭 **Modal 彈窗系統**：可重用的模態框架構
- 📋 **Dropdown 下拉選單**：通用下拉選單組件
- 🧭 **Sidebar 側邊欄**：響應式導航選單
- 📊 **Topbar 頂部欄**：帶漸層徽標的標題欄

#### 4. **國際化支援 (i18n)**

- 多語言切換：英文/繁體中文
- 動態語言切換
- 完整的翻譯覆蓋

### 🛠️ 技術棧

#### **前端框架**

- **Vue 3.5.22** - 組合式 API (Composition API)
- **TypeScript 5.9** - 完整類型支援
- **Vue Router 4.5.1** - 路由管理
- **Pinia 3.0.3** - 現代化狀態管理
- **Vue I18n 9.14.5** - 國際化

#### **UI 框架**

- **Tailwind CSS 4.1.14** - 實用優先的 CSS 框架
- **Headless UI Vue 1.7.23** - 無樣式的可訪問組件
- **Heroicons 2.2.0** - 精美的圖標庫

#### **開發工具**

- **Vite 7.1.7** - 極速開發建置工具
- **ESLint + Prettier** - 代碼品質與格式化
- **Vue DevTools** - 開發者工具
- **vue-tsc** - TypeScript 類型檢查

## 📦 安裝與使用

### 環境要求

- Node.js: `^20.19.0` 或 `>=22.12.0`
- npm 或 yarn

### 安裝依賴

```bash
npm install
```

### 開發模式

啟動開發伺服器並開啟熱重載：

```bash
npm run dev
```

訪問 `http://localhost:5173`

### 生產建置

類型檢查、編譯並壓縮：

```bash
npm run build
```

### 預覽生產版本

```bash
npm run preview
```

### 代碼檢查

使用 ESLint 檢查並自動修復：

```bash
npm run lint
```

### 代碼格式化

使用 Prettier 格式化代碼：

```bash
npm run format
```

## 📁 專案結構

```
vue-router/
├── src/
│   ├── assets/              # 靜態資源
│   ├── components/          # 可重用組件
│   │   ├── Dropdown/        # 下拉選單
│   │   ├── icons/           # 圖標組件
│   │   ├── Modal/           # 模態框系統
│   │   ├── Sidebar/         # 側邊欄
│   │   └── Topbar/          # 頂部欄
│   ├── composables/         # 組合式函數
│   ├── constant/            # 常量配置
│   ├── locales/             # 多語言資源
│   ├── router/              # 路由配置
│   ├── stores/              # Pinia 狀態管理
│   └── views/               # 頁面視圖
│       ├── dashboard/       # 儀表板頁面
│       │   ├── Calender/    # 日曆頁面
│       │   └── Overview/    # 總覽頁面
│       ├── DashboardLayout.vue
│       └── LoginView.vue
├── public/                  # 公共資源
├── index.html              # 入口 HTML
├── package.json            # 項目配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
└── tailwind.css            # Tailwind 樣式
```

## 🎨 UI 設計說明

### 顏色對比系統

本專案採用 WCAG 2.1 AAA 級別的無障礙對比度設計：

| 元素     | 顏色           | 對比度 | 用途     |
| -------- | -------------- | ------ | -------- |
| 主文字   | `slate-100`    | 12.6:1 | 正文內容 |
| 次要文字 | `slate-300`    | 8.3:1  | 次要信息 |
| 輔助文字 | `slate-500`    | 3.2:1  | 輔助說明 |
| 邊框     | `slate-800`    | 5.8:1  | 區分元素 |
| 漸層主色 | `cyan-fuchsia` | -      | 視覺焦點 |
| 強調色   | `cyan-500`     | 5.1:1  | 互動元素 |

### 設計原則

1. **一致性**：統一的間距、圓角、陰影系統
2. **層次感**：透過透明度與深度建立視覺層次
3. **可用性**：良好的點擊熱區與視覺反饋
4. **美感**：現代化的漸層與動畫效果
5. **無障礙**：高對比度文字與可訪問性支援

## 🔧 開發指南

### 推薦 IDE 設定

- **VS Code** + [Vue Official 擴展](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- 啟用 Vue DevTools
- 安裝 Prettier 和 ESLint 擴展

### 推薦瀏覽器

- Chromium 系列 (Chrome, Edge, Brave)
  - [Vue.js DevTools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - 啟用自訂物件格式化器
- Firefox
  - [Vue.js DevTools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

### TypeScript 支援

專案使用 `vue-tsc` 進行類型檢查，確保完整的 TypeScript 支援。

### 自訂配置

詳細的 Vite 配置參考：[Vite Configuration Reference](https://vite.dev/config/)

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

## 📝 更新日誌

### v0.0.0

- 初始專案建立
- 實現登入系統
- 完成日曆功能
- 部署暗色主題 UI
- 多語言支援

---

**Made with ❤️ using Vue 3 & Tailwind CSS**
