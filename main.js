const products = [
  {
    id: 1,
    name: "iPhone X",
    price: 19.99,
    image:
      "https://images.pexels.com/photos/15916262/pexels-photo-15916262/free-photo-of-apple-iphone-dark-laptop.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 2,
    name: "iPhone 11 pro",
    price: 10.99,
    image:
      "https://images.pexels.com/photos/3571093/pexels-photo-3571093.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 3,
    name: "iPhone 11",
    price: 20.99,
    image:
      "https://images.pexels.com/photos/3623360/pexels-photo-3623360.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 4,
    name: "iPhone 11 pro max",
    price: 30.99,
    image:
      "https://images.pexels.com/photos/3707744/pexels-photo-3707744.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 5,
    name: "iPhone 12",
    price: 50.99,
    image:
      "https://images.pexels.com/photos/6608247/pexels-photo-6608247.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 6,
    name: "iPhone 12 pro max",
    price: 10.99,
    image:
      "https://images.pexels.com/photos/12794488/pexels-photo-12794488.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 7,
    name: "macbook m1",
    price: 10.99,
    image:
      "https://images.pexels.com/photos/434346/pexels-photo-434346.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 8,
    name: "airpod pro",
    price: 12.99,
    image:
      "https://images.pexels.com/photos/1646704/pexels-photo-1646704.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  // Add more products here...
];

const cart = [];

// Load cart data from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadCartData();
});

// Function to save cart data to localStorage
function saveCartData() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to load cart data from localStorage
function loadCartData() {
  const savedCart = localStorage.getItem("cart");

  if (savedCart) {
    cart = JSON.parse(savedCart);
    renderCart();
  }
}

function renderProducts() {
  const productsDiv = document.getElementById("products");
  productsDiv.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <div class="product-title">${product.name}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;

    productsDiv.appendChild(productDiv);
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    renderCart();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById("cart");
  const totalPriceSpan = document.getElementById("totalPrice");

  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");

    cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>${item.name}</div>
            <div>$${item.price.toFixed(2)}</div>
            <div class="remove-button" onclick="removeFromCart(${index})">Remove</div>
        `;

    cartDiv.appendChild(cartItemDiv);
    total += item.price;
  });

  totalPriceSpan.textContent = total.toFixed(2);
}

renderProducts();
