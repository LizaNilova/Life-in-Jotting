import search_item from "../../img/icons/search-item.svg"
import new_page from "../../img/icons/file-invoice.svg"
import { PageListItem } from "./PageListItem.tsx";

import "./styles/Pages.css"
import { useState } from "react";
import { CreateForm } from "./CreateForm.tsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { createPage } from "../../store/reducers/pageSlice.ts";
import Select from "react-select";

export const Pages = () => {
    const [modalActive, setModalActive] = useState(false)
    const [selectedOption, setSelectedOption] = useState({ value: "Різне", label: "Різне" });
    const { pages } = useAppSelector(state => state.pageSlice)
    const { active_notebook } = useAppSelector(state => state.pageSlice)
    const [title, setTitle] = useState("")

    const dispatch = useAppDispatch()

    const submitCreatingPage = (event: any) => {
        dispatch(createPage({ notebook_id: active_notebook, title: title, bg_url: "", bg_color: "" }))
        event.preventDefault();
        setModalActive(false)
    }

    const categories = [
        { value: "Other", label: "Other" },
        { value: "Study", label: "Study" },
        { value: "Home", label: "Home" },
        { value: "Work", label: "Work" },
    ]


    return (
        <div className="pages__main-component">
            <div className="pages__search-bar">
                {/* <input type="text" placeholder="Пошук по сторінках..." /> */}
                <Select
                    className="search-bar__input"
                    value={selectedOption}
                    onChange={(newValue) => {
                        if (newValue) setSelectedOption(newValue);
                    }}
                    placeholder="Пошук за категорією..."
                    defaultValue={categories[0]}
                    options={categories}
                    formatOptionLabel={cover => (
                        <div>
                            {/* <img width='90px' src={cover?.value} alt="cover-image" /> */}
                            <span>{cover?.label}</span>
                        </div>
                    )}
                />
                <img src={search_item} className="pages__search-img" />
            </div>
            <div className="pages__pages-list">
                {active_notebook && <>
                    <div className="add-new-page" onClick={() => setModalActive(true)}>
                        <img src={new_page} className="new-page-icon" />
                        <p className="new-page-text">Нова сторінка</p>
                    </div>
                    {pages.map((item, index) => (
                        <PageListItem key={index} page={item} />
                    ))}</>}
            </div>
            <CreateForm active={modalActive} setActive={setModalActive}>
                <form className="create-page-form" onSubmit={submitCreatingPage}>
                    <p className="create-page__header">Створення сторінки</p>
                    <div className="create-page__inputs">
                        <label>Назва сторінки</label>
                        <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    </div>
                    <div className="create-page__btn">
                        <input type="submit" value="Створити" />
                    </div>
                </form>
            </CreateForm>
        </div>
    )
}