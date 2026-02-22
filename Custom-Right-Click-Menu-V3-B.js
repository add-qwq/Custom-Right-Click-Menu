/**
 * 该项目为Custom-Right-Click-Menu（以下简称CRCM）的V3版本
 * 我们有信心称该项目是目前为止（具体时间以项目commits时间为准）功能最完善、最优秀的原生JS自定义右键菜单项目，无需依赖任何框架
 * 当然，许多优秀的开发者或许只是未涉足此类工具，我们仅是将这一想法转化为了可落地的解决方案
 * V2版本基于Web Components重写，支持自定义分组、动态显示/隐藏菜单项、自定义菜单项、主题定制、加载外部样式表...等新功能
 * V3版本重构了架构，是一个具备多层级嵌套菜单支持、API大幅简化、智能菜单定位，以及现代化UI与流畅动画...等多项特性的全新版本
 * 且相较于V1/V2版本，做到了零依赖、高可配、易集成，修复了多数已知问题，拓展性更高，并简化成了只需引入一个JS文件即可快速部署到你的项目中
 * 项目作者：add-qwq（https://github.com/add-qwq）
 * 特此感谢：Conard-Ferenc（https://github.com/Conard-Ferenc） ，为CRCM的V2版本提供了大体的思路设计和部分技术支持
 * 项目地址：https://github.com/add-qwq/Custom-Right-Click-Menu
 * 该项目受Apache License 2.0开源协议保护，您必须在遵守协议的前提下使用、修改和分发该项目的代码
 */

// 此文件为CRCM.V3-B.js的格式化版本，若在意加载速度，则不建议在生产环境中使用
// 此版本默认配置了第三级嵌套菜单，若不需要第三级菜单，可在注册默认菜单配置中删除sub-3（深层嵌套项）菜单项代码

class CustomRightClickMenu extends HTMLElement {
    static instance = null;
    constructor({
        theme = {},
        externalStyles = []
    } = {}) {
        if (CustomRightClickMenu.instance) {
            return CustomRightClickMenu.instance;
        }
        super();
        this.attachShadow({ mode: 'open' });
        this.isMounted = false;
        this.listenArgs = [];
        this.isOpening = false;
        this.lastContextMenuTime = 0;
        this.contextMenuX = 0;
        this.contextMenuY = 0;
        this.currentImageUrl = null;
        this.currentLinkUrl = null;
        this.selectedText = '';
        this.isMenuVisible = false;
        this.isAnimating = false;
        this.menuOpenTime = 0;
        this.focusedElementBeforeMenu = null;
        this.scrollTimer = null;
        this.hideMenuTimer = null;
        this.touchStartY = 0;
        this.target = null;
        this.menuItemsRegistry = new Map();
        this.groupsRegistry = new Map();
        this.selectorSchemas = new Map();
        // 默认主题配置（请勿直接在此处修改配置，请通过后续代码的自定义主题功能修改）
        this.theme = {
            '--menu-bg': 'rgba(255, 255, 255, 1)',
            '--menu-border': '1px solid rgba(0, 0, 0, 0.1)',
            '--menu-backdrop': 'blur(10px)',
            '--menu-shadow': '0 6px 15px -3px rgba(0, 0, 0, 0.08)',
            '--item-hover-bg': '#f3f4f6',
            '--text-color': '#6b7280',
            '--header-color': '#9ca3af',
            '--divider-color': '#e5e7eb',
            '--transition-speed': '0.1s',
            '--arrow-margin-left': 'auto',
            ...theme
        };
        this.externalStyles = externalStyles;
        this.injectGlobalStyles(externalStyles);
        this.shadowRoot.innerHTML = `
      ${this._renderExternalStyles()}
      <style>
        :host{${this._renderThemeVariables()}}
        #custom-menu {
          display: none;
          position: fixed;
          background: var(--menu-bg);
          border-radius: 12px;
          box-shadow: var(--menu-shadow);
          padding: 0.5rem 0;
          z-index: 9999;
          min-width: 180px;
          transition: all var(--transition-speed) ease-out;
          transform-origin: top left;
          opacity: 0;
          transform: scale(0.95);
          backdrop-filter: var(--menu-backdrop);
          border: var(--menu-border);
          user-select: none;
        }
        .sub-menu {
          position: fixed;
          opacity: 0;
          visibility: hidden; 
          transform: scale(0.95);
          transform-origin: top left;
          transition: opacity 0.2s ease, transform 0.2s ease;
          background: var(--menu-bg);
          border-radius: 12px;
          box-shadow: var(--menu-shadow);
          padding: 0.5rem 0;
          min-width: 180px;
          backdrop-filter: var(--menu-backdrop);
          border: var(--menu-border);
          z-index: 10000;
          pointer-events: none;
          contain: layout paint;
        }
        .sub-menu.active {
          opacity: 1;
          visibility: visible;
          transform: scale(1);
          pointer-events: auto;
        }
        .menu-item {
            display: flex;
            align-items: center;
            padding: 0.75rem 1.25rem;
            margin: 0 5px;
            cursor: pointer;
            transition: all 0.25s ease;
            color: var(--text-color);
            position: relative;
            border-radius:10px;
        }
        .menu-header {
            padding: 0.5rem 1.25rem;
            font-size: 0.875rem;
            color: var(--header-color);
            text-transform: uppercase;
            font-weight: 500;
        }
        #custom-menu.visible { opacity: 1; transform: scale(1); }
        #custom-menu.hiding { opacity: 0; transform: scale(0.95); }
        .menu-item:hover{background-color:var(--item-hover-bg);}
        .menu-item i { width: 1.5rem; margin-right: 0.75rem; color: var(--text-color); }
        .menu-item .arrow { margin-left: var(--arrow-margin-left); font-size: 10px; opacity: 0.6; margin-right: 0; width: auto; display: flex; align-items: center; justify-content: center; }        
        .menu-item .arrow svg { height: 20px; width: 10px; }
        .menu-divider { border-top: 1px solid var(--divider-color); margin: 0.25rem 0; }
      </style>
      <div id="custom-menu" part="menu"></div>
    `;
        this.customMenu = this.shadowRoot.getElementById('custom-menu');
        CustomRightClickMenu.instance = this;
    }

    injectGlobalStyles(styles) {
        styles.forEach(styleUrl => {
            const existingLink = document.querySelector(`link[href="${styleUrl}"]`);
            if (existingLink) return;
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = styleUrl;
            document.head.appendChild(link);
        });
    }
    _renderExternalStyles() {
        return this.externalStyles.map(styleUrl => `<link rel="stylesheet" href="${styleUrl}">`).join('');
    }
    _renderThemeVariables() {
        return Object.entries(this.theme).map(([key, value]) => `${key}: ${value};`).join('\n');
    }
    setTheme(newTheme) {
        if (typeof newTheme !== 'object' || newTheme === null) {
            throw new Error('主题配置必须是非空对象');
        }
        this.theme = { ...this.theme, ...newTheme };
        const hostElement = this.shadowRoot.host;
        Object.entries(this.theme).forEach(([key, value]) => {
            hostElement.style.setProperty(key, value);
        });
    }

    registerSchema({ selector = 'default', groups }) {
        if (!Array.isArray(groups)) {
            throw new Error('groups 必须是数组');
        }
        this.selectorSchemas.set(selector, groups);
    }

    unregisterSchema(selector = 'default') {
        this.selectorSchemas.delete(selector);
    }

    mount(target = window) {
        if (typeof target?.addEventListener !== 'function') {
            throw new Error('挂载目标必须是HTMLElement或Window');
        }
        if (this.isMounted && this.target === target) {
            return;
        }
        if (this.isMounted) {
            this.unmount();
        }
        this.target = target;
        this.listenArgs = [
            [target, 'contextmenu', this.handleContextMenu.bind(this), { capture: true }],
            [document, 'click', this.handleClickOutside.bind(this)],
            [document, 'wheel', this.handleScroll.bind(this), { passive: true, capture: true }],
            [document, 'touchstart', this.handleTouchStart.bind(this), { passive: true }],
            [document, 'touchmove', this.handleTouchMove.bind(this), { passive: true }],
            [document, 'keydown', this.handleKeydown.bind(this)],
            [window, 'scroll', this.handleScroll.bind(this), { passive: true }],
            [document, 'selectionchange', this.handleSelectionChange.bind(this)],
            [document, 'touchend', this.handleTouchEnd.bind(this)]
        ];
        this.listenArgs.forEach(([ele, ...args]) => ele.addEventListener(...args));
        this.isMounted = true;
    }

    unmount() {
        if (!this.isMounted || !this.target) return;
        this.listenArgs.forEach(([ele, ...args]) => ele.removeEventListener(...args));
        this.clearTimers();
        this.hideMenu();
        this.isMounted = false;
        this.target = null;
        this.listenArgs = [];
    }

    clearTimers() {
        if (this.scrollTimer) {
            clearTimeout(this.scrollTimer);
            this.scrollTimer = null;
        }
        if (this.hideMenuTimer) {
            clearTimeout(this.hideMenuTimer);
            this.hideMenuTimer = null;
        }
    }

    handleContextMenu(e) {
        e.preventDefault();
        this.focusedElementBeforeMenu = document.activeElement;
        const now = Date.now();
        const timeSinceLast = now - this.lastContextMenuTime;
        this.lastContextMenuTime = now;
        this.selectedText = window.getSelection().toString();
        this.currentLinkUrl = this.getCurrentLink(e.target);
        this.currentImageUrl = this.getCurrentImage(e.target);
        this.contextMenuX = e.clientX;
        this.contextMenuY = e.clientY;

        const contextData = {
            selectedText: this.selectedText,
            currentLinkUrl: this.currentLinkUrl,
            currentImageUrl: this.currentImageUrl,
            isInputFocused: this.focusedElementBeforeMenu &&
                (this.focusedElementBeforeMenu.tagName === 'INPUT' ||
                    this.focusedElementBeforeMenu.tagName === 'TEXTAREA' ||
                    this.focusedElementBeforeMenu.isContentEditable),
            target: this.focusedElementBeforeMenu,
            event: e
        };

        let matchedSchema = this.selectorSchemas.get('default');
        for (const [selector, schema] of this.selectorSchemas) {
            if (selector !== 'default' && e.target.closest(selector)) {
                matchedSchema = schema;
                break;
            }
        }

        this.updateMenuItemsFromSchema(matchedSchema, contextData);

        if (!this.customMenu || this.customMenu.children.length === 0) {
            this.hideMenu();
            return;
        }

        const safeMargin = 7;
        let menuWidth, menuHeight;
        const isNewOpen = !this.isMenuVisible && !this.isOpening;

        if (isNewOpen) {
            this.customMenu.style.visibility = 'hidden';
            this.customMenu.style.display = 'block';
            this.customMenu.style.transition = 'none';
            menuWidth = this.customMenu.offsetWidth;
            menuHeight = this.customMenu.offsetHeight;
            this.customMenu.style.display = 'none';
            this.customMenu.style.visibility = '';
            this.customMenu.style.transition = '';
        } else {
            const menuRect = this.customMenu.getBoundingClientRect();
            menuWidth = menuRect.width;
            menuHeight = menuRect.height;
        }

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let left = this.contextMenuX;
        if (left + menuWidth + safeMargin > viewportWidth) {
            left = Math.max(safeMargin, viewportWidth - menuWidth - safeMargin);
        }

        let top = this.contextMenuY;
        if (top + menuHeight + safeMargin > viewportHeight) {
            top = Math.max(safeMargin, viewportHeight - menuHeight - safeMargin);
        }

        left = Math.max(safeMargin, left);
        top = Math.max(safeMargin, top);

        isNewOpen ? this.showMenu(left, top) : this.moveMenu(left, top);
        this.menuOpenTime = now;
    }

    getCurrentLink(target) {
        const linkElement = target.closest('a');
        if (linkElement) return linkElement.href;
        const onclick = target.getAttribute('onclick');
        if (onclick) {
            const openMatch = onclick.match(/window\.open\(['"](.*?)['"]/i);
            if (openMatch) return openMatch[1];
            const hrefMatch = onclick.match(/location\.href\s*=\s*['"](.*?)['"]/i);
            if (hrefMatch) return hrefMatch[1];
        }
        return null;
    }
    getCurrentImage(target) {
        const imgElement = target.closest('img');
        if (imgElement) return imgElement.src;
        const style = window.getComputedStyle(target);
        const bgImage = style.getPropertyValue('background-image');
        if (bgImage && bgImage !== 'none') {
            const bgMatch = bgImage.match(/url\(["']?(.*?)["']?\)/i);
            if (bgMatch) return bgMatch[1];
        }
        return null;
    }

    _renderMenuLayer(items, parentContainer, ctx) {
        items.forEach((item) => {
            if (typeof item.context === 'function' && !item.context(ctx)) return;

            if (item.divider) {
                const divider = document.createElement('div');
                divider.className = 'menu-divider';
                parentContainer.appendChild(divider);
                return;
            }

            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.dataset.id = item.id;

            if (item.icon) {
                const icon = document.createElement('i');
                icon.className = `fa ${item.icon}`;
                menuItem.appendChild(icon);
            }

            const label = document.createElement('span');
            label.textContent = item.label;
            menuItem.appendChild(label);

            if (item.children && Array.isArray(item.children) && item.children.length > 0) {
                const arrow = document.createElement('span');
                arrow.className = 'arrow';
                arrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24"><path fill="currentColor" fill-rule="evenodd" d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"/></svg>`;
                menuItem.appendChild(arrow);

                let subMenu = null;
                let hideTimer = null;

                const handleShow = () => {
                    if (hideTimer) {
                        clearTimeout(hideTimer);
                        hideTimer = null;
                    }

                    Array.from(parentContainer.children).forEach(child => {
                        if (child.classList.contains('menu-item') && child !== menuItem) {
                            const otherSub = this.shadowRoot.querySelector(`.sub-menu[data-parent-id="${child.dataset.id}"]`);
                            if (otherSub) otherSub.remove();
                        }
                    })

                    if (!subMenu || !subMenu.isConnected) {
                        subMenu = document.createElement('div');
                        subMenu.className = 'sub-menu';
                        subMenu.setAttribute('data-parent-id', item.id);
                        this.shadowRoot.appendChild(subMenu);

                        this._renderMenuLayer(item.children, subMenu, ctx);

                        if (subMenu.childNodes.length === 0) {
                            subMenu.remove();
                            subMenu = null;
                            return;
                        }

                        const parentRect = menuItem.getBoundingClientRect();
                        subMenu.style.display = 'block';
                        subMenu.style.visibility = 'hidden';

                        const subWidth = subMenu.offsetWidth;
                        const subHeight = subMenu.offsetHeight;
                        const viewportWidth = window.innerWidth;
                        const viewportHeight = window.innerHeight;
                        const safeMargin = 6;
                        const canFitRight = parentRect.right + subWidth + safeMargin < viewportWidth;
                        const canFitLeft = parentRect.left - subWidth - safeMargin > 0;

                        let finalLeft, finalTop, origin = 'top left';

                        if (canFitRight || canFitLeft) {
                            if (canFitRight) {
                                finalLeft = parentRect.right - 3;
                                origin = 'top left';
                            } else {
                                finalLeft = parentRect.left - subWidth + 3;
                                origin = 'top right';
                            }
                            finalTop = parentRect.top - 5;
                            if (finalTop + subHeight + safeMargin > viewportHeight) {
                                finalTop = viewportHeight - subHeight - safeMargin;
                            }
                            finalTop = Math.max(safeMargin, finalTop);
                        } else {
                            finalLeft = Math.max(safeMargin, parentRect.left);
                            const canFitDown = parentRect.bottom + subHeight + safeMargin < viewportHeight;
                            if (canFitDown) {
                                finalTop = parentRect.bottom;
                                origin = 'top center';
                            } else {
                                finalTop = parentRect.top - subHeight;
                                origin = 'bottom center';
                            }
                        }

                        subMenu.style.left = `${finalLeft}px`;
                        subMenu.style.top = `${finalTop}px`;
                        subMenu.style.transformOrigin = origin;

                        subMenu.addEventListener('mouseenter', () => {
                            if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
                            subMenu.classList.add('active');

                            let p = parentContainer;
                            while (p && p.classList.contains('sub-menu')) {
                                p.classList.add('active');
                                const parentId = p.getAttribute('data-parent-id');
                                const pItem = this.shadowRoot.querySelector(`.menu-item[data-id="${parentId}"]`);
                                p = pItem ? pItem.parentElement : null;
                            }
                        });

                        subMenu.addEventListener('mouseleave', (e) => {
                            if (e.relatedTarget && (menuItem === e.relatedTarget || menuItem.contains(e.relatedTarget))) return;

                            if (subMenu) {
                                subMenu.classList.remove('active');
                                if (hideTimer) clearTimeout(hideTimer);
                                hideTimer = setTimeout(() => {
                                    if (subMenu && !subMenu.classList.contains('active')) {
                                        subMenu.remove();
                                        subMenu = null;
                                    }
                                }, 200);
                            }

                            let p = parentContainer;
                            while (p && p.classList.contains('sub-menu')) {
                                p.classList.remove('active');
                                const parentId = p.getAttribute('data-parent-id');
                                const parentItem = this.shadowRoot.querySelector(`.menu-item[data-id="${parentId}"]`);
                                p = parentItem ? parentItem.parentElement : null;
                            }
                        });
                    }

                    subMenu.style.visibility = 'visible';
                    subMenu.classList.add('active');
                };

                const handleHide = (e) => {
                    if (e.relatedTarget && subMenu && (subMenu === e.relatedTarget || subMenu.contains(e.relatedTarget))) {
                        return;
                    }
                    if (subMenu) {
                        subMenu.classList.remove('active');
                        if (hideTimer) clearTimeout(hideTimer);
                        hideTimer = setTimeout(() => {
                            if (subMenu && !subMenu.classList.contains('active')) {
                                subMenu.remove();
                                subMenu = null;
                            }
                        }, 200);
                    }
                };

                menuItem.addEventListener('mouseenter', handleShow);
                menuItem.addEventListener('mouseleave', handleHide);
            } else {
                menuItem.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (typeof item.callback === 'function') item.callback(ctx);
                    this.hideMenu();
                });
            }
            parentContainer.appendChild(menuItem);
        });
    }

    updateMenuItemsFromSchema(schemaGroups, ctx) {
        const visibleGroups = [];
        schemaGroups.forEach(group => {
            const visibleItems = group.items.filter(item =>
                typeof item.context === 'function' ? item.context(ctx) : true
            );
            if (visibleItems.length > 0) {
                visibleGroups.push({
                    id: group.id,
                    name: group.name,
                    order: group.order || 0,
                    items: visibleItems
                });
            }
        });

        visibleGroups.sort((a, b) => a.order - b.order);

        this.customMenu.innerHTML = '';
        this.shadowRoot.querySelectorAll('.sub-menu').forEach(el => el.remove());

        visibleGroups.forEach((group, index) => {
            if (index > 0) {
                const divider = document.createElement('div');
                divider.className = 'menu-divider';
                this.customMenu.appendChild(divider);
            }
            const header = document.createElement('div');
            header.className = 'menu-header';
            header.textContent = group.name;
            this.customMenu.appendChild(header);

            this._renderMenuLayer(group.items, this.customMenu, ctx);
        });

        if (visibleGroups.length === 0) this.hideMenu();
    }

    showMenu(left, top) {
        if (this.isOpening || !this.customMenu) return;
        this.isOpening = true;
        this.customMenu.style.position = 'fixed';
        this.customMenu.style.left = `${left}px`;
        this.customMenu.style.top = `${top}px`;
        this.customMenu.style.display = 'block';
        this.customMenu.classList.remove('hiding');
        requestAnimationFrame(() => {
            this.customMenu.classList.add('visible');
            setTimeout(() => {
                this.isAnimating = false;
                this.isOpening = false;
                this.isMenuVisible = true;
            }, 150);
        });
    }

    moveMenu(left, top) {
        if (!this.customMenu) return;
        const wasAnimating = this.isAnimating;
        if (!wasAnimating) this.isAnimating = true;
        requestAnimationFrame(() => {
            this.customMenu.style.left = `${left}px`;
            this.customMenu.style.top = `${top}px`;
            if (!wasAnimating) setTimeout(() => (this.isAnimating = false), 150);
        });
    }

    handleClickOutside(e) {
        const path = e.composedPath();
        const isInsideMenu = path.includes(this.customMenu) ||
            Array.from(this.shadowRoot.querySelectorAll('.sub-menu')).some(sm => path.includes(sm));
        if (this.isMenuVisible && !isInsideMenu) {
            this.hideMenu();
        }
    }

    handleScroll() {
        if (this.isMenuVisible) {
            if (this.scrollTimer) clearTimeout(this.scrollTimer);
            this.scrollTimer = setTimeout(() => this.hideMenu(), 50);
        }
    }

    handleSelectionChange() {
        const selection = window.getSelection();
        if (this.isMenuVisible && selection.toString().length > 0) {
            this.hideMenu();
        }
    }
    handleTouchEnd(e) {
        setTimeout(() => {
            const selection = window.getSelection();
            const text = selection.toString();

            if (text && text.length > 0) {
                try {
                    const range = selection.getRangeAt(0);
                    const rect = range.getBoundingClientRect();
                    const clientX = rect.left + (rect.width / 2);
                    const clientY = rect.bottom + 5;
                    const mockEvent = {
                        preventDefault: () => { },
                        clientX: clientX,
                        clientY: clientY,
                        target: selection.anchorNode.parentElement || document.body,
                        isSynthetic: true
                    };
                    this.handleContextMenu(mockEvent);
                } catch (err) {
                    console.error("CRCM: Failed to calculate selection rect", err);
                }
            }
        }, 50);
    }

    handleTouchStart(e) {
        if (this.isMenuVisible) this.touchStartY = e.touches[0].clientY;
    }
    handleTouchMove(e) {
        if (this.isMenuVisible) {
            const touchY = e.touches[0].clientY;
            if (Math.abs(touchY - this.touchStartY) > 5) this.hideMenu();
        }
    }
    handleKeydown(e) {
        if (e.key === 'Escape' && this.isMenuVisible) this.hideMenu();
    }

    hideMenu() {
        if (this.isAnimating || !this.customMenu) return;
        this.clearTimers();
        this.isAnimating = true;
        this.isOpening = false;

        this.shadowRoot.querySelectorAll('.sub-menu').forEach(sm => sm.remove());

        this.customMenu.classList.remove('visible');
        this.customMenu.classList.add('hiding');
        this.hideMenuTimer = setTimeout(() => {
            if (!this.customMenu) return;
            this.customMenu.style.display = 'none';
            this.customMenu.classList.remove('hiding');
            this.customMenu.style.left = 'auto';
            this.customMenu.style.top = 'auto';
            this.isAnimating = false;
            this.isMenuVisible = false;
            this.currentLinkUrl = null;
            this.currentImageUrl = null;
            this.selectedText = '';
            this.hideMenuTimer = null;
        }, 150);
    }
}

if (!customElements.get('custom-right-click-menu')) {
    customElements.define('custom-right-click-menu', CustomRightClickMenu);
}


// 菜单项回调函数写在下面---开始：
const copyAction = (ctx) => {
    if (ctx.selectedText) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(ctx.selectedText).catch(() => fallbackCopyText(ctx.selectedText));
        } else {
            fallbackCopyText(ctx.selectedText);
        }
    }
};
const pasteAction = (ctx) => {
    const targetElement = ctx.target;
    if (!targetElement || !(targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA' || targetElement.isContentEditable)) {
        return;
    }
    const wasFocused = document.activeElement === targetElement;
    if (!wasFocused) targetElement.focus();
    if (navigator.clipboard) {
        navigator.clipboard.readText().then((text) => {
            insertTextAtCursor(targetElement, text);
            if (!wasFocused) targetElement.blur();
        }).catch(() => fallbackPasteText(targetElement));
    } else {
        fallbackPasteText(targetElement);
    }
};
const insertTextAtCursor = (element, text) => {
    if (typeof element.execCommand === 'function') {
        document.execCommand('insertText', false, text);
    } else if (element.setRangeText) {
        const start = element.selectionStart;
        const end = element.selectionEnd;
        element.setRangeText(text, start, end, 'end');
        const pos = start + text.length;
        element.selectionStart = pos;
        element.selectionEnd = pos;
    } else if (element.createTextRange) {
        const range = element.createTextRange();
        range.collapse(true);
        range.text = text;
        range.moveStart('character', -text.length);
        range.select();
    }
};
const fallbackCopyText = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
};
const fallbackPasteText = (targetElement) => {
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    document.execCommand('paste');
    insertTextAtCursor(targetElement, textarea.value);
    document.body.removeChild(textarea);
};
const openInNewTabAction = (ctx) => {
    if (ctx.currentLinkUrl) window.open(ctx.currentLinkUrl, '_blank');
};
const copyLinkAction = (ctx) => {
    if (ctx.currentLinkUrl) {
        navigator.clipboard?.writeText(ctx.currentLinkUrl).catch(() => fallbackCopyText(ctx.currentLinkUrl));
    }
};
const backAction = () => {
    window.history.back();
};
const refreshAction = () => {
    location.reload();
};
const backToHomeAction = () => {
    window.location.href = '/';
};
const openImageInNewTabAction = (ctx) => {
    if (ctx.currentImageUrl) window.open(ctx.currentImageUrl, '_blank');
};
const copyImageUrlAction = (ctx) => {
    if (ctx.currentImageUrl) {
        navigator.clipboard?.writeText(ctx.currentImageUrl).catch(() => fallbackCopyText(ctx.currentImageUrl));
    }
};
const fullscreenModeAction = (ctx) => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
};
const copyWebsiteUrlAction = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
};
const scrollToBottomAction = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
};
const testAction = (ctx) => {
    alert('我是测试');
};
// 菜单项回调函数写在下面--结束


const createRightClickMenu = () => {
    // 自定义主题配置和外部样式
    const menu = new CustomRightClickMenu({

        //  示例，改为玻璃拟态右键菜单：
        /*theme: {
            // 对应菜单的背景
            '--menu-bg': 'rgba(255, 255, 255, 0.1)',
            // 对应菜单的边框
            '--menu-border': '1px solid rgba(255, 255, 255, 0.05)',
            // 对应backdrop-filter
            '--menu-backdrop': 'blur(10px)',
            // 对应过渡效果的时间
            '--transition-speed': '0.1s',
            // 对应菜单项 hover 背景
            '--item-hover-bg': 'rgba(255, 255, 255, 0.22)',
            // 对应菜单项文字颜色
            '--text-color': 'white',
            // 对应菜单标题文字颜色
            '--header-color': 'white',
            // 对应分隔线颜色
            '--divider-color': '#e5e7eb',
            // 对应菜单项箭头的margin-left
            //'--arrow-margin-left': '0.75rem',
        },*/

        // 外部样式（可选，FontAwesome图标库必选，但可换源）
        externalStyles: [
            //'Example.css',
            'https://s4.zstatic.net/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        ]
    });

    // 注册默认菜单配置
    menu.registerSchema({
        selector: 'default',
        groups: [
            {
                id: 'general',
                name: '常规操作',
                order: 10,
                items: [
                    {
                        id: 'back',
                        label: '返回',
                        icon: 'fa-arrow-left',
                        callback: backAction, context: () => true
                    },
                    {
                        id: 'refresh',
                        label: '刷新',
                        icon: 'fa-refresh',
                        callback: refreshAction, context: () => true
                    }
                ]
            },
            {
                id: 'edit',
                name: '编辑操作',
                order: 20,
                items: [
                    {
                        id: 'copy',
                        label: '复制',
                        icon: 'fa-copy',
                        callback: copyAction,
                        context: (ctx) => ctx.selectedText.trim().length > 0 || ctx.isInputFocused
                    },
                    {
                        id: 'paste',
                        label: '粘贴',
                        icon: 'fa-paste',
                        callback: pasteAction,
                        context: (ctx) => ctx.isInputFocused && (ctx.target.tagName === 'INPUT' || ctx.target.tagName === 'TEXTAREA' || ctx.target.isContentEditable)
                    }
                ]
            },
            {
                id: 'link',
                name: '链接操作',
                order: 30,
                items: [
                    {
                        id: 'open-in-new-tab',
                        label: '在新标签页打开',
                        icon: 'fa-external-link',
                        callback: openInNewTabAction,
                        context: (ctx) => !!ctx.currentLinkUrl && !ctx.currentLinkUrl.startsWith('javascript:')
                    },
                    {
                        id: 'copy-link',
                        label: '复制链接地址',
                        icon: 'fa-link',
                        callback: copyLinkAction,
                        context: (ctx) => !!ctx.currentLinkUrl && !ctx.currentLinkUrl.startsWith('javascript:')
                    }
                ]
            },
            {
                id: 'image',
                name: '图片操作',
                order: 40,
                items: [
                    {
                        id: 'open-image-in-new-tab',
                        label: '在新标签页打开',
                        icon: 'fa-external-link',
                        callback: openImageInNewTabAction,
                        context: (ctx) => !!ctx.currentImageUrl && !ctx.currentImageUrl.startsWith('data:')
                    },
                    {
                        id: 'copy-image-link',
                        label: '复制图片地址',
                        icon: 'fa-link',
                        callback: copyImageUrlAction,
                        context: (ctx) => !!ctx.currentImageUrl && !ctx.currentImageUrl.startsWith('data:')
                    }
                ]
            },
            {
                id: 'other',
                name: '其他操作',
                order: 50,
                items: [
                    {
                        id: 'more',
                        label: '更多功能',
                        icon: 'fa-ellipsis-h',
                        // 多级嵌套子菜单
                        children: [
                            {
                                id: 'sub-1',
                                label: '复制当前链接',
                                icon: 'fa-globe',
                                callback: () => copyWebsiteUrlAction(window.location.href)
                            },
                            {
                                id: 'sub-2',
                                label: '全屏模式开关',
                                icon: 'fa-expand-arrows-alt',
                                callback: fullscreenModeAction
                            },
                            {
                                id: 'sub-3',
                                label: '滚动到最底部',
                                icon: 'fa-arrow-down',
                                callback: () => scrollToBottomAction()
                            },
                            {
                                id: 'sub-3',
                                label: '深层嵌套项',
                                icon: 'fa-layer-group',
                                children: [
                                    {
                                        id: 'deep-1',
                                        label: '三级菜单项-1',
                                        icon: 'fa-file-alt',
                                        callback: () => alert('来自三级菜单项-1的示例文本')
                                    },
                                    {
                                        id: 'deep-2',
                                        label: '三级菜单项-2',
                                        icon: 'fa-file-alt',
                                        callback: () => alert('来自三级菜单项-2的示例文本')
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'back-to-home',
                        label: '返回主页',
                        icon: 'fa-home',
                        callback: backToHomeAction,
                        context: () => true
                    }
                ]
            }
        ]
    });

    if (!document.body.contains(menu)) {
        document.body.appendChild(menu);
    }
    menu.mount();
    return menu;
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createRightClickMenu);
} else {
    createRightClickMenu();
}