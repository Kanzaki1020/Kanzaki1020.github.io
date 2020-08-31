const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const partiColor = '#00336d';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

//get mouse position*****************************************************
let mouse = {
    x: undefined,
    y: undefined,
    radius: (canvas.height / 100) * (canvas.width / 100)
}
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

//crete particle***********************************************************
class Particle {
    constructor(x, y, dirX, dirY, size, color) {
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.color = color;
    }
    //draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = partiColor;
        ctx.fill();
    }
    //check particle position
    update() {

        //check if particle with in canvas or not
        if (this.x > canvas.width || this.x < 0) {
            this.dirX = -this.dirX;
        }
        if (this.y > canvas.width || this.y < 0) {
            this.dirY = -this.dirY;
        }

        //check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        //distance of partical and mouse
        let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        //move distance of particles, when particles touch mouse radius
        let offsetRange = 10;

        if (distance < mouse.radius + this.size) {

            //particle on the right/left of mouse, let it go right/left
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += offsetRange;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= offsetRange;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += offsetRange;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= offsetRange;
            }
        }
        //move particle
        this.x += this.dirX;
        this.y += this.dirY;

        //draw particle
        this.draw();
    }
}

//create particle array****************************************************
function init() {
    particlesArray = [];
    let numOfParticles = (canvas.height * canvas.width * 3) / 9000;
    for (let i = 0; i < numOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let dirX = (Math.random() * 10) - 2.5;
        let dirY = (Math.random() * 10) - 2.5;
        let color = partiColor;

        particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
    }
}

//check if particles are close enought to draw line between them*******************
function connect() {
    let opacity = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = Math.pow((particlesArray[a].x - particlesArray[b].x), 2) + Math.pow((particlesArray[a].y - particlesArray[b].y), 2);
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacity = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(0,51,109,' + opacity + ')';
                ctx.linewidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

//animtaion loop******************************************************************
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}
init();
animate();

//resize window event*****************************************************************
window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = Math.pow((canvas.height / 80), 2);
    init();
});

//mouse of window**********************************************************************
window.addEventListener('mouseout', function () {

    mouse.x = undefined;
    mouse.y = undefined;

});



/*********************************↑ Particle Effect ↑*********************************/