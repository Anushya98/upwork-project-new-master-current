export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (user && user.token) {
      console.log("token", user.token );
       //return { Authorization: 'Bearer ' + user.token };
      return { "auth-token": user.token };
      
    } 
    else {
      return {};
    }
  }
  

//   if (response.data.token) {
//     localStorage.setItem("user", JSON.stringify(response.data));
//   }
// console.log("token", response.data.token)
//   return response.data;
//{ headers: authHeader() }