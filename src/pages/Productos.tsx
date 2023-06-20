import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import { IPokemon } from '../interfaces/IPokemon';
import { getPokemon, newPoke, deletePoke } from '../firebase/FBcategorias';
import { useForm } from 'react-hook-form';
import { cargamasiva } from '../firebase/FBcategorias';
import './Productosestilos.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const Productos = () => {
  const { register, handleSubmit } = useForm<IPokemon>();
  const onAddCategoria = async (dataCategoria: IPokemon) => {
    console.log(dataCategoria)
    await newPoke(dataCategoria)
    window.location.reload();
  }
  const [categorias, setCategorias] = useState<IPokemon[]>([])
  useEffect(() => {
    getPokemon()
      .then(res => {
        console.log(...res)
        setCategorias([...res])
      })
  }, [])

  const handleDeletePoke = (codigo: string | undefined) => {
    const confirmDelete = window.confirm('¿Estás seguro de borrar este pokemon?');
    if (confirmDelete && codigo) {
      deletePoke(codigo);
    }
  };

  return (
    <>
      <Grid item xs={5} sx={{ backgroundColor: 'white', margin: '10px', padding: '12px', height: 'max-content', borderRadius: '20px' }}>
          <h2 id='NewCat'>Añadir nuevos datos</h2>
          <form onSubmit={handleSubmit(onAddCategoria)} noValidate >
            <TextField
              {...register('nombre')}
              // id='nombre'
              label='Nombre'
              type='string'
              sx={{ width: '100%' }}
            >
            </TextField>

            <TextField
              {...register('tipo')}
              // id='tipo'
              label='Tipo'
              type='string'
              sx={{ width: '100%' }}
            >
            </TextField>

            <TextField
              {...register('imagen')}
              // id='imagen'
              label='Imagen'
              type='string'
              sx={{ width: '100%' }}
            >
            </TextField>

            <TextField
              {...register('descripcion')}
              // id='descripcion'
              label='descripcion'
              type='string'
              sx={{ width: '100%' }}
            >
            </TextField>


            <Button type='submit' variant="contained" sx={{ marginTop: '10px' }}>Añadir</Button>
            <Grid id='CargaMasiva' item xs={5} sx={{ backgroundColor: 'white', margin: '10px', padding: '12px', height: 'max-content', borderRadius: '20px' }}>
              <h4 id='NewCat'>Carga Masiva de Datos</h4>
              <Button variant='contained' onClick={cargamasiva}>Cargar Datos</Button>
            </Grid>
          </form>
        </Grid>
      <table border={2}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Imagen</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          {
            categorias.slice(0, 100).map((categoria) => (
              <>
                <tr>
                  <td>
                    <h2 key={categoria.nombre}>{categoria.nombre}</h2>
                  </td>

                  <td>
                    <h3>{categoria.descripcion}</h3>
                  </td>

                  <td>
                    <h3>{categoria.tipo}</h3>
                  </td>
                  <td>
                    <img id='imgtable' src={categoria.imagen} alt="" />
                  </td>
                  <td><Button onClick={() => handleDeletePoke(categoria.codigo)} id="deletebtn2" endIcon={<FontAwesomeIcon icon={faTrash} />} ></Button></td>
                </tr>
              </>
            ))
          }
        </tbody>
      </table >





    </>
  );

}