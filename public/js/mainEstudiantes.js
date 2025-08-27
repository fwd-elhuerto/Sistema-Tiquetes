const nuevaconsulta =document.getElementById("consulta")
const btnGuardar =document.getElementById("btnGuardar")
const histConsultas =document.getElementById("histConsultas")
const profesor =document.getElementById("profesor")


const fechaActual = Date.now()
import { postUsuarios } from "../services/servicesProduc.js"


btnGuardar.addEventListener("click", async function () {
   if (nuevaconsulta.value != "") {
    
    const duda={ 
        consulta: nuevaconsulta.value,
        fecha: fechaActual,
        estado: true,
        profesor: profesor.value
    }

    const respuesta = await postUsuarios(duda)  
} else{
    Swal.fire('Error al guardar', 'Debe ingresar una tarea', 'error');
}
})

