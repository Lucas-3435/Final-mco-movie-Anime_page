// Simple client-side cart (non-persistent across tabs)
const cart = {};

function formatPeso(n){ return `₱${Number(n).toLocaleString()}`; }

function updateCartUI() {
  const totalSpan = document.getElementById('cart-total');
  const cartItemsDiv = document.getElementById('cart-items');
  const cartCountEls = [
    document.getElementById('cart-count'),
    document.getElementById('cart-count-2'),
    document.getElementById('cart-count-3'),
  ];
  const cartCount = Object.values(cart).reduce((s, it) => s + it.qty, 0);
  cartCountEls.forEach(el => { if(el) el.textContent = cartCount; });

  if(!cartItemsDiv) return;
  cartItemsDiv.innerHTML = '';
  let total = 0;
  for(const id in cart){
    const item = cart[id];
    total += item.price * item.qty;
    const row = document.createElement('div');
    row.className = 'cart-row';
    row.innerHTML = `<div>${item.title} x ${item.qty}</div>
                     <div>${formatPeso(item.price * item.qty)}</div>`;
    cartItemsDiv.appendChild(row);
  }
  totalSpan.textContent = `Total: ${formatPeso(total)}`;
}

function addToCart(id, title, price) {
  if(cart[id]){
    cart[id].qty += 1;
  } else {
    cart[id] = { title, price: Number(price), qty: 1 };
  }
  updateCartUI();
}

function clearCart(){
  for(const k in cart) delete cart[k];
  updateCartUI();
}

function init() {
  // Attach add button handlers
  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      const title = btn.dataset.title;
      const price = btn.dataset.price;
      addToCart(id, title, price);
      btn.textContent = 'Added ✓';
      setTimeout(()=> btn.textContent = 'Add to Cart', 900);
    });
  });

  const checkout = document.getElementById('checkout-btn');
  if(checkout) checkout.addEventListener('click', () => {
    alert('Checkout simulated. (This is a demo.)');
    clearCart();
  });

  const clearBtn = document.getElementById('clear-cart');
  if(clearBtn) clearBtn.addEventListener('click', clearCart);

  // cart buttons top-right show/hide panel
  document.querySelectorAll('[id^=cart-btn]').forEach(b => {
    b.addEventListener('click', () => {
      const panel = document.getElementById('cart-panel');
      if(panel) panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
    });
  });

  // hide cart panel by default unless on products page
  const panel = document.getElementById('cart-panel');
  if(panel) panel.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', init);
