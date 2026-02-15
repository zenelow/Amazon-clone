import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { loadProducts } from "../data/products.js";

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  const sections = [
    { name: 'Apparel', keyword: 'apparel' },
    { name: 'Kitchen & Appliances', keyword: 'kitchen' },
    { name: 'Home & Bedroom', keyword: 'home' },
    { name: 'Footwear', keyword: 'footwear' },
    { name: 'Accessories', keyword: 'accessories' }
  ];

  let mainHTML = '';

  sections.forEach((section) => {
    const sectionProducts = products.filter((product) => {
      return product.keywords && product.keywords.includes(section.keyword);
    });

    if (sectionProducts.length === 0) return;

    // Initially show only up to 6 products per category (approx one row on desktop)
    const initialLimit = 6;
    const hasMore = sectionProducts.length > initialLimit;

    mainHTML += `
      <div class="category-section js-category-section-${section.keyword}">
        <h2 class="category-title">
          ${section.name}
        </h2>
        <div class="products-grid js-products-grid-${section.keyword}">
    `;

    sectionProducts.forEach((product, index) => {
      const isHidden = index >= initialLimit;
      mainHTML += `
        <div class="product-container ${isHidden ? 'hidden' : ''}">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src=${product.getStarsUrl()}>
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
    });

    mainHTML += `
        </div>
        ${hasMore ? `
          <div class="see-more-container">
            <button class="see-more-button js-see-more-button" data-section="${section.keyword}">
              See more products in ${section.name}
            </button>
          </div>
        ` : ''}
      </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = mainHTML;

  // Add listeners for "See More" buttons
  document.querySelectorAll('.js-see-more-button').forEach((button) => {
    button.addEventListener('click', () => {
      const sectionKeyword = button.dataset.section;
      const grid = document.querySelector(`.js-products-grid-${sectionKeyword}`);
      grid.querySelectorAll('.product-container.hidden').forEach((product) => {
        product.classList.remove('hidden');
      });
      button.parentElement.remove(); // Remove the "See More" button after expanding
    });
  });

  updateCartQuantity();

  function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }

  document.querySelectorAll('.js-add-to-cart-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        addToCart(productId);
        updateCartQuantity();
      });
    });
}