import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useAddUserMutation } from '../../redux/userReducer';


const SignUp = () => {

    const [ addUser ]= useAddUserMutation();

    const [input, setInput] = useState({
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        confirmpassword:'',
        license:'',
        userType:''
    });

    const [error, setError] = useState({
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        confirmpassword:'',
        license:'',
        userType:''
    })

    const [disabled, setDisabled]= useState({
        select:false,
        buttonRegister: true
    });
    

    const handleChange = (e) => {
        const {value, name} = e.target
        name === 'userType' ? setDisabled({...disabled, select: true}) : null;
        setInput({
            ...input,
            [name]: value
        });

        if(name !== 'license' && value.length < 4){
            setError({
                ...error,
                [name]:`Tiene que tener mas de 3 caracteres`
            })
        } else {
            if(name === 'email' ){
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                emailRegex.test(value) ? setError({...error, email:''}) : setError({...error, email:'Debes proporcionar un email valido'});
            }
            else if(name === 'password'){
                const nameRegex = /^[A-Za-z]+$/;
                nameRegex.test(value) ? setError({...error, password:''}) : setError({...error, password:'Debes proporcionar una contraseña valida'}) 
            }
            else if(name === 'firstname'){
                const nameRegex = /^[A-Za-z]+$/;
                nameRegex.test(value) ? setError({...error, firstname:''}) : setError({...error, firstname:'Debes proporcionar un nombre valido'}) 
            }
            else if(name === 'confirmpassword'){
                value === input.password ? setError({ ...error, confirmpassword: '' }) : setError({ ...error, confirmpassword: 'Las contraseñas deben coincidir' });
            } 
            else if(name === 'lastname'){
                const nameRegex = /^[A-Za-z]+$/;
                nameRegex.test(value) ? setError({...error, lastname:''}) : setError({...error, lastname:'Debes proporcionar un lastname valido'}) 
            }
             else {
                setError({ 
                ...error, 
                [name]: ''
            })
        }}
    };

    useEffect(() => {
        const isDisabled = !input.lastname || !input.confirmpassword || !input.password || !input.email || !input.firstname || error.lastname || error.confirmpassword || error.password || error.email || error.firstname ? true : false
        console.log('isDisabled', isDisabled)
        disabled.buttonRegister !== isDisabled && setDisabled({...disabled, buttonRegister: isDisabled});
    },[input, error])

    const handleRegister = (e) => {
        e.preventDefault();
        input.lastname && input.confirmpassword && input.password && input.email && input.license && input.firstname && input.userType && !error.lastname && !error.confirmpassword && !error.password && !error.email && !error.license && !error.firstname && !error.userType ? addUser(input) : console.log('faltan datos', input)
    }

  return (
    <form onSubmit={handleRegister}>
        <input
        name='firstname'
        value={input.firstname}
        placeholder='Nombre...'
        type='text'
        onChange={handleChange}
        />
        <span>{error.firstname && error.firstname}</span>
        <input
        name='lastname'
        value={input.lastname}
        placeholder='Apellido...'
        type='text'
        onChange={handleChange}
        />
        <span>{error.lastname && error.lastname}</span>
        <input
        name='email'
        value={input.email}
        placeholder='Email...'
        type='email'
        onChange={handleChange}
        />
        <span>{error.email && error.email}</span>
        <input
        name='password'
        value={input.password}
        placeholder='Contraseña...'
        type='password'
        onChange={handleChange}
        />
        <span>{error.password && error.password}</span>
        <input
        name='confirmpassword'
        value={input.confirmpassword}
        placeholder='Confirmar contraseña...'
        type='password'
        onChange={handleChange}
        />
        <span>{error.confirmpassword && error.confirmpassword}</span>
        <input
        name='license'
        value={input.license}
        placeholder='Numero de Matricula'
        type='text'
        onChange={handleChange}
        />
        <select name='userType' onChange={handleChange}>
            <option value='profesion' disabled={disabled.select}>Profesion</option>
            <option name='userType' value='abogado'>Abogado</option>
            <option name='userType' value='cliente'>Cliente</option>
        </select>
        <Button type="submit" color="primary" disabled={disabled.buttonRegister}>Registrate!</Button>
    </form>
  )
};

export default SignUp;
