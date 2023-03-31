const { body, header, validationResult } = require("express-validator");
module.exports = {
  BindUrl: function () {
    app.post(
      "/api/register",
      body("email").not().isEmpty().trim(),
      //   body("name").not().isEmpty().trim(),
      body("password").isLength({ min: 5 }).withMessage("Password not allowed"),
      async (req, res) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            var respData = commonController.errorValidationResponse(errors);
            res.status(respData.ReturnCode).send(respData);
          } else {
            var data = await req.body;
            userApiController.REGISTER(data, function (respData) {
              res.status(respData.ReturnCode).send(respData);
            });
          }
        } catch (err) {
          console.log("error from try and catch");
          var respData = commonController.errorValidationResponse(err);
          res.status(respData.ReturnCode).send(respData);
        }
      }
    );
    app.post(
      "/api/login",
      body("email").not().isEmpty().trim(),
      body("password").isLength({ min: 5 }).withMessage("Password not allowed"), //password validation
      async (req, res) => {
        try {
          // Finds the validation errors in this request and wraps them in an object with handy functions
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            var respData = commonController.errorValidationResponse(errors);
            res.status(respData.ReturnCode).send(respData);
          } else {
            //calling controller function
            var data = await req.body;
            userApiController.LOGIN(data, function (respData) {
              res.status(respData.ReturnCode).send(respData);
            });
          }
        } catch (err) {
          var respData = commonController.errorValidationResponse(err);
          res.status(respData.ReturnCode).send(respData);
        }
      }
    );
  },
};
