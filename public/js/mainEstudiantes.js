const nuevaconsulta =document.getElementById("consulta")
const btnGuardar =document.getElementById("btnGuardar")
const histConsultas =document.getElementById("histConsultas")
const profesor =document.getElementById("profesor")
const activas =document.getElementById("activas")


const timestamp = Date.now();
const fechaActual = new Date(timestamp);
import { postUsuarios, getUsuarios } from "../services/servicesUsuarios.js"
import { postConsultas, getConsultas } from "../services/servicesConsultas.js"


btnGuardar.addEventListener("click", async function () {
   const traerUs = await getUsuarios()
   if (nuevaconsulta.value != "") {
    
    const duda={ 
        consulta: nuevaconsulta.value,
        fecha: fechaActual,
        estado: true,
        profesor: profesor.value,
        usuario: traerUs.usuario
    }

    const respuesta = await postConsultas(duda)  
} else{
    Swal.fire('Error al guardar', 'Debe ingresar una tarea', 'error');
}
})


async function mostrarDuda() {
    const dudaRecibida = await getConsultas();
    activas.textContent = "";
    histConsultas.textContent = "";
    for (let index = 0; index < dudaRecibida.length; index++) {
        const elementCon = dudaRecibida[index];

        let areaConsulta =document.createElement("div");
        let consulta =document.createElement("h3");
        let fecha = document.createElement("p");
        let profe = document.createElement("p");

        consulta.textContent= elementCon.consulta
        fecha.textContent ="Generada:" + " " + elementCon.fecha
        profe.textContent ="Dirigida a:" + " " + elementCon.profesor

        if (elementCon.estado === true) {
            activas.appendChild(areaConsulta)
            areaConsulta.appendChild(consulta);
            areaConsulta.appendChild(fecha);
            areaConsulta.appendChild(profe);
        }else {
            histConsultas.appendChild(areaConsulta);
            areaConsulta.appendChild(consulta);
            areaConsulta.appendChild(fecha);
            areaConsulta.appendChild(profe);
        }
    }

}
mostrarDuda()

