document
.getElementById("btn")
.addEventListener("click",generatePlan);

function generatePlan(){

const place=
document.getElementById("place").value;

const days=
parseInt(
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
.getElementById("routeBtn")
.addEventListener(
"click",
generateRoute
);

function generateRoute(){

const from=
document.getElementById("from").value;

const to=
document.getElementById("to").value;

const key=
from+"-"+to;

const route=
routes[key];

if(!route){

document
.getElementById("routeResult")
.innerHTML=
"❌ Brak danych dla tej trasy";

return;

}

let html=`

<h3>

📍 ${from} → ${to}

</h3>

<p>

⏱ Czas: ${route.travelTime}

</p>

`;

route.stops.forEach(stop=>{

html+=`

<div class="day">

<h4>

${stop.icon}

${stop.name}

</h4>

<p>

⏱ ${stop.time}

</p>

</div>

`;

});

document
.getElementById(
"routeResult"
)
.innerHTML=html;

}
