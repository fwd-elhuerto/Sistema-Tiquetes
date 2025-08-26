const nuevaconsulta =document.getElementById("consulta")
const btnGuardar =document.getElementById("btnGuardar")
const histConsultas =document.getElementById("histConsultas")


const fechaActual = Date.now()
import { postUsuarios } from "../services/servicesProduc.js"
btnGuardar.addEventListener("click", async function () {
    const duda={ 
        consulta: nuevaconsulta.value,
        fecha: fechaActual,
        estado: true
    }

    const respuesta = await post(movie)
})