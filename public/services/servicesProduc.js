async function getUsuarios () {
    
    try {
        
        const response =await fetch("http://localhost:3001/usuarios",{
        method:'GET',
        headers : {
            'Content-Type': 'application/json'
        }
        })
        const usuarios = await response.json()
        
        return usuarios

    } catch (error) {
        console.error("Error al obtener los usuarios",error)
        throw error
    }
}
export{getUsuarios}



async function postUsuarios (usuario) {
    
    try {
        
        const response =await fetch("http://localhost:3001/usuarios",{
        method:'POST',
        headers : {
            'Content-Type': 'application/json' },
        body:JSON.stringify(usuario)
        })
        const usuarios = await response.json()
        
        return usuarios

    } catch (error) {
        console.error("Error al guardar los usuarios",error)
        throw error
    }
}
export{postUsuarios}


async function deleteUsuarios (id) {
    
    try {
        
        const response =await fetch("http://localhost:3001/usuarios/"+ id,{
        method:'DELETE',
        headers : {
            'Content-Type': 'application/json'
        },
        })
        /* const products = await response.json()
        
        return products
 */
    } catch (error) {
        console.error("Error al eliminar los usuarios",error)
        throw error
    }
}
export{deleteUsuarios}

async function putUsuarios (usuario,id) {
    
    try {
        
        const response =await fetch("http://localhost:3001/usuarios/"+ id,{
        method:'PUT',
        headers : {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(usuario)
        })
        
    } catch (error) {
        console.error("Error al actualizar los usuarios",error)
        throw error
    }
}
export{putUsuarios}