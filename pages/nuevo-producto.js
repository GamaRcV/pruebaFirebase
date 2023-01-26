
import styled from '@emotion/styled'
import React from 'react'
import Layout from '@/components/layout/Layout'

const Heading = styled.h1`
  color: red;
`
export default function NuevoProducto() {
  return (
    <>
      <div >
      <Layout>
        <Heading>Nuevo producto</Heading>
      </Layout>
      </div>
    </>
  )
}
