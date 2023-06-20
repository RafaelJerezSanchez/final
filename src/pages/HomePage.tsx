import React from 'react'
import { getPokemon } from '../firebase/FBcategorias'
import { useState } from 'react'
import { useEffect } from 'react'
import { IPokemon } from '../interfaces/IPokemon';
import './Homeestilos.css'


export const HomePage = () => {
  // const { register, handleSubmit } = useForm<IPokemon>();
  // const onAddCategoria = async (dataCategoria: IPokemon) => {
  //   console.log(dataCategoria)
  //   await newCategoria(dataCategoria)
  //   window.location.reload();
  // }
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
          <img src={categoria.imagen} />
          <h3>{categoria.nombre}</h3>
          <p>Tipo: {categoria.tipo}</p>
          <p>Descripción: {categoria.descripcion}</p>
          {/* Agrega más elementos <p> para mostrar otras propiedades */}
        </div>
      ))}
    </div>
  </div>
    </>
  )
}

// import React, { useEffect, useState } from 'react';
// import { getPokemon, newPoke } from '../firebase/FBcategorias';
// import './Home.css';
// import { IPokemon } from '../interfaces/IPokemon';
// import { useForm } from 'react-hook-form';
// // import ReactPlayer from 'react-player';
// // import { faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// export const HomePage = () => {
//   const [categorias, setCategorias] = useState<IPokemon[]>([]);
//   useEffect(() => {
//     getPokemon().then((res) => {
//       console.log(...res);
//       setCategorias([...res]);
//     });
//   }, []);

//   useEffect(() => {
//     const handleKeyUp = (e: KeyboardEvent) => {
//       if ((e.target as HTMLInputElement).matches('#pokesearch')) {
//         const inputValue = (e.target as HTMLInputElement).value.toLowerCase();
//         document.querySelectorAll('.items').forEach((dino) => {
//           const dinoName = dino?.textContent?.toLowerCase() || '';
//           if (dinoName.toLowerCase().startsWith(inputValue)) {
//             dino.classList.remove('none');
//           } else {
//             dino.classList.add('none');
//           }
//         });
//       }
//     };
//     document.addEventListener('keyup', handleKeyUp);
//     return () => {
//       document.removeEventListener('keyup', handleKeyUp);
//     };
//   }, []);

//   const { register, handleSubmit } = useForm<IPokemon>();
//   const onAddPokes = async (datapoke: IPokemon) => {
//     console.log(datapoke);
//     await newPoke(datapoke);
//     window.location.reload();
//   };

//   return (
//     <section id='home'>
//       <h1 id='tittle-home'>Ark Dinosaurs Search</h1>
//       <form action='' id='formsearch'>
//         <input type='search' className='inputsearch' placeholder='Search your Dino...' id='pokesearch'/>
//       </form>
//       <div className='cardscollection'>
//         {categorias
//           .map((dino) => (
//             <div className='items'>
//               <figure id='figimg'>
//                 <img id='dinosimg' src={dino.imagen} alt='' />
//               </figure>
//               <h1 key={categorias.nombre}>{categorias.nombre}</h1>
//               <p className='dinodescript'>{dino.descript}</p>
//               <div className='cntdatos'>
//                 <img className='dinopeso' src='' alt='' />
//                 <h3>{dino.salud}</h3>
//                 <img className='dinopeso' src='' alt='' />
//                 <h3>{dino.stamina}</h3>
//                 <img className='dinopeso' src='' alt='' />
//                 <h3>{dino.peso}</h3>
//               </div>
//             </div>
//           ))}
//       </div>
//     </section>
//   );
// };

// export default HomePage;

