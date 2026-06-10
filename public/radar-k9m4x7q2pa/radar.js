const paymentsApi = "/api/radar-get-payments.php";
const markPaymentApi = "/api/radar-mark-payment.php";
const marketApi = "/api/radar-market-data.php";
const fuelApi = "/api/radar-fuel-prices.php";

/*
  Sharjah coordinates.
  Open-Meteo is a model/forecast estimate, not your exact live window weather.
*/
const WEATHER_LAT = 25.3463;
const WEATHER_LON = 55.4209;

const els = {
  todayTitle: document.getElementById("todayTitle"),
  refreshTime: document.getElementById("refreshTime"),
  heroPendingCount: document.getElementById("heroPendingCount"),
  attentionList: document.getElementById("attentionList"),

  weatherStatus: document.getElementById("weatherStatus"),
  currentTemp: document.getElementById("currentTemp"),
  currentWeather: document.getElementById("currentWeather"),
  feelsLike: document.getElementById("feelsLike"),
  humidity: document.getElementById("humidity"),
  windSpeed: document.getElementById("windSpeed"),
  forecastList: document.getElementById("forecastList"),

  marketStatus: document.getElementById("marketStatus"),
  marketList: document.getElementById("marketList"),

  currencyStatus: document.getElementById("currencyStatus"),
  currencyList: document.getElementById("currencyList"),

  petrolList: document.getElementById("petrolList"),

  uaeMetalsStatus: document.getElementById("uaeMetalsStatus"),
  indiaMetalsStatus: document.getElementById("indiaMetalsStatus"),
  uaeMetalsList: document.getElementById("uaeMetalsList"),
  indiaMetalsList: document.getElementById("indiaMetalsList"),

  paymentMonth: document.getElementById("paymentMonth"),
  paymentsList: document.getElementById("paymentsList"),
  reloadPaymentsBtn: document.getElementById("reloadPaymentsBtn")
};

let latestMarketQuotes = null;
let latestCurrencyRates = null;

function init() {
  setHeaderDate();

  Promise.allSettled([
    loadPayments(),
    loadWeather(),
    loadCurrency(),
    loadMarketData(),
    loadFuelPrices()
  ]).then(() => {
    renderMetalsIfReady();
  });
}

function setHeaderDate() {
  const now = new Date();

  els.todayTitle.textContent = now.toLocaleDateString("en-AE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  els.refreshTime.textContent = `Last refreshed: ${now.toLocaleTimeString("en-AE", {
    hour: "2-digit",
    minute: "2-digit"
  })}`;
}

/* -----------------------------
   Weather
----------------------------- */

async function loadWeather() {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${WEATHER_LAT}&longitude=${WEATHER_LON}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
      `&timezone=Asia%2FDubai&forecast_days=4`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || !data.current || !data.daily) {
      throw new Error("Weather failed");
    }

    const current = data.current;

    els.currentTemp.textContent = `${round(current.temperature_2m)}°C`;
    els.currentWeather.textContent = weatherCodeToText(current.weather_code);
    els.feelsLike.textContent = `${round(current.apparent_temperature)}°C`;
    els.humidity.textContent = `${round(current.relative_humidity_2m)}%`;
    els.windSpeed.textContent = `${round(current.wind_speed_10m)} km/h`;

    els.forecastList.innerHTML = data.daily.time
      .slice(0, 4)
      .map((date, index) => {
        const day = new Date(date).toLocaleDateString("en-AE", {
          weekday: "short"
        });

        const max = round(data.daily.temperature_2m_max[index]);
        const min = round(data.daily.temperature_2m_min[index]);

        return `
          <div class="mini-row">
            <span>${day}</span>
            <strong>${max}° / ${min}°</strong>
          </div>
        `;
      })
      .join("");

    els.weatherStatus.textContent = "Estimate";
    els.weatherStatus.classList.remove("bad");
    els.weatherStatus.classList.add("warn");
  } catch {
    els.weatherStatus.textContent = "Failed";
    els.weatherStatus.classList.add("bad");

    els.currentTemp.textContent = "--°C";
    els.currentWeather.textContent = "Unavailable";
    els.feelsLike.textContent = "--°C";
    els.humidity.textContent = "--%";
    els.windSpeed.textContent = "-- km/h";
    els.forecastList.innerHTML = "";
  }
}

/* -----------------------------
   Currency
----------------------------- */

async function loadCurrency() {
  try {
    const response = await fetch(
      "https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR,AED,EUR"
    );

    const data = await response.json();

    if (!response.ok || !data.rates) {
      throw new Error("Currency failed");
    }

    const usdInr = Number(data.rates.INR);
    const usdAed = Number(data.rates.AED || 3.6725);
    const usdEur = Number(data.rates.EUR);

    const rates = {
      "AED-INR": usdInr / usdAed,
      "USD-INR": usdInr,
      "AED-EUR": usdEur / usdAed,
      "EUR-INR": usdInr / usdEur,
      "USD-AED": usdAed
    };

    latestCurrencyRates = rates;

    els.currencyList.innerHTML = Object.entries(rates)
      .map(([name, value]) => quoteRow(name, formatNumber(value, 4), ""))
      .join("");

    els.currencyStatus.textContent = "Live";
    els.currencyStatus.classList.remove("bad");
    els.currencyStatus.classList.add("live");
  } catch {
    els.currencyStatus.textContent = "Failed";
    els.currencyStatus.classList.add("bad");

    els.currencyList.innerHTML = `
      <div class="notice red">
        Currency watch failed to load.
      </div>
    `;
  }
}

/* -----------------------------
   Market Watch
----------------------------- */

async function loadMarketData() {
  try {
    const response = await fetch(marketApi);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Market failed");
    }

    latestMarketQuotes = data.quotes || [];

    const displaySymbols = ["GLD", "SLV", "VOO", "QQQ", "BND"];

    els.marketList.innerHTML = latestMarketQuotes
      .filter((item) => displaySymbols.includes(item.symbol))
      .map((item) => {
        if (!item || item.price === null || item.price === undefined) {
          return quoteRow(item?.name || item?.symbol || "Asset", "--", "No data");
        }

        return quoteRow(
          item.name || item.symbol,
          `$${formatNumber(item.price, 2)}`,
          formatChange(item.changePercent)
        );
      })
      .join("");

    if (!els.marketList.innerHTML.trim()) {
      els.marketList.innerHTML = `
        <div class="notice red">
          No market data returned.
        </div>
      `;
    }

    els.marketStatus.textContent = "Live";
    els.marketStatus.classList.remove("bad");
    els.marketStatus.classList.add("live");
  } catch {
    els.marketStatus.textContent = "Failed";
    els.marketStatus.classList.add("bad");

    els.marketList.innerHTML = `
      <div class="notice red">
        Market watch failed to load.
      </div>
    `;
  }
}

/* -----------------------------
   Fuel Prices
----------------------------- */

async function loadFuelPrices() {
  try {
    const response = await fetch(fuelApi);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Fuel failed");
    }

    const fuelData = data.data;
    const mappedPrices = normalizeFuelPrices(fuelData);

    if (mappedPrices.length === 0) {
      els.petrolList.innerHTML = `
        <div class="notice red">
          Fuel API loaded, but response format needs mapping.
        </div>
      `;
      return;
    }

    els.petrolList.innerHTML = mappedPrices
      .map((item) => quoteRow(item.name, item.price, item.meta || ""))
      .join("");
  } catch {
    els.petrolList.innerHTML = `
      <div class="notice red">
        Fuel prices failed to load.
      </div>
    `;
  }
}

function normalizeFuelPrices(input) {
  if (!input) return [];

  /*
    Supports multiple possible provider response shapes.
    If this does not map cleanly after deploy, open:
    /api/radar-fuel-prices.php
    and send the JSON response.
  */

  const candidate =
    input.prices ||
    input.data ||
    input.fuelPrices ||
    input.fuel_prices ||
    input.result ||
    input;

  if (Array.isArray(candidate)) {
    return candidate
      .map((item) => ({
        name:
          item.name ||
          item.type ||
          item.fuel_type ||
          item.fuelType ||
          item.product ||
          item.title ||
          "Fuel",
        price: formatFuelPrice(
          item.price ||
          item.value ||
          item.rate ||
          item.amount ||
          item.current
        ),
        meta:
          item.month ||
          item.period ||
          item.date ||
          input.month ||
          input.period ||
          ""
      }))
      .filter((item) => item.price !== "--");
  }

  if (typeof candidate !== "object") return [];

  const rows = [];

  const possibleKeys = [
    ["eplus91", "E-Plus 91"],
    ["e_plus_91", "E-Plus 91"],
    ["ePlus91", "E-Plus 91"],
    ["eplus_91", "E-Plus 91"],
    ["EPlus91", "E-Plus 91"],
    ["e-plus-91", "E-Plus 91"],

    ["special95", "Special 95"],
    ["special_95", "Special 95"],
    ["special95Price", "Special 95"],
    ["Special95", "Special 95"],
    ["special-95", "Special 95"],

    ["super98", "Super 98"],
    ["super_98", "Super 98"],
    ["super98Price", "Super 98"],
    ["Super98", "Super 98"],
    ["super-98", "Super 98"],

    ["diesel", "Diesel"],
    ["dieselPrice", "Diesel"],
    ["Diesel", "Diesel"]
  ];

  possibleKeys.forEach(([key, label]) => {
    if (candidate[key] !== undefined && candidate[key] !== null) {
      rows.push({
        name: label,
        price: formatFuelPrice(candidate[key]),
        meta: candidate.month || candidate.period || input.month || input.period || ""
      });
    }
  });

  /*
    Some APIs return nested objects like:
    {
      "Super 98": { price: 2.58 },
      "Special 95": { price: 2.47 }
    }
  */
  Object.entries(candidate).forEach(([key, value]) => {
    const normalizedKey = key.toLowerCase();

    const alreadyAdded = rows.some((row) =>
      normalizedKey.includes(row.name.toLowerCase().replace(" ", ""))
    );

    if (alreadyAdded) return;

    let label = null;

    if (normalizedKey.includes("e") && normalizedKey.includes("91")) {
      label = "E-Plus 91";
    } else if (normalizedKey.includes("special") && normalizedKey.includes("95")) {
      label = "Special 95";
    } else if (normalizedKey.includes("super") && normalizedKey.includes("98")) {
      label = "Super 98";
    } else if (normalizedKey.includes("diesel")) {
      label = "Diesel";
    }

    if (label) {
      rows.push({
        name: label,
        price: formatFuelPrice(value),
        meta: candidate.month || candidate.period || input.month || input.period || ""
      });
    }
  });

  return rows;
}

function formatFuelPrice(value) {
  if (value === null || value === undefined || value === "") return "--";

  if (typeof value === "object") {
    const nestedValue =
      value.price ||
      value.value ||
      value.rate ||
      value.amount ||
      value.current ||
      value.aed;

    return formatFuelPrice(nestedValue);
  }

  const number = Number(String(value).replace(/[^\d.]/g, ""));

  if (Number.isNaN(number)) {
    return String(value);
  }

  return `AED ${number.toFixed(2)} / L`;
}

/* -----------------------------
   Metals
----------------------------- */

function renderMetalsIfReady() {
  if (!latestMarketQuotes || !latestCurrencyRates) {
    els.uaeMetalsStatus.textContent = "Waiting";
    els.indiaMetalsStatus.textContent = "Waiting";
    return;
  }

  const gold =
    latestMarketQuotes.find((item) => item.symbol === "GC=F")?.price ||
    latestMarketQuotes.find((item) => item.name === "Gold Futures")?.price;

  const silver =
    latestMarketQuotes.find((item) => item.symbol === "SI=F")?.price ||
    latestMarketQuotes.find((item) => item.name === "Silver Futures")?.price;

  if (!gold || !silver) {
    els.uaeMetalsStatus.textContent = "No spot";
    els.indiaMetalsStatus.textContent = "No spot";
    els.uaeMetalsStatus.classList.add("bad");
    els.indiaMetalsStatus.classList.add("bad");

    els.uaeMetalsList.innerHTML = `
      <div class="notice red">
        Metals estimate failed. Gold/silver futures not available.
      </div>
    `;

    els.indiaMetalsList.innerHTML = `
      <div class="notice red">
        Metals estimate failed. Gold/silver futures not available.
      </div>
    `;

    return;
  }

  const usdAed = latestCurrencyRates["USD-AED"] || 3.6725;
  const usdInr = latestCurrencyRates["USD-INR"];

  /*
    Gold futures GC=F is USD per troy ounce.
    Silver futures SI=F is also treated here as USD per troy ounce.
    This is an estimate, not a retail jewellery-board price.
  */
  const goldUsdGram24 = gold / 31.1034768;
  const silverUsdGram = silver / 31.1034768;

  const uaeGold24 = goldUsdGram24 * usdAed;
  const indiaGold24Per10g = goldUsdGram24 * usdInr * 10;

  els.uaeMetalsList.innerHTML = [
    metalTile("24K Gold", `AED ${formatNumber(uaeGold24, 2)} / g`),
    metalTile("22K Gold", `AED ${formatNumber((uaeGold24 * 22) / 24, 2)} / g`),
    metalTile("21K Gold", `AED ${formatNumber((uaeGold24 * 21) / 24, 2)} / g`),
    metalTile("18K Gold", `AED ${formatNumber((uaeGold24 * 18) / 24, 2)} / g`),
    metalTile("Silver", `AED ${formatNumber(silverUsdGram * usdAed, 2)} / g`),
    metalTile("Silver", `AED ${formatNumber(silverUsdGram * usdAed * 1000, 0)} / kg`)
  ].join("");

  els.indiaMetalsList.innerHTML = [
    metalTile("24K Gold", `INR ${formatNumber(indiaGold24Per10g, 0)} / 10g`),
    metalTile("22K Gold", `INR ${formatNumber((indiaGold24Per10g * 22) / 24, 0)} / 10g`),
    metalTile("18K Gold", `INR ${formatNumber((indiaGold24Per10g * 18) / 24, 0)} / 10g`),
    metalTile("Silver", `INR ${formatNumber(silverUsdGram * usdInr, 2)} / g`),
    metalTile("Silver", `INR ${formatNumber(silverUsdGram * usdInr * 1000, 0)} / kg`)
  ].join("");

  els.uaeMetalsStatus.textContent = "Estimate";
  els.indiaMetalsStatus.textContent = "Estimate";
  els.uaeMetalsStatus.classList.remove("bad");
  els.indiaMetalsStatus.classList.remove("bad");
  els.uaeMetalsStatus.classList.add("warn");
  els.indiaMetalsStatus.classList.add("warn");
}

/* -----------------------------
   Payments
----------------------------- */

async function loadPayments() {
  els.paymentsList.textContent = "Loading payments...";
  els.attentionList.textContent = "Loading attention items...";

  try {
    const response = await fetch(paymentsApi);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to load payments");
    }

    els.paymentMonth.textContent = `Month: ${data.currentMonth}`;

    renderAttention(data.payments || []);
    renderPayments(data.payments || []);
  } catch (error) {
    els.heroPendingCount.textContent = "-- red";
    els.attentionList.innerHTML = `
      <div class="notice red">
        Could not load payment triggers.
      </div>
    `;

    els.paymentsList.innerHTML = `
      <div class="notice red">
        ${escapeHtml(error.message)}
      </div>
    `;
  }
}

function renderAttention(payments) {
  const pending = payments.filter((payment) => Number(payment.is_completed) !== 1);

  els.heroPendingCount.textContent = `${pending.length} red`;

  if (pending.length === 0) {
    els.attentionList.innerHTML = `
      <div class="notice green">
        All payment triggers are green ✅
      </div>
    `;
    return;
  }

  els.attentionList.innerHTML = pending
    .map(
      (payment) => `
        <div class="attention-item">
          <strong>🔴 ${escapeHtml(payment.payment_name)}</strong>
          <span>${getDueLabel(payment.due_day)}</span>
        </div>
      `
    )
    .join("");
}

function renderPayments(payments) {
  els.paymentsList.innerHTML = payments
    .map((payment) => {
      const isCompleted = Number(payment.is_completed) === 1;

      return `
        <div class="payment-row ${isCompleted ? "green" : "red"}">
          <div>
            <strong>${escapeHtml(payment.payment_name)}</strong>
            <span>${getDueLabel(payment.due_day)}</span>
          </div>

          <div class="payment-actions">
            <span class="status-pill ${isCompleted ? "green" : "red"}">
              ${isCompleted ? "GREEN ✅" : "RED 🔴"}
            </span>

            ${
              isCompleted
                ? ""
                : `<button class="primary-btn mark-btn" data-payment-key="${escapeHtml(
                    payment.payment_key
                  )}">Mark Complete</button>`
            }
          </div>
        </div>
      `;
    })
    .join("");

  document.querySelectorAll(".mark-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const paymentKey = button.getAttribute("data-payment-key");
      await markPaymentComplete(paymentKey, button);
    });
  });
}

async function markPaymentComplete(paymentKey, button) {
  try {
    button.disabled = true;
    button.textContent = "Saving...";

    const response = await fetch(markPaymentApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ paymentKey })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to mark complete");
    }

    await loadPayments();
  } catch (error) {
    alert(error.message || "Failed to mark complete");
    button.disabled = false;
    button.textContent = "Mark Complete";
  }
}

/* -----------------------------
   Helpers
----------------------------- */

function quoteRow(name, value, meta) {
  return `
    <div class="quote-row">
      <span>${escapeHtml(name)}</span>
      <strong>${escapeHtml(value)}</strong>
      ${meta ? `<small>${escapeHtml(meta)}</small>` : ""}
    </div>
  `;
}

function metalTile(name, value) {
  return `
    <div class="metal-tile">
      <span>${escapeHtml(name)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;
}

function getDueLabel(dueDay) {
  return `Due ${dueDay}${getDaySuffix(Number(dueDay))}`;
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) return "th";

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function weatherCodeToText(code) {
  const map = {
    0: "Clear",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Cloudy",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Heavy drizzle",
    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",
    71: "Snow",
    80: "Light showers",
    81: "Showers",
    82: "Heavy showers",
    95: "Thunderstorm",
    96: "Thunderstorm",
    99: "Thunderstorm"
  };

  return map[code] || "Weather";
}

function formatChange(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "";
  }

  const number = Number(value);
  const sign = number >= 0 ? "+" : "";

  return `${sign}${formatNumber(number, 2)}%`;
}

function formatNumber(value, decimals = 2) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "--";
  }

  return Number(value).toLocaleString("en-AE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function round(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "--";
  }

  return Math.round(Number(value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

els.reloadPaymentsBtn.addEventListener("click", loadPayments);

init();