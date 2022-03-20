export default class UI {
  static displayTestIngredients(array) {
    // add ingredients to Select options
    const itemsContainer = document.querySelector(
      ".ingredients-items-container"
    );
    itemsContainer.innerText = "";

    array.forEach((item) => {
      const ingredient = document.createElement("span");
      ingredient.innerText = item;
      itemsContainer.appendChild(ingredient);
    });
  }

  static displayIngredients(array) {
    // add ingredients to Select options
    const ingredientsContainer = document.querySelector(
      ".ingredients-items-container"
    );
    ingredientsContainer.innerText = "";

    array.forEach((item) => {
      const ingredient = document.createElement("span");
      ingredient.innerText = item;
      ingredientsContainer.appendChild(ingredient);
    });
  }

  static displayAppliances(array) {
    // add Appliances to Select options
    const appliancesContainer = document.querySelector(
      ".appliances-items-container"
    );
    appliancesContainer.innerText = "";

    array.forEach((item) => {
      const appliance = document.createElement("span");
      appliance.innerText = item;
      appliancesContainer.appendChild(appliance);
    });
  }

  static displayUstensils(array) {
    // add ustensils to select options
    const ustensilsContainer = document.querySelector(
      ".ustensils-items-container"
    );
    ustensilsContainer.innerText = "";

    array.forEach((item) => {
      const ustensil = document.createElement("span");
      ustensil.innerText = item;
      ustensilsContainer.appendChild(ustensil);
    });
  }

  static createRecipeCard(object) {
    const article = document.createElement("article");
    const imgDiv = document.createElement("div");
    const cardTextDiv = document.createElement("div");
    const header = document.createElement("header");
    const headerH2 = document.createElement("h3");
    const headerP = document.createElement("p");
    const img = document.createElement("img");
    const cardBottomDiv = document.createElement("div");
    const ingredientsDiv = document.createElement("div");
    const descriptionDiv = document.createElement("div");
    img.setAttribute("src", object.url);
    img.setAttribute("alt", object.name);
    article.classList.add("recipe-card");
    imgDiv.classList.add("card-img");
    imgDiv.appendChild(img);
    cardTextDiv.classList.add("card-text-body");
    header.classList.add("card-body-text-header");
    cardBottomDiv.classList.add("card-bottom");
    ingredientsDiv.classList.add("ingredients");
    descriptionDiv.classList.add("description");
    article.appendChild(imgDiv);
    article.appendChild(cardTextDiv);
    cardTextDiv.appendChild(header);
    cardTextDiv.appendChild(cardBottomDiv);
    cardBottomDiv.appendChild(ingredientsDiv);
    cardBottomDiv.appendChild(descriptionDiv);
    header.appendChild(headerH2);
    header.appendChild(headerP);
    headerH2.innerText = object.name;
    headerP.innerText = `${object.time} mn`;
    descriptionDiv.innerText = object.description;
    const ingredientsArray = object.ingredients.map((ingredient) => {
      const ingredientBody = document.createElement("p");
      ingredientBody.innerHTML = `<span>${ingredient.ingredient}</span>${
        ingredient.quantity ? `: ${ingredient.quantity}` : ""
      } ${ingredient.unit ? ingredient.unit : ""}`;
      return ingredientBody;
    });
    ingredientsArray.forEach((ingredientHTML) =>
      ingredientsDiv.appendChild(ingredientHTML)
    );
    return article;
  }

  static displayRecipes(array) {
    const recipesSection = document.querySelector(".recipes-list");
    // Reset section
    recipesSection.innerText = "";
    // Fill section with provided array
    array.forEach((recipe) =>
      recipesSection.appendChild(UI.createRecipeCard(recipe))
    );
  }
}
