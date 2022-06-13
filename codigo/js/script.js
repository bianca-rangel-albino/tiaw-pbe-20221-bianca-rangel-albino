const receitasContainer = document.querySelector('#receitas-container');
const loadercontainer = document.querySelector('.loader');
const searchBar = document.getElementById('searchBar');
const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal-item');

let recipes = [];
let recipe = 0;

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredCharacters = recipes.filter((recipe) => {
        return recipe.nome.toLowerCase().includes(searchString); 
    });
    displayRecipe(filteredCharacters);
});

const getRecipe = async() => {
    const response = await fetch('https://api.jsonbin.io/b/62942622402a5b380213e76d');
    recipes = await response.json();
    displayRecipe(recipes);
}


const displayRecipe = ( recipes) => {
    const recipeBox = recipes
    .map(({nome, resumo, tempo_de_preparo, porcoes}, index) => {
        return `
            <div class="post">
                <div class="card-receita">
                    <h3>${nome}</h3>
                    <div class="box-receita">
                        <p>${resumo}</p>
                        <ul>
                            <li><i class="fa-solid fa-house-chimney"></i>${tempo_de_preparo}</li>
                            <li><i class="fa-solid fa-user"></i>${porcoes}</li>
                            <li><i class="fa-solid fa-heart"></i>Favorito</li>
                        </ul>
                    </div>
                    <div class="link">
                    <button class="openModal" onClick="abrirModal(${index})">Mão na massa</button>
                    </div>
                </div>
            </div>
            `
        }).join("")
    receitasContainer.innerHTML = recipeBox; 
}
    
function abrirModal(index) {
    modal.style.top = "0";
    
    function adicionarIngredientes(ingrediente) {
        let li = document.createElement('li');
        li.textContent = ingrediente;
        return li;
    }

    const ingredientes = () => {
        return recipes[index].ingredientes.map(ingrediente => { 
            return `<li>${ingrediente}</li>`;
        }).join("");
    }


    const recipeModal = 
            `
                <div class="modal-content">
                    <div>
                        <h3>${recipes[index].nome}</h3>
                        <div>
                            <div class="modal-ingredientes-container">
                                <div>
                                    <h4>Ingredientes </h4>
                                    <ul class="lista-ingredientes">
                                        ${ingredientes()}
                                    </ul>
                                </div>
                                <img src="https://picsum.photos/300/200">
                            </div>
                            <h4>Modo de preparo: </h4>
                            <p>${recipes[index].modo_de_preparo}</p>
                        </div>
                    </div>
                </div>
            `
    modalContent.innerHTML = recipeModal;
}

function closeModal() {
    modal.style.top = "-100%";
}

getRecipe();