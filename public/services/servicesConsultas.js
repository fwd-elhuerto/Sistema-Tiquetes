async function getConsultas () {
    
    try {
        
        const response =await fetch("http://localhost:3001/Consultas",{
        method:'GET',
        headers : {
            'Content-Type': 'application/json'
        }
        })
        const Consultas = await response.json()
        
        return Consultas

    } catch (error) {
        console.error("Error al obtener los Consultas",error)
        throw error
    }
}
export{getConsultas}



async function postConsultas (consulta) {
    
    try {
        
        const response =await fetch("http://localhost:3001/Consultas",{
        method:'POST',
        headers : {
            'Content-Type': 'application/json' },
        body:JSON.stringify(consulta)
        })
        const Consultas = await response.json()
        
        return Consultas

    } catch (error) {
        console.error("Error al guardar los Consultas",error)
        throw error
    }
}
export{postConsultas}


async function deleteConsultas (id) {
    
    try {
        
        const response =await fetch("http://localhost:3001/Consultas/"+ id,{
        method:'DELETE',
        headers : {
            'Content-Type': 'application/json'
        },
        })
        /* const products = await response.json()
        
        return products
 */
    } catch (error) {
        console.error("Error al eliminar los Consultas",error)
        throw error
    }
}
export{deleteConsultas}

async function putConsultas (consulta,id) {
    
    try {
        
        const response =await fetch("http://localhost:3001/Consultas/"+ id,{
        method:'PUT',
        headers : {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(consulta)
        })
        
    } catch (error) {
        console.error("Error al actualizar los Consultas",error)
        throw error
    }
}
export{putConsultas}