import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFilter } from '../Store/contacOperation.js'
import lg from './TelBook.module.css'
import { filterList, isLogin, selectAllContacts } from '../Store/tellBookSelector.js';
import { deleteContact, loadingData, supabasePushNewTodos } from '../Store/fetchContacts.jsx';
import { Navigate } from 'react-router-dom';

const ContactList = ({ abonentData }) => {
    const dispatch = useDispatch()
    const tell = useSelector(selectAllContacts)

    return (
        <>
            <div className={lg['contact-box']} >
                <li className={lg.contact}>{`${abonentData.name} ${abonentData.number}`}</li>
                <button onClick={() => dispatch(deleteContact({ id: abonentData.id, allContacts: tell }))}>видалити контакт</button>
            </div>
        </>
    )
}

export default function TelBook() {
    const [name, setName] = useState('')
    const [number, setNumber] = useState()
    const tell = useSelector(selectAllContacts)
    const list = useSelector(filterList)
    const dispatch = useDispatch()

    const addContacts = (name, number) => {
        dispatch(supabasePushNewTodos([...tell, { id: crypto.randomUUID(), name: name, number: number }]))
    }

    const isLoginUser = useSelector(isLogin)

    if (!isLoginUser) {
        return <Navigate to='/login' replace />
    }


    console.log(tell)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (tell.some(contact => contact.name === name)) {
            return alert(`${name} is already in contacts`)
        } else {
            addContacts(name, number)
            setName('')
            setNumber('')
        }

    }

    useEffect(() => {
        dispatch(loadingData())
    }, [])

    return (
        <div className={lg.container}>
            <h1 className={lg['title-form']}>Ponebook</h1>
            <form className={lg['add-tel-form']} onSubmit={handleSubmit}>
                <label className={lg['tel-name']}>
                    Name
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        name="name"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
                </label>

                <label className={lg['tel-number']}>
                    Number
                    <input
                        onChange={(e) => setNumber(e.target.value)}
                        value={number}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                </label>
                <button type='submit' className={lg.submit}>Add contact</button>
            </form>
            <h1>Contacts</h1>
            <div>
                <p>Find contacts by name</p>
                <input type="text" name='filter' onChange={(e) => dispatch(addFilter(e.target.value))} />
            </div>
            <ul className={lg['tel-list']}>
                {list.map((contact, index) => (
                    <ContactList key={index} abonentData={contact} />
                ))}
            </ul>
        </div>
    )
}