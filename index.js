const shoppingList = JSON.parse(localStorage.getItem("items")) || [];

// grab element references from the DOM
const listContainer = document.getElementsByClassName("list-container")[0];
const addItemInput = document.getElementById("item");
const addItemButton = document.querySelector(".add-item-button");

// const GLOBAL_ITEM = "";
// loop through the initial items
const initialItems = (items) => {
  listContainer.innerHTML = "";
  items.forEach((item, i) => {
    const listItem = document.createElement("li");
    listItem.classList.add("shopping-list-item");
    listItem.innerHTML = `<span class='shopping-list-item-${i}'>${item}</span>  <div class="purchased-container"><button onclick="markPurchased('shopping-list-item-${i}')" class="mark-purchased-button">mark purchased</button> <span onclick="removeParent('${item}')" class="times">&times;</span></div>`;
    listContainer.appendChild(listItem);
  });

  if (items.length > 0) {
    const clearButton = document.createElement("button");
    clearButton.classList.add("clear-button");
    clearButton.addEventListener("click", clearList);
    clearButton.textContent = "clear list";
    listContainer.appendChild(clearButton);
  }
};

const removeParent = (item) => {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  const updatedItems = items.filter((i) => i !== item);
  localStorage.setItem("items", JSON.stringify(updatedItems));
  document.getElementsByClassName("times")[0].parentNode.parentNode.remove();
  if (!localStorage.getItem("items"))
    document.getElementsByClassName("clear-button")[0].remove();
  window.location.reload();
};

const markPurchased = (item) => {
  document.getElementsByClassName(item)[0].style.textDecoration =
    "line-through";
};

const addItem = (item) => {
  if (item) {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    items.unshift(item);
    localStorage.setItem("items", JSON.stringify(items));
    addItemInput.value = "";
    initialItems(items);
    window.location.reload();
  }
};

const clearList = () => {
  localStorage.clear();
  document.getElementsByClassName("clear-button")[0].parentNode.remove();
};

addItemButton.addEventListener("click", () => {
  addItem(addItemInput.value);
  initialItems(shoppingList);
});

// initialize content
initialItems(shoppingList);
