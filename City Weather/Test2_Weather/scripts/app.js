//boiler-plate code for fetching data
async function fetchData(req){
    let resp = await fetch(req);
    if(resp.ok == true){
        return await resp.json();
    }
    throw new Error (resp.status);
}

function sortTemps(temps){
    return temps.sort((a,b) => a-b)
                .join(" ");
}

function getAvg (temps){
    return (temps.reduce((accum, elem) => accum + elem, 0) / temps.length).toFixed(2);
}

document.getElementById("btnSearch").addEventListener("click", async function(){

    let cities = await fetchData("data/weather.json");
    let min = parseFloat(document.getElementById("numTemp"). value);
    let output = undefined;
    
    /*
    let found = [];
    for (c of cities){
        let temps = sortTemps(c.temps)
        
        if(temps[0] > min){
            found.push(c)
        }
    }*/

    /*
    let found = [];
    for (let c of cities){
        let found = c.temps.filter(t => t > min);
        console.log(found.length == c.temps.length);
    }
*/


let match = cities.filter(c=> c.temps.every(t=> t> min));
console.log(match);

if(match.length > 0){
    output = match.map(c=>`<h3> ${c.city}</h3>
                        Temperatures : ${sortTemps(c.temps)} <br>
                        Avg Temps : ${getAvg(c.temps)}`)
                    .join("<br>")
}else{
    output = "No matches found";
}
console.log(output);

document.getElementById("cities").innerHTML = output;

});