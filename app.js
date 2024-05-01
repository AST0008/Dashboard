var myNodelist = document.getElementById("myUL").getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

var list = document.getElementById("myUL");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const day = document.querySelector(".calendar-dates");

const currdate = document.querySelector(".calendar-current-date");

const prenexIcons = document.querySelectorAll(".calendar-navigation span");

// Array of month names
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const manipulate = () => {
  let dayone = new Date(year, month, 1).getDay();
  let lastdate = new Date(year, month + 1, 0).getDate();
  let dayend = new Date(year, month, lastdate).getDay();
  let monthlastdate = new Date(year, month, 0).getDate();
  let lit = "";

  for (let i = dayone; i > 0; i--) {
    lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
  }

  for (let i = 1; i <= lastdate; i++) {
    let isToday =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? "active"
        : "";
    lit += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = dayend; i < 6; i++) {
    lit += `<li class="inactive">${i - dayend + 1}</li>`;
  }

  currdate.innerText = `${months[month]} ${year}`;

  day.innerHTML = lit;
};

manipulate();

prenexIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    month = icon.id === "calendar-prev" ? month - 1 : month + 1;

    if (month < 0 || month > 11) {
      date = new Date(year, month, new Date().getDate());

      year = date.getFullYear();

      month = date.getMonth();
    } else {
      date = new Date();
    }

    manipulate();
  });
});

// Weather App

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "83ab9e1800ab2ed4036a29764d56cc53";

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      getInfo(weatherData);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Please Enter the City");
  }
});

async function getWeatherData(city) {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const res = await fetch(URL);
  if (!res) {
    throw new Error("Could not get Data");
  }
  return await res.json();
}

function getInfo(data) {
  console.log(data);
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ descript, id }],
  } = data;
  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("h1");
  const humidityDisplay = document.createElement("h1");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${temp}°K`;
  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
}
