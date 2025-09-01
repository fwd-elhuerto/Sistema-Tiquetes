const nuevaconsulta =document.getElementById("consulta")
const btnGuardar =document.getElementById("btnGuardar")
const histConsultas =document.getElementById("histConsultas")
const profesor =document.getElementById("profesor")
const activas =document.getElementById("activas")
const busqueda =document.getElementById("busqueda")
const buscar =document.getElementById("buscar")


import { postUsuarios, getUsuarios } from "../services/servicesUsuarios.js"
import { postConsultas, getConsultas, putConsultas, deleteConsultas } from "../services/servicesConsultas.js"
const timestamp = Date.now();
const fechaActual = new Date(timestamp);
const usuarioEnSesion = sessionStorage.getItem("usuarioLogueado");
const traerUsuarios = await getUsuarios();
const usuarioLogueado = traerUsuarios.find(u => u.usuario === usuarioEnSesion);
console.log(usuarioLogueado);

// Eventos de botones
buscar.addEventListener("click", function () {
    buscarConsultas()
})

btnGuardar.addEventListener("click", async function () {
   if (nuevaconsulta.value.trim() != "") {
    
    const duda={ 
        consulta: nuevaconsulta.value,
        fecha: fechaActual,
        estado: true,
        profesor: profesor.value,
        usuario: usuarioLogueado.usuario,
        sede: usuarioLogueado.sede,
        comentario: ""
    }
    await Swal.fire('Consulta Enviada', 'Las consultas se atienden por orden de hora segun la cola del profesor', 'success');
    const respuesta = await postConsultas(duda);
    await mostrarDuda();

     await Swal.fire('Consulta Enviada', 'Las consultas se atienden por orden de hora segun la cola del profesor', 'success');
    const respuesta = await postConsultas(duda)
    
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
    mostrarDuda(search)
}


async function mostrarDuda(lista = null) {
    const dudaRecibida = lista || await getConsultas();
    activas.textContent = "";
    histConsultas.textContent = "";
    const misConsultas = dudaRecibida.filter(c => c.usuario === usuarioEnSesion);
    let retroVistas = JSON.parse(localStorage.getItem("retroVistas")) || [];

    for (let index = 0; index < misConsultas.length; index++) {
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

        eliminar.addEventListener("click", async function () {
            await deleteConsultas(elementCon.id, elementCon)
            await mostrarDuda(); // mostrar sin actualizar 
        })

        if (elementCon.estado === true) {
            activas.appendChild(areaConsulta)
            areaConsulta.appendChild(consulta);
            areaConsulta.appendChild(fecha);
            areaConsulta.appendChild(profe);
            areaConsulta.style.backgroundColor = " rgb(164, 31, 221)"
            areaConsulta.style.borderRadius = "20px";
            areaConsulta.style.border = "2px solid black";

            areaConsulta.appendChild(eliminar)
        }else {
            histConsultas.appendChild(areaConsulta);
            areaConsulta.appendChild(consulta);
            areaConsulta.appendChild(fecha);
            areaConsulta.appendChild(profe);
            areaConsulta.appendChild(comentario);

            if (elementCon.comentario && !retroVistas.includes(elementCon.id)) {
                await Swal.fire('Nueva retroalimentación', 'El profesor respondió:' + elementCon.comentario, 'info');
                retroVistas.push(elementCon.id)
            }
        }
    }
    localStorage.setItem("retroVistas", JSON.stringify(retroVistas));
}
mostrarDuda()

