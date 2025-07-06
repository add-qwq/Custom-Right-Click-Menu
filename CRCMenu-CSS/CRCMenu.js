const customMenu = document.getElementById('custom-menu');
const backItem = document.getElementById('back-item');
const refreshItem = document.getElementById('refresh-item');
const copyItem = document.getElementById('copy-item');
const pasteItem = document.getElementById('paste-item');
const openInNewTabItem = document.getElementById('open-in-new-tab-item');
const copyLinkItem = document.getElementById('copy-link-item');

let isMenuVisible = false;
let currentTarget = null;
let selectedText = '';
let isAnimating = false;
let menuOpenTime = 0;
let focusedElementBeforeMenu = null;
let scrollTimer = null;
let touchStartY = 0;

document.addEventListener('wheel', handleScroll, { passive: true });

document.addEventListener('touchstart', (e) => {
    if (isMenuVisible) {
        touchStartY = e.touches[0].clientY;
    }
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    if (isMenuVisible) {
        const touchY = e.touches[0].clientY;
        const diff = Math.abs(touchY - touchStartY);

        if (diff > 5) {
            hideMenu();
        }
    }
}, { passive: true });

window.addEventListener('scroll', handleScroll, { passive: true });

function handleScroll() {
    if (isMenuVisible) {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }

        scrollTimer = setTimeout(() => {
            hideMenu();
        }, 50);
    }
}

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();

    focusedElementBeforeMenu = document.activeElement;

    const now = Date.now();
    const isNewOpen = !isMenuVisible || (now - menuOpenTime > 300);

    selectedText = window.getSelection().toString();

    currentTarget = e.target.closest('a');

    updateMenuItemsVisibility();

    const menuWidth = customMenu.offsetWidth || 180;
    const menuHeight = customMenu.offsetHeight || 200;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const clickX = e.clientX;
    const clickY = e.clientY;

    let left = clickX;
    if (clickX + menuWidth > viewportWidth) {
        left = Math.max(0, viewportWidth - menuWidth);
    }

    let top = clickY;
    if (clickY + menuHeight > viewportHeight) {
        top = Math.max(0, viewportHeight - menuHeight);
    }

    if (isNewOpen) {
        showMenu(left, top);
    } else {
        moveMenu(left, top);
    }

    menuOpenTime = now;
});

function showMenu(left, top) {
    if (isAnimating) return;

    isAnimating = true;

    customMenu.style.position = 'fixed';
    customMenu.style.left = `${left}px`;
    customMenu.style.top = `${top}px`;

    customMenu.style.display = 'block';
    customMenu.classList.remove('hiding');

    requestAnimationFrame(() => {
        customMenu.classList.add('visible');

        setTimeout(() => {
            isAnimating = false;
            isMenuVisible = true;
        }, 150);
    });
}

function moveMenu(left, top) {
    if (isAnimating) return;

    isAnimating = true;

    customMenu.style.position = 'fixed';
    customMenu.style.left = `${left}px`;
    customMenu.style.top = `${top}px`;

    setTimeout(() => {
        isAnimating = false;
    }, 150);
}

document.addEventListener('click', function (e) {
    if (!customMenu.contains(e.target) && isMenuVisible) {
        hideMenu();
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isMenuVisible) {
        hideMenu();
    }
});

function updateMenuItemsVisibility() {
    backItem.style.display = 'flex';
    refreshItem.style.display = 'flex';
    copyItem.style.display = 'flex';
    pasteItem.style.display = 'flex';
    openInNewTabItem.style.display = 'flex';
    copyLinkItem.style.display = 'flex';

    if (currentTarget) {
        backItem.style.display = 'none';
        refreshItem.style.display = 'none';
        pasteItem.style.display = 'none';
    } else {
        openInNewTabItem.style.display = 'none';
        copyLinkItem.style.display = 'none';
    }

    if (!selectedText) {
        copyItem.style.display = 'none';
    }
}

function hideMenu() {
    if (isAnimating) return;

    isAnimating = true;

    customMenu.classList.remove('visible');
    customMenu.classList.add('hiding');

    setTimeout(() => {
        customMenu.style.display = 'none';
        customMenu.classList.remove('hiding');
        isAnimating = false;
        isMenuVisible = false;
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
        navigator.clipboard.writeText(selectedText).catch((err) => {
            console.error('复制失败: ', err);
        });
    }
    hideMenu();
}

function pasteAction() {
    const targetElement = focusedElementBeforeMenu;

    if (targetElement &&
        (targetElement.tagName === 'INPUT' ||
            targetElement.tagName === 'TEXTAREA' ||
            targetElement.isContentEditable)) {

        const wasFocused = document.activeElement === targetElement;
        if (!wasFocused) {
            targetElement.focus();
        }

        navigator.clipboard.readText().then((clipboardText) => {
            if (typeof targetElement.execCommand === 'function') {
                document.execCommand('insertText', false, clipboardText);
            } else if (targetElement.setRangeText) {
                const start = targetElement.selectionStart;
                const end = targetElement.selectionEnd;
                targetElement.setRangeText(clipboardText, start, end, 'end');
            }

            if (!wasFocused) {
                targetElement.blur();
            }
        }).catch((err) => {
            console.error('粘贴失败: ', err);
        });
    }
    hideMenu();
}

function openInNewTabAction() {
    if (currentTarget) {
        window.open(currentTarget.href, '_blank');
    }
    hideMenu();
}

function copyLinkAction() {
    if (currentTarget) {
        navigator.clipboard.writeText(currentTarget.href).catch((err) => {
            console.error('复制链接失败: ', err);
        });
    }
    hideMenu();
}

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});