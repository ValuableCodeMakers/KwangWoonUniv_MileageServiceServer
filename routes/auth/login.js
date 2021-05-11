const passport = require("passport");

exports.login = async function (req, res, next) {
  await passport.authenticate("local", (err, userInfo, info) => {
    console.log("authenticate callback");

    let user = userInfo.user;

    if (err) {
      console.log("authenticate callback Fail!");
      res.send({
        result: false,
      });
    }
    if (!user){
      console.log(info.message)
      res.send({
        result: false,
      });
    }


    if (user) {
      console.log("authenticate callback Success!");

      if (user.name == null || user.name == "") {
        return req.login(user, function (err) {
          if (err) console.log(err);
          res.send({
            result: "NEW_REGISTER",
          });
        });
      } else {
        return req.login(user, function (err) {
          if (err) console.log(err);
          res.send({
            result: true,
            userId: userInfo.user.id,
            userWalletAddress: userInfo.walletAddress,
          });
        });
      }
    }
  })(req, res, next);
};
