
const nameToPrice = {
    "0.3 Liter Blue": 190,
    "0.3 Liter White": 195,
    "0.3 Liter Cho-Chin": 195,
    "0.3 Liter Dane-Wine Large": 195,
    "0.3 Liter Dane-Wine Small": 195,
    "0.3 Liter Shwe-Wine": 195,
    "0.5 Liter": 250,
    "0.6 Liter White": 250,
    "0.6 Liter Blue": 250,
    "0.7 Liter Small": 310,
    "0.7 Liter Medium": 310,
    "0.7 Liter Large": 310,
    "0.85 Liter": 315,
    "0.9 Liter": 315,
    "1 Liter": 315,
    "CAP": 25
};

// Dom Elements
const form = document.getElementById("myForm");
const dateInput = document.getElementById("date");
const nameSelect = document.getElementById("name");
const name2Select = document.getElementById("name2");
const priceInput = document.getElementById("price");
const price2Input = document.getElementById("price2");
const pack1Input = document.getElementById("pack1");
const pack2Input = document.getElementById("pack2");
const qtyInput = document.getElementById("qty");
const qtyInput2 = document.getElementById("qty2");
const totalItemsInput = document.getElementById("totalItems");
const totalPriceInput = document.getElementById("totalPrice");
const totalPackInput = document.getElementById("totalPack");
const incomeInput = document.getElementById("income");
const refundInput = document.getElementById("refund");
const submitBtn = document.querySelector(".btn-primary");
const userInfo = document.getElementById("data");
const modalTitle = document.querySelector("#userForm .modal-title");
const newUserBtn = document.querySelector(".newUser");
const searchBox = document.getElementById("searchName");
const printBtn = document.querySelector(".printBtn");
const newItemForm = document.getElementById("newItemForm");
const newItemNameInput = document.getElementById("newItemName");
const newItemPriceInput = document.getElementById("newItemPrice");
const itemForm = document.getElementById("itemForm");
const itemFormLabel = document.getElementById("itemFormLabel");

// Store data in local storage
let getData = localStorage.getItem("userRecords") ? JSON.parse(localStorage.getItem("userRecords")) : [];
let isEdit = false, editId;

// Initialize Records on Page Load
showInfo();
populateItemSelect();

// Reset Form for New Record
newUserBtn.addEventListener("click", () => {
    form.reset();
    modalTitle.innerText = "Add New Record";
    submitBtn.innerText = "Submit";
    isEdit = false;
});

// Add New Item
newItemForm.addEventListener("submit", e => {
    e.preventDefault();
    const newItemName = newItemNameInput.value.trim();
    const newItemPrice = parseFloat(newItemPriceInput.value) || 0;

    if (newItemName && newItemPrice >= 0) {
        nameToPrice[newItemName] = newItemPrice;
        populateItemSelect();
        newItemForm.reset();
        $('#itemForm').modal('hide');
        alert(`Item "${newItemName}" added successfully!`);
    }
});

// Populate Item Select Options
function populateItemSelect() {
    nameSelect.innerHTML = '<option value="">Select</option>';
    name2Select.innerHTML = '<option value="">Select</option>';
    for (const [name, price] of Object.entries(nameToPrice)) {
        nameSelect.innerHTML += `<option value="${name}">${name}</option>`;
        name2Select.innerHTML += `<option value="${name}">${name}</option>`;
    }
}

// Populate Records Table
function showInfo() {
    userInfo.innerHTML = ""; 
    getData.forEach((record, index) => {
        userInfo.innerHTML += `
            <tr class="recordDetails">
                <td>${index + 1}</td>
                <td>${record.date}</td>
                <td>${record.name}</td>
                <td>${record.price} MMK</td>
                <td>${record.qty} Pcs</td>
                <td>${record.pack1} Pack</td>
                <td>${record.name2}</td>
                <td>${record.price2} MMK</td>
                <td>${record.qty2} Pcs</td>
                <td>${record.pack2} Pack</td>
                <td>${record.totalItems} Pcs</td>
                <td>${record.totalPrice} MMK</td>
                <td>${record.totalPack} Pack</td>
                <td>${record.income} MMK</td>
                <td>${record.refund} MMK</td>
                <td>
                    <button class="btn btn-primary editBtn" data-index="${index}" data-toggle="modal" data-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger deleteBtn" data-index="${index}"><i class="bi bi-trash"></i></button>
                </td>
            </tr>`;
    });

    document.querySelectorAll(".editBtn").forEach(button => {
        button.addEventListener("click", () => editInfo(button.dataset.index));
    });
    document.querySelectorAll(".deleteBtn").forEach(button => {
        button.addEventListener("click", () => deleteInfo(button.dataset.index));
    });
}

// Edit Record
function editInfo(index) {
    const record = getData[index];
    isEdit = true;
    editId = index;

    dateInput.value = record.date;
    nameSelect.value = record.name;
    priceInput.value = record.price;
    qtyInput.value = record.qty;
    pack1Input.value = record.pack1;
    name2Select.value = record.name2;
    price2Input.value = record.price2;
    qtyInput2.value = record.qty2;
    pack2Input.value = record.pack2;
    totalItemsInput.value = record.totalItems;
    totalPriceInput.value = record.totalPrice;
    totalPackInput.value = record.totalPack;
    incomeInput.value = record.income;
    refundInput.value = record.refund;

    modalTitle.innerText = "Update Record";
    submitBtn.innerText = "Update";
}

// Delete Record
function deleteInfo(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        getData.splice(index, 1);
        localStorage.setItem("userRecords", JSON.stringify(getData));
        showInfo();
    }
}

// Form Submission
form.addEventListener("submit", e => {
    e.preventDefault();

    const price = parseFloat(priceInput.value) || 0;
    const price2 = parseFloat(price2Input.value) || 0;

    const totalItemsCalculated = (parseInt(pack1Input.value) * parseInt(qtyInput.value)) + (parseInt(pack2Input.value) * parseInt(qtyInput2.value)) || 0;
    const totalPriceCalculated = (parseInt(pack1Input.value) * price * parseInt(qtyInput.value)) + (parseInt(pack2Input.value) * price2 * parseInt(qtyInput2.value)) || 0;
    const totalPackCalculated = parseInt(pack1Input.value) + parseInt(pack2Input.value) || 0;

    const record = {
        date: dateInput.value,
        name: nameSelect.value,
        price: price,
        qty: parseInt(qtyInput.value),
        pack1: pack1Input.value,
        name2: name2Select.value,
        price2: price2,
        qty2: parseInt(qtyInput2.value),
        pack2: pack2Input.value,
        totalItems: totalItemsCalculated,
        totalPrice: totalPriceCalculated,
        totalPack: totalPackCalculated,
        income: parseFloat(incomeInput.value) || 0,
        refund: parseFloat(refundInput.value) || 0,
    };

    if (isEdit) {
        getData[editId] = record;
        isEdit = false;
    } else {
        getData.push(record);
    }

    localStorage.setItem("userRecords", JSON.stringify(getData));
    showInfo();
    form.reset();
    modalTitle.innerText = "Add New Record";
    submitBtn.innerText = "Submit";
});

// Calculate Totals
function calculateTotals() {
    const price = parseFloat(priceInput.value) || 0;
    const price2 = parseFloat(price2Input.value) || 0;
    const totalItems = (parseInt(pack1Input.value) * parseInt(qtyInput.value)) + (parseInt(pack2Input.value) * parseInt(qtyInput2.value)) || 0;
    const totalPrice = (parseInt(pack1Input.value) * price * parseInt(qtyInput.value)) + (parseInt(pack2Input.value) * price2 * parseInt(qtyInput2.value)) || 0;
    const totalPack = parseInt(pack1Input.value) + parseInt(pack2Input.value) || 0;

    totalItemsInput.value = totalItems;
    totalPriceInput.value = totalPrice;
    totalPackInput.value = totalPack;

    const income = parseFloat(incomeInput.value) || 0;
    const refund = income - totalPrice;
    refundInput.value = refund.toFixed(2);
}

// Add Event Listeners to Calculate Totals on Input Changes
qtyInput.addEventListener("input", calculateTotals);
qtyInput2.addEventListener("input", calculateTotals);
pack1Input.addEventListener("input", calculateTotals);
pack2Input.addEventListener("input", calculateTotals);
priceInput.addEventListener("input", calculateTotals);
price2Input.addEventListener("input", calculateTotals);
incomeInput.addEventListener("input", calculateTotals);

nameSelect.addEventListener("change", () => {
    const selectedName = nameSelect.value.trim();
    if (nameToPrice[selectedName]) {
        priceInput.value = nameToPrice[selectedName];
        priceInput.setAttribute("readonly", true);
    } else {
        priceInput.value = "";
        priceInput.removeAttribute("readonly");
    }
});

name2Select.addEventListener("change", () => {
    const selectedName = name2Select.value.trim();
    if (nameToPrice[selectedName]) {
        price2Input.value = nameToPrice[selectedName];
        price2Input.setAttribute("readonly", true);
    } else {
        price2Input.value = "";
        price2Input.removeAttribute("readonly");
    }
});

searchBox.addEventListener("input", () => {
    const searchTerm = searchBox.value.toLowerCase();
    const rows = document.querySelectorAll(".recordDetails");

    rows.forEach(row => {
        const nameCell = row.cells[2];
        const dateCell = row.cells[1];
        if (nameCell && dateCell) {
            const nameText = nameCell.textContent.toLowerCase();
            const dateText = dateCell.textContent.toLowerCase();
            row.style.display = nameText.indexOf(searchTerm) !== -1 || dateText.indexOf(searchTerm) !== -1 ? "" : "none";
        }
    });
});

printBtn.addEventListener("click", () => {
    const printContent = document.querySelector("table").outerHTML;
    const win = window.open('', '', 'height=500,width=800');
    win.document.write('<html><head><title>Print Data</title>');
    win.document.write('</head><body>');
    win.document.write(printContent);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
});
