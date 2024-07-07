const shoppingList = JSON.parse(localStorage.getItem("items")) || [];

// grab element references from the DOM
const listContainer = document.getElementsByClassName("list-container")[0];
const addItemInput = document.getElementById("item");
const addItemButton = document.querySelector(".add-item-button");

// loop through the initial items
const initialItems = (items) => {
  listContainer.innerHTML = "";
  items.forEach((item, i) => {
    const listItem = document.createElement("li");
    listItem.classList.add("shopping-list-item");
    listItem.innerHTML = `${item} <button onclick="markPurchased('${item}')" class="${markPurchased(item) === item ? "line-through" : ""} mark-purchased-button">mark purchased</button>`;
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

// mark purchased
function markPurchased(item) {
  return shoppingList.find((shoppingItem) => shoppingItem === item);
}

const addItem = (item) => {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  items.unshift(item);
  localStorage.setItem("items", JSON.stringify(items));
  addItemInput.value = "";
  initialItems(items);
  window.location.reload();
};

const clearList = () => {
  localStorage.clear();
  initialItems(shoppingList);
  window.location.reload();
};

addItemButton.addEventListener("click", () => {
  addItem(addItemInput.value);
  initialItems(shoppingList);
});

// initialize content
initialItems(shoppingList);
