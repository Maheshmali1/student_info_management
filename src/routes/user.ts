import { Router } from 'express';
import { registerUser, loginUser, refreshTokenGeneration, logoutUser } from '../controllers';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/refreshToken', refreshTokenGeneration);

router.delete('/logout', logoutUser);

export const userRouter: Router = router;
