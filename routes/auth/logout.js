exports.logout = function (req, res) {
  console.log("로그아웃 실행");
  req.logout();
  req.session.save(function (err) {
    if (err) console.log(err);

    res.send({result:"logout success"});
  });
};
