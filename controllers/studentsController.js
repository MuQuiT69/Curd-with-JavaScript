const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

router.get('/', (req, res) => {
    res.render("students/addOrEdit", {
        viewTitle: "Insert Students"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var students = new Student();
    students.fullName = req.body.fullName;
    students.email = req.body.email;
    students.mobile = req.body.mobile;
    students.city = req.body.city;
    students.save((err, doc) => {
        if (!err)
            res.redirect('students/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("students/addOrEdit", {
                    viewTitle: "Insert Student",
                    students: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Student.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('students/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("students/addOrEdit", {
                    viewTitle: 'Update Student',
                    students: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Student.find((err, docs) => {
        if (!err) {
            res.render("students/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving students list :' + err);
        }
        
    }).lean();
    
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Student.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("students/addOrEdit", {
                viewTitle: "Update Student",
                students: doc
            });
            
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/students/list');
        }
        else { console.log('Error in students delete :' + err); }
    });
       
});

module.exports = router;