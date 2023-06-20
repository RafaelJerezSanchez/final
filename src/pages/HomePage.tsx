import React from 'react'
import { getPokemon } from '../firebase/FBcategorias'
import { useState } from 'react'
import { useEffect } from 'react'
import { IPokemon } from '../interfaces/IPokemon';
import './Homeestilos.css'


export const HomePage = () => {
  const [Categorias, setCategorias] = useState<IPokemon[]>([])
  useEffect(() => {
    getPokemon()
      .then(res => {
        console.log(...res)
        setCategorias([...res])
      })
  }, [])
 
  return (
    <>
   <div>
    <h1 id='NewCat'>Aquí puedes ver los Pokemons totales que se han añadido</h1>
    <div className="card-cont">
      {Categorias.map((categoria) => (
        <div key={categoria.nombre} className="p5">
          <img src={categoria.imagen} className="imagenes"/>
          <h3>{categoria.nombre}</h3>
          <p>Tipo: {categoria.tipo}</p>
          <p className="descr">Descripción: {categoria.descripcion}</p>
          {/* Agrega más elementos <p> para mostrar otras propiedades */}
        </div>
      ))}
    </div>
  </div>
    </>
  )
}