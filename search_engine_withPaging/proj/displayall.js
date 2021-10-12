const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let Characters = [];



// searchBar.addEventListener('keyup', (e) => {
//    const searchString = e.target.value.toLowerCase();  // without search button (dynamic)

let lastCharacters;
let selected_page=1;

var order=document.getElementById('order_selection')
order.addEventListener("change", search);

var page=document.getElementById('pagination')
page.addEventListener("change", search);

let pages=[];

function sorting(Characters) { 
  switch(order.value){
    case "name_asc":
        Characters.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        }); 
        break;
    case "name_desc":
        Characters.sort(function(a, b){
            if(a.name > b.name) { return -1; }
            if(a.name < b.name) { return 1; }
            return 0;
        }); 
        break;
    case "year_desc":
        Characters.sort(function(a, b){
            if(parseInt(a.createdAt) > parseInt(b.createdAt)) { return -1; }
            if(parseInt(a.createdAt) < parseInt(b.createdAt)) { return 1; }
            return 0;
        }); 
        break;
    case "year_asc":
        Characters.sort(function(a, b){
            if(parseInt(a.createdAt) < parseInt(b.createdAt)) { return -1; }
            if(parseInt(a.createdAt) > parseInt(b.createdAt)) { return 1; }
            return 0;
        }); 
        break;
  }
}


function buttonclicked(){
    document.getElementById('searchbutton').value="clicked";

    pages=[];

    search();

}

function search(){
   
    if(document.getElementById('searchbutton').value == "notclicked"){
        const filteredCharacters=JSON.parse(localStorage.getItem("filteredCharacters"));
        lastCharacters=filteredCharacters;
        sorting(filteredCharacters)
        slicePages(filteredCharacters);
        displayCharactersAll(filteredCharacters);    
}
else{
    
    const searchString = document.getElementById("searchBar").value.toLowerCase();
    const filteredCharacters = Characters.filter(
    (character) => {
    return (
        character.name.toLowerCase().includes(searchString)

    );
}); 
    lastCharacters=filteredCharacters;
    sorting(filteredCharacters)
    slicePages(filteredCharacters);
    displayCharactersAll(filteredCharacters);
} 
};



const loadCharacters = async () => {
    try {
        Characters=JSON.parse(localStorage.getItem("Characters"));
        if(document.getElementById('searchbutton').value == "notclicked"){   
            search();
        }
        else{
            buttonclicked();
        }
        
    } catch (err) {
        console.error(err);
    }
};


function getIdOfButton(button){
    selected_page= document.getElementById("page"+button.value).value;
    displayCharactersAll(lastCharacters)

}

function slicePages(characters){
    const lengths=Object.keys(characters).length;
    let paginationCode=" ";
    for(i = 0,j=0; i <lengths ; i+=5,j++) {  
        pages[j]=characters.slice(i,i+5);
        paginationCode += `
        <button onclick="getIdOfButton(this)" id="page${j+1}" value="${j+1}">${(j+1)}</button>   
`
      }
      document.getElementById("pagination").innerHTML = paginationCode;

}


function displayCharactersAll(characters){
    try {
    characters=pages[selected_page-1]

    const htmlString = characters
        .map((character) => {
            character.createdAt = parseInt(character.createdAt);
            return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>${character.createdAt}
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
    }
    catch(err){
        alert("Check again please!");
    }


};



loadCharacters();