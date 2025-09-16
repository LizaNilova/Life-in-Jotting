import { notebookListItemProperty } from "../../types/types"
import "./styles/NotebookListItem.css"
import cover1 from "../../img/icons/notebook_covers/cover1.svg"
import cover2 from "../../img/icons/notebook_covers/cover2.jpg"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getPages, setActiveNotebook } from "../../store/reducers/pageSlice"
import { useEffect, useState } from "react"

export const NotebookListItem = ({ notebook, key }: any) => {
    const dispatch = useAppDispatch()
    let notebook_cover
    switch (notebook.cover) {
        case "cover1": {
            notebook_cover = cover1
            break;
        }
        case "cover2": {
            notebook_cover = cover2
            break
        }
    }

    const { active_notebook } = useAppSelector(state => state.pageSlice)


    const onClickNotebook = () => {
        dispatch(getPages(notebook._id))
    }
    return (
        <div className="notebooks__list-item" onClick={onClickNotebook}>
            <img src={notebook_cover} className="notebook__cover" />
            <div className="notebook__name">{notebook?.name}</div>
        </div>
    )
}