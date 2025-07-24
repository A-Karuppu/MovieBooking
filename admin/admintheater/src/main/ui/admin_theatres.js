document.getElementById("theatreForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const location = document.getElementById("location").value;
    const seats = document.getElementById("seats").value;

    const theatreData = {
        name,
        location,
        totalSeats: parseInt(seats)
    };

    try {
        const res = await fetch("http://localhost:8080/theatres/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(theatreData)
        });

        if (res.ok) {
            alert("Theatre added successfully!");
            document.getElementById("theatreForm").reset();
            document.getElementById("viewTheatresBtn").click(); // Refresh list
        } else {
            alert("Failed to add theatre.");
        }
    } catch (err) {
        console.error(err);
        alert("Error while adding theatre.");
    }
});

document.getElementById("viewTheatresBtn").addEventListener("click", async function () {
    try {
        const res = await fetch("http://localhost:8080/admin/theatres/list");
        const theatres = await res.json();

        const list = document.getElementById("theatreList");
        list.innerHTML = "";

        theatres.forEach(theatre => {
            const div = document.createElement("div");
            div.className = "theatre-card";
            div.innerHTML = `
                <div class="theatre-info">
                    <h3>${theatre.name}</h3>
                    <p>Location: ${theatre.location}</p>
                    <p>Total Seats: ${theatre.totalSeats ?? theatre.seats}</p>
                    <button class="delete-btn" data-id="${theatre.id}">Delete</button>
                </div>
            `;
            list.appendChild(div);
        });

        // Add delete event listeners
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", async function () {
                const theatreId = this.getAttribute("data-id");
                const confirmDelete = confirm("Are you sure you want to delete this theatre?");
                if (confirmDelete) {
                    try {
                        const deleteRes = await fetch(`http://localhost:8080/admin/theatres/delete/${theatreId}`, {
                            method: "DELETE"
                        });
                        if (deleteRes.ok) {
                            alert("Theatre deleted successfully!");
                            document.getElementById("viewTheatresBtn").click();
                        } else {
                            alert("Failed to delete theatre.");
                        }
                    } catch (err) {
                        console.error(err);
                        alert("Error while deleting theatre.");
                    }
                }
            });
        });

    } catch (err) {
        console.error(err);
        alert("Error while fetching theatres.");
    }
});
