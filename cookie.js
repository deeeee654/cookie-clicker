console.log("This is my cookie clicker page.");

let cookieCount = 0;
let cps = 1;
let fetchstuff = "https://cookie-upgrade-api.vercel.app/api/upgrades";

const cookieCounter = document.getElementById("cookiecount");
const cpsDisplay = document.getElementById("cpscount");
const image = document.querySelector("img");

cookieCounter.innerText = cookieCount;

image.addEventListener("click", function () {
  cookieCount++;
  console.log(cookieCount);
  cookieCounter.innerText = cookieCount;
});

setInterval(function () {
  cookieCount++;
  cookieCounter.innerText = cookieCount;
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
      cookieCount++;
    });
    paragraph.textContent =
      datas[i].name +
      " | " +
      datas[i].id +
      " | " +
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
