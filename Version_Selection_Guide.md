# CRCMenu.v3 Version Selection Guide

## How to choose the most suitable version for your business?

Currently, CRCMenu.v3 has two versions: **CRCMenu.v3-A.js** and **CRCMenu.v3-B.js**.

### CRCMenu.v3-A.js:
- Up to three-level menus
- Desire to maintain clean code
- Accept unified menu style management
- No need for individual submenu control
- Basic intelligent positioning for submenus
- **Summary:** If your business has no complex requirements, you can confidently choose Version A.

### CRCMenu.v3-B.js:
- Multi-level nested menus
- Accept complex event handling in project code
- Need to independently control each submenu
- Need to independently control each menu's style
- More precise intelligent positioning for submenus
- **Summary:** If your business requires complex hierarchical control or independent menu management, choose Version B.

### Why Choose Version A:
- Possibly, you are an individual developer or part of a small team
- Possibly, the project timeline is tight and needs to go live quickly
- Possibly, fancy visual effects are not required
- Possibly, your menu structure is relatively simple

### Why Choose Version B:
- Possibly, you are developing a complex web application
- Possibly, the design requires special menu effects
- Possibly, support for very deep menu levels is needed
- Possibly, you want precise intelligent positioning for submenus

### Additional Notes:
- In theory, both A and B support unlimited levels of menu nesting, but Version B is recommended for complex control.
- One major reason for developing Version B was: **"If you want to apply a frosted glass (CSS blur effect) theme to multi-level menus, using this theme in Version A may trigger the browser's performance optimization mechanism, causing the second-level menu to lose the blur effect. Version B solves this issue by independently controlling menu styles."**

Therefore, in most practical scenarios, you can start with Version A and consider switching to Version B if you encounter problems.

---

# CRCMenu.v3 版本选择指南

## 如何选择最适合你业务的版本？

如你所见，现在 CRCMenu.v3 有 **CRCMenu.v3-A.js** 和 **CRCMenu.v3-B.js** 两个版本。

### CRCMenu.v3-A.js：
- 三级菜单以内
- 希望维护简洁的代码
- 可接受菜单样式统一管理
- 不需要单独控制子菜单
- 基础的子菜单智能定位
- **总结：** 若业务没有复杂需求，可无脑选择A版本

### CRCMenu.v3-B.js：
- 多层级嵌套菜单
- 可接受项目代码的复杂事件处理
- 需要独立控制每个子菜单
- 需要独立控制每个菜单样式
- 更加精准的子菜单智能定位
- **总结：** 若业务需要复杂层级控制或独立菜单管理，可选择B版本

### 为什么选A版本：
- 可能，你是个人开发者或小团队
- 可能，项目时间紧张，需要快速上线
- 可能，不需要花哨的视觉效果
- 可能，你的菜单结构相对简单

### 为什么选B版本：
- 可能，你正在开发复杂Web应用
- 可能，设计有要求特殊的菜单效果
- 可能，需要支持非常深的菜单层级
- 可能，你希望子菜单有精准智能定位

### 补充说明：
- A和B理论上都是支持无限层级菜单嵌套的，但是复杂控制推荐B。
- 开发B的其中一个大的原因是因为 **“如果你想要给多层级菜单使用毛玻璃（CSS的blur效果）主题的话，若在A版本套用主题，会触发浏览器的性能优化机制，导致二级菜单无法使用blur效果，而B版本通过独立控制菜单样式解决了此问题。”**

所以，实际在大多数场景下，可以先用A版本，遇到问题再考虑B版本。