// Product data
const products = [
  {
    id: 1,
    name: 'Our Special Candle',
    description: 'Hand‑poured soy wax candle with soothing aromas.',
    price: 500
  },
  {
    id: 2,
    name: 'Our Lippan Art',
    description: 'Intricate lippan artwork handcrafted on a wooden base.',
    price: 500
  },
  {
    id: 3,
    name: 'Our Special Home Decor',
    description: 'Unique clay home decor bringing elegance to your space.',
    price:500
  },
  {
    id: 4,
    name: 'Our Special Art & Craft',
    description: 'Custom handmade art and craft pieces to beautify your home.',
    price: 500
  },
  {
    id: 5,
    name: 'Our Special Frame',
    description: 'Handcrafted frames perfect for your cherished photos.',
    price: 10
  },
  {
    id: 6,
    name: 'Based On Your Demand',
    description: 'Bespoke art and products tailored just for you.',
    price:5
  }
];

// Insert products into the menu grid on index page
function renderMenu() {
  const menuGrid = document.getElementById('menu-grid');
  if (!menuGrid) return;
  menuGrid.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'menu-item';
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="price">₹${product.price.toFixed(2)}</div>
      <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    menuGrid.appendChild(card);
  });
}

// Add product to cart stored in localStorage
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Update cart count badge in nav
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.textContent = count;
  }
}

// Render cart items in cart.html
function renderCart() {
  const cartItemsEl = document.getElementById('cart-items');
  const summaryEl = document.getElementById('cart-summary');
  if (!cartItemsEl || !summaryEl) return;
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p>Your cart is empty.</p>';
    summaryEl.innerHTML = '<a href="index.html#menu" class="btn">Continue Shopping</a>';
    return;
  }
  cartItemsEl.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <h4>${item.name}</h4>
      <div>Qty: ${item.quantity}</div>
      <div class="item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
      <button class="btn" onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsEl.appendChild(row);
  });
  summaryEl.innerHTML = `
    <h3>Total: ₹${total.toFixed(2)}</h3>
    <a href="checkout.html" class="btn">Proceed to Checkout</a>
  `;
  updateCartCount();
}

// Remove item from cart by index
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const number = document.getElementById('contact-number').value;
    const message = document.getElementById('contact-message').value;
    // Create mailto link
    const mailtoLink = `mailto:subhash13333.ss@gmail.com?subject=Bulk%20Order%20Enquiry&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nNumber: ${number}\nMessage: ${message}`)}`;
    window.open(mailtoLink, '_blank');
    alert('Thank you for reaching out! We will get back to you soon.');
    contactForm.reset();
  });
}

// Initialize menu and cart count on each page load
document.addEventListener('DOMContentLoaded', function() {
  renderMenu();
  updateCartCount();
  // Initialise theme based on user preference and attach toggle handler
  initializeTheme();
});

// Theme toggling logic
function initializeTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  // Determine the previously saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateToggleIcon(savedTheme);
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateToggleIcon(newTheme);
    });
  }
}

function updateToggleIcon(theme) {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  // Use a sun icon for dark mode and a moon for light mode
  toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}
