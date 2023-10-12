import express from 'express'
import { adminAuth,adminLogout } from '../controllers/adminController.js'

const router=express.Router()

router.post('/admin/login',adminAuth)
router.post('/admin/logout',adminLogout)