document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('#mobile-menu-button');
    const navLinks = document.querySelector('#mobile-menu');
    const icon = hamburger ? hamburger.querySelector('i') : null;
    const themeToggle = document.querySelector('#theme-toggle');
    const themeToggleMobile = document.querySelector('#theme-toggle-mobile');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const themeIconMobile = themeToggleMobile ? themeToggleMobile.querySelector('i') : null;
    const html = document.documentElement;

    function updateThemeIcons(isDark) {
        [themeIcon, themeIconMobile].forEach(iconEl => {
            if (!iconEl) return;
            iconEl.classList.remove('fa-moon', 'fa-sun');
            iconEl.classList.add(isDark ? 'fa-sun' : 'fa-moon');
        });
    }

    function setTheme(isDark) {
        html.classList.toggle('theme-dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcons(isDark);
    }

    function toggleTheme() {
        setTheme(!html.classList.contains('theme-dark'));
    }

    setTheme(localStorage.getItem('theme') === 'dark');

    if (hamburger && navLinks && icon) {
        hamburger.addEventListener('click', function() {
            const isOpen = navLinks.classList.toggle('active');
            hamburger.classList.toggle('active', isOpen);
            icon.classList.remove('fa-bars', 'fa-times');
            icon.classList.add(isOpen ? 'fa-times' : 'fa-bars');
        });
    }

    [themeToggle, themeToggleMobile].forEach(btn => {
        if (btn) btn.addEventListener('click', toggleTheme);
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});