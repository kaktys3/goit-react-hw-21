import { configureStore } from '@reduxjs/toolkit'
import telReducer from './contacOperation.js'

export const store = configureStore({
    reducer: {
        tell: telReducer
    }
})