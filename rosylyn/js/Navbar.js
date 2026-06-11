function loadNavbar() {
    const oldNav = document.querySelector('.navbar');
    if (oldNav) oldNav.remove();

    const currentLang = localStorage.getItem("resumeLang") || "cn";
    const langMap = {
        cn: {
            title: "个人简历",
            info: "个人信息",
            skill: "专业技能",
            edu: "教育经历",
            project: "项目经历",
            competition: "竞赛经历",
            campus: "校园实践",
            works: "作品链接",
            switchBtn: "EN / 中文"
        },
        en: {
            title: "Resume",
            info: "Personal Info",
            skill: "Skills",
            edu: "Education",
            project: "Projects",
            competition: "Competitions",
            campus: "Campus Activities",
            works: "Works",
            switchBtn: "CN / English"
        }
    };
    const txt = langMap[currentLang];

    const navbar = document.createElement('nav');
    navbar.className = 'navbar';
    navbar.innerHTML = `
        <canvas id="nav-particle"></canvas>
        <div class="nav-container">
            <h2 class="nav-title">${txt.title}</h2>
            <ul class="nav-list">
                <li><a href="#info">${txt.info}</a></li>
                <li><a href="#skill">${txt.skill}</a></li>
                <li><a href="#edu">${txt.edu}</a></li>
                <li><a href="#project">${txt.project}</a></li>
                <li><a href="#competition">${txt.competition}</a></li>
                <li><a href="#campus">${txt.campus}</a></li>
                <li><a href="#works">${txt.works}</a></li>
                <button id="langSwitch">${txt.switchBtn}</button>
            </ul>
        </div>
    `;
    document.body.insertBefore(navbar, document.body.firstChild);

    const langBtn = document.getElementById("langSwitch");
    langBtn.addEventListener("click", ()=>{
        console.log("切换语言");
        let curr = localStorage.getItem("resumeLang") || "cn";
        curr = curr === "cn" ? "en" : "cn";
        localStorage.setItem("resumeLang", curr);
        renderResume();
    });
}