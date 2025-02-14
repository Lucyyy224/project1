let font;
let sampleFactor = 0.1;
let points = [];
let effectType = 1;

function preload() {
  font = loadFont('Coolvetica_Rg.otf'); 
}

function setup() {
  createCanvas(600, 600);
  textFont(font);
  generatePoints();
}

function draw() {
  background(0);

  fill(255);
  textSize(16);
  text("Press 1-9 to change effect", 20, 30);

  if (effectType === 1) {
    
    fill(255);
    noStroke();
    for (let p of points) {
      ellipse(p.x, p.y, 5, 5);
    }
  } else if (effectType === 2) {
    
    fill(255, 0, 0);
    noStroke();
    for (let p of points) {
      let yOffset = sin(frameCount * 0.05 + p.x * 0.05) * 10;
      ellipse(p.x, p.y + yOffset, 5, 5);
    }
  } else if (effectType === 3) {
    // 3. 噪声抖动
    fill(0, 255, 0);
    noStroke();
    for (let p of points) {
      let xOffset = noise(p.x * 0.01, frameCount * 0.01) * 10 - 5;
      let yOffset = noise(p.y * 0.01, frameCount * 0.01) * 10 - 5;
      ellipse(p.x + xOffset, p.y + yOffset, 5, 5);
    }
  } else if (effectType === 4) {
    
    fill(255, 255, 0);
    noStroke();
    for (let p of points) {
      let xOffset = random(-2, 2);
      let yOffset = random(-2, 2);
      ellipse(p.x + xOffset, p.y + yOffset, 5, 5);
    }
  } else if (effectType === 5) {
    
    fill(0, 255, 255);
    noStroke();
    for (let p of points) {
      p.y += 2; 
      if (p.y > height) {
        p.y = random(-50, 50); 
      }
      ellipse(p.x, p.y, 5, 5);
    }
  } else if (effectType === 6) {
    
    stroke(255);
    noFill();
    beginShape();
    for (let p of points) {
      vertex(p.x, p.y);
    }
    endShape();
  } else if (effectType === 7) {
    
    fill(255, 0, 255);
    noStroke();
    for (let p of points) {
      let angle = frameCount * 0.02;
      let xOffset = cos(angle) * 10;
      let yOffset = sin(angle) * 10;
      ellipse(p.x + xOffset, p.y + yOffset, 5, 5);
    }
  } else if (effectType === 8) {
    
    fill(255, 150);
    noStroke();
    for (let p of points) {
      let dissolve = random() > 0.99 ? random(-10, 10) : 0;
      ellipse(p.x + dissolve, p.y + dissolve, 5, 5);
    }
  } else if (effectType === 9) {
    
    fill(100, 200, 255);
    noStroke();
    for (let p of points) {
      let xOffset = sin(frameCount * 0.05 + p.y * 0.1) * 5;
      ellipse(p.x + xOffset, p.y, 5, 5);
    }
  }
}

function generatePoints() {
  points = font.textToPoints('404 Not Found', 80, 300, 80, { 
    sampleFactor: sampleFactor
  }).map(p => ({ x: p.x, y: p.y, initFrame: frameCount }));
}

function keyPressed() {
  if (keyCode >= 49 && keyCode <= 57) { 
    effectType = keyCode - 48;
  } else if (keyCode === UP_ARROW) {
    sampleFactor += 0.01;
    generatePoints();
  } else if (keyCode === DOWN_ARROW) {
    sampleFactor = max(0.01, sampleFactor - 0.01);
    generatePoints();
  }
}
