const customMenu = document.getElementById('custom-menu');
const backItem = document.getElementById('back-item');
const refreshItem = document.getElementById('refresh-item');
const copyItem = document.getElementById('copy-item');
const pasteItem = document.getElementById('paste-item');
const openInNewTabItem = document.getElementById('open-in-new-tab-item');
const copyLinkItem = document.getElementById('copy-link-item');
const backToHomeItem = document.getElementById('back-to-home-item');
const imageDivider = document.getElementById('image-divider');
const imageMenuHeader = document.getElementById('image-menu-header');
const openImageInNewTabItem = document.getElementById('open-image-in-new-tab-item');
const copyImageUrlItem = document.getElementById('copy-image-url-item');
const generalMenuHeader = document.getElementById('general-menu-header');
const editDivider = document.getElementById('edit-divider');
const editMenuHeader = document.getElementById('edit-menu-header');
const linkDivider = document.getElementById('link-divider');
const linkMenuHeader = document.getElementById('link-menu-header');
const otherDivider = document.getElementById('other-divider');
const otherMenuHeader = document.getElementById('other-menu-header');

let contextMenuX = 0;
let contextMenuY = 0;
let currentImageUrl = null;
let isMenuVisible = false;
let currentLinkUrl = null;
let selectedText = '';
let isAnimating = false;
let menuOpenTime = 0;
let focusedElementBeforeMenu = null;
let scrollTimer = null;
let touchStartY = 0;

document.addEventListener('wheel', handleScroll, { passive: true });
document.addEventListener('touchstart', handleTouchStart, { passive: true });
document.addEventListener('touchmove', handleTouchMove, { passive: true });
window.addEventListener('scroll', handleScroll, { passive: true });
document.addEventListener('contextmenu', handleContextMenu);
document.addEventListener('click', handleClickOutside);
document.addEventListener('keydown', handleKeydown);

function initCustomMenu() {
    [openInNewTabItem, copyLinkItem, openImageInNewTabItem, copyImageUrlItem,
        backItem, refreshItem, copyItem, pasteItem, backToHomeItem,
        generalMenuHeader, editDivider, editMenuHeader, linkDivider,
        linkMenuHeader, imageDivider, imageMenuHeader, otherDivider,
        otherMenuHeader].forEach(item => {
            item.style.display = 'none';
        });
}

function getCurrentLink(target) {
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

function getCurrentImage(target) {
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

function handleScroll() {
    if (isMenuVisible) {
        if (scrollTimer) clearTimeout(scrollTimer);
        scrollTimer = setTimeout(hideMenu, 50);
    }
}

function handleTouchStart(e) {
    if (isMenuVisible) {
        touchStartY = e.touches[0].clientY;
    }
}

function handleTouchMove(e) {
    if (isMenuVisible) {
        const touchY = e.touches[0].clientY;
        if (Math.abs(touchY - touchStartY) > 5) hideMenu();
    }
}

function handleContextMenu(e) {
    e.preventDefault();
    focusedElementBeforeMenu = document.activeElement;
    const now = Date.now();
    const isNewOpen = !isMenuVisible || (now - menuOpenTime > 300);

    selectedText = window.getSelection().toString();
    currentLinkUrl = getCurrentLink(e.target);
    currentImageUrl = getCurrentImage(e.target);
    contextMenuX = e.clientX;
    contextMenuY = e.clientY;

    updateMenuItemsVisibility();
    if (!customMenu) return;

    let menuRect;
    if (isNewOpen && !isMenuVisible) {
        customMenu.style.transition = 'none';
        customMenu.style.display = 'block';
        customMenu.style.opacity = '0';
        customMenu.offsetHeight;
        menuRect = customMenu.getBoundingClientRect();
        customMenu.style.display = 'none';
        customMenu.style.opacity = '';
        customMenu.style.transition = '';
    } else {
        menuRect = customMenu.getBoundingClientRect();
    }

    const menuWidth = menuRect.width;
    const menuHeight = menuRect.height;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = contextMenuX;
    if (left + menuWidth + 20 > viewportWidth) {
        left = Math.max(10, viewportWidth - menuWidth - 10);
    }

    let top = contextMenuY;
    if (top + menuHeight + 20 > viewportHeight) {
        top = Math.max(10, viewportHeight - menuHeight - 10);
    }

    if (isNewOpen) {
        showMenu(left, top);
    } else {
        moveMenu(left, top);
    }
    menuOpenTime = now;
}

function showMenu(left, top) {
    if (isAnimating || !customMenu) return;
    isAnimating = true;
    customMenu.style.position = 'fixed';
    customMenu.style.left = `${left}px`;
    customMenu.style.top = `${top}px`;
    customMenu.style.display = 'block';
    customMenu.classList.remove('hiding');

    setTimeout(() => {
        customMenu.classList.add('visible');
        setTimeout(() => {
            isAnimating = false;
            isMenuVisible = true;
        }, 150);
    }, 10);
}

function moveMenu(left, top) {
    if (isAnimating || !customMenu) return;
    isAnimating = true;
    customMenu.style.left = `${left}px`;
    customMenu.style.top = `${top}px`;
    setTimeout(() => isAnimating = false, 150);
}

function handleClickOutside(e) {
    if (customMenu && isMenuVisible && !customMenu.contains(e.target)) hideMenu();
}

function handleKeydown(e) {
    if (e.key === 'Escape' && isMenuVisible) hideMenu();
}

function updateMenuItemsVisibility() {
    [backItem, refreshItem, copyItem, pasteItem,
        openInNewTabItem, copyLinkItem, backToHomeItem,
        generalMenuHeader, editDivider, editMenuHeader,
        linkDivider, linkMenuHeader, imageDivider,
        imageMenuHeader, openImageInNewTabItem,
        copyImageUrlItem, otherDivider, otherMenuHeader].forEach(item => {
            item.style.display = 'none';
        });

    const isInputFocused = focusedElementBeforeMenu &&
        (focusedElementBeforeMenu.tagName === 'INPUT' ||
            focusedElementBeforeMenu.tagName === 'TEXTAREA' ||
            focusedElementBeforeMenu.isContentEditable);

    // 常规
    generalMenuHeader.style.display = 'block';
    backItem.style.display = 'flex';
    refreshItem.style.display = 'flex';

    // 其他
    otherDivider.style.display = 'block';
    otherMenuHeader.style.display = 'block';
    backToHomeItem.style.display = 'flex';

    // 图片
    if (currentImageUrl) {
        imageDivider.style.display = 'block';
        imageMenuHeader.style.display = 'block';
        openImageInNewTabItem.style.display = 'flex';
        copyImageUrlItem.style.display = 'flex';
    }
    // 链接
    else if (currentLinkUrl) {
        linkDivider.style.display = 'block';
        linkMenuHeader.style.display = 'block';
        openInNewTabItem.style.display = 'flex';
        copyLinkItem.style.display = 'flex';
    }
    // 编辑
    else if (isInputFocused || selectedText) {
        editDivider.style.display = 'block';
        editMenuHeader.style.display = 'block';
        copyItem.style.display = 'flex';
        pasteItem.style.display = 'flex';
    }
}

function hideMenu() {
    if (isAnimating || !customMenu) return;
    isAnimating = true;

    customMenu.classList.remove('visible');
    customMenu.classList.add('hiding');

    setTimeout(() => {
        customMenu.style.display = 'none';
        customMenu.classList.remove('hiding');
        customMenu.style.left = 'auto';
        customMenu.style.top = 'auto';

        isAnimating = false;
        isMenuVisible = false;
        currentLinkUrl = null;
        currentImageUrl = null;
        selectedText = '';
    }, 150);
}

function backAction() {
    window.history.back();
    hideMenu();
}

function refreshAction() {
    location.reload();
    hideMenu();
}

function copyAction() {
    if (selectedText) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(selectedText).catch(() => {
                fallbackCopyText(selectedText);
            });
        } else {
            fallbackCopyText(selectedText);
        }
    }
    hideMenu();
}

function pasteAction() {
    const targetElement = focusedElementBeforeMenu;
    if (!targetElement || !(targetElement.tagName === 'INPUT' ||
        targetElement.tagName === 'TEXTAREA' || targetElement.isContentEditable)) {
        return hideMenu();
    }

    const wasFocused = document.activeElement === targetElement;
    if (!wasFocused) targetElement.focus();

    if (navigator.clipboard) {
        navigator.clipboard.readText().then(text => {
            insertTextAtCursor(targetElement, text);
            if (!wasFocused) targetElement.blur();
        }).catch(() => fallbackPasteText(targetElement));
    } else {
        fallbackPasteText(targetElement);
    }
    hideMenu();
}

function insertTextAtCursor(element, text) {
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
}

function fallbackCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function fallbackPasteText(targetElement) {
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    document.execCommand('paste');
    insertTextAtCursor(targetElement, textarea.value);
    document.body.removeChild(textarea);
}

function openInNewTabAction() {
    if (currentLinkUrl) window.open(currentLinkUrl, '_blank');
    hideMenu();
}

function copyLinkAction() {
    if (currentLinkUrl) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(currentLinkUrl).catch(() => {
                fallbackCopyText(currentLinkUrl);
            });
        } else {
            fallbackCopyText(currentLinkUrl);
        }
    }
    hideMenu();
}

function backToHomeAction() {
    window.location.href = '/';
    hideMenu();
}

function openImageInNewTabAction() {
    if (currentImageUrl) window.open(currentImageUrl, '_blank');
    hideMenu();
}

function copyImageUrlAction() {
    if (currentImageUrl) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(currentImageUrl).catch(() => {
                fallbackCopyText(currentImageUrl);
            });
        } else {
            fallbackCopyText(currentImageUrl);
        }
    }
    hideMenu();
}

document.addEventListener('DOMContentLoaded', initCustomMenu);
document.addEventListener('contextmenu', e => e.preventDefault());