// import notebooks from "../models/notebooks.js";
import { createPage, getPageById, editPage, getAllPagesOfNotebook, getAllUsersNotebooks, createNotebook } from "../services/pageService.js";
import jwb from "jsonwebtoken"
import { getUserByIdInToken } from "../services/userService.js";

export class PagesController {
    async createNotebook(req, res) {
        try {
            const token = req.cookies.accessToken;
            if (!token) {
                res.json({ message: "User unauthorized" })
                return;
            }
            const user = jwb.verify(token, process.env.JWT_SECRET);
            const user_data = await getUserByIdInToken(user.id)
            const { name, cover } = req.body
            const result = await createNotebook({ name: name, cover: cover, user: user_data })
            console.log(result)
            res.json(result)

        } catch (error) {
            console.log("create notebook: " + error)
        }
    }

    async createPage(req, res) {
        try {
            const token = req.cookies.accessToken;
            if (!token) {
                res.json({
                    notebook: null, message: "User unauthorized"
                })
                return;
            }

            const user = jwb.verify(token, process.env.JWT_SECRET);
            const user_data = await getUserByIdInToken(user.id)
            if (user_data) {
                res.json(await createPage({ title: req.body.title, bg_color: req.body.bg_color, bg_url: req.body.bg_url, notebook_id: req.body.notebook_id }))
                return
            }
            res.json({ message: "User has no access (create pages)..." })
        } catch (error) {
            console.log("create page: " + error)
        }
    }

    async getPageById(req, res) {
        try {
            const token = req.cookies.accessToken;
            if (!token) {
                res.json({ message: "User unauthorized" })
                return;
            }
            const user = jwb.verify(token, process.env.JWT_SECRET);
            const user_data = await getUserByIdInToken(user.id)
            if (user_data) {
                const page_id = req.params.page_id
                console.log(page_id)
                res.json(await getPageById(page_id))
                return
            }
            res.json({
                page: null,
                message: "User has no access (get page by id)..."
            })
        } catch (error) {
            console.log('get page: ' + error)
        }

    }

    async editPage(req, res) {
        try {
            const token = req.cookies.accessToken;
            if (!token) {
                res.json({ message: "User unauthorized" })
                return;
            }
            const user = jwb.verify(token, process.env.JWT_SECRET);
            const user_data = await getUserByIdInToken(user.id)

            if (user_data) {
                const { title, blocks, bg_color, bg_url, page_id } = req.body.page
                console.log(blocks)
                res.json(await editPage({ title: title, blocks: blocks, bg_color: bg_color, bg_url: bg_url, page_id: page_id }))
                return
            }
            res.json({ message: "User has no access (edit pages)..." })
        } catch (error) {
            console.log("edit page: " + error)
        }
    }

    async getAllPagesOfNotebook(req, res) {
        try {
            const token = req.cookies.accessToken;
            if (!token) {
                res.json({
                    message: "User unauthorized",
                    pages: null,
                    notebook_id: ""
                })
                return;
            }
            const user = jwb.verify(token, process.env.JWT_SECRET);
            const user_data = await getUserByIdInToken(user.id)
            const notebook_id = req.params.notebook_id
            if (user_data) {
                // console.log(notebook_id)
                res.json({
                    pages: await getAllPagesOfNotebook({ notebook_id: notebook_id }),
                    notebook_id: notebook_id,
                    message: "Successfuly "
                })
                return
            }
            res.json({
                message: "User has no access (get pages for notebook)...",
                notebook_id: "",
                pages: null
            })
        } catch (error) {
            console.log("get all pages of notebook: " + error)
        }
    }

    async getAllUsersNotebooks(req, res) {
        try {
            const token = req.cookies.accessToken;
            if (!token) {
                res.json({
                    message: "User unauthorized",
                    pages: null
                })
                return;
            }
            const user = jwb.verify(token, process.env.JWT_SECRET);
            const user_data = await getUserByIdInToken(user.id)

            if (user_data) {
                res.json({
                    notebooks: await getAllUsersNotebooks({ user_id: user_data._id }),
                    message: "Successfuly got all notebooks..."
                })
                return
            }
            res.json({
                message: "User has no access (get notebooks)...",
                pages: null
            })
        } catch (error) {
            console.log("get all users notebooks: " + error)
        }
    }

    async deletePageFromNotebook(req, res) {

    }

    async deleteNotebookWithPages(req, res) {

    }

    async replacePageFromOneNotebookToAnother(req, res) {

    }
}
