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

// 此文件为CRCM.V3-B.js的压缩格式版本，若在意加载速度，则可在生产环境中使用
// 此版本默认只配置了第二级嵌套菜单，若需要更多级菜单，可在注册默认菜单配置中 添加菜单项/取消注释 以启用更多嵌套菜单项代码
// 以下代码仅为压缩格式后的代码，不建议直接修改，如需查看/修改，请查看Custom-Right-Click-Menu-V3-B.js

class CustomRightClickMenu extends HTMLElement{static instance=null;constructor({theme:e={},externalStyles:t=[]}={}){if(CustomRightClickMenu.instance)return CustomRightClickMenu.instance;super(),this.attachShadow({mode:"open"}),this.isMounted=!1,this.listenArgs=[],this.isOpening=!1,this.lastContextMenuTime=0,this.contextMenuX=0,this.contextMenuY=0,this.currentImageUrl=null,this.currentLinkUrl=null,this.selectedText="",this.isMenuVisible=!1,this.isAnimating=!1,this.menuOpenTime=0,this.focusedElementBeforeMenu=null,this.scrollTimer=null,this.touchStartY=0,this.target=null,this.menuItemsRegistry=new Map,this.groupsRegistry=new Map,this.selectorSchemas=new Map,this.theme={"--menu-bg":"rgba(255, 255, 255, 1)","--menu-border":"1px solid rgba(0, 0, 0, 0.1)","--menu-backdrop":"blur(10px)","--menu-shadow":"0 6px 15px -3px rgba(0, 0, 0, 0.08)","--item-hover-bg":"#f3f4f6","--text-color":"#6b7280","--header-color":"#9ca3af","--divider-color":"#e5e7eb","--transition-speed":"0.1s","--arrow-margin-left":"auto",...e},this.externalStyles=t,this.injectGlobalStyles(t),this.shadowRoot.innerHTML=`\n      ${this._renderExternalStyles()}\n      <style>\n        :host{${this._renderThemeVariables()}}\n        #custom-menu {\n          display: none;\n          position: fixed;\n          background: var(--menu-bg);\n          border-radius: 12px;\n          box-shadow: var(--menu-shadow);\n          padding: 0.5rem 0;\n          z-index: 9999;\n          min-width: 180px;\n          transition: all var(--transition-speed) ease-out;\n          transform-origin: top left;\n          opacity: 0;\n          transform: scale(0.95);\n          backdrop-filter: var(--menu-backdrop);\n          border: var(--menu-border);\n          user-select: none;\n        }\n        .sub-menu {\n          position: fixed;\n          opacity: 0;\n          visibility: hidden; \n          transform: scale(0.95);\n          transform-origin: top left;\n          transition: opacity 0.2s ease, transform 0.2s ease;\n          background: var(--menu-bg);\n          border-radius: 12px;\n          box-shadow: var(--menu-shadow);\n          padding: 0.5rem 0;\n          min-width: 180px;\n          backdrop-filter: var(--menu-backdrop);\n          border: var(--menu-border);\n          z-index: 10000;\n          pointer-events: none;\n          contain: layout paint;\n        }\n        .sub-menu.active {\n          opacity: 1;\n          visibility: visible;\n          transform: scale(1);\n          pointer-events: auto;\n        }\n        .menu-item {\n            display: flex;\n            align-items: center;\n            padding: 0.75rem 1.25rem;\n            margin: 0 5px;\n            cursor: pointer;\n            transition: all 0.2s ease;\n            color: var(--text-color);\n            position: relative;\n        }\n        .menu-header {\n            padding: 0.5rem 1.25rem;\n            font-size: 0.875rem;\n            color: var(--header-color);\n            text-transform: uppercase;\n            font-weight: 500;\n        }\n        #custom-menu.visible { opacity: 1; transform: scale(1); }\n        #custom-menu.hiding { opacity: 0; transform: scale(0.95); }\n        .menu-item:hover{background-color:var(--item-hover-bg);border-radius:10px;}\n        .menu-item i { width: 1.5rem; margin-right: 0.75rem; color: var(--text-color); }\n        .menu-item .arrow { margin-left: var(--arrow-margin-left); font-size: 10px; opacity: 0.6; margin-right: 0; width: auto; display: flex; align-items: center; justify-content: center; }        \n        .menu-item .arrow svg { height: 20px; width: 10px; }\n        .menu-divider { border-top: 1px solid var(--divider-color); margin: 0.25rem 0; }\n      </style>\n      <div id="custom-menu" part="menu"></div>\n    `,this.customMenu=this.shadowRoot.getElementById("custom-menu"),CustomRightClickMenu.instance=this}injectGlobalStyles(e){e.forEach((e=>{if(document.querySelector(`link[href="${e}"]`))return;const t=document.createElement("link");t.rel="stylesheet",t.href=e,document.head.appendChild(t)}))}_renderExternalStyles(){return this.externalStyles.map((e=>`<link rel="stylesheet" href="${e}">`)).join("")}_renderThemeVariables(){return Object.entries(this.theme).map((([e,t])=>`${e}: ${t};`)).join("\n")}setTheme(e){if("object"!=typeof e||null===e)throw new Error("主题配置必须是非空对象");this.theme={...this.theme,...e};const t=this.shadowRoot.host;Object.entries(this.theme).forEach((([e,n])=>{t.style.setProperty(e,n)}))}registerSchema({selector:e="default",groups:t}){if(!Array.isArray(t))throw new Error("groups 必须是数组");this.selectorSchemas.set(e,t)}unregisterSchema(e="default"){this.selectorSchemas.delete(e)}mount(e=window){if("function"!=typeof e?.addEventListener)throw new Error("挂载目标必须是HTMLElement或Window");this.isMounted&&this.target===e||(this.isMounted&&this.unmount(),this.target=e,this.listenArgs=[[e,"contextmenu",this.handleContextMenu.bind(this),{capture:!0}],[document,"click",this.handleClickOutside.bind(this)],[document,"wheel",this.handleScroll.bind(this),{passive:!0,capture:!0}],[document,"touchstart",this.handleTouchStart.bind(this),{passive:!0}],[document,"touchmove",this.handleTouchMove.bind(this),{passive:!0}],[document,"keydown",this.handleKeydown.bind(this)],[window,"scroll",this.handleScroll.bind(this),{passive:!0}]],this.listenArgs.forEach((([e,...t])=>e.addEventListener(...t))),this.isMounted=!0)}unmount(){this.isMounted&&this.target&&(this.listenArgs.forEach((([e,...t])=>e.removeEventListener(...t))),this.target=null,this.isMounted=!1,this.listenArgs=[],this.hideMenu())}handleContextMenu(e){e.preventDefault(),this.focusedElementBeforeMenu=document.activeElement;const t=Date.now();this.lastContextMenuTime;this.lastContextMenuTime=t,this.selectedText=window.getSelection().toString(),this.currentLinkUrl=this.getCurrentLink(e.target),this.currentImageUrl=this.getCurrentImage(e.target),this.contextMenuX=e.clientX,this.contextMenuY=e.clientY;const n={selectedText:this.selectedText,currentLinkUrl:this.currentLinkUrl,currentImageUrl:this.currentImageUrl,isInputFocused:this.focusedElementBeforeMenu&&("INPUT"===this.focusedElementBeforeMenu.tagName||"TEXTAREA"===this.focusedElementBeforeMenu.tagName||this.focusedElementBeforeMenu.isContentEditable),target:this.focusedElementBeforeMenu,event:e};let i=this.selectorSchemas.get("default");for(const[t,n]of this.selectorSchemas)if("default"!==t&&e.target.closest(t)){i=n;break}if(this.updateMenuItemsFromSchema(i,n),!this.customMenu||0===this.customMenu.children.length)return void this.hideMenu();let s,o;const r=!this.isMenuVisible&&!this.isOpening;if(r)this.customMenu.style.visibility="hidden",this.customMenu.style.display="block",this.customMenu.style.transition="none",s=this.customMenu.offsetWidth,o=this.customMenu.offsetHeight,this.customMenu.style.display="none",this.customMenu.style.visibility="",this.customMenu.style.transition="";else{const e=this.customMenu.getBoundingClientRect();s=e.width,o=e.height}const a=window.innerWidth,l=window.innerHeight;let u=this.contextMenuX;u+s+7>a&&(u=Math.max(7,a-s-7));let c=this.contextMenuY;c+o+7>l&&(c=Math.max(7,l-o-7)),u=Math.max(7,u),c=Math.max(7,c),r?this.showMenu(u,c):this.moveMenu(u,c),this.menuOpenTime=t}getCurrentLink(e){const t=e.closest("a");if(t)return t.href;const n=e.getAttribute("onclick");if(n){const e=n.match(/window\.open\(['"](.*?)['"]/i);if(e)return e[1];const t=n.match(/location\.href\s*=\s*['"](.*?)['"]/i);if(t)return t[1]}return null}getCurrentImage(e){const t=e.closest("img");if(t)return t.src;const n=window.getComputedStyle(e).getPropertyValue("background-image");if(n&&"none"!==n){const e=n.match(/url\(["']?(.*?)["']?\)/i);if(e)return e[1]}return null}_renderMenuLayer(e,t,n){e.forEach((e=>{if("function"==typeof e.context&&!e.context(n))return;if(e.divider){const e=document.createElement("div");return e.className="menu-divider",void t.appendChild(e)}const i=document.createElement("div");if(i.className="menu-item",i.dataset.id=e.id,e.icon){const t=document.createElement("i");t.className=`fa ${e.icon}`,i.appendChild(t)}const s=document.createElement("span");if(s.textContent=e.label,i.appendChild(s),e.children&&Array.isArray(e.children)&&e.children.length>0){const s=document.createElement("span");s.className="arrow",s.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24"><path fill="currentColor" fill-rule="evenodd" d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"/></svg>',i.appendChild(s);let o=null,r=null;const a=()=>{if(r&&(clearTimeout(r),r=null),Array.from(t.children).forEach((e=>{if(e.classList.contains("menu-item")&&e!==i){const t=this.shadowRoot.querySelector(`.sub-menu[data-parent-id="${e.dataset.id}"]`);t&&t.remove()}})),!o||!o.isConnected){if(o=document.createElement("div"),o.className="sub-menu",o.setAttribute("data-parent-id",e.id),this.shadowRoot.appendChild(o),this._renderMenuLayer(e.children,o,n),0===o.childNodes.length)return o.remove(),void(o=null);const s=i.getBoundingClientRect();o.style.display="block",o.style.visibility="hidden";const a=o.offsetWidth,l=o.offsetHeight,u=window.innerWidth,c=window.innerHeight,h=6,m=s.right+a+h<u,d=s.left-a-h>0;let p,g,f="top left";if(m||d)m?(p=s.right-3,f="top left"):(p=s.left-a+3,f="top right"),g=s.top-5,g+l+h>c&&(g=c-l-h),g=Math.max(h,g);else{p=Math.max(h,s.left);s.bottom+l+h<c?(g=s.bottom,f="top center"):(g=s.top-l,f="bottom center")}o.style.left=`${p}px`,o.style.top=`${g}px`,o.style.transformOrigin=f,o.addEventListener("mouseenter",(()=>{r&&(clearTimeout(r),r=null),o.classList.add("active");let e=t;for(;e&&e.classList.contains("sub-menu");){e.classList.add("active");const t=e.getAttribute("data-parent-id"),n=this.shadowRoot.querySelector(`.menu-item[data-id="${t}"]`);e=n?n.parentElement:null}})),o.addEventListener("mouseleave",(e=>{if(e.relatedTarget&&(i===e.relatedTarget||i.contains(e.relatedTarget)))return;o&&(o.classList.remove("active"),r&&clearTimeout(r),r=setTimeout((()=>{o&&!o.classList.contains("active")&&(o.remove(),o=null)}),200));let n=t;for(;n&&n.classList.contains("sub-menu");){n.classList.remove("active");const e=n.getAttribute("data-parent-id"),t=this.shadowRoot.querySelector(`.menu-item[data-id="${e}"]`);n=t?t.parentElement:null}}))}o.style.visibility="visible",o.classList.add("active")},l=e=>{e.relatedTarget&&o&&(o===e.relatedTarget||o.contains(e.relatedTarget))||o&&(o.classList.remove("active"),r&&clearTimeout(r),r=setTimeout((()=>{o&&!o.classList.contains("active")&&(o.remove(),o=null)}),200))};i.addEventListener("mouseenter",a),i.addEventListener("mouseleave",l)}else i.addEventListener("click",(t=>{t.stopPropagation(),"function"==typeof e.callback&&e.callback(n),this.hideMenu()}));t.appendChild(i)}))}updateMenuItemsFromSchema(e,t){const n=[];e.forEach((e=>{const i=e.items.filter((e=>"function"!=typeof e.context||e.context(t)));i.length>0&&n.push({id:e.id,name:e.name,order:e.order||0,items:i})})),n.sort(((e,t)=>e.order-t.order)),this.customMenu.innerHTML="",this.shadowRoot.querySelectorAll(".sub-menu").forEach((e=>e.remove())),n.forEach(((e,n)=>{if(n>0){const e=document.createElement("div");e.className="menu-divider",this.customMenu.appendChild(e)}const i=document.createElement("div");i.className="menu-header",i.textContent=e.name,this.customMenu.appendChild(i),this._renderMenuLayer(e.items,this.customMenu,t)})),0===n.length&&this.hideMenu()}showMenu(e,t){!this.isOpening&&this.customMenu&&(this.isOpening=!0,this.customMenu.style.position="fixed",this.customMenu.style.left=`${e}px`,this.customMenu.style.top=`${t}px`,this.customMenu.style.display="block",this.customMenu.classList.remove("hiding"),requestAnimationFrame((()=>{this.customMenu.classList.add("visible"),setTimeout((()=>{this.isAnimating=!1,this.isOpening=!1,this.isMenuVisible=!0}),150)})))}moveMenu(e,t){if(!this.customMenu)return;const n=this.isAnimating;n||(this.isAnimating=!0),requestAnimationFrame((()=>{this.customMenu.style.left=`${e}px`,this.customMenu.style.top=`${t}px`,n||setTimeout((()=>this.isAnimating=!1),150)}))}handleClickOutside(e){const t=e.composedPath(),n=t.includes(this.customMenu)||Array.from(this.shadowRoot.querySelectorAll(".sub-menu")).some((e=>t.includes(e)));this.isMenuVisible&&!n&&this.hideMenu()}handleScroll(){this.isMenuVisible&&(this.scrollTimer&&clearTimeout(this.scrollTimer),this.scrollTimer=setTimeout((()=>this.hideMenu()),50))}handleTouchStart(e){this.isMenuVisible&&(this.touchStartY=e.touches[0].clientY)}handleTouchMove(e){if(this.isMenuVisible){const t=e.touches[0].clientY;Math.abs(t-this.touchStartY)>5&&this.hideMenu()}}handleKeydown(e){"Escape"===e.key&&this.isMenuVisible&&this.hideMenu()}hideMenu(){!this.isAnimating&&this.customMenu&&(this.isAnimating=!0,this.isOpening=!1,this.shadowRoot.querySelectorAll(".sub-menu").forEach((e=>e.remove())),this.customMenu.classList.remove("visible"),this.customMenu.classList.add("hiding"),setTimeout((()=>{this.customMenu.style.display="none",this.customMenu.classList.remove("hiding"),this.customMenu.style.left="auto",this.customMenu.style.top="auto",this.isAnimating=!1,this.isMenuVisible=!1,this.currentLinkUrl=null,this.currentImageUrl=null,this.selectedText=""}),150))}}customElements.get("custom-right-click-menu")||customElements.define("custom-right-click-menu",CustomRightClickMenu);

// 菜单项回调函数写在下面---开始：
const copyAction=e=>{e.selectedText&&(navigator.clipboard?navigator.clipboard.writeText(e.selectedText).catch((()=>fallbackCopyText(e.selectedText))):fallbackCopyText(e.selectedText))},pasteAction=e=>{const t=e.target;if(!t||"INPUT"!==t.tagName&&"TEXTAREA"!==t.tagName&&!t.isContentEditable)return;const o=document.activeElement===t;o||t.focus(),navigator.clipboard?navigator.clipboard.readText().then((e=>{insertTextAtCursor(t,e),o||t.blur()})).catch((()=>fallbackPasteText(t))):fallbackPasteText(t)},insertTextAtCursor=(e,t)=>{if("function"==typeof e.execCommand)document.execCommand("insertText",!1,t);else if(e.setRangeText){const o=e.selectionStart,c=e.selectionEnd;e.setRangeText(t,o,c,"end");const n=o+t.length;e.selectionStart=n,e.selectionEnd=n}else if(e.createTextRange){const o=e.createTextRange();o.collapse(!0),o.text=t,o.moveStart("character",-t.length),o.select()}},fallbackCopyText=e=>{const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)},fallbackPasteText=e=>{const t=document.createElement("textarea");t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),document.execCommand("paste"),insertTextAtCursor(e,t.value),document.body.removeChild(t)},openInNewTabAction=e=>{e.currentLinkUrl&&window.open(e.currentLinkUrl,"_blank")},copyLinkAction=e=>{e.currentLinkUrl&&navigator.clipboard?.writeText(e.currentLinkUrl).catch((()=>fallbackCopyText(e.currentLinkUrl)))},backAction=()=>{window.history.back()},refreshAction=()=>{location.reload()},backToHomeAction=()=>{window.location.href="/"},openImageInNewTabAction=e=>{e.currentImageUrl&&window.open(e.currentImageUrl,"_blank")},copyImageUrlAction=e=>{e.currentImageUrl&&navigator.clipboard?.writeText(e.currentImageUrl).catch((()=>fallbackCopyText(e.currentImageUrl)))},fullscreenModeAction=e=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()},copyWebsiteUrlAction=e=>{const t=document.createElement("textarea");t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)},scrollToBottomAction=()=>{window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})},testAction=e=>{alert("我是测试")};
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
                            }/*,
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
                            }*/
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
