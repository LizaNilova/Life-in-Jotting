import { Router } from "express"

import { PagesController } from "../controllers/pages.js"

const router = new Router()
const pages = new PagesController()
//Get All pages of notebook by notebook_id
router.get('/:notebook_id/pages', pages.getAllPagesOfNotebook)

//get one page by id
router.get('/pages/:page_id', pages.getPageById)

//create page in notebook
router.post('/:notebook_id/new-page', pages.createPage)

//edit page
router.post('/pages/:page_id/edit', pages.editPage)

//get all users notebooks
router.get('/all', pages.getAllUsersNotebooks)

//create new notebook
router.post('/new-notebook', pages.createNotebook)

//delete page
router.delete('/pages/:page_id/delete', pages.deletePageFromNotebook)

//delete notebook with pages
router.delete('/:notebook_id/delete', pages.deleteNotebookWithPages)

//replace page from one notebook to another (not implemented yet)

export default router