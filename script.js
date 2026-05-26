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
.getElementById("result")
.innerHTML=html;

}
