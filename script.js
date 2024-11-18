document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("product-form");
  const productList = document.getElementById("product-list");

  let products = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const quantity = document.getElementById("quantity").value;

    if (!name || price <= 0 || !category || quantity <= 0) {
      alert("Kérjük töltsön ki minden mezőt helyesen!");
      return;
    }

    const newProduct = {
      name,
      price: parseFloat(price),
      category,
      quantity: parseInt(quantity),
    };

    products.push(newProduct);
    updateProductList();

    form.reset();
  });

  function updateProductList() {
    productList.innerHTML = "";

    products.forEach((product, i) => {
      const row = document.createElement("tr");
      tr.innerHTML = `
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price.toFixed(2)}  HUF</td>
                <td>${product.quantity}</td>
            `;
      row.style.opacity = "0";
      row.style.transform = "translateY(20px)";
      productList.appendChild(row);

      setTimeout(() => {
        row.style.transition = "all 0.5s ease";
        row.style.opacity = "1";
        row.style.transform = "translateY(0)";
      }, 100);
    });
  }

  function loadContent(url, targetElementId) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function () {
      if (this.status === 200) {
        document.getElementById(targetElementId).innerHTML = this.responseText;
      } else {
        console.error("Hiba történt a tartalom betöltésekor!");
      }
    };

    xhr.send();
  }

  loadContent("intro.html", "intro");
});
