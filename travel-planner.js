
window.VANTA.CLOUDS({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00
});



class Travel {
    constructor(destination, startDate, finishDate, budget) {
        this.id = Date.now();
        this.destination = destination;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.budget = budget;
    }
}

class TravelNotepad {
    #travels = [];

    addTravel(trip) {
        this.#travels.push(trip);
    }

    getAllTravels() {
        return [...this.#travels];
    }

    getTravelByDestination(destination) {
        return this.#travels.filter(
            (t) => t.destination.toLowerCase() === destination.toLowerCase()
        );
    }

    removeTravel(id) {
        this.#travels = this.#travels.filter((t) => t.id !== id);
    }

    updateTravel(id, newData) {
        const index = this.#travels.findIndex((t) => t.id === id);
        if (index !== -1) {
            this.#travels[index] = { ...this.#travels[index], ...newData };
        }
    }
}

const form = document.getElementById("travelForm");
const wall = document.getElementById("wall");
const addBtn = document.getElementById("addBtn");

const travelPad = new TravelNotepad();

addBtn.addEventListener("click", () => {
    form.style.display = form.style.display === "none" ? "flex" : "none";
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const trip = new Travel(
        document.getElementById("to").value,
        document.getElementById("start").value,
        document.getElementById("finish").value,
        parseFloat(document.getElementById("budget").value)
    );

    travelPad.addTravel(trip);
    renderTrips();
    form.reset();
    form.style.display = "none";
});

function renderTrips() {
    wall.innerHTML = "";

    travelPad.getAllTravels().forEach((trip) => {
        const card = document.createElement("div");
        card.className = "trip-card";
        card.innerHTML = `
      <strong>✈️ ${trip.destination}</strong><br>
      From: ${trip.startDate}<br>
      To: ${trip.finishDate}<br>
      Budget: $${trip.budget}
    `;
        card.ondblclick = () => {
            travelPad.removeTravel(trip.id);
            renderTrips();
        };
        wall.appendChild(card);
    });
}


window.onload = function() {
    const banner = document.getElementById("popup-banner");
    banner.style.opacity = "1";
    setTimeout(() => {
        banner.style.opacity = "0";
    }, 4000);
};





