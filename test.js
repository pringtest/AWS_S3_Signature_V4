var lambdaFunction = require("./index.js");

var params = {
}

lambdaFunction.CreateSig4(params, function(err, data) {
   if (err) {
      console.log(err)
   }
   else {
      console.log(data)
   }
})
