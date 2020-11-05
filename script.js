const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 360
canvas.height = 600

const background = new Image()
background.src = `images/planet2.jpeg`

const hero = new Image()
hero.src = 'images/hero.png'

const weapon = new Image()
weapon.src = 'images/lazer.png'

const weapon2 = new Image()
weapon2.src = 'images/nuke.png'

const enemies = new Image()
enemies.src = 'images/enemy.png'

let space = { x: 0, y: 0, w: canvas.width, h: canvas.height }

let ship = { 
    x: (canvas.width / 2)-50, 
    y: (canvas.height - 160), 
    w: 70, 
    h: 80, 
    
}
const alien = [];

setInterval(function () {
    let wooki = {
      x: Math.random() * canvas.width - 50,
      y: 0,
      w: 70,
      h: 50
      
    }
  
    alien.push(wooki)
  
}, 3000)

let speed = 1

function drawAlien() {
  
    //Loop thru all obstacles
    for (let obs of alien) {
      obs.y += speed
      ctx.drawImage(enemies, obs.x, obs.y, obs.w, obs.h)
      detectCollisionBullet(obs)
      detectCollisionNukes(obs)
      detectCollision(obs)
      
      if (obs.y > canvas.height) {
        survive++
        speed++
        alien.shift()
      }
    }
}

let score = 0;
let survive = 0;

let bullets = [];


function shootGun() {
    console.log('shoot')
    //Make a new bullet when we shoot 
    let bullet = {
      x: ship.x+20, 
      y: (ship.y +35), 
      w: 10, 
      h: 20
    }
    //Push to our bullets array
    bullets.push(bullet)
}

function drawBullets() {
    for (let bullet of bullets) {
      bullet.y -= 10
      ctx.fillStyle = 'silver'
      ctx.drawImage(weapon, bullet.x, bullet.y, bullet.w, bullet.h)
    }
}

let nukes = []

function shootNuke() {
    console.log('shoot nuke')
    //Make a new bullet when we shoot 
    let nuke = {
      x: ship.x+70, 
      y: (ship.y +35), 
      w: 10, 
      h: 20
    }
    //Push to our bullets array
    nukes.push(nuke)
}

function drawNukes() {
    for (let nuke of nukes) {
      nuke.y -= 10
      ctx.fillStyle = 'silver'
      ctx.drawImage(weapon2, nuke.x, nuke.y, nuke.w, nuke.h)
    }
  }


window.onkeydown = function (event) {
    //Change object depending on what key i hit
    switch (event.key) {
      case 'ArrowLeft':
        ship.x -= 10
        break;
      case 'ArrowRight':
        ship.x += 10
        break;
      case 'ArrowUp':
        ship.y -= 10
        break;
      case 'ArrowDown':
        ship.y += 10
        break;
      case ' ':
        shootGun()
        break;
      case 'n':
        shootNuke()
        break;
    
    }
}

function detectCollisionBullet(obs) {
    let i = 0;
    for (let bullet of bullets) {
      if (bullet.x < obs.x + obs.w &&
        bullet.x + bullet.w > obs.x &&
        bullet.y < obs.y + obs.h &&
        bullet.y + bullet.h > obs.y) {
        
        // car.bullets.splice(i, 1)
        alien.splice(alien.indexOf(obs), 1)
        i++;
        score++
      }
    }
}
function detectCollisionNukes(obs) {
    let i = 0;
    for (let nuke of nukes) {
      if (nuke.x < obs.x + obs.w &&
        nuke.x + nuke.w > obs.x &&
        nuke.y < obs.y + obs.h &&
        nuke.y + nuke.h > obs.y) {
        
        // car.bullets.splice(i, 1)
        alien.splice(alien.indexOf(obs), 1)
        i++;
        score++
      }
    }
}

function detectCollision(obs) {
    if (ship.x < obs.x + obs.w &&
      ship.x + ship.w > obs.x &&
      ship.y < obs.y + obs.h &&
      ship.y + ship.h > obs.y) {
      // collision detected!
      //console.log('collision!')
      cancelAnimationFrame(animationId)
      alert(`-They got you solder but your battle was faught bravely!  -You took down ${score} of those fighter ships! -We still have to clean up your mess. ${survive} of those aliens slipped right by you. `  )
      
      //window.location.reload()
    }
  }





let animationId = null

//Animate == Takes a function as an argument 
//Cleared and drawn again
function animate() {
  animationId = requestAnimationFrame(animate)
  //Clear the whole board 
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  //Redraw everything 
  ctx.drawImage(background, space.x, space.y, space.w, space.h)

  ctx.drawImage(hero, ship.x, ship.y, ship.w, ship.h)
  drawBullets()
  drawNukes()
  drawAlien()
//   drawObstacle() // detectCollision()

}
animate()