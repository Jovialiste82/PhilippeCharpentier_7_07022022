export const createIngredientsArray = (array) => {
  // get array of arrays of ingredients objects [[{}, {}],[{}, {}]]
  const array1 = array.map((recipe) => recipe.ingredients);
  const getIngredientStrings = (object) => object.ingredient;

  // get array of ingredient strings
  const array2 = array1.map((array) =>
    array.forEach((element) => getIngredientStrings(element))
  );

  // return array of unique ingredients
  return [];
};

export const createAppliancesArray = (array) => {
  // return array of unique Appliances
  return [];
};

export const createUstensilsArray = (array) => {
  // return array of unique Ustensils
  return [];
};

export const filterByIngredients = (array) => {
  const ingredientsSearchInput = document.getElementById("ingredients");
  console.log(array);
};

export const filterByAppliance = (array) => {
  const appliancesSearchInput = document.getElementById("appliances");
  appliancesSearchInput.addEventListener("input", (e) => {
    const value = e.target.value.toString().toLowerCase();
    const recipesFilteredByAplliance = array.filter((recipe) => {
      if (recipe.appliance.toLowerCase().includes(value)) {
        console.log(recipe.name);
        return recipe;
      }
    });
    console.log("------------- End --------------");
    console.log(recipesFilteredByAplliance);
  });
};

export const filterByUstensils = (array) => {
  const ustensilsSearchInput = document.getElementById("ustensils");
  console.log(array);
};
