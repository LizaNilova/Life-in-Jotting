import notebook_icon from "../../img/icons/journal 1.svg"
import { NotebookListItem } from "./NotebookListItem"
import cover1 from "../../img/icons/notebook_covers/cover1.svg"
import cover2 from "../../img/icons/notebook_covers/cover2.jpg"
import "./styles/Notebooks.css"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { CreateForm } from "./CreateForm"
import { useEffect, useState } from "react"
import Select from "react-select";
import { createNotebook, getAllNotebooks } from "../../store/reducers/pageSlice"

export const Notebooks = () => {
    const { notebooks } = useAppSelector((state) => state.pageSlice)
    const [reloadNotebooks, setReloadNotebooks] = useState(true)

    useEffect(() => {
        if (reloadNotebooks) {
            dispatch(getAllNotebooks())
            setReloadNotebooks(false)
        }
    }, [reloadNotebooks])
    const dispatch = useAppDispatch()


    const { message } = useAppSelector(state => state.pageSlice)
    const [modalActive, setModalActive] = useState(false)

    const [title, setTitle] = useState("")

    const [selectedOption, setSelectedOption] = useState({ value: cover1, label: "cover1" });

    const notebook_covers = [
        { value: cover1, label: "cover1" },
        { value: cover2, label: "cover2" }
    ]

    useEffect(() => {
        if (message !== "New notebook was created..." && modalActive) {
            alert('Error: ' + message);
        } else {
            console.log(notebooks)
            setTitle("")
            setSelectedOption({ value: cover1, label: "cover1" })
            setModalActive(false)
        }
    }, [message])

    const submitCreatingPage = (event: any) => {
        event.preventDefault();
        dispatch(createNotebook({ name: title, cover: selectedOption?.label }))
    }


    return (
        <div className="notebooks__main-container">
            <div className="notebooks__header">
                <div className="notebooks__header-text">Мої блокноти</div>
                <img className="notebooks__header-icon" src={notebook_icon} />
            </div>
            <div className="add-new-notebook" onClick={() => setModalActive(true)}>
                <div className="plus">+</div>
                <p className="new-notebook-text">Новий блокнот</p>
            </div>
            <div className="notebooks__list-container">
                {notebooks.map((item, index) => (
                    <NotebookListItem key={index} notebook={item} />
                ))}

            </div>
            <CreateForm active={modalActive} setActive={setModalActive} >
                <form className="create-page-form" onSubmit={submitCreatingPage}>
                    <p className="create-page__header">Створення сторінки</p>
                    <div className="create-page__inputs">
                        <label>Назва блокноту</label>
                        <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    </div>
                    <div className="choose-cover">
                        <label className="cover-label">Обкладинка</label>
                        <Select
                            value={selectedOption}
                            onChange={setSelectedOption}
                            defaultValue={notebook_covers[0]}
                            options={notebook_covers}
                            formatOptionLabel={cover => (
                                <div className="cover-option">
                                    <img width='90px' src={cover?.value} alt="cover-image" />
                                    {/* <span>{cover?.label}</span> */}
                                </div>
                            )}
                        />
                    </div>
                    <div className="create-page__btn">
                        <input type="submit" value="Створити" />
                    </div>
                </form>
            </CreateForm>
        </div>
    )
}