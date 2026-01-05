# Custom Right-Click Menu (V3)
# 自定义右键菜单（V3）

<br>

<details>
  <summary>点击展开演示截图 / Click to expand the demonstration screenshot</summary>
  
  ![Interface](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/image/Custom-Right-Click-Menu-V3-1.png?raw=true)
  
  ![Interface](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/image/Custom-Right-Click-Menu-V3-2.png?raw=true)
  
  ![Interface](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/image/Custom-Right-Click-Menu-V3-3.png?raw=true)
  
  ![Interface](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/image/Custom-Right-Click-Menu-V3-4.png?raw=true)

  ![Interface](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/image/Custom-Right-Click-Menu-V3-5.png?raw=true)

  ![Interface](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/image/Custom-Right-Click-Menu-V3-6.png?raw=true)

</details>


<br>

<p align="center">
  <a target="_blank" href="https://github.com/add-qwq/Custom-Right-Click-Menu#english">English</a>
  &nbsp;|&nbsp;
  <a target="_blank" href="https://github.com/add-qwq/Custom-Right-Click-Menu#%E4%B8%AD%E6%96%87">中文</a>
</p>

<br>

## English
### Custom Right-Click Menu (V3)
We are confident that this project is by far (with the specific time subject to the project's commits time) the **most fully-featured, open-source, and finest native JavaScript custom context menu project** on GitHub—no reliance on any frameworks required.

Of course, many excellent developers may simply not have ventured into such tools; we have merely turned this idea into a practical, implementable solution.

This is Version 3 of Custom-Right-Click-Menu (CRCM), a complete architectural overhaul. Building on the strengths of V2, it introduces key features including multi-level nested submenus, keyboard navigation support, enhanced context detection, and performance optimization—boasting smoother animations, richer interaction modes, and stronger context awareness.

Compared to V1 and V2, V3 achieves zero dependencies, higher configurability, easier integration, fixes most known issues, significantly improves extensibility, and remains a **single JS file deployment** — ready to use with just an import.

In summary, CRCM is a native JavaScript right-click menu project featuring multi-level nested menu support, a powerful yet concise API, intelligent menu and submenu positioning, schema-based registration and configuration, dynamic show/hide of menu items, high customization, theme customization, external stylesheet loading, modern UI with smooth animations, and more. It supports single JS file deployment, achieving zero dependencies, high configurability, and easy integration.

<br>

Want to experience automated management (including automatically adding components to web pages + automatic version updates)?<br>Experience rapid project management through [CRCMenu Manager](https://github.com/add-qwq/CRCMenu-Manager).

Want to use this right-click menu across all websites?<br>Install the [Right Click Menu - Browser Extension](https://github.com/add-qwq/CRCM-Browser-Plugin).

<br>

![Downloads](https://img.shields.io/github/downloads/add-qwq/Custom-Right-Click-Menu/total?style=flat-square&logo=github)
![GitHub license](https://img.shields.io/github/license/add-qwq/Custom-Right-Click-Menu?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/add-qwq/Custom-Right-Click-Menu)

### Project Overview
- **[Online Demo (Click to Access - China Mirror Site)](https://www.rockaz.top/GitHub-Project-Demo/Custom-Right-Click-Menu/)**
*Note: The server of this website is located in China, ensuring faster and more stable access for users within China. The page language is Chinese. However, for security defense purposes (to defend against a large number of automated attack IPs from outside China), all traffic from outside China has been blocked.*
- **[Online Demo (Click to Access - GitHub Page Mirror Site)](https://add-qwq.github.io/Custom-Right-Click-Menu(DemoPage)/)**
*Note: This website is hosted on GitHub Pages. Users within China may experience significant access delays, so it is more suitable for users outside China (users around the world).*

Built on Web Components as the core, this project replaces the browser's native right-click menu with a flexible, highly extensible custom interface. It supports context-aware operations (text copy/paste, link/image handling, page controls) and features intelligent menu positioning with automatic adjustment. Meanwhile, it allows deep customization of styles, structure, and functionality.

### Key Features (V3 Updates)
#### 1. Architecture Overhaul
- Complete rewrite with multi-level nested submenu support (unlimited depth)
- Submenus use fixed positioning with intelligent overflow handling (automatically flips direction when near viewport edges)
- Schema-based registration: Register menu configurations via JSON files, greatly simplifying the API configuration process with support for unlimited nested children
- Continued use of Web Components (custom elements + Shadow DOM) for style and logic isolation
- Single JS file deployment — no additional CSS/HTML files required
- Singleton pattern design to avoid duplicate menu instances
- Intelligent positioning engine: Optimized boundary collision detection logic, submenus automatically select the best pop-up position based on remaining screen space
- Modern UI: Introduced more delicate scale and opacity transition animations, fully supporting Glassmorphism style

#### 2. Enhanced Customization Capabilities
- **Highly Customizable Themes**: Modify menu colors, borders, blur effects, transition speeds, etc., via CSS variables
- **Context-Specific Schemas**: Register different menu configurations for specific selectors
- **Nested Menu Structure**: Define multi-level menus directly in the schema via children arrays
- **Dynamic Visibility**: Menu items and groups show/hide based on context functions
- **External Style Loading**: Support loading third-party styles (e.g., Font Awesome icon library and external style files)

#### 3. Retained & Improved Core Features
- Replaces the default browser right-click menu with a modern, animated interface
- Context-aware options:
  - Text: Copy selected text content
  - Input fields: Paste clipboard content / copy text in input fields
  - Links: Open in new tab / copy link address
  - Images: Open in new tab / copy image URL
- Page controls: Go back, refresh, navigate to homepage, scroll to bottom
- Smooth animations (scale + opacity transitions) and intelligent adaptive positioning (automatically adapts to viewport boundaries and nested submenus)
- Intelligent menu positioning with automatic direction adjustment
- Fallback solution for Clipboard API (supports older browsers)

### Project Structure
Adhering to the lightweight philosophy, V3 contains only a single core file but offers **two core variants** to adapt to different submenu application scenarios:
- **CRCMenu.v3-A.js**: Recommended version with absolutely positioned submenus (simpler structure)
- **CRCMenu.v3-B.js**: Alternative version with advanced nested submenu positioning (fixed positioning, better multi-level support)

Both files include complete Web Components definitions, logic, and default configurations.
  Includes:
  - Custom element (`<custom-right-click-menu>`)
  - Theme management
  - Schema registration
  - Context detection
  - Event handling (click/scroll/keydown/touch)

If you are unsure which version to choose, refer to the [Version Selection Guide](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/Version_Selection_Guide.md).

*Note: Previous versions (V1/V2) are no longer maintained. V3 focuses on a lightweight, framework-free deployment experience with in-depth intelligent optimization.*

### Quick Start
#### 1. Get the Source Code
- Visit the [GitHub repository](https://github.com/add-qwq/Custom-Right-Click-Menu).

- Download the latest version at [Releases](https://github.com/add-qwq/Custom-Right-Click-Menu/releases); or clone via Git:
  ```bash
  git clone https://github.com/add-qwq/Custom-Right-Click-Menu.git
  ```

#### 2. Basic Usage (3 Steps)
V3 only requires **one JS file import** — no other dependencies.

##### Step 1: Import the Core File
Add the following to the `<head>` of your HTML or before the closing `</body>` tag:
```html
<!-- Import CRCM V3 core file -->
<script src="path/to/CRCMenu.v3-A.js"></script>
```

##### Step 2: (Optional) Configure Theme/External Styles
Modify the `createRightClickMenu()` function in the JS file to customize the theme or load external styles:

```javascript
const menu = new CustomRightClickMenu({
  // Custom theme (override default CSS variables), example "Glassmorphism Right-Click Menu" theme:
  theme: {
    '--menu-bg': 'rgba(255, 255, 255, 1)',
    '--menu-border': '1px solid rgba(0, 0, 0, 0.1)',
    '--menu-backdrop': 'blur(10px)',
    '--item-hover-bg': '#f3f4f6',
    '--text-color': '#6b7280',
    '--header-color': '#9ca3af',
    '--divider-color': '#e5e7eb',
    '--transition-speed': '0.1s'
  },
  // Load external stylesheets (e.g., Font Awesome icon library and external style files)
  externalStyles: [
    'Example.css',
    'https://s4.zstatic.net/ajax/libs/font-awesome/6.4.0/css/all.min.css'
  ]
});
```

Note: The Font Awesome icon library is **not mandatory**, but we strongly recommend loading it as it provides rich icon resources to make the menu more visually expressive.

##### Step 3: Auto-Initialization
The menu will automatically initialize via the built-in `createRightClickMenu()` function when the DOM is fully loaded. Right-click anywhere on the page to trigger the custom menu.

### Advanced Customization
V3’s core advantage is its concise yet powerful API. Below are common customization scenarios with code examples.

#### 1. Register Menu Schemas for Different Selectors
Support providing different menu configurations based on the clicked element:

```javascript
// Register a dedicated schema for img elements
menu.registerSchema({
  selector: 'img',
  groups: [/* Image-specific groups */]
});

// Default schema (used when no specific match is found)
menu.registerSchema({
  selector: 'default',
  groups: [/* Default groups */]
});
```

#### 2. Define Groups and Nested Items
Groups are used to organize menu items and support sorting:

```javascript
menu.registerSchema({
  selector: 'default',
  groups: [
    {
      id: 'other',
      name: 'Other Operations',
      order: 50,
      items: [
        {
          id: 'more',
          label: 'More Features',
          icon: 'fa-ellipsis-h',
          children: [
            { /* Nested item */ },
            {
              id: 'deep',
              label: 'Deep Nested Item',
              children: [ /* Third-level item */ ]
            }
          ]
        }
      ]
    }
  ]
});
```

#### 3. Dynamically Update the Theme
After menu initialization, you can still dynamically modify the theme via page JS:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  window.globalMenu = createRightClickMenu();
  window.globalMenu.setTheme({
    '--menu-bg': 'rgba(255, 255, 255, 0.1)',
    '--menu-border': '1px solid rgba(255, 255, 255, 0.05)',
    '--menu-backdrop': 'blur(10px)',
    '--item-hover-bg': 'rgba(255, 255, 255, 0.22)',
    '--text-color': 'white',
    '--header-color': 'white',
    '--divider-color': '#e5e7eb'
  });
});
```

#### 4. Mount to a Specific Element
By default, the menu is mounted to `window`. You can mount it to a specific element to limit the scope:

```javascript
const content = document.getElementById('content');
menu.mount(content);
// Unmount later if needed
menu.unmount();
```

### Implementation Principle
#### 1. Web Components Foundation
- **Custom Element**: `<custom-right-click-menu>` registered via `customElements.define()`
- **Shadow DOM**: Isolates menu styles from the parent page
- **Singleton Pattern**: Ensures only one menu instance exists
- **Recursive Rendering Mechanism**: Dynamically generates DOM for menu levels at all depths through the internal `_renderMenuLayer` method, and automatically binds hover and position calculation events
- **Boundary Adaptation**: Calculates offset width and height, compares with viewport boundaries, and dynamically corrects left and top values to ensure the menu is fully visible within the viewport

#### 2. Context Detection Logic
Real-time detection on right-click:
- **Text Selection**: `window.getSelection().toString()`
- **Link Detection**: `closest('a')` or parsing URLs in the `onclick` attribute
- **Image Detection**: `closest('img')` or parsing `background-image` styles
- **Input Focus Detection**: `document.activeElement`

#### 3. Event Handling
- **Right-click**: Prevent default menu, intelligently calculate position and display
- **Nested Submenus**: Advanced positioning logic to avoid exceeding the viewport
- **Outside click/scroll/Escape key/touch**: Hide menu to simulate native behavior

### Compatibility Notes
| Browser | Supported Versions | Notes |
|-----------------|--------------------|----------------------------------------|
| Chrome | 67+ | Full support (Web Components + Clipboard API) |
| Firefox | 63+ | Full support |
| Edge | 79+ (Chromium) | Full support |
| Safari | 12.1+ | Full support |
| Older Browsers | - | Basic functionality available (Clipboard fallback) |

*Note: Web Components require the minimum versions listed above. Some features (e.g., backdrop blur) may be degraded in older browsers.*

### Acknowledgements
- **Project Author**: add-qwq ([GitHub](https://github.com/add-qwq))
- **Special Thanks**: Conard-Ferenc ([GitHub](https://github.com/Conard-Ferenc)) for providing design ideas and technical support for Version 2 (V2).

### Planning
- Explore more modern and elegant UI designs
- Potential enhancement to support arbitrary icons/icon libraries in the future

### License
This project is licensed under the [Apache-2.0 License](LICENSE). You must comply with the terms of the license when using, modifying, or distributing this code.

---

## 中文

### 自定义右键菜单（V3）

我们有信心称该项目是GitHub上目前为止（具体时间以项目commits时间为准），功能最完善的、开源的、最优秀的**原生JavaScript自定义右键菜单项目**——无需依赖任何框架

当然，许多优秀的开发者或许只是未涉足此类工具；我们仅是将这一想法转化为了可落地的解决方案

本项目是Custom-Right-Click-Menu（简称CRCM）的**V3版本**，架构全面重构，在V2优势之上，新增了嵌套子菜单、键盘导航支持、增强的上下文检测和性能优化...等关键功能，拥有更流畅的动画、更丰富的交互模式、更强的上下文感知能力

相较于V1/V2版本，V3做到了零依赖、高可配、易集成，修复了多数已知问题，拓展性更高，并保持**单JS文件部署**——引入即可使用

综上所述，CRCM是一个具备多层级嵌套菜单支持、API强大简洁、智能菜单与子菜单定位、Schema化注册配置、动态显示/隐藏菜单项、高度自定义、主题定制、加载外部样式表、现代化UI与流畅动画...等多项特性的原生JS右键菜单项目，支持单JS文件部署，做到了零依赖、高可配、易集成

<br>

想要体验自动化管理（自动添加组件到网页+自动版本更新）？<br>通过[CRCM菜单管理器](https://github.com/add-qwq/CRCMenu-Manager)来体验项目的快速管理

想在所有网站上体验此右键菜单？<br>请安装[右键菜单 - 浏览器扩展](https://github.com/add-qwq/CRCM-Browser-Plugin)

<br>

![Downloads](https://img.shields.io/github/downloads/add-qwq/Custom-Right-Click-Menu/total?style=flat-square&logo=github)
![GitHub license](https://img.shields.io/github/license/add-qwq/Custom-Right-Click-Menu?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/add-qwq/Custom-Right-Click-Menu)


### 项目概述

**[在线演示（点击访问--中国镜像站）](https://www.rockaz.top/GitHub-Project-Demo/Custom-Right-Click-Menu/)**

*注：该网站服务器位于中国，中国境内用户访问更快速稳定页面语言为中文，但出于安全防御目的（为了防御大量来自中国境外的自动化攻击IP），我们已封锁所有中国以外的流量*

**[在线演示（点击访问--GitHub Page镜像站）](https://add-qwq.github.io/Custom-Right-Click-Menu(DemoPage)/)**

*注：该网站由GitHub Page托管，中国境内用户访问可能有较大延迟，适合中国境外用户（全球各地用户）访问*

本项目以Web Components为核心，替代浏览器原生右键菜单，提供灵活且高可扩展的自定义界面。支持上下文感知操作（文本复制/粘贴、链接/图片处理、页面控制），菜单拥有智能定位与自动调整功能，同时允许深度定制样式、结构与功能

### 核心功能（V3版本更新）

#### 1. 架构重构

- 架构重写，且支持多层级嵌套子菜单（无深度限制）
- 子菜单采用固定定位与智能溢出处理（靠近视口边缘时自动翻转方向）
- Schema化注册：通过JSON配置文件注册菜单方案，极大简化了API配置流程，支持无限嵌套children
- 使用Web Components（自定义元素+Shadow DOM）实现样式与逻辑隔离
- 单JS文件部署——无需额外CSS/HTML文件
- 单例模式设计，避免重复菜单实例
- 智能定位引擎：优化了边界碰撞检测逻辑，子菜单会根据屏幕剩余空间自动选择最佳弹出位置
- UI现代化：引入了更细腻的缩放与透明度过渡动画，完美支持玻璃拟态（Glassmorphism）风格

#### 2. 增强定制能力

- **主题高度定制**：通过CSS变量修改菜单颜色、边框、模糊效果、过渡速度等
- **上下文特定schema**：为特定选择器注册不同菜单配置
- **嵌套菜单结构**：直接在schema中通过children数组定义多级菜单
- **动态显隐**：菜单项与分组根据上下文函数显示/隐藏
- **外部样式加载**：支持加载第三方样式（如FontAwesome图标库）

#### 3. 保留并优化的核心功能

- 替代浏览器默认右键菜单，提供现代化动画界面
- 上下文感知选项：
  - 文本：复制选中内容文本
  - 输入框：粘贴剪贴板内容/复制输入框内文本
  - 链接：新标签页打开/复制链接地址
  - 图片：新标签页打开/复制图片URL
- 页面控制：返回上一页、刷新、跳转主页、滚动至底部
- 流畅动画（缩放+透明度过渡）与智能自适应定位（自动适配视口边界与嵌套子菜单）
- 智能菜单定位与自动方向调整
- 剪贴板API降级方案（支持旧浏览器）

### 项目结构

V3版本保持轻量理念，仅包含单个核心文件，但提供**两个核心变体**以适应不同子菜单应用场景：

- **CRCMenu.v3-A.js**：推荐版本，采用绝对定位子菜单（结构更简单）
- **CRCMenu.v3-B.js**：备选版本，采用高级嵌套子菜单定位（固定定位，更佳多层级支持）

两个文件均包含完整的Web Components定义、逻辑与默认配置。
  内容包括：
  - 自定义元素（`<custom-right-click-menu>`）
  - 主题管理
  - 方案注册
  - 上下文检测
  - 事件处理（点击/滚动/按键/触摸）

若你不知道如何选择版本，请参考[版本选择指南](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/Version_Selection_Guide.md)

*注：旧版（V1/V2）已停止维护。V3专注于轻量、无框架的部署体验，且V3进行了深度智能调优*


### 快速使用

#### 1. 获取源代码

- 访问[GitHub仓库](https://github.com/add-qwq/Custom-Right-Click-Menu)。
- 前往[Releases](https://github.com/add-qwq/Custom-Right-Click-Menu/releases)下载最新版本；或通过Git克隆：

  ```bash
  git clone https://github.com/add-qwq/Custom-Right-Click-Menu.git
  ```

#### 2. 基础使用（3步完成）

V3版本仅需**导入一个JS文件**——无其他依赖

##### 步骤1：导入核心文件

在HTML的`<head>`或闭合`</body>`标签前添加：
```html
<!-- 导入CRCM V3核心文件 -->
<script src="path/to/CRCMenu.v3-A.js"></script>
```

##### 步骤2：（可选）配置主题/外部样式

修改JS文件中的createRightClickMenu()函数，定制主题或加载外部样式：

```javascript
const menu = new CustomRightClickMenu({
  // 自定义主题（覆盖默认CSS变量），示例"玻璃拟态右键菜单"主题：
  theme: {
    '--menu-bg': 'rgba(255, 255, 255, 1)',
    '--menu-border': '1px solid rgba(0, 0, 0, 0.1)',
    '--menu-backdrop': 'blur(10px)',
    '--item-hover-bg': '#f3f4f6',
    '--text-color': '#6b7280',
    '--header-color': '#9ca3af',
    '--divider-color': '#e5e7eb',
    '--transition-speed': '0.1s'
  },
  // 加载外部样式表（如FontAwesome图标库和外部样式文件）
  externalStyles: [
    'Example.css',
    'https://s4.zstatic.net/ajax/libs/font-awesome/6.4.0/css/all.min.css'
  ]
});
```

注意：FontAwesome图标库**不是必选项**，但是我们强烈推荐加载它，因为它提供了丰富的图标资源，可以让菜单更具可视化表现力


##### 步骤3：自动初始化

菜单会在DOM加载完成后，通过内置的`createRightClickMenu()`函数自动初始化。在页面任意位置右键即可触发自定义菜单

### 高级定制

V3的核心优势是简洁而强大的API，以下是常见定制场景及代码示例

#### 1. 为不同选择器注册菜单方案

支持根据点击元素提供不同菜单配置：

```javascript
// 为img元素注册专用方案
menu.registerSchema({
  selector: 'img',
  groups: [/* 图片专用分组 */]
});

// 默认方案（无特定匹配时使用）
menu.registerSchema({
  selector: 'default',
  groups: [/* 默认分组 */]
});
```

#### 2. 定义分组与嵌套项

分组用于组织菜单项，支持排序：

```javascript
menu.registerSchema({
  selector: 'default',
  groups: [
    {
      id: 'other',
      name: '其他操作',
      order: 50,
      items: [
        {
          id: 'more',
          label: '更多功能',
          icon: 'fa-ellipsis-h',
          children: [
            { /* 嵌套项 */ },
            {
              id: 'deep',
              label: '深层嵌套项',
              children: [ /* 三级项 */ ]
            }
          ]
        }
      ]
    }
  ]
});
```

#### 3. 动态更新主题

菜单初始化后，仍可通过页面JS动态修改主题：

```javascript
document.addEventListener('DOMContentLoaded', function() {
  window.globalMenu = createRightClickMenu();
  window.globalMenu.setTheme({
    '--menu-bg': 'rgba(255, 255, 255, 0.1)',
    '--menu-border': '1px solid rgba(255, 255, 255, 0.05)',
    '--menu-backdrop': 'blur(10px)',
    '--item-hover-bg': 'rgba(255, 255, 255, 0.22)',
    '--text-color': 'white',
    '--header-color': 'white',
    '--divider-color': '#e5e7eb'
  });
});
```

#### 4. 挂载到指定元素

默认挂载到`window`，可挂载到特定元素以限制作用范围：

```javascript
const content = document.getElementById('content');
menu.mount(content);
// 后续如需卸载
menu.unmount();
```

### 实现原理

#### 1. Web Components基础

- **自定义元素**：通过`customElements.define()`注册`<custom-right-click-menu>`
- **Shadow DOM**：隔离菜单样式与父页面
- **单例模式**：确保仅存在一个菜单实例
- **递归渲染机制**：通过_renderMenuLayer内部方法，递归生成各级菜单DOM，并自动绑定悬停与位置计算事件
- **边界自适应**：计算Offset宽度与高度，对比视口边界，动态修正left和top值，确保菜单完全可见于视口内

#### 2. 上下文检测逻辑

实时检测右键点击上下文：

- **文本选中**：`window.getSelection().toString()`
- **链接检测**：`closest('a')`或解析`onclick`属性中的URL
- **图片检测**：`closest('img')`或解析`background-image`样式
- **输入框聚焦**：`document.activeElement`

#### 3. 事件处理

- **右键点击**：阻止默认菜单，智能计算位置并显示
- **嵌套子菜单**：高级定位逻辑避免超出视口
- **外部点击/滚动/Esc键/触摸**：隐藏菜单，模拟原生行为


### 兼容性说明

| 浏览器 | 支持版本 | 说明 |
|-----------------|----------------|---------------------------------------|
| Chrome | 67+ | 完全支持（Web Components + 剪贴板API） |
| Firefox | 63+ | 完全支持 |
| Edge | 79+（Chromium）| 完全支持 |
| Safari | 12.1+ | 完全支持 |
| 旧版浏览器 | - | 基础功能可用（剪贴板降级方案） |

*注：Web Components需要上述最低版本支持。旧版浏览器中，部分特性（如背景模糊）可能降级显示*

### 致谢

- **项目作者**：add-qwq ([GitHub](https://github.com/add-qwq))
- **特别感谢**：Conard-Ferenc ([GitHub](https://github.com/Conard-Ferenc)) 为早期版本(V2)提供设计思路与技术支持

### 更新规划
- 探索更加现代优雅的UI设计
- 未来可能更改为可使用任意图标/图标库

### 许可证
本项目采用[Apache-2.0 License](LICENSE)授权。您在使用、修改或分发本代码时，必须遵守许可证条款。
