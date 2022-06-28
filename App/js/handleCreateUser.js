const newUserName = document.querySelector("#new-user-name");
let validNewUserName = false;
const newUserEmail = document.querySelector("#new-user-email");
// const validNewUserEmail = false;
const newUserPassword = document.querySelector("#new-user-password");
let validNewUserPassword = false;
const newUserConfirmPassword = document.querySelector(
  "#new-user-confirm-password"
);
let validNewUserConfirmPassword = false;
const errorMessage = document.querySelector("#error-message");

const url = 'https://62b8c2b9f4cb8d63df624474.mockapi.io/api/v1/users/';


newUserName.addEventListener("keyup", () => {
  if (newUserName.value.length <= 2) {
    newUserName.setAttribute("style", "border-color: red");
    errorMessage.innerHTML = "<br/> Nome inválido, pequeno demais";
  } else {
    newUserName.setAttribute("style", "border-color: green");
    errorMessage.innerHTML = "";
    return (validNewUserName = true);
  }
});

//Validação do email

// newUserEmail.addEventListener('keyup', () => {
//     var emailValido = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//     if(newUserEmail.value.match(emailValido)) {
//         newUserEmail.setAttribute('style', 'border-color: red')
//     } else {
//         newUserEmail.setAttribute('style', 'border-color: green')
//         return validNewUserEmail = true;
//     }
// })

//Validação da senha

newUserPassword.addEventListener("keyup", () => {
  if (newUserPassword.value.length < 6) {
    newUserPassword.setAttribute("style", "border-color: red");
    errorMessage.innerHTML = "<br/> Senha inválida, pequena demais";
  } else {
    newUserPassword.setAttribute("style", "border-color: green");
    errorMessage.innerHTML = "";
    return (validNewUserPassword = true);
  }
});

//Validação confirmar senhna

newUserConfirmPassword.addEventListener("keyup", () => {
  if (newUserConfirmPassword.value != newUserPassword.value) {
    newUserConfirmPassword.setAttribute("style", "border-color: red");
    errorMessage.innerHTML = "<br/> As senhas não conferem";
  } else {
    newUserConfirmPassword.setAttribute("style", "border-color: green");
    errorMessage.innerHTML = "";
    return (validNewUserConfirmPassword = true);
  }
});

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


const sendData = (name, email, password) => {
  sendHttpRequest('POST', url, {
    name,
    email,
    password,
  })
}

function cadastro() {
  if (validNewUserName && validNewUserPassword && validNewUserConfirmPassword) {
    const user = {
      "name": newUserName.value,
      "email": newUserEmail.value,
      "password": newUserPassword.value,
    };

    sendData(user.name, user.email, user.password);

    alert("Usuário cadastrado");
    window.location.href = "telaDeLogin.html";
  } else {
    alert("Verifique os campos de cadastro e tente novamente");
  }
}
