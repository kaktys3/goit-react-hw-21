import { Outlet } from "react-router-dom"
import { Header } from "./Header/Header"

export const Loyute = () => {
    return (
        <>
        <Header/>
        <Outlet/>
        </>
    )
}