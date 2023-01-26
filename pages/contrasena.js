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
import validarEmail from '@/validacion/validarEmail'

const STATE_INICIAL = {
  email: '',
}

export default function Login() {
  const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarEmail, reestablecer)
  const [error, setError] = useState(false)
  const { email } = valores;

  async function reestablecer(){
    console.log("reestableciendo")
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
              
              {error && <Error>{error}</Error>}
              <InputSubmit
                type="submit"
                value="Iniciar Sesion"
              />

              
            </Formulario>
          </>
        </Layout>
      </div>
    </>
  )
}
