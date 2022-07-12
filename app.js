const canvas = document.getElementById('canvas1');

canvas.width = 350;
canvas.height = 480;

const ctx = canvas.getContext('2d');

// Mouse coordinate object
const mouse = {
  x: undefined,
  y: undefined
}

let hue = 0;

// Particles array 
const particleArray = [];

// Particles class
class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 10 + 1
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = 'hsl(' + hue + ',100%,50%)';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) {
      this.size -= 0.01;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

}
// Touch event for mobile phones specific
// For pc or laptop you can replace these
// two functions with below touch event
// functions 
/*
canvas.addEventListener('click', (e) => {
  mouse.x = e.x
  mouse.y = e.y
  initParticles(10);
});

canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  initParticles(1);
});
*/
// Touch trailing of particles
canvas.addEventListener('touchstart', (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
  initParticles(10);
}, false);

// Touch trailing of particles
canvas.addEventListener('touchmove', (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
  initParticles(1);
}, false);

// Initialise the particles 
function initParticles(n) {
  for (let i = 0; i < n; i++) {
    particleArray.push(new Particle());
  }
}

// Handle all particles' update and drawing 
function handleParticles() {
  particleArray.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.size < 0.3) {
      particleArray.splice(index, 1);
    }
  });
}

//Animating the particles 
function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue += 5;
  requestAnimationFrame(animate);
}

animate();
