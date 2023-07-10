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
        e.target.name === 'servicio' ? setDisabled(true) : null;
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

        if(e.target.value.length <= 3){
            setError({
                ...error,
                [e.target.name]:`${e.target.name} tiene que tener mas de 3 caracteres`
            })
        } else {
            if(e.target.name === 'email' ){
                email.test(e.target.value) ? setError({...error, email:''}) : setError({...error, email:'Debes proporcionar un email valido'});
            }else if(e.target.name === 'contraseña' || e.target.name === 'confirmarContraseña'){
                contraseña.test(e.target.value) ? setError({...error, contraseña:''}) : setError({...error, contraseña:'Debes proporcionar una contraseña valido'}) 
            }
             else if(e.target.name === 'nombre'){
                nombre.test(e.target.value) ? setError({...error, nombre:''}) : setError({...error, nombre:'Debes proporcionar un nombre valido'}) 
             }
             else if(e.target.name === 'apellido'){
                nombre.test(e.target.value) ? setError({...error, apellido:''}) : setError({...error, apellido:'Debes proporcionar un apellido valido'}) 
             }
             else if(e.target.name === 'confirmarContraseña'){
                contraseña.test(e.target.value) ? setError({...error, confirmarContraseña:''}) : setError({...error, confirmarContraseña:'Debes proporcionar un contraseña valido'}) 
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
