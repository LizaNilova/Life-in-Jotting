import User from "../models/user.js";
import notebooks from "../models/notebooks.js";
import Page from "../models/pages.js"

const editPage = async ({ title, blocks, bg_color, bg_url, page_id }) => {
    const page = await Page.findById(page_id)
    if (page) {
        page.blocks = blocks
        page.title = title
        page.bg_color = bg_color
        page.bg_url = bg_url
        await page.save()
        return { page: page, message: `Page was successfuly updated...` }
    } else {
        return { message: "Page not found...", page: null }
    }
}

const createPage = async ({ title, bg_color, bg_url, notebook_id }) => {
    const notebook = notebooks.findById(notebook_id)
    if (notebook) {
        const newPage = new Page({
            notebook: notebook_id,
            title: title,
            bg_color: bg_color,
            bg_url: bg_url,
            blocks: []
        })
        // console.log(newPage.notebook)
        await newPage.save()
        return {
            page: newPage,
            message: "Created a new page"
        }
    } else {
        return {
            page: null,
            message: "Notebook not found"
        }
    }
}

const getPageById = async (page_id) => {
    // console.log(1)
    return ({
        page: await Page.findById(page_id),
        message: `Page was returned ...`
    })
}

const createNotebook = async ({ name, cover, user }) => {
    //creating a notebook without pages
    const user_data = await User.findOne({ _id: user._id })

    if (user_data) {
        if (user_data._id && name && cover) {
            const newNotebook = new notebooks({ name: name, user: user_data._id, cover: cover })
            await newNotebook.save()
            return ({
                notebook: newNotebook,
                message: `New notebook was created... name=${name}, cover=${cover}, user_data._id=${user_data._id}`
            })
        } else {
            return ({
                notebook: null,
                message: `Incorrect input data... name=${name}, cover=${cover}, user_data._id=${user_data._id}`
            })
        }
    } else {
        return {
            notebook: null,
            message: "User not found"
        }
    }
}

const getAllUsersNotebooks = async ({ user_id }) => {
    const result = await notebooks.find({ user: user_id })
    return (result)
}

const getAllPagesOfNotebook = async ({ notebook_id }) => {
    const res = await Page.find({ notebook: notebook_id })
    return (res.map((item) => ({ title: item.title, id: item._id })))
}



export {
    createNotebook,
    getAllUsersNotebooks,
    createPage,
    editPage,
    getAllPagesOfNotebook,
    getPageById
}