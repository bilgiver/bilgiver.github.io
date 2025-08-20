fetch("https://www.tcmb.gov.tr/kurlar/today.xml")
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const currencies = data.getElementsByTagName("Currency");
    for (let i = 0; i < currencies.length; i++) {
      const code = currencies[i].getAttribute("CurrencyCode");
      if (code === "USD") {
        const usd = currencies[i].getElementsByTagName("BanknoteSelling")[0].textContent;
        document.getElementById("usd").innerText = `USD Satış: ${usd} TL`;
      }
      if (code === "EUR") {
        const eur = currencies[i].getElementsByTagName("BanknoteSelling")[0].textContent;
        document.getElementById("eur").innerText = `EUR Satış: ${eur} TL`;
      }
    }
  })
  .catch(err => console.error("Veri alınamadı:", err));
