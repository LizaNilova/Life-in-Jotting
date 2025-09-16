import file from "../../img/icons/bookmark.svg"
import delete_icon from "../../img/icons/recycle-bin.png"
import { useAppDispatch } from "../../store/hooks"
import { getPage } from "../../store/reducers/pageSlice"

import "./styles/PageListItem.css"

export const PageListItem = (page: any) => {
    // console.log(page)
    const dispatch = useAppDispatch()

    const onClickPageItem = () => {
        dispatch(getPage(page?.page.id))
    }
    return (
        // <div>{page?.page_name}</div>
        <div className="page-list-item__main" onClick={onClickPageItem}>
            <div className="pages-list-item__container">
                <img src={file} className="new-page-icon" />
                <p className="new-page-text">{page?.page.title}</p>
            </div>
            <div className="page__settings-icon">
                <img src={delete_icon} />
            </div>

        </div>

    )
}