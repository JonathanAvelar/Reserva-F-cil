document.getElementById("searchButton").addEventListener("click", function() {
    let origin = document.getElementById("origin").value;
    let destination = document.getElementById("destination").value;
    let date = document.getElementById("date").value;
  
    // Exemplo de resultados fictícios de voos
    const flights = [
      { airline: "Airline A", origin: origin, destination: destination, date: date, price: "R$ 500,00" },
      { airline: "Airline B", origin: origin, destination: destination, date: date, price: "R$ 450,00" },
      { airline: "Airline C", origin: origin, destination: destination, date: date, price: "R$ 550,00" }
    ];
  
    let resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "<h2>Voos Encontrados</h2>";
  
    flights.forEach(function(flight) {
      let flightDiv = document.createElement("div");
      flightDiv.classList.add("result-item");
      flightDiv.innerHTML = `
        <h3>${flight.airline}</h3>
        <p><strong>Origem:</strong> ${flight.origin} <strong>Destino:</strong> ${flight.destination}</p>
        <p><strong>Data:</strong> ${flight.date} <strong>Preço:</strong> ${flight.price}</p>
      `;
      resultsContainer.appendChild(flightDiv);
    });
  });
  