const passport = require("passport");

exports.login = async function (req, res, next) {
  console.log("로그인 실행!");

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
        console.log("새로운 유저");

        return req.login(user, function (err) {
          if (err) console.log(err);
          res.send({
            result: "NEW_REGISTER",
          });
        });
      } else {
        console.log("기존 유저");

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
