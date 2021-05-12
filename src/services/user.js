class ValidateLogin {
  login (username, password) {
    if(username === "brunostracke" && password === '123456'){
      return true;
    } else {
      return false
    }
  }
}

export default new ValidateLogin();