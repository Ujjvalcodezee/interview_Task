const userModal = require("../../models/user/user");
module.exports = {
  REGISTER: async function (data, callback) {
    //send data
    var sendData = {
      ReturnCode: 200,
      err: 0,
      Data: {},
      ReturnMsg: "",
    };

    //condition
    var condition = {
      email: data.email,
    };
    var usersData = await userModal.find(condition);
    if (usersData.length > 0) {
      sendData["ReturnCode"] = 406;
      sendData["err"] = 1;
      sendData["ReturnMsg"] = "email already exists";
      callback(sendData);
    } else {
      data.password = md5(data.password);

      var respData = await userModal.create(data);
      console.log("respData>>", respData);
      if (respData) {
        var payload = {
          _id: respData._id,
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY);
        if (token) {
          const data = {
            token: token,
          };
          var updateUser = await userModal.updateOne(payload, data);
          if (updateUser) {
            respData.token = token;
            sendData["Data"] = respData;
            sendData["ReturnMsg"] = "sign up successfully";
            callback(sendData);
          } else {
            sendData["ReturnCode"] = 401;
            sendData["err"] = 1;
            sendData["ReturnMsg"] = "token not stored";
            callback(sendData);
          }
        } else {
          sendData["ReturnCode"] = 401;
          sendData["err"] = 1;
          sendData["ReturnMsg"] = "token not created";
          callback(sendData);
        }
      } else {
        sendData["ReturnCode"] = 401;
        sendData["err"] = 1;
        sendData["ReturnMsg"] = "data not stored in database";
        callback(sendData);
      }
    }
  },
  LOGIN: async function (data, callback) {
    //send data
    var sendData = {
      ReturnCode: 200,
      err: 0,
      Data: {},
      ReturnMsg: "",
    };

    //condition
    const condition = {
      email: data.email,
      password: md5(data.password),
    };
    var usersData = await userModal.find(condition);
    console.log("usersData>>", usersData);
    if (usersData.length > 0) {
      usersData = usersData[0];
      var payload = {
        _id: usersData._id,
      };

      const token = jwt.sign(payload, process.env.SECRET_KEY);
      if (token) {
        const data = {
          token: token,
        };
        var updateUser = await userModal.updateOne(payload, data);
        if (updateUser) {
          usersData.token = token;
          sendData["Data"] = usersData;
          sendData["ReturnMsg"] = "Login successful";
          callback(sendData);
        } else {
          sendData["ReturnCode"] = 401;
          sendData["err"] = 1;
          sendData["ReturnMsg"] = "token not stored";
          callback(sendData);
        }
      } else {
        sendData["ReturnCode"] = 401;
        sendData["err"] = 1;
        sendData["ReturnMsg"] = "token not created";
        callback(sendData);
      }
    } else {
      sendData["ReturnCode"] = 401;
      sendData["err"] = 1;
      sendData["Data"] = [];
      sendData["ReturnMsg"] = "Invalid email or password.";
      callback(sendData);
    }
  },
};
