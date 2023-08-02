var express = require('express');
var router = express.Router();
 
/* GET home page. */
router.get('/', function(req, res, next) {
 // Get parameter. In this case, the image name.
 const image = req.query.image;
 // Execute the command
 exec(`git log --oneline ${image}`, (err, output) => {
   // Respond with HTTP 500 if there was an error
   if (err) {
     res.status(500).send(err);
 
     return;
   }
   // output the HTTP response
   res.send(output);
 });
});
 
module.exports = router;
