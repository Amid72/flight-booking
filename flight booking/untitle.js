window.addEventListener("load", () => {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("departureDate").min = today;

    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("app").classList.remove("hidden");
    }, 1500);
});

// Search Flights
document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const origin = document.getElementById("origin").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const date = document.getElementById("departureDate").value;
    const resultsSection = document.getElementById("results-section");
    resultsSection.classList.remove("hidden");

    let flightList = "";
    for (let i = 1; i <= 10; i++) {
        flightList += `
 <div class='flight-item'>
 <p><strong>Flight ${i}</strong>: ${origin} → ${destination}</p>
 <p>Airline: SkyLine ${i}</p>
 <p>Departure: ${date} | ${Math.floor(Math.random() * 12) + 1}:00 AM</p>
 <p>Price: ■${Math.floor(Math.random() * 4000) + 1500}</p>
 <button onclick='bookFlight(${i})'>Book Now</button>
 </div>`;
    }
    document.getElementById("results").innerHTML = flightList;
});

function bookFlight(flightNumber) {
    document.getElementById("results-section").classList.add("hidden");
    document.getElementById("payment-section").classList.remove("hidden");
}

// Validate payment inputs
document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const cardNumber = document.getElementById("cardNumber").value.trim();
    const expiry = document.getElementById("expiryDate").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    const cardPattern = /^[0-9]{13,19}$/;
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvPattern = /^[0-9]{3,4}$/;

    if (!cardPattern.test(cardNumber)) {
        alert("Invalid card number. It should be 13 to 19 digits.");
        return;
    }
    if (!expiryPattern.test(expiry)) {
        alert("Invalid expiry format. Use MM/YY.");
        return;
    }
    if (!cvvPattern.test(cvv)) {
        alert("Invalid CVV. It should be 3 or 4 digits.");
        return;
    }

    document.getElementById("payment-section").classList.add("hidden");
    document.getElementById("success-section").classList.remove("hidden");

    setTimeout(() => {
        location.reload();
    }, 6000);
});