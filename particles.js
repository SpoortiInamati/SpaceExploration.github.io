const canvas = document.getElementById("spaceParticles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Two star layers for parallax effect
let bgStars = [];
let fgStars = [];

class Star {
    constructor(isForeground = false) {
        this.isForeground = isForeground;
        this.reset(true);
    }

    reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : canvas.height + 10;

        if (this.isForeground) {
            this.depth = Math.random() * 1.2 + 1.5;
            this.size = this.depth * (Math.random() * 1.2 + 0.7);
            this.speedY = this.depth * (Math.random() * 0.3 + 0.1);
            this.speedX = (Math.random() - 0.5) * 0.12 * this.depth;
        } else {
            this.depth = Math.random() * 1 + 0.3;
            this.size = this.depth * (Math.random() * 0.7 + 0.3);
            this.speedY = this.depth * (Math.random() * 0.15 + 0.03);
            this.speedX = (Math.random() - 0.5) * 0.04 * this.depth;
        }
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;

        if (this.y < -20 || this.x < -20 || this.x > canvas.width + 20) {
            this.reset();
        }
    }

    draw() {
        const glow = this.isForeground ? 255 : 180;
        const alpha = this.isForeground ? 0.9 : 0.45;

        const color = `rgba(${glow}, ${glow}, 255, ${alpha})`;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = color;

        ctx.shadowBlur = this.isForeground ? this.size * 5 : this.size * 2;
        ctx.shadowColor = color;

        ctx.fill();
    }
}

function createStars() {
    bgStars = [];
    fgStars = [];

    for (let i = 0; i < 800; i++) bgStars.push(new Star(false));
    for (let i = 0; i < 350; i++) fgStars.push(new Star(true));
}

function animate() {
    // FULLY CLEAR FRAME — NO DARK OVERLAY
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bgStars.forEach(s => { s.update(); s.draw(); });
    fgStars.forEach(s => { s.update(); s.draw(); });

    requestAnimationFrame(animate);
}

createStars();
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
});
