const router = require("express").Router();
const usersController = require("../../controllers/usersController");


router.route('/user').get(usersController.authUser)
.post(usersController.createUser)
.put(usersController.updateUser);


module.exports = router;
