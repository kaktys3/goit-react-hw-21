import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    filter: '',
    contacts: []
}

const telReducer = createSlice({
    name: 'tell',
    initialState,
    reducers: {
        addContact: (state, action) => {
            state.contacts.push(action.payload)
        },

        removeContacts: (state, action) => {
            state.contacts = state.contacts.filter(e => e.name != action.payload)
        },

        addFilter: (state, action) => {
            state.filter = action.payload
        }
    }
})

export const {addContact, removeContacts, addFilter} =  telReducer.actions
export default telReducer.reducer
