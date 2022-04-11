const Student = require("../models/student");

// CREATE STUDENT RESULT

const createStudentResult = async (req, res) => {
    try {
      const {name,rollNo, score,dob} = req.body;

        // check if user with same roll number exists or not

        const oldStudent = await Student.findOne({where: {rollNo}});

        if (oldStudent) {
            res.status(409).json({
                    error: `student with roll number ${rollNo} already exists.`
            });
        } else {
            const student = await Student.create({name,rollNo,score,dob})
                .then(() => {
                    res.status(201).json({
                            message: "student result successfuly created !!"
                    });
                })
                .catch((err) => {
                    res.status(409).json({
                        error: `some error occured`
                    });
            });
        }
    } catch (err) {
        console.log(err);
       return  res.status(409).json({
            error: `some error occured`
        });
    }
};

// READ ALL RESULTS

const getAllStudentsResults = async (req, res) => {
    const students = await Student.findAll();
    res.status(200).json(students);
};

// UPDATE STUDENT RESULT

const updateStudentResult = async (req, res) => {
    try {
        const {name,rollNo,score,dob} = req.body;

        const student = await Student.findByPk(req.params.id)
            .then(function(student) {
                if (student) {
                    const oldStudent = Student.findOne({where: {rollNo: rollNo},
                    }).then((oldStudent) => {
                        if (oldStudent != null && oldStudent.id != student.id) {
                           return res.status(409).json({
                                    error: `Student with roll number ${rollNo} already exists`,
                            });
                        } else {
                            student.update({ name,rollNo,score,dob})
                            .then(function() {
                                res.status(201).json({
                                        message: "student result successfuly updated !!"
                                });
                            })
                            .catch((err) => {
                                return res.status(409).json({
                                    error: `some error occured`
                                });
                            });
                        }
                    });
                }
            })
            .catch((err) => {
                return res.status(409).json({
                    error: `some error occured`
                });
            });
    } catch (err) {
        return res.status(409).json({
            error: `some error occured`
        });
    }
};

// DELETE STUDENT RESULT

const deleteStudentResult = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (student) {
            await student
                .destroy()
                .then(() => {
                    res
                        .status(200)
                        .json({
                            message: `student result successfully deleted !!`
                        });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json({
                        error: `some error occured`
                    });
                });
        } else {
            return res.status(400).json({
                    error: `student with ${req.params.id} does not exist !!`
                });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: "some error occurred !!"
        });
    }
};

const getStudentResultByRollAndDob = async (req, res) => {
  const student =  await Student.findOne({
        where:{
          rollNo: req.body.rollNo,
          dob : req.body.dob
         }}).catch((err)=>{
           console.log("Not found");
         })
         if(student){
           res.status(200).json(student)
         }else {
           return res.status(404).json({error : `Result of student with roll number ${req.body.rollNo} not found !!`});
         }
}

const getStudentResultById = async (req, res) => {
    const studentResult = await Student.findByPk(req.params.id).then((studentResult) => {
        res.status(200).json({
            message: `student result with ${req.params.id} id successfully found`,
            result: studentResult
        });
    }).catch(err => {
        return res.status(404).json({
            error: `student result with ${req.params.id} id not found`
        })
    });
}

module.exports = {
    createStudentResult,
    getAllStudentsResults,
    updateStudentResult,
    deleteStudentResult,
    getStudentResultByRollAndDob,
    getStudentResultById
};