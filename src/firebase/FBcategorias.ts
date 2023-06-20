import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { useFirestore } from "reactfire";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { nanoid } from 'nanoid'
import firebaseConfig from "./firebaseConfig";
import { IPokemon } from "../interfaces/IPokemon";
import pokemasivo from "../Data/pokemasivo.json";

export const app = initializeApp(firebaseConfig)
export const db = getFirestore()

//LISTAR TODOS LOS POKEMONS
export const getPokemon = async (): Promise<IPokemon[]> => {
    let varpokes: IPokemon[] = []; //array inicializado al vacio
    const pokesRef = collection(db, "Pokemons"); //seleccionamos la coleccion categorias
    const pokesDocs = await getDocs(pokesRef) //obtengo todos los datos, es como un select *
    pokesDocs.forEach(doc => {
        const poke = { ...doc.data() }
        varpokes.push(poke as IPokemon)
    });
    console.log(varpokes);
    return varpokes;
}

//LISTADO POKEMON FUEGO
export const getPokemonFuego = async (): Promise<IPokemon[]> => {
    let varpokes: IPokemon[] = []; // array inicializado al vacío
    const pokesRef = collection(db, "Pokemons"); // seleccionamos la colección "Pokemons"
    const q = query(pokesRef, where("tipo", "==", "Fuego")); // definimos la consulta con la condición de tipo igual a "Fuego"
    const pokesDocs = await getDocs(q); // obtenemos los documentos que cumplen con la consulta

    pokesDocs.forEach((doc) => {
        const poke = doc.data() as IPokemon; // aseguramos el tipo de datos
        varpokes.push(poke);
    });

    console.log(varpokes);
    return varpokes;
};

//LISTADO POKEMON AGUA
export const getPokemonAgua = async (): Promise<IPokemon[]> => {
    let varpokes: IPokemon[] = []; // array inicializado al vacío
    const pokesRef = collection(db, "Pokemons"); // seleccionamos la colección "Pokemons"
    const q = query(pokesRef, where("tipo", "==", "Agua")); // definimos la consulta con la condición de tipo igual a "Agua"
    const pokesDocs = await getDocs(q); // obtenemos los documentos que cumplen con la consulta

    pokesDocs.forEach((doc) => {
        const poke = doc.data() as IPokemon; // aseguramos el tipo de datos
        varpokes.push(poke);
    });

    console.log(varpokes);
    return varpokes;
};

//LISTADO POKEMON LUCHA
export const getPokemonLucha = async (): Promise<IPokemon[]> => {
    let varpokes: IPokemon[] = []; // array inicializado al vacío
    const pokesRef = collection(db, "Pokemons"); // seleccionamos la colección "Pokemons"
    const q = query(pokesRef, where("tipo", "==", "Lucha")); // definimos la consulta con la condición de tipo igual a "Lucha"
    const pokesDocs = await getDocs(q); // obtenemos los documentos que cumplen con la consulta

    pokesDocs.forEach((doc) => {
        const poke = doc.data() as IPokemon; // aseguramos el tipo de datos
        varpokes.push(poke);
    });

    console.log(varpokes);
    return varpokes;
};

//AÑADIR POKEMONS
export const newPoke = async (data: IPokemon) => {
    try {
        console.log('Insertando en FB el objeto', data)
        const newData = { codigo: nanoid(20), ...data }
        const docRef = doc(db, "Pokemons", newData.codigo);
        await setDoc(docRef, newData);
    } catch (error) {
        console.log(error)
    }
};

//BORRAR POKEMON
export const deletePoke = async (codigo: string) => {
    await deleteDoc(doc(db, "Pokemons", codigo))
    window.location.reload();
}

// CARGA MASIVA DE DATOS
export const cargamasiva = async () => {
    try {
        console.log('carga de datos...');
        pokemasivo.map(async (masivo) => {
            const codigo = nanoid(20);
            const docRef = doc(db, "Pokemons", codigo);
            await setDoc(docRef, { codigo: codigo, ...masivo });
            window.location.reload();
        });
    } catch (error) {
        console.log(error);
    }
};
