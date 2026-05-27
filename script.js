function addFavorite(place){

let favorites=
JSON.parse(
localStorage.getItem(
"favorites")
)||[];

if(
!favorites.includes(place)
){

favorites.push(place);

localStorage.setItem(
"favorites",
JSON.stringify(
favorites
)
);

alert(
"❤️ Dodano: "+place
);

}

};

document
.getElementById("offerBtn")
.addEventListener(
"click",
findOffer
);
