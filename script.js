document
.getElementById("btn")
.addEventListener(
"click",
generatePlan
);

function generatePlan(){

const place=
document
.getElementById("place")
.value
|| "Nie podano miejsca";

const days=
parseInt(
document
.getElementById("days")
.value
)||1;

const interest=
document
.getElementById("interest")
.value;

const transport=
document
.getElementById("transport")
.value;
  
let html=`

<h2>
🏁 ${place}
</h2>

<p>
📅 ${days} dni
</p>

<p>
🚗🚆🚲 Transport: ${transport}
</p>

`;

for(
let i=1;
i<=days;
i++
){

let dayPlan=
plans[interest][
(i-1)%plans[interest].length
];

html+=`

<div class="day">

<h3>
Dzień ${i}
</h3>

<p>
${dayPlan[0]}
</p>

<p>
${dayPlan[1]}
</p>

</div>

`;

}

document
.getElementById("result")
.innerHTML=html;

}



document
.getElementById("routeBtn")
.addEventListener(
"click",
generateRoute
);



function generateRoute(){

const from=
document
.getElementById("from")
.value
.trim();

const to=
document
.getElementById("to")
.value
.trim()
.replace("-", " ");

const key=
from+"-"+to;

const route=
routes[key];

if(!route){

document
.getElementById(
"routeResult"
)
.innerHTML=
"❌ Brak danych";

return;

}



const wantsCastles=
document
.getElementById("castles")
?.checked;

const wantsViews=
document
.getElementById("views")
?.checked;

const wantsFood=
document
.getElementById("food")
?.checked;



const avoidPaid=
document
.getElementById("expensive")
?.checked;

const avoidLong=
document
.getElementById("longStops")
?.checked;

const avoidCities=
document
.getElementById("cities")
?.checked;



let filteredStops=
route.stops.filter(stop=>{

const selected=[];

if(wantsCastles){
selected.push("🏰");
}

if(wantsViews){
selected.push("🌲");
}

if(wantsFood){
selected.push("🍽");
}

if(selected.length>0){

const match=
selected.some(icon=>
stop.icon.includes(icon)
);

if(!match){
return false;
}

}



if(
avoidPaid &&
stop.paid
){
return false;
}

if(
avoidLong &&
stop.longStop
){
return false;
}

if(
avoidCities &&
stop.city
){
return false;
}

return true;

});



if(
filteredStops.length===0
){
filteredStops=
route.stops;
}



let html=`

<h3>

📍 ${from}
→
${to}

</h3>

<p>

⏱ ${route.travelTime}

</p>

`;



filteredStops.forEach(
(stop,index)=>{

html+=`

<div class="day">

<h4>

${stop.icon}
${stop.name}

</h4>

<p>
⭐ ${stop.rating}
</p>

<p>
💰 ${stop.price}
</p>

<button
onclick="showDetails(${index})">

Szczegóły

</button>

<button
onclick="addFavorite('${stop.name}')">

❤️ Ulubione

</button>

<div
id="details${index}"
style="display:none;">

<p>
🚗 ${stop.parking}
</p>

<p>
${stop.photo}
</p>

<p>
${stop.description}
</p>

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

<div class="route-step end">

<div class="route-title">
🏁 ${to}

</div>

</div>

</div>

`;



filteredStops.forEach(stop=>{

let stepClass="";

if(stop.icon.includes("🏰")){
stepClass="castle";
}

else if(stop.icon.includes("🍽")){
stepClass="food";
}

else if(stop.icon.includes("🌲")){
stepClass="view";
}

html+=`

<div class="route-step ${stepClass}">

<div class="route-title">

${stop.icon}
${stop.name}

</div>

<div class="route-time">

⏱ ${stop.time}

</div>

</div>

`;

});



html+=`

<div class="route-step">

<div class="route-title">
🏁 ${to}

</div>

</div>

</div>

`;



document
.getElementById(
"routeResult"
)
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
localStorage.getItem(
"favorites"
)
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

}





document
.getElementById("offerBtn")
?.addEventListener(
"click",
findOffer
);





function findOffer(){

const place=
document
.getElementById("offerPlace")
.value;

const budget=
parseInt(
document
.getElementById("budget")
.value
)||0;



const filtered=
offers.filter(offer=>

offer.place===place &&

offer.price<=budget

);



if(
filtered.length===0
){

document
.getElementById(
"offerResult"
)
.innerHTML=
"❌ Brak ofert";

return;

}



filtered.sort(
(a,b)=>
b.rating-a.rating
);



const best=
filtered[0];



document
.getElementById(
"offerResult"
)
.innerHTML=`

<div class="day">

<h3>

🏆 ${best.name}

</h3>

<p>
💰 ${best.price} zł
</p>

<p>
⭐ ${best.rating}
</p>

<p>
📍 ${best.distance}
</p>

<p>

🤖 Najlepszy stosunek jakości do ceny

</p>

</div>

`;

}

document
.getElementById("showFavoritesBtn")
.addEventListener(
"click",
function(){

alert("Klik działa");

}
);

function showFavorites(){

alert("Działa");

let favorites=
JSON.parse(
localStorage.getItem(
"favorites"
)
)||[];

if(favorites.length===0){

document
.getElementById(
"favoritesResult"
)
.innerHTML=
"❌ Brak ulubionych miejsc";

return;

}

let html="";

favorites.forEach(place=>{

html+=`

<div class="day">

❤️ ${place}

</div>

`;

});

document
.getElementById(
"favoritesResult"
)
.innerHTML=html;

}
