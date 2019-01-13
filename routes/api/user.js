const router = require("express").Router();
const usersController = require("../../controllers/usersController");


router.route('/').get(usersController.getUser)
.post(usersController.authUser)
.put(usersController.updateUser);

router.route('/login').post(usersController.authPassword)


module.exports = router;
