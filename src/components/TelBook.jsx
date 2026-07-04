import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addContact, removeContacts, addFilter} from './Store/contacOperation.js'
import './TelBook.css'

const ContactList = ({ name, number, filter, delet }) => {
    const filterList = () => {
        const lengthText = filter.length
        const listString = name.slice(0, lengthText)

        if (listString === filter) {
            console.log(true)
            return true
        } else if (lengthText === 0) {
            console.log(true)
            return true
        } else {
            console.log(false)
            return false
        }
    }

    return (
        <>
            <div className='contact-box' style={filterList() ? { display: 'flex' } : { display: 'none' }}>
                <li className='contact'>{`${name} ${number}`}</li>
                <button onClick={() => delet(name)}>видалити контакт</button>
            </div>
        </>
    )
}

export default function TelBook() {
    const [name, setName] = useState('')
    const [number, setNumber] = useState()
    const tell = useSelector(state => state.tellBook.contacts)
    const filter = useSelector(state => state.tellBook.filter)
    const dispatch = useDispatch()
    console.log(tell)

    const addContacts = (name, number) => {
        dispatch(addContact({name: name, number: number}))
    }

    const deletContact = (name) => {
        dispatch(removeContacts(name))
    }

    const addFilters = (filter) => {
        dispatch(addFilter(filter))
    }


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

    return (
        <>
            <h1 className="title-form">Ponebook</h1>
            <form className='add-tel-form' onSubmit={handleSubmit}>
                <label className='tel-name'>
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

                <label className='tel-number'>
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
                <button type='submit' className='submit'>Add contact</button>
            </form>
            <h1>Contacts</h1>
            <div>
                <p>Find contacts by name</p>
                <input type="text" name='filter' onChange={(e) => addFilters(e.target.value)} />
            </div>
            <ul className="tel-list">
                {tell && tell.map((contact, index) => (
                    <ContactList key={index} filter={filter} delet={deletContact} name={contact.name} number={contact.number} />
                ))}
            </ul>
        </>
    )
}