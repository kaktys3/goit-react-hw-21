const dataContacts = localStorage.getItem('contacts')

const defoltStore = {
    filter: '',
    contacts: dataContacts ? JSON.parse(dataContacts) : []
}

export const telReducer = (state = defoltStore, action) => {
    switch (action.type) {
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }

        case 'REOMOVE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(e => e.name != action.payload)
            }

        case 'ADD_FILTER':
            return {
                ...state,
                filter: action.payload
            }

        default:
            return state
    }
}

