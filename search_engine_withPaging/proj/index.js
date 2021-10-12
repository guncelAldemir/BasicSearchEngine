const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let Characters = [];


// searchBar.addEventListener('keyup', (e) => {
//    const searchString = e.target.value.toLowerCase();  // without search button (dynamic)

function search(){
   

    const searchString = document.getElementById("searchBar").value.toLowerCase();

    const filteredCharacters = Characters.filter(
        (character) => {
        return (
            character.name.toLowerCase().includes(searchString)

        );
    });
    localStorage.setItem("filteredCharacters", JSON.stringify(filteredCharacters));
    displayCharactersOnMain(filteredCharacters);
};

function showmore(){
    
    location.href = "displayall.html";
}

const loadCharacters = async () => {
    try {
        const res = await fetch('https://mocki.io/v1/7b0d28f9-9d14-4072-81d5-397fd4797aea');
        Characters = await res.json();   
        localStorage.setItem("Characters", JSON.stringify(Characters));
        displayCharactersOnMain(Characters);
    } catch (err) {
        console.error(err);
    }
};



const displayCharactersOnMain = (characters) => {
    if (Object.keys(characters).length > 3){
       characters = characters.slice(0,3)
    };

    const htmlString = characters
        .map((character) => {
            character.createdAt = parseInt(character.createdAt);
            return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>${character.title} -  ${character.createdAt}
            </li>
        `;
        })
        .join('');

    charactersList.innerHTML = htmlString;
    if(Object.keys(characters).length == 0){
        alert("Check again please!");
    };
};

loadCharacters();
