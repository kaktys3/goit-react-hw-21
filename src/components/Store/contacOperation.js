import { createSlice } from "@reduxjs/toolkit"
import { fetchContacts } from "./fetchContacts"
import axios from "axios"

const initialState = {
    filter: '',
    contacts: [],
    loading: false,
    error: null
}

const telReducer = createSlice({
    name: 'tell',
    initialState,
    reducers: {
        addContact: (state, action) => {
            state.contacts.push(action.payload)
            const contactDataPush = async () => {
                await axios.post('https://6a51d80bc576c846dcba90c4.mockapi.io/contact/contacts', action.payload)
            }

            contactDataPush()
        },

        removeContacts: (state, action) => {
            state.contacts = state.contacts.filter(e => e.name != action.payload)
        },

        addFilter: (state, action) => {
            state.filter = action.payload
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true
            })

            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.contacts = action.payload
                state.loading = false
            })

            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { addContact, removeContacts, addFilter } = telReducer.actions
export default telReducer.reducer
