console.clear();

const displayJoke = document.getElementById("display-joke");
const category = document.getElementById("category");
const fetchJokeBtn = document.getElementById("fetch-joke");
const logoutBtn = document.getElementById("logout"); // or 'logout-btn' if changed in HTML
let chosenCategory = "dev";

// Update chosen category when user selects a new one
category.addEventListener("change", () => {
  chosenCategory = category.value;
});

// Fetch and populate category options
async function generateCategoryOptions() {
  let outPut = ``;

  try {
    const results = await fetch(`https://api.chucknorris.io/jokes/categories`);
    if (!results.ok) {
      throw new Error("Request failed.");
    }

    const data = await results.json();
    category.removeAttribute("disabled");

    data.forEach((cat) => {
      outPut += `<option value="${cat}">${cat}</option>`;
    });

    category.innerHTML = outPut;

    // Safely select a default
    if (data.length > 3) {
      category[3].selected = true;
      chosenCategory = category[3].value;
    } else {
      category[0].selected = true;
      chosenCategory = category[0].value;
    }
  } catch (error) {
    console.error(error);
  }
}
generateCategoryOptions();

// Fetch a joke from selected category
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

// Attach event listener to "Get Joke" button
fetchJokeBtn.addEventListener("click", fetchJoke);

// Logout Button
logoutBtn.addEventListener("click", function () {
  localStorage.clear();
  alert("You have been logged out.");
  window.location.href = "/login.html";
});
