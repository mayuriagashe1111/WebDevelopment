// Initialize an empty cart array
let cart = [];

// Helper function to update the entire UI (cart items, total, and buttons)
function updateUI() {
    const cartList = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total-amount');
    const headerRow = document.getElementById('cart-header-row'); 

    if (cart.length === 0) {
        cartList.innerHTML = ` <li class="no-items">
                <ion-icon name="information-circle-outline"></ion-icon>
                <span class="empty-title">No items added</span>
                <span class="empty-subtitle">Add items to the cart from the services bar</span>
            </li>`;
        
    } else {
        headerRow.style.display = 'flex';
        cartList.innerHTML = cart.map((item, index) => 
            `<li class="cart-item">
                <div class="cart-item-left">
                    <span class="item-index">${index + 1}</span>
                    <span class="item-name">${item.name}</span>
                </div>
                <span class="item-price">₹${item.price}</span>
            </li>`
        ).join('');
    }

    // Update Total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalDisplay.innerText = total;
    
    // Sync Buttons
    syncServiceButtons();
}

// Function to add an item to the cart
function addToCart(name, price) {
    // Prevent adding duplicates
    if (!cart.find(item => item.name === name)) {
        cart.push({ name, price });
        updateUI(); // Updates UI and syncs buttons
    }
}

// Function to remove an item from the cart
function removeFromCart(name) {
    const index = cart.findIndex(item => item.name === name);
    if (index > -1) {
        cart.splice(index, 1);
        updateUI(); // Updates UI and syncs buttons
    }
}

// Function to control which button is visible (Add vs Remove) on the left side
function syncServiceButtons() {
    // Iterate over every service item listed on the page
    document.querySelectorAll('.service-item').forEach(item => {
        const serviceName = item.querySelector('.service-name').innerText;
        const isInCart = cart.some(item => item.name === serviceName);

        // Find the specific buttons within this loop's 'item' context
        const addButton = item.querySelector('.btn-add');
        const removeButton = item.querySelector('.btn-remove');

        if (isInCart) {
            // If the item is in the cart, hide 'Add', show 'Remove'
            addButton.style.display = 'none';
            removeButton.style.display = 'inline-block';
        } else {
            // If not in cart, show 'Add', hide 'Remove'
            addButton.style.display = 'inline-block';
            removeButton.style.display = 'none';
        }
    });
}

// ============================
// EMAIL CONFIRMATION LOGIC
// ============================

const SERVICE_ID = "service_bkkj2ip";
const TEMPLATE_ID = "template_uq1spup";

const bookingForm = document.getElementById("booking-form");
const bookingMessage = document.getElementById("booking-message");

bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validation: cart must not be empty
    if (cart.length === 0) {
        alert("Please add at least one service before booking.");
        return;
    }

    const params = {
        user_name: document.getElementById("user_name").value,
        user_email: document.getElementById("user_email").value,
        user_phone: document.getElementById("user_phone").value,
        services: cart.map(item => item.name).join(", "),
        total_amount: document.getElementById("total-amount").innerText
    };

//     emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
//         .then(() => {
//             // Show success message
//             bookingMessage.style.display = "block";

//             // Reset everything
//             cart = [];
//             updateUI();
//             bookingForm.reset();
//         })
//         .catch((error) => {
//             console.error("EmailJS Error:", error);
//             alert(error);
//             // alert("Something went wrong. Please try again later.");
//         });
// });


emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
    .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);

        bookingMessage.style.display = "block";
        cart = [];
        updateUI();
        bookingForm.reset();
    })
    .catch(function (error) {
        console.error("FAILED...", error);
        alert("Email failed. Check EmailJS configuration.");
    });
    });

// Initialize button states and UI when the page loads
document.addEventListener('DOMContentLoaded', updateUI);