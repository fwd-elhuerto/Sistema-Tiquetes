// elementos del dom
const nuevaconsulta =document.getElementById("consulta")
const btnGuardar =document.getElementById("btnGuardar")
const histConsultas =document.getElementById("histConsultas")
const profesor =document.getElementById("profesor")
const activas =document.getElementById("activas")
const busqueda =document.getElementById("busqueda")
const buscar =document.getElementById("buscar")
const welcome =document.getElementById("welcome")
const btnSalir = document.getElementById("btnSalir")

//imports
import { postUsuarios, getUsuarios } from "../services/servicesUsuarios.js"
import { postConsultas, getConsultas, putConsultas, deleteConsultas } from "../services/servicesConsultas.js"

//constantes
const timestamp = Date.now(); //fecha en segundos
const fechaActual = new Date(timestamp);
const usuarioEnSesion = sessionStorage.getItem("usuarioLogueado"); // se trae de sessionStorage el usuario actual
const traerUsuarios = await getUsuarios(); // traer usuarios
const usuarioLogueado = traerUsuarios.find(u => u.usuario === usuarioEnSesion); // se busca el usuario actual en el db.json
console.log(usuarioLogueado);

// Eventos de botones
buscar.addEventListener("click", function () {
    buscarConsultas()
})

btnSalir.addEventListener("click", function(){
    sessionStorage.clear()
    window.location.href = "../pages/login.html"
   
})

btnGuardar.addEventListener("click", async function () {
   if (nuevaconsulta.value.trim() != "") { // validacion de espacios vacios
    
    const duda={ 
        consulta: nuevaconsulta.value,
        fecha: fechaActual,
        estado: true, // el estdo true es para las consultas sin resolver
        profesor: profesor.value,
        usuario: usuarioLogueado.usuario,
        sede: usuarioLogueado.sede,
        comentario: "" 
    } // se guarda la consulta
    await Swal.fire('Consulta Enviada', 'Las consultas se atienden por orden de hora segun la cola del profesor', 'success');
    const respuesta = await postConsultas(duda); // se sube la consulta al db.json
    nuevaconsulta.value= "";
    await mostrarDuda(); // se actualiza la pantalla
    
} else{
    await Swal.fire('Error al guardar', 'Debe ingresar una tarea', 'error');
}
})

// Funciones
async function buscarConsultas() {
    const dudaRecibida = await getConsultas();
    let search =dudaRecibida.filter(filtroNommbre => filtroNommbre.consulta.toLowerCase().includes(busqueda.value.toLowerCase()) )
    // .filter para buscar valores en la lista, .toLowerCase para que no afecte la mayúscula
    histConsultas.textContent = "";
    mostrarDuda(search) // se llama la funcion con la lista filtrada como parametro
}


async function mostrarDuda(lista = null) { // lista igual null para usarla con una lista o sin ella
    const dudaRecibida = lista || await getConsultas(); // si no tiene parametro llama la lista del db.json
    activas.textContent = ""; // vacia el contenedor
    histConsultas.textContent = "";
    const misConsultas = dudaRecibida.filter(c => c.usuario === usuarioEnSesion); // .filter para ver solo las tareas del usuario logueado
    let retroVistas = JSON.parse(localStorage.getItem("retroVistas")) || []; 

    for (let index = 0; index < misConsultas.length; index++) { // se recorre la lista filtrada
        const elementCon = misConsultas[index];
        console.log(misConsultas);
        

        let areaConsulta =document.createElement("div");
        let consulta =document.createElement("h3");
        let fecha = document.createElement("p");
        let profe = document.createElement("p");
        let comentario = document.createElement("p");
        let eliminar = document.createElement("button");

        consulta.textContent= elementCon.consulta
        const fechaFormateada = new Date(elementCon.fecha).toLocaleString(); // fecha en formato normal
        fecha.textContent = "Generada: " + fechaFormateada;
        profe.textContent ="Dirigida a:" + " " + elementCon.profesor
        comentario.textContent = "Comentarios privado: " + " " + elementCon.comentario
        eliminar.textContent = "Eliminar";
        welcome.textContent = "Bienvenido " + usuarioLogueado.usuario

        eliminar.addEventListener("click", async function () {
           const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "Esta consulta se eliminará de forma permanente",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33', 
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });
            if (result.isConfirmed) {
                await deleteConsultas(elementCon.id, elementCon);
                await Swal.fire('Eliminada', 'La consulta ha sido eliminada.', 'success');
                mostrarDuda(); // refrescar la lista después de borrar
            }
        })

        if (elementCon.estado === true) { // si la consulta esta pendiente:
            activas.appendChild(areaConsulta)
            areaConsulta.appendChild(consulta);
            areaConsulta.appendChild(fecha);
            areaConsulta.appendChild(profe);
            areaConsulta.appendChild(eliminar);
            areaConsulta.style.backgroundColor = "black"
            areaConsulta.style.borderRadius = "20px";
            areaConsulta.style.border = "2px solid black";

        }else { // si no esta pendiente:
            histConsultas.appendChild(areaConsulta);
            areaConsulta.appendChild(consulta);
            areaConsulta.appendChild(fecha);
            areaConsulta.appendChild(profe);
            areaConsulta.appendChild(comentario);
            areaConsulta.style.backgroundColor = "black"
            areaConsulta.style.borderRadius = "20px";
            areaConsulta.style.border = "2px solid black";

            if (elementCon.comentario && !retroVistas.includes(elementCon.id)) { // verifica si la consulta ya tiene comentario
                await Swal.fire('Nueva retroalimentación', 'El profesor respondió:' + elementCon.comentario, 'info');
                retroVistas.push(elementCon.id) // se pushea el id a la lista del localstorage
                console.log(retroVistas);
                
            }
        }
    }
    localStorage.setItem("retroVistas", JSON.stringify(retroVistas)); // se actualiza la lista local
}
mostrarDuda()

