document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage !== "index.html" && currentPage !== "") {
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
  }

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
      row.style.transform = "scale(1.2)";
      productList.appendChild(row);

      setTimeout(() => {
        row.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        row.style.opacity = "1";
        row.style.transform = "scale(1)";
      }, 100);
    });
  }

  function loadContent(url, targetElementId) {
    fetch(url)
      .then((response) => {
        if (!response.ok)
          throw new Error("Hiba történt a tartalom betöltésekor!");
        return response.text();
      })
      .then((data) => {
        const target = document.getElementById(targetElementId);
        if (target) target.innerHTML = data;
      })
      .catch((error) => console.error(error));
  }

  if (currentPage === "index.html" || currentPage === "") {
    loadContent("pages/intro.html", "intro");
  }

  function exportProducts() {
    const data = JSON.stringify(products, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.json";
    a.click();
  }

  function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    updateProductList();
  }

  function editProduct(index, updatedProduct) {
    products[index] = updatedProduct;
    localStorage.setItem("products", JSON.stringify(products));
    updateProductList();
  }
});
