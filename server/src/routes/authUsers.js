import express from 'express';
import {createAuthUser} from '../controllers/createAuthUser.js';
import { getAuthUsers } from '../controllers/getAuthUsers.js';
import { updateAuthUser } from '../controllers/updateAuthUser.js';
import { deleteAuthUser } from '../controllers/deleteAuthUser.js';


const router = express.Router();

router.get('/', getAuthUsers);

router.post('/', createAuthUser);

router.put('/:id', updateAuthUser);

router.delete('/:id', deleteAuthUser);

export default router;