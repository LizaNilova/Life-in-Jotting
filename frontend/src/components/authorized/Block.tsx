import { useEffect, useState } from "react"

import "./styles/Block.css"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setNewDatainBlock } from "../../store/reducers/pageSlice"

export const Block = ({ block, index }: any, { key }: any) => {

    const { page } = useAppSelector(state => state.pageSlice)
    const [text, setText] = useState(block.text)

    const dispatch = useAppDispatch()

    const onChangeBlock = () => {
        dispatch(setNewDatainBlock({ index: index, text: text }))
    }

    return (
        <label>
            <input type="checkbox" />
            <div className="block__container">
                <textarea
                    className="block__text-field"
                    // type="text"
                    // aria-multiline
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value)
                        onChangeBlock()
                    }} />
                <div className="block__images-container">
                    {block.entityRanges[0]
                        ? <div className="block__container-img-1">
                            <img src={block.entityRanges[0].src} className="block__img-1" />
                        </div>
                        : <div className="block__add-img-1">
                            <p>Додати зображення</p>
                        </div>
                    }{block.entityRanges[1]
                        ? <div className="block__container-img-2">
                            <img src={block.entityRanges[1].src} className="block__img-2" />
                        </div>
                        : <div className="block__add-img-2">
                            <p>Додати зображення</p>
                        </div>
                    }{block.entityRanges[2]
                        ? <div className="block__container-img-3">
                            <img src={block.entityRanges[2].src} className="block__img-3" />
                        </div>
                        : <div className="block__add-img-3">
                            <p>Додати зображення</p>
                        </div>
                    }
                </div>
            </div>
        </label>

    )
}