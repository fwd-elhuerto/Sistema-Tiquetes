const histConsultas =document.getElementById("histConsultas")
const activas =document.getElementById("activas");



import { postUsuarios, getUsuarios } from "../services/servicesUsuarios.js"
import { postConsultas, getConsultas, putConsultas } from "../services/servicesConsultas.js"

async function mostrarConsulta() {
    const dudaRecibida = await getConsultas();
    activas.textContent = "";
    for (let index = 0; index < dudaRecibida.length; index++) {
        const elementCon = dudaRecibida[index];

        let usuario =document.createElement("h3");
        let areaConsulta =document.createElement("div");
        let consulta =document.createElement("h3");
        let fecha = document.createElement("p");
        let profe = document.createElement("p");
        let atender2 = document.createElement("label");
        let atender = document.createElement("input");
        let inputComentario = document.createElement("input");
        

        usuario.textContent= elementCon.usuario
        consulta.textContent= elementCon.consulta
        fecha.textContent ="Generada:" + " " + elementCon.fecha
        profe.textContent ="Dirigida a:" + " " + elementCon.profesor
        atender.type = 'checkbox'
        atender2.textContent = "Marcar como atendido"
        inputComentario.type = "text";
        inputComentario.placeholder = "Retroalimentación..."

        if (elementCon.estado === true) {
            activas.appendChild(areaConsulta);
            areaConsulta.appendChild(usuario);
            areaConsulta.appendChild(consulta);
            areaConsulta.appendChild(fecha);
            areaConsulta.appendChild(profe);
            areaConsulta.appendChild(inputComentario);
            areaConsulta.appendChild(atender2);
            areaConsulta.appendChild(atender);
            
        }

        atender.addEventListener("change", async function () {
            if (atender.checked && inputComentario.value != "") {
                elementCon.estado = false; // marcar como atendida
                elementCon.comentario = inputComentario.value; // nuevo campo
                await Swal.fire('Consulta atendida', 'Se agregó tu retroalimentación correctamente, estos comentarios son privados para cada estudiante', 'info');
                await putConsultas(elementCon.id, elementCon); // actualizar en db.json
                
            }else{
                await Swal.fire('Error al enviar', 'Ingrese un comentario', 'error');
            }
        })
    }

}
mostrarConsulta()