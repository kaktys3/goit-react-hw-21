import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { contactDataRemove, fetchContacts, pushContact } from "./fetchContacts"

export  const tellBooks = createEntityAdapter({})

const telReducer = createSlice({
    name: 'tell',
    initialState: tellBooks.getInitialState({
        filter: '',
        loading: false,
        error: null
    }),
    reducers: {
        addFilter(state, action) {
            state.filter = action.payload
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.fulfilled, (state, action) => {
                tellBooks.setAll(state, action.payload)
                state.loading = false
            })

            .addCase(pushContact.fulfilled, (state, action) => {
                state.loading = false
                tellBooks.setAll(state, action.payload)
                console.log(state)
            })

            .addCase(contactDataRemove.fulfilled, (state, action) => {
                 state.loading = false
                tellBooks.setAll(state, action.payload)
            })

            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.loading = false
                    state.error = action.payload
                }
            )

            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true
                }
            )
    }
})
export const { addFilter } = telReducer.actions
export default telReducer.reducer
