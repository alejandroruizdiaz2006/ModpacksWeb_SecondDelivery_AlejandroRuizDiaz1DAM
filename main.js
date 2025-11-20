const containers = document.querySelectorAll('.container');
const modal = document.getElementById('modal');
const CLOSE_MODAL = document.getElementById('closeModal');
const MENU_BUTTON = document.getElementById('menuButton');
const SIDEBAR = document.getElementById('sidebar');
const CLOSE_SIDEBAR = document.getElementById('closeSidebar');
const SIDEBAR_OVERLAY = document.getElementById('sidebarOverlay');
const videoFrame = document.getElementById('videoFrame');
const videoTitle = document.getElementById('videoTitle');
const videoDescription = document.getElementById('videoDescription');

const videoData = {
    container1: {
        title: 'Better MC',
        description: '¿Listo para la aventura definitiva? Este pack incluye más de 100 misiones...',
        url: 'https://www.youtube.com/embed/IF31Rew9RpM?si=inNDOMk62RTTOGvB'
    },
    container2: {
        title: 'RL Craft',
        description: '¿Estás listo para poner a prueba tus habilidades de supervivencia...',
        url: 'https://www.youtube.com/embed/tbRAUWNf-2Y?si=pUDxRVPfQzK2bcyX'
    },
    container3: {
        title: 'Cobbleverse',
        description: '¿Sueñas con ser Maestro Pokémon en Minecraft?...',
        url: 'https://www.youtube.com/embed/HUD1ltMD2AM?si=pxEQFZIHXLUUI3DL'
    },
    container4: {
        title: 'Linggango',
        description: '¿Buscas un survival único y diferente?...',
        url: 'https://www.youtube.com/embed/REWpPquL8qU?si=BNbp6DGMm7Qlw4Im'
    },
    container5: {
        title: 'Prominence II: Hasturian Era',
        description: '¿Buscas un RPG épico dentro de Minecraft?...',
        url: 'https://www.youtube.com/embed/4uPmfzcIPQY?si=dfqRnrFqre9BqYO3'
    },
    container6: {
        title: 'Beyond Depth',
        description: '¿Te atreves a explorar las profundidades más oscuras de Minecraft?...',
        url: 'https://www.youtube.com/embed/yBai9purmjQ?si=dHfSt3E1DVe9uwrK'
    }
};

if (containers.length > 0) {
    containers.forEach(container => {
        container.addEventListener('click', () => {
            const info = container.querySelector('.info');
            if (info) {
                info.style.display = 'block';
            }

            const id = container.id;
            const data = videoData[id];
            if (data && modal && videoFrame && videoTitle && videoDescription) {
                videoFrame.src = data.url;
                videoTitle.textContent = data.title;
                videoDescription.textContent = data.description;
                modal.setAttribute('data-source', id);
                modal.style.display = 'flex';
                modal.setAttribute('aria-hidden', 'false');
                modal.setAttribute('aria-modal', 'true');
            }
        });
    });
}

function openSidebar() {
    if (SIDEBAR) {
        SIDEBAR.classList.add('open');
        SIDEBAR.setAttribute('aria-hidden', 'false');
    }
    if (SIDEBAR_OVERLAY) {
        SIDEBAR_OVERLAY.classList.add('active');
        SIDEBAR_OVERLAY.removeAttribute('hidden');
    }
}

function closeSidebar() {
    if (SIDEBAR) {
        SIDEBAR.classList.remove('open');
        SIDEBAR.setAttribute('aria-hidden', 'true');
    }
    if (SIDEBAR_OVERLAY) {
        SIDEBAR_OVERLAY.classList.remove('active');
        SIDEBAR_OVERLAY.setAttribute('hidden', '');
    }
}

if (MENU_BUTTON) {
    MENU_BUTTON.addEventListener('click', openSidebar);
}
if (CLOSE_SIDEBAR) {
    CLOSE_SIDEBAR.addEventListener('click', closeSidebar);
}
if (SIDEBAR_OVERLAY) {
    SIDEBAR_OVERLAY.addEventListener('click', closeSidebar);
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSidebar();
    }
});

if (CLOSE_MODAL) {
    CLOSE_MODAL.addEventListener('click', () => {
        if (modal) {
            modal.style.display = 'none';
            modal.removeAttribute('data-source');
            modal.setAttribute('aria-hidden', 'true');
            modal.removeAttribute('aria-modal');
        }
        if (videoFrame) videoFrame.src = '';
    });
}

if (modal) {
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            if (modal) modal.removeAttribute('data-source');
            if (modal) {
                modal.setAttribute('aria-hidden', 'true');
                modal.removeAttribute('aria-modal');
            }
            if (videoFrame) videoFrame.src = '';
        }
    });
}