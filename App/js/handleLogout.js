if (localStorage.getItem("token") == null) {
  alert("Você precisa estar logado para acessar essa página");
  window.location.href = "telaDeLogin.html";
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
