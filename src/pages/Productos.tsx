import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import { ICategoria } from '../interfaces/ICategoria';
import { getDatos } from '../firebase/FBcategorias';
import { useForm } from 'react-hook-form';
import { newCategoria } from '../firebase/FBcategorias';
import './Productosestilos.css'

export const Productos = () => {
  const { register, handleSubmit } = useForm<ICategoria>();
  const onAddCategoria = async (dataCategoria: ICategoria) => {
    console.log(dataCategoria)
    await newCategoria(dataCategoria)
    window.location.reload();
  }
  const [categorias, setCategorias] = useState<ICategoria[]>([])
  useEffect(() => {
    getDatos()
      .then(res => {
        console.log(...res)
        setCategorias([...res])
      })
  }, [])
  return (
    <>
    <Grid container sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Grid item xs={5} sx={{ backgroundColor: 'aqua', margin: '10px', padding: '12px', height: 'max-content', borderRadius: '20px' }}>
          {
            categorias.slice(0, 100).map((categoria) => (
              <>
              <h3 key={categoria.nameinsert}>{categoria.nameinsert}</h3>
              <h1>{categoria.valor}</h1>
              <h2>{categoria.tipo}</h2>
              <img src={categoria.imagen} alt="" />
              </>
            ))
          }
        </Grid>

        <Grid item xs={5} sx={{ backgroundColor: 'aqua', margin: '10px', padding: '12px', height: 'max-content', borderRadius: '20px' }}>
          <h2 id='NewCat'>Añadir nuevos datos</h2>
          <form onSubmit={handleSubmit(onAddCategoria)} noValidate >
            <TextField
              {...register('nameinsert')}
              // id='nombre'
              label='Nombre'
              type='string'
              sx={{ width: '60%' }}
            >
            </TextField>
            
            <TextField
              {...register('tipo')}
              // id='tipo'
              label='Tipo'
              type='string'
              sx={{ width: '60%' }}
            >
            </TextField>

            <TextField
              {...register('imagen')}
              // id='imagen'
              label='Imagen'
              type='string'
              sx={{ width: '60%' }}
            >
            </TextField>


            <Button type='submit' variant="contained" sx={{ marginTop: '10px' }}>Añadir</Button>
          </form>
        </Grid>
      </Grid>

    </>
  );
    
}