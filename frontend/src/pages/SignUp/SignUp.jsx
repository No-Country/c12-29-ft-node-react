import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { contraseña, email, nombre } from './validacionesSignUp';

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
    

    const handleChange = (e) => {
        const {value, name} = e.target
        name === 'servicio' ? setDisabled({...disabled, select: true}) : null;
        setInput({
            ...input,
            [name]: value
        });

        if(value < 4){
            setError({
                ...error,
                [name]:`${name} tiene que tener mas de 3 caracteres`
            })
        } else {
            if(name === 'email' ){
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                emailRegex.test(value) ? setError({...error, email:''}) : setError({...error, email:'Debes proporcionar un email valido'});
            }
            else if(name === 'contraseña'){
                const nameRegex = /^[A-Za-z]+$/;
                nameRegex.test(value) ? setError({...error, contraseña:''}) : setError({...error, contraseña:'Debes proporcionar una contraseña valida'}) 
            }
            else if(name === 'nombre'){
                const nameRegex = /^[A-Za-z]+$/;
                nameRegex.test(value) ? setError({...error, nombre:''}) : setError({...error, nombre:'Debes proporcionar un nombre valido'}) 
            }
            else if(name === 'confirmarContraseña'){
                value === input.contraseña ? setError({ ...error, confirmarContraseña: '' }) : setError({ ...error, confirmarContraseña: 'Las contraseñas deben coincidir' });
            } 
            else if(name === 'apellido'){
                nombre.test(value) ? setError({...error, apellido:''}) : setError({...error, apellido:'Debes proporcionar un apellido valido'}) 
            }
             else {
                setError({ 
                ...error, 
                [name]: ''
            })
        }
        }
    };

    useEffect(() => {
        const isDisabled = !input.apellido || !input.confirmarContraseña || !input.contraseña || !input.email || error.apellido || error.confirmarContraseña || error.contraseña || error.email || error.nombre 
        disabled.buttonRegister !== isDisabled && setDisabled({...disabled, buttonRegister: isDisabled});
    },[input, error])

    const handleRegister = (e) => {
        e.preventDefault();
        input.apellido && input.confirmarContraseña && input.contraseña && input.email && input.matricula && input.nombre && input.servicio && !error.apellido && !error.confirmarContraseña && !error.contraseña && !error.email && !error.matricula && !error.nombre && !error.servicio ? console.log(input) : console.log('faltan datos')
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
