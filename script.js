document.addEventListener('DOMContentLoaded', () => {

    // 1. Eliminare Preloader și Afișare Buton WhatsApp
    const preloader = document.getElementById('preloader');
    const whatsappWidget = document.getElementById('whatsapp-widget');

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';

                    // Activare buton WhatsApp persistent după încărcare completă
                    if (whatsappWidget) {
                        whatsappWidget.classList.add('is-visible');
                    }
                }, 500);
            }
        }, 300);
    });

    // 2. Modificare Nav-Bar compact la Scroll
    const mainNav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });

    // 3. Observer Nativ pentru Animații Fluide la Scroll
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Rulare unică pentru performanță
            }
        });
    }, {
        threshold: 0.05
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 4. Schimbător de Limbă Nativ (RO / EN)
    const body = document.body;
    const btnEn = document.getElementById('btn-en');
    const btnRo = document.getElementById('btn-ro');

    if (btnEn && btnRo) {
        btnEn.addEventListener('click', () => {
            body.className = 'lang-en';
            btnEn.classList.add('active');
            btnRo.classList.remove('active');
        });

        btnRo.addEventListener('click', () => {
            body.className = 'lang-ro';
            btnEn.classList.remove('active');
            btnRo.classList.add('active');
        });
    }

    // 5. Sincronizare Video si Audio
    const mainVideo = document.getElementById('main-video');
    const mainAudio = document.getElementById('main-audio');

    if (mainVideo && mainAudio) {
        // Sincronizare Play / Pause
        mainVideo.addEventListener('play', () => mainAudio.play());
        mainVideo.addEventListener('pause', () => mainAudio.pause());
        mainVideo.addEventListener('waiting', () => mainAudio.pause());
        mainVideo.addEventListener('playing', () => mainAudio.play());

        // Sincronizare Timp
        mainVideo.addEventListener('seeked', () => {
            mainAudio.currentTime = mainVideo.currentTime;
        });

        // Sincronizare Volum si Mute
        mainVideo.addEventListener('volumechange', () => {
            mainAudio.muted = mainVideo.muted;
            mainAudio.volume = mainVideo.volume;
        });
    }

    // 6. Hamburger Menu (Mobile)
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    function openMenu() {
        mobileMenuOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenuOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);

    // Inchide menu la click pe fundal
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) closeMenu();
        });
    }

    // Inchide menu la click pe un link
    document.querySelectorAll('.mobile-nav-item, .mobile-nav-cta').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});
