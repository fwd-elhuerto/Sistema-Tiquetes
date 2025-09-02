
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
   if (UN.value.length > 3 && UT.value.length > 8 && UC.value.length > 8)  {
        const usuariosExistentes = await getUsuarios(); 
        const usuarioExistente = usuariosExistentes.find(u => u.usuario === UN.value); // .find para buscar si ya existe el usuario

    if (usuarioExistente) {
        Swal.fire('Error', 'El nombre de usuario ya está registrado. Elige otro.', 'error');
        return;
    }


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
        Swal.fire('Error al ingresar', 'Los datos ingresados no cumplen con los requerimientos', 'error');
        }
    
})

/* fucion para limpiar el formulario  */
function limpiar() {
    UN.textContent="" 
    UC.textContent=""
    UT.textContent=""
}

limpiar()