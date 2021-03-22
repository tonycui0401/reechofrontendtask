import axios from "axios";

const API_URL = "http://reecho-env.eba-bk9ugpha.eu-west-1.elasticbeanstalk.com/auth/";

class AuthService {
  login(username, password) {
    console.log(username)
    console.log(password)
    const user = {
      "email":username,
      "password":password
    }
    return axios
      .post(API_URL + "login", 
        user
      )
      .then(response => {
        // console.log(response)
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
