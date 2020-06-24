const fs = require('fs');

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/../mockData/users.json`)
);
// ALL CONTROLLER


// to get all user
exports.getAllUsers = (req, res) => {
    res.status(200).json({
        status: "Success",
        results: users.length,
        data: {
            users
        }
    });
};


// to get a single user
exports.getSingleUser = (req, res) => {
    const id = req.params.id * 1;
    const user = users.find(el => el.id === id);

    if(!user){
        res.status(404).json({
            status: "Failed",
            message: "Invalid ID"
        });
    };
    res.status(200).json({
        status: "Success",
        data: {
            user
        }
    });
};


// to create an user
exports.createUser = (req, res) => {
    // console.log(req.body);

    const newId = users[users.length - 1].id + 1;
    const newUser = Object.assign({id: newId}, req.body);

    users.push(newUser);
    fs.writeFile(`${__dirname}/mockData/users.json`, JSON.stringify(users), error => {
        res.status(201).json({
            status: "Success",
            message: "User successfully added to DB",
            data: {
                course: newUser
            }
        });
    });
  
};


// to update an user
exports.updateUser = (req, res) => {
    const id = req.params.id * 1;
    if(id > users.length){
        res.status(404).json({
            status: "Failed",
            message: "Invalid ID"
        });
    };
    res.status(200).json({
        status: "success",
        data: {
            user: "<Updated user here>"
        }
    });
};


// to delete an user
exports.deleteUser = (req, res) => {
    const id = req.params.id * 1;
    if(id > users.length){
        res.status(404).json({
            status: "Failed",
            message: "Invalid ID"
        });
    };
    users.splice(id, 1)
    res.status(204).json({
        status: "success",
        data: null
    });
};