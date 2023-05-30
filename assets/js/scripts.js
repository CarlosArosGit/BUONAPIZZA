var arrayIngredientes = [];

const asignarEventos = () => {
    let arrayChecks = document.getElementsByClassName('form-check-input');
    let btnEnviar = document.getElementById('btnEnviar');
    let inputPropina = document.getElementById('inputPropina');
    for (let inputCheck of arrayChecks) {
        inputCheck.addEventListener('click', guardarIngredientes);
    }
    btnEnviar.addEventListener('click', enviarPedido);
    inputPropina.addEventListener('click', inputPropinaClick);
};

const guardarIngredientes = (ingredienteSeleccionado) => {
    let valueIngrediente = ingredienteSeleccionado.srcElement.defaultValue;
    let estadoCheck = ingredienteSeleccionado.srcElement.checked;
    let ingredienteSeleccionados = document.getElementById('ingredienteSeleccionados');
    if (estadoCheck == true) {
        arrayIngredientes.push(valueIngrediente);
    }
    else if (estadoCheck == false) {
        eliminarIngrediente(valueIngrediente);
    }
    let ingredientesSeleccionados = '';
    for (let ingrediente of arrayIngredientes) {
        ingredientesSeleccionados += ingrediente + ',';
    }
    ingredienteSeleccionados.innerText = ingredientesSeleccionados;
    filtrarIngredientesExtra();
    revisarExtras();
    totalExtras();
}
const filtrarIngredientesExtra = () => {
    let ingredienteExtrasSeleccionados = document.getElementById('ingredienteExtrasSeleccionados');
    let ingredienteExtras = '';
    if (arrayIngredientes.length > 3) {
        for (let i = 3; i < arrayIngredientes.length; i++) {
            ingredienteExtras += arrayIngredientes[i] + ',';
        }
        ingredienteExtrasSeleccionados.innerText = ingredienteExtras;
    }
}
const revisarExtras = () => {
    let ingredienteExtrasSeleccionados = document.getElementById('ingredienteExtrasSeleccionados');
    if (arrayIngredientes.length <= 3) {
        ingredienteExtrasSeleccionados.innerText = '';
    }
};
const eliminarIngrediente = (ingrediente) => {
    for (let i = 0; i < arrayIngredientes.length; i++) {
        if (arrayIngredientes[i] == ingrediente) {
            let indiceEliminar = i;
            arrayIngredientes.splice(indiceEliminar, 1);
        }
    }
};
const totalExtras = () => {
    let detalleExtra = document.getElementById('detalleExtra');
    if (arrayIngredientes.length > 3) {
        let totalIngredientesExtras = arrayIngredientes.length - 3;
        let totalExtra = totalIngredientesExtras * 800;
        detalleExtra.innerText = totalExtra;
    } else if (arrayIngredientes.length <= 3) {
        detalleExtra.innerText = 0;
    }
};
const inputPropinaClick = () => {
    let inputPropinaValor = document.getElementById('inputPropina').value;
    let detallePropina = document.getElementById('detallePropina');
    if(inputPropinaValor == 0){
        document.getElementById('inputPropina').value = 1000;
        detallePropina.innerHTML = 1000;
    }
};
$("#inputPropina").on("change", function () {
    let detallePropina = document.getElementById('detallePropina');
    let mensaje = document.getElementById('mensaje');
    let inputPropinaValor = document.getElementById('inputPropina').value;
    detallePropina.innerHTML = inputPropinaValor;
    if (inputPropinaValor < 1000) {
        mensaje.innerText = 'El monto minimo para propina es $1000';
        document.getElementById('inputPropina').value = 1000;
        detallePropina.innerHTML = 1000;
    } else if (inputPropinaValor >= 1000) {
        mensaje.innerText = '';
    }
});

const enviarPedido = () => {
    let detallePropina = document.getElementById('detallePropina').innerHTML;
    let totalPizza = document.getElementById('totalPizza').innerHTML;
    let detalleExtra = document.getElementById('detalleExtra').innerHTML;
    let mensaje = document.getElementById('mensaje');
    if (arrayIngredientes.length >= 3 && detallePropina != '') {
        let totalPizzaXL = Number(totalPizza) + Number(detalleExtra) + Number(detallePropina);
        mensaje.innerText = `Su pedido se ha realizado con exito por un total de $${totalPizzaXL}. Gracias por su propina de $${detallePropina}`;
    }else if(detallePropina == ''){
        mensaje.innerText = 'Aun no ha definido una propina';
    }else if(arrayIngredientes.length == 0){
        alert('Aun no ha seleccionado ningún ingrediente');
    }else if(arrayIngredientes.length == 1){
        alert('Aun puedes elegir 2 ingredientes gratis');
    }else if(arrayIngredientes.length == 2){
        alert('Aun puedes elegir 1 ingredientes gratis');
    }
};
