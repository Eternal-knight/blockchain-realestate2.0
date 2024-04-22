import React from 'react'
import {Outlet} from 'react-router-dom'
import Headers from '../common/Header.jsx'
import Footer from '../common/Footer.jsx'

const Layout = () => {
  return (
    <>
    <Headers />
    <Outlet />
    <Footer />
    </>
  )
}

export default Layout