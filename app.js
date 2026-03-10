// --- 1. DICTIONNAIRE DE TRADUCTION & MOTS EN BOUCLE ---
const translations = {
    fr: {
        heroRoles: ["Développeur C++", "Concepteur de Solutions", "Administrateur Système", "Créateur Web", "Passionné d'Algorithmique"],
        navAccueil: "Accueil", navApropos: "À Propos", navCompetences: "Compétences", navProjets: "Projets", navParcours: "Parcours", navContact: "Contact",
        heroQuote: "« On ne construit pas son parcours en avançant en ligne droite, mais en explorant, en essayant, en recommençant. »",
        btnCV: "Visualiser mon CV", btnCVShort: "Voir mon CV",
        aboutTitle: "L'informatique, <br><span class='accent-text'>une évidence.</span>",
        aboutP1: "J'ai toujours eu une attache particulière avec l'informatique et la tech en général. Étant fils d'informaticien, j'ai toujours été baigné dans cet environnement numérique.",
        aboutP2: "Ce portfolio reflète ce mouvement : celui d'un esprit qui cherche à comprendre, à créer et à s'améliorer continuellement.",
        tagTeam: "#EspritDÉquipe", tagClient: "#RelationClient", tagCuriosity: "#Curiosité",
        eduTag: "En cours (2025 - 2026)", eduTitle: "Formation <span class='accent-text'>Actuelle</span>",
        eduDesc: "Formation technique approfondie axée sur le développement de logiciels, la conception orientée objet (C++), l'administration système et la gestion de bases de données.", eduLink: "Découvrir mon établissement →",
        skillsTitle: "Compétences", skillsDesc: "* Les jauges représentent mon affinité et ma passion pour ces technologies.",
        skillDevTitle: "Développement & Algorithmique", skillCpp: "C++ (POO) ⭐ Favori", skillAlgo: "Algorithmique & Logique", skillSysTitle: "Systèmes & Web", skillOS: "Architecture OS & Windows",
        projectsTitle1: "Réalisations", projectsTitle2: "& Projets", filterAll: "Tous", tagAlgo: "Algorithmique",
        proj1Title: "SAE S1.01 | Gestion de Bibliothèque", proj1Desc: "Conception d'un système robuste de gestion d'inventaire. Focus sur l'optimisation des structures de données.",
        proj2Title: "Vinted Tracker | Logiciel de Comptabilité", proj2Desc: "Conception en C++ (POO) d'un outil personnalisé pour le suivi des ventes en ligne. Automatisation du calcul des bénéfices.",
        journeyTitle1: "Expériences", journeyTitle2: "& Parcours",
        exp1Date: "Cybersécurité", exp1Desc: "Stage de découverte au sein d'une école d'ingénieurs spécialisée dans les systèmes embarqués.",
        exp2Date: "Développement & Sys", exp2Desc: "Développement logiciel (Python, C++), administration système sous Linux (Bash) et web.",
        exp3Date: "Analytique", exp3Desc: "Stage d'observation en Mathématiques. Découverte de l'application scientifique.",
        contactTitle: "Envie de collaborer ?"
    },
    en: {
        heroRoles: ["C++ Developer", "Solutions Designer", "System Administrator", "Web Creator", "Algorithm Enthusiast"],
        navAccueil: "Home", navApropos: "About", navCompetences: "Skills", navProjets: "Projects", navParcours: "Journey", navContact: "Contact",
        heroQuote: "« You don't build your path by walking a straight line, but by exploring, trying, and starting over. »",
        btnCV: "View Resume", btnCVShort: "View Resume",
        aboutTitle: "Computer Science, <br><span class='accent-text'>an obvious choice.</span>",
        aboutP1: "I have always had a special connection with IT and tech in general. Being the son of an IT specialist, I was always immersed in this digital environment.",
        aboutP2: "This portfolio reflects this movement: a mind seeking to understand, create, and continuously improve.",
        tagTeam: "#TeamSpirit", tagClient: "#ClientRelations", tagCuriosity: "#Curiosity",
        eduTag: "In Progress (2025 - 2026)", eduTitle: "Current <span class='accent-text'>Education</span>",
        eduDesc: "In-depth technical training focused on software development, OOP (C++), system administration, and databases.", eduLink: "Discover my institution →",
        skillsTitle: "Skills", skillsDesc: "* The bars represent my affinity and passion for these technologies.",
        skillDevTitle: "Development & Algorithms", skillCpp: "C++ (OOP) ⭐ Favorite", skillAlgo: "Algorithms & Logic", skillSysTitle: "Systems & Web", skillOS: "OS Architecture & Windows",
        projectsTitle1: "My", projectsTitle2: "Projects", filterAll: "All", tagAlgo: "Algorithms",
        proj1Title: "SAE S1.01 | Library Management", proj1Desc: "Design of a robust inventory system. Focus on data structures optimization.",
        proj2Title: "Vinted Tracker | Accounting Software", proj2Desc: "Custom tool for online sales tracking. Automation of net profit calculations.",
        journeyTitle1: "My", journeyTitle2: "Journey",
        exp1Date: "Cybersecurity", exp1Desc: "Discovery internship in an engineering school specializing in embedded systems.",
        exp2Date: "Dev & Sys Admin", exp2Desc: "Software development (Python, C++), system administration on Linux and web.",
        exp3Date: "Analytics", exp3Desc: "Observation internship in Mathematics. Discovery of high-level scientific application.",
        contactTitle: "Let's collaborate!"
    },
    es: {
        heroRoles: ["Desarrollador C++", "Diseñador de Soluciones", "Administrador de Sistemas", "Creador Web", "Apasionado por Algoritmos"],
        navAccueil: "Inicio", navApropos: "Sobre mí", navCompetences: "Habilidades", navProjets: "Proyectos", navParcours: "Trayectoria", navContact: "Contacto",
        heroQuote: "« No construyes tu camino avanzando en línea recta, sino explorando, intentando y volviendo a empezar. »",
        btnCV: "Ver mi CV", btnCVShort: "Ver mi CV",
        aboutTitle: "La informática, <br><span class='accent-text'>una evidencia.</span>",
        aboutP1: "Siempre he tenido un vínculo especial con la informática y la tecnología. Siendo hijo de un informático, siempre estuve inmerso en este entorno digital.",
        aboutP2: "Este portafolio refleja este movimiento: una mente que busca entender, crear y mejorar continuamente.",
        tagTeam: "#TrabajoEnEquipo", tagClient: "#RelaciónCliente", tagCuriosity: "#Curiosidad",
        eduTag: "En curso (2025 - 2026)", eduTitle: "Formación <span class='accent-text'>Actual</span>",
        eduDesc: "Formación técnica profunda centrada en el desarrollo de software, POO (C++), administración de sistemas y bases de datos.", eduLink: "Descubrir mi institución →",
        skillsTitle: "Habilidades", skillsDesc: "* Las barras representan mi afinidad y pasión por estas tecnologías.",
        skillDevTitle: "Desarrollo y Algoritmos", skillCpp: "C++ (POO) ⭐ Favorito", skillAlgo: "Algoritmos y Lógica", skillSysTitle: "Sistemas y Web", skillOS: "Arquitectura SO y Windows",
        projectsTitle1: "Mis", projectsTitle2: "Proyectos", filterAll: "Todos", tagAlgo: "Algoritmos",
        proj1Title: "SAE S1.01 | Gestión de Biblioteca", proj1Desc: "Diseño de un sistema robusto de gestión de inventario. Enfoque en la optimización de datos.",
        proj2Title: "Vinted Tracker | Software de Contabilidad", proj2Desc: "Herramienta personalizada para el seguimiento de ventas. Automatización del cálculo de beneficios.",
        journeyTitle1: "Mi", journeyTitle2: "Trayectoria",
        exp1Date: "Ciberseguridad", exp1Desc: "Práctica de descubrimiento en una escuela de ingeniería especializada en sistemas integrados.",
        exp2Date: "Desarrollo y Sistemas", exp2Desc: "Desarrollo de software (Python, C++), administración de sistemas Linux (Bash) y web.",
        exp3Date: "Analítica", exp3Desc: "Práctica de observación en Matemáticas. Descubrimiento de la aplicación científica.",
        contactTitle: "¿Colaboramos?"
    }, 
    zh: {
        heroRoles: ["C++ 开发者", "解决方案设计师", "系统管理员", "Web 创造者", "算法爱好者"],
        navAccueil: "首页", navApropos: "关于", navCompetences: "技能", navProjets: "项目", navParcours: "经历", navContact: "联系",
        heroQuote: "« 成功之路并非直线，而是在探索、尝试和重新开始中走出来的。 »",
        btnCV: "查看我的简历", btnCVShort: "查看简历",
        aboutTitle: "计算机科学, <br><span class='accent-text'>我必然的选择。</span>",
        aboutP1: "我一直对IT和科技有着特殊的感情。作为IT专家的儿子，我总是沉浸在这个数字环境中。",
        aboutP2: "这个作品集反映了这种追求：一个不断寻求理解、创造和持续改进的头脑。",
        tagTeam: "#团队精神", tagClient: "#客户关系", tagCuriosity: "#好奇心",
        eduTag: "进行中 (2025 - 2026)", eduTitle: "当前 <span class='accent-text'>教育</span>",
        eduDesc: "深入的技术培训，专注于软件开发、面向对象设计 (C++)、系统管理和数据库。", eduLink: "了解我的学校 →",
        skillsTitle: "技能", skillsDesc: "* 下方的进度条代表我对这些技术的亲和力和热情。",
        skillDevTitle: "开发与算法", skillCpp: "C++ (OOP) ⭐ 最爱", skillAlgo: "算法与逻辑", skillSysTitle: "系统与Web", skillOS: "操作系统架构与Windows",
        projectsTitle1: "我的", projectsTitle2: "项目", filterAll: "全部", tagAlgo: "算法",
        proj1Title: "SAE S1.01 | 图书馆管理", proj1Desc: "设计一个强大的库存管理系统。专注于优化数据结构。",
        proj2Title: "Vinted Tracker | 财务软件", proj2Desc: "使用C++设计的自定义在线销售跟踪工具。自动计算利润。",
        journeyTitle1: "我的", journeyTitle2: "经历",
        exp1Date: "网络安全", exp1Desc: "工程学校实习，专注于嵌入式系统和网络保护。",
        exp2Date: "开发与系统", exp2Desc: "软件开发 (Python, C++)，Linux系统管理与Web结构构建。",
        exp3Date: "分析", exp3Desc: "数学观察实习。发现应用于科学研究的高级数学。",
        contactTitle: "期待合作！"
    }
};

let currentLang = 'fr';

// VARIABLES POUR LA MACHINE A ECRIRE EN BOUCLE
let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;
let currentTimeout;

// FONCTION DE TRADUCTION
window.changeLanguage = function(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${lang}`).classList.add('active');
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (element.id !== 'typewriter' && translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    clearTimeout(currentTimeout);
    typeIndex = 0;
    charIndex = 0;
    isDeleting = false;
    document.getElementById("typewriter").innerHTML = "";
    typeWriterLoop();
};

// --- 2. THEME SWITCHER ---
window.setTheme = function(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
};

// --- 3. EASTER EGG (Code LEGO) ---
let keySequence = [];
const secretCode = "LEGO"; 
window.addEventListener('keydown', (e) => {
    if(document.activeElement.id === 'terminal-input') return;

    keySequence.push(e.key.toUpperCase());
    if(keySequence.length > secretCode.length) keySequence.shift();
    if(keySequence.join('') === secretCode) {
        setTheme('lego'); 
        const termBody = document.getElementById("terminal-body");
        if(termBody) termBody.innerHTML += `<p class="accent-text" style="color:#e3000f">Ouch! Vous avez marché sur une brique Lego ! (Mode activé)</p>`;
        toggleTerminal(true);
        keySequence = [];
    }
});

// --- 4. MODALS (PDF & TERMINAL) ---
window.openModal = function(id) {
    document.getElementById(id).classList.add('active');
    if(id === 'terminal-modal') setTimeout(() => document.getElementById('terminal-input').focus(), 100);
};

window.closeModal = function(event, id) {
    if(!event || event.target.id === id || event.target.classList.contains('red') || event.target.classList.contains('close-btn')) {
        document.getElementById(id).classList.remove('active');
    }
};

window.toggleTerminal = function(forceOpen = false) {
    const term = document.getElementById('terminal-modal');
    if(forceOpen || !term.classList.contains('active')) openModal('terminal-modal');
    else closeModal(null, 'terminal-modal');
};

// --- LOGIQUE DU TERMINAL ---
const termInput = document.getElementById('terminal-input');
const termBody = document.getElementById('terminal-body');
if(termInput) {
    termInput.addEventListener('keydown', function(e) {
        if(e.key === 'Enter') {
            let val = this.value.trim().toLowerCase();
            termBody.innerHTML += `<div><span class="prompt">pierre:~$</span> ${this.value}</div>`;
            
            switch(val) {
                case 'help': termBody.innerHTML += `<p>Commandes: <span class="accent-text">about</span>, <span class="accent-text">skills</span>, <span class="accent-text">contact</span>, <span class="accent-text">clear</span></p>`; break;
                case 'about': termBody.innerHTML += `<p>Je suis Pierre Puget, futur ingénieur / développeur spécialiste C++.</p>`; break;
                case 'skills': termBody.innerHTML += `<p>[ C++ (POO), Python, Linux/Bash, SQL, HTML/CSS ]</p>`; break;
                case 'contact': termBody.innerHTML += `<p>Email: pierre.puget@etu.univ-amu.fr</p>`; break;
                case 'clear': termBody.innerHTML = ''; break;
                case '': break;
                default: termBody.innerHTML += `<p>Commande introuvable: ${val}. Tapez 'help'.</p>`;
            }
            this.value = '';
            termBody.scrollTop = termBody.scrollHeight;
        }
    });
}

// --- MACHINE A ECRIRE EN BOUCLE ---
function typeWriterLoop() {
    const element = document.getElementById("typewriter");
    if (!element) return;

    const roles = translations[currentLang].heroRoles;
    if(typeIndex >= roles.length) typeIndex = 0;
    const currentWord = roles[typeIndex];

    if (isDeleting) {
        element.innerHTML = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        element.innerHTML = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typeIndex++;
        if (typeIndex >= roles.length) {
            typeIndex = 0;
        }
        typeSpeed = 500;
    }

    currentTimeout = setTimeout(typeWriterLoop, typeSpeed);
}

// --- INITIALISATION AU CHARGEMENT ---
document.addEventListener("DOMContentLoaded", () => {
    
    // Filtres de projets
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                if(filter === 'all' || card.getAttribute('data-category').includes(filter)) card.classList.remove('hidden');
                else card.classList.add('hidden');
            });
        });
    });

    // Curseur Custom Centré Parfaitement
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");
    const mouseGlow = document.querySelector(".mouse-glow");

    if (window.innerWidth > 900) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX; 
            const posY = e.clientY;
            
            // On utilise la propriété CSS Transform sur left/top de base à 0, 
            // c'est ce qui permet un centrage au pixel près sans lag.
            cursorDot.style.transform = `translate(calc(${posX}px - 50%), calc(${posY}px - 50%))`;
            
            cursorOutline.animate({ 
                transform: `translate(calc(${posX}px - 50%), calc(${posY}px - 50%))` 
            }, { duration: 500, fill: "forwards" });
            
            mouseGlow.animate({ 
                transform: `translate(calc(${posX}px - 50%), calc(${posY}px - 50%))` 
            }, { duration: 3000, fill: "forwards" });
        });
        
        // Effet de survol sur les éléments cliquables
        document.querySelectorAll("a, button, .theme-dot, .progress-wrap").forEach(link => {
            link.addEventListener("mouseenter", () => {
                cursorOutline.style.width = "60px";
                cursorOutline.style.height = "60px";
                cursorOutline.style.backgroundColor = "rgba(0, 255, 163, 0.1)";
            });
            link.addEventListener("mouseleave", () => {
                cursorOutline.style.width = "40px";
                cursorOutline.style.height = "40px";
                cursorOutline.style.backgroundColor = "transparent";
            });
        });
    }

    // Parallaxe (Texte de fond)
    window.addEventListener("scroll", () => {
        const bg = document.getElementById('parallax-text');
        if(bg) bg.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.2}px))`;
    });

    // Effet Tilt 3D (Formation uniquement)
    const tiltElements = document.querySelectorAll('.tilt-effect');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            if(window.innerWidth <= 900) return;
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;
            const centerX = rect.width / 2; const centerY = rect.height / 2;
            el.style.transform = `perspective(1000px) rotateX(${((y - centerY)/centerY)*-10}deg) rotateY(${((x - centerX)/centerX)*10}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        el.addEventListener('mouseleave', () => el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
    });

    // Barre de progression haut & Bouton retour en haut
    const scrollBar = document.getElementById("scrollBar");
    const progressWrap = document.querySelector('.progress-wrap');
    
    const updateProgress = function () {
        const scroll = window.scrollY || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        
        if(scrollBar) scrollBar.style.width = ((scroll / height) * 100) + "%";
        
        if(progressWrap) {
            if (scroll > 150) progressWrap.classList.add('active-progress');
            else progressWrap.classList.remove('active-progress');
        }
    }
    updateProgress();
    window.addEventListener("scroll", updateProgress);

    // Apparition au Scroll (Reveal)
    const reveals = document.querySelectorAll(".reveal");
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    reveals.forEach(reveal => revealOnScroll.observe(reveal));

    // Barres de compétences
    const skillBars = document.querySelectorAll(".progress-fill");
    const fillBarsOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute("data-width"); 
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); 
    skillBars.forEach(bar => fillBarsOnScroll.observe(bar));

    // Lancer la machine à écrire
    typeWriterLoop();
});
