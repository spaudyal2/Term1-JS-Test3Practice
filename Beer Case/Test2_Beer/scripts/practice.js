//boiler code
//boiler-plate code for fetching data
async function fetchData(req) {
    let resp = await fetch(req);
    if (resp.ok == true) {
        return await resp.json();
    }
    throw new Error(resp.status);
}

function sortflavour(list){
    return list.sort((a,b) => a-b)
                .map(l => `<li>${l}</li>`)
                .join(" ");
}

document.getElementById("btnFind").addEventListener("click", async function (){
    let beers =await fetchData("data/beer.json");
    let isActive = document.getElementById("chkIsActive").checked;
    let min = document.getElementById("numIBU").value;
    let output = undefined;

    let match = beers.filter(b => b.ibu > min && b.activelyBrewed == isActive);
        output = match.sort((a,b) => b.ibu - a.ibu)
                     .map(b => `${b.name} - ${b.ibu} <ul>${sortflavour(b.flavors)}</ul>`)
                     .join("<br>");

    console.log(output);

    document.getElementById("beerlist").innerHTML = output;
});