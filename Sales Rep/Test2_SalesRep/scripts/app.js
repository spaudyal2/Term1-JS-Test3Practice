//boiler-plate code for fetching data
async function fetchData(req){
    let resp = await fetch(req);
    if(resp.ok == true){
        return await resp.json();
    }
    throw new Error (resp.status);
}

function getTier(sortedReps, tier){
    if(tier == "gold"){
        return sortedReps.slice (0, 5);
    }else if( tier == "silver"){
        return sortedReps.slice (5, sortedReps.length -5);
    }else if(tier == "bronze"){
        return sortedReps.slice (-5);
    }
}

document.getElementById("btnSearch").addEventListener("click", async function (){
    let reps = await fetchData("sales_data/salesreps.json");
    let target = document.querySelector("input[name=radAchieve]:checked").value;
    let output = undefined;

    let sortReps = reps.sort((a,b) => (b.rep_sales - b.rep_quota) - (a.rep_sales - a.rep_quota))

    let tierofReps = getTier(sortReps, target);

    output = tierofReps.map( r => `<h1> ${r.rep} </h3> 
                             Quota Delta: ${(r.rep_sales - r.rep_quota).toFixed(2)} <br> Commission: ${(r.rep_sales * r.rep_comm).toFixed(2)}`)
                        .join("<br>")

    document.getElementById("achieversList").innerHTML = output;
});