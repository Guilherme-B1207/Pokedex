const pokemonName = document.querySelector('.pokemon_name'); //retorna o primeiro documento dentro do documento que foi passado como parametro
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const ButtonPrev = document.querySelector('.btn-prev');
const ButtonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => { //arrow function tem a função de deixar nosso códgio mais otimizado, mais legivel
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); //feito para puxar requisições HTTP/HTTPS, ex GET, PUT, PULL etc. //Dentro do ${} nós conseguimos passar variaveis
    //await faz com que o código só siga quando o fetch receber os dados, porem só pode ser executado em uma função assincrona 
    const data = await APIResponse.json(); //vai puxar os dados em json da api pra data
    return data;
}

const renderPokemon = async (pokemon) => {
   
    pokemonName.innerHTML = 'loading';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if(data){
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name; //define ou pega a sintaxe HTML ou XML descrevendo os elementos descendentes
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonNumber = data.id;
    } else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'not found :(';
        pokemonNumber.innerHTML = 'not found :(';
    }
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();
   renderPokemon(input.value.toLowerCase()); //vai transformar todos os caracteres em letra minuscula
   input.value = '';
});

ButtonPrev.addEventListener('click', () =>{
    if(searchPokemon > 1) {
        searchPokemon -=1;
        renderPokemon(searchPokemon);
    }
 });

ButtonNext.addEventListener('click', () =>{
    searchPokemon +=1;
    renderPokemon(searchPokemon);
 });

renderPokemon(searchPokemon);