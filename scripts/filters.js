export const mainFilter = (recipes, value) => {
  let filteredRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < recipes[i].ingredients.length; j++) {
      if (
        recipes[i].name.toLowerCase().includes(value) ||
        recipes[i].description.toLowerCase().includes(value) ||
        recipes[i].ingredients[j].ingredient.toLowerCase().includes(value)
      ) {
        filteredRecipes.push(recipes[i]);
      }
    }
  }

  filteredRecipes = [...new Set(filteredRecipes)];

  return filteredRecipes;
};

export const updateIngredientsField = (array) => {
  // get array of ingredient objects
  const array1 = array.map((recipe) => recipe.ingredients).flat();

  // get array of ingredient strings
  const array2 = array1.map((object) => object.ingredient);

  // Remove duplicates
  const array3 = [...new Set(array2)];

  // return array of unique ingredients
  return array3;
};

export const updateAppliancesField = (array) => {
  // get array of Appliances
  const array1 = array.map((recipe) => recipe.appliance);

  // Remove duplicates
  const array2 = [...new Set(array1)];

  // return array of unique Appliances
  return array2;
};

export const updateUstensilsField = (array) => {
  // get array of Ustensils strings
  const array1 = array.map((recipe) => recipe.ustensils).flat();

  // Remove duplicates
  const array2 = [...new Set(array1)];

  // return array of unique Ustensils
  return array2;
};

export const processTags = () => {
  // get tags from UI
  const tags = document.querySelectorAll(".tag");
  // get recipes from LS
  const recipes2 = JSON.parse(localStorage.getItem("recipes2"));

  // filter recipes to keep those matching all tags
  const filteredRecipes = recipes2.filter((recipe) => {
    const recipeIsValid = [];
    tags.forEach((tag) => {
      if (
        (tag.classList.contains("ingredient-tag") &&
          recipe.ingredients.some(
            (ingredient) =>
              ingredient.ingredient.toLowerCase() ===
              tag.firstChild.firstChild.innerText.toLowerCase()
          )) ||
        (tag.classList.contains("appliance-tag") &&
          recipe.appliance.toLowerCase() ===
            tag.firstChild.firstChild.innerText.toLowerCase()) ||
        (tag.classList.contains("ustensil-tag") &&
          recipe.ustensils.find(
            (ustensil) =>
              ustensil.toLowerCase() ===
              tag.firstChild.firstChild.innerText.toLowerCase()
          ))
      ) {
        recipeIsValid.push(true);
      } else {
        recipeIsValid.push(false);
      }
    });
    return recipeIsValid.every((recipe) => recipe === true);
  });

  localStorage.setItem("recipes3", JSON.stringify(filteredRecipes));
  return filteredRecipes;
};
