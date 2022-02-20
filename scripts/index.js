import * as filters from "./advancedFilter.js";
import UI from "./ui.js";

const getRecipes = async () => {
  const res = await fetch("recipes.json", {
    headers: { Accept: "application/json" },
  });

  const data = await res.json();

  // Store data in Local Storage
  if (localStorage.getItem("data") == null) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  return {
    data: JSON.parse(localStorage.getItem("data")),
  };
};

async function init() {
  // Fetch recipes from Local Storage - Array of Objects
  const { data } = await getRecipes();
  UI.displayRecipes(data);
  // get input field from DOM
  const searchInput = document.getElementById("main-search");
  // Input search Event Listener
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toString().toLowerCase();
    // disable search if input is less than 3 characters
    // and display all recipes
    if (value.length < 3) {
      UI.displayRecipes(data);
    } else {
      // Input search Algo
      const filteredRecipes = data.filter((recipe) => {
        if (
          recipe.name.toLowerCase().includes(value) ||
          recipe.description.toLowerCase().includes(value) ||
          recipe.ingredients.forEach((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(value)
          )
        ) {
          //console.log(recipe.name);
          return recipe;
        }
      });
      console.log("------------- End --------------");
      console.log(filteredRecipes);
      UI.displayRecipes(filteredRecipes);

      // Update Ingredients options
      const filteredIngredientsOptions =
        filters.createIngredientsArray(filteredRecipes);

      // Update Appliances options
      const filteredAppliancesOptions =
        filters.createAppliancesArray(filteredRecipes);

      // Update Ustensils options
      const filteredUstensilsOptions =
        filters.createUstensilsArray(filteredRecipes);
    }
  });
}

init();
