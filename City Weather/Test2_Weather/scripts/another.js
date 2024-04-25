//boiler-plate code for fetching data
async function fetchData(req){
    let resp = await fetch(req);
    if(resp.ok == true){
        return await resp.json();
    }
    throw new Error (resp.status);
}

function sortTemps(temps){
    return temps.sort((a,b) => a - b)
                .join(" ");
}

function avgTemp(temps){
    return (temps.reduce((accum, elem) => accum + elem , 0) / temps.length).toFixed(2)
}

document.getElementById("btnSearch").addEventListener("click", async function (){
    let cities = await fetchData ("data/weather.json");
    let min = parseFloat(document.getElementById("numTemp").value);
    let output = undefined;

    //console.log(cities);

    let match = cities.filter(c => c.temps.every(t => t > min));

    if(match.length > 0){
        output = match.map(c => `<h3>${c.city}</h3>
                                Temperature : ${sortTemps(c.temps)} <br>
                                Avg Temp : ${avgTemp(c.temps)}`)
                        .join("<br>")
    }else{
        output = "No cities match your search criteria";
    }
    console.log(output);
    
    document.getElementById("cities").innerHTML = output;

    //console.log(match);
});