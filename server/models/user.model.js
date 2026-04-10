export class UserModel {
  constructor(email, password, fullname) {
    this.email = email;
    this.password = password;
    this.fullname = fullname;
  }

  static validateEmail(email) {
    const emails = ["gmail.com"];
    if (email.includes("@")) {
      let stri = email.indexOf("@");
      let getEmail = email.slice(stri + 1);
      if (emails.includes(getEmail)) {
        return false;
      }
      return true;
    }
  }
}
