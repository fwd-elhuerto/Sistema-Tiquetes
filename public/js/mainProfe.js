const histConsultas =document.getElementById("histConsultas")
const activas =document.getElementById("activas")

import { postUsuarios, getUsuarios } from "../services/servicesUsuarios.js"
import { postConsultas, getConsultas, putConsultas } from "../services/servicesConsultas.js"

async function mostrarConsulta() {
    const dudaRecibida = await getConsultas();
    activas.textContent = "";
    for (let index = 0; index < dudaRecibida.length; index++) {
        const elementCon = dudaRecibida[index];

        let areaConsulta =document.createElement("div");
        let consulta =document.createElement("h3");
        let fecha = document.createElement("p");
        let profe = document.createElement("p");
        let atender2 = document.createElement("label");
        let atender = document.createElement("input");
        

        consulta.textContent= elementCon.consulta
        fecha.textContent ="Generada:" + " " + elementCon.fecha
        profe.textContent ="Dirigida a:" + " " + elementCon.profesor
        atender.type = 'checkbox'
        atender2.textContent = "Atendido"

        if (elementCon.estado === true) {
            activas.appendChild(areaConsulta);
            areaConsulta.appendChild(consulta);
            areaConsulta.appendChild(fecha);
            areaConsulta.appendChild(profe);
            areaConsulta.appendChild(atender2);
            areaConsulta.appendChild(atender);
        }

        atender.addEventListener("change", async function () {
            if (atender.checked) {
                elementCon.estado = false; // cambiar estado
                await putConsultas(elementCon.id, elementCon); // guardar en db.json
                mostrarConsulta(); // refrescar lista
            }
        })
    }

}
mostrarConsulta()