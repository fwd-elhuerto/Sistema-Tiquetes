const hisAtendidas =document.getElementById("hisAtendidas")
const busqueda =document.getElementById("busqueda")
const buscar =document.getElementById("buscar")

// Import
import { postUsuarios, getUsuarios } from "../services/servicesUsuarios.js"
import { postConsultas, getConsultas, putConsultas } from "../services/servicesConsultas.js"

//Constantes
const usuarioLogueado = sessionStorage.getItem("usuarioLogueado");

// Eventos de botones
btnModalHistorial.addEventListener("click", function () {// mostrar modal de historial de consulttas
   window.location.href = "../pages/mainProfe.html";
})

buscar.addEventListener("click", function () {
    buscarConsultas()
})

btnSalir.addEventListener("click", function(){
    sessionStorage.clear()
    window.location.href = "../pages/login.html"
   
})

// Funciones
async function buscarConsultas() {
    const dudaRecibida = await getConsultas(); // 
    let search =dudaRecibida.filter(filtroNommbre => filtroNommbre.usuario.toLowerCase().includes(busqueda.value.toLowerCase()) || filtroNommbre.consulta.toLowerCase().includes(busqueda.value.toLowerCase()) )
    // .filter para buscar valores en la lista, .toLowerCase para que no afecte la mayúscula
    hisAtendidas.textContent = "";
    mostrarConsulta(search)
}


async function mostrarConsulta(lista = null) {
    const dudaRecibida = lista || await getConsultas();
    hisAtendidas.textContent = "";
    for (let index = 0; index < dudaRecibida.length; index++) {
        const elementCon = dudaRecibida[index];

        let usuario =document.createElement("h3");
        let areaConsulta =document.createElement("div");
        let consulta =document.createElement("h3");
        let fecha = document.createElement("p");
        let sede = document.createElement("p");
        let profe = document.createElement("p");
        let comentario = document.createElement("p");
    
        usuario.textContent="Estudiante: " + " " + elementCon.usuario;
        consulta.textContent= elementCon.consulta;
        const fechaFormateada = new Date(elementCon.fecha).toLocaleString(); // fecha en formato normal
        fecha.textContent = "Generada: " + fechaFormateada;
        sede.textContent ="Sede: " + " " + elementCon.sede;
        profe.textContent ="Dirigida a:" + " " + elementCon.profesor;
        comentario.textContent = "Retroalimentación: " + elementCon.comentario
        welcome.textContent = "Bienvenido " + usuarioLogueado
        if (elementCon.profesor === usuarioLogueado && elementCon.estado === false) {
                hisAtendidas.appendChild(areaConsulta)
                areaConsulta.appendChild(usuario);
                areaConsulta.appendChild(consulta);
                areaConsulta.appendChild(fecha);
                areaConsulta.appendChild(sede);
                areaConsulta.appendChild(profe);
                areaConsulta.appendChild(comentario)
                areaConsulta.style.backgroundColor = "black" 
                areaConsulta.style.borderRadius = "20px";
                areaConsulta.style.border = "2px solid black";
                }
    }

}
mostrarConsulta()