# Termékek Nyilvántartó Rendszer - Részletes Dokumentáció

## 1. Rendszer Áttekintés

A Termékek Nyilvántartó Rendszer egy modern, webalapú alkalmazás, amely lehetővé teszi a felhasználók számára termékek katalogizálását, kezelését és nyomon követését. A rendszer reszponzív kialakítású, így mind asztali, mind mobil eszközön megfelelően használható.

## 2. Technikai Specifikáció

### 2.1 Használt technológiák

- HTML5
- CSS3/SCSS
- JavaScript (ES6+)
- LocalStorage adattárolás
- Reszponzív design (Mobile-first megközelítés)

### 2.2 Fájlstruktúra

- 📁 project-root
  - 📄 index.html
  - 📄 readme.md
  - 📁 assets
    - 📄 dynamic_image.jpg
    - 📄 example.jpg
  - 📁 css
    - 📄 styles.css
    - 📄 styles.css.map
    - 📄 styles.scss
  - 📁 pages
    - 📄 add-product.html
    - 📄 contact.html
    - 📄 intro.html
    - 📄 navigation.html
    - 📄 products.html
  - 📁 scripts
    - script.js

## 3. Funkcionális Specifikáció

### 3.1 Főbb Funkciók

1. Termékek Listázása
   - Rendezett táblázatos megjelenítés
   - Szűrési lehetőségek
   - Rendezési opciók
   - Lapozás
2. Termék Kezelése
   - Új termék hozzáadása
   - Meglévő termék szerkesztése
   - Termék törlése
   - Validáció
3. Adatkezelés
   - LocalStorage alapú perzisztens tárolás
   - Automatikus mentés
   - Adatok exportálása/importálása

### 3.2 Felhasználói Felület

```html
<nav>
  <ul>
    <li><a href="index.html">Főoldal</a></li>
    <li><a href="pages/products.html">Terméklista</a></li>
    <li><a href="pages/add-product.html">Új termék</a></li>
    <li><a href="pages/contact.html">Kapcsolat</a></li>
  </ul>
</nav>
```

## 4. Implementációs Részletek

### 4.1 Adatmodell

```js
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.2 LocalStorage Kezelés

```js
class StorageManager {
  static save(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static load(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}
```

## 5. Stílus útmutató

### 5.1 Színpaletta

```scss
$primary-color: #00509e;
$secondary-color: #6c757d;
$background-color: #f8f9fa;
$text-color: #212529;
$error-color: #dc3545;
$success-color: #28a745;
```

### 5.2 Tipográfia

```scss
$font-family-base: "Arial", sans-serif;
$font-size-base: 1rem;
$line-height-base: 1.5;
$headings-font-family: "Helvetica Neue", sans-serif;
```

## 6. Teljesítmény Optimalizálás

### 6.1 Kód Optimalizálás

- Lazy loading képekhez
- Minimalizált CSS/JS fájlok
- Gyorsítótárazás implementálása

### 6.2 Erőforrás Menedzsment

```js
// Képek lazy loading implementációja
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer), => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
});
```

## 7. Biztonsági Megfontolások

### 7.1 Adatvalidáció

```js
class Validator {
  static validateProduct(product: Product): boolean {
    if (!product.name || product.name.length < 3) return false;
    if (!product.price || product.price <= 0) return false;
    if (!product.category) return false;
    return true;
  }
}
```

### 7.2 XSS védelem

```js
function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, "");
}
```

## 8. Tesztelés

### 8.1 Unit Tesztek

```js
describe("Product Validation", () => {
  it("should validate product name", () => {
    const product = {
      name: "",
      price: 100,
      category: "electronics",
    };
    expect(Validator.validateProduct(product)).toBeFalsy();
  });
});
```

## 9. Továbbfejlesztési Lehetőségek

1. Backend Integráció
   - API fejlesztés
   - Adatbázis kapcsolat
   - Felhasználói autentikáció
2. További Funkciók
   - Vonalkód szkennelés
   - QR kód generálás
   - PDF export
   - Statisztikák készítése
3. UI/UX Fejlesztések
   - Sötét/Világos téma
   - Testreszabható dashboard
   - Drag-and-drop funkciók
