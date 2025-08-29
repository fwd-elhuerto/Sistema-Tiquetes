// Elementos del DOM
const histConsultas =document.getElementById("histConsultas")
const activas =document.getElementById("activas");
const btnModalProfe =document.getElementById("btnModalProfe")
const modalProfe =document.getElementById("modalProfe")
const UN =document.getElementById("UN")
const UC =document.getElementById("UC")
const UT =document.getElementById("UT")
const correo =document.getElementById("correo")
const btRegistro =document.getElementById("btRegistro")
const btnModalHistorial =document.getElementById("btnModalHistorial")
const modalHistorial =document.getElementById("historial")
const hisAtendidas =document.getElementById("hisAtendidas")
const frecuencia =document.getElementById("frecuencia")

// Import
import { postUsuarios, getUsuarios } from "../services/servicesUsuarios.js"
import { postConsultas, getConsultas, putConsultas } from "../services/servicesConsultas.js"
const usuarioLogueado = sessionStorage.getItem("usuarioLogueado");

// Eventos de botones
btnModalProfe.addEventListener("click", function () {
    modalProfe.showModal();
})

btnModalHistorial.addEventListener("click", function () {
    modalHistorial.showModal();
})

btRegistro.addEventListener("click", async function () {
    if (UN.value!="" && UC.value!="" && UT.value!="" ) {
        const usuario= {
        usuario: UN.value,
        password: UC.value,
        telefono: UT.value,
        correo:   correo.value,
        tipo: "profesor"
        }
        await postUsuarios(usuario)
        Swal.fire('Completado', 'Nuevo administrador agregado correctamente', 'success');
        modalProfe.close()
    }else {
       Swal.fire('Error al ingresar', 'Llene todos los campos solicitados', 'error');
        await modalProfe.close()
    }  
  })

  // Funciones
async function mostrarConsulta() {
    const dudaRecibida = await getConsultas();
    activas.textContent = "";
    for (let index = 0; index < dudaRecibida.length; index++) {
        const elementCon = dudaRecibida[index];

        btnModalHistorial.addEventListener("click", function () {
            modalHistorial.showModal();
            

        })

      
        let usuario =document.createElement("h3");
        let areaConsulta =document.createElement("div");
        let consulta =document.createElement("h3");
        let fecha = document.createElement("p");
        let sede = document.createElement("p");
        let profe = document.createElement("p");
        let atender2 = document.createElement("label");
        let atender = document.createElement("input");
        let inputComentario = document.createElement("input");
        let comentario = document.createElement("p");
        

        usuario.textContent="Estudiante: " + " " + elementCon.usuario;
        consulta.textContent= elementCon.consulta;
        fecha.textContent ="Generada:" + " " + elementCon.fecha;
        sede.textContent ="Sede: " + " " + elementCon.sede;
        profe.textContent ="Dirigida a:" + " " + elementCon.profesor;
        comentario.textContent = "Mi respuesta: " + elementCon.comentario
        atender.type = 'checkbox'
        atender2.textContent = "Marcar como atendido"
        inputComentario.type = "text";
        inputComentario.placeholder = "Retroalimentación..."

       if (elementCon.profesor === usuarioLogueado && elementCon.estado === true) {
            activas.appendChild(areaConsulta);
            areaConsulta.appendChild(usuario);
            areaConsulta.appendChild(consulta);
            areaConsulta.appendChild(fecha);
            areaConsulta.appendChild(sede);
            areaConsulta.appendChild(profe);
            areaConsulta.appendChild(inputComentario);
            areaConsulta.appendChild(atender2);
            areaConsulta.appendChild(atender);
    
        atender.addEventListener("change", async function () {
            if (atender.checked && inputComentario.value.trim() != "") { // validar espacios vacios y check
                elementCon.estado = false; // marcar como atendida
                elementCon.comentario = inputComentario.value; // nuevo campo
                await Swal.fire('Consulta atendida', 'Se agregó tu retroalimentación correctamente, estos comentarios son privados para cada estudiante', 'info');
                await putConsultas(elementCon.id, elementCon); // actualizar en db.json
                await mostrarConsulta();
                
            }else{
                await Swal.fire('Error al enviar', 'Ingrese un comentario', 'error');
                atender.checked = false;
            }
        })
      } else if (elementCon.profesor === usuarioLogueado && elementCon.estado === false) {
                hisAtendidas.appendChild(areaConsulta)
                areaConsulta.appendChild(usuario);
                areaConsulta.appendChild(consulta);
                areaConsulta.appendChild(fecha);
                areaConsulta.appendChild(sede);
                areaConsulta.appendChild(profe);
                areaConsulta.appendChild(comentario)
                
                }
    }

}
mostrarConsulta()