const nuevaconsulta =document.getElementById("consulta")
const btnGuardar =document.getElementById("btnGuardar")
const histConsultas =document.getElementById("histConsultas")
const profesor =document.getElementById("profesor")
const activas =document.getElementById("activas")

import { postUsuarios, getUsuarios } from "../services/servicesUsuarios.js"
import { postConsultas, getConsultas, putConsultas, deleteConsultas } from "../services/servicesConsultas.js"
const timestamp = Date.now();
const fechaActual = new Date(timestamp);
const usuarioEnSesion = sessionStorage.getItem("usuarioLogueado");
const traerUsuarios = await getUsuarios();
const usuarioLogueado = traerUsuarios.find(u => u.usuario === usuarioEnSesion);
console.log(usuarioLogueado);



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

} else{
    await Swal.fire('Error al guardar', 'Debe ingresar una tarea', 'error');
}
})


async function mostrarDuda() {
    const dudaRecibida = await getConsultas();
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
        fecha.textContent ="Generada:" + " " + elementCon.fecha
        profe.textContent ="Dirigida a:" + " " + elementCon.profesor
        comentario.textContent = "Comentarios privado: " + " " + elementCon.comentario
        eliminar.textContent = "Eliminar";

        eliminar.addEventListener("click", async function () {
            await deleteConsultas(elementCon.id, elementCon)
        })

        if (elementCon.estado === true) {
            activas.appendChild(areaConsulta)
            areaConsulta.appendChild(consulta);
            areaConsulta.appendChild(fecha);
            areaConsulta.appendChild(profe);
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

