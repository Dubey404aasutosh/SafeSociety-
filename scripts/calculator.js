/**
 * SafeSociety Society ROI & Stakeholder Impact Calculator
 * Dynamically computes operational time savings, visitor wait reductions, and cost efficiency
 * (Audio Synthesizer calls removed)
 */

document.addEventListener('DOMContentLoaded', () => {
  const flatsSlider = document.getElementById('calcFlats');
  const gatesSlider = document.getElementById('calcGates');

  const flatsValDisplay = document.getElementById('calcFlatsVal');
  const gatesValDisplay = document.getElementById('calcGatesVal');

  const metricHoursSaved = document.getElementById('metricHoursSaved');
  const metricWaitCut = document.getElementById('metricWaitCut');
  const metricAnnualSavings = document.getElementById('metricAnnualSavings');
  const metricIncidentsPrevented = document.getElementById('metricIncidentsPrevented');

  const stakeholderTabs = document.querySelectorAll('.stakeholder-tab-btn');
  const stakeholderPanels = document.querySelectorAll('.stakeholder-panel');

  function updateCalculator() {
    if (!flatsSlider || !gatesSlider) return;
    const flats = parseInt(flatsSlider.value, 10);
    const gates = parseInt(gatesSlider.value, 10);

    if (flatsValDisplay) flatsValDisplay.textContent = flats.toLocaleString();
    if (gatesValDisplay) gatesValDisplay.textContent = gates;

    const dailyEvents = Math.round(flats * 2.2);
    const monthlyEvents = dailyEvents * 30;
    const minutesSavedMonthly = monthlyEvents * 1.35;
    const hoursSavedMonthly = Math.round(minutesSavedMonthly / 60);

    const annualSavingsINR = Math.round(flats * 2150 + gates * 85000);
    const annualSavingsUSD = Math.round(annualSavingsINR / 83);
    const anomaliesPrevented = Math.round(flats * 0.42 * gates);

    if (metricHoursSaved) metricHoursSaved.textContent = `${hoursSavedMonthly.toLocaleString()} hrs/mo`;
    if (metricWaitCut) metricWaitCut.textContent = '95.4%';
    if (metricAnnualSavings) metricAnnualSavings.textContent = `$${annualSavingsUSD.toLocaleString()} / ₹${(annualSavingsINR / 100000).toFixed(1)}L`;
    if (metricIncidentsPrevented) metricIncidentsPrevented.textContent = `${anomaliesPrevented.toLocaleString()} alerts/yr`;
  }

  if (flatsSlider) {
    flatsSlider.addEventListener('input', () => {
      updateCalculator();
    });
  }

  if (gatesSlider) {
    gatesSlider.addEventListener('input', () => {
      updateCalculator();
    });
  }

  stakeholderTabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      const targetRole = this.getAttribute('data-role');
      stakeholderTabs.forEach((t) => t.classList.remove('active'));
      stakeholderPanels.forEach((p) => p.classList.remove('active'));

      this.classList.add('active');
      const targetEl = document.getElementById(`stakeholder-${targetRole}`);
      if (targetEl) targetEl.classList.add('active');
    });
  });

  updateCalculator();
});
