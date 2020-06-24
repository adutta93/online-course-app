const express = require('express');
const {getAllCourses,
      isNameAndPrice,
       createCourse, 
       getSingleCourse, 
       updateCourse, 
       deleteCourse} = require('../controller/courseController')



const router = express.Router();


router
  .route('/')
  .get(getAllCourses)
  .post(isNameAndPrice, createCourse);

router
  .route('/:id')
  .get(getSingleCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

module.exports = router;