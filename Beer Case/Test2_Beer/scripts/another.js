//boiler-plate code for fetching data
async function fetchData(req) {
    let resp = await fetch(req);
    if (resp.ok == true) {
        return await resp.json();
    }
    throw new Error(resp.status);
}

function sortFlavours (flavours){
    return flavours.sort()
                    .map(f => `<li>${f} </li>`)
                    .join("");

}


document.getElementById("btnFind").addEventListener("click", async function(){

    let beers = await fetchData("data/Beer.json");
    let isActive = document.getElementById("chkIsActive").checked;
    let ibuLimit = document.getElementById("numIBU").value;
    let output = undefined;

    output = beers.filter(b => b.ibu > ibuLimit && b.activelyBrewed == isActive )
                .sort((a,b) => b.ibu - a.ibu)
                .map(b => `${b.name} - ${b.ibu} <ul>${sortFlavours(b.flavors)}</ul>`)
                .join("<br>");
    
    
    console.log(beers);
    console.log(output);
    
    
    document.getElementById("beerlist").innerHTML = output;
});
