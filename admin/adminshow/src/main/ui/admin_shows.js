const apiUrl = "http://localhost:8085/admin/shows";

document.getElementById("showForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const movieName = document.getElementById("movieName").value;
  const theatreName = document.getElementById("theatreName").value;
  const showTime = document.getElementById("showTime").value;

  const newShow = { movieName, theatreName, showTime };

  fetch(`${apiUrl}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newShow),
  })
    .then((res) => res.json())
    .then(() => {
      document.getElementById("showForm").reset();
      fetchShows();
    })
    .catch((error) => console.error("Error adding show:", error));
});

function fetchShows() {
  fetch(`${apiUrl}/list`)
    .then((res) => res.json())
    .then((shows) => {
      const tbody = document.getElementById("showList");
      tbody.innerHTML = "";

      shows.forEach((show) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${show.id}</td>
          <td>${show.movieName}</td>
          <td>${show.theatreName}</td>
          <td>${show.showTime}</td>
          <td><button class="delete-btn" onclick="deleteShow(${show.id})">Delete</button></td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch((error) => console.error("Error fetching shows:", error));
}

function deleteShow(id) {
  fetch(`${apiUrl}/delete/${id}`, {
    method: "DELETE",
  })
    .then(() => fetchShows())
    .catch((error) => console.error("Error deleting show:", error));
}

window.onload = fetchShows;
