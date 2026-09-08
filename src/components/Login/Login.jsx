import login from './Login.module.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { outLogin, supabaseLogin } from '../Store/fetchContacts'
import { isLogin, isRegister } from '../Store/tellBookSelector'

export const Login = () => {
    const [userData, setUserData] = useState({ email: '', password: '' })
    const isLoginUser = useSelector(isLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const hundelSubmit = (e) => {
        e.preventDefault()

        dispatch(supabaseLogin(userData))
            .unwrap()
            .then(() => {
                navigate('/contactPage', {replace: true})
            })
            .catch((error) => {
                alert('Сталась помилка логінізації: ', error)
            })
        setUserData({ email: '', password: '' })

    }

    return (
        <>
            {isLoginUser ? <div className={login.outLoginContainer}>
                <h1 className={login.outLoginTitlr}>Out login</h1>
                <button className={login.outLoginButton} onClick={() => dispatch(outLogin())}>Click me</button>
            </div> : <div className={login.container}>
                <h1 className={login.title}>
                    Salute! Login to receive another ad in your inbox every day!
                </h1>
                <form className={login.form} onSubmit={hundelSubmit}>
                    <div className={login.formGroup}>
                        <label htmlFor="email" className={login.label}>Gmail</label>
                        <input
                            type="email"
                            id="email"
                            className={login.input}
                            placeholder="example@gmail.com"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                    </div>

                    <div className={login.formGroup}>
                        <label htmlFor="password" className={login.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            className={login.input}
                            placeholder="123456"
                            value={userData.password}
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        />
                    </div>

                    <button type="submit" className={login.button}>Sign Up</button>
                </form>
            </div>}
        </>
    )
}