let BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for(select of dropdowns) {
    for(currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(select.name === 'from' && currcode === "USD") {
            newoption.selected = "selected"
        } else if(select.name === 'to' && currcode === "INR") {
            newoption.selected = "selected" 
        }
        select.append(newoption);
    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
};

let updateexchangerate = async () => {
    let amount = document.querySelector(".amount input");
    let amt = amount.value;
    if(amt === "" || amt < 1) {
        amt = 1;
        amount.value = "1";
    }

    
    const url = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[tocurr.value.toLowerCase()];
    
    let finalamount = amt * rate;
    msg.innerText = `${amt} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
}

let updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateexchangerate();
    
});

window.addEventListener("load", () => {
    updateexchangerate();
});
