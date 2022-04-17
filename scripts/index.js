import {
  mainFilter,
  updateIngredientsField,
  updateAppliancesField,
  updateUstensilsField,
  processTags,
} from "./filters.js";
import UI from "./ui.js";

const getRecipes = async () => {
  const res = await fetch("recipes.json", {
    headers: { Accept: "application/json" },
  });

  const data = await res.json();

  localStorage.setItem("recipes1", JSON.stringify(data));
  localStorage.setItem("recipes2", JSON.stringify(data));
  localStorage.setItem("recipes3", JSON.stringify(data));

  // return data
  return {
    data: JSON.parse(localStorage.getItem("recipes1")),
  };
};

const updateAdvancedFilters = () => {
  const recipes = JSON.parse(localStorage.getItem("recipes3"));
  UI.displayIngredients(
    updateIngredientsField(recipes),
    processTags,
    updateAdvancedFilters
  );
  UI.displayAppliances(
    updateAppliancesField(recipes),
    processTags,
    updateAdvancedFilters
  );
  UI.displayUstensils(
    updateUstensilsField(recipes),
    processTags,
    updateAdvancedFilters
  );
};

async function init() {
  // Display recipes stored in LS
  const { data } = await getRecipes();
  UI.displayRecipes(data);

  // Fill Ingredients search options
  updateAdvancedFilters();

  // Input search Event Listener
  const mainSearchInput = document.getElementById("main-search");
  mainSearchInput.addEventListener("input", (e) => {
    const value = e.target.value.toString().toLowerCase();

    if (value.length < 3) {
      // display all recipes if input is less than 3 characters
      const recipes = JSON.parse(localStorage.getItem("recipes1"));
      localStorage.setItem("recipes2", JSON.stringify(recipes));
      localStorage.setItem("recipes3", JSON.stringify(recipes));
      UI.displayRecipes(recipes);
      updateAdvancedFilters(recipes);
    } else {
      // display all recipes matching input
      const filteredRecipes = mainFilter(data, value);
      localStorage.setItem("recipes2", JSON.stringify(filteredRecipes));
      localStorage.setItem("recipes3", JSON.stringify(filteredRecipes));
      UI.displayRecipes(filteredRecipes);
      updateAdvancedFilters(filteredRecipes);
    }
  });

  // Ingredients input Event Listener
  const ingredientsSearchInput = document.getElementById("ingredients");
  ingredientsSearchInput.addEventListener("input", (e) => {
    const value = e.target.value.toString().toLowerCase();
    // TODO : hide ingredients which don't match input
    const options = document.querySelectorAll(".ingredient-option");
    options.forEach((option) => {
      !option.innerText.toLowerCase().includes(value)
        ? option.classList.add("d-none")
        : option.classList.remove("d-none");
    });
  });

  // Appliances input Event Listener
  const appliancesSearchInput = document.getElementById("appliances");
  appliancesSearchInput.addEventListener("input", (e) => {
    const value = e.target.value.toString().toLowerCase();
    // TODO : hide appliances which don't match input
    const options = document.querySelectorAll(".appliance-option");
    options.forEach((option) => {
      !option.innerText.toLowerCase().includes(value)
        ? option.classList.add("d-none")
        : option.classList.remove("d-none");
    });
  });

  // Ustensils input Event Listener
  const ustensilsSearchInput = document.getElementById("ustensils");
  ustensilsSearchInput.addEventListener("input", (e) => {
    const value = e.target.value.toString().toLowerCase();
    // TODO : hide ustensils which don't match input
    const options = document.querySelectorAll(".ustensil-option");
    options.forEach((option) => {
      !option.innerText.toLowerCase().includes(value)
        ? option.classList.add("d-none")
        : option.classList.remove("d-none");
    });
  });
}

init();
