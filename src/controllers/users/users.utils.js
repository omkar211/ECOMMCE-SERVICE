module.exports.passwordValidation = async (password) => {
    let regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/

    return regex.test(password)
  }
  

  