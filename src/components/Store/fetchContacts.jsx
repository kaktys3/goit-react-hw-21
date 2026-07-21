import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContacts = createAsyncThunk(
    'contacts/conytact',
    async (_, thunkApi) => {
        try {
            const responce = await axios.get('https://6a51d80bc576c846dcba90c4.mockapi.io/contact/contacts')
            return responce.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const contactDataRemove = createAsyncThunk(
    'contact/delet',
    async (id, thunkApi) => {
        try {
            await axios.delete(`https://6a51d80bc576c846dcba90c4.mockapi.io/contact/contacts/${id}`)
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)