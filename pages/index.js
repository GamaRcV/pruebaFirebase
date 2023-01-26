import { FirebaseContext } from '@/firebase'
import styled from '@emotion/styled'
import React, { useContext } from 'react'
import Layout from '@/components/layout/Layout'
import Router from 'next/router'

const Heading = styled.h1`
  color: red;
`
export default function Home() {
  const { usuario } = useContext(FirebaseContext)
  function regresar(){
    if(!usuario){
      Router.push("/login")
    }
  }
  return (
    <>
      {usuario ? (
        <div >
        <Layout>
          <Heading>Inicio</Heading>
        </Layout>
      </div>
      ): regresar()}
    </>
  )
}
