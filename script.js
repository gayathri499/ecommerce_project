const products = [
    { id: 1, name: "Shoes", price: 1000, image: "images/shoe.jpg" },
    { id: 2, name: "Shirt", price: 500, image: "images/shirt.png" },
    { id: 3, name: "Watch", price: 1500, image: "images/watch.avif" }
];

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productDiv = document.getElementById("products");
const cartDiv = document.getElementById("cart");
const totalDisplay = document.getElementById("total");

// Show products
products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productDiv.appendChild(div);
});

// Add to cart
function addToCart(id) {
    const item = cart.find(p => p.id === id);

    if (item) {
        item.quantity += 1;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
}

// Remove item
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
}

// Change quantity
function changeQuantity(id, amount) {
    const item = cart.find(p => p.id === id);

    if (item) {
        item.quantity += amount;

        if (item.quantity <= 0) {
            removeItem(id);
        } else {
            saveCart();
        }
    }
}

// Save cart + update UI
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Render cart
function renderCart() {
    cartDiv.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${item.name} - ₹${item.price} x ${item.quantity}
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
            <button onclick="changeQuantity(${item.id}, -1)">-</button>
            <button onclick="removeItem(${item.id})">Remove</button>
        `;

        cartDiv.appendChild(li);

        total += item.price * item.quantity;
    });

    totalDisplay.textContent = total;
}

// Initial render
renderCart();
function searchProduct() {
    const input = document.getElementById("search").value.toLowerCase();
    const productCards = document.querySelectorAll(".product");

    productCards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();

        if (name.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}