'use client'

import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function PaginaDetalhes(){
    const params = useParams()
    

    const [estudo, setEstudo] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
        const buscarEstudo = async () => {

            try{
                const res = await axios.get(`https://6ac2b64f3f4ae78f694535e7.mockapi.io/anotations/anotation/${params.id}`)
    
                setEstudo(res.data)
                console.log(res.data)
            } catch(error){
                setError(true)
            }   finally{
                setLoading(false)
            }
                
            }


        buscarEstudo()
    }, [params.id])
    


    return (
        <>
        {
            loading ? (
                <p>Carregando...</p>
            ) : (
                error ? (
                    <p>Erro na requisição</p>
                ) : ( <>
             <h1>{estudo?.title}</h1> 
             <h2>{estudo?.category}</h2> 
             <p>{estudo?.description}</p> 
                </>)
            )
        }
        
        </>
    );
}





