import { createSelector } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { tellBooks } from "./contacOperation";


export const selectTellState = (state) => state.tell
export const filterSelector = (state) => state.tell.filter

export const {
    selectAll: selectAllContacts,
    selectById: selectContactById,
    selectTotal: selectTotalContacts,
    selectIds: selectContactIds,
} = tellBooks.getSelectors(selectTellState);

console.log(filterSelector)

export const filterList = createSelector(
    [selectAllContacts, filterSelector],
    (contacts, filter) => {
        const lengthText = filter.length
        const listString = contacts.filter((e) => e.name.slice(0, lengthText) === filter)

        if (listString) {
            return listString
        } else {
            return 
        }
    }
)