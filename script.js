document.getElementById("btn").addEventListener(
"click",
generatePlan
);

document.getElementById("routeBtn").addEventListener(
"click",
generateRoute
);

document.getElementById("showFavoritesBtn").addEventListener(
"click",
showFavorites
);

function generatePlan(){

const place=
document.getElementById("place").value
|| "Nie podano miejsca";

const days=
parseInt(
document.getElementById("days").value
)||1;

const interest=
document.getElementById("interest").value;

const transport=
document.getElementById("transport").value;

let html=`

<h2>
🏁 ${place}
</h2>

<p>
📅 ${days} dni
</p>

<p>
🚗🚆🚲✈️ Transport: ${transport}
</p>

`;

for(let i=1;i<=days;i++){

let dayPlan=
plans[interest][
(i-1)%plans[interest].length
];

html+=`

<div class="day">

<h3>
Dzień ${i}
</h3>

<p>${dayPlan[0]}</p>

<p>${dayPlan[1]}</p>

</div>

`;

}

document.getElementById("result").innerHTML=html;

}

function generateRoute(){

const from=
document.getElementById("from").value.trim();

const to=
document.getElementById("to").value.trim();

const key=
from+"-"+to;

const route=
routes[key];

if(!route){

document.getElementById("routeResult")
.innerHTML=
"❌ Brak danych dla tej trasy";

return;

}

let filteredStops=
route.stops.filter(stop=>{

if(
document.getElementById("castles").checked &&
!stop.icon.includes("🏰")
){
return false;
}

if(
document.getElementById("views").checked &&
!stop.icon.includes("🌲")
){
return false;
}

if(
document.getElementById("food").checked &&
!stop.icon.includes("🍽")
){
return false;
}

if(
document.getElementById("expensive").checked &&
stop.paid
){
return false;
}

if(
document.getElementById("longStops").checked &&
stop.longStop
){
return false;
}

if(
document.getElementById("cities").checked &&
stop.city
){
return false;
}

return true;

});

if(filteredStops.length===0){
filteredStops=route.stops;
}

let html=`

<h3>
📍 ${from} → ${to}
</h3>

<p>
⏱ ${route.travelTime}
</p>

`;

filteredStops.forEach((stop,index)=>{

html+=`

<div class="day">

<h4>
${stop.icon} ${stop.name}
</h4>

<p>⭐ ${stop.rating}</p>

<p>💰 ${stop.price}</p>

<button onclick="showDetails(${index})">
Szczegóły
</button>

<button onclick="addFavorite('${stop.name}')">
❤️ Ulubione
</button>

<div
id="details${index}"
style="display:none;">

<p>🚗 ${stop.parking}</p>

<p>${stop.photo}</p>

<p>${stop.description}</p>

<p>

<a
href="${stop.map}"
target="_blank">

🗺 Otwórz mapę

</a>

</p>

</div>

</div>

`;

});

html+=`

<div class="route-map">

<div class="route-step start">

<div class="route-title">
📍 ${from}
</div>

</div>

`;

filteredStops.forEach(stop=>{

let stepClass="";

if(stop.icon.includes("🏰")){
stepClass="castle";
}

if(stop.icon.includes("🍽")){
stepClass="food";
}

if(stop.icon.includes("🌲")){
stepClass="view";
}

html+=`

<div class="route-step ${stepClass}">

<div class="route-title">
${stop.icon} ${stop.name}
</div>

<div class="route-time">
⏱ ${stop.time}
</div>

</div>

`;

});

html+=`

<div class="route-step end">

<div class="route-title">
🏁 ${to}
</div>

</div>

</div>

`;

document.getElementById("routeResult")
.innerHTML=html;

}

function showDetails(index){

const box=
document.getElementById(
"details"+index
);

box.style.display=
box.style.display==="none"
? "block"
: "none";

}

function addFavorite(place){

let favorites=
JSON.parse(
localStorage.getItem("favorites")
)||[];

if(!favorites.includes(place)){

favorites.push(place);

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);

alert(
"❤️ Dodano: "+place
);

}

}

function removeFavorite(place){

let favorites=
JSON.parse(
localStorage.getItem("favorites")
)||[];

favorites=
favorites.filter(
item=>item!==place
);

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);

showFavorites();

}

function showFavorites(){

let favorites=
JSON.parse(
localStorage.getItem("favorites")
)||[];

if(favorites.length===0){

document.getElementById(
"favoritesResult"
).innerHTML=
"❌ Brak ulubionych miejsc";

return;

}

let html="";

favorites.forEach(place=>{

html+=`

<div class="day">

<p>
❤️ ${place}
</p>

<button
onclick="removeFavorite('${place}')">

🗑 Usuń

</button>

</div>

`;

});

document.getElementById(
"favoritesResult"
).innerHTML=html;

}
