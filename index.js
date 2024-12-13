// Sample menu data (Consider fetching this data from a server in a real-world scenario)
const menu = {
    Starters: ["Garlic Bread", "Bruschetta"],
    MainCourses: ["Margherita Pizza", "Spaghetti Carbonara"],
    Desserts: ["Tiramisu", "Cheesecake"]
};

// Object to keep track of items and their quantities in the order
const cart = {};

// Function to display menu items by category
function displayMenuItems(menu) {
    const menuContainer = document.getElementById('menu');
    const categories = Object.keys(menu);

    for (let i = 0; i < categories.length; i++) {
        const categoryName = categories[i];
        const categoryElement = document.createElement('h3');
        categoryElement.textContent = categoryName;
        menuContainer.appendChild(categoryElement);

        const itemsList = document.createElement('ul');
        menuContainer.appendChild(itemsList);

        const items = menu[categoryName];
        for (let j = 0; j < items.length; j++) {
            const listItem = document.createElement('li');
            listItem.textContent = items[j];
            listItem.addEventListener('click', () => addToOrder(items[j]));
            itemsList.appendChild(listItem);
        }
    }
}

// Function to add an item to the order
function addToOrder(itemName) {
    if (cart[itemName]) {
        cart[itemName].quantity += 1;
    } else {
        cart[itemName] = { price: 10.00, quantity: 1 };
    }
    updateOrderUI();
}

// Function to remove an item from the order
function removeFromOrder(itemName) {
    if (cart[itemName]) {
        cart[itemName].quantity -= 1;
        if (cart[itemName].quantity <= 0) {
            delete cart[itemName];
        }
    }
    updateOrderUI();
}

// Function to update the UI for the order
function updateOrderUI() {
    const orderItemsList = document.getElementById('order-items');
    const orderTotalElement = document.getElementById('order-total');
    orderItemsList.innerHTML = ''; // Clear the list

    let total = 0;

    for (const itemName in cart) {
        const { price, quantity } = cart[itemName];
        total += price * quantity;

        const listItem = document.createElement('li');
        listItem.textContent = `${itemName} x${quantity}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.style.marginLeft = '10px';
        deleteButton.style.backgroundColor = '#ff4d4d';
        deleteButton.style.border = 'none';
        deleteButton.style.color = '#fff';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.padding = '5px 10px';
        deleteButton.style.borderRadius = '5px';
        deleteButton.addEventListener('click', () => removeFromOrder(itemName));

        listItem.appendChild(deleteButton);
        orderItemsList.appendChild(listItem);
    }

    orderTotalElement.textContent = `R${total.toFixed(2)}`;
}

// Function to initialize the menu system
function initMenuSystem(menu) {
    displayMenuItems(menu);
}

// Start the menu system
initMenuSystem(menu);