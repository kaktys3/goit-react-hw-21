import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { persistor, store } from './components/Store/index.js'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename='goit-react-hw-21/'>
       <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
