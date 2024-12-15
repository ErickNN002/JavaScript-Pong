function setup() {
  createCanvas(800, 600);
  colorMode(HSB)
  
  //Cor da bolinha
  mudancaCor = 0;
  cor = 60;

  //Posição da bolinha
  posicaoBX = 400;
  posicaoBY = 300;
  
  //Velocidade da bolinha
  vel = 5;
  velX = vel;
  velY = vel;
  
  //Medidas da bolinha
  diam = 20;
  raio = diam / 2;
  
  //Medidas da raquete
  largura = 10;
  altura = 100;
  
  //Posição da raquete
  posicaoXRaquete = 5;
  posicaoYRaquete = height / 2 - altura / 2;
  
  //Velocidade
  velRaquete = 10;
  
  //Raquete do oponente
  posicaoXOponente =  width - largura - 5;
  posicaoYOponente = height / 2 - altura / 2;
  i = 0;
  aleatorio = 0;
  aleatorio2 = 0;
  
  //Pontuação
  pontosOponente = 0;
  pontosJogador = 0;
  tamanhoP = 100;
  alturaPonto = height / 2 + 35;
  altPontoOponente = height / 2 + 35 + ((height / 2 + 35) - posicaoYOponente) * -1;
  
  //Sons
  somColisao;
  somPonto;
  musica;
  
  musica.loop()
}

function draw() {
  background(0, 50, 25);
  fundo ();
  pontuacao(pontosJogador, width / 5 , alturaPonto);
  pontuacao(pontosOponente, width * 4/ 5 , altPontoOponente);
  bolinha();
  movimento();
  colisao(); 
  linha(75, alturaPonto, 5, posicaoYRaquete);
  linha(width - 75, altPontoOponente, width - 5, posicaoYOponente);
  raquete(posicaoXRaquete, posicaoYRaquete, 0, 100, 10, 0);
  movimentoRaquete();
  colisaoRaquete();
  raquete(posicaoXOponente, posicaoYOponente, 100, 0, 0, 10);
  movimentoOponente();
  colisaoOponente();

}

//Bolinha
function bolinha() {
  noStroke();
  fill(mudancaCor, 100, 100);
  circle(posicaoBX, posicaoBY, diam);
}


function movimento() {
  posicaoBX += velX;
  posicaoBY += velY;
}


function colisao() {
  if(posicaoBX > width - raio || posicaoBX < 0 + raio){
    velX *= -1;
    mudancaCor += cor;
    if(mudancaCor == 360){
      mudancaCor = 0;
    }
    somColisao.play();
    if(posicaoBX < width / 2){
      pontosOponente += 1;
      somPonto.play();
    }
    else{
      pontosJogador += 1;
      somPonto.play();
    }
  }
  if(posicaoBY > height - raio || posicaoBY < 0 + raio){
    velY *= -1;
    mudancaCor += cor;
    if(mudancaCor == 360){
      mudancaCor = 0;
    }
    somColisao.play();
  }
}

//Raquetes
function raquete(x, y, corRaquete1, corRaquete2, a, b) {
  stroke(0, corRaquete2, corRaquete1);
  strokeWeight(3)
  fill(0, corRaquete1, corRaquete2);
  rect(x, y, largura, altura, a, b, a, b);
}

//Raquete do jogador
function movimentoRaquete() {
  if (keyIsDown(UP_ARROW)) {
    if(posicaoYRaquete > 0) { //Limite
      posicaoYRaquete -= velRaquete;
      alturaPonto -= velRaquete / 4;
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    if(posicaoYRaquete + altura < height) { //Limite
      posicaoYRaquete += velRaquete;
      alturaPonto += velRaquete / 4;

    }
  }
}


function colisaoRaquete() {
  if(posicaoBY > posicaoYRaquete && posicaoBY < posicaoYRaquete + altura) {
    if(posicaoBX - raio < posicaoXRaquete + largura / 2){
      velX *= -1;
      mudancaCor += cor;
      if(mudancaCor == 360){
        mudancaCor = 0;
      }
      somColisao.play();
      if(posicaoBX - raio < posicaoXRaquete + largura / 2 - 1){
        posicaoBX = posicaoXRaquete + 10;
      }
    }
  }
}

//Raquete do oponente
function movimentoOponente() {
  if (posicaoBX > width * 3 / 4) {
    setTimeout(function(){
      if(i == 20){
        aleatorio = random(-45, 45);
        i *= -1;
        aleatorio2 = 0;
      }
      i += 1;
      if(aleatorio < 0) {
        aleatorio2 += aleatorio / 50 * i;
      }  
      if(aleatorio > 0) {
        aleatorio2 += aleatorio / 50 * i;
      }
      posicaoYOponente += (posicaoBY - altura / 2) - (posicaoYOponente + aleatorio2);
  }, 50);
  }
  else{
    if (posicaoBX > width / 2) {
      if(i == 20){
      aleatorio = random(-30, 30);
      i *= -1;
      aleatorio2 = 0;
    }
    i += 1;
    if(aleatorio < 0) {
      aleatorio2 += aleatorio / 50 * i;
    }  
    if(aleatorio > 0) {
      aleatorio2 += aleatorio / 50 * i;
    }
    posicaoYOponente += (posicaoBY - altura / 2) - (posicaoYOponente + aleatorio2);
  }
    else{
      posicaoYOponente = posicaoBY - altura / 2;
    }
  }
    altPontoOponente = height / 2 + 35 + ((((height / 2) - posicaoYOponente) * -1) / 4);
}


function colisaoOponente() {
  if(posicaoBY > posicaoYOponente && posicaoBY < posicaoYOponente + altura) {
    if(posicaoBX + raio > posicaoXOponente) {
      velX *= -1;
      mudancaCor += cor;
      if(mudancaCor == 360){
        mudancaCor = 0;
      }
      somColisao.play();
      if(posicaoBX + raio > posicaoXOponente + 1){
        posicaoBX = posicaoXOponente - 10;
      }
    }
  }
}


function pontuacao(pontos, x, y) {
  corPonto = (360 / height * posicaoBY);
  stroke(corPonto, 25, 25);
  strokeWeight(5);
  fill(corPonto, 25, 15);
  textAlign(CENTER);
  textSize(tamanhoP);
  text(pontos, x, y);
}


function linha(x, y, x2, y2){
  stroke(corPonto, 100, 100, 0.2);
  strokeWeight(5);
  line(x, y - 35, x2, y - 35);
  line(x2, y - 35, x2, y2 + altura / 2);

 }

//som
function preload(){
  somColisao = loadSound("raquetada.mp3");
  somPonto = loadSound("ponto.mp3");
  musica = loadSound("trilha.mp3");
  }

//fundo
function fundo(){
  fill(220, 50, 25);
  noStroke();
    quad(0, 0, width / 4, 0, width * 3/ 4, height, 0, height);
}
