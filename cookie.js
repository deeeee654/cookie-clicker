console.log("This is my cookie clicker page!");

let cookieCount = localStorage.getItem("cookiecount")
  ? parseInt(localStorage.getItem("cookiecount"))
  : 0;
let cps = localStorage.getItem("cps")
  ? parseInt(localStorage.getItem("cps"))
  : 0;
let fetchstuff = "https://cookie-upgrade-api.vercel.app/api/upgrades";

const cookieCounter = document.getElementById("cookiecount");
const cpsDisplay = document.getElementById("cpscount");
const image = document.querySelector("img");

cookieCounter.innerText = cookieCount;
cpsDisplay.innerText = cps;

image.addEventListener("click", function () {
  cookieCount++;
  console.log(cookieCount);
  cookieCounter.innerText = cookieCount;
  localStorage.setItem("cookiecount", cookieCount);
});

setInterval(function () {
  cookieCount = cookieCount + cps;
  cookieCounter.innerText = cookieCount;
  localStorage.setItem("cookiecount", cookieCount);
}, 1000);

async function fetchData() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades",
  );
  console.log("HTTPS Response", response);
  const datas = await response.json();
  console.log("JSON Data:", datas);
  for (let i = 0; i < datas.length; i++) {
    const paragraph = document.createElement("p");
    const buttonn = document.createElement("button");
    buttonn.innerText = "Buy";
    buttonn.addEventListener("click", function () {
      if (cookieCount >= datas[i].cost) {
        cookieCount -= datas[i].cost;
        cps += datas[i].increase;
        alert("You bought " + datas[i].name);
      } else {
        alert("You are short of cookies!!");
      }
      {
        cookieCounter.innerText = cookieCount;
        cpsDisplay.innerText = cps;
        localStorage.setItem("cookiecount", cookieCount);
        localStorage.setItem("cps", cps);
      }
    });
    paragraph.textContent =
      datas[i].name +
      " | " +
      "Cost - " +
      datas[i].cost +
      " | " +
      datas[i].increase +
      " ";
    paragraph.appendChild(buttonn);

    const apiData = document.getElementById("data");

    apiData.append(paragraph);
  }
}

fetchData();
