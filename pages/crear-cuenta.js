import { Formulario, Campo, InputSubmit, Error } from '@/components/ui/formulario'
import React from 'react'
import { useState } from 'react'
import { css } from '@emotion/react'
import Layout from '@/components/layout/Layout'
import Router from 'next/router'
//importar firebase
import firebase from '@/firebase'
//validaciones
import useValidacion from '@/hooks/useValidacion'
import validarCrearCuenta from '@/validacion/validarCrearCuenta'


const STATE_INICIAL ={
        nombre:'',
        email:'',
        password:''
    }

export default function CrearCuenta() {
    const {valores,errores,handleSubmit,handleChange,handleBlur} = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta)
    const [error,setError]=useState(false)
    const {nombre,email,password} = valores;

    async function crearCuenta(){
        console.log("creando")
        try {
            await firebase.registrar(nombre,email,password)
            Router.push("/")
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError("El correo electrónico ya está en uso");
                setTimeout(() => {
                    setError("")
                }, 1500);
                
            } else {
                console.error("Hubo un error al crear el usuario", error.message);
                setError(error.message)
            }
        }
    }
    return (
        <>
            <div >
                <Layout>
                    <>
                        <h1
                            css={css`
                                text-align:center;
                                margin-top:5rem;
                            `}
                        >Crear Cuenta</h1>
                        <Formulario
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <Campo>
                                <label htmlFor='nombre'>Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    placeholder='Tu nombre'
                                    name='nombre'
                                    value={nombre}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>
                            {errores.nombre && <Error>{errores.nombre}</Error>}
                            <Campo>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder='Tu email'
                                    name='email'
                                    value={email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>
                            {errores.email && <Error>{errores.email}</Error>}
                            <Campo>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder='Tu password'
                                    name='password'
                                    value={password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>
                            {errores.password && <Error>{errores.password}</Error>}
                            {error && <Error>{error}</Error>}
                            <InputSubmit
                                type="submit"
                                value="Crear Cuenta"
                            />
                        </Formulario>
                    </>
                </Layout>
            </div>
        </>
    )
}
