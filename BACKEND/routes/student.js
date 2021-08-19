const router = require('express').Router()
let User = require('../models/student')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
let path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../frontend/public/images')
    },
    filename: function(req, file, cb) {
        cb(null, uuid4() + '-' + Date.now() + path.extname(file.originalname))

    }
})
const fileFilter = (req, file, cd) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
let upload = multer({ storage, fileFilter })

router.route('/add').post(upload.single('photo'), (req, res) => {
    const name = req.body.name
    const age = Number(req.body.age)
    const gender = req.body.gender
    const birthday = req.body.birthday
    const photo = req.file.filename

    // objName.prototype = {}//

    const newUserData = {
        name,
        age,
        gender,
        birthday,
        photo
    }
    const newUser = new User(newUserData)

    newUser.save()
        .then(() => res.json('User Added'))
        .catch(err => res.status(400).json('Error:' + err))
})

router.route("/").get((req, res) => {
    User.find().then((students) => {
        res.json(students)
    }).catch((err) => {
        console.log(err)

    })
})

router.route("/update/:id").put(upload.single('photo'), async(req, res) => {
    let userID = req.params.id;
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const birthday = req.body.birthday
    const photo = req.file.filename

    const updateStudent = { name, age, gender, birthday, photo }

    await User.findByIdAndUpdate(userID, updateStudent)
        .then(() => {
            res.status(200).send({ status: "User Update" })
        }).catch((err) => {
            console.log(err)
            res.status(500).send({ status: "Error with updating data", error: err.message })
        })
})

router.route("/delete/:id").delete(async(req, res) => {
    let userID = req.params.id

    await User.findByIdAndDelete(userID)
        .then(() => {
            res.status(200).send({ status: "User has successfully deleted" })

        }).catch((err) => {
            console.log(err)
            res.status(500).send({ status: "Error with deleting data", error: err.message })

        })
})

router.route("/get/:id").get(async(req, res) => {
    let userID = req.params.id

    await User.findById(userID)
        .then((students) => {
            res.status(200).send({ status: "User has Successfully fetched", students })

        }).catch((err) => {
            console.log(err)
            res.status(500).send({ status: "Error with fetching data ", error: err.message })

        })
})
module.exports = router