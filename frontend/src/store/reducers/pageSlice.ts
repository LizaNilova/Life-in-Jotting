import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import $api from "../../utils/api.ts"
import { pageState } from '../../types/types.ts'

const initialState: pageState = {
    //this is for testing purposes
    // notebooks: [
    //     { id: "1", user: "user1", name: "Notebook 1", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 2", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 3", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 4", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 5", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 5", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 5", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 5", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 5", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 5", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 5", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 5", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 5", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 5", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 5", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 5", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 5", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 5", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 5", cover: "Cover 1" },
    //     { id: "1", user: "user1", name: "Notebook 5", cover: "Cover 1" },
    // ],
    notebooks: [],
    active_notebook: "",
    pages: [],
    // page: {
    //     notebook: null,
    //     title: "",
    //     category: "Різне",
    //     bg_color: "",
    //     blocks: [],
    //     bg_url: ""
    // },
    page: null,
    message: null
}
export const getPages = createAsyncThunk('notebooks/getAllPages', async (notebook_id: string) => {
    try {
        // setActiveNotebook({ notebook_id: notebook_id })
        const { data } = await $api.get(`notebooks/${notebook_id}/pages`, { withCredentials: true })
        return data
    } catch (error: any) {
        console.log(error)
    }
})

export const getPage = createAsyncThunk('notebooks/get-page', async (page_id: string) => {
    try {
        console.log(page_id)
        const { data } = await $api.get(`notebooks/pages/${page_id}`, { withCredentials: true })
        return data
    } catch (error: any) {
        console.log(error)
    }
})

export const editPage = createAsyncThunk('notebooks/edit-page', async (page: any) => {
    try {
        console.log(page.blocks)
        const { data } = await $api.post(`notebooks/pages/${page._id}/edit`, { page }, { withCredentials: true })
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const createPage = createAsyncThunk('notebooks/new-page', async ({ title, notebook_id, bg_url, bg_color }: any) => {
    try {
        const { data } = await $api.post(`notebooks/${notebook_id}/new-page`, { title: title, bg_url: bg_url, bg_color: bg_color, notebook_id: notebook_id }, { withCredentials: true })
        return data
    } catch (error) {
        console.log(error)
    }
})

export const createNotebook = createAsyncThunk('notebooks/new-notebook', async ({ name, cover }: any) => {
    try {
        const { data } = await $api.post('notebooks/new-notebook', { name: name, cover: cover }, { withCredentials: true })
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getAllNotebooks = createAsyncThunk('notebooks/all-notebooks', async () => {
    try {
        const { data } = await $api.get('notebooks/all', { withCredentials: true })
        return data
    } catch (error) {
        console.log(error)
    }
})


export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        resetPageData(state: pageState) {
            // state.user = null
            // state.isLoading = false
            // state.status = "User was loged out"
        },

        setActiveNotebook(state: pageState, action) {
            // console.log(1)
            state.active_notebook = action.payload.notebook_id
        },

        pushBlock(state: pageState, action) {
            // console.log(1)
            state.page?.blocks.push(action.payload)
        },

        setNewDatainBlock(state: pageState, action) {
            const itemIndex = action.payload.index
            const item = state.page?.blocks[itemIndex]

            let newItem;
            if (item) {
                newItem = {
                    ...item,
                    text: action.payload.text
                }
            }
            if (state.page && newItem) {
                // console.log(state.page?.blocks)
                return state = {
                    ...state,
                    page: {
                        ...state.page,
                        blocks: [
                            ...state.page?.blocks.slice(0, itemIndex),
                            newItem,
                            ...state.page?.blocks.slice(itemIndex + 1)
                        ]
                    }

                }
            }
        }
    },
    extraReducers: (builder) => {
        //get all pages of notebook
        builder.addCase(getPages.pending, (state) => {
            state.pages = []
            // state.active_notebook = ""
        })
        builder.addCase(getPages.fulfilled, (state, action) => {
            state.pages = action.payload.pages
            state.message = action.payload.message
            state.active_notebook = action.payload.notebook_id
            console.log(state.active_notebook)
            // console.log(state.message)

        })
        builder.addCase(getPages.rejected, (state, action: any) => {
            state.pages = []
            // state.active_notebook = ''
            state.message = action.payload.message
        })

        //get page by id
        builder.addCase(getPage.pending, (state) => {
            state.page = null
            state.message = null
        })
        builder.addCase(getPage.fulfilled, (state, action) => {
            console.log(action.payload.message)
            state.page = action.payload.page
            state.message = action.payload.message
        })
        builder.addCase(getPage.rejected, (state, action: any) => {
            state.page = null
            state.message = action.payload.message
        })

        //edit page
        builder.addCase(editPage.pending, (state) => {
            state.page = null
            state.message = null
        })
        builder.addCase(editPage.fulfilled, (state, action) => {
            state.page = action.payload.page

            state.message = action.payload.message
        })
        builder.addCase(editPage.rejected, (state, action: any) => {
            state.page = null
            state.message = action.payload.message
        })

        //create new page
        builder.addCase(createPage.pending, (state) => {
            state.page = null
            state.message = null
        })
        builder.addCase(createPage.fulfilled, (state, action) => {
            state.page = action.payload.page
            state.message = action.payload.message
            if (action.payload.page)
                state.pages?.push(action.payload.page._id)
        })
        builder.addCase(createPage.rejected, (state, action: any) => {
            state.page = null
            state.message = action.payload.message
        })

        //create new notebook
        builder.addCase(createNotebook.pending, (state) => {
            state.message = null
        })
        builder.addCase(createNotebook.fulfilled, (state, action) => {
            if (action.payload.notebook)
                state.notebooks?.push(action.payload.notebook)
            state.message = action.payload.message
        })
        builder.addCase(createNotebook.rejected, (state, action: any) => {
            state.message = action.payload.message
        })

        //get all notebooks
        builder.addCase(getAllNotebooks.pending, (state) => {
            state.message = null
            state.notebooks = []
        })
        builder.addCase(getAllNotebooks.fulfilled, (state, action) => {
            state.message = action.payload.message
            state.notebooks = action.payload.notebooks
        })
        builder.addCase(getAllNotebooks.rejected, (state, action: any) => {
            state.message = action.payload.message
            state.notebooks = []
        })
    }
})

export default pageSlice.reducer
export const { resetPageData, setActiveNotebook, pushBlock, setNewDatainBlock } = pageSlice.actions