const url = "https://www.tcmb.gov.tr/kurlar/today.xml";

fetch(url)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const currencies = data.getElementsByTagName("Currency");
    const tbody = document.querySelector("#kurTablosu tbody");

    for (let i = 0; i < currencies.length; i++) {
      const name = currencies[i].getAttribute("CurrencyName");
      const code = currencies[i].getAttribute("Kod");
      const forexBuying = currencies[i].getElementsByTagName("ForexBuying")[0].textContent;
      const forexSelling = currencies[i].getElementsByTagName("ForexSelling")[0].textContent;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${code}</td>
        <td>${parseFloat(forexBuying).toFixed(2)}</td>
        <td>${parseFloat(forexSelling).toFixed(2)}</td>
      `;
      tbody.appendChild(row);
    }
  })
  .catch(error => {
    console.error("Veri alınamadı:", error);
  });
