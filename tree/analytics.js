(() => {
  const measurementId = window.DBRESCIA_ANALYTICS?.measurementId?.trim();
  if (!/^G-[A-Z0-9]+$/i.test(measurementId)) return;

  const consentKey = "dbrescia_tree_analytics_consent";
  const banner = document.createElement("section");
  banner.className = "analytics-consent";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", "Preferências de analytics");
  banner.innerHTML = `
    <p>Usamos analytics para entender quais unidades e canais recebem mais interesse. Não medimos conversas no WhatsApp nem pedidos concluídos.</p>
    <div><button type="button" data-analytics-decline>Agora não</button><button type="button" data-analytics-accept>Permitir analytics</button></div>
  `;

  function loadAnalytics() {
    if (window.dbresciaAnalyticsLoaded) return;
    window.dbresciaAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { anonymize_ip: true });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.append(script);
  }

  function track(name, parameters = {}) {
    if (localStorage.getItem(consentKey) !== "granted" || !window.gtag) return;
    window.gtag("event", name, { ...parameters, transport_type: "beacon" });
  }

  function setConsent(value) {
    localStorage.setItem(consentKey, value);
    banner.remove();
    if (value === "granted") loadAnalytics();
  }

  function unitFor(element) {
    return element.closest(".unit-card")?.querySelector("h3")?.textContent.trim() || "não informado";
  }

  function trackingData(element) {
    if (element.matches("[data-reservation]")) return { action_type: "informacoes_reservas", unit: unitFor(element), destination: "whatsapp" };
    if (element.matches("[data-event-link]")) return { action_type: "eventos", unit: unitFor(element), destination: "whatsapp" };
    if (element.matches("[data-delivery-link]")) return { action_type: "delivery", unit: unitFor(element), destination: element.getAttribute("aria-label")?.replace("Pedir no ", "") || "delivery" };
    if (element.matches("[data-show-events]")) return { action_type: "abrir_eventos", placement: "hero" };
    if (element.matches("[data-show-delivery]")) return { action_type: "abrir_delivery", placement: "hero" };
    if (element.matches("[data-mode]")) return { action_type: "trocar_aba", tab: element.dataset.mode };
    return null;
  }

  document.addEventListener("click", (event) => {
    const control = event.target.closest("a, button");
    if (!control) return;
    const data = trackingData(control);
    if (data) track("tree_interaction", data);
  });

  const consent = localStorage.getItem(consentKey);
  if (consent === "granted") loadAnalytics();
  if (consent === null) {
    document.body.append(banner);
    banner.querySelector("[data-analytics-accept]").addEventListener("click", () => setConsent("granted"));
    banner.querySelector("[data-analytics-decline]").addEventListener("click", () => setConsent("denied"));
  }
})();
