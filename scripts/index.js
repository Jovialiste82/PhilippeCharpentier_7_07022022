import * as filters from "./advancedFilter.js";
import UI from "./ui.js";

const getRecipes = async () => {
  const res = await fetch("recipes.json", {
    headers: { Accept: "application/json" },
  });

  const data = await res.json();

  // Store data in Local Storage
  if (localStorage.getItem("recipes") == null) {
    localStorage.setItem("recipes", JSON.stringify(data));
  }

  return {
    data: JSON.parse(localStorage.getItem("recipes")),
  };
};

async function init() {
  // Fetch recipes from Local Storage - Array of Objects
  const { data } = await getRecipes();
  UI.displayRecipes(data);

  // get main input field from DOM
  const mainSearchInput = document.getElementById("main-search");

  // get Advanced Filters input fields from DOM
  const ingredientsSearchInput = document.getElementById("ingredients");
  const appliancesSearchInput = document.getElementById("appliances");
  const ustensilsSearchInput = document.getElementById("ustensils");

  // Fill Ingredients search options
  const filteredIngredientsOptions = filters.updateIngredientsField(data);
  const filteredAppliancesOptions = filters.updateAppliancesField(data);
  const filteredUstensilsOptions = filters.updateUstensilsField(data);
  console.log(filteredIngredientsOptions);
  console.log(filteredAppliancesOptions);
  console.log(filteredUstensilsOptions);
  UI.displayIngredients(filteredIngredientsOptions);
  UI.displayAppliances(filteredAppliancesOptions);
  UI.displayUstensils(filteredUstensilsOptions);

  // Input search Event Listener
  mainSearchInput.addEventListener("input", (e) => {
    const value = e.target.value.toString().toLowerCase();
    // disable search if input is less than 3 characters
    // and display all recipes
    if (value.length < 3) {
      UI.displayRecipes(data);
      const filteredIngredientsOptions = filters.updateIngredientsField(data);
      const filteredAppliancesOptions = filters.updateAppliancesField(data);
      const filteredUstensilsOptions = filters.updateUstensilsField(data);
      UI.displayIngredients(filteredIngredientsOptions);
      UI.displayAppliances(filteredAppliancesOptions);
      UI.displayUstensils(filteredUstensilsOptions);
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
      console.table(filteredRecipes);

      localStorage.setItem("recipes2", JSON.stringify(filteredRecipes));
      UI.displayRecipes(filteredRecipes);

      // Update options for Ingredient + Appliances + Ustensils
      const filteredIngredientsOptions =
        filters.updateIngredientsField(filteredRecipes);
      const filteredAppliancesOptions =
        filters.updateAppliancesField(filteredRecipes);
      const filteredUstensilsOptions =
        filters.updateUstensilsField(filteredRecipes);

      // Update UI for Ingredient + Appliances + Ustensils options
      console.log(filteredIngredientsOptions);
      UI.displayIngredients(filteredIngredientsOptions);
      UI.displayAppliances(filteredAppliancesOptions);
      UI.displayUstensils(filteredUstensilsOptions);
    }
  });
}

init();
