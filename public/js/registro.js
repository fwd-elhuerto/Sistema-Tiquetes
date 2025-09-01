
/* constantes a usar  */
/*UN= Nombre de usuario/ UC= Contraseña de usuario/ UT= Telefono de usuario/SD= sede de usuario*/
const UN =document.getElementById("UN")
const UC =document.getElementById("UC")
const UT =document.getElementById("UT")
const SD =document.getElementById("SD")
const btRegistro =document.getElementById("btRegistro")

/* funcion llamada desde el servises */
import { getUsuarios,postUsuarios } from "../services/servicesUsuarios.js"



/* el boton para guardar los usuarios  */
btRegistro.addEventListener("click", async function () {
    /* crear una constante que guarde las carateristicas de los usuario (un objeto) */
   if (UN.value != "" && UT.value != "" && UC.value.length > 8)  {
        const usuariosExistentes = await getUsuarios(); // linea que agrego caleb guaradr
        const usuarioExistente = usuariosExistentes.find(u => u.usuario === UN.value); // linea que agrego caleb guaradr

    if (usuarioExistente) {// linea que agrego caleb guaradr
        Swal.fire('Error', 'El nombre de usuario ya está registrado. Elige otro.', 'error');
        return;
    }// linea que agrego caleb guaradr


        const usuario= {
        usuario: UN.value,
        password: UC.value,
        telefono: UT.value,
        sede:SD.value,
        tipo: "estudiante"
    }
    /* constante que llama la funcion para subir los usuarios */
    const DUsuarios = await postUsuarios(usuario)
    console.log(DUsuarios);
    window.location.href = "login.html";
        
    } else {
        Swal.fire('Error al ingresar', 'Llene Todos Los Campos Solicitados', 'error');
        }
    
})

/* fucion para limpiar el formulario  */
function limpiar() {
    UN.textContent="" 
    UC.textContent=""
    UT.textContent=""
}

limpiar()