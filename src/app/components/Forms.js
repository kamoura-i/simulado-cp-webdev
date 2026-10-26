"use client"

import {useState, useEffect, useMemo} from 'react'
import axios from 'axios'
import Link from 'next/link';


function Forms(){
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [list, setList] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    

    useEffect(() => {
        const buscarEstudos = async () => {

            try {
            const res = await axios.get('https://6ac2b64f3f4ae78f694535e7.mockapi.io/anotations/anotation')
            setList(res.data)
            console.log(res)
            } catch(error){
                setError(true)
            } finally{
                setLoading(false)
            }
        }
        // console.log(res)
        buscarEstudos()

        
    }, [])


    async function AdicionarEstudo(){
        const novoObjeto = {
            title: title,
            category: category,
            description: description
        }
        const res = await axios.post('https://6ac2b64f3f4ae78f694535e7.mockapi.io/anotations/anotation', novoObjeto)
        setList([...list, res.data])
        setTitle('')
        setCategory('')
        setDescription('')
    }

    async function ExcluirAnotação(id) {
        const res = await axios.delete(`https://6ac2b64f3f4ae78f694535e7.mockapi.io/anotations/anotation/${id}`)
        
        setList(list.filter((item) => {
            return item.id != id
        }))
    }
    
    const listaFiltrada = useMemo(() => {
        console.log("FILTRANDO")
          return list.filter((item) => {
            return item.title.toLowerCase().includes(search.toLowerCase())
          })
    }, [list, search])


    
    console.log('renderizou')
    return (<>
        <input type="text" placeholder='Titulo...' value = {title}  onChange ={(e) => {setTitle(e.target.value)}}/>
        <input type="text" placeholder='Categoria...' value = {category}  onChange ={(e) => {setCategory(e.target.value)}}/>
        <input type="text" placeholder='Descrição...' value = {description}  onChange ={(e) => {setDescription(e.target.value)}}/>
        <input type="text" placeholder='Pesquisar' value={search} onChange ={(e) => {setSearch(e.target.value)}}/>

        <button onClick={() => AdicionarEstudo()}>Adicionar</button>

        {loading ? (
            <p>Carregando...</p>
        ): error ? (
            <p>Erro na requisão</p>
        ) : (
            
            listaFiltrada.map((item) => {
                return (
                    <div key={item.id}>
                        <h1>{item.title}</h1>
                        <h2>{item.category}</h2>
                        <p>{item.description}</p>   
                        <button onClick={()=> ExcluirAnotação(item.id)}>Excluir</button>  
                        <Link href={`/recursos/${item.id}`}>Ver Detalhes</Link>               
                    </div>
                )
            }) 
        
        )}

        

   </>
    );
}

export default Forms;