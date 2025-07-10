# Custom Right-Click Menu
# 自定义右键菜单

![Interface](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/Custom-Right-Click-Menu1.png?raw=true)  
![Interface](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/Custom-Right-Click-Menu2.png?raw=true)  
![Interface](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/Custom-Right-Click-Menu3.png?raw=true)  
![Interface](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/Custom-Right-Click-Menu4.png?raw=true)  

## English

### Custom Right-Click Menu

Do you want to experience automated management? (Automatically add this right-click menu component to your webpage, automatically update version)? Automatically integrate this right-click menu component into your webpage with version updates via [CRCMenu-Manager](https://github.com/add-qwq/CRCMenu-Manager).

Want to experience this right-click menu across all websites? Install the [Right Click Menu - Browser Extension](https://github.com/add-qwq/CRCM-Browser-Plugin).

![GitHub license](https://img.shields.io/github/license/add-qwq/Custom-Right-Click-Menu?style=flat-square)

This is a customizable right-click context menu built with HTML, JavaScript, and CSS. It replaces the browser's default context menu with a modern, animated interface that supports text copying, pasting, link and image operations, page refreshing, and navigation to a main interface. The menu dynamically adapts its options based on the context (e.g., selected text, links, images, or input fields) and features smooth animations, hover effects, and responsive positioning.

### Project Structure

#### Folder Organization
- **CRCMenu-CSS/**: Contains the source code with pure CSS for styling, offering a lightweight and customizable solution.
- **CRCMenu-Tailwind/**: Contains a legacy Tailwind CSS version (no longer maintained for Tailwind versions beyond V1). Developers are encouraged to use the CRCMenu-CSS version for active support.

### Description
**[Online Demonstration (Click to Access)](https://www.rockaz.top/GitHub-Project-Demo/Custom-Right-Click-Menu/)**  
*Note: The website server is located in China.*

This project delivers a flexible right-click menu that overrides the browser's native context menu. It provides intuitive text, link, and image manipulation features alongside page navigation controls, all wrapped in a sleek, modern UI with a focus on usability and aesthetics.

### Key Features
- Replaces the default browser right-click menu with a custom interface
- Context-aware options for text (copy/paste), links (open/copy), and images (open/copy URL)
- Page controls: refresh the page or navigate to a specified main interface
- Smooth CSS animations with hover effects and adaptive menu positioning
- Supports input field interactions for pasting clipboard content
- Lightweight and modular design for easy integration

### Functional Scenarios

#### Context-Dependent Menu Display Rules
1. **No Content Selected (Default State)**  
   - Trigger: Right-click on any area without text selection, links, images, or input focus  
   - Options: Back to Main Interface / Refresh Page  

2. **Right-Click on a Link**  
   - Trigger: Right-click on an `<a>` tag or element with a clickable URL  
   - Options: Open Link in New Tab / Copy Link Address  

3. **Right-Click on an Image**  
   - Trigger: Right-click on an `<img>` tag or element with a background image  
   - Options: Open Image in New Tab / Copy Image URL  

4. **Text Selected**  
   - Trigger: Text is selected via mouse drag (`window.getSelection().toString() !== ''`)  
   - Options: Back to Main Interface / Refresh Page / Copy Selected Text  

5. **Input Field Focused**  
   - Trigger: Right-click while an `<input>` or `<textarea>` is focused  
   - Options: Back to Main Interface / Refresh Page / Paste Clipboard Content  

#### Implementation Principle
The menu leverages JavaScript to detect context in real-time:  
- Text selection via `window.getSelection()`  
- Link detection by checking the target element or its ancestors for `<a>` tags or `onclick` handlers  
- Image detection via `<img>` tags or computed `background-image` styles  
- Input focus detection using `document.activeElement` for `<input>` or `<textarea>` elements  

### File Structure

#### CRCMenu-CSS/
- **CRCMenu.html**: Main HTML file defining the menu structure  
- **CRCMenu.js**: JavaScript logic for menu behavior and context detection  
- **CRCMenu.css**: CSS styles for layout, animations, and visual effects  
- **All-Custom Right-Click-Menu.html**: All-in-one file with embedded CSS and JS for quick deployment  

#### CRCMenu-Tailwind/ (Legacy)
- **rcm-tailwind.html**: HTML with Tailwind CSS classes (deprecated)  
- **rcm-tailwind.js**: JavaScript logic for the Tailwind version (deprecated)  
- **integration-tailwind.html**: Embedded Tailwind version (deprecated)  

*Note: The Tailwind version is no longer maintained for Tailwind CSS versions beyond V1. Use the CRCMenu-CSS version for active development and support.*

### Quick Start

#### Download and Use
1. **Get Source Code**:  
   - Visit the [GitHub repository](https://github.com/add-qwq/Custom-Right-Click-Menu).  
   - Click the *Code* button and select *Download ZIP*.  
   - Extract the ZIP file to a local directory.  

2. **Run the Menu**:  
   - For the CSS version: Open `CRCMenu.html` or `All-Custom Right-Click-Menu.html` in a modern browser.  
   - For the Tailwind version: Open `rcm-tailwind.html` or `integration-tailwind.html` (note: deprecated).  
   - Right-click on the page to trigger the custom menu.  

#### Customization
1. **CSS Version (CRCMenu-CSS/)**  
   - Modify `CRCMenu.css` to adjust colors, sizes, or animations.  
   - Edit `CRCMenu.js` to:  
     - Change the main interface URL in `backToHomeAction()`.  
     - Add or remove menu items and their corresponding actions.  
   - Integrate by linking `CRCMenu.css` and `CRCMenu.js` in your HTML or using `All-Custom Right-Click-Menu.html` as a template.  

2. **Tailwind Version (CRCMenu-Tailwind/, Deprecated)**  
   - Ensure Tailwind CSS (V1) is loaded in your project.  
   - Modify `rcm-tailwind.html` to adjust styles using Tailwind utility classes.  
   - Edit `rcm-tailwind.js` for functional customizations, similar to the CSS version.  
   - Note: This version is no longer supported; consider migrating to the CSS version for future updates.  

### Compatibility
Compatible with modern browsers (Chrome, Firefox, Edge, Safari) supporting the `navigator.clipboard` API. Fallback mechanisms ensure basic functionality in older browsers, though some features (e.g., clipboard pasting) may be limited.

### License
This project is licensed under the [Apache-2.0 License](LICENSE).

---

## 中文

### 自定义右键菜单

想要体验自动化管理吗？（自动添加此右键菜单组件到您的网页，自动化更新版本）？通过[CRC 菜单管理器](https://github.com/add-qwq/CRCMenu-Manager)自动将此右键菜单组件集成到你的网页，并支持自动版本更新。

想在所有网站上体验此右键菜单？请安装[右键菜单 - 浏览器扩展](https://github.com/add-qwq/CRCM-Browser-Plugin)。

![GitHub license](https://img.shields.io/github/license/add-qwq/Custom-Right-Click-Menu?style=flat-square)

这是一个基于HTML、JavaScript和CSS开发的自定义右键菜单，替代浏览器默认右键菜单，支持文本复制、粘贴、链接和图片操作、页面刷新以及返回主界面等功能。菜单根据上下文（选中文本、链接、图片或输入框）动态显示选项，拥有流畅的动画效果、悬停交互和自适应定位。

### 项目结构

#### 文件夹说明
- **CRCMenu-CSS/**：包含使用纯CSS样式的源代码，轻量且易于定制。  
- **CRCMenu-Tailwind/**：包含基于Tailwind CSS的旧版本（不再支持Tailwind V1以上版本）。建议使用CRCMenu-CSS版本获取活跃支持。

### 项目说明
**[在线演示（点击访问）](https://www.rockaz.top/GitHub-Project-Demo/Custom-Right-Click-Menu/)**  
*注：网站服务器位于中国。*

本项目提供一个灵活的右键菜单，覆盖浏览器原生菜单功能，支持文本、链接和图片操作以及页面导航，结合现代化UI设计提升用户体验。

### 核心功能
- 屏蔽浏览器默认右键菜单，显示自定义界面  
- 上下文相关选项：文本（复制/粘贴）、链接（打开/复制）、图片（打开/复制URL）  
- 页面控制：一键刷新或跳转到指定主界面  
- 流畅CSS动画，包含悬停效果和自适应定位  
- 支持输入框交互，粘贴剪贴板内容  
- 轻量级模块化设计，便于集成  

### 功能场景说明

#### 上下文菜单显示规则
1. **无内容选中（默认状态）**  
   - 触发条件：右键点击无文本选中、链接、图片或输入框聚焦的区域  
   - 选项：返回主界面 / 刷新页面  

2. **右键点击链接**  
   - 触发条件：右键点击`<a>`标签或含URL的可点击元素  
   - 选项：在新标签页打开链接 / 复制链接地址  

3. **右键点击图片**  
   - 触发条件：右键点击`<img>`标签或含背景图片的元素  
   - 选项：在新标签页打开图片 / 复制图片URL  

4. **选中文本**  
   - 触发条件：通过鼠标拖动选中文本（`window.getSelection().toString() !== ''`）  
   - 选项：返回主界面 / 刷新页面 / 复制选中文本  

5. **输入框聚焦**  
   - 触发条件：右键时`<input>`或`<textarea>`处于聚焦状态  
   - 选项：返回主界面 / 刷新页面 / 粘贴剪贴板内容  

#### 实现原理
通过JavaScript实时检测上下文：  
- 文本选中：使用`window.getSelection()`获取内容  
- 链接检测：检查目标元素或其祖先的`<a>`标签或`onclick`事件  
- 图片检测：识别`<img>`标签或计算的`background-image`样式  
- 输入框聚焦：通过`document.activeElement`检测`<input>`或`<textarea>`  

### 文件结构

#### CRCMenu-CSS/
- **CRCMenu.html**：定义菜单结构的HTML文件  
- **CRCMenu.js**：控制菜单行为和上下文检测的JavaScript文件  
- **CRCMenu.css**：布局、动画和视觉效果的CSS文件  
- **All-Custom Right-Click-Menu.html**：内嵌CSS和JS的单文件，适合快速部署  

#### CRCMenu-Tailwind/（已停更）
- **rcm-tailwind.html**：使用Tailwind CSS类的HTML文件（已停更）  
- **rcm-tailwind.js**：Tailwind版本的JavaScript逻辑（已停更）  
- **integration-tailwind.html**：内嵌Tailwind资源的单文件（已停更）  

*注：Tailwind版本不再支持Tailwind CSS V1以上版本。建议使用CRCMenu-CSS版本进行开发和维护。*

### 快速使用

#### 下载与运行
1. **获取源代码**：  
   - 访问[GitHub仓库](https://github.com/add-qwq/Custom-Right-Click-Menu)。  
   - 点击右上角*Code*按钮，选择*Download ZIP*。  
   - 解压到本地目录。  

2. **运行菜单**：  
   - CSS版本：打开`CRCMenu.html`或`All-Custom Right-Click-Menu.html`在现代浏览器中运行。  
   - Tailwind版本：打开`rcm-tailwind.html`或`integration-tailwind.html`（注：已停更）。  
   - 在页面右键触发自定义菜单。  

#### 个性化定制
1. **CSS版本（CRCMenu-CSS/）**  
   - 修改`CRCMenu.css`调整颜色、尺寸或动画效果。  
   - 编辑`CRCMenu.js`以：  
     - 修改`backToHomeAction()`中的主界面URL。  
     - 添加或删除菜单项及其功能逻辑。  
   - 集成：在项目中链接`CRCMenu.css`和`CRCMenu.js`，或以`All-Custom Right-Click-Menu.html`为模板嵌入。  

2. **Tailwind版本（CRCMenu-Tailwind/，已停更）**  
   - 确保项目加载Tailwind CSS（V1）。  
   - 修改`rcm-tailwind.html`中的Tailwind工具类调整样式。  
   - 编辑`rcm-tailwind.js`进行功能定制，与CSS版本逻辑类似。  
   - 注：此版本不再维护，建议迁移到CSS版本以获取更新支持。  

### 兼容性说明
支持具备`navigator.clipboard` API的现代浏览器（Chrome、Firefox、Edge、Safari）。旧版浏览器提供回退机制，但部分功能（如剪贴板粘贴）可能受限。

### 许可证
本项目采用[Apache-2.0 License](LICENSE)授权。
