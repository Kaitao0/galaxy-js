const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let comets = [];

function setup() {
    for (let i = 0; i < 200; i++) {
        stars.push(createStar());
    }
    animate();
}

function createStar() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
    };
}

function createComet() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 50 + 50,
        speed: Math.random() * 2 + 2,
        angle: Math.random() * Math.PI * 2
    };
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gradient for cosmic effect
    let gradient = ctx.createRadialGradient(
        canvas.width / 2, 
        canvas.height / 2, 
        0, 
        canvas.width / 2, 
        canvas.height / 2, 
        canvas.width / 1.5
    );
    gradient.addColorStop(0, 'rgba(20, 20, 40, 1)');
    gradient.addColorStop(1, 'rgba(0, 0, 10, 1)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();

        star.x += star.dx;
        star.y += star.dy;

        if (star.x > canvas.width) star.x = 0;
        if (star.x < 0) star.x = canvas.width;
        if (star.y > canvas.height) star.y = 0;
        if (star.y < 0) star.y = canvas.height;
    });

    // Occasionally add a comet
    if (Math.random() < 0.01) {
        comets.push(createComet());
    }

    // Draw comets
    comets.forEach((comet, index) => {
        ctx.beginPath();
        
        const tailX = comet.x - comet.length * Math.cos(comet.angle);
        const tailY = comet.y - comet.length * Math.sin(comet.angle);
        
        const gradientComet = ctx.createLinearGradient(comet.x, comet.y, tailX, tailY);
        gradientComet.addColorStop(0, 'rgba(255,255,100,1)');
        gradientComet.addColorStop(1, 'rgba(255,50,50,0)');
        
        ctx.strokeStyle = gradientComet;
        ctx.lineWidth = comet.length / 20;
        
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(tailX, tailY);
        
        ctx.stroke();

        comet.x += comet.speed * Math.cos(comet.angle);
        comet.y += comet.speed * Math.sin(comet.angle);

        if (comet.x > canvas.width || comet.x < 0 || comet.y > canvas.height || comet.y < 0) {
            comets.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

setup();