document
.getElementById("btn")
.addEventListener(
"click",
generatePlan
);

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

<p>🗓 ${days} dni</p>

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

if(!route){

document
.getElementById("routeResult")
.innerHTML=`

<div class="day">

❌ Brak danych dla:

<br><br>

${from} → ${to}

</div>

`;

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

route.stops.forEach(stop=>{

html+=`

<div class="day">

<h4>

${stop.icon}
${stop.name}

</h4>

<p>

⏱ <p>
⏱ ${stop.time}
</p>

<p>
⭐ ${stop.rating}
</p>

<p>
💰 ${stop.price}
</p>

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
