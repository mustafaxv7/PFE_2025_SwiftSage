import express from 'express';
import {createAuthUser} from '../controllers/createAuthUser.js';
import { getAuthUsers } from '../controllers/getAuthUsers.js';
import { updateAuthUser } from '../controllers/updateAuthUser.js';
import { deleteAuthUser } from '../controllers/deleteAuthUser.js';
import adminMiddleware from '../middleware/adminMiddleware.js';


const router = express.Router();
router.get('/', adminMiddleware,getAuthUsers);

router.post('/',adminMiddleware,createAuthUser);

router.put('/:id',adminMiddleware,updateAuthUser);

router.delete('/:id',adminMiddleware,deleteAuthUser);

export default router;