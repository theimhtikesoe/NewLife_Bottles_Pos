// Data Structure
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
let sales = JSON.parse(localStorage.getItem('sales')) || [];
let categories = JSON.parse(localStorage.getItem('categories')) || [];
let currentCart = [];

// Initialize
function init() {
    updateCategoryList();
    updateInventoryTable();
    updateSalesTable();
}

// Category Management
function saveCategory() {
    const categoryName = document.getElementById('categoryName').value;
    if(categoryName) {
        categories.push(categoryName);
        localStorage.setItem('categories', JSON.stringify(categories));
        updateCategoryList();
        document.getElementById('categoryName').value = '';
        bootstrap.Modal.getInstance(document.getElementById('newCategoryModal')).hide();
    }
}

function updateCategoryList() {
    const categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = categories.map(cat => `
        <button class="btn btn-outline-primary w-100 mb-2" 
                onclick="showItems('${cat}')">
            ${cat}
        </button>
    `).join('');
    
    // Update category selects
    document.querySelectorAll('#itemCategory').forEach(select => {
        select.innerHTML = categories.map(cat => `<option>${cat}</option>`).join('');
    });
}

// Item Management
function saveItem() {
    const newItem = {
        category: document.getElementById('itemCategory').value,
        variant: document.getElementById('itemVariant').value,
        packSize: parseInt(document.getElementById('itemPackSize').value),
        price: parseInt(document.getElementById('itemPrice').value),
        stock: parseInt(document.getElementById('itemStock').value)
    };
    
    inventory.push(newItem);
    localStorage.setItem('inventory', JSON.stringify(inventory));
    updateInventoryTable();
    bootstrap.Modal.getInstance(document.getElementById('newItemModal')).hide();
}

function updateInventoryTable() {
    const tbody = document.getElementById('inventoryTable');
    tbody.innerHTML = inventory.map((item, index) => `
        <tr>
            <td>${item.category}</td>
            <td>${item.variant}</td>
            <td>${item.packSize}</td>
            <td>${item.price.toLocaleString()} MMK</td>
            <td>${item.stock}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="deleteItem(${index})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function deleteItem(index) {
    inventory.splice(index, 1);
    localStorage.setItem('inventory', JSON.stringify(inventory));
    updateInventoryTable();
}

// Sales Management
function showItems(category) {
    const items = inventory.filter(item => item.category === category);
    const itemList = document.getElementById('itemList');
    
    itemList.innerHTML = items.map(item => `
        <div class="card mb-2">
            <div class="card-body">
                <h5>${item.variant}</h5>
                <p>Pack: ${item.packSize} bottles</p>
                <p>Price: ${item.price.toLocaleString()} MMK</p>
                <button class="btn btn-sm btn-success" 
                        onclick="addToCart(${JSON.stringify(item)})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function addToCart(item) {
    const packs = prompt(`How many packs of ${item.variant}? (Available: ${item.stock})`);
    if(packs && packs > 0) {
        if(packs > item.stock) {
            alert('Not enough stock!');
            return;
        }
        
        const cartItem = {
            ...item,
            packs: parseInt(packs),
            total: item.price * packs
        };
        
        currentCart.push(cartItem);
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const tbody = document.getElementById('cartItems');
    tbody.innerHTML = currentCart.map((item, index) => `
        <tr>
            <td>${item.variant} (${item.category})</td>
            <td>${item.packs}</td>
            <td>${(item.packs * item.packSize).toLocaleString()}</td>
            <td>${item.total.toLocaleString()} MMK</td>
            <td><button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button></td>
        </tr>
    `).join('');
    
    const grandTotal = currentCart.reduce((sum, item) => sum + item.total, 0);
    document.getElementById('grandTotal').textContent = grandTotal.toLocaleString();
}

function removeFromCart(index) {
    currentCart.splice(index, 1);
    updateCartDisplay();
}

function completeSale() {
    const customer = document.getElementById('customerName').value || "Walk-in Customer";
    
    const sale = {
        date: new Date().toLocaleDateString(),
        customer,
        items: currentCart,
        total: currentCart.reduce((sum, item) => sum + item.total, 0)
    };
    
    // Update inventory
    currentCart.forEach(cartItem => {
        const item = inventory.find(i => 
            i.category === cartItem.category && 
            i.variant === cartItem.variant &&
            i.packSize === cartItem.packSize
        );
        if(item) item.stock -= cartItem.packs;
    });
    
    sales.push(sale);
    
    localStorage.setItem('inventory', JSON.stringify(inventory));
    localStorage.setItem('sales', JSON.stringify(sales));
    
    currentCart = [];
    updateCartDisplay();
    updateInventoryTable();
    updateSalesTable();
    bootstrap.Modal.getInstance(document.getElementById('newSaleModal')).hide();
}

// Sales History
function updateSalesTable() {
    const tbody = document.getElementById('salesTable');
    tbody.innerHTML = sales.map(sale => `
        <tr>
            <td>${sale.date}</td>
            <td>${sale.customer}</td>
            <td>${sale.items.map(item => `
                ${item.packs}x ${item.variant} (${item.packSize}b/pack)
            `).join(', ')}</td>
            <td>${sale.total.toLocaleString()} MMK</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="printInvoice(${sales.indexOf(sale)})">
                    Invoice
                </button>
            </td>
        </tr>
    `).join('');
}

function printInvoice(index) {
    const sale = sales[index];
    const win = window.open('', '_blank');
    
    win.document.write(`
        <html>
            <head>
                <title>Invoice #${index + 1}</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .header { text-align: center; margin-bottom: 20px; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid #ddd; padding: 8px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>New Life Pure Water</h1>
                    <h3>Invoice</h3>
                </div>
                <p>Date: ${sale.date}</p>
                <p>Customer: ${sale.customer}</p>
                
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Packs</th>
                            <th>Total Bottles</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sale.items.map(item => `
                            <tr>
                                <td>${item.variant} (${item.category})</td>
                                <td>${item.packs}</td>
                                <td>${item.packs * item.packSize}</td>
                                <td>${item.total.toLocaleString()} MMK</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <h3 class="text-end">Total: ${sale.total.toLocaleString()} MMK</h3>
            </body>
        </html>
    `);
    
    win.document.close();
    win.print();
}

// Search Function
document.getElementById('searchInput').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    const filtered = sales.filter(sale => 
        sale.customer.toLowerCase().includes(term) ||
        sale.date.includes(term) ||
        sale.items.some(item => item.variant.toLowerCase().includes(term))
    );
    
    document.getElementById('salesTable').innerHTML = filtered.map(sale => `
        <tr>
            <td>${sale.date}</td>
            <td>${sale.customer}</td>
            <td>${sale.items.map(item => `
                ${item.packs}x ${item.variant} (${item.packSize}b/pack)
            `).join(', ')}</td>
            <td>${sale.total.toLocaleString()} MMK</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="printInvoice(${sales.indexOf(sale)})">
                    Invoice
                </button>
            </td>
        </tr>
    `).join('');
});

// Initialize System
document.addEventListener('DOMContentLoaded', init);