import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Register } from './components/register/Register.jsx'
import TelBook from './components/TellBook/TelBook.jsx'
import { Loyute } from './components/Loyute.jsx'
import { Login } from './components/Login/Login.jsx'
import { useSelector } from 'react-redux'
import { isLogin } from './components/Store/tellBookSelector.js'

function App() {
  const isLoginUser = useSelector(isLogin)
  return (
    <>
      <Routes>
        <Route path='/' element={<Loyute/>}>
          <Route path='/' element={<Register />} />
          <Route path='/contactPage' element={<TelBook />} />
          <Route path='/login' element={<Login/>}/>
        </Route>
      </Routes>
      {/* <Register /> */}
      {/* <TelBook/> */}
    </>
  )
}

export default App
