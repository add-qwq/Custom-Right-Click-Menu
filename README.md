# Custom Right-Click-Menu_Effect Preview
# 自定义右键单击菜单_效果预览
![Interface](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/Custom-Right-Click-Menu1.png?raw=true)  
![Interface](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/Custom-Right-Click-Menu2.png?raw=true)  
![Interface](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/Custom-Right-Click-Menu3.png?raw=true)  
![Interface](https://github.com/add-qwq/Custom-Right-Click-Menu/blob/main/Custom-Right-Click-Menu4.png?raw=true)  


# English:
# Custom Right-Click-Menu  


![GitHub license](https://img.shields.io/github/license/add-qwq/Custom-Right-Click-Menu?style=flat-square)  

This is a custom right-click menu implemented with HTML, JavaScript, and CSS. It replaces the default browser context menu with a personalized interface, supporting functions like text copying, pasting, page refreshing, and navigating back to the main interface. The menu features smooth animations, hover effects, and responsive positioning based on mouse coordinates.  


## Project Structure
### Folder Organization
- CRCMenu-CSS/: Contains the original source code described in this README, using pure CSS for styling.
- CRCMenu-Tailwind/: Provides a Tailwind CSS version, suitable for projects that already use Tailwind CSS or developers who prefer Tailwind-based styling.  


## Description  
**[Online demonstration(click to access)](https://www.rockaz.top/GitHub-Project-Demo/Custom-Right-Click-Menu/)**
*But the website server is located in China*

This project provides a customizable right-click context menu that overrides the browser's default menu. It offers practical functionalities for text manipulation and page navigation, with a focus on modern UI design and smooth user experience.  


## Key Features  
- Custom context menu that blocks the default browser right-click behavior  
- Text operations: copy selected text and paste clipboard content into inputs  
- Page control: refresh the current page with a single click  
- Navigation option to return to a specified main interface URL  
- CSS-animated interface with hover effects and adaptive positioning  


## Functional Scenarios
### Context-Dependent Menu Display Rules  
#### 1. No Content Selected (Normal State)  
Trigger: Right-click on any area without text selection or link/input focus  
Options: Go to Main Interface / Refresh Page / Paste Clipboard  

#### 2. Right-click on a Link  
Trigger: Right-click target is an <a> tag element  
Options: Open Link in New Tab / Copy Link Address  

#### 3. Text Selection Active  
Trigger: Text is selected via mouse drag (window.getSelection().toString() !== '')  
Options: Go to Main Interface / Refresh Page / Copy Selected Text / Paste Clipboard  

#### 4. Input Field Focused  
Trigger: Current focused element is <input> or <textarea> (document.activeElement.tagName.match(/INPUT|TEXTAREA/))  
Options: Go to Main Interface / Refresh Page / Paste Clipboard  

### Implementation Principle  
Detected in real-time via JavaScript:  
1. Text selection using window.getSelection() to obtain selected content  
2. Link detection via event delegation to check the tag name of the right-click target element (event.target.tagName === 'A')  
3. Input focus detection by monitoring focus events and checking the type of document.activeElement  


## File Structure  
### CRCMenu-CSS/ (Original Version)
- rcm.html       # Main HTML file (separated from CSS/JS)  
- rcm.js         # JavaScript logic for menu control  
- rcm.css        # CSS styles for layout and animations  
- integration.html # All-in-one version with embedded resources  

### CRCMenu-Tailwind/ (Tailwind Version)
- rcm-tailwind.html  # HTML with Tailwind CSS classes  
- rcm-tailwind.js    # JavaScript logic compatible with Tailwind  
- integration-tailwind.html # Embedded Tailwind version  


## Quick Start  
### Download and Use  
1. Get Source Code:  
   - Go to the [GitHub repository](https://github.com/add-qwq/Custom-Right-Click-Menu).  
   - Click the Code button (top-right), then select Download ZIP.  
   - Unzip the downloaded file to your local directory.  

2. Run the Menu:  
   - For the original CSS version: Open rcm.html or integration.html in a browser.  
   - For the Tailwind version: Open rcm-tailwind.html or integration-tailwind.html.  
   - Right-click on the page to trigger the custom menu.  


### Customization  
#### Original CSS Version (CRCMenu-CSS/)
1. Modify rcm.css to adjust colors, dimensions, or animation effects.  
2. Edit rcm.js to:  
   - Change the main interface URL in the goToMain() function.  
   - Add/remove menu items and their corresponding functions.  

#### Tailwind Version (CRCMenu-Tailwind/)
1. Ensure Tailwind CSS is loaded (already included in the HTML files).  
2. Modify HTML classes in rcm-tailwind.html to adjust styles via Tailwind utilities.  
3. Edit rcm-tailwind.js for functional customizations (similar to the original version).  


## Compatibility  
Works on modern browsers (Chrome, Firefox, Edge, Safari) that support the navigator.clipboard API. Text pasting functionality may be limited in older browsers.  


## License  
This project is licensed under the [Apache-2.0 LICENSE](LICENSE).  


---


# 中文：
# 自定义右键菜单  


![GitHub license](https://img.shields.io/github/license/add-qwq/Custom-Right-Click-Menu?style=flat-square)  

这是一个使用HTML、JavaScript和CSS开发的自定义右键菜单系统，通过个性化界面替代浏览器默认右键菜单，支持文本复制、粘贴、页面刷新和返回主界面等功能。菜单具备流畅动画效果、悬停交互和基于鼠标坐标的响应式定位。  


## 项目结构
### 文件夹说明
- CRCMenu-CSS/：包含本README介绍的原始项目源码，使用纯CSS实现样式。
- CRCMenu-Tailwind/：提供Tailwind CSS版本，适用于已使用Tailwind CSS构建的项目或偏好Tailwind样式的开发者。  


## 项目说明  
**[在线演示（点击访问）](https://www.rockaz.top/GitHub-Project-Demo/Custom-Right-Click-Menu/)**
*注：网站服务器位于中国*

本项目提供可定制的右键菜单界面，覆盖浏览器原生菜单功能。专注于实现实用的文本操作和页面导航功能，同时采用现代化UI设计提升用户体验。  


## 核心功能  
- 自定义右键菜单，屏蔽浏览器默认右键行为  
- 文本操作：复制选中内容、向输入框粘贴剪贴板文本  
- 页面控制：一键刷新当前页面  
- 导航功能：支持返回指定主界面URL  
- CSS动画界面，包含悬停效果和自适应定位  


## 功能场景说明  
### 不同上下文下的菜单显示规则  
#### 1. 无内容选中时（常规状态）  
触发条件：页面无文本选中，右键点击任意非链接/输入框区域  
显示选项：返回主界面 / 刷新当前页面 / 粘贴剪贴板内容  

#### 2. 右键点击链接时  
触发条件：鼠标右键位于<a>标签元素上  
显示选项：在新标签页打开链接 / 复制链接地址  

#### 3. 选中文本时  
触发条件：通过鼠标拖动选中页面文本（window.getSelection().toString() !== ''）  
显示选项：返回主界面 / 刷新当前页面 / 复制选中文本 / 粘贴剪贴板内容  

#### 4. 聚焦输入框时  
触发条件：当前聚焦元素为<input>或<textarea>（document.activeElement.tagName.match(/INPUT|TEXTAREA/)）  
显示选项：返回主界面 / 刷新当前页面 / 粘贴剪贴板内容  

### 实现原理  
通过JavaScript实时检测以下状态：  
1. 选中文本检测：利用window.getSelection()获取选中内容  
2. 链接检测：通过事件委托获取右键目标元素的标签名（event.target.tagName === 'A'）  
3. 输入框聚焦检测：监听focus事件并检查document.activeElement类型  


## 文件结构  
### CRCMenu-CSS/（原始版本）
- rcm.html       # 主HTML文件（与CSS/JS分离）  
- rcm.js         # 菜单逻辑控制JavaScript文件  
- rcm.css        # 布局与动画样式CSS文件  
- integration.html # 整合版本（内嵌资源的单文件）  

### CRCMenu-Tailwind/（Tailwind版本）
- rcm-tailwind.html  # 包含Tailwind CSS类的HTML文件  
- rcm-tailwind.js    # 与Tailwind兼容的JavaScript逻辑  
- integration-tailwind.html # 内嵌Tailwind资源的单文件  


## 快速使用  
### 下载与运行  
1. 获取源代码：  
   - 访问[GitHub仓库](https://github.com/add-qwq/Custom-Right-Click-Menu)。  
   - 点击页面右上角的Code按钮，选择下载ZIP。  
   - 将下载的压缩包解压到本地目录。  

2. 运行菜单：  
   - 原始CSS版本：使用浏览器打开rcm.html或integration.html。  
   - Tailwind版本：打开rcm-tailwind.html或integration-tailwind.html。  
   - 在页面中右键点击触发自定义菜单。  


### 个性化定制  
#### 原始CSS版本（CRCMenu-CSS/）
1. 修改rcm.css调整颜色、尺寸或动画效果。  
2. 编辑rcm.js：  
   - 在goToMain()函数中修改主界面跳转URL。  
   - 增删菜单项及其对应功能逻辑。  

#### Tailwind版本（CRCMenu-Tailwind/）
1. 确保Tailwind CSS已加载（HTML文件中已包含）。  
2. 通过修改rcm-tailwind.html中的HTML类名，使用Tailwind工具类调整样式。  
3. 编辑rcm-tailwind.js进行功能定制（逻辑与原始版本类似）。  


## 兼容性说明  
支持具备navigator.clipboard API的现代浏览器（Chrome、Firefox、Edge、Safari等），旧版浏览器可能存在文本粘贴功能限制。  


## 许可证  
本项目采用[Apache-2.0 LICENSE](LICENSE)授权。  
