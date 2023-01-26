import { Formulario, Campo, InputSubmit, Error } from '@/components/ui/formulario'
import React from 'react'
import { useState } from 'react'
import { css } from '@emotion/react'
import Layout from '@/components/layout/Layout'
import Router from 'next/router'
import Link from 'next/link'
//importar firebase
import firebase from '@/firebase'
//validaciones
import useValidacion from '@/hooks/useValidacion'
import validarIniciarSesion from '@/validacion/validarIniciarSesion'

const STATE_INICIAL = {
  email: '',
  password:'',
}

export default function Login() {
  const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion)
  const [error, setError] = useState(false)
  const { email, password } = valores;

  async function iniciarSesion(){
    try {
      const usuario = await firebase.login(email,password)
      console.log(usuario)
      Router.push('/')
    } catch (error) {
      console.error('Hubo un error al autenitcar el usuario', error.message)
      setError(error.message)
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
                value="Iniciar Sesion"
              />

              <Link href="/contrasena">Olvidaste tu contraseña?</Link>
            </Formulario>
          </>
        </Layout>
      </div>
    </>
  )
}
