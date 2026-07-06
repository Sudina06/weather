const API_KEY = "265bb5519f7843089fa22223262905";

const day = document.getElementById("day");
const place = document.getElementById("place");
const country = document.getElementById("country");
const searchBtn = document.getElementById("searchBtn");
const userLoc = document.getElementById("userLoc");
const temp = document.getElementById("temp");
const weather = document.getElementById("weather");
const feelsLike = document.getElementById("feelsLike");
const img = document.getElementById("img");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const forecasts = document.getElementById("forecasts");
const uv = document.getElementById("uv");
const index = document.getElementById("index");
const locBox = document.getElementById("locBox");
const list = document.getElementById("list");

searchBtn.addEventListener("click",()=>{
    userLoc.classList.toggle("hidden");
    dataFetch(userLoc.value);
    userLoc.value="";
    list.classList.toggle("hidden")
})



const dataFetch = async (location)=>{

    if(!location){
        return;
    }
    
    const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7`,
    ).then((r) => r.json());

    day.textContent = new Date().toDateString();
    place.textContent = res.location.name;
    country.textContent = res.location.country;
    temp.textContent = res.current.temp_c;
    weather.textContent = res.current.condition.text;
    feelsLike.textContent = res.current.feelsLike_c;
    img.src = res.current.condition.icon;
    humidity.textContent = res.current.humidity;
    wind.textContent = res.current.wind_kph;
    pressure.textContent = res.current.pressure_mb;
    visibility.textContent = res.current.vis_km;

    const cast = res.forecast.forecastday;

    cast.forEach( (fc) =>{
        const div = document.createElement("div");
        div.classList=("bg-gray-600 rounded-2xl  flex items-center px-4 justify-between");
        div.innerHTML = `<div>
                <p class="text-xl"> ${new Date(fc.date).toLocaleDateString("en-US" , {weekday:"long"})} </p>
                <p class="text-gray-400">${fc.day.condition.text} </p>
                </div>
                <div>
                    <img src = ${fc.day.condition.icon}  class="size-8" alt="">
                </div>
                <div>
                    <p class="text-xl font-semibold">${fc.day.avgtemp_c}℃</p>
                </div>`
            
            forecasts.append(div)    
    })
    uv.textContent = res.current.uv
    if(res.current.uv<=2){
        index.textContent = "low";
    }
    else if(res.current.uv<=5){
        index.textContent = "Moderate"
    }
    else{
        index.textContent = "High";
    }

}
dataFetch("Pokhara")


const fetchLoc = async(loc)=>{
    const res = await fetch(`http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${loc}`,).then((r)=>r.json());
    if(!loc){
    list.innerHTML="";
    return;
    }
    res.forEach((loca)=>{
        const li = document.createElement("li");
        li.textContent = loca.name;
        li.classList = "p-2 hover:bg-gray  w-full hover:cursor-pointer hover:bg-gray-700 hover:scale-105 transition duration-300";
        list.appendChild(li);
        li.addEventListener("click",()=>{
            dataFetch(loca.name);
            list.innerHTML = "";
        })
    })
    
}
userLoc.addEventListener("input",()=>{
    fetchLoc(userLoc.value);
})




