import { useState, useEffect, useReducer } from 'react';
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

const initialState = {
    name: '',
    number: '',
    filter: '',
    contacts: []
}

function reduser(state, action) {
    switch (action.type) {
        case 'handelChang':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }

        case 'Submit':
            return {
                ...state,
                contacts: [...state.contacts, { name: state.name, number: state.number }],
                name: '',
                number: ''
            }

        case 'delete':
            return {
                ...state,
                contacts: action.payload
            }

        case "SET_DATA":
            return {
                ...state,
                contacts: action.payload
            }

            default: throw new Error();
    }
}

export default function TelBook() {
    const [state, dispatch] = useReducer(reduser, initialState)

    useEffect(() => {
        const dataContacts = localStorage.getItem('contacts')

        if (dataContacts) {
            dispatch({
                type: 'SET_DATA',
                payload: JSON.parse(dataContacts)
            })
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(state.contacts))
    }, [state.contacts])


    const handleSubmit = (e) => {
        e.preventDefault()

        if (state.contacts.some(contact => contact.name === state.name)) {
            return alert(`${state.name} is already in contacts`)
        } else {
            dispatch({ type: 'Submit' })
        }

    }

    const isDelet = (eDelet) => {
        const newList = state.contacts.filter(e => e.name != eDelet)
        dispatch({ type: 'delete', payload: newList })
    }

    return (
        <>
            <h1 className="title-form">Ponebook</h1>
            <form className='add-tel-form' onSubmit={handleSubmit}>
                <label className='tel-name'>
                    Name
                    <input
                        onChange={(e) => dispatch({ type: 'handelChang', payload: { name: e.target.name, value: e.target.value } })}
                        value={state.name}
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
                        onChange={(e) => dispatch({ type: 'handelChang', payload: { name: e.target.name, value: e.target.value } })}
                        value={state.number}
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
                <input type="text" name='filter' onChange={(e) => dispatch({ type: 'handelChang', payload: { name: e.target.name, value: e.target.value } })} />
            </div>
            <ul className="tel-list">
                {state.contacts.map((contact, index) => (
                    <ContactList key={index} filter={state.filter} delet={isDelet} name={contact.name} number={contact.number} />
                ))}
            </ul>
        </>
    )
}