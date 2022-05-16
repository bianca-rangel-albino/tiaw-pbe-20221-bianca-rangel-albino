/* Variaveis */
const errorMessage = document.querySelector("#error-message");
//Variaveis de login

const userInput = document.querySelector("#user-email");
const userPassword = document.querySelector("#user-password");
let userList = [];

let userValid = {
  nome: "",
  email: "",
  senha: "",
};

/* Login do usuário */

function login() {
  userList = JSON.parse(localStorage.getItem("userList"));
  userList.forEach((item) => {
    if (userInput.value == item.email && userPassword.value == item.password) {
      userValid = {
        nome: item.user,
        email: item.email,
        password: item.password,
      };
    }
  });

  if (
    userInput.value == userValid.email &&
    userPassword.value == userValid.password
  ) {
    window.location.href = "telaDeReceitas.html";

    let mathRandom = Math.random().toString(16).substr(2);
    let token = mathRandom + mathRandom;

    localStorage.setItem("token", token);
    localStorage.setItem("userLogged", JSON.stringify(userValid));
  } else {
    alert("Credenciais de acesso invalidas, tente novamente");
  }

  console.log(userValid);
}
