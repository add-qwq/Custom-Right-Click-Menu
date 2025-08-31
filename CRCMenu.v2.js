/**
 * 该项目为Custom-Right-Click-Menu（以下简称CRCM）的V2版本

 * 我们有信心称该项目是目前为止（具体时间以项目commits时间为准），功能最完善、最优秀的原生JS自定义右键菜单项目，无需依赖任何框架

 * 当然，许多优秀的开发者或许只是未涉足此类工具，我们仅是将这一想法转化为了可落地的解决方案

 * 该版本基于Web Components重写，支持自定义分组、动态显示/隐藏菜单项、自定义菜单项、主题定制、加载外部样式表等新功能

 * 且相较于V1版本，修复了多数已知问题，拓展性更高，并简化成了只需引入一个JS文件即可快速部署到你的项目中

 * 项目作者：add-qwq（https://github.com/add-qwq）

 * 特此感谢：Conard-Ferenc（https://github.com/Conard-Ferenc） ，为CRCM的V2版本提供了大体的思路设计和部分技术支持

 * 项目地址：https://github.com/add-qwq/Custom-Right-Click-Menu

 * 该项目受Apache License 2.0开源协议保护，您必须在遵守协议的前提下使用、修改和分发该项目的代码
 */

//以下代码仅为压缩格式后的代码，不建议直接修改，如需查看，请自行格式化代码
class CustomRightClickMenu extends HTMLElement{static instance=null;constructor({theme={},externalStyles=[]}={}){if(CustomRightClickMenu.instance){return CustomRightClickMenu.instance}super();this.attachShadow({mode:'open'});this.isMounted=false;this.listenArgs=[];this.isOpening=false;this.lastContextMenuTime=0;this.contextMenuX=0;this.contextMenuY=0;this.currentImageUrl=null;this.currentLinkUrl=null;this.selectedText='';this.isMenuVisible=false;this.isAnimating=false;this.menuOpenTime=0;this.focusedElementBeforeMenu=null;this.scrollTimer=null;this.touchStartY=0;this.target=null;this.menuItemsRegistry=new Map();this.groupsRegistry=new Map();this.theme={'--menu-bg':'rgba(255, 255, 255, 0.95)','--menu-border':'1px solid rgba(0, 0, 0, 0.1)','--menu-backdrop':'blur(10px)','--item-hover-bg':'#f3f4f6','--text-color':'#6b7280','--header-color':'#9ca3af','--divider-color':'#e5e7eb','--transition-speed':'0.1s',...theme};this.externalStyles=externalStyles;this.injectGlobalStyles(externalStyles);this.shadowRoot.innerHTML=`${this._renderExternalStyles()}<style>:host{${this._renderThemeVariables()}}#custom-menu{display:none;position:fixed;background:var(--menu-bg);border-radius:15px;box-shadow:0 10px 15px-3px rgba(0,0,0,0.1),0 4px 6px-2px rgba(0,0,0,0.05);padding:0.5rem 0;z-index:9999;min-width:180px;overflow:hidden;transition:all var(--transition-speed)ease-out;transform-origin:top left;opacity:0;transform:scale(0.95);backdrop-filter:var(--menu-backdrop);border:var(--menu-border);user-select:none}#custom-menu.visible{opacity:1;transform:scale(1)}#custom-menu.hiding{opacity:0;transform:scale(0.95)}.menu-item{display:flex;align-items:center;padding:0.75rem 1.25rem;cursor:pointer;transition:all 0.2s ease;color:var(--text-color)}.menu-item:hover{background-color:var(--item-hover-bg);border-radius:15px}.menu-item i{width:1.5rem;margin-right:0.75rem;color:var(--text-color)}.menu-divider{border-top:1px solid var(--divider-color);margin:0.25rem 0}.menu-header{padding:0.5rem 1.25rem;font-size:0.875rem;color:var(--header-color);text-transform:uppercase;font-weight:500}</style><div id="custom-menu"part="menu"></div>`;this.customMenu=this.shadowRoot.getElementById('custom-menu');CustomRightClickMenu.instance=this}injectGlobalStyles(styles){styles.forEach(styleUrl=>{const existingLink=document.querySelector(`link[href="${styleUrl}"]`);if(existingLink)return;const link=document.createElement('link');link.rel='stylesheet';link.href=styleUrl;document.head.appendChild(link)})}_renderExternalStyles(){return this.externalStyles.map(styleUrl=>`<link rel="stylesheet"href="${styleUrl}">`).join('')}_renderThemeVariables(){return Object.entries(this.theme).map(([key,value])=>`${key}:${value};`).join('\n')}setTheme(newTheme){if(typeof newTheme!=='object'||newTheme===null){throw new Error('主题配置必须是非空对象');}this.theme={...this.theme,...newTheme};const hostElement=this.shadowRoot.host;Object.entries(this.theme).forEach(([key,value])=>{hostElement.style.setProperty(key,value)})}registerGroup({id,name,order=0}){if(this.groupsRegistry.has(id))return;this.groupsRegistry.set(id,{id,name,order})}unregisterGroup(groupId){this.groupsRegistry.delete(groupId);this.menuItemsRegistry.forEach((item,itemId)=>{if(item.group===groupId)this.menuItemsRegistry.delete(itemId)})}registerMenuItem({id,label,icon='',callback=()=>{},context=()=>true,group='default',divider=false}){if(this.menuItemsRegistry.has(id))return;this.menuItemsRegistry.set(id,{id,label,icon,callback,context,group,divider})}unregisterMenuItem(id){this.menuItemsRegistry.delete(id)}mount(target=window){if(typeof target?.addEventListener!=='function'){throw new Error('挂载目标必须是HTMLElement或Window');}if(this.isMounted&&this.target===target){return}if(this.isMounted){this.unmount()}this.target=target;this.listenArgs=[[target,'contextmenu',this.handleContextMenu.bind(this),{capture:true}],[document,'click',this.handleClickOutside.bind(this)],[document,'wheel',this.handleScroll.bind(this),{passive:true,capture:true}],[document,'touchstart',this.handleTouchStart.bind(this),{passive:true}],[document,'touchmove',this.handleTouchMove.bind(this),{passive:true}],[document,'keydown',this.handleKeydown.bind(this)],[window,'scroll',this.handleScroll.bind(this),{passive:true}]];this.listenArgs.forEach(([ele,...args])=>ele.addEventListener(...args));this.isMounted=true}unmount(){if(!this.isMounted||!this.target)return;this.listenArgs.forEach(([ele,...args])=>ele.removeEventListener(...args));this.target=null;this.isMounted=false;this.listenArgs=[];this.hideMenu()}handleContextMenu(e){e.preventDefault();this.focusedElementBeforeMenu=document.activeElement;const now=Date.now();const timeSinceLast=now-this.lastContextMenuTime;this.lastContextMenuTime=now;this.selectedText=window.getSelection().toString();this.currentLinkUrl=this.getCurrentLink(e.target);this.currentImageUrl=this.getCurrentImage(e.target);this.contextMenuX=e.clientX;this.contextMenuY=e.clientY;this.updateMenuItemsVisibility();if(!this.customMenu||this.customMenu.children.length===0){this.hideMenu();return}let menuRect;const isNewOpen=!this.isMenuVisible&&!this.isOpening&&(timeSinceLast>100||this.lastContextMenuTime===0);if(isNewOpen&&!this.isMenuVisible){this.customMenu.style.transition='none';this.customMenu.style.display='block';this.customMenu.style.opacity='0';this.customMenu.offsetHeight;menuRect=this.customMenu.getBoundingClientRect();this.customMenu.style.display='none';this.customMenu.style.opacity='';this.customMenu.style.transition=''}else{menuRect=this.customMenu.getBoundingClientRect()}const menuWidth=menuRect.width||180;const menuHeight=menuRect.height||100;const viewportWidth=window.innerWidth;const viewportHeight=window.innerHeight;let left=this.contextMenuX;left=left+menuWidth+20>viewportWidth?Math.max(10,viewportWidth-menuWidth-10):left;let top=this.contextMenuY;top=top+menuHeight+20>viewportHeight?Math.max(10,viewportHeight-menuHeight-10):top;isNewOpen?this.showMenu(left,top):this.moveMenu(left,top);this.menuOpenTime=now}getCurrentLink(target){const linkElement=target.closest('a');if(linkElement)return linkElement.href;const onclick=target.getAttribute('onclick');if(onclick){const openMatch=onclick.match(/window\.open\(['"](.*?)['"]/i);if(openMatch)return openMatch[1];const hrefMatch=onclick.match(/location\.href\s*=\s*['"](.*?)['"]/i);if(hrefMatch)return hrefMatch[1]}return null}getCurrentImage(target){const imgElement=target.closest('img');if(imgElement)return imgElement.src;const style=window.getComputedStyle(target);const bgImage=style.getPropertyValue('background-image');if(bgImage&&bgImage!=='none'){const bgMatch=bgImage.match(/url\(["']?(.*?)["']?\)/i);if(bgMatch)return bgMatch[1]}return null}updateMenuItemsVisibility(){const isInputFocused=this.focusedElementBeforeMenu&&(this.focusedElementBeforeMenu.tagName==='INPUT'||this.focusedElementBeforeMenu.tagName==='TEXTAREA'||this.focusedElementBeforeMenu.isContentEditable);const groups={};this.menuItemsRegistry.forEach((item)=>{const isVisible=typeof item.context==='function'&&item.context({selectedText:this.selectedText,currentLinkUrl:this.currentLinkUrl,currentImageUrl:this.currentImageUrl,isInputFocused,target:this.focusedElementBeforeMenu});if(isVisible){const groupId=item.group;if(!groups[groupId])groups[groupId]=[];groups[groupId].push(item)}});const visibleGroups=[];this.groupsRegistry.forEach(group=>{if(groups[group.id])visibleGroups.push({...group,items:groups[group.id]})});visibleGroups.sort((a,b)=>a.order-b.order);this.customMenu.innerHTML='';visibleGroups.forEach((group,index)=>{if(index>0){const divider=document.createElement('div');divider.className='menu-divider';this.customMenu.appendChild(divider)}const header=document.createElement('div');header.className='menu-header';header.textContent=group.name;this.customMenu.appendChild(header);group.items.forEach((item)=>{if(item.divider){const divider=document.createElement('div');divider.className='menu-divider';this.customMenu.appendChild(divider)}const menuItem=document.createElement('div');menuItem.className='menu-item';menuItem.dataset.id=item.id;if(item.icon){const icon=document.createElement('i');icon.className=`fa ${item.icon}`;menuItem.appendChild(icon)}const label=document.createElement('span');label.textContent=item.label;menuItem.appendChild(label);menuItem.addEventListener('click',()=>{item.callback({selectedText:this.selectedText,currentLinkUrl:this.currentLinkUrl,currentImageUrl:this.currentImageUrl,isInputFocused,target:this.focusedElementBeforeMenu});this.hideMenu()});this.customMenu.appendChild(menuItem)})});if(visibleGroups.length===0)this.hideMenu()}showMenu(left,top){if(this.isOpening||!this.customMenu)return;this.isOpening=true;this.customMenu.style.position='fixed';this.customMenu.style.left=`${left}px`;this.customMenu.style.top=`${top}px`;this.customMenu.style.display='block';this.customMenu.classList.remove('hiding');requestAnimationFrame(()=>{this.customMenu.classList.add('visible');setTimeout(()=>{this.isAnimating=false;this.isOpening=false;this.isMenuVisible=true},150)})}moveMenu(left,top){if(!this.customMenu)return;const wasAnimating=this.isAnimating;if(!wasAnimating)this.isAnimating=true;requestAnimationFrame(()=>{this.customMenu.style.left=`${left}px`;this.customMenu.style.top=`${top}px`;if(!wasAnimating)setTimeout(()=>(this.isAnimating=false),150)})}handleClickOutside(e){if(this.customMenu&&this.isMenuVisible&&!this.customMenu.contains(e.target)){this.hideMenu()}}handleScroll(){if(this.isMenuVisible){if(this.scrollTimer)clearTimeout(this.scrollTimer);this.scrollTimer=setTimeout(()=>this.hideMenu(),50)}}handleTouchStart(e){if(this.isMenuVisible)this.touchStartY=e.touches[0].clientY}handleTouchMove(e){if(this.isMenuVisible){const touchY=e.touches[0].clientY;if(Math.abs(touchY-this.touchStartY)>5)this.hideMenu()}}handleKeydown(e){if(e.key==='Escape'&&this.isMenuVisible)this.hideMenu()}hideMenu(){if(this.isAnimating||!this.customMenu)return;this.isAnimating=true;this.isOpening=false;this.customMenu.classList.remove('visible');this.customMenu.classList.add('hiding');setTimeout(()=>{this.customMenu.style.display='none';this.customMenu.classList.remove('hiding');this.customMenu.style.left='auto';this.customMenu.style.top='auto';this.isAnimating=false;this.isMenuVisible=false;this.currentLinkUrl=null;this.currentImageUrl=null;this.selectedText=''},150)}}if(!customElements.get('custom-right-click-menu')){customElements.define('custom-right-click-menu',CustomRightClickMenu)}

// 菜单项回调函数写在下面--开始：

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
  
  const testAction = (ctx) => {
    alert('我是测试');
  };
  
  // 菜单项回调函数写在上面--结束
  
  
  // 创建菜单函数
  const createRightClickMenu = () => {
    // 自定义主题配置和外部样式
    const menu = new CustomRightClickMenu({
  
      /*
        theme: {
          // 对应菜单的背景
          '--menu-bg': 'rgba(255, 255, 255, 0.1)',
          // 对应菜单的边框
          '--menu-border': '1px solid rgba(255, 255, 255, 0.05)',
          // 对应backdrop-filter---自定义项
          '--menu-backdrop': 'blur(10px)',
          // 对应过渡效果的时间
          '--transition-speed': '0.1s',
          // 对应菜单项 hover 背景
          '--item-hover-bg': 'rgba(255, 255, 255, 0.3)',
          // 对应菜单项文字颜色
          '--text-color': 'white',
          // 对应菜单标题文字颜色
          '--header-color': 'white',
          // 对应分隔线颜色
          '--divider-color': '#e5e7eb'
        },
      */
  
      // 外部样式（可选，图标库必选，但可换源）
      externalStyles: [
        //'Example.css',
        'https://s4.zstatic.net/ajax/libs/font-awesome/6.4.0/css/all.min.css'
      ]
    });
  
    // 注册自定义分组
    menu.registerGroup({ id: 'general', name: '常规操作', order: 10 });
    menu.registerGroup({ id: 'edit', name: '编辑操作', order: 20 });
    menu.registerGroup({ id: 'link', name: '链接操作', order: 30 });
    menu.registerGroup({ id: 'image', name: '图片操作', order: 40 });
    menu.registerGroup({ id: 'other', name: '其他操作', order: 50 });
  
    // 注册自定义菜单项写在下面--开始：
  
    menu.registerMenuItem({
      id: 'back',
      label: '返回',
      icon: 'fa-arrow-left',
      callback: backAction,
      context: () => true,
      group: 'general'
    });
  
    menu.registerMenuItem({
      id: 'refresh',
      label: '刷新',
      icon: 'fa-refresh',
      callback: refreshAction,
      context: () => true,
      group: 'general'
    });
  
    menu.registerMenuItem({
      id: 'copy',
      label: '复制',
      icon: 'fa-copy',
      callback: copyAction,
      context: (ctx) => ctx.selectedText.trim().length > 0 || ctx.isInputFocused,
      group: 'edit'
    });
  
    menu.registerMenuItem({
      id: 'paste',
      label: '粘贴',
      icon: 'fa-paste',
      callback: pasteAction,
      context: (ctx) => ctx.isInputFocused && (ctx.target.tagName === 'INPUT' || ctx.target.tagName === 'TEXTAREA' || ctx.target.isContentEditable),
      group: 'edit'
    });
  
    menu.registerMenuItem({
      id: 'open-in-new-tab',
      label: '在新标签页打开',
      icon: 'fa-external-link',
      callback: openInNewTabAction,
      context: (ctx) => !!ctx.currentLinkUrl && !ctx.currentLinkUrl.startsWith('javascript:'),
      group: 'link'
    });
  
    menu.registerMenuItem({
      id: 'copy-link',
      label: '复制链接地址',
      icon: 'fa-link',
      callback: copyLinkAction,
      context: (ctx) => !!ctx.currentLinkUrl && !ctx.currentLinkUrl.startsWith('javascript:'),
      group: 'link'
    });
  
    menu.registerMenuItem({
      id: 'open-image-in-new-tab',
      label: '在新标签页打开',
      icon: 'fa-external-link',
      callback: openImageInNewTabAction,
      context: (ctx) => !!ctx.currentImageUrl && !ctx.currentImageUrl.startsWith('data:'),
      group: 'image'
    });
  
    menu.registerMenuItem({
      id: 'copy-image-url',
      label: '复制图片地址',
      icon: 'fa-link',
      callback: copyImageUrlAction,
      context: (ctx) => !!ctx.currentImageUrl,
      group: 'image'
    });
  
    menu.registerMenuItem({
      id: 'back-to-home',
      label: '返回主页',
      icon: 'fa-home',
      callback: backToHomeAction,
      context: () => true,
      group: 'other'
    });

    /*
    menu.registerMenuItem({
      id: 'test',
      label: '测试',
      icon: 'fa-question',
      callback: testAction,
      context: () => true,
      group: 'other'
    });
    */

    // 注册自定义菜单项写在上面--结束

if(!document.body.contains(menu)){document.body.appendChild(menu)}menu.mount();return menu};if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',createRightClickMenu)}else{createRightClickMenu()}