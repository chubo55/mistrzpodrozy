document
.getElementById("btn")
.addEventListener("click",generatePlan);

function generatePlan(){

const place=document.getElementById("place").value;

const days=parseInt(
document.getElementById("days").value
)||1;

const interest=
document.getElementById("interest").value;

let html=`
<h2>📍 ${place}</h2>
<p>📅 ${days} dni</p>
`;

for(let i=1;i<=days;i++){

let dayPlan=
plans[interest][
(i-1)%plans[interest].length
];

html+=`

<div class="day">

<h3>Dzień ${i}</h3>

<p>${dayPlan[0]}</p>

<p>${dayPlan[1]}</p>

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
.trim();

const key=
from+"-"+to;

const route=
routes[key];

const wantsCastles=
document.getElementById("castles").checked;

const wantsViews=
document.getElementById("views").checked;

const wantsFood=
document.getElementById("food").checked;

let filteredStops=
filteredStops.forEach(

if(
wantsCastles &&
!stop.icon.includes("🏰")
){
return false;
}

if(
wantsViews &&
!stop.icon.includes("🌲")
){
return false;
}

if(
wantsFood &&
!stop.icon.includes("🍽")
){
return false;
}

return true;

});

if(!route){

document
.getElementById("routeResult")
.innerHTML=
"❌ Brak danych";

return;

}

let html=`

<h3>

📍 ${from} → ${to}

</h3>

<p>

⏱ ${route.travelTime}

</p>

`;

route.stops.forEach((stop,index)=>{

html+=`

<div class="day">

<h4>

${stop.icon}
${stop.name}

</h4>

<p>⭐ ${stop.rating}</p>

<p>💰 ${stop.price}</p>

<button
onclick="showDetails(${index})">

Szczegóły

</button>

<button
onclick="addFavorite('${stop.name}')">

❤️ Dodaj do ulubionych

</button>

Szczegóły

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

<p>

<a
href="${stop.ticket}"
target="_blank">

🎟 Kup bilet

</a>

</p>

</div>

</div>

`;

});

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
) || [];

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
"❤️ Dodano: " + place
);

}
else{

alert(
"To miejsce już jest zapisane"
);

}
