//들어온 요청 정보와 응답정보를 처리하는 곳
const loginService = require('../services/authService');

const login = (req, res) => {
  console.log(req.body);
  const user = req.body;

  const userInfo = loginService(user);

  return res.status(200).send('ok');
};

module.exports = login;
