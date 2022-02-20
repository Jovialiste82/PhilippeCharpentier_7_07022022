export const updateIngredientsField = (array) => {
  // Fetch from Local Storage ???
  // const recipes =
  //   localStorage.getItem("recipes2") == null
  //     ? JSON.parse(localStorage.getItem("recipes"))
  //     : JSON.parse(localStorage.getItem("recipes2"));

  // get array of ingredient objects
  const array1 = array.map((recipe) => recipe.ingredients).flat();

  // get array of ingredient strings
  const array2 = array1.map((object) => object.ingredient);

  // Remove duplicates
  const array3 = [...new Set(array2)];
  console.log("Ingredients");
  console.log(array3);

  // return array of unique ingredients
  return array3;
};

export const updateAppliancesField = (array) => {
  // get array of Appliances
  const array1 = array.map((recipe) => recipe.appliance);

  // Remove duplicates
  const array2 = [...new Set(array1)];
  console.log("Appliances");
  console.log(array2);

  // return array of unique Appliances
  return array2;
};

export const updateUstensilsField = (array) => {
  // get array of Ustensils strings
  const array1 = array.map((recipe) => recipe.ustensils).flat();

  // Remove duplicates
  const array2 = [...new Set(array1)];
  console.log("Ustensils");
  console.log(array2);

  // return array of unique Ustensils
  return array2;
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
