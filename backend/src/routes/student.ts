import { Router } from 'express';
import { createStudent, getAllStudent, getStudentbyId, updateStudentInfo, deleteStudent } from '../controllers';

const router = Router();

router.get('/', getAllStudent);

router.get('/:id', getStudentbyId);

router.post('/', createStudent);

router.patch('/:id', updateStudentInfo);

router.delete('/:id', deleteStudent);

export const studentRouter: Router = router;
