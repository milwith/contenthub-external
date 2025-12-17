(function () {

  // Ensure Sitecore APIs exist
  if (!window.sitecore || !window.sitecore.events) {
    console.error("Sitecore event system not available");
    return;
  }

  // Create container for the component
  const container = document.createElement("div");
  container.id = "entity-api-container";
  container.style.padding = "12px";
  document.body.appendChild(container);

  // Get current entity id from page context
  function getEntityId() {
    return window.sitecore?.page?.entity?.id;
  }

  // Render function
  function render(entityId) {
    if (!entityId) return;

    container.innerHTML = `
      <strong>Entity API URL:</strong><br/>
      <a href="/api/entities/${entityId}" target="_blank">
        /api/entities/${entityId}
      </a>
    `;
  }

  // Initial render on page load
  const entityId = getEntityId();
  render(entityId);

  // Subscribe to entityCreated event
  window.sitecore.events.on("entityCreated", function (event) {
    console.log("Entity created:", event);
    if (event?.id) {
      render(event.id);
    }
  });

})();
