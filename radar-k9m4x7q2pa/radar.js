const paymentsApi = "/api/radar-get-payments.php";
const markPaymentApi = "/api/radar-mark-payment.php";

const todayTitle = document.getElementById("todayTitle");
const refreshTime = document.getElementById("refreshTime");
const attentionList = document.getElementById("attentionList");
const paymentMonth = document.getElementById("paymentMonth");
const paymentsList = document.getElementById("paymentsList");
const reloadPaymentsBtn = document.getElementById("reloadPaymentsBtn");

function setHeaderDate() {
  const now = new Date();

  todayTitle.textContent = now.toLocaleDateString("en-AE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  refreshTime.textContent = `Last refreshed: ${now.toLocaleTimeString("en-AE", {
    hour: "2-digit",
    minute: "2-digit"
  })}`;
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

function renderAttention(payments) {
  const pending = payments.filter((payment) => Number(payment.is_completed) !== 1);

  if (pending.length === 0) {
    attentionList.innerHTML = `<div class="green-note">All payment triggers are green ✅</div>`;
    return;
  }

  attentionList.innerHTML = pending
    .map(
      (payment) => `
        <div class="attention-item">
          <span>🔴 ${escapeHtml(payment.payment_name)}</span>
          <small>${getDueLabel(payment.due_day)}</small>
        </div>
      `
    )
    .join("");
}

function renderPayments(payments) {
  paymentsList.innerHTML = payments
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
                : `<button class="mark-btn" data-payment-key="${escapeHtml(
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

async function loadPayments() {
  paymentsList.textContent = "Loading payments...";
  attentionList.textContent = "Loading...";

  try {
    const response = await fetch(paymentsApi);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to load payments");
    }

    paymentMonth.textContent = `Month: ${data.currentMonth}`;
    renderAttention(data.payments || []);
    renderPayments(data.payments || []);
  } catch (error) {
    attentionList.innerHTML = `<div class="error-note">Could not load attention items.</div>`;
    paymentsList.innerHTML = `<div class="error-note">${escapeHtml(error.message)}</div>`;
  }
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

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

reloadPaymentsBtn.addEventListener("click", loadPayments);

setHeaderDate();
loadPayments();