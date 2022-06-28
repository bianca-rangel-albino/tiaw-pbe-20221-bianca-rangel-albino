/* Variaveis */
const errorMessage = document.querySelector("#error-message");
//Variaveis de login

const url = 'https://62b8c2b9f4cb8d63df624474.mockapi.io/api/v1/users/';

const userInput = document.querySelector("#user-email");
const userPassword = document.querySelector("#user-password");
let userList = [];

let userValid = {
  nome: "",
  email: "",
  senha: "",
  id: "",
};

/* Login do usuário */

const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
  
    xhr.responseType = 'json';
    
    if(data){
      xhr.setRequestHeader('Content-type', 'application/json');
    }

    xhr.onload = () => {
      resolve(xhr.response);
    };
  
    xhr.send(JSON.stringify(data));
  });

  return promise;
}

const getData = () => {
  return sendHttpRequest('GET', url).then(res => {
    const users = res;
    login(users);
  });
}

function login(users) {  
  users.forEach((item) => {
    console.log(item)
    
    if (userInput.value == item.email && userPassword.value == item.password) {
      userValid = {
        nome: item.name,
        email: item.email,
        password: item.password,
        id: item.id,
      };
    }
  });

  if (
    userInput.value == userValid.email &&
    userPassword.value == userValid.password
  ) {
    let mathRandom = Math.random().toString(16).substr(2);
    let token = mathRandom + mathRandom;
    
    
    localStorage.setItem("token", token);
    localStorage.setItem("userLogged", JSON.stringify(userValid));
    localStorage.setItem("userLoggedId", JSON.stringify(userValid.id))

    window.location.href = "telaDeReceitas.html";
  } else {
    alert("Credenciais de acesso invalidas, tente novamente");
  }

  console.log(userValid);
}
