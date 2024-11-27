
// Function to show alt text
function showAlt(x) {
  document.getElementById("alttext").innerHTML = x.alt;
}

// Function to hide alt text
function hideAlt(x) {
  document.getElementById("alttext").innerHTML = "";
}

// Data for the equipment
const equipmentList = [
  { name: "Binoculars", description: "High-quality zoom binoculars", price: 50, stock: 10 },
  { name: "Trekking Poles", description: "Lightweight trekking poles", price: 30, stock: 15 },
  { name: "Helmets", description: "Durable climbing helmets", price: 40, stock: 8 },
  { name: "Ropes", description: "Sturdy climbing ropes", price: 25, stock: 20 },
  { name: "Thermal Suits", description: "Warm and waterproof suits", price: 100, stock: 5 },
  { name: "Torches", description: "Bright LED torches", price: 15, stock: 25 },
  { name: "Flares", description: "Emergency signal flares", price: 10, stock: 30 },
  { name: "Tapes", description: "Heavy-duty duct tapes", price: 5, stock: 50 },
];

// Function to populate the dropdown for selecting items
function populateDropdown() {
  const itemSelect = document.getElementById("selectedItem");
  equipmentList.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.name;
    option.textContent = item.name;
    itemSelect.appendChild(option);
  });
}

// Function to populate the equipment list
function populateEquipmentList() {
  const listContainer = document.getElementById("equipmentList");
  listContainer.innerHTML = ""; // Clear previous content

  equipmentList.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - ${item.description} ($${item.price}, Stock: ${item.stock})`;
    listContainer.appendChild(listItem);
  });
}

// Toggle the visibility of the equipment list
const toggleBtn = document.getElementById("toggleEquipmentBtn");
toggleBtn.addEventListener("click", () => {
  const listContainer = document.getElementById("equipmentListContainer");
  if (listContainer.style.display === "none" || !listContainer.style.display) {
    listContainer.style.display = "block";
    populateEquipmentList(); // Populate the list on display
    toggleBtn.textContent = "Hide Equipment List";
  } else {
    listContainer.style.display = "none";
    toggleBtn.textContent = "Reserve Your Equipment Here";
  }
});

// Handle form submission
document.getElementById("reservationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const item = document.getElementById("selectedItem").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const name = document.getElementById("name").value.trim(); // Trim to avoid empty spaces

  if (!item) {
    alert("Please select an item.");
    return;
  }

  if (isNaN(quantity) || quantity <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  const selectedEquipment = equipmentList.find((eq) => eq.name === item);
  if (!selectedEquipment) {
    alert("Selected equipment not found.");
    return;
  }

  if (quantity > selectedEquipment.stock) {
    alert(`Out of Stock! Only ${selectedEquipment.stock} available.`);
    return;
  }

  // Deduct stock and update the list
  selectedEquipment.stock -= quantity;
  populateEquipmentList();

  alert(`Reservation successful!\n\nItem: ${item}\nQuantity: ${quantity}\nName: ${name}`);

  // Clear form inputs
  document.getElementById("reservationForm").reset();
});

// Handle toggle for Equipment List and Reservation Form
document.getElementById("toggleEquipmentBtn").addEventListener("click", () => {
  const formContainer = document.getElementById("reservationFormContainer");
  const listContainer = document.getElementById("equipmentListContainer");

  // Toggle Equipment List
  if (listContainer.style.display === "none" || listContainer.style.display === "") {
      listContainer.style.display = "block";
      populateEquipmentList(); // Populate the list
  } else {
      listContainer.style.display = "none";
  }

  // Show Reservation Form
  if (formContainer.style.display === "none" || formContainer.style.display === "") {
      formContainer.style.display = "block";
      toggleBtn.textContent = "Close Form";
  } else {
      formContainer.style.display = "none";
      toggleBtn.textContent = "Reserve Your Equipment Here";
  }
});

// Initialize the dropdown on page load
populateDropdown();
