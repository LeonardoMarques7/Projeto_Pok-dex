const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");
const errorMessage = document.querySelector("#error-message");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Carregando...";

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src =
            data["sprites"]["versions"]["generation-v"]["black-white"][
                "animated"
            ]["front_default"];

        input.value = "";
        searchPokemon = data.id;

        console.log(pokemonImage.src);

        if (
            data["sprites"]["versions"]["generation-v"]["black-white"][
                "animated"
            ]["front_default"] === null
        ) {
            errorMessage.style.display = "block";
            pokemonImage.src = "./images/error.gif";
            pokemonImage.classList = "pokemon__image error";
            errorMessage.textContent = "Sem imagem";
        } else {
            errorMessage.style.display = "none";
        }
    } else {
        errorMessage.style.display = "none";
        pokemonImage.style.display = "none";
        pokemonNumber.innerHTML = "0";
        pokemonName.innerHTML = "Nada :/";
    }
};

renderPokemon("225");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    } else {
        buttonPrev.style.display = "none";
    }
});

buttonNext.addEventListener("click", () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
    buttonPrev.style.display = "block";
});

renderPokemon(searchPokemon);
