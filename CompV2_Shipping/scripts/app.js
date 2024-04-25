//boiler-plate code for fetching data       // Subit Paudyal
async function fetchData(req){
    let resp = await fetch(req);
    if(resp.ok == true){
        return await resp.json();
    }
    throw new Error (resp.status);
}

function getError(choice, money){
    let msg = " ";
    if (choice == "0"){
        msg += "Select a shipping category \n" ;
    }
    else if (money == ""){
        msg += "Enter a number greater than 0 \n";
    }
    else if (money <= 0){
        msg += "Enter a number greater than 0 \n";
    }
    return msg;
}

function findSubTotal(itemPrice, tax){
    return (itemPrice * tax) + itemPrice;
}

function taxAmt(itemPrice, tax){
    return itemPrice * tax;
}

function grandTot(subTot, shipCo){
    return subTot + shipCo;
}

document.getElementById("btnFind").addEventListener("click", async function (){
    let shipping = await fetchData("json/shipping.json");
    let option = document.getElementById("shipCat").value;
    let price = parseFloat(document.getElementById("itemPrice").value);
    let tax = 0.13; //13% tax rate;
    let match = shipping.find(s => s.cat == option);
    let output = undefined;
    
    let errors = getError(option, price);

    if(errors == " ")
    {
        let shipCost = match.shipcost;
        let taxAmount = (taxAmt(price, tax)).toFixed(2);
        let subTotal = findSubTotal(price, tax);
        let grandTotal = grandTot(subTotal, shipCost);
 
        output = `Tax Applied : $ ${taxAmount} <br>
                    SubTotal : $ ${(subTotal).toFixed(2)}  <br>
                    Shipping Cost : $ ${shipCost} <br>
                    Grand Total : $ ${(grandTotal).toFixed(2)}`;
        
    }
    else{
        output = errors;
    }

    document.getElementById("totals").innerHTML = output;
});