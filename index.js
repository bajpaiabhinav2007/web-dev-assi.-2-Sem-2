let logBox = document.getElementById("log")
let historyBox = document.getElementById("history")

function log(text) {
    logBox.innerHTML += text + "<br>"
    console.log(text)
}

function saveHistory(city) {

    let list = JSON.parse(localStorage.getItem("cities")) || []

    if (!list.includes(city)) {
        list.push(city)
    }

    localStorage.setItem("cities", JSON.stringify(list))

    showHistory()
}

function showHistory() {

    historyBox.innerHTML = ""

    let list = JSON.parse(localStorage.getItem("cities")) || []

    list.forEach(function (city) {

        let btn = document.createElement("button")

        btn.innerText = city

        btn.onclick = function () {
            getWeather(city)
        }

        historyBox.appendChild(btn)

    })

}

async function searchWeather() {

    let city = document.getElementById("city").value

    getWeather(city)

}

async function getWeather(city) {

    log("Sync Start")

    try {

        log("API Start fetching")

        let res = await fetch("https://wttr.in/" + city + "?format=j1")

        let data = await res.json()

        log("Process (Microtask)")

        document.getElementById("cityName").innerText = city
        document.getElementById("temp").innerText = data.current_condition[0].temp_C + " °C"
        document.getElementById("weather").innerText = data.current_condition[0].weatherDesc[0].value
        document.getElementById("humidity").innerText = data.current_condition[0].humidity + "%"
        document.getElementById("wind").innerText = data.current_condition[0].windspeedKmph + " km/h"

        saveHistory(city)

    } catch (e) {

        document.getElementById("cityName").innerText = "City not found"

    }

    setTimeout(function () {
        log("setTimeout (Macrotask)")
    }, 0)
    function clearSearch() {
    // Input clear
    document.getElementById("city").value = "";

    // Weather data clear
    document.getElementById("cityName").innerText = "";
    document.getElementById("temp").innerText = "";
    document.getElementById("weather").innerText = "";
    document.getElementById("humidity").innerText = "";
    document.getElementById("wind").innerText = "";

    // Optional: history bhi clear karni ho to
    document.getElementById("history").innerHTML = "";

    logEvent("Search cleared");
}
function clearSearch() {
    // Input clear
    document.getElementById("city").value = "";

    // Weather data clear
    document.getElementById("cityName").innerText = "";
    document.getElementById("temp").innerText = "";
    document.getElementById("weather").innerText = "";
    document.getElementById("humidity").innerText = "";
    document.getElementById("wind").innerText = "";

    // Optional: history bhi clear karni ho to
    document.getElementById("history").innerHTML = "";

    logEvent("Search cleared");
}
document.getElementById("city").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchWeather();
    }
});
function addToHistory(city) {
    const historyDiv = document.getElementById("history");

    const item = document.createElement("div");
    item.innerText = city;
    item.style.cursor = "pointer";

    item.onclick = function () {
        document.getElementById("city").value = city;
        searchWeather();
    };

    historyDiv.appendChild(item);
}
let isCelsius = true;

function toggleTemp() {
    let tempEl = document.getElementById("temp");
    let temp = parseFloat(tempEl.innerText);

    if (isCelsius) {
        temp = (temp * 9/5) + 32;
        tempEl.innerText = temp.toFixed(1) + " °F";
        isCelsius = false;
    } else {
        temp = (temp - 32) * 5/9;
        tempEl.innerText = temp.toFixed(1) + " °C";
        isCelsius = true;
    }

    logEvent("Temperature unit changed");
}

}

showHistory();
addToHistory(city);
