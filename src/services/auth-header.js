export default function authHeader() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // const token = JSON.parse(localStorage.getItem('token'));

// if(user){
    return { Authorization: 'Bearer ' + token }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  // } else {
  //   return {};
  // }
}
