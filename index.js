console.clear();

const displayJoke = document.getElementById("display-joke");
const category = document.getElementById("category");
let chosenCategory = `dev`;

category.addEventListener("change", () => {
  chosenCategory = category.value;
});

async function generateCategoryOptions() {
  let outPut = ``;

  try {
    const results = await fetch(`https://api.chucknorris.io/jokes/categories`);

    if (!results.ok) {
      throw new Error("Request failed.");
    }

    const data = await results.json();

    category.removeAttribute("disabled");

    data.forEach((category) => {
      outPut += `<option value="${category}">${category}</option>`;
    });

    category.innerHTML = outPut;
    category[3].selected = true;
  } catch {
    console.error(error);
  }
}
generateCategoryOptions();

async function fetchJoke() {
  const errorMessage = `"DO NOT DISTURB!" Chuck Norris is currently entertaining guests in his hotel room.`;

  try {
    const results = await fetch(
      `https://api.chucknorris.io/jokes/random?category=${chosenCategory}`
    );

    if (!results.ok) {
      displayJoke.textContent = errorMessage;
      throw new Error("Request failed.");
    }

    const data = await results.json();
    displayJoke.textContent = data.value;
    console.log(data.value);
  } catch (error) {
    displayJoke.textContent = errorMessage;
    console.error(error);
  }
}
