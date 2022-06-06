let palabras = [["alura","javascript","html","css","oracle"],["argentina","brasil","uruguay","colombia","venezuela"]]
let categoria = -1


function elegirCategoriaProgramacion(){
  categoria = 0
  reset()
  actualizarLista()
  return categoria

}

function elegirCategoriaPaises(){
  categoria = 1
  reset()
  actualizarLista()
  return categoria
}




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
let inputPalabraEliminada = document.getElementById('inputEliminar')
let listaPalabras = document.getElementById('pistas')
listaPalabras.classList.add('d-none')

function empezar(){
  if(categoria !== -1){
    btnEmpezar.innerHTML = "Empezar a Jugar"
    statusJuego = true
    btnReinicar.classList.remove('d-none')
    contadorErrores.classList.remove('d-none')
    imagenInicio.classList.add('d-none')
    if(errores < 1){
    btnEmpezar.classList.add('d-none')
    elegirPalabra();
    generarBotones();
    mostrarAdivinadas();
    dibujarAhorcado(errores);
  }
  } else {
    alert ("Debe seleccionar una categoria primero.")
  }
}


function capturarPalabraAgregar(){
    let nuevaPalabra = document.getElementById("inputAgregar").value
    return nuevaPalabra.toLowerCase()

    
}
function capturarPalabraEliminar(){
  let nuevaPalabra = document.getElementById("inputEliminar").value
  return nuevaPalabra.toLowerCase()

  
}


let btnAgregar = document.getElementById('input')

function agregarPalabra(){
  nuevaPalabra = capturarPalabraAgregar();
  let criterio = /^[a-zA-Z]+$/ //solo se aceptan letras 
  if(palabras[categoria].indexOf(nuevaPalabra) < 0 && criterio.test(nuevaPalabra)){
  palabras[categoria].push(nuevaPalabra);
  alert ('Se agregó "'+ nuevaPalabra +'" a la lista.')
  actualizarLista()
  inputNuevaPalabra.value = ""
  return

  } if (palabras[categoria].indexOf(nuevaPalabra) > 0){
    alert('La palabra "' + nuevaPalabra + '" ya se encuentra en la lista.')
    inputNuevaPalabra.value = ""
  } if (nuevaPalabra.length == 0) {
    alert('No ingreso ninguna palabra.')
    return
  } if (!criterio.test(nuevaPalabra)){
    alert('Solo se admiten letras (sin espacios, numeros o caracteres especiales).')
  } 
};

function eliminarPalabra(){
  palabraEliminada = capturarPalabraEliminar();
  let criterio = /^[a-zA-Z]+$/ //solo se aceptan letras 
  if(palabras[categoria].indexOf(palabraEliminada) >= 0 && criterio.test(palabraEliminada)){
    palabras[categoria].splice(palabras[categoria].indexOf(palabraEliminada),1);
  alert ('Se eliminó "'+ palabraEliminada +'" de la lista.')
  actualizarLista()
  inputPalabraEliminada.value = ""
  return

  } if (palabras[categoria].indexOf(palabraEliminada) < 0){
    alert('La palabra "' + palabraEliminada + '" no se encuentra en la lista.')
    inputNuevaPalabra.value = ""
  } if (palabraEliminada.length == 0) {
    alert('No ingreso ninguna palabra para eliminar.')
    return
  } if (!criterio.test(palabraEliminada)){
    alert('Solo se admiten letras (sin espacios, numeros o caracteres especiales).')
  } 
};




function elegirPalabra() {
  palabraAdivinar = palabras[categoria][Math.floor(Math.random() * palabras[categoria].length)];
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
    actualizarLista()
  } else {
    listaPalabras.classList.add('d-none')
  }
}

function actualizarLista(){
if (categoria < 0) {
  listaPalabras.innerHTML = "seleccione una categoria"
} else {
  listaPalabras.innerHTML = palabras[categoria]
}
}

