document.addEventListener("DOMContentLoaded", () => {
  fetch("navigation.html")
    .then((response) => {
      if (!response.ok)
        throw new Error("Hiba történt a navigáció betöltésekor!");
      return response.text();
    })
    .then((data) => {
      document.getElementById("navigation").innerHTML = data;
    })
    .catch((error) => {
      console.error(error);
    });

  const form = document.getElementById("add-product-form");
  const productList = document.getElementById("product-list");
  let products = JSON.parse(localStorage.getItem("products")) || [];

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const price = document.getElementById("price").value;
      const category = document.getElementById("category").value;

      if (!name || price <= 0 || !category) {
        alert("Kérjük töltsön ki minden mezőt helyesen!");
        return;
      }

      const newProduct = {
        name,
        price: parseFloat(price),
        category,
      };

      products.push(newProduct);

      localStorage.setItem("products", JSON.stringify(products));

      form.reset();
      alert("Termék sikeresen hozzáadva!");
    });
  }

  if (productList) {
    updateProductList();
  }

  function updateProductList() {
    productList.innerHTML = "";

    products.forEach((product, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price.toFixed(2)}  HUF</td>
            `;
      row.style.opacity = "0";
      row.style.transform = "scale(1.2";
      productList.appendChild(row);

      setTimeout(() => {
        row.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        row.style.opacity = "1";
        row.style.transform = "scale(1)";
      }, 100);
    });
  }

  function loadContent(url, targetElementId) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function () {
      if (this.status === 200) {
        if (document.getElementById(targetElementId)) {
          document.getElementById(targetElementId).innerHTML =
            this.responseText;
        }
      } else {
        console.error("Hiba történt a tartalom betöltésekor: ${this.status}");
      }
    };

    xhr.onerror = function () {
      console.error("Hálózati hiba történt a tartalom betöltésekor!");
    };

    xhr.send();
  }

  loadContent("intro.html", "intro");
});
