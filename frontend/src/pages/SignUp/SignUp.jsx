import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { contraseña } from './validacionesSignUp';

const SignUp = () => {
    const [input, setInput] = useState({
        nombre:'',
        apellido:'',
        email:'',
        contraseña:'',
        confirmarContraseña:'',
        matricula:'',
        servicio:''
    });

    const [error, setError] = useState({
        nombre:'',
        apellido:'',
        email:'',
        contraseña:'',
        confirmarContraseña:'',
        matricula:'',
        servicio:''
    })

    const [disabled, setDisabled]= useState({
        select:false,
        buttonRegister: true
    });
    
    const nombre = new RegExp("^[a-zA-Z ]+$");

    const handleChange = (e) => {
        e.target.name === 'servicio' ? setDisabled(true) : null;
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

        if(e.target.value.length <= 0){
            setError({
                ...error,
                [e.target.name]:`Debe ingresar un ${e.target.name} valido`
            })
        } else if (e.target.value.length > 0){
            if(e.target.name !== 'contraseña' || e.target.name !== 'confirmarContraseña'){
                let variable = e.target.name;
                console.log(variable)
                nombre.test(e.target.value) ? setError({...error, variable:''}) : setError({...error, variable:`Debes proporcionar un ${variable} valido`}) 
            }else if(e.target.name === 'contraseña' || e.target.name === 'confirmarContraseña'){
                contraseña.test(e.target.value) ? setError({...error, contraseña:''}) : setError({...error, contraseña:'Debes proporcionar una contraseña valido'}) 
            }
            //  else if(e.target.name === 'nombre'){
            //     regExNombre.test(e.target.value) ? setError({...error, nombre:''}) : setError({...error, nombre:'Debes proporcionar un nombre valido'}) 
            //  }
            //  else if(e.target.name === 'apellido'){
            //     regExName.test(e.target.value) ? setError({...error, apellido:''}) : setError({...error, apellido:'Debes proporcionar un apellido valido'}) 
            //  }
            //  else if(e.target.name === 'confirmarContraseña'){
            //     regExContraseña.test(e.target.value) ? setError({...error, confirmarContraseña:''}) : setError({...error, confirmarContraseña:'Debes proporcionar un contraseña valido'}) 
            //  }
             else if(!nombre.test(e.target.value)){
                setError({
                    ...error,
                    [e.target.name]:`El ${e.target.name} no debe tener signos`
                })
            }
            else {
                setError({ 
                    ...error, 
                    [e.target.name]: ''
                })
            }
            if(e.target.name === 'confirmarContraseña' || e.target.name === 'contraseña'){
                e.target.value === input.contraseña ? setError({ ...error, confirmarContraseña: '' }) : setError({ ...error, confirmarContraseña: 'Las contraseñas deben coincidir' });
            }
        }
    };

    useEffect(() => {
        const isDisabled = !input.apellido || !input.confirmarContraseña || !input.contraseña || !input.email || !input.
        disabled.buttonRegister !== isDisabled && setDisabled(isDisabled);
    },[input, error])

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('hola')
    }

  return (
    <form onSubmit={handleRegister}>
        <input
        name='nombre'
        value={input.nombre}
        placeholder='Nombre...'
        type='text'
        onChange={handleChange}
        />
        <span>{error.nombre && error.nombre}</span>
        <input
        name='apellido'
        value={input.apellido}
        placeholder='Apellido'
        type='text'
        onChange={handleChange}
        />
        <span>{error.apellido && error.apellido}</span>
        <input
        name='email'
        value={input.email}
        placeholder='Email...'
        type='email'
        onChange={handleChange}
        />
        <span>{error.email && error.email}</span>
        <input
        name='contraseña'
        value={input.contraseña}
        placeholder='Contraseña...'
        type='password'
        onChange={handleChange}
        />
        <span>{error.contraseña && error.contraseña}</span>
        <input
        name='confirmarContraseña'
        value={input.confirmarContraseña}
        placeholder='Confirmar contraseña...'
        type='password'
        onChange={handleChange}
        />
        <span>{error.confirmarContraseña && error.confirmarContraseña}</span>
        <input
        name='matricula'
        value={input.matricula}
        placeholder='Numero de Matricula'
        type='text'
        onChange={handleChange}
        />
        <select name='servicio' onChange={handleChange}>
            <option value='profesion' disabled={disabled.select}>Profesion</option>
            <option name='servicio' value='abogado'>Abogado</option>
            <option name='servicio' value='cliente'>Cliente</option>
        </select>
        <Button type="submit" color="primary" disabled={disabled.buttonRegister}>Registrate!</Button>
    </form>
  )
};

export default SignUp;
