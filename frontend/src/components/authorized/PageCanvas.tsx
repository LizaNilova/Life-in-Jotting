import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { editPage, pushBlock } from "../../store/reducers/pageSlice"
import { Block } from "./Block"

import "./styles/PageCanvas.css"

export const PageCanvas = () => {
    const { page } = useAppSelector(state => state.pageSlice)

    const dispatch = useAppDispatch()

    const addNewBlock = () => {
        if (page) {
            dispatch(pushBlock({
                text: "",
                depth: 0,
                isDone: false,
                inlineStyleRanges: [],
                entityRanges: [],
                font: null,
                fontSize: null,
                border_color: null,
                textAlign: null
            }))
        }
        console.log(page?.blocks)
    }

    const onClickSaveChanges = () => {
        console.log(page?.blocks)
        dispatch(editPage({ page_id: page?._id, title: page?.title, blocks: page?.blocks, bg_color: page?.bg_color, bg_url: page?.bg_url }))
    }

    return (
        <div className="page-canvas__main-container">
            <div className="page-canvas__header">
                {
                    page ? <>
                        {page?.title}
                        <div className="page-canvas__btns">
                            <div className="page-canvas__save" onClick={onClickSaveChanges}>Зберегти зміни</div>
                        </div>
                    </> : <></>

                }

            </div>
            <div className="page-canvas__main-field" onClick={addNewBlock}>
                <div onClick={(e) => {
                    e.stopPropagation()
                }}>
                    {page && page?.blocks && page?.blocks.map((item, index) => (
                        <Block block={item} index={index} />
                    ))}
                </div>

            </div>
        </div>
    )
}