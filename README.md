# Custom Right-Click Menu (V2)
# 自定义右键菜单（V2）

![Interface](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/Custom-Right-Click-Menu1.png?raw=true)  
![Interface](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/Custom-Right-Click-Menu2.png?raw=true)  
![Interface](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/Custom-Right-Click-Menu3.png?raw=true)  
![Interface](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/Custom-Right-Click-Menu4.png?raw=true)  


## English

### Custom Right-Click Menu (V2)
We are confident that this project is by far (with the specific time subject to the project's commits time) the **most fully-featured, open-source, and finest native JavaScript custom context menu project** on GitHub—no reliance on any frameworks required.

Of course, many excellent developers may simply not have ventured into such tools; we have merely turned this idea into a practical, implementable solution.

This is Version 2 of Custom-Right-Click-Menu (CRCM), rewritten based on **Web Components**. It introduces new features including custom grouping, dynamic menu item show/hide, custom menu items, theme customization, and external stylesheet loading.

Compared to V1, V2 Zero Dependency, High Configurability, Easy Integration, fixes most known issues, improves extensibility, and is simplified to **single JS file deployment** — ready to use with just an import.

Want to experience automated management (including automatically adding components to web pages + automatic version updates)? Experience rapid project management through [CRCMenu Manager](https://github.com/add-qwq/CRCMenu-Manager). 

Want to use this right-click menu across all websites? Install the [Right Click Menu - Browser Extension](https://github.com/add-qwq/CRCM-Browser-Plugin).


![Downloads](https://img.shields.io/github/downloads/add-qwq/Custom-Right-Click-Menu/total?style=flat-square&logo=github)
![GitHub license](https://img.shields.io/github/license/add-qwq/Custom-Right-Click-Menu?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/add-qwq/Custom-Right-Click-Menu)


### Project Overview
- **[Online Demo (Click to Access - China Mirror Site)](https://www.rockaz.top/GitHub-Project-Demo/Custom-Right-Click-Menu/)**  
*Note: The server of this website is located in China, ensuring faster and more stable access for users within China. The page language is Chinese. However, for security defense purposes(To defend against a large number of automated attack IPs from outside China), all traffic from outside China has been blocked.*

- **[Online Demo (Click to Access - GitHub Page Mirror Site)](https://add-qwq.github.io/Custom-Right-Click-Menu(DemoPage)/)**  
*Note: This website is hosted on GitHub Pages. Users within China may experience significant access delays, so it is more suitable for users outside China (users around the world).*

Centered around Web Components, this project replaces the browser's native right-click menu with a flexible, highly extensible custom interface. It supports context-aware operations (text copy/paste, link/image handling, page controls) while allowing in-depth customization of styles, structure, and functionality.

### Key Features (V2 Updates)
#### 1. Architecture Upgrade
- Built on **Web Components** (custom elements + Shadow DOM) to achieve style and logic encapsulation and isolation
- Single JS file deployment — no need to import additional CSS/HTML files
- Singleton pattern design to avoid duplicate menu instances

#### 2. Enhanced Customization Capabilities
- **Theme Customization**: Modify menu colors, borders, blur effects, and transition speeds via CSS variables
- **Custom Grouping**: Register sortable menu item groups (e.g., "General Operations", "Edit Operations")
- **Dynamic Menu Items**: Add/remove menu items at runtime, and control visibility via context rules
- **External Style Loading**: Support loading third-party styles (e.g., Font Awesome icon library, example CSS stylesheets)

#### 3. Retained & Improved Core Features
- Replaces the default browser right-click menu with a modern, animated interface
- Context-aware options:
  - Text: Copy selected content
  - Input fields: Paste clipboard content
  - Links: Open in new tab / copy link address
  - Images: Open in new tab / copy image URL
- Page controls: Go back, refresh, navigate to homepage
- Smooth animations (scale + opacity transitions) and adaptive positioning (avoids viewport overflow)
- Fallback solution for Clipboard API (supports older browsers)

### Project Structure
V2 is simplified to a **single core file** (no redundant folders):
- **CRCMenu.v2.js**: Core file containing Web Components definition, logic, and default configurations.  
  Includes:
  - Custom element (`<custom-right-click-menu>`)
  - Theme management
  - Group/menu item registration
  - Context detection
  - Event handling (click/scroll/keydown)

*Note: The legacy Tailwind CSS version (V1) is no longer maintained. V2 focuses on a lightweight, framework-free deployment experience.*

*The CRCMenu Tailwind folder stores the Tailwind version of CRCMenu, which is only applicable to V1. It has been discontinued and is not related to V2*

### Quick Start

#### 1. Get the Source Code
- Visit the [GitHub repository](https://github.com/add-qwq/Custom-Right-Click-Menu).
- Click the *Code* button and select *Download ZIP*; or clone via Git:
  ```bash
  git clone https://github.com/add-qwq/Custom-Right-Click-Menu.git
  ```

#### 2. Basic Usage (3 Steps)
V2 only requires **one JS file import** — no other dependencies.

##### Step 1: Import the Core File
Add the following to the `<head>` of your HTML or before the closing `</body>` tag:
```html
<!-- Import CRCM V2 core file -->
<script src="path/to/CRCMenu.v2.js"></script>
```

##### Step 2: (Optional) Configure Theme/External Styles
Modify the `createRightClickMenu()` function in `CRCMenu.v2.js` to customize the theme or load external styles (e.g., Font Awesome icon library, example CSS stylesheets):
```javascript
const menu = new CustomRightClickMenu({
  // Custom theme (override default CSS variables)
  theme: {
    '--menu-bg': 'rgba(255, 255, 255, 0.95)', // Menu background
    '--menu-border': '1px solid rgba(0, 0, 0, 0.1)', // Menu border
    '--menu-backdrop': 'blur(10px)', // Backdrop blur
    '--item-hover-bg': '#f3f4f6', // Menu item hover background
    '--text-color': '#6b7280', // Text color
    '--header-color': '#9ca3af', // Group header color
    '--divider-color': '#e5e7eb', // Divider color
    '--transition-speed': '0.1s' // Animation speed
  },
  // Load external stylesheets (e.g., Font Awesome icons and example CSS stylesheets)
  externalStyles: [
    'Example.css',
    'https://s4.zstatic.net/ajax/libs/font-awesome/6.4.0/css/all.min.css'
  ]
});
```

##### Step 3: Auto-Initialization
The menu automatically initializes via the built-in `createRightClickMenu()` function when the DOM is fully loaded. Right-click anywhere on the page to trigger the custom menu.

### Advanced Customization
V2’s core advantage lies in its high extensibility. Below are common customization scenarios with code examples.

#### 1. Register Custom Groups
Groups are used to organize menu items and support sorting via the `order` parameter (smaller values = higher priority):
```javascript
// Inside the createRightClickMenu() function
menu.registerGroup({
  id: 'other', // Unique group ID
  name: 'Other Operations', // Group header text
  order: 50 // Display order
});
```

#### 2. Add Custom Menu Items
Register new menu items, bind callback functions, and control visibility via the `context` function:

```javascript
// Inside the createRightClickMenu() function
// Example: Add a "Test" menu item (always visible)
menu.registerMenuItem({
  id: 'test', // Unique menu item ID
  label: 'Test', // Menu item text
  icon: 'fa-question', // Icon (from Font Awesome)
  callback: testAction, // Bound callback function
  context: () => true, // Always visible (context function returns true)
  group: 'other' // Associate with the "other" group
});

// Corresponding callback function (defined separately)
const testAction = (ctx) => {
  alert('This is a test');
};
```

#### 3. Unregister Groups/Menu Items
Remove unwanted groups or menu items at runtime:
```javascript
// Unregister a group (also removes all its menu items)
menu.unregisterGroup('other');

// Unregister a single menu item
menu.unregisterMenuItem('test');
```

#### 4. Mount to a Specific Element
By default, the menu is mounted to `window` (triggers on all right-clicks). You can mount it to a specific element to limit its scope:
```javascript
// Mount only to the <div id="content"> element
const content = document.getElementById('content');
menu.mount(content);

// Unmount later if needed
menu.unmount();
```

#### 5. Dynamically Update the Theme
Modify the theme after initialization:
```javascript
// Dynamically modify the style within the page (without changing the project source code)
document.addEventListener('DOMContentLoaded', function() {
            window.globalMenu = createRightClickMenu();
            window.globalMenu.setTheme({
                '--menu-bg': 'rgba(255, 255, 255, 0.1)',
                '--menu-border': '1px solid rgba(255, 255, 255, 0.05)',
                '--menu-backdrop': 'blur(10px)',
                '--transition-speed': '0.1s',
                '--item-hover-bg': 'rgba(255, 255, 255, 0.3)',
                '--text-color': 'white',
                '--header-color': 'white',
                '--divider-color': '#e5e7eb'
            });
        });
```

### Implementation Principle
#### 1. Web Components Foundation
- **Custom Element**: `<custom-right-click-menu>` is registered via `customElements.define()`, enabling reuse across projects.
- **Shadow DOM**: Isolates menu styles from the parent page (avoids CSS conflicts).
- **Singleton Pattern**: Ensures only one menu instance exists (prevents duplicates).

#### 2. Context Detection Logic
The menu uses JavaScript to detect the right-click context in real time:
- **Text Selection**: `window.getSelection().toString()`
- **Link Detection**: `closest('a')` or parsing URLs from `onclick` attributes
- **Image Detection**: `closest('img')` or parsing `background-image` styles
- **Input Focus Detection**: `document.activeElement` (detects `<input>`, `<textarea>`, or editable elements)

#### 3. Event Handling
- **Right-click**: Prevents the default menu, calculates the menu position, and displays the custom menu.
- **Outside Click/Scroll/Escape Key**: Hides the menu to mimic native behavior.
- **Touch Events**: Hides the menu on touch swipes (mobile-friendly).

### Compatibility Notes
| Browser         | Supported Versions | Notes                                  |
|-----------------|--------------------|----------------------------------------|
| Chrome          | 67+                | Full support (Web Components + Clipboard API) |
| Firefox         | 63+                | Full support                           |
| Edge            | 79+ (Chromium)     | Full support                           |
| Safari          | 12.1+              | Full support                           |
| Older Browsers  | -                  | Basic functionality available (Clipboard fallback) |

*Note: Web Components require the minimum versions listed above. Some features (e.g., backdrop blur) may be degraded in older browsers.*

### Acknowledgements
- **Project Author**: add-qwq ([GitHub](https://github.com/add-qwq))
- **Special Thanks**: Conard-Ferenc ([GitHub](https://github.com/Conard-Ferenc)) for providing core design ideas and partial technical support for V2.

### Planning
- Possible future updates to the secondary expansion menu function
- Future updates may allow the use of any icon/icon library

### License
This project is licensed under the [Apache-2.0 License](LICENSE). You must comply with the terms of the license when using, modifying, or distributing this code.

## 中文

### 自定义右键菜单（V2）
我们有信心称该项目是GitHub上目前为止（具体时间以项目commits时间为准），功能最完善的、开源的、最优秀的**原生JavaScript自定义右键菜单项目**——无需依赖任何框架

当然，许多优秀的开发者或许只是未涉足此类工具；我们仅是将这一想法转化为了可落地的解决方案。

本项目是Custom-Right-Click-Menu（简称CRCM）的**V2版本**，基于**Web Components**重写，新增自定义分组、动态菜单项显隐、自定义菜单项、主题定制、外部样式表加载等功能。

相较于V1版本，V2零依赖、高可配、易集成，修复了多数已知问题，提升了扩展性，并简化为**单JS文件部署**——引入即可使用。

想要体验自动化管理（自动添加组件到网页+自动版本更新）？通过[CRCM菜单管理器](https://github.com/add-qwq/CRCMenu-Manager)来体验项目的快速管理。  

想在所有网站上体验此右键菜单？请安装[右键菜单 - 浏览器扩展](https://github.com/add-qwq/CRCM-Browser-Plugin)。

![Downloads](https://img.shields.io/github/downloads/add-qwq/Custom-Right-Click-Menu/total?style=flat-square&logo=github)
![GitHub license](https://img.shields.io/github/license/add-qwq/Custom-Right-Click-Menu?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/add-qwq/Custom-Right-Click-Menu)

### 项目概述
**[在线演示（点击访问--中国镜像站）](https://www.rockaz.top/GitHub-Project-Demo/Custom-Right-Click-Menu/)**  
*注：该网站服务器位于中国，中国境内用户访问更快速稳定页面语言为中文，但出于安全防御目的（为了防御大量来自中国境外的自动化攻击IP），我们已封锁所有中国以外的流量*

**[在线演示（点击访问--GitHub Page镜像站）](https://add-qwq.github.io/Custom-Right-Click-Menu(DemoPage)/)**  
*注：该网站由GitHub Page托管，中国境内用户访问可能有较大延迟，适合中国境外用户（全球各地用户）访问*

本项目以Web Components为核心，替代浏览器原生右键菜单，提供灵活且高可扩展的自定义界面。支持上下文感知操作（文本复制/粘贴、链接/图片处理、页面控制），同时允许深度定制样式、结构与功能

### 核心功能（V2版本更新）
#### 1. 架构升级
- 基于**Web Components**（自定义元素+Shadow DOM）构建，实现样式与逻辑封装隔离
- 单JS文件部署——无需额外导入CSS/HTML文件
- 单例模式设计，避免重复菜单实例

#### 2. 增强定制能力
- **主题定制**：通过CSS变量修改菜单颜色、边框、模糊效果、过渡速度
- **自定义分组**：注册可排序的菜单项分组（如“常规操作”“编辑操作”）
- **动态菜单项**：运行时添加/删除菜单项，通过上下文规则控制显隐
- **外部样式加载**：支持加载第三方样式（如Font Awesome图标库）

#### 3. 保留并优化的核心功能
- 替代浏览器默认右键菜单，提供现代化动画界面
- 上下文感知选项：
  - 文本：复制选中内容
  - 输入框：粘贴剪贴板内容
  - 链接：新标签页打开/复制链接地址
  - 图片：新标签页打开/复制图片URL
- 页面控制：返回上一页、刷新、跳转主页
- 流畅动画（缩放+透明度过渡）与自适应定位（避免超出视口）
- 剪贴板API降级方案（支持旧浏览器）

### 项目结构
V2版本简化为**单核心文件**（无冗余文件夹）：
- **CRCMenu.v2.js**：核心文件，包含Web Components定义、逻辑与默认配置。  
  内容包括：
  - 自定义元素（`<custom-right-click-menu>`）
  - 主题管理
  - 分组/菜单项注册
  - 上下文检测
  - 事件处理（点击/滚动/按键）

*注：旧版Tailwind CSS版本（V1）已停止维护。V2专注于轻量、无框架的部署体验。*

*CRCMenu-Tailwind文件夹存储的是仅适用于V1的CRCMenu的Tailwind版本，现已停更，与V2无关系*

### 快速使用

#### 1. 获取源代码
- 访问[GitHub仓库](https://github.com/add-qwq/Custom-Right-Click-Menu)。
- 点击右上角*Code*按钮，选择*Download ZIP*；或通过Git克隆：
  ```bash
  git clone https://github.com/add-qwq/Custom-Right-Click-Menu.git
  ```

#### 2. 基础使用（3步完成）
V2版本仅需**导入一个JS文件**——无其他依赖。

##### 步骤1：导入核心文件
在HTML的`<head>`或闭合`</body>`标签前添加：
```html
<!-- 导入CRCM V2核心文件 -->
<script src="路径/到/CRCMenu.v2.js"></script>
```

##### 步骤2：（可选）配置主题/外部样式
修改`CRCMenu.v2.js`中的`createRightClickMenu()`函数，定制主题或加载外部样式（如Font Awesome图标库）：
```javascript
const menu = new CustomRightClickMenu({
  // 自定义主题（覆盖默认CSS变量）
  theme: {
    '--menu-bg': 'rgba(255, 255, 255, 0.95)', // 菜单背景
    '--menu-border': '1px solid rgba(0, 0, 0, 0.1)', // 菜单边框
    '--menu-backdrop': 'blur(10px)', // 背景模糊
    '--item-hover-bg': '#f3f4f6', // 菜单项 hover 背景
    '--text-color': '#6b7280', // 文本颜色
    '--header-color': '#9ca3af', // 分组标题颜色
    '--divider-color': '#e5e7eb', // 分隔线颜色
    '--transition-speed': '0.1s' // 动画速度
  },
  // 加载外部样式表（如Font Awesome图标和示例css样式表）
  externalStyles: [
    'Example.css',
    'https://s4.zstatic.net/ajax/libs/font-awesome/6.4.0/css/all.min.css'
  ]
});
```

##### 步骤3：自动初始化
菜单会在DOM加载完成后，通过内置的`createRightClickMenu()`函数自动初始化。在页面任意位置右键即可触发自定义菜单。

### 高级定制
V2的核心优势是高扩展性，以下是常见定制场景及代码示例。

#### 1. 注册自定义分组
分组用于组织菜单项，支持通过`order`参数排序（值越小，优先级越高）：
```javascript
// 在createRightClickMenu()函数内
menu.registerGroup({
  id: 'other', // 唯一分组ID
  name: '其他操作', // 分组标题文本
  order: 50 // 显示顺序
});
```

#### 2. 添加自定义菜单项
注册新菜单项并绑定回调函数，通过`context`函数控制显隐：

```javascript
// 在createRightClickMenu()函数内
// 示例：添加"测试"菜单项（始终可见）
menu.registerMenuItem({
  id: 'test', // 唯一菜单项ID
  label: '测试', // 菜单项文本
  icon: 'fa-question', // 图标（来自Font Awesome）
  callback: testAction, // 绑定的回调函数
  context: () => true, // 始终可见（上下文函数返回true）
  group: 'other' // 关联到"other"分组
});

// 对应的回调函数（单独定义）
const testAction = (ctx) => {
  alert('我是测试');
};
```

#### 3. 卸载分组/菜单项
运行时移除不需要的分组或菜单项：
```javascript
// 卸载分组（同时移除其下所有菜单项）
menu.unregisterGroup('other');

// 卸载单个菜单项
menu.unregisterMenuItem('test');
```

#### 4. 挂载到指定元素
默认情况下，菜单挂载到`window`（所有右键点击均触发）。可挂载到特定元素以限制作用范围：
```javascript
// 仅挂载到<div id="content">元素
const content = document.getElementById('content');
menu.mount(content);

// 后续如需卸载
menu.unmount();
```

#### 5. 动态更新主题
初始化后仍可修改主题：
```javascript
// 进行页面内动态修改样式（不更改项目源码）
document.addEventListener('DOMContentLoaded', function() {
            window.globalMenu = createRightClickMenu();
            window.globalMenu.setTheme({
                '--menu-bg': 'rgba(255, 255, 255, 0.1)',
                '--menu-border': '1px solid rgba(255, 255, 255, 0.05)',
                '--menu-backdrop': 'blur(10px)',
                '--transition-speed': '0.1s',
                '--item-hover-bg': 'rgba(255, 255, 255, 0.3)',
                '--text-color': 'white',
                '--header-color': 'white',
                '--divider-color': '#e5e7eb'
            });
        });
```

### 实现原理
#### 1. Web Components基础
- **自定义元素**：通过`customElements.define()`注册`<custom-right-click-menu>`，支持跨项目复用。
- **Shadow DOM**：隔离菜单样式与父页面（避免CSS冲突）。
- **单例模式**：确保仅存在一个菜单实例（防止重复）。

#### 2. 上下文检测逻辑
菜单通过JavaScript实时检测右键点击上下文：
- **文本选中**：`window.getSelection().toString()`
- **链接检测**：`closest('a')`或解析`onclick`属性中的URL
- **图片检测**：`closest('img')`或解析`background-image`样式
- **输入框聚焦**：`document.activeElement`（检测`<input>`、`<textarea>`或可编辑元素）

#### 3. 事件处理
- **右键点击**：阻止默认菜单，计算菜单位置并显示。
- **外部点击/滚动/Esc键**：隐藏菜单，模拟原生行为。
- **触摸事件**：触摸滑动时隐藏菜单（适配移动端）。

### 兼容性说明
| 浏览器          | 支持版本       | 说明                                  |
|-----------------|----------------|---------------------------------------|
| Chrome          | 67+            | 完全支持（Web Components + 剪贴板API） |
| Firefox         | 63+            | 完全支持                              |
| Edge            | 79+（Chromium）| 完全支持                              |
| Safari          | 12.1+          | 完全支持                              |
| 旧版浏览器      | -              | 基础功能可用（剪贴板降级方案）        |

*注：Web Components需要上述最低版本支持。旧版浏览器中，部分特性（如背景模糊）可能降级显示。*

### 致谢
- **项目作者**：add-qwq ([GitHub](https://github.com/add-qwq))
- **特别感谢**：Conard-Ferenc ([GitHub](https://github.com/Conard-Ferenc)) 为V2版本提供核心设计思路与部分技术支持

### 规划
- 未来可能更新二级展开菜单功能
- 未来可能更改为可使用任意图标/图标库

### 许可证
本项目采用[Apache-2.0 License](LICENSE)授权。您在使用、修改或分发本代码时，必须遵守许可证条款。
