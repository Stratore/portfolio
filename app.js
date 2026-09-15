// --- 1. DICTIONNAIRE DE TRADUCTION (FR / EN) ---
const translations = {
    fr: {
        heroRoles: ["Développement C++ & POO", "Administration Systèmes Linux", "Développement Web", "Sensibilisé Cybersécurité"],
        eyebrow: "DOSSIER TECHNIQUE",
        navProfil: "Profil", navCompetences: "Compétences", navProjets: "Projets", navParcours: "Parcours", navContact: "Contact",
        heroLead: "« On ne construit pas son parcours en avançant en ligne droite, mais en explorant, en essayant, en recommençant. »",
        heroHint: "→ Naviguez avec les flèches, le clavier ou en glissant",
        metaFormation: "BUT Informatique — IUT d'Arles", metaLocation: "Arles, France",
        btnCV: "Consulter le CV", btnCVShort: "Voir mon CV", btnContact: "Me contacter", btnReadMore: "Consulter le dossier", btnCode: "Code source ↗",
        profilTitle: "Profil",
        aboutP1: "J'ai toujours eu une attache particulière avec l'informatique et la tech en général. Étant fils d'informaticien, j'ai toujours été baigné dans cet environnement numérique.",
        aboutP2: "Ce portfolio reflète ce mouvement : celui d'un esprit qui cherche à comprendre, à créer et à s'améliorer continuellement.",
        tagTeam: "#EspritÉquipe", tagClient: "#RelationClient", tagCuriosity: "#Curiosité",
        eduTag: "EN COURS — 2025/2026",
        eduDesc: "Formation technique approfondie axée sur le développement de logiciels, la conception orientée objet (C++), l'administration système et la gestion de bases de données.",
        eduLink: "Découvrir l'établissement →",
        skillsTitle: "Compétences", skillsDesc: "Niveaux estimés selon ma pratique et mon implication sur chaque technologie.",
        skillDevTitle: "Développement & Algorithmique", skillCpp: "C++ (POO)", skillAlgo: "Algorithmique & Logique",
        skillSysTitle: "Systèmes & Web", skillOS: "Architecture OS & Windows",
        levelLabels: ["", "Découverte", "Notions", "Opérationnel", "Confirmé", "Maîtrisé"],
        projectsTitle: "Projets", filterAll: "Tous", tagAlgo: "Algorithmique",
        proj1Title: "SAE S1.01 | Gestion de Bibliothèque",
        proj1Desc: "Conception d'un système robuste de gestion d'inventaire. Focus sur l'optimisation des structures de données.",
        proj1Details: "Dans le cadre de la SAE S1.01, j'ai eu l'opportunité de concevoir un système complet de gestion d'inventaire de bibliothèque en C++.\n\nCe projet m'a permis de mettre en pratique des concepts d'algorithmique avancée, notamment en optimisant les structures de données pour garantir des opérations de recherche et de tri fluides, même face à un grand volume de références.\n\nL'interface en console est pensée pour être intuitive, prouvant qu'un back-end solide peut s'accompagner d'une bonne expérience utilisateur.",
        proj2Title: "Vinted Tracker | Logiciel de Comptabilité",
        proj2Desc: "Conception en C++ (POO) d'un outil personnalisé pour le suivi des ventes en ligne. Automatisation du calcul des bénéfices.",
        proj2Details: "Vinted Tracker est un outil que j'ai développé en C++ en utilisant la Programmation Orientée Objet (POO).\n\nL'objectif était de répondre à un besoin réel : le suivi précis des ventes en ligne. Le logiciel permet d'automatiser le calcul des bénéfices nets, la gestion des frais de port et l'analyse des marges commerciales.\n\nCe projet montre ma capacité à analyser un besoin métier (Business Logic) et à le traduire en une architecture logicielle claire, modulaire et maintenable.",
        journeyTitle: "Parcours",
        exp1Date: "Cybersécurité", exp1Desc: "Stage de découverte au sein d'une école d'ingénieurs spécialisée dans les systèmes embarqués.",
        exp2Date: "Développement & Sys", exp2Desc: "Développement logiciel (Python, C++), administration système sous Linux (Bash) et web.",
        exp3Date: "Analytique", exp3Desc: "Stage d'observation en Mathématiques. Découverte de problèmes scientifique.",
        contactTitle: "Envie de collaborer ?",
        contactLead: "Ouvert aux opportunités de stage et d'alternance en développement logiciel ou systèmes.",
        labelCV: "Curriculum Vitae"
    },
    en: {
        heroRoles: ["C++ & OOP Development", "Linux Systems Administration", "Web Development", "Cybersecurity Aware"],
        eyebrow: "TECHNICAL FILE",
        navProfil: "Profile", navCompetences: "Skills", navProjets: "Projects", navParcours: "Journey", navContact: "Contact",
        heroLead: "« You don't build your path by walking a straight line, but by exploring, trying, and starting over. »",
        heroHint: "→ Navigate with the arrows, the keyboard, or by swiping",
        metaFormation: "BUT Informatique — IUT d'Arles", metaLocation: "Arles, France",
        btnCV: "View Resume", btnCVShort: "View Resume", btnContact: "Get in touch", btnReadMore: "Read case file", btnCode: "Source code ↗",
        profilTitle: "Profile",
        aboutP1: "I have always had a special connection with IT and tech in general. Being the son of an IT specialist, I was always immersed in this digital environment.",
        aboutP2: "This portfolio reflects this movement: a mind seeking to understand, create, and continuously improve.",
        tagTeam: "#TeamSpirit", tagClient: "#ClientRelations", tagCuriosity: "#Curiosity",
        eduTag: "IN PROGRESS — 2025/2026",
        eduDesc: "In-depth technical training focused on software development, OOP (C++), system administration, and databases.",
        eduLink: "Discover the institution →",
        skillsTitle: "Skills", skillsDesc: "Levels estimated from hands-on practice and involvement with each technology.",
        skillDevTitle: "Development & Algorithms", skillCpp: "C++ (OOP)", skillAlgo: "Algorithms & Logic",
        skillSysTitle: "Systems & Web", skillOS: "OS Architecture & Windows",
        levelLabels: ["", "Discovery", "Basics", "Operational", "Proficient", "Advanced"],
        projectsTitle: "Projects", filterAll: "All", tagAlgo: "Algorithms",
        proj1Title: "SAE S1.01 | Library Management",
        proj1Desc: "Design of a robust inventory system. Focus on data structures optimization.",
        proj1Details: "For the SAE S1.01 project, I designed a complete library inventory management system in C++.\n\nThis project allowed me to apply advanced algorithm concepts, specifically optimizing data structures to ensure smooth search and sorting operations, even with a large volume of references.\n\nThe console interface was designed to be intuitive, proving that a solid back-end can be paired with a good user experience.",
        proj2Title: "Vinted Tracker | Accounting Software",
        proj2Desc: "Custom tool for online sales tracking. Automation of net profit calculations.",
        proj2Details: "Vinted Tracker is a tool I developed in C++ using Object-Oriented Programming (OOP).\n\nThe goal was to meet a real need: tracking online sales accurately. The software automates the calculation of net profits, shipping costs management, and commercial margin analysis.\n\nThis project demonstrates my ability to analyze a business need and translate it into a clear, modular, and maintainable software architecture.",
        journeyTitle: "Journey",
        exp1Date: "Cybersecurity", exp1Desc: "Discovery internship in an engineering school specializing in embedded systems.",
        exp2Date: "Dev & Sys Admin", exp2Desc: "Software development (Python, C++), system administration on Linux and web.",
        exp3Date: "Analytics", exp3Desc: "Observation internship in Mathematics. Discovery of high-level scientific application.",
        contactTitle: "Let's collaborate!",
        contactLead: "Open to internship and work-study opportunities in software development or systems.",
        labelCV: "Curriculum Vitae"
    }
};

let currentLang = 'fr';

// --- TRADUCTION ---
window.changeLanguage = function (lang) {
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (el.id !== 'typewriter' && translations[lang][key] !== undefined) {
            el.innerHTML = translations[lang][key];
        }
    });

    updateSkillLevels();
    restartTypewriter();
};

// --- 2. MODE (clair / sombre) ---
window.setMode = function (mode) {
    document.documentElement.setAttribute('data-mode', mode);
    localStorage.setItem('pp-mode', mode);
};

// --- 3. ACCENT (bleu acier / ambre / rouge) ---
window.setAccent = function (accent) {
    document.documentElement.setAttribute('data-accent', accent);
    localStorage.setItem('pp-accent', accent);
    document.querySelectorAll('.accent-dot').forEach(dot => dot.classList.toggle('active', dot.dataset.accent === accent));
};

// --- 4. MODALS (PDF & PROJETS) ---
window.openModal = function (id) {
    document.getElementById(id).classList.add('active');
};

window.closeModal = function (event, id) {
    if (!event || event.target.id === id || event.target.classList.contains('close-btn')) {
        document.getElementById(id).classList.remove('active');
    }
};

window.openProjectModal = function (projectId) {
    document.getElementById('project-modal-title').innerHTML = translations[currentLang][projectId + 'Title'];
    document.getElementById('project-modal-desc').innerHTML = translations[currentLang][projectId + 'Details'];
    openModal('project-modal');
};

// --- MATRICE DE COMPÉTENCES ---
function updateSkillLevels() {
    document.querySelectorAll('.skill-row').forEach(row => {
        const level = parseInt(row.querySelector('.level-meter').dataset.level, 10);
        row.querySelector('.skill-level').textContent = translations[currentLang].levelLabels[level];
    });
}

function fillSkillMeter(meter) {
    const level = parseInt(meter.dataset.level, 10);
    const ticks = meter.querySelectorAll('span');
    ticks.forEach((tick, i) => {
        setTimeout(() => tick.classList.toggle('on', i < level), i * 80);
    });
}

// --- MACHINE À ÉCRIRE ---
let typeIndex = 0, charIndex = 0, isDeleting = false, currentTimeout;

function restartTypewriter() {
    clearTimeout(currentTimeout);
    typeIndex = 0; charIndex = 0; isDeleting = false;
    const el = document.getElementById('typewriter');
    if (el) el.innerHTML = '';
    typeWriterLoop();
}

function typeWriterLoop() {
    const element = document.getElementById('typewriter');
    if (!element) return;

    const roles = translations[currentLang].heroRoles;
    if (typeIndex >= roles.length) typeIndex = 0;
    const currentWord = roles[typeIndex];

    element.innerHTML = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
    charIndex += isDeleting ? -1 : 1;

    let typeSpeed = isDeleting ? 35 : 65;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1600;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typeIndex = (typeIndex + 1) % roles.length;
        typeSpeed = 400;
    }

    currentTimeout = setTimeout(typeWriterLoop, typeSpeed);
}

// --- NAVIGATION HORIZONTALE PAR ÉCRANS ---
const track = document.getElementById('slidesTrack');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slide-dot');
const slideCount = slides.length;
let currentSlide = 0;
let slideLocked = false;

function activateSlideContent(index) {
    const slide = slides[index];
    if (!slide) return;
    slide.querySelectorAll('.reveal:not(.active)').forEach(el => el.classList.add('active'));
    slide.querySelectorAll('.level-meter:not(.filled)').forEach(meter => {
        meter.classList.add('filled');
        fillSkillMeter(meter);
    });
}

function updateSlideChrome(index) {
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    document.querySelectorAll('[data-slide]').forEach(el => {
        if (el.classList.contains('slide-dot')) return;
        el.classList.toggle('active', Number(el.dataset.slide) === index);
    });
    const prevBtn = document.getElementById('slidePrev');
    const nextBtn = document.getElementById('slideNext');
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === slideCount - 1;
    const scrollBar = document.getElementById('scrollBar');
    if (scrollBar) scrollBar.style.width = (index / (slideCount - 1) * 100) + '%';
}

window.goToSlide = function (index) {
    index = Math.max(0, Math.min(slideCount - 1, index));
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}vw)`;
    updateSlideChrome(index);
    activateSlideContent(index);
    slideLocked = true;
    setTimeout(() => { slideLocked = false; }, 700);
};

function nextSlide() { if (!slideLocked) goToSlide(currentSlide + 1); }
function prevSlide() { if (!slideLocked) goToSlide(currentSlide - 1); }

// --- INITIALISATION ---
document.addEventListener('DOMContentLoaded', () => {

    // Langue
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => changeLanguage(btn.dataset.lang));
    });

    // Accent
    document.querySelectorAll('.accent-dot').forEach(dot => {
        dot.addEventListener('click', () => setAccent(dot.dataset.accent));
    });
    const savedAccent = localStorage.getItem('pp-accent');
    if (savedAccent) setAccent(savedAccent);

    // Mode clair/sombre
    const modeToggle = document.getElementById('modeToggle');
    modeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-mode');
        setMode(current === 'light' ? 'dark' : 'light');
    });

    // Menu mobile
    const navBurger = document.getElementById('navBurger');
    const mainNav = document.getElementById('mainNav');
    navBurger.addEventListener('click', () => mainNav.classList.toggle('open'));
    mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mainNav.classList.remove('open')));

    // Filtres de projets
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                const match = filter === 'all' || card.getAttribute('data-category').includes(filter);
                card.classList.toggle('hidden', !match);
            });
        });
    });

    // Liens/points/flèches de navigation par écran
    document.querySelectorAll('[data-slide]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            goToSlide(Number(el.dataset.slide));
        });
    });
    document.getElementById('slidePrev').addEventListener('click', prevSlide);
    document.getElementById('slideNext').addEventListener('click', nextSlide);

    // Clavier
    window.addEventListener('keydown', (e) => {
        if (document.querySelector('.modal-overlay.active')) return;
        if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); nextSlide(); }
        else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prevSlide(); }
    });

    // Molette : avance/recule d'écran une fois le contenu interne du slide
    // scrollé jusqu'à son bord (haut ou bas), sinon défilement normal à l'intérieur.
    let wheelLock = false;
    track.addEventListener('wheel', (e) => {
        const slide = slides[currentSlide];
        const atTop = slide.scrollTop <= 0;
        const atBottom = Math.ceil(slide.scrollTop + slide.clientHeight) >= slide.scrollHeight;
        if ((e.deltaY > 0 && atBottom) || (e.deltaY < 0 && atTop)) {
            e.preventDefault();
            if (wheelLock || slideLocked) return;
            wheelLock = true;
            setTimeout(() => { wheelLock = false; }, 700);
            e.deltaY > 0 ? nextSlide() : prevSlide();
        }
    }, { passive: false });

    // Tactile : swipe horizontal, seulement si le slide est à son bord vertical
    let touchStartX = 0, touchStartY = 0;
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    track.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
            dx < 0 ? nextSlide() : prevSlide();
        }
    }, { passive: true });

    // Premier écran
    updateSlideChrome(0);
    activateSlideContent(0);

    // Machine à écrire
    typeWriterLoop();
});
