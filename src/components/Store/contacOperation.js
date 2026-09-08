import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { deleteContact, loadingData, outLogin, supabaseLogin, supabasePushNewTodos, supabaseRegister } from "./fetchContacts"
// import { supabaseData } from "./fetchContacts"

export const tellBooks = createEntityAdapter({})

const telReducer = createSlice({
    name: 'tell',
    initialState: tellBooks.getInitialState({
        filter: '',
        loading: false,
        error: null,
        login: false
    }),
    reducers: {
        addFilter(state, action) {
            state.filter = action.payload
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(supabaseLogin.fulfilled, (state, action) => {
                tellBooks.setAll(state, action.payload.data)
                state.login = action.payload.login
                state.loading = false
            })

            .addCase(supabaseRegister.fulfilled, (state, action) => {
                tellBooks.setAll(state, action.payload.contactList)
                state.loading = false
                state.login = action.payload.login
            })

            .addCase(supabasePushNewTodos.fulfilled, (state, action) => {
                state.loading = false
                tellBooks.setAll(state, action.payload)
            })

            .addCase(loadingData.fulfilled, (state, action) => {
                state.loading = false
                tellBooks.setAll(state, action.payload.data)
                state.login = action.payload.login
            })

            .addCase(deleteContact.fulfilled, (state, action) => {
                state.loading = false
                tellBooks.setAll(state, action.payload)
            })

            .addCase(outLogin.fulfilled, (state, action) => {
                state.loading = false
                tellBooks.setAll(state, action.payload.contactList)
                state.login = action.payload.login
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
