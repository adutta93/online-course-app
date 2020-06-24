const fs = require('fs');

const courses = JSON.parse(
    fs.readFileSync(`${__dirname}/../mockData/courses.json`)
);

// ALL MIDDLEWARES

// to check if course name and price is there or not

exports.isNameAndPrice = (req, res, next) => {

    if (!req.body.course || !req.body.price){
        return res.status(400).json({
            status: "Failed",
            message: "Course name or price is missing"
        });
    };
    next();
};

// ALL CONTROLLER


// to get all courses
exports.getAllCourses = (req, res) => {
    res.status(200).json({
        status: "Success",
        results: courses.length,
        data: {
            courses
        }
    });
};


// to get a single course
exports.getSingleCourse = (req, res) => {
    const id = req.params.id * 1;
    const course = courses.find(el => el.id === id);

    if(!course){
        res.status(404).json({
            status: "Failed",
            message: "Invalid ID"
        });
    };
    res.status(200).json({
        status: "Success",
        data: {
            course
        }
    });
};


// to create an course
exports.createCourse = (req, res) => {

    const newId = courses[courses.length - 1].id + 1;
    const newCourse = Object.assign({id: newId}, req.body);

    courses.push(newCourse);
    fs.writeFile(`${__dirname}/mockData/courses.json`, JSON.stringify(courses), error => {
        res.status(201).json({
            status: "Success",
            message: "Course successfully added to DB",
            data: {
                course: newCourse
            }
        });
    });
  
};


// to update an course
exports.updateCourse = (req, res) => {
    const id = req.params.id * 1;
    if(id > courses.length){
        res.status(404).json({
            status: "Failed",
            message: "Invalid ID"
        });
    };
    res.status(200).json({
        status: "success",
        data: {
            course: "<Updated course here>"
        }
    });
};


// to delete an course
exports.deleteCourse = (req, res) => {
    const id = req.params.id * 1;
    if(id > courses.length){
        res.status(404).json({
            status: "Failed",
            message: "Invalid ID"
        });
    };
    courses.splice(id, 1)
    res.status(204).json({
        status: "success",
        data: null
    });
};