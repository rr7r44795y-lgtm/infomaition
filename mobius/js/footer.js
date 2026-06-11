function loadFooter() {
    const oldFooter = document.querySelector('.footer');
    if (oldFooter) oldFooter.remove();

    const currentLang = localStorage.getItem("resumeLang") || "cn";
    const langMap = {
        cn: {
            copyright: "甘棠 © 2026 个人简历",
            buildTime: "制作时间：2026年06月"
        },
        en: {
            copyright: "Rosylyn © 2026 Resume",
            buildTime: "Created: June 2026"
        }
    };
    const txt = langMap[currentLang];

    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
        <canvas id="footer-particle"></canvas>
        <div class="footer-content">
            <p>${txt.copyright}</p>
            <p>${txt.buildTime}</p>
        </div>
    `;
    document.body.appendChild(footer);
    initFooterParticle();
}