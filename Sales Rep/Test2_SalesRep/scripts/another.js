//boiler-plate code for fetching data
async function fetchData(req){
    let resp = await fetch(req);
    if(resp.ok == true){
        return await resp.json();
    }
    throw new Error (resp.status);
}

function getTiers(sorted, tier){
    if(tier == "gold"){
        return sorted.splice(0,5);
    }else if(tier == "silver"){
        return sorted.slice(5, sorted.length-5);
    }else if(tier == "bronze"){
        return sorted.splice(-5);
    }
}


document.getElementById("btnSearch").addEventListener("click", async function (){

    let reps = await fetchData("sales_data/salesreps.json");
    let tier = document.querySelector("input[name= radAchieve]:checked").value;
    let output= undefined;
    let sortReps = reps.sort((a,b) => (b.rep_sales - b.rep_quota) - (a.rep_sales - a.rep_quota));

    let tierofReps = getTiers(sortReps, tier);

    output = tierofReps.map(r => `<h1>${r.rep}</h1>
                            Quota Delta : ${(r.rep_sale) - (r.rep_quota)} <br>   
                            Commission : ${(r.rep_sales) * (r.rep_comm)}`)

    console.log(tierofReps);
    console.log(output);

    document.getElementById("achieversList").innerHTML = output;
    
});