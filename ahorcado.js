var palabras = ["alura","javascript","html","css","oracle"]

let palabraAdivinar = '';
let maximoErrores = 6;
document.getElementById('maximoErrores').innerHTML = maximoErrores;
let errores = 0;
let letrasAdivinadas = [];
let statusPalabra = null;
var statusJuego = false

let btnReinicar = document.getElementById('reiniciar')
let btnEmpezar = document.getElementById('empezar')
btnReinicar.classList.add('d-none')
let contadorErrores = document.getElementById('contadorErrores')
contadorErrores.classList.add('d-none')

let imagenInicio = document.querySelector("#fotoInicio")
let inputNuevaPalabra = document.getElementById('inputAgregar')

let listaPalabras = document.getElementById('pistas')
listaPalabras.classList.add('d-none')

function empezar(){
  statusJuego = true
  btnReinicar.classList.remove('d-none')
  contadorErrores.classList.remove('d-none')
  imagenInicio.classList.add('d-none')
  if(errores < 1){
  btnEmpezar.classList.add('d-none')
  generarBotones()
  elegirPalabra();
  generarBotones();
  mostrarAdivinadas();
  dibujarAhorcado(errores);
  } else (
    reset()
  )
}


function capturarTexto(){
    let nuevaPalabra = document.querySelector("input").value
    return nuevaPalabra.toLowerCase()

    
}


let btnAgregar = document.getElementById('input')

function agregarPalabra(){
  nuevaPalabra = capturarTexto();
  let criterio = /^[a-zA-Z]+$/ //solo se aceptan letras 
  if(palabras.indexOf(nuevaPalabra) < 0 && criterio.test(nuevaPalabra)){
  palabras.push(nuevaPalabra);
  alert ('se agrego "'+ nuevaPalabra +'" a la lista')
  inputNuevaPalabra.value = ""
  return

  } if (palabras.indexOf(nuevaPalabra) > 0){
    alert('la palabra "' + nuevaPalabra + '" ya se encuentra en la lista')
    inputNuevaPalabra.value = ""
  } if (nuevaPalabra.length == 0) {
    alert('no ingreso ninguna palabra')
    return
  } if (!criterio.test(nuevaPalabra)){
    alert('solo se admiten letras (sin espacios ni numeros)')
  } 
};




function elegirPalabra() {
  palabraAdivinar = palabras[Math.floor(Math.random() * palabras.length)];
}

function generarBotones() {
  if (statusJuego == true){
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letra =>
    `
      <button
        class="btn btn-primary"
        id='` + letra + `'
        onClick="elegirLetra('` + letra + `')"
      >
        ` + letra + `
      </button>
    `).join('');

  document.getElementById('teclado').innerHTML = buttonsHTML;
}
}

function elegirLetra(letraElegida) {
  letrasAdivinadas.indexOf(letraElegida) === -1 ? letrasAdivinadas.push(letraElegida) : null;
  document.getElementById(letraElegida).setAttribute('disabled', true);

  if (palabraAdivinar.indexOf(letraElegida) >= 0) {
    mostrarAdivinadas();
    revisarVictoria();
  } else if (palabraAdivinar.indexOf(letraElegida) === -1) {
    errores++;
    actualizarError();
    revisarPerdida();
    dibujarAhorcado(errores);
  }
}

function dibujarAhorcado(errores) {
  document.getElementById('imagenAhorcado').src = './img/ahorcado' + errores + '.png';
}

function revisarVictoria() {
  if (statusPalabra === palabraAdivinar) {
    document.getElementById('teclado').innerHTML = 'Ganaste!!!';
  }
}

function revisarPerdida() {
  if (errores === maximoErrores) {
    document.getElementById('palabraAdivinar').innerHTML = 'La respuesta era: ' + palabraAdivinar;
    document.getElementById('teclado').innerHTML = 'Perdiste!!!';
  }
}

function mostrarAdivinadas() {
  statusPalabra = palabraAdivinar.split('').map(letra => (letrasAdivinadas.indexOf(letra) >= 0 ? letra : " _ ")).join('');

  document.getElementById('palabraAdivinar').innerHTML = statusPalabra;
}

function actualizarError() {
  document.getElementById('errores').innerHTML = errores;
}

function reset() {
  if(statusJuego){
  errores = 0;
  letrasAdivinadas = [];
 

  elegirPalabra();
  mostrarAdivinadas();
  actualizarError();
  generarBotones();
  dibujarAhorcado(errores);
  } else {
    null
  } 
}

function verLista(){
  if (listaPalabras.classList.contains('d-none')){
    listaPalabras.classList.remove('d-none')
    listaPalabras.innerHTML = palabras.join(" , ")
  } else {
    listaPalabras.classList.add('d-none')
  }
}




