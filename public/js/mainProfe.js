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
const btnOkHist =document.getElementById("btnOkHist")
const btnModalFrecuencia =document.getElementById("btnModalFrecuencia")
const frecuencia =document.getElementById("frecuencia")
const divFrecuencia =document.getElementById("divFrecuencia")
const btnOkFre =document.getElementById("btnOkFre")
const busqueda =document.getElementById("busqueda")
const buscar =document.getElementById("buscar")


// Import
import { postUsuarios, getUsuarios } from "../services/servicesUsuarios.js"
import { postConsultas, getConsultas, putConsultas } from "../services/servicesConsultas.js"

//Constantes
const usuarioLogueado = sessionStorage.getItem("usuarioLogueado");

// Eventos de botones
buscar.addEventListener("click", function () {
    buscarConsultas()
})

btnModalProfe.addEventListener("click", function () {// mostrar modal de registro de administardor
    modalProfe.showModal();
})

btnModalHistorial.addEventListener("click", function () {// mostrar modal de historial de consulttas
    modalHistorial.showModal();
})

btnModalFrecuencia.addEventListener("click", async function () { // mostrar modal de frecuentes
    frecuencia.showModal();
    await mostrarFrecuencia()
})

btnOkHist.addEventListener("click", async function () { // cerrar modal historial
        await modalHistorial.close()
})

btnOkFre.addEventListener("click", async function () { // cerrar modal frencuentes
        await frecuencia.close()
})

btRegistro.addEventListener("click", async function () {
    if (UN.value!="" && UC.value!="" && UT.value!="" ) {
        const usuariosExistentes = await getUsuarios();
        const usuarioExistente = usuariosExistentes.find(u => u.usuario === UN.value);
        if (usuarioExistente) {
            Swal.fire('Error', 'El nombre de usuario ya está registrado. Elige otro.', 'error');
            await modalProfe.close()
            return;
        }

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
async function buscarConsultas() {
    const dudaRecibida = await getConsultas();
    let search =dudaRecibida.filter(filtroNommbre => filtroNommbre.usuario.toLowerCase().includes(busqueda.value.toLowerCase()) || filtroNommbre.consulta.toLowerCase().includes(busqueda.value.toLowerCase()) )
    // .filter para buscar valores en la lista, .toLowerCase para que no afecte la mayúscula
    hisAtendidas.textContent = "";
    mostrarConsulta(search)
}

async function mostrarConsulta(lista = null) {
    const dudaRecibida = lista || await getConsultas();
    activas.textContent = "";
    hisAtendidas.textContent = "";
    for (let index = 0; index < dudaRecibida.length; index++) {
        const elementCon = dudaRecibida[index];

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
        const fechaFormateada = new Date(elementCon.fecha).toLocaleString(); // fecha en formato normal
        fecha.textContent = "Generada: " + fechaFormateada;
        sede.textContent ="Sede: " + " " + elementCon.sede;
        profe.textContent ="Dirigida a:" + " " + elementCon.profesor;
        comentario.textContent = "Retroalimentación: " + elementCon.comentario
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
            areaConsulta.style.backgroundImage = "url('../imagenes/bg.png')"
            areaConsulta.style.backgroundSize = "cover";
            areaConsulta.style.backgroundPosition = "center";
            areaConsulta.style.borderRadius = "20px";
            areaConsulta.style.border = "2px solid black";
            
        

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

async function mostrarFrecuencia() {
    const consultas = await getConsultas();

    const contador = {}; // objeto para guardar la cantidad de consultas por estudiante

    for (let i = 0; i < consultas.length; i++) { // recorrer consultas
        const elementCon = consultas[i];

        if (elementCon.profesor === usuarioLogueado) { // filtrar consultas solo del profe logueado
            if (contador[elementCon.usuario]) {
                // Si existe, sumamos 1
                contador[elementCon.usuario] += 1;
            } else {
                // Si no existe, la inicia en 1
                contador[elementCon.usuario] = 1;
            }
        }
    }

    // convertir en lista
    const listaOrdenada = [];
    for (let usuario in contador) {
        listaOrdenada.push({ usuario: usuario, cantidad: contador[usuario] });// pushear a la lista vacia
    }

    listaOrdenada.sort(function(a, b) { // ordenar de mayor a menor
        return b.cantidad - a.cantidad;
    });

    divFrecuencia.textContent = ""; // limpiar contenedor

    if (listaOrdenada.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "No hay consultas registradas aún.";
        divFrecuencia.appendChild(mensaje);
    } else { 
        for (let j = 0; j < listaOrdenada.length; j++) {
        const frencuentes = document.createElement("p"); 
        frencuentes.textContent = listaOrdenada[j].usuario + ": " + listaOrdenada[j].cantidad + " consultas";
        divFrecuencia.appendChild(frencuentes);
        }
    }
}