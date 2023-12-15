function addItemToCart(name, price) {
  shoppingCart.addItemToCart(name, parseFloat(price), 1);
  var count = shoppingCart.totalCount();
  $('#cartItemCount').text(" (" + count + ")");
}

$(document).ready(function() {
  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    addItemToCart($(this).data('name'), $(this).data('price'));
  });

  $('#formItem').submit(function(event) {
    event.preventDefault();
    var keyword = $('#keyword').val().toLowerCase();
    $('.card').each(function() {
      var title = $(this).find('.card-title').text().toLowerCase();
      if (title.includes(keyword)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  $(window).on('resize', function() {
    if ($(window).width() < 768) {
      $('.card').addClass('col-md-6');
    } else {
      $('.card').removeClass('col-md-6');
    }
  });
});

$('#searchItem').on('click', function(event) {
  event.preventDefault();
  var keyword = $('#keyword').val().toLowerCase();
  $('.card').each(function() {
    var title = $(this).find('.card-title').text().toLowerCase();
    if (title.includes(keyword)) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
});

$(document).ready(function(){
  $('#addtocart').on('click',function(){

    var button = $(this);
    var cart = $('#cart');
    var cartTotal = cart.attr('data-totalitems');
    var newCartTotal = parseInt(cartTotal) + 1;

    button.addClass('sendtocart');
    setTimeout(function(){
      button.removeClass('sendtocart');
      cart.addClass('shake').attr('data-totalitems', newCartTotal);
      setTimeout(function(){
        cart.removeClass('shake');
      },500)
    },1000)
  })
})

const cart = {
  items: [],

  addItem: function (name, price) {
    this.items.push({ name, price });
  },

  getTotalPrice: function () {
    return this.items.reduce((total, item) => total + item.price, 0);
  },

  clearCart: function () {
    this.items = [];
  },
};

// Function to update the cart and cart modal
function updateCart() {
  const showCartTable = document.querySelector('.show-cart-popup');
  const totalCartSpan = document.querySelector('.total-cart-popup');
  showCartTable.innerHTML = '';
  cart.items.forEach((item) => {
    showCartTable.innerHTML += `<tr><td>${item.name}</td><td>$${item.price.toFixed(2)}</td></tr>`;
  });
  totalCartSpan.textContent = cart.getTotalPrice().toFixed(2);
  document.getElementById('cartItemCount').textContent = ` (${cart.items.length})`;
}

// Handle the "Order now" button click
document.getElementById('orderButton').addEventListener('click', () => {
  Swal.fire('Order Placed', 'Your order has been placed successfully!', 'success');
  cart.clearCart();
  updateCart();
  $('#cartPopup').modal('hide');
});

// Search functionality
document.getElementById('searchButton').addEventListener('click', () => {
  const keyword = document.getElementById('keyword').value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    if (title.includes(keyword) || keyword === '') {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// Handle the "Clear Cart" button click
document.getElementById('clearCartButton').addEventListener('click', () => {
  cart.clearCart();
  updateCart();
  Swal.fire('Cart Cleared', 'Your cart has been cleared.', 'success');
});

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    cart.addItem(name, price);
    updateCart();
    Swal.fire('Sukses ditambahkan!', `${name} ditambahkan ke keranjang!`, 'success');
  });
});

// Handle the cart button click to open the cart popup
document.getElementById('cart').addEventListener('click', () => {
  updateCart();
  $('#cartPopup').modal('show');
});

document.addEventListener("DOMContentLoaded", function () {
  const listBarang = document.getElementById("listBarang");
  const formItem = document.getElementById("formItem");
  const keywordInput = document.getElementById("keyword");
  let totalBarangDiKeranjang = 0;

  var items = [
['001', 'Keyboard Logitech', 60000, 'Keyboard yang mantap untuk kantoran', '/assets/logitek.jpg'],
['002', 'Keyboard MSI', 300000, 'Keyboard gaming MSI mechanical', '/assets/msi.jpg'],
['003', 'Mouse Genius', 50000, 'Mouse Genius biar lebih pintar', '/assets/genius.jpeg'],
['004', 'Mouse Jerry', 30000, 'Mouse yang disukai kucing', '/assets/jerry.jpg']
]

  function Cari(keyword) {
      listBarang.innerHTML = "";
      for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item[1].toLowerCase().includes(keyword.toLowerCase())) {
              const card = document.createElement("div");
              card.classList.add("col-4", "mt-2");
              card.innerHTML = `
                  <div class ="col-4 mt-2"> 
                      <div class="card" style="width: 18rem;">
                          <img src="${item[4]}" class="card-img-top" height="200px" width="200px" alt="...">
                          <div class="card-body">
                              <h5 class="card-title" id="itemName">${item[1]}</h5>
                              <p class="card-text" id="itemDesc">${item[3]}</p>
                              <p class="card-text">Rp.${item[2]}</p>
                              <br>
                              <a href="#" class="btn btn-primary add-to-cart" data-id="${item[0]}">Tambahkan ke keranjang</a>
                          </div>
                      </div>
                  </div>
              `;
              listBarang.appendChild(card);
          }
      }
      const btnTambahKeKeranjang = document.querySelectorAll(".add-to-cart");
      btnTambahKeKeranjang.forEach(button => {
          button.addEventListener("click", tambahKeKeranjang);
      });
  }
  // menangani ketika tombol submit diklik
  formItem.addEventListener("submit", function (e) {
      e.preventDefault();
      const keyword = keywordInput.value;
      Cari(keyword);

  });

//cart
document.getElementById("cart").addEventListener("click", function () {
    if (totalBarangDiKeranjang > 0) {
        const cartItems = cart.items;
        if (cartItems.length > 0) {
            let message = '<table class="table"><thead><tr><th>Nama Barang</th><th>Deskripsi</th><th>Harga</th></tr></thead><tbody>';
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                message += `<tr><td>${item.name}</td><td>${item.description}</td><td>Rp.${item.price}</td></tr>`;
            }
            message += '</tbody></table>';
            Swal.fire({
                title: 'Keranjang Anda',
                html: message,
                icon: 'info',
            });
        } else {
            Swal.fire(
                'Info',
                'Keranjang masih kosong',
                'info'
            );
        }
    } else {
        Swal.fire(
            'Info',
            'Keranjang belum berisi barang',
            'info'
        );
    }
});


  function tambahKeKeranjang(event) {
      const itemId = event.target.getAttribute("data-id");
      // untuk mencari item dari array items yang punya id yg sama dengan itemId
      const item = items.find(item => item[0] === itemId);

      if (totalBarangDiKeranjang < 9) {
          totalBarangDiKeranjang++;
      } else {
          totalBarangDiKeranjang = `9+`;
      }

      document.getElementById("cartItemCount").textContent = `(${totalBarangDiKeranjang})`;
      Swal.fire(
          'Success',
          `${item[1]} Berhasil ditambahkan keranjang!`,
          'success'
      )
  }
  // Menampilkan semua barang saat halaman dimuat
  Cari("");
});

// Di dalam event handler untuk tombol cari, tambahkan kode berikut
formItem.addEventListener("submit", function (e) {
e.preventDefault();
const keyword = keywordInput.value;
Cari(keyword);

// Periksa apakah hasil pencarian kosong
if (listBarang.childElementCount === 0) {
    tampilkanPesanProdukTidakTersedia(keyword);
} else {
    // Hapus pesan produk tidak tersedia jika ada hasil pencarian
    const pesanProdukTidakTersedia = document.querySelector(".no-result-message");
    if (pesanProdukTidakTersedia) {
        pesanProdukTidakTersedia.remove();
    }
}
});

// Function to handle "Clear All" button click
document.getElementById('clearCartButton').addEventListener('click', function () {
Swal.fire({
    title: 'Konfirmasi',
    text: 'Anda yakin ingin mengosongkan keranjang?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya',
    cancelButtonText: 'Batal'
}).then((result) => {
    if (result.isConfirmed) {
        // Mengosongkan keranjang
        totalBarangDiKeranjang = 0;
        document.getElementById("cartItemCount").textContent = `(0)`;
        Swal.fire('Keranjang dikosongkan', 'Semua barang telah dihapus dari keranjang!', 'success');
    }
});
});