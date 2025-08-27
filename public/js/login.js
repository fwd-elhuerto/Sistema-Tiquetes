/* constantes a usar  */
/*UN= Nombre de usuario/UC= contraseña de usuario*/
const UN =document.getElementById("UN")
const UC =document.getElementById("UC")
const btEntrar =document.getElementById("btEntrar")

/* const  =document.getElementById("") */
/* funcion llamada desde el servises */
import { getUsuarios } from "../services/servicesUsuarios.js"


btEntrar.addEventListener("click", async function(){
    /* UD= userdata/informacion de usuario */
    const UD = await getUsuarios()
    let usuarioValido = false;
    for (let index = 0; index < UD.length; index++) {
        /* UDindex=userdata/informacion de usuario en la posicion index */
        const UDindex = UD[index];
        if (UN.value === UDindex.usuario && UC.value === UDindex.password) {
            usuarioValido = true;

            if (UDindex.tipo === "profesor") {
                window.location.href = "mainProfe.html";
            } else if (UDindex.tipo === "estudiante") {
                window.location.href = "mainEstudiante.html";
            }
            break;
        }
    }

    if (!usuarioValido) {
        Swal.fire('Error al ingresar', 'Contraseña o usuario inválido', 'error');
    }

})
