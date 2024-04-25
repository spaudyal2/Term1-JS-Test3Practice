//boiler-plate code for fetching data
async function fetchData(req){
    let resp = await fetch(req);
    if(resp.ok == true){
        return await resp.json();
    }
    throw new Error (resp.status);
}

function sortTemp(temp){
    return temp.sort((a,b) => a - b)
                .join(" ")
}

function avgTemp (temp){
    return temp.reduce((a,c) => a+c,0)/temp.length;
}

document.getElementById("btnSearch").addEventListener("click", async function(){

    let cities = await fetchData("data/weather.json");
    let min = document.getElementById("numTemp").value;
    let output = undefined;

    let match = cities.filter(c => c.temps.every(t => t>min));

    if(match.length > 0){
    output = match.map(c => `<h1>${c.city}</h1>
                            Temperatures : ${sortTemp(c.temps)} <br>
                            Avg Temp: ${avgTemp (c.temps).toFixed(2)}`)
                    .join("<br>")
    }
    else{
        output= "No cities match your search condition";
    }

    console.log(match);
    document.getElementById("cities").innerHTML = output;
});
