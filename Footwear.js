// =============================================
//  KICKS.CO — JavaScript
//  Cart, Bid, Size Picker, Listing Form
// =============================================

let cart = JSON.parse(sessionStorage.getItem('fo_cart') || '[]');

function saveCart() {
  sessionStorage.setItem('fo_cart', JSON.stringify(cart));
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const countEl   = document.getElementById('cartCount');
  const totalEl   = document.getElementById('cartTotal');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-cart-msg">Nothing in the bag yet.</p>';
  } else {
    container.innerHTML = cart.map((item, i) => `
      <div class="cart-item">
        <div>
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">$${item.price}</p>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${i})">✕</button>
      </div>
    `).join('');
  }

  if (countEl) countEl.textContent = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  if (totalEl) totalEl.textContent = '$' + total.toLocaleString();
}

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  renderCart();
  openCart();

  const btn = document.querySelector('.cart-btn');
  if (btn) {
    btn.style.background = '#111';
    btn.style.color = '#f5c400';
    setTimeout(() => { btn.style.background = ''; btn.style.color = ''; }, 600);
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  if (!sidebar) return;
  const isOpen = sidebar.classList.toggle('open');
  overlay.classList.toggle('open', isOpen);
}

function openCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  if (!sidebar) return;
  sidebar.classList.add('open');
  overlay.classList.add('open');
}

// Counterbid
function Counterbid() {
  const input  = document.getElementById('counterbid');
  const result = document.getElementById('bidResult');
  const bidEl  = document.getElementById('BID');
  if (!input) return;

  const val = parseFloat(input.value);
  if (!input.value.trim() || isNaN(val) || val <= 0) {
    input.style.borderColor = '#e8341a';
    setTimeout(() => { input.style.borderColor = ''; }, 900);
    return;
  }
  if (bidEl)  bidEl.textContent = '$' + val.toLocaleString();
  if (result) result.style.display = 'block';
  input.value = '';
}

// Size picker
function selectSize(btn) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

// Sell listing form
function submitListing() {
  const inputs = document.querySelectorAll('.sell-input');
  let valid = true;
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#e8341a';
      valid = false;
      setTimeout(() => { input.style.borderColor = ''; }, 1000);
    }
  });
  if (!valid) return;
  inputs.forEach(i => { i.value = ''; });
  const msg = document.getElementById('listingMsg');
  if (msg) {
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 5000);
  }
}

document.addEventListener('DOMContentLoaded', renderCart);
