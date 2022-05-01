export default class UI {
  static displayIngredients(
    ingredientsArray,
    processTags,
    updateAdvancedFilters
  ) {
    // add ingredients to Select options
    const ingredientsContainer = document.querySelector(
      ".ingredients-items-container"
    );
    ingredientsContainer.innerText = "";

    ingredientsArray.forEach((item) => {
      const ingredient = document.createElement("span");
      ingredient.innerText = item;
      ingredient.classList.add("tags-options");
      ingredient.classList.add("ingredient-option");
      ingredient.addEventListener("mousedown", (e) => {
        const tagsContainer = document.querySelector(".tags-container");
        const newTag = UI.createTag(
          e.target.innerText,
          "ingredient-tag",
          processTags,
          updateAdvancedFilters
        );
        tagsContainer.appendChild(newTag);
        const recipes = processTags();
        updateAdvancedFilters();
        UI.displayRecipes(recipes);
      });
      ingredientsContainer.appendChild(ingredient);
    });
  }

  static displayAppliances(
    appliancesArray,
    processTags,
    updateAdvancedFilters
  ) {
    // add Appliances to Select options
    const appliancesContainer = document.querySelector(
      ".appliances-items-container"
    );
    appliancesContainer.innerText = "";

    appliancesArray.forEach((item) => {
      const appliance = document.createElement("span");
      appliance.innerText = item;
      appliance.classList.add("tags-options");
      appliance.classList.add("appliance-option");
      appliance.addEventListener("mousedown", (e) => {
        const tagsContainer = document.querySelector(".tags-container");
        const newTag = UI.createTag(
          e.target.innerText,
          "appliance-tag",
          processTags,
          updateAdvancedFilters
        );
        tagsContainer.appendChild(newTag);
        const recipes = processTags();
        updateAdvancedFilters();
        UI.displayRecipes(recipes);
      });
      appliancesContainer.appendChild(appliance);
    });
  }

  static displayUstensils(ustensilsArray, processTags, updateAdvancedFilters) {
    // add ustensils to select options
    const ustensilsContainer = document.querySelector(
      ".ustensils-items-container"
    );
    ustensilsContainer.innerText = "";

    ustensilsArray.forEach((item) => {
      const ustensil = document.createElement("span");
      ustensil.innerText = item;
      ustensil.classList.add("tags-options");
      ustensil.classList.add("ustensil-option");
      ustensil.addEventListener("mousedown", (e) => {
        const tagsContainer = document.querySelector(".tags-container");
        const newTag = UI.createTag(
          e.target.innerText,
          "ustensil-tag",
          processTags,
          updateAdvancedFilters
        );
        tagsContainer.appendChild(newTag);
        const recipes = processTags();
        updateAdvancedFilters();
        UI.displayRecipes(recipes);
      });
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
    descriptionDiv.innerText = `${object.description.substring(0, 130)}...`;
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

  static createTag(text, bgClass, processTags, updateAdvancedFilters) {
    const tag = document.createElement("div");
    const tagWrapper = document.createElement("div");
    const tagName = document.createElement("div");
    const tagClose = document.createElement("div");
    tag.classList.add("tag");
    tagWrapper.classList.add("tag-wrapper");
    tagName.classList.add("tag-name");
    tagClose.classList.add("tag-close");
    tagName.innerText = text;
    tagClose.innerText = "x";
    tagClose.addEventListener("click", (e) => {
      console.log("click !");
      e.target.parentElement.parentElement.remove();
      const recipes = processTags();
      updateAdvancedFilters();
      UI.displayRecipes(recipes);
    });
    tagWrapper.appendChild(tagName);
    tagWrapper.appendChild(tagClose);
    tag.appendChild(tagWrapper);
    tag.classList.add(bgClass);
    return tag;
  }

  static displayRecipes(array) {
    const recipes = array
      ? array
      : JSON.parse(localStorage.getItem("recipes1"));
    const recipesSection = document.querySelector(".recipes-list");
    // Reset section
    recipesSection.innerText = "";
    // Fill section with provided array
    recipes.forEach((recipe) =>
      recipesSection.appendChild(UI.createRecipeCard(recipe))
    );
  }

  static displayModale() {
    const modaleContainer = document.querySelector(".modale-container");
    const removeModale = document.querySelector(".ok-button");
    modaleContainer.classList.remove("d-none");
    removeModale.addEventListener("click", () => {
      const mainSearchInput = document.getElementById("main-search");
      mainSearchInput.value = "";
      const recipes = JSON.parse(localStorage.getItem("recipes1"));
      localStorage.setItem("recipes2", JSON.stringify(recipes));
      UI.displayRecipes(recipes);
      modaleContainer.classList.add("d-none");
    });
  }
}
