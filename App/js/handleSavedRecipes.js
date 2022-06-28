const receitasContainer = document.querySelector('#receitas-container');
const receitaExpandida = document.querySelector('.receita-expandida');
const loadercontainer = document.querySelector('.loader');
const modalContent = document.querySelector('.modal-item')
const searchBar = document.getElementById('searchBar');
const popup = document.querySelector('.full-screen');
const url = 'https://62b8c2b9f4cb8d63df624474.mockapi.io/api/v1/users'

let recipes = [];

const userId = JSON.parse(localStorage.getItem("userLoggedId"));

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredCharacters = recipes.filter((recipe) => {
        return recipe.nome.toLowerCase().includes(searchString);
    });
    displayRecipe(filteredCharacters);
});

const getSavedRecipes = async () => {
    const response = await fetch(`${url}/${userId}/receitas_salvas`);
    recipes = await response.json();
    displayRecipe(recipes);
}


const displayRecipe = (recipes) => {
    const recipeBox = recipes
        .map(({ nome, resumo, tempo_de_preparo, porcoes }, index) => {
            return `
            <div class="post">
                <div class="card-receita">
                    <h3>${nome}</h3>
                    <div class="box-receita">
                        <p>${resumo}</p>
                        <ul>
                            <li><i class="fa-solid fa-house-chimney"></i>${tempo_de_preparo}</li>
                            <li><i class="fa-solid fa-user"></i>${porcoes}</li>
                            <li onClick="desfavoritar(${index})"><i class="fa-solid fa-heart"></i>Favorito</li>
                        </ul>
                    </div>
                    <div class="link">
                    <button class="openModal" onClick="showPopup(${index, recipes})">Mão na massa</button>
                    </div>
                </div>
            </div>
            `
        }).join("")
    receitasContainer.innerHTML = recipeBox;
}

const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.responseType = 'json';

        if (data) {
            xhr.setRequestHeader('Content-type', 'application/json');
        }

        xhr.onload = () => {
            resolve(xhr.response);
        };

        xhr.send(JSON.stringify(data));
    });

    return promise;
}

const desfavoritar = (index, recipies) => {
    sendHttpRequest('DELETE', `${url}/${userId}/receitas_salvas/${recipes[index].id}`);
    setTimeout(() => {
        location.reload();
      }, "1000")
}

function closeModal() {
    modal.style.top = "-100%";
}

function showPopup(index) {
    popup.classList.remove('hidden');
    console.log(recipes[index].nome);

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    const ingredientes = () => {
        return recipes[index].ingredientes.map(ingrediente => {
            return `<li>${ingrediente}</li>`;
        }).join("");
    }

    const preparo = () => {
        return recipes[index].modo_de_preparo.map(passo => {
            return `<li>${passo}</li>`;
        }).join("");
    }

    const recipeModal =
        `
                <div>
                    <h3>${recipes[index].nome}</h3>
                    <div>
                        <div class="row align-items-center">
                            <div class="col-12 col-sm-6 col-md-6 col-md-6 col-lg-6 col-xl-6">
                                <h4>Ingredientes </h4>
                                <ul class="lista-ingredientes">
                                    ${ingredientes()}
                                </ul>
                            </div>
                            <div class="col-6">
                                <img class="p-1 img-fluid" src=${recipes[index].imagem}>
                            </div>    
                        </div>
                        <div class="mt-4">    
                            <h4>Modo de preparo: </h4>
                            <p>${preparo()}</p>
                        </div>
                    </div>
                </div>
            `
    modalContent.innerHTML = recipeModal;
}

function closePopup() {
    popup.classList.add('hidden');
}

getSavedRecipes();