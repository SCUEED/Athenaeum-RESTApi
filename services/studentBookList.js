const StudentBookList = require('../models/StudentBookList')

const jwtDecode = require('jwt-decode')
const Book = require('../models/Book')

exports.getAllOfStudent = async (req, res) => {
    const authHeader = req.headers['authorization']
    let token
    let studentInformation
    if (authHeader) {
        token = authHeader.split(' ')[1]
        studentInformation = jwtDecode(token)
    } else {
        return res.status(400).json({
            message: "No Authentication"
        })
    }

    const studentBookList = await StudentBookList.findAll({
        where: {
            student_id: studentInformation.id
        }, 
        include: [
            {
                model: Book
            }
        ]
    })

    return res.status(200).json(studentBookList)
}