const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let eyes = [];
let theta;

const mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Eyes {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    draw() {
        //draw eyes
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fillStyle = 'red';
        ctx.fill();

        //get angle between mouse and eye
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        theta = Math.atan2(dy, dx);

        //draw iris
        let iris_x = this.x + Math.cos(theta) * this.radius / 5;
        let iris_y = this.y + Math.sin(theta) * this.radius / 5;
        let iris_radius = this.radius / 1.3;
        ctx.beginPath();
        ctx.arc(iris_x, iris_y, iris_radius, 0, Math.PI * 2, true);
        ctx.fillStyle = 'white';
        ctx.fill();

        //draw pupil
        let pupil_x = this.x + Math.cos(theta) * this.radius / 2;
        let pupil_y = this.y + Math.sin(theta) * this.radius / 2;
        let pupil_radius = this.radius / 2.5;
        ctx.beginPath();
        ctx.arc(pupil_x, pupil_y, pupil_radius, 0, Math.PI * 2, true);
        ctx.fillStyle = 'black';
        ctx.fill();

        //draw pupil reflection
        ctx.beginPath();
        ctx.arc(pupil_x-pupil_radius/3, pupil_y-pupil_radius/3, pupil_radius/2, 0, Math.PI * 2, true);
        ctx.fillStyle = 'gray';
        ctx.fill();
    }
}

function init() {
    eyes = [];
    let overlapping = false;
    let protection = 1000; //max amount of eyes
    let counter = 0;
    let numEyes = 200;

    while (eyes.length < numEyes && counter < protection) {
        //creat an eye
        let eye = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.floor(Math.random() * 100) + 5
        };

        overlapping = false;
        for (let i = 0; i < eyes.length; i++) {
            let previousEye = eyes[i];
            let dx = eye.x - previousEye.x;
            let dy = eye.y - previousEye.y;
            let distance = Math.sqrt(dx * dx + dy * dy);    //distance of x(y) between previousEye and next eye

            if (distance < (eye.radius + previousEye.radius)) {
                overlapping = true;
                break;
            }
        }
        if (!overlapping) {
            eyes.push(new Eyes(eye.x, eye.y, eye.radius));
        }
        counter++;
    }
}

function animate() {
    requestAnimationFrame(animate);
    var gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 100, canvas.width / 2, canvas.height / 2, canvas.width);
    gradient.addColorStop(0, 'rgba(255,255,255,0.25)');
    gradient.addColorStop(1, 'rgba(20,20,20,0.25)');

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < eyes.length; i++) {
        eyes[i].draw();
    }
}
init();
animate();
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});