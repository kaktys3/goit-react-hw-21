import reg from './Register.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { supabaseRegister } from '../Store/fetchContacts'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
    const [userData, setUserData] = useState({ email: '', password: '' })
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const hundelSubmit = (e) => {
        e.preventDefault()

        dispatch(supabaseRegister(userData))
            .unwrap()
            .then(() => {
                navigate('/contactPage', { replace: true })
            })
            .catch((error) => {
                alert('сталась помилка при реєстрації:', error)
            })
        setUserData({ email: '', password: '' })
    }

    return (
        <>
            <div className={reg.container}>
                <h1 className={reg.title}>
                    Salute! Sign up to receive another ad in your inbox every day!
                </h1>
                <form className={reg.form} onSubmit={hundelSubmit}>
                    <div className={reg.formGroup}>
                        <label htmlFor="email" className={reg.label}>Gmail</label>
                        <input
                            type="email"
                            id="email"
                            className={reg.input}
                            placeholder="example@gmail.com"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                    </div>

                    <div className={reg.formGroup}>
                        <label htmlFor="password" className={reg.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            className={reg.input}
                            placeholder="123456"
                            value={userData.password}
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        />
                    </div>

                    <button to='/' type="submit" className={reg.button}>Sign Up</button>
                </form>
            </div>
        </>
    )
}