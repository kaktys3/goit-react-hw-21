import hd from './Header.module.css'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <>
            <header>
                <nav className={hd.nav}>
                    <Link className={hd.headerLink} to='/'>Register</Link>
                    <Link className={hd.headerLink} to='/login'>Login</Link>
                    <Link className={hd.headerLink} to='/contactPage'>Contacts</Link>
                </nav>
            </header>
        </>
    )
}