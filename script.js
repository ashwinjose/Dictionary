let input = document.querySelector("#in");
let button = document.querySelector(".btn");
let deff = document.querySelector(".def");
let aud = document.querySelector(".audio");
let notFound = document.querySelector(".not__found");
let apiKey = "bb975780-f0e2-4251-9b21-b06501731c44";
let loading = document.querySelector(".loading");
button.addEventListener("click", (e) => {
  e.preventDefault();
  aud.textContent = "";
  deff.textContent = "";
  notFound.textContent = "";
  let word = input.value;
  if (word === "") {
    alert("Enter Your Word Here");
    return;
  }
  getData(word);
});

async function getData(word) {
  loading.style.display = "block";
  const response = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`
  );
  const data = await response.json();
  if (!data.length) {
    notFound.textContent = "NO RESULT FOUND";
    loading.style.display = "none";
    return;
  }
  if (typeof data[0] === "string") {
    loading.style.display = "none";
    let heading = document.createElement("h3");
    heading.textContent = "DID YOU MEAN ?";
    notFound.appendChild(heading);
    data.forEach((element) => {
      let el = document.createElement("span");
      el.classList.add("sty");
      el.innerText = element;
      notFound.appendChild(el);
    });
  }
  loading.style.display = "none";
  let def = data[0].shortdef[0];
  deff.textContent = def;

  const sound = data[0].hwi.prs[0].sound.audio;
  if (sound) {
    renderSound(sound);
  }
}

function renderSound(sound) {
  let subFolder = sound.charAt(0);
  let soundSrc = `https://media.merriam-webster.com/soundc11/${subFolder}/${sound}.wav?key=${apiKey}`;
  let au = document.createElement("audio");
  au.src = soundSrc;
  au.controls = true;
  aud.appendChild(au);
}
