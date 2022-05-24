const postsContainer = document.querySelector("#posts-container")
const loadercontainer = document.querySelector(".loader")
const filterInput = document.querySelector('#filter')

let page = 1


const getRecipe = async() => {
    const response = await fetch('https://api.jsonbin.io/b/628c181f402a5b38020a6958')
    const data = await response.json()
    return data;
}



const generateRecipetemplate = recipe => recipe.map(item => `
    <div class="post">
        <div class="card-receita">
            <h3>${item.receita}</h3>
            <div class="box-receita">
                <p>${item.resumo}</p>
                <ul>
                    <li><i class="fa-solid fa-house-chimney"></i>${item.tempo_de_preparo}</li>
                    <li><i class="fa-solid fa-user"></i>${item.porcoes}</li>
                    <li><i class="fa-solid fa-heart"></i>Favorito</li>
                </ul>
            </div>
            <div class="link">
                <a href=""><i class="fa-solid fa-angle-right"></i> Mão na massa</a>
            </div>
        </div>
    </div>
    `).join("")

const addPostsInToDOM = async() => {
    const recipes = await getRecipe()
    console.log(recipes)
    const recipesTemplate = generateRecipetemplate(recipes)
    postsContainer.innerHTML += recipesTemplate
}

addPostsInToDOM()
const getNextsPosts = () => {
    setTimeout(() => {
        page++;
        addPostsInToDOM();
    }, 300);

}
const removeLoader = () => {
    setTimeout(() => {
        loadercontainer.classList.remove("show")
        getNextsPosts();
    }, 1000)
}
const showLoader = () => {
    loadercontainer.classList.add("show")
    removeLoader();
}

const handleScrollToPageBottom = () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement
    const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10
    if (isPageBottomAlmostReached) {
        showLoader();
    }
}

window.addEventListener('scroll', handleScrollToPageBottom)

const showPostIfMatchInputValue = inputValue => (post) => {
    const postTitle = post.querySelector('.post-title').textContent.toLowerCase()
    const postBody = post.querySelector('.post-body').textContent.toLowerCase()
    const postContainsInputValue = postTitle.includes(inputValue) ||
        postBody.includes(inputValue)

    if (postContainsInputValue) {
        post.style.display = 'flex';
        return;
    }
    post.style.display = 'none';

}

const handleInputValue = (event) => {
    const inputValue = event.target.value
    const posts = document.querySelectorAll('.post')
    posts.forEach(showPostIfMatchInputValue(inputValue))
}


filterInput.addEventListener('input', handleInputValue)

getRecipe()