(() => {
  const measurementId = window.DBRESCIA_SITE_ANALYTICS?.measurementId?.trim();
  if (!/^G-[A-Z0-9]+$/i.test(measurementId)) return;

  const consentKey = "dbrescia_site_analytics_consent";
  const style = document.createElement("style");
  style.textContent = ".analytics-consent{position:fixed;right:20px;bottom:20px;z-index:1000;width:min(430px,calc(100% - 40px));padding:18px 18px 16px;border:1px solid rgba(201,154,69,.65);background:#17100b;color:#fff;box-shadow:0 18px 46px rgba(0,0,0,.32);font-family:Arial,sans-serif}.analytics-consent p{margin:0;color:#f7efe5;font-size:13px;line-height:1.5}.analytics-consent div{display:flex;gap:10px;flex-wrap:wrap;margin-top:15px}.analytics-consent button{min-height:40px;padding:0 14px;border:1px solid rgba(255,255,255,.45);background:transparent;color:#fff;font:700 12px Arial,sans-serif;cursor:pointer}.analytics-consent button[data-analytics-accept]{border-color:#c99a45;background:#c99a45;color:#17100b}@media(max-width:760px){.analytics-consent{right:16px;bottom:16px;width:calc(100% - 32px)}.analytics-consent div{display:grid;grid-template-columns:1fr 1fr}.analytics-consent button{padding:0 8px}}";
  document.head.append(style);

  const banner = document.createElement("section");
  banner.className = "analytics-consent";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", "Preferências de analytics");
  banner.innerHTML = '<p>Usamos analytics para entender como o site é utilizado. Não medimos mensagens no WhatsApp nem pedidos concluídos.</p><div><button type="button" data-analytics-decline>Agora não</button><button type="button" data-analytics-accept>Permitir analytics</button></div>';

  function loadAnalytics() {
    if (window.dbresciaSiteAnalyticsLoaded) return;
    window.dbresciaSiteAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { anonymize_ip: true });
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    document.head.append(script);
  }

  function track(name, parameters) {
    if (localStorage.getItem(consentKey) !== "granted" || !window.gtag) return;
    window.gtag("event", name, { ...parameters, transport_type: "beacon" });
  }

  function setConsent(value) {
    localStorage.setItem(consentKey, value);
    banner.remove();
    if (value === "granted") loadAnalytics();
  }

  function labelFor(element) {
    return (element.getAttribute("aria-label") || element.textContent || "não informado")
      .replace(/\s+/g, " ").trim().slice(0, 100);
  }

  function destinationFor(element) {
    const href = element.getAttribute("href");
    if (!href || href.startsWith("#")) return "navegacao_interna";
    try {
      const url = new URL(href, window.location.href);
      return url.hostname || "navegacao_interna";
    } catch {
      return "não informado";
    }
  }

  document.addEventListener("click", (event) => {
    const control = event.target.closest("a, button");
    if (!control || control.closest(".analytics-consent")) return;
    track("site_interaction", {
      action_type: control.tagName === "A" ? "link" : "botao",
      link_label: labelFor(control),
      destination: destinationFor(control),
      page_path: window.location.pathname,
    });
  });

  const consent = localStorage.getItem(consentKey);
  if (consent === "granted") loadAnalytics();
  if (consent === null) {
    document.body.append(banner);
    banner.querySelector("[data-analytics-accept]").addEventListener("click", () => setConsent("granted"));
    banner.querySelector("[data-analytics-decline]").addEventListener("click", () => setConsent("denied"));
  }
})();
