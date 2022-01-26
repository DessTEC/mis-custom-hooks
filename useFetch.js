import { useRef, useEffect, useState } from "react";


export const useFetch = (url) => {

    // Va a mantener la referencia hacia el componente que tiene el hook, para evitar errores de aplicar un
    // setState cuando el componente ya no existe
    const isMounted = useRef(true);
    const [state, setState] = useState({data: null, loading: true, error: null});

    //Este effect no hace nada, solo está pendiente de que cuando se borre el elemento, se cambie el estado de isMounted
    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect( () => {

        //Se inicializa en cada petición el loading a true para mostrar la alerta de carga
        setState({data: null, loading: true, error: null});

        fetch(url)
        .then( resp => resp.json())
        .then( data => {
            //Mandar a llamar el setState solo cuando el componente está montado
            if(isMounted.current){
                setState({
                    loading: false,
                    error: null,
                    data
                })
            }
        })
        .catch(() => {
            setState({
                data: null, 
                loading: false, 
                error: 'No se pudo cargar la info'
            })
        })
    }, [url])

    return state;
};
