// International Standard Jewelry Website JavaScript

// Sample jewelry products data with international standards
const products = [
    {
        id: 1,
        name: "Diamond Solitaire Ring",
        price: 2850,
        category: "rings",
        material: "diamond",
        image: "placeholder",
        description: "Exquisite 1.2ct diamond solitaire ring in 18k white gold",
        rating: 4.9,
        reviews: 127,
        inStock: true,
        featured: true
    },
    {
        id: 2,
        name: "Pearl Strand Necklace",
        price: 1200,
        category: "necklaces",
        material: "pearl",
        image: "placeholder",
        description: "Classic Akoya pearl necklace with 18k gold clasp",
        rating: 4.8,
        reviews: 89,
        inStock: true,
        featured: true
    },
    {
        id: 3,
        name: "Rose Gold Earrings",
        price: 680,
        category: "earrings",
        material: "gold",
        image: "placeholder",
        description: "Elegant rose gold drop earrings with cubic zirconia",
        rating: 4.7,
        reviews: 156,
        inStock: true,
        featured: false
    },
    {
        id: 4,
        name: "Tennis Bracelet",
        price: 1850,
        category: "bracelets",
        material: "diamond",
        image: "placeholder",
        description: "Stunning diamond tennis bracelet in platinum",
        rating: 4.9,
        reviews: 73,
        inStock: true,
        featured: true
    },
    {
        id: 5,
        name: "Luxury Watch",
        price: 3200,
        category: "watches",
        material: "gold",
        image: "placeholder",
        description: "Swiss-made luxury watch with gold case and leather strap",
        rating: 4.8,
        reviews: 45,
        inStock: true,
        featured: false
    },
    {
        id: 6,
        name: "Vintage Brooch",
        price: 420,
        category: "brooches",
        material: "silver",
        image: "placeholder",
        description: "Art Deco inspired silver brooch with crystal accents",
        rating: 4.6,
        reviews: 32,
        inStock: true,
        featured: false
    },
    {
        id: 7,
        name: "Emerald Ring",
        price: 2100,
        category: "rings",
        material: "gold",
        image: "placeholder",
        description: "Stunning emerald ring with diamond halo in 14k yellow gold",
        rating: 4.8,
        reviews: 91,
        inStock: true,
        featured: true
    },
    {
        id: 8,
        name: "Sapphire Necklace",
        price: 1650,
        category: "necklaces",
        material: "platinum",
        image: "placeholder",
        description: "Royal blue sapphire pendant necklace in platinum",
        rating: 4.9,
        reviews: 67,
        inStock: false,
        featured: false
    }
];

// Sample reviews data
const reviews = [
    {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        comment: "Absolutely stunning jewelry! The quality is exceptional and the customer service was outstanding.",
        date: "2024-01-15",
        verified: true
    },
    {
        id: 2,
        name: "Michael Chen",
        rating: 5,
        comment: "Bought an engagement ring here. Perfect quality and beautiful presentation. Highly recommended!",
        date: "2024-01-10",
        verified: true
    },
    {
        id: 3,
        name: "Emma Williams",
        rating: 4,
        comment: "Beautiful collection and great prices. The pearl necklace I purchased exceeded my expectations.",
        date: "2024-01-08",
        verified: true
    }
];

// Global variables
let cart = JSON.parse(localStorage.getItem('jewelryCart')) || [];
let filteredProducts = [...products];
let currentFilters = {
    category: 'all',
    material: 'all',
    price: 'all',
    sort: 'featured'
};

// Initialize website
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    displayReviews();
    updateCartDisplay();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
}

// Navigation functions
function toggleSearch() {
    const searchOverlay = document.getElementById('searchOverlay');
    searchOverlay.classList.toggle('active');
    if (searchOverlay.classList.contains('active')) {
        document.getElementById('searchInput').focus();
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
    displayCartItems();
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Product filtering and display
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const materialFilter = document.getElementById('materialFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    currentFilters = {
        category: categoryFilter,
        material: materialFilter,
        price: priceFilter,
        sort: sortFilter
    };
    
    filteredProducts = products.filter(product => {
        // Category filter
        if (categoryFilter !== 'all' && product.category !== categoryFilter) {
            return false;
        }
        
        // Material filter
        if (materialFilter !== 'all' && product.material !== materialFilter) {
            return false;
        }
        
        // Price filter
        if (priceFilter !== 'all') {
            const price = product.price;
            switch (priceFilter) {
                case '0-500':
                    if (price > 500) return false;
                    break;
                case '500-1000':
                    if (price < 500 || price > 1000) return false;
                    break;
                case '1000-2500':
                    if (price < 1000 || price > 2500) return false;
                    break;
                case '2500+':
                    if (price < 2500) return false;
                    break;
            }
        }
        
        return true;
    });
    
    // Sort products
    sortProducts(sortFilter);
    displayProducts();
}

function sortProducts(sortBy) {
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'featured':
        default:
            filteredProducts.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return b.rating - a.rating;
            });
            break;
    }
}

function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <div class="placeholder-image">
                <i class="fas fa-gem"></i>
                <p>Premium Jewelry</p>
            </div>
            ${product.featured ? '<span class="featured-badge">Featured</span>' : ''}
            ${!product.inStock ? '<span class="out-of-stock-badge">Out of Stock</span>' : ''}
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
                ${generateStars(product.rating)}
                <span class="rating-text">(${product.reviews})</span>
            </div>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price.toLocaleString()}</div>
            <div class="product-actions">
                <button class="btn-primary" onclick="openProductModal(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                    ${product.inStock ? 'View Details' : 'Out of Stock'}
                </button>
                <button class="btn-secondary" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                    <i class="fas fa-shopping-bag"></i>
                </button>
            </div>
        </div>
    `;
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Product modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="modal-product">
            <div class="modal-product-image">
                <div class="placeholder-image">
                    <i class="fas fa-gem"></i>
                </div>
            </div>
            <div class="modal-product-info">
                <h2>${product.name}</h2>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span class="rating-text">(${product.reviews} reviews)</span>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-details">
                    <p><strong>Material:</strong> ${product.material.charAt(0).toUpperCase() + product.material.slice(1)}</p>
                    <p><strong>Category:</strong> ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                    <p><strong>Availability:</strong> ${product.inStock ? 'In Stock' : 'Out of Stock'}</p>
                </div>
                <div class="product-price">$${product.price.toLocaleString()}</div>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="addToCart(${product.id}); closeProductModal();" ${!product.inStock ? 'disabled' : ''}>
                        Add to Cart
                    </button>
                    <button class="btn-secondary" onclick="closeProductModal()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
}

// Shopping cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.inStock) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartDisplay();
    saveCartToStorage();
    showNotification('Item added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    displayCartItems();
    saveCartToStorage();
    showNotification('Item removed from cart');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
            displayCartItems();
            saveCartToStorage();
        }
    }
}

function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartCount) cartCount.textContent = totalItems;
    if (cartTotal) cartTotal.textContent = totalPrice.toFixed(2);
}

function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <div class="placeholder-image">
                    <i class="fas fa-gem"></i>
                </div>
            </div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p class="cart-item-price">$${item.price}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function saveCartToStorage() {
    localStorage.setItem('jewelryCart', JSON.stringify(cart));
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    showNotification('Redirecting to checkout...');
    // In a real application, this would redirect to a payment processor
    setTimeout(() => {
        alert('Thank you for your purchase! This is a demo - no actual payment was processed.');
        cart = [];
        updateCartDisplay();
        displayCartItems();
        saveCartToStorage();
        toggleCart();
    }, 2000);
}

// Search functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.material.toLowerCase().includes(searchTerm)
    );
    
    displayProducts();
}

// Reviews functionality
function displayReviews() {
    const reviewsGrid = document.getElementById('reviewsGrid');
    if (!reviewsGrid) return;
    
    reviewsGrid.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div>
                        <h4>${review.name}</h4>
                        <div class="review-rating">
                            ${generateStars(review.rating)}
                        </div>
                    </div>
                </div>
                <div class="review-date">
                    ${new Date(review.date).toLocaleDateString()}
                    ${review.verified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>' : ''}
                </div>
            </div>
            <p class="review-comment">${review.comment}</p>
        </div>
    `).join('');
}

function submitReview(event) {
    event.preventDefault();
    
    const name = document.getElementById('reviewerName').value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value;
    const comment = document.getElementById('reviewText').value;
    
    if (!name || !rating || !comment) {
        showNotification('Please fill in all fields');
        return;
    }
    
    const newReview = {
        id: reviews.length + 1,
        name: name,
        rating: parseInt(rating),
        comment: comment,
        date: new Date().toISOString().split('T')[0],
        verified: false
    };
    
    reviews.unshift(newReview);
    displayReviews();
    
    // Reset form
    document.getElementById('reviewForm').reset();
    showNotification('Thank you for your review!');
}

// Contact form
function submitContact(event) {
    event.preventDefault();
    showNotification('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Newsletter subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    showNotification('Thank you for subscribing to our newsletter!');
    event.target.reset();
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeProductModal();
    }
    
    const searchOverlay = document.getElementById('searchOverlay');
    if (event.target === searchOverlay) {
        toggleSearch();
    }
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
