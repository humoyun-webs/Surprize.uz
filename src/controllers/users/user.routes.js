import express from 'express';
import userContr from './user.contr.js';
import userMiddleware from './user.middleware.js';
import auth from '../../middleware/auth.js';
const router = express.Router();
let { get, getById, create, update,getOrders , delete: deleteUser,login,toggleFavorite,getFavorites } = userContr;
let {UserUpdateMD,UserPostMD} = userMiddleware;
let { UserAuth,UserModifyAuth } = auth;

router.get('/', get);
router.get("/favorite", UserAuth, getFavorites);
router.get("/orders", UserAuth, getOrders);
router.get('/:id', getById);
router.post('/',UserPostMD, create);
router.post("/login", login);
router.put("/:id", UserAuth,UserModifyAuth,UserUpdateMD, update);
router.delete('/:id', deleteUser);
router.post("/favorite", UserAuth, toggleFavorite);

export default router;
