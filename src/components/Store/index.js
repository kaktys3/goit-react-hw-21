import {createStore} from 'redux'
import { telReducer } from './contacOperation.js'

export const store = createStore(telReducer)