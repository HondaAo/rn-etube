import axios from 'axios'
import React from 'react'
import { AuthProvider } from './AuthProvider'
import Routes from './Route'

axios.defaults.baseURL = 'http://localhost:4000'


const Provider = () => {
    return (
        <AuthProvider>
          <Routes /> 
        </AuthProvider>
    )
}

export default Provider
