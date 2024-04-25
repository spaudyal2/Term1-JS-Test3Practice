//boiler-plate code for fetching data
async function fetchData(req){
    let resp = await fetch(req);
    if(resp.ok == true){
        return await resp.json();
    }
    throw new Error (resp.status);
}


function getTier(reps, tier){
    if(tier == "gold"){
        return reps.slice(0,5);
    }
    else if(tier == "silver"){
        return reps.slice(5, (reps.length-5));
    }
    else if(tier == "bronze"){
        return reps.slice(-5)
    }
}

function getDiff(sales, quota){
    return (sales - quota).toFixed(2);
}

function getComm(comm, sales){
    return (comm *sales).toFixed(2);
}



document.getElementById("btnSearch").addEventListener("click", async function(){

    let reps = await fetchData("sales_data/salesreps.json");
    let choice = document.querySelector("input[name=radAchieve]:checked").value;
    let output =  undefined;

    let sorted = reps.sort((a,b) => (b.rep_sales -b.rep_quota) - (a.rep_sales - a.rep_quota));

    let match = getTier(sorted, choice);
        
    output = match.map(r => `<h1>${r.rep}</h1>
                            Quota Delta : $ ${getDiff(r.rep_sales, r.rep_quota)}<br>
                            Commission: $ ${getComm(r.rep_comm, r.rep_sales)}`)
                    .join(" <br>");
                    
    document.getElementById("achieversList").innerHTML = output;
});