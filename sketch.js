function setup() {
  createCanvas(600,400);
}

//variaveis da bolinha 
let xBolinha = 295
let yBolinha = 200
let dBolinha = 30
let raio = dBolinha / 2

//variaveis da raquete
let xRaquete = 5
let yRaquete = 150
let larguraRaquete = 10
let alturaRaquete  = 90

//variaveis da raquete do oponente 
let xRaqueteOponente = 585
let yRaqueteOponente = 150
let velocidadeYOponente;


let colidiu = false

//variavel da velocidade 
let velocidadeXBolinha = 5
let velocidadeYBolinha = 5

//placar
let meusPontos = 0
let pontosOponente = 0

//funcao do painel
  function draw() {
    background(0)
    mostraBolinha()
  	movimentaBolinha()
    verificaColisao()
    raquete(xRaquete, yRaquete)
    raquete(xRaqueteOponente, yRaqueteOponente)
    movimentarRaquete()
    colisaoMinhaRaqueteBiblioteca()
    verificaColisaoRaquete()
    movimentaRaqueteOponente()
    colisaoMinhaRaqueteOponenteBiblioteca()
    incluirPlacar()
    marcaPonto()
  	
}

//funcao para desenhar bolinha
function mostraBolinha(){
   circle(xBolinha, yBolinha, dBolinha)
}

//funcao para colocar movimento a bolinha com velocidade
function movimentaBolinha(){
  xBolinha += velocidadeXBolinha
  yBolinha += velocidadeYBolinha
}

//funcao para verificar o toque da bolinha a borda do painel
function verificaColisao(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1
  }
  if (yBolinha  > height || yBolinha - raio  < 0){
    velocidadeYBolinha *= -1
  }
}

//funcao para definir a raquete no painel com parametros dos eixos x e y juntamente com largura e altura
function raquete(x, y){
  rect(x, y, larguraRaquete, alturaRaquete)
}

//funcao para movimentar a raquete no eixo y (para cima e para baixo)
function movimentarRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 5
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 5
  }
}

//funcao para verificar o toque da bolinha a raquete invertendo os valores para mudar a trajetoria da bolinha apos a colisao
function verificaColisaoRaquete(){
  if(xBolinha - raio < xRaquete + larguraRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1
  }
}

//funcao para verificar o toque da bolinha na raquete da biblioteca p5Collid2D
function colisaoMinhaRaqueteBiblioteca(){
	colidiu = collideRectCircle(xRaquete,yRaquete,larguraRaquete,alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
  }
}

function colisaoMinhaRaqueteOponenteBiblioteca(){
	colidiu = collideRectCircle(xRaqueteOponente,yRaqueteOponente,larguraRaquete,alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
  }
}

function movimentaRaqueteOponente(){
   velocidadeYOponente = yBolinha - yRaqueteOponente -  larguraRaquete / 2 - 70
  yRaqueteOponente += velocidadeYOponente
}

function incluirPlacar(){
  textAlign(CENTER)
  textSize(22)
  fill(color(255, 150, 0))
  rect(150, 8.5, 40, 20)
  fill(255)
  text(meusPontos, 170, 26)
  fill(color(255, 150, 0))
  rect(450, 8.5, 40, 20)
  fill(255)
  text(pontosOponente, 470, 26)
}

function marcaPonto(){
  if (xBolinha > 585){
    meusPontos += 1;
  }
  if (xBolinha < 15){
    pontosOponente += 1;
  }
}
