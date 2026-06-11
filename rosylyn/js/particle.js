// particle.js 完整重写
let navParticles = [];
const navMouse = { x: 0, y: 0, active: false };
let navCtx = null;
let navCanvas = null;
let navDom = null;

let footerParticles = [];
const footerMouse = { x: 0, y: 0, active: false };
let footerCtx = null;
let footerCanvas = null;
let footerDom = null;

const gatherRadius = 80;
const light = document.createElement('div');
light.className = 'light-circle';

class Particle {
    constructor(areaWidth, areaHeight) {
        this.x = Math.random() * areaWidth;
        this.y = Math.random() * areaHeight;
        this.radius = Math.random() * 2 + 1;
        this.color = 'rgba(180, 210, 255, 0.7)';
        this.vx = Math.random() * 0.6 - 0.3;
        this.vy = Math.random() * 0.6 - 0.3;
        this.baseVx = this.vx;
        this.baseVy = this.vy;
    }

    update(mouse, areaW, areaH) {
        if (mouse.active) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < gatherRadius) {
                this.vx = dx * 0.03;
                this.vy = dy * 0.03;
            } else {
                this.vx = this.baseVx;
                this.vy = this.baseVy;
            }
        } else {
            this.vx = this.baseVx;
            this.vy = this.baseVy;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > areaW) this.vx *= -1;
        if (this.y < 0 || this.y > areaH) this.vy *= -1;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// 导航栏粒子初始化（给 navbar.js 调用）
function initNavParticle() {
    navDom = document.querySelector('.navbar');
    navCanvas = document.getElementById("nav-particle");
    if (!navCanvas || !navDom) return;

    navCtx = navCanvas.getContext("2d");
    const w = navCanvas.offsetWidth;
    const h = navCanvas.offsetHeight;
    navCanvas.width = w;
    navCanvas.height = h;
    navParticles = [];
    for (let i = 80; i > 0; i--) {
        navParticles.push(new Particle(w, h));
    }

    // 导航鼠标事件
    navDom.addEventListener('mousemove', e => {
        const rect = navCanvas.getBoundingClientRect();
        navMouse.x = e.clientX - rect.left;
        navMouse.y = e.clientY - rect.top;
        light.style.left = e.clientX + 'px';
        light.style.top = e.clientY + 'px';
    });
    navDom.addEventListener('mouseenter', () => {
        navMouse.active = true;
        navDom.appendChild(light);
        light.style.opacity = 1;
    });
    navDom.addEventListener('mouseleave', () => {
        navMouse.active = false;
        light.style.opacity = 0;
    });

    window.addEventListener('resize', () => {
        const w = navCanvas.offsetWidth;
        const h = navCanvas.offsetHeight;
        navCanvas.width = w;
        navCanvas.height = h;
        navParticles = [];
        for (let i = 80; i > 0; i--) {
            navParticles.push(new Particle(w, h));
        }
    });
}

// 页脚粒子初始化（给 footer.js 调用）
function initFooterParticle() {
    footerDom = document.querySelector('footer');
    footerCanvas = document.getElementById("footer-particle");
    if (!footerCanvas || !footerDom) return;

    footerCtx = footerCanvas.getContext("2d");
    const w = footerCanvas.offsetWidth;
    const h = footerCanvas.offsetHeight;
    footerCanvas.width = w;
    footerCanvas.height = h;
    footerParticles = [];
    for (let i = 60; i > 0; i--) {
        footerParticles.push(new Particle(w, h));
    }

    // 页脚鼠标事件
    footerDom.addEventListener('mousemove', e => {
        const rect = footerCanvas.getBoundingClientRect();
        footerMouse.x = e.clientX - rect.left;
        footerMouse.y = e.clientY - rect.top;
        light.style.left = e.clientX + 'px';
        light.style.top = e.clientY + 'px';
    });
    footerDom.addEventListener('mouseenter', () => {
        footerMouse.active = true;
        footerDom.appendChild(light);
        light.style.opacity = 1;
    });
    footerDom.addEventListener('mouseleave', () => {
        footerMouse.active = false;
        light.style.opacity = 0;
    });

    window.addEventListener('resize', () => {
        const w = footerCanvas.offsetWidth;
        const h = footerCanvas.offsetHeight;
        footerCanvas.width = w;
        footerCanvas.height = h;
        footerParticles = [];
        for (let i = 60; i > 0; i--) {
            footerParticles.push(new Particle(w, h));
        }
    });
}

// 全局统一动画循环，页面加载完成后启动
window.addEventListener('load', function animateLoop() {
    if (navCtx && navCanvas) {
        navCtx.clearRect(0, 0, navCanvas.width, navCanvas.height);
        navParticles.forEach(p => {
            p.update(navMouse, navCanvas.width, navCanvas.height);
            p.draw(navCtx);
        });
    }
    if (footerCtx && footerCanvas) {
        footerCtx.clearRect(0, 0, footerCanvas.width, footerCanvas.height);
        footerParticles.forEach(p => {
            p.update(footerMouse, footerCanvas.width, footerCanvas.height);
            p.draw(footerCtx);
        });
    }
    requestAnimationFrame(animateLoop);
});