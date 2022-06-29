const receitasContainer = document.querySelector('#receitas-container');
const receitaExpandida = document.querySelector('.receita-expandida');
const loadercontainer = document.querySelector('.loader');
const modalContent = document.querySelector('.modal-item')
const searchBar = document.getElementById('searchBar');
const popup = document.querySelector('.full-screen');
const url = 'https://62b8c2b9f4cb8d63df624474.mockapi.io/api/v1/users'

let recipes = [];
let indiceFavorito = [];

const userId = JSON.parse(localStorage.getItem("userLoggedId"));

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredCharacters = recipes.filter((recipe) => {
        return recipe.nome.toLowerCase().includes(searchString);
    });
    displayRecipe(filteredCharacters);
});

const getRecipe = async () => {
    const response = await fetch('https://62b8c2b9f4cb8d63df624474.mockapi.io/api/v1/receitas');
    recipes = await response.json();
    displayRecipe(recipes);


}


const displayRecipe = (recipes) => {
    const recipeBox = recipes
    .map(({ nome, resumo, tempo_de_preparo, porcoes }, index) => {
            return `
            <img class="d-none" src onerror='setColor()'>
            <div class="post">
                <div class="card-receita">
                    <h3>${nome}</h3>
                    <div class="box-receita">
                        <p>${resumo}</p>
                        <ul>
                            <li><i class="fa-solid fa-house-chimney"></i>${tempo_de_preparo}</li>
                            <li><i class="fa-solid fa-user"></i>${porcoes}</li>
                            <li onClick="favoritar(${index})"><i class="fa-solid fa-heart" id="coracao${index}"></i>Favorito</li>
                        </ul>
                    </div>
                    <div class="link">
                    <button class="btn btn-secondary" onClick="showPopup(${index})">Mão na massa</button>
                    </div>
                </div>
            </div>
            `
        }).join("")
    receitasContainer.innerHTML = recipeBox;
}

const setColor = (index) => {
    indiceFavorito = JSON.parse(localStorage.getItem("indiciesFavoritos") || "[]");

    indiceFavorito.forEach(element => {
        document.getElementById(`coracao${element}`).classList.toggle("colored-heart");
    });
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

const favoritar = (index) => {
    const receita = recipes[index];

    console.log(receita.imagem)

    if(document.getElementById(`coracao${index}`).classList.contains('colored-heart')){
        return null;
    } else {
        const receitaSalva = {
            "id": receita.id,
            "nome": receita.nome,
            "resumo": receita.resumo,
            "ingredientes": receita.ingredientes,
            "modo_de_preparo": receita.modo_de_preparo,
            "porcoes": receita.porcoes,
            "tempo_de_preparo": receita.tempo_de_preparo,
            "imagem": receita.imagem,
        };
    
        sendData(receitaSalva.id, receitaSalva.nome, receitaSalva.resumo, receitaSalva.ingredientes, receitaSalva.modo_de_preparo, receitaSalva.porcoes, receitaSalva.tempo_de_preparo);
        document.getElementById(`coracao${index}`).classList.toggle("colored-heart");
        indiceFavorito.push(index);

        localStorage.setItem("indiciesFavoritos", JSON.stringify(indiceFavorito));
    }
}


const sendData = ( id, nome, resumo, ingredientes, modo_de_preparo, porcoes, tempo_de_preparo, imagem ) => {
    sendHttpRequest('POST', `${url}/${userId}/receitas_salvas`, {
        id,
        nome,
        resumo,
        ingredientes,
        modo_de_preparo,
        porcoes,
        tempo_de_preparo,
        imagem
    })
  }

function showPopup(index) {
    popup.classList.remove('hidden');

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

getRecipe();