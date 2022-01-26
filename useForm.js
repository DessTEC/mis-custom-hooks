import { useState } from "react";

export const useForm = ( initialState = {}) => {

    const [values, setValues] = useState(initialState);

    // Para limpiar los campos después del submit
    const reset = () => {
        setValues(initialState);
    }

    const handleInputChange = ({target}) => { //Obtener el target del evento e

        setValues({
            ...values, //Mantener los campos que no cambiaron
            [target.name]: target.value
        });
    }

    return [values, handleInputChange, reset];
};
