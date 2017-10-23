'use strict';
//Celula class to manage its properties
var tamanoTablero = 100;   //size of bidimentional array
var tamanoCelula = 5;
var tablero = new Array(tamanoTablero);    //create the variable for the game
var jugando = false;
var canvas = document.querySelector("#tablero");
canvas.style.backgroundColor = '#000';
var contexto = canvas.getContext('2d');

var btnIniciar = document.querySelector('#btnIniciar');
var btnDetener = document.querySelector('#btnDetener');
var btnResetear = document.querySelector('#btnResetear');
var inputRandoms = document.querySelector('#randoms');
var lblCorridas = document.querySelector('#lblCorridas');

contexto.fillStyle = '#f00';
contexto.strokeStyle = '#f00';
var proceso;
var reproducciones = 0;
// contexto.fillRect(0,0,tamanoCelula,tamanoCelula)
// contexto.fillRect(12,0,tamanoCelula,tamanoCelula)
// contexto.fillRect(0,12,tamanoCelula,tamanoCelula)
// contexto.fillRect(12,12,tamanoCelula,tamanoCelula)
var vivas = [];
var muertas = [];
//alert("un mensaje");
class Celula{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    // izquierda;
    // supIzquierda;
    // infIzquierda;
    // derecha;
    // supDerecha;
    // infDerecha;
    // arriba;
    // abajo;
    // status = 0;     //0 for death, 1 for life
    getposicion(){
        return 'x: '+this.x+' y: '+this.y;;
    }
}

this.llenarTablero();



//fill the varaible in a bidimentional array
function llenarTablero(){
    //console.log('llenar tablero');
    for(let i = 0; i<tamanoTablero;i++){
        tablero[i] = new Array(tamanoTablero);
        for(let j=0;j<tamanoTablero;j++){
            let celula = new Celula(i,j);
            celula.status = 0; //initialize as death cell
            tablero[i][j] = celula;//add a new Celula
        }
    }
    crearRelaciones();
}

//define all neighbors for each Celula in tablero
function crearRelaciones(){
    //console.log('crear relaciones');
    for(let i = 0; i<tamanoTablero; i++){
        for(let j=0; j<tamanoTablero; j++){
            if(i == 0){
                tablero[i][j].izquierda = tablero[tamanoTablero-1][j];
            }else{
                tablero[i][j].izquierda = tablero[i-1][j]; 
            }

            if(i == tamanoTablero-1){
                tablero[i][j].derecha = tablero[0][j]; 
            }else{
                tablero[i][j].derecha = tablero[i+1][j];
            }
            
            if(j == 0){
                tablero[i][j].arriba = tablero[i][tamanoTablero-1];
            }else{
                tablero[i][j].arriba = tablero[i][j-1];
            }

            if(j == tamanoTablero-1){
                tablero[i][j].abajo = tablero[i][0];
            }else{
                tablero[i][j].abajo = tablero[i][j+1];
            }          
        }
    }
    crearRelacionesEsquinas();
}

btnIniciar.addEventListener('click', function(e) {
    if (jugando) {
        return;
    }
    jugando = true;
    iniciar();

    proceso = setTimeout(function run() {
        iniciar();
        if(vivas.length < 1){
            alert("todas murieron :(");
            jugando = false;
            return;
        }
        vivas = [];
        muertas =[];
        jugando = true;
        //contexto.clearRect(0,0,500,500);
        proceso = setTimeout(run, 30);
    }, 30);
});

btnDetener.addEventListener('click', function(e){
    if (jugando) {
        clearTimeout(proceso);
        jugando = false;
    }
});

btnResetear.addEventListener('click', function(e){
    if(!jugando){
        contexto.clearRect(0,0,500,500);
        reproducciones = 0;
        tablero = new Array(tamanoTablero);
        vivas = [];
        muertas = [];
        lblCorridas.innerHTML = reproducciones;
        llenarTablero();
    }
});

function crearRelacionesEsquinas(){
    //console.log('crear relaciones esquinas');
    for(let i = 0; i<tamanoTablero; i++){
        for(let j=0; j<tamanoTablero; j++){
            tablero[i][j].infDerecha = tablero[i][j].derecha.abajo;
            tablero[i][j].supDerecha = tablero[i][j].derecha.arriba;
            
            tablero[i][j].infIzquierda = tablero[i][j].izquierda.abajo;
            tablero[i][j].supIzquierda = tablero[i][j].izquierda.arriba;
        }
    }
    //this.mostrarTablero();
    llenarCanvas();
}

function iniciar(){
    //console.log('iniciar');
    //while(jugando){
        // if(vivas.length < 1){
        //     alert("todas murierons :(");
        //     break;
        // }
        // vivas = [];
        // contexto.clearRect(0,0,500,500);
        for(let i = 0; i<tamanoTablero; i++){
            for(let j=0; j<tamanoTablero; j++){
                let celula = tablero[i][j];
                if(celula.status == 1){//if alive
                    let vivasAlrededor = 0;
                    if(celula.abajo.status == 1)
                        vivasAlrededor ++;

                    if(celula.arriba.status == 1)
                        vivasAlrededor ++;

                    if(celula.derecha.status == 1)
                        vivasAlrededor ++;

                    if(celula.izquierda.status == 1)
                        vivasAlrededor ++;

                    if(celula.infDerecha.status == 1)
                        vivasAlrededor ++;

                    if(celula.infIzquierda.status == 1)
                        vivasAlrededor ++;

                    if(celula.supDerecha.status == 1)
                        vivasAlrededor ++;
                    
                    if(celula.supIzquierda.status == 1)
                        vivasAlrededor ++;

                    if(vivasAlrededor == 2 || vivasAlrededor == 3){
                        vivas.push(celula);
                        //console.log('viva');
                    }else{
                        //celula.status = 0;
                        muertas.push(celula);
                        //console.log('muerta');
                    }

                }else{  //if it's dead
                    let vivasAlrededorM = 0;
                    
                    if(celula.abajo.status == 1)
                        vivasAlrededorM ++;

                    if(celula.arriba.status == 1)
                        vivasAlrededorM ++;

                    if(celula.derecha.status == 1)
                        vivasAlrededorM ++;

                    if(celula.izquierda.status == 1)
                        vivasAlrededorM ++;

                    if(celula.infDerecha.status == 1)
                        vivasAlrededorM ++;

                    if(celula.infIzquierda.status == 1)
                        vivasAlrededorM ++;

                    if(celula.supDerecha.status == 1)
                        vivasAlrededorM ++;
                    
                    if(celula.supIzquierda.status == 1)
                        vivasAlrededorM ++;
                    
                    if(vivasAlrededorM == 3){
                        //celula.status = 1;
                        vivas.push(celula);
                        //console.log('viva');
                    }  
                }              
            }
        }
        pintarVivas();
    //}
}

function llenarCanvas(){
    //console.log('llenar canvas');
    let randomsInput = inputRandoms.value;
    if(randomsInput == ''){
        randomsInput = 600;
    }
    //const randoms = 450;
    for (let i = 0; i < randomsInput; i++) {
        let x = Math.floor((Math.random() * tamanoTablero));
        let y = Math.floor((Math.random() * tamanoTablero));
        let celula = tablero[x][y]
        celula.status = 1; //change to alive
        vivas.push(celula);
    }
    pintarVivas();
}
function pintarVivas(){
    //console.log('pintar vivas');
    contexto.clearRect(0,0,500,500);
    reproducciones++;
    lblCorridas.innerHTML = reproducciones;
    for (let i = 0; i < vivas.length; i++) {
        let celula = vivas[i];
        celula.status = 1;
        let newX = celula.x * tamanoCelula;
        let newY = celula.y * tamanoCelula;
        contexto.fillRect(newX,newY,tamanoCelula,tamanoCelula);
    }
    actualizarMuertas();
}

function actualizarMuertas(){
    for (let i = 0; i < muertas.length; i++) {
        let celula = muertas[i];
        celula.status = 0;
    }
}