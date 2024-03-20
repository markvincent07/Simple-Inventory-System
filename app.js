// Gettting the checkbox element
const checkbox = document.getElementById('checkbox');

// Getting the tables section
const tablesSection = document.querySelector('.tablesSection');

// Array for storing inventory items
const inventoryItems = [];

// Function for checking if an item exists already
function checkIfExists(item, inventoryItems) {
    for (var i = 0; i < inventoryItems.length; i++) {
        if(item == inventoryItems[i].name) {
            return i; // Return the index of the item if it exists
        }
    }
    return -1; // Return -1 if item doesn't exist
}

// Function for adding new item in the inventory
inputForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Getting the item from the input field
    const item = document.getElementById('item').value;

    // Getting the quantity from the input field
    const quantity = document.getElementById('quantity').value;

    // We can't let an input field be empty
    if(item.length == 0 || quantity.length == 0) {
        alert("Fill out the form first");
    }

    // If all input fields are not empty, go here
    else {

        // Check if item already exists
        const existingIndex = checkIfExists(item, inventoryItems);
        if (existingIndex !== -1) {
            alert('Item already taken. You can modify the quantity by clicking on it.');

            // Update quantity if item already exists
            inventoryItems[existingIndex].quantity += parseInt(quantity);
            updateTable();
        }

        // If it doesn't exist yet, go here
        else {

            // push to the inventoryItems list
            inventoryItems.push({name: item, quantity: parseInt(quantity)});
            console.log(inventoryItems)

            // create the table row element for storing items
            const trElement = document.createElement('tr');

            // create table data for storing item name
            const tdElementForItemName = document.createElement('td');

            // create table data for storing quantity 
            const tdElementForQty = document.createElement('td');

            // setting the text content of the item name and quantity
            tdElementForItemName.textContent = item;
            tdElementForQty.textContent = quantity;

            // adding class to quantity cell for easier targeting
            tdElementForQty.classList.add('editable');

            // adding table row element to the table
            trElement.appendChild(tdElementForItemName);
            trElement.appendChild(tdElementForQty);

            // adding table row element to the table
            document.querySelector('table').appendChild(trElement);
        }
    }
});

document.querySelector('table').addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('editable')) {
        const input = document.createElement('input');
        input.type = 'number';
        input.value = target.textContent.trim();
        input.style.width = target.offsetWidth + 'px';  // Remove this line
        input.style.height = target.offsetHeight + 'px';
        input.style.font = window.getComputedStyle(target).font;
        input.style.textAlign = 'center';
        input.style.border = '1px solid #ccc';
        input.style.borderRadius = '5px';
        input.addEventListener('blur', function() {
            const newQuantity = parseInt(input.value);
            if (!isNaN(newQuantity)) {
                target.textContent = newQuantity;
                const itemName = target.parentNode.querySelector('td:first-child').textContent;
                const itemIndex = checkIfExists(itemName, inventoryItems);
                if (itemIndex !== -1) {
                    inventoryItems[itemIndex].quantity = newQuantity;
                }
            }
            target.removeChild(input);
        });
        target.textContent = '';
        target.appendChild(input);
        input.focus();
    }
});

checkbox.addEventListener('change', function(e) {
    e.preventDefault();
    if(checkbox.checked == true) {
        tablesSection.style.display = "block";
    }
    else {
        tablesSection.style.display = "none";
    }
});