/* constantes a usar  */
/*UN= Nombre de usuario/UC= contraseña de usuario*/
const UN =document.getElementById("UN")
const UC =document.getElementById("UC")
const btEntrar =document.getElementById("btEntrar")
const btRegistrar =document.getElementById("btRegistrar")

/* funcion llamada desde el servises */
import { getUsuarios } from "../services/servicesUsuarios.js"

/* fucion que se realisa al darle click al boton btEntrar*/
btEntrar.addEventListener("click", async function(){
    /* UD= userdata/informacion de usuario, le estamos dando el valor proveniente de getUsuarios */
    const UD = await getUsuarios()
    /* declara la variable usuarioValido como "false" */
    let usuarioValido = false;
    /* for para recorrer los datos dentro de UD */
    for (let index = 0; index < UD.length; index++) {
        /* UDindex=userdata/informacion de usuario en la posicion index */
        const UDindex = UD[index];
        /* El if que define que acciones tomar dependiendo de si los datos corresponde a una persona inscrita*/
        if (UN.value === UDindex.usuario && UC.value === UDindex.password) {
            /* cambia el valor de usuarioValido a "true"  */
            usuarioValido = true;
            sessionStorage.setItem("usuarioLogueado", UDindex.usuario); 
            /* if que define a donde redicionar el usuario dependiendo de si es profesor o estudiante  */
            if (UDindex.tipo === "profesor") {
                window.location.href = "../pages/mainProfe.html";
            } else if (UDindex.tipo === "estudiante") {
                window.location.href = "../pages/mainEstudiante.html";
            }
            break;
        }
    } 
        /* si el los datos no corresponde a ningun usuario registrado este if mandara el mensaje de error */
        if (!usuarioValido) {
        Swal.fire('Error al ingresar', 'Contraseña o usuario inválido', 'error');
        }
})
/* la funcion del boton btRegistrar, simplemente es un link a la pagina registro*/
btRegistrar.addEventListener("click", function(){
    window.location.href = "../pages/registro.html"
})