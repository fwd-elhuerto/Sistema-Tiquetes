/* constantes a usar  */
/*UN= Nombre de usuario/UC= contraseña de usuario*/
const UN =document.getElementById("UN")
const UC =document.getElementById("UC")
const UT =document.getElementById("UT")
const btInscribir =document.getElementById("btInscribir")

/* funcion llamada desde el servises */
import { postUsuarios, getUsuarios } from "../services/servicesUsuarios.js"

btInscribir.addEventListener("click", async function getUsuarios(){
    /* crear una constante que guarde las carateristicas de las pelicula (un objeto) */
    const usuario= {
        usuario: UN.value,
        password: UC.value,
        telefono: UT.value,
        tipo: "estudiante"
    }
    /* constante que llama la funcion para los datos */
    const Dusuarios = await postUsuarios(usuario)
    console.log(Dusuarios);

})