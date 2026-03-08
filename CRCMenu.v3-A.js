/*
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

// 此文件为Custom-Right-Click-Menu-V3-A.js的压缩格式版本，若在意加载速度，则可在生产环境中使用
// 此版本默认只配置了第二级嵌套菜单，若需要更多级菜单，可在注册默认菜单配置中 添加菜单项/取消注释 以启用更多嵌套菜单项代码
// 以下代码仅为压缩格式后的代码，不建议直接修改，如需查看/修改，请查看Custom-Right-Click-Menu-V3-A.js

class CustomRightClickMenu extends HTMLElement{static instance=null;constructor({theme:e={},externalStyles:t=[]}={}){if(CustomRightClickMenu.instance)return CustomRightClickMenu.instance;super(),this.attachShadow({mode:"open"}),this.isMounted=!1,this.listenArgs=[],this.isOpening=!1,this.lastContextMenuTime=0,this.contextMenuX=0,this.contextMenuY=0,this.currentImageUrl=null,this.currentLinkUrl=null,this.selectedText="",this.isMenuVisible=!1,this.isAnimating=!1,this.menuOpenTime=0,this.focusedElementBeforeMenu=null,this.scrollTimer=null,this.hideMenuTimer=null,this.touchStartY=0,this.target=null,this.menuItemsRegistry=new Map,this.groupsRegistry=new Map,this.selectorSchemas=new Map,this.theme={"--menu-bg":"rgba(255, 255, 255, 1)","--menu-border":"1px solid rgba(0, 0, 0, 0.1)","--menu-backdrop":"blur(10px)","--menu-shadow":"0 6px 15px -3px rgba(0, 0, 0, 0.08)","--item-hover-bg":"#f3f4f6","--item-transition-speed":"0.2s","--text-color":"#6b7280","--header-color":"#9ca3af","--divider-color":"#e5e7eb","--transition-speed":"0.1s","--arrow-margin-left":"auto","--menu-line-height":"1.4",...e},this.externalStyles=t,this.injectGlobalStyles(t),this.shadowRoot.innerHTML=`\n      ${this._renderExternalStyles()}\n      <style>\n        :host{${this._renderThemeVariables()}}\n        #custom-menu {\n          display: none;\n          position: fixed;\n          background: var(--menu-bg);\n          border-radius: 12px;\n          box-shadow: var(--menu-shadow);\n          padding: 0.5rem 0;\n          z-index: 9999;\n          min-width: 180px;\n          transition: all var(--transition-speed) ease-out;\n          transform-origin: top left;\n          opacity: 0;\n          transform: scale(0.95) translateZ(0);\n          will-change: transform, opacity;\n          backface-visibility: hidden;\n          backdrop-filter: var(--menu-backdrop);\n          border: var(--menu-border);\n          user-select: none;\n          line-height: var(--menu-line-height);\n        }\n        .sub-menu {\n          position: absolute;\n          opacity: 0;\n          visibility: hidden; \n          transform: scale(0.95) translateZ(0);\n          transform-origin: top left;\n          transition: opacity 0.2s ease, transform 0.2s ease;\n          will-change: transform, opacity;\n          backface-visibility: hidden;\n          background: var(--menu-bg);\n          border-radius: 12px;\n          box-shadow: var(--menu-shadow);\n          padding: 0.5rem 0;\n          min-width: 180px;\n          backdrop-filter: var(--menu-backdrop);\n          border: var(--menu-border);\n          z-index: 10000;\n          top: -5px;\n          left: calc(100% - 4px);\n          box-sizing: border-box;\n          line-height: var(--menu-line-height);\n          user-select: none;\n        }\n        .menu-item {\n            display: flex;\n            align-items: center;\n            padding: 0.75rem 1.25rem;\n            margin: 0 5px;\n            cursor: pointer;\n            transition: all 0.25s ease;\n            color: var(--text-color);\n            position: relative;\n            white-space: nowrap;\n            border-radius: 10px;\n            z-index: 1;\n        }\n        .menu-item:hover,\n        .menu-item.expanded {\n            z-index: 25;\n        }\n        .menu-item::before {\n            content: '';\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            background-color: var(--item-hover-bg);\n            border-radius: 10px;\n            z-index: -1;\n            transform: scale(0.9);\n            opacity: 0;\n            transition: transform var(--item-transition-speed) ease, opacity var(--item-transition-speed) ease;\n        }\n        .menu-item:hover::before {\n            transform: scale(1);\n            opacity: 1;\n        }\n        .menu-item:active::before {\n            transform: scale(0.94);\n            opacity: 1;\n        }\n        .menu-header {\n            padding: 0.5rem 1.25rem;\n            font-size: 0.875rem;\n            color: var(--header-color);\n            text-transform: uppercase;\n            font-weight: 500;\n        }\n        #custom-menu.visible { opacity: 1; transform: scale(1) translateZ(0); }\n        #custom-menu.hiding { opacity: 0; transform: scale(0.95) translateZ(0); }\n        .menu-item:hover > .sub-menu{opacity:1;visibility:visible;transform:scale(1) translateZ(0);}\n        .menu-item .menu-icon{width:1.5rem;margin-right:0.75rem;color:var(--text-color);display:flex;align-items:center;justify-content:center;flex-shrink:0;transform:translateZ(0);backface-visibility:hidden;}\n        .menu-item .menu-icon i { width: 100%; text-align: center; }\n        .menu-item .menu-icon svg{width:1.25rem;height:1.1rem;fill:currentColor;object-fit:contain;will-change:transform;}\n        .menu-item .arrow { margin-left: var(--arrow-margin-left); margin-right: 0; font-size: 10px; opacity: 0.6; width: auto; display: flex; align-items: center; justify-content: center; }\n        .menu-item .arrow svg { height: 20px; width: 10px; }\n        .menu-divider { border-top: 1px solid var(--divider-color); margin: 0.25rem 0; }\n      </style>\n      <div id="custom-menu" part="menu"></div>\n    `,this.customMenu=this.shadowRoot.getElementById("custom-menu"),CustomRightClickMenu.instance=this}injectGlobalStyles(e){e.forEach((e=>{if(document.querySelector(`link[href="${e}"]`))return;const t=document.createElement("link");t.rel="stylesheet",t.href=e,document.head.appendChild(t)}))}_renderExternalStyles(){return this.externalStyles.map((e=>`<link rel="stylesheet" href="${e}">`)).join("")}_renderThemeVariables(){return Object.entries(this.theme).map((([e,t])=>`${e}: ${t};`)).join("\n")}setTheme(e){if("object"!=typeof e||null===e)throw new Error("主题配置必须是非空对象");this.theme={...this.theme,...e};const t=this.shadowRoot.host;Object.entries(this.theme).forEach((([e,n])=>{t.style.setProperty(e,n)}))}registerSchema({selector:e="default",groups:t}){if(!Array.isArray(t))throw new Error("groups 必须是数组");this.selectorSchemas.set(e,t)}unregisterSchema(e="default"){this.selectorSchemas.delete(e)}mount(e=window){if("function"!=typeof e?.addEventListener)throw new Error("挂载目标必须是HTMLElement或Window");this.isMounted&&this.target===e||(this.isMounted&&this.unmount(),this.target=e,this.listenArgs=[[e,"contextmenu",this.handleContextMenu.bind(this),{capture:!0}],[document,"click",this.handleClickOutside.bind(this)],[document,"wheel",this.handleScroll.bind(this),{passive:!0,capture:!0}],[document,"touchstart",this.handleTouchStart.bind(this),{passive:!0}],[document,"touchmove",this.handleTouchMove.bind(this),{passive:!0}],[document,"keydown",this.handleKeydown.bind(this)],[window,"scroll",this.handleScroll.bind(this),{passive:!0}],[document,"selectionchange",this.handleSelectionChange.bind(this)],[document,"touchend",this.handleTouchEnd.bind(this)]],this.listenArgs.forEach((([e,...t])=>e.addEventListener(...t))),this.isMounted=!0)}unmount(){this.isMounted&&this.target&&(this.listenArgs.forEach((([e,...t])=>e.removeEventListener(...t))),this.clearTimers(),this.hideMenu(),this.isMounted=!1,this.target=null,this.listenArgs=[])}clearTimers(){this.scrollTimer&&(clearTimeout(this.scrollTimer),this.scrollTimer=null),this.hideMenuTimer&&(clearTimeout(this.hideMenuTimer),this.hideMenuTimer=null)}handleContextMenu(e){e.preventDefault(),this.focusedElementBeforeMenu=document.activeElement;const t=Date.now();this.lastContextMenuTime;this.lastContextMenuTime=t,this.selectedText=window.getSelection().toString(),this.currentLinkUrl=this.getCurrentLink(e.target),this.currentImageUrl=this.getCurrentImage(e.target),this.contextMenuX=e.clientX,this.contextMenuY=e.clientY;const n={selectedText:this.selectedText,currentLinkUrl:this.currentLinkUrl,currentImageUrl:this.currentImageUrl,isInputFocused:this.focusedElementBeforeMenu&&("INPUT"===this.focusedElementBeforeMenu.tagName||"TEXTAREA"===this.focusedElementBeforeMenu.tagName||this.focusedElementBeforeMenu.isContentEditable),target:this.focusedElementBeforeMenu,event:e};let i=this.selectorSchemas.get("default");for(const[t,n]of this.selectorSchemas)if("default"!==t&&e.target.closest(t)){i=n;break}if(this.updateMenuItemsFromSchema(i,n),!this.customMenu||0===this.customMenu.children.length)return void this.hideMenu();let s,o;const r=!this.isMenuVisible&&!this.isOpening;if(r)this.customMenu.style.visibility="hidden",this.customMenu.style.display="block",this.customMenu.style.transition="none",s=this.customMenu.offsetWidth,o=this.customMenu.offsetHeight,this.customMenu.style.display="none",this.customMenu.style.visibility="",this.customMenu.style.transition="";else{const e=this.customMenu.getBoundingClientRect();s=e.width,o=e.height}const l=window.innerWidth,a=window.innerHeight;let h=this.contextMenuX;h+s+7>l&&(h=Math.max(7,l-s-7));let c=this.contextMenuY;c+o+7>a&&(c=Math.max(7,a-o-7)),h=Math.max(7,h),c=Math.max(7,c),r?this.showMenu(h,c):this.moveMenu(h,c),this.menuOpenTime=t}getCurrentLink(e){const t=e.closest("a");if(t)return t.href;const n=e.getAttribute("onclick");if(n){const e=n.match(/window\.open\(['"](.*?)['"]/i);if(e)return e[1];const t=n.match(/location\.href\s*=\s*['"](.*?)['"]/i);if(t)return t[1]}return null}getCurrentImage(e){const t=e.closest("img");if(t)return t.src;const n=window.getComputedStyle(e).getPropertyValue("background-image");if(n&&"none"!==n){const e=n.match(/url\(["']?(.*?)["']?\)/i);if(e)return e[1]}return null}_renderMenuLayer(e,t,n){e.forEach((e=>{if("function"==typeof e.context&&!e.context(n))return;if(e.divider){const e=document.createElement("div");return e.className="menu-divider",void t.appendChild(e)}const i=document.createElement("div");if(i.className="menu-item",i.dataset.id=e.id,e.icon){const t=document.createElement("div");if(t.className="menu-icon",e.icon.trim().startsWith("<svg"))t.innerHTML=e.icon;else{const n=document.createElement("i");n.className=`fa ${e.icon}`,t.appendChild(n)}i.appendChild(t)}const s=document.createElement("span");if(s.textContent=e.label,i.appendChild(s),i.addEventListener("mouseenter",(()=>{t.querySelectorAll(".menu-item").forEach((e=>{if(e!==i){const t=e.querySelector(".sub-menu");t&&(t.style.visibility="hidden")}}))})),e.children&&Array.isArray(e.children)&&e.children.length>0){const t=document.createElement("span");t.className="arrow",t.innerHTML='\n                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24"><path fill="currentColor" fill-rule="evenodd" d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"/></svg>\n                ',i.appendChild(t);const s=document.createElement("div");s.className="sub-menu",this._renderMenuLayer(e.children,s,n),s.childNodes.length>0&&(i.appendChild(s),i.addEventListener("mouseenter",(()=>{s.style.visibility="visible",s.style.left="calc(100% - 4px)",s.style.right="auto",s.style.top="-5px",s.style.bottom="auto",s.style.maxHeight="";const e=i.getBoundingClientRect(),t=window.innerHeight,n=window.innerWidth,o=s.offsetHeight,r=s.offsetWidth,l=e.right+r+6<n,a=e.left-r-6>0;if(l)s.style.left="calc(100% - 3px)",s.style.right="auto";else{if(!a){s.style.left="0",s.style.width="100%";const n=e.bottom+o+6<t;return void(s.style.top=n?`${i.offsetHeight}px`:`-${o}px`)}s.style.left="auto",s.style.right="calc(100% - 3px)"}let h=-5,c=e.top+h+o;if(c+6>t){h-=c+6-t}if(e.top+h<6){h=6-e.top;const n=t-12;s.style.maxHeight=`${n}px`}s.style.top=`${h}px`})))}else i.addEventListener("click",(t=>{t.stopPropagation(),"function"==typeof e.callback&&e.callback(n),this.hideMenu()}));i.addEventListener("mouseleave",(e=>{const t=e.relatedTarget;if(!t||!this.shadowRoot.contains(t)){this.shadowRoot.querySelectorAll(".sub-menu").forEach((e=>e.style.visibility=""))}})),t.appendChild(i)}))}updateMenuItemsFromSchema(e,t){const n=[];e.forEach((e=>{const i=e.items.filter((e=>"function"!=typeof e.context||e.context(t)));i.length>0&&n.push({id:e.id,name:e.name,order:e.order||0,items:i})})),n.sort(((e,t)=>e.order-t.order)),this.customMenu.innerHTML="",n.forEach(((e,n)=>{if(n>0){const e=document.createElement("div");e.className="menu-divider",this.customMenu.appendChild(e)}const i=document.createElement("div");i.className="menu-header",i.textContent=e.name,this.customMenu.appendChild(i),this._renderMenuLayer(e.items,this.customMenu,t)})),0===n.length&&this.hideMenu()}showMenu(e,t){!this.isOpening&&this.customMenu&&(this.isOpening=!0,this.customMenu.style.position="fixed",this.customMenu.style.left=`${e}px`,this.customMenu.style.top=`${t}px`,this.customMenu.style.display="block",this.customMenu.classList.remove("hiding"),requestAnimationFrame((()=>{this.customMenu.classList.add("visible"),setTimeout((()=>{this.isAnimating=!1,this.isOpening=!1,this.isMenuVisible=!0}),150)})))}moveMenu(e,t){if(!this.customMenu)return;const n=this.isAnimating;n||(this.isAnimating=!0),requestAnimationFrame((()=>{this.customMenu.style.left=`${e}px`,this.customMenu.style.top=`${t}px`,n||setTimeout((()=>this.isAnimating=!1),150)}))}handleClickOutside(e){const t=e.composedPath();this.isMenuVisible&&!t.includes(this.customMenu)&&this.hideMenu()}handleScroll(){this.isMenuVisible&&this.hideMenu()}handleSelectionChange(){const e=window.getSelection();this.isMenuVisible&&e.toString().length>0&&this.hideMenu()}handleTouchEnd(e){setTimeout((()=>{const e=window.getSelection(),t=e.toString();if(t&&t.length>0)try{const t=e.getRangeAt(0).getBoundingClientRect(),n=t.left+t.width/2,i={preventDefault:()=>{},clientX:n,clientY:t.bottom+5,target:e.anchorNode?.parentElement||document.body,isSynthetic:!0};this.handleContextMenu(i)}catch(e){console.error("CRCM: Failed to calculate selection rect",e)}}),50)}handleTouchStart(e){this.isMenuVisible&&(this.touchStartY=e.touches[0].clientY)}handleTouchMove(e){if(this.isMenuVisible){const t=e.touches[0].clientY;Math.abs(t-this.touchStartY)>5&&this.hideMenu()}}handleKeydown(e){"Escape"===e.key&&this.isMenuVisible&&this.hideMenu()}hideMenu(){!this.isAnimating&&this.customMenu&&(this.clearTimers(),this.isAnimating=!0,this.isOpening=!1,this.customMenu.classList.remove("visible"),this.customMenu.classList.add("hiding"),this.hideMenuTimer=setTimeout((()=>{this.customMenu&&(this.customMenu.style.display="none",this.customMenu.classList.remove("hiding"),this.customMenu.style.left="auto",this.customMenu.style.top="auto",this.isAnimating=!1,this.isMenuVisible=!1,this.currentLinkUrl=null,this.currentImageUrl=null,this.selectedText="",this.hideMenuTimer=null)}),150))}}customElements.get("custom-right-click-menu")||customElements.define("custom-right-click-menu",CustomRightClickMenu);

// 菜单项回调函数写在下面---开始：
const copyAction=(ctx)=>{if(ctx.selectedText){if(navigator.clipboard){navigator.clipboard.writeText(ctx.selectedText).catch(()=>fallbackCopyText(ctx.selectedText))}else{fallbackCopyText(ctx.selectedText)}}};const pasteAction=(ctx)=>{const targetElement=ctx.target;if(!targetElement||!(targetElement.tagName==='INPUT'||targetElement.tagName==='TEXTAREA'||targetElement.isContentEditable)){return}const wasFocused=document.activeElement===targetElement;if(!wasFocused)targetElement.focus();if(navigator.clipboard){navigator.clipboard.readText().then((text)=>{insertTextAtCursor(targetElement,text);if(!wasFocused)targetElement.blur()}).catch(()=>fallbackPasteText(targetElement))}else{fallbackPasteText(targetElement)}};const insertTextAtCursor=(element,text)=>{if(typeof element.execCommand==='function'){document.execCommand('insertText',false,text)}else if(element.setRangeText){const start=element.selectionStart;const end=element.selectionEnd;element.setRangeText(text,start,end,'end');const pos=start+text.length;element.selectionStart=pos;element.selectionEnd=pos}else if(element.createTextRange){const range=element.createTextRange();range.collapse(true);range.text=text;range.moveStart('character',-text.length);range.select()}};const fallbackCopyText=(text)=>{const textarea=document.createElement('textarea');textarea.value=text;textarea.style.position='fixed';textarea.style.opacity='0';document.body.appendChild(textarea);textarea.select();document.execCommand('copy');document.body.removeChild(textarea)};const fallbackPasteText=(targetElement)=>{const textarea=document.createElement('textarea');textarea.style.position='fixed';textarea.style.opacity='0';document.body.appendChild(textarea);textarea.focus();document.execCommand('paste');insertTextAtCursor(targetElement,textarea.value);document.body.removeChild(textarea)};const openInNewTabAction=(ctx)=>{if(ctx.currentLinkUrl)window.open(ctx.currentLinkUrl,'_blank')};const copyLinkAction=(ctx)=>{if(ctx.currentLinkUrl){navigator.clipboard?.writeText(ctx.currentLinkUrl).catch(()=>fallbackCopyText(ctx.currentLinkUrl))}};const backAction=()=>{window.history.back()};const refreshAction=()=>{location.reload()};const backToHomeAction=()=>{window.location.href='/'};const openImageInNewTabAction=(ctx)=>{if(ctx.currentImageUrl)window.open(ctx.currentImageUrl,'_blank')};const copyImageUrlAction=(ctx)=>{if(ctx.currentImageUrl){navigator.clipboard?.writeText(ctx.currentImageUrl).catch(()=>fallbackCopyText(ctx.currentImageUrl))}};const fullscreenModeAction=(ctx)=>{if(document.fullscreenElement){document.exitFullscreen()}else{document.documentElement.requestFullscreen()}};const copyWebsiteUrlAction=(text)=>{const textArea=document.createElement('textarea');textArea.value=text;document.body.appendChild(textArea);textArea.select();document.execCommand('copy');document.body.removeChild(textArea)};const scrollToBottomAction=()=>{window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'})};
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
            // 对应菜单项hover背景
            '--item-hover-bg': 'rgba(255, 255, 255, 0.22)',
            // 对应菜单项过渡效果的时间
            '--item-transition-speed': '0.2s',
            // 对应菜单项文字颜色
            '--text-color': 'white',
            // 对应菜单标题文字颜色
            '--header-color': 'white',
            // 对应分隔线颜色
            '--divider-color': '#e5e7eb'
            // 对应菜单项箭头的margin-left
            '--arrow-margin-left': '0.75rem',
            // 对应菜单项的行高
            '--menu-line-height': '1.4',
        },*/

        // 外部样式（可选，FontAwesome图标库可换源）
        externalStyles: [
            //'Example.css',
            // 'https://s4.zstatic.net/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        ]
    });

    // 注册默认菜单配置（菜单项图标支持“内嵌SVG”与“FontAwesome类名”）
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
                        // fa-arrow-left
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>',
                        callback: backAction, context: () => true
                    },
                    {
                        id: 'refresh',
                        label: '刷新',
                        // fa-refresh
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z"/></svg>',
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
                        // fa-copy
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/></svg>',
                        callback: copyAction,
                        context: (ctx) => ctx.selectedText.trim().length > 0 || ctx.isInputFocused
                    },
                    {
                        id: 'paste',
                        label: '粘贴',
                        // 	fa-paste
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M160 0c-23.7 0-44.4 12.9-55.4 32L48 32C21.5 32 0 53.5 0 80L0 400c0 26.5 21.5 48 48 48l144 0 0-272c0-44.2 35.8-80 80-80l48 0 0-16c0-26.5-21.5-48-48-48l-56.6 0C204.4 12.9 183.7 0 160 0zM272 128c-26.5 0-48 21.5-48 48l0 272 0 16c0 26.5 21.5 48 48 48l192 0c26.5 0 48-21.5 48-48l0-220.1c0-12.7-5.1-24.9-14.1-33.9l-67.9-67.9c-9-9-21.2-14.1-33.9-14.1L320 128l-48 0zM160 40a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>',
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
                        // fa-external-link
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/></svg>',
                        callback: openInNewTabAction,
                        context: (ctx) => !!ctx.currentLinkUrl && !ctx.currentLinkUrl.startsWith('javascript:')
                    },
                    {
                        id: 'copy-link',
                        label: '复制链接地址',
                        // fa-link
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" transform="scale(1.2)"><!--! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>',
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
                        // fa-external-link
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/></svg>',
                        callback: openImageInNewTabAction,
                        context: (ctx) => !!ctx.currentImageUrl && !ctx.currentImageUrl.startsWith('data:')
                    },
                    {
                        id: 'copy-image-link',
                        label: '复制图片地址',
                        // fa-link
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" transform="scale(1.2)"><!--! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>',
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
                        // fa-ellipsis-h
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/></svg>',
                        // 多级嵌套子菜单
                        children: [
                            {
                                id: 'sub-1',
                                label: '复制当前链接',
                                // fa-globe
                                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z"/></svg>',
                                callback: () => copyWebsiteUrlAction(window.location.href)
                            },
                            {
                                id: 'sub-2',
                                label: '全屏模式开关',
                                // fa-expand-arrows-alt
                                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z"/></svg>',
                                callback: fullscreenModeAction
                            },
                            {
                                id: 'sub-3',
                                label: '滚动到最底部',
                                // fa-arrow-down
                                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>',
                                callback: () => scrollToBottomAction()
                            }
                        ]
                    },
                    {
                        id: 'back-to-home',
                        label: '返回主页',
                        // fa-home
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>',
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