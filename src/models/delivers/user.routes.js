import express from 'express';
import userContr from './user.contr.js';


const router = express.Router();
let { get, getById, create, update, delete: deleteUser } = userContr;

router.get('/', get);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteUser);

export default router;
