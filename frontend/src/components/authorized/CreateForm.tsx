// import { useState } from "react"
import "./styles/CreateForm.css"

export const CreateForm = ({ active, setActive, children }: any) => {
    return (
        <div className={active ? "create-page__main active" : "create-page__main"} onClick={() => setActive(false)}>
            <div className={active ? "create-page__form active" : "create-page__form"} onClick={e => e.stopPropagation()}>
                {children}
            </div>

        </div>

    )
}