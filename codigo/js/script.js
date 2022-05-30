const receitasContainer = document.querySelector("#receitas-container")
const loadercontainer = document.querySelector(".loader")
const searchBar = document.getElementById("searchBar")
let recipes = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredCharacters = recipes.filter((recipe) => {
        return recipe?.nome
    });
    displayRecipe(filteredCharacters);
});

const getRecipe = async() => {
    const response = await fetch('https://api.jsonbin.io/b/6292583b402a5b3802120ace')
    recipes = await response.json()
    displayRecipe(recipes);
    console.log(recipes)
}

const displayRecipe = ( recipes ) => {
    const recipeBox = recipes
        .map((recipe) => {
            return `
            <div class="post">
                <div class="card-receita">
                    <h3>${recipe.nome}</h3>
                    <div class="box-receita">
                        <p>${recipe.resumo}</p>
                        <ul>
                            <li><i class="fa-solid fa-house-chimney"></i>${recipe.tempo_de_preparo}</li>
                            <li><i class="fa-solid fa-user"></i>${recipe.porcoes}</li>
                            <li><i class="fa-solid fa-heart"></i>Favorito</li>
                        </ul>
                    </div>
                    <div class="link">
                        <a href=""><i class="fa-solid fa-angle-right"></i> Mão na massa</a>
                    </div>
                </div>
            </div>
            `
        }).join("")
    receitasContainer.innerHTML =  recipeBox;
}
    
getRecipe()
