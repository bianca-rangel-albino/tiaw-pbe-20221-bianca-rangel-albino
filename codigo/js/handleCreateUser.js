/* Variaveis */
//Variaveis de cadastro

const newUserName = document.querySelector("#new-user-name");
let validNewUserName = false;
const newUserEmail = document.querySelector("#new-user-email");
// const validNewUserEmail = false;
const newUserPassword = document.querySelector("#new-user-password");
let validNewUserPassword = false;
const newUserConfirmPassword = document.querySelector("#new-user-confirm-password");
let validNewUserConfirmPassword = false;
const errorMessage = document.querySelector("#error-message");



/* Cadastro de usuario */

//Validação do nome

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

function cadastro() {
    console.log(validNewUserName);
    console.log(validNewUserPassword);
    console.log(validNewUserConfirmPassword);

    if (validNewUserName && validNewUserPassword && validNewUserConfirmPassword) {
        //Salvando usuarios no localStorage

        const userList = JSON.parse(localStorage.getItem("userList") || "[]");

        userList.push({
            user: newUserName.value,
            email: newUserEmail.value,
            password: newUserPassword.value,
        });

        localStorage.setItem("userList", JSON.stringify(userList));

        alert("Usuário cadastrado");
        window.location.href = "loginScreen.html";
    } else {
        alert("Verifique os campos de cadastro e tente novamente");
    }
}