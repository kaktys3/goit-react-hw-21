import { createAsyncThunk } from "@reduxjs/toolkit";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient('https://qqnjknibtvkclnedgeao.supabase.co', 'sb_publishable_sVvHtw8KauCOaa3J6sMutw_ykReeFXy',
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true
        }
    }
)

export const supabaseLogin = createAsyncThunk(
    'supabase/login',
    async (dataUser, thunkApi) => {
        try {
            const { email, password } = dataUser;
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (authError) {
                return thunkApi.rejectWithValue(authError.message);
            }

            if (authData?.user) {
                const { data: userInfo, error: dbError } = await supabase
                    .from('userINFO')
                    .select('contact_list')
                    .eq('id', authData.user.id)
                    .maybeSingle();

                console.log(userInfo)

                if (dbError) {
                    return thunkApi.rejectWithValue(dbError.message);
                }

                return userInfo ? { data: userInfo.contact_list, login: true } : []
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);
export const supabaseRegister = createAsyncThunk(
    'supabase/register',
    async (dataUser, thunkApi) => {
        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: dataUser.email,
                password: dataUser.password
            });

            if (authError) {
                return thunkApi.rejectWithValue(authError.message);
            }

            if (authData?.user) {
                const { error: insertError } = await supabase
                    .from('userINFO')
                    .insert({
                        id: authData.user.id,
                        gmail: authData.user.email,
                        contact_list: []
                    });

                if (insertError) {
                    return thunkApi.rejectWithValue(insertError.message);
                }

                if (authData?.user) {
                    const { data: userInfo, error: dbError } = await supabase
                        .from('userINFO')
                        .select('contact_list')
                        .eq('id', authData.user.id)
                        .maybeSingle();
                    if (dbError) {
                        return thunkApi.rejectWithValue(dbError.message);
                    }

                    return userInfo ? { contactList: userInfo.contact_list, login: true } : []
                }
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const supabasePushNewTodos = createAsyncThunk(
    'supabase/push',
    async (newTodo, thunkApi) => {
        const { data: { user } } = await supabase.auth.getUser()

        console.log(user)

        await supabase
            .from('userINFO')
            .update({ contact_list: newTodo })
            .eq('id', user?.id)

        return newTodo
    }
)

export const loadingData = createAsyncThunk(
    'supabase/loading',
    async (_, thunkApi) => {
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
            const { data: userInfo, error: dbError } = await supabase
                .from('userINFO')
                .select('contact_list')
                .eq('id', user.id)
                .maybeSingle();

            return { data: userInfo.contact_list, login: true }
        } else {
            return { data: [], login: false }
        }
    }
)

export const deleteContact = createAsyncThunk(
    'delete/contact',
    async (deletData, thunkApi) => {
        console.log(deletData.allContacts)
        const newList = deletData.allContacts.filter(e => e.id != deletData.id)
        const { data: { user } } = await supabase.auth.getUser()

        const { error } = await supabase
            .from('userINFO')
            .update({ contact_list: newList })
            .eq('id', user.id)
            .select()

        if (error) {
            console.log(error)
        } else {
            return newList
        }
    }
)

export const outLogin = createAsyncThunk(
    'outLogin/ supabase',
    async (_, thunkApi) => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Помилка під час виходу:', error.message);
        } else {
            console.log('Користувач успішно вийшов');
        }

        return { contactList: [], login: false }
    }
)