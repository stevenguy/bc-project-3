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
        console.log(data[index].date)
        let date = new Date(data[index].date)
        console.log(date)
        Object.keys(data[index]).map(
          function(object){
            data[index]["preparer"] = req.body.header.name,
            data[index]["prepared_date"] = new Date(),
            data[index]["status"] = 'Pending',
            data[index]["year"] = date.getFullYear(),
            data[index]["month"] = date.getMonth(),
            data[index]["quarter"] = (date.getMonth()/3) + 1
        });
      });

      console.log(data)
      
    transactionsController.csv({body: data})

  });

module.exports = router;
