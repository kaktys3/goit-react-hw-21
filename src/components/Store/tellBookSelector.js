import { createSelector } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"


export const tellSelector = (state) => state.tell.contacts
export const filterSelector = (state) => state.tell.filter

export const filterList = createSelector(
    [tellSelector, filterSelector],
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