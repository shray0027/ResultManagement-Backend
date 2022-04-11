var express = require('express');
const router = express.Router();
const resultController = require('../Controllers/resultController');
const authController = require('../Controllers/authController');
const auth = require('../middlewares/auth');


router.get('/getAll',auth,resultController.getAllStudentsResults);
router.post('/create',auth,resultController.createStudentResult);
router.put('/update/:id',auth,resultController.updateStudentResult);
router.delete('/delete/:id',auth,resultController.deleteStudentResult);
router.get('/getResultById/:id',auth,resultController.getStudentResultById);
router.post('/student/login',resultController.getStudentResultByRollAndDob);

router.post('/teacher/register',authController.teacherRegister);
router.post('/teacher/login',authController.teacherLogin);
router.get('/teacher/logout',authController.teacherLogout);

module.exports = router;
