const router = require("express").Router();
const transactionsController = require("../../controllers/transactionsController");


router.route("/")
  .post((req, res) => {
    console.log('herereerere')
    console.log(req.body)
      let data = JSON.parse(req.body.header.data)
      console.log(data[0])
    //   transactionsController.create({body: data[0]})Object.keys(json).map(
      data.forEach((element,index) => {
        Object.keys(data[index]).map(
          function(object){
            data[index]["preparer"]=req.body.header.name
        });
      });
      
    transactionsController.create({body: data})

  });

module.exports = router;
