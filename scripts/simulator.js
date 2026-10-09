/**
 * SafeSociety Interactive Gate & Journey Simulator
 * (Pure Visual & Mechanical Dynamics - All Audio Synthesizer Calls Removed)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. LIVE HARDWARE GATE SIMULATOR ---
  const plateInput = document.getElementById('simPlateInput');
  const scanBtn = document.getElementById('simScanBtn');
  const simResultBox = document.getElementById('simResultBox');
  const simBarrierArm = document.getElementById('simBarrierArm');
  const simBarrierStatus = document.getElementById('simBarrierStatus');
  const simLogFeed = document.getElementById('simLogFeed');
  const presetBtns = document.querySelectorAll('.plate-preset-btn');

  const KNOWN_VEHICLES = {
    'AZURE-7': {
      type: 'RESIDENT',
      name: 'Dr. Arjun Mehta',
      flat: 'Tower B - Flat 904',
      vehicle: 'Tesla Model S (Pearl White)',
      status: 'AUTHORIZED ACCESS',
      color: 'emerald',
      gate: 'Gate 01 (Resident Primary)',
    },
    'DL-08-EV-9021': {
      type: 'RESIDENT',
      name: 'Priya Sharma',
      flat: 'Tower A - Flat 402',
      vehicle: 'BMW iX (Carbon Black)',
      status: 'AUTHORIZED ACCESS',
      color: 'emerald',
      gate: 'Gate 01 (Resident Primary)',
    },
    'MH-02-AMZ-441': {
      type: 'DELIVERY',
      name: 'Amazon Logistics (Ramesh K.)',
      flat: 'Multi-Delivery Clearance (Tower A & C)',
      vehicle: 'Electric Cargo Van',
      status: 'SERVICE GATE PERMIT GRANTED (30m max)',
      color: 'cyan',
      gate: 'Gate 03 (Service / Courier Gate)',
    },
    'HR-26-FLAG-999': {
      type: 'BLACKLISTED',
      name: 'Security Alert: Flagged Plate',
      flat: 'BLOCKED BY RWA - Unregistered Intrusion History',
      vehicle: 'Sedan (Black)',
      status: 'ACCESS DENIED - SECURITY DISPATCHED',
      color: 'red',
      gate: 'All Gates Locked',
    },
  };

  function appendLog(text, type = 'info') {
    if (!simLogFeed) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const logItem = document.createElement('div');
    logItem.className = `sim-log-item log-${type}`;
    logItem.innerHTML = `<span class="log-time">[${timeStr}]</span> <span class="log-msg">${text}</span>`;
    simLogFeed.prepend(logItem);

    while (simLogFeed.children.length > 8) {
      simLogFeed.removeChild(simLogFeed.lastChild);
    }
  }

  function runGateScan(plateRaw) {
    const plate = plateRaw.trim().toUpperCase().replace(/\s+/g, '-');
    if (!plate) return;

    if (simResultBox) {
      simResultBox.classList.add('scanning');
      simResultBox.innerHTML = `
        <div class="scanning-indicator" style="padding: 16px; text-align: center;">
          <p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--orange-600); font-weight: 700;">
            Optical OCR Recognition in progress for plate <strong>${plate}</strong>...
          </p>
        </div>
      `;
    }

    if (scanBtn) {
      scanBtn.disabled = true;
      scanBtn.innerText = 'Scanning...';
    }

    setTimeout(() => {
      if (scanBtn) {
        scanBtn.disabled = false;
        scanBtn.innerText = 'Scan Plate';
      }

      let data = KNOWN_VEHICLES[plate];
      if (!data) {
        data = {
          type: 'GUEST_PENDING',
          name: 'Unregistered Visitor Vehicle',
          flat: 'Requires Resident Approval via Guard App',
          vehicle: `Detected Plate: ${plate}`,
          status: 'GUEST PASS PENDING RESIDENT PIN',
          color: 'amber',
          gate: 'Gate 02 (Visitor Gate)',
        };
      }

      renderScanResult(data, plate);
    }, 500);
  }

  function renderScanResult(data, plate) {
    if (!simResultBox) return;
    simResultBox.classList.remove('scanning');

    let badgeClass = 'badge-emerald';
    let actionState = 'Barrier Auto-Opening...';

    if (data.type === 'BLACKLISTED') {
      badgeClass = 'badge-red';
      actionState = 'BARRIER LOCKED • DISPATCHING SECURITY';
      if (simBarrierArm) simBarrierArm.classList.add('alarm-lock');
      if (simBarrierStatus) {
        simBarrierStatus.textContent = 'LOCKED (ALARM TRIGGERED)';
        simBarrierStatus.className = 'barrier-status-locked';
      }
    } else if (data.type === 'GUEST_PENDING') {
      badgeClass = 'badge-amber';
      actionState = 'Manual Guard Check / Resident Call';
      if (simBarrierArm) simBarrierArm.classList.remove('barrier-open', 'alarm-lock');
      if (simBarrierStatus) {
        simBarrierStatus.textContent = 'HOLD (PENDING 1-TAP APPROVAL)';
        simBarrierStatus.className = 'barrier-status-hold';
      }
    } else {
      if (simBarrierArm) {
        simBarrierArm.classList.remove('alarm-lock');
        simBarrierArm.classList.add('barrier-open');
      }
      if (simBarrierStatus) {
        simBarrierStatus.textContent = 'ARM LIFTED • PROCEED';
        simBarrierStatus.className = 'barrier-status-open';
      }

      setTimeout(() => {
        if (simBarrierArm) simBarrierArm.classList.remove('barrier-open');
        if (simBarrierStatus) {
          simBarrierStatus.textContent = 'BARRIER CLOSED • ARMED';
          simBarrierStatus.className = 'barrier-status-ready';
        }
      }, 4000);
    }

    simResultBox.innerHTML = `
      <div class="result-card result-${data.color}">
        <div class="result-header">
          <span class="sim-badge ${badgeClass}">${data.type}</span>
          <span class="sim-gate-tag">${data.gate}</span>
        </div>
        <div class="result-body">
          <div class="result-title">${data.name}</div>
          <div class="result-meta">
            <div><i data-lucide="home"></i> <strong>Location:</strong> ${data.flat}</div>
            <div><i data-lucide="car"></i> <strong>Vehicle:</strong> ${data.vehicle} (${plate})</div>
            <div><i data-lucide="shield-check"></i> <strong>Status:</strong> ${data.status}</div>
          </div>
        </div>
        <div class="result-action-bar">
          <span class="action-tag">${actionState}</span>
          <span class="timestamp">${new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    appendLog(`Plate ${plate} analyzed: ${data.status} [${data.type}]`, data.color);
  }

  if (scanBtn && plateInput) {
    scanBtn.addEventListener('click', () => {
      runGateScan(plateInput.value || 'AZURE-7');
    });

    plateInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        runGateScan(plateInput.value || 'AZURE-7');
      }
    });
  }

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const plate = this.getAttribute('data-plate');
      if (plateInput) plateInput.value = plate;
      runGateScan(plate);
    });
  });

  // --- 2. INTERACTIVE VISITOR JOURNEY FLOW (PRD Section 3) ---
  const journeySteps = document.querySelectorAll('.journey-step-btn');
  const journeyCards = document.querySelectorAll('.journey-flow-card');
  const btnApprove = document.getElementById('journeyBtnApprove');
  const btnDeny = document.getElementById('journeyBtnDeny');
  const journeyStatusMsg = document.getElementById('journeyDecisionStatus');

  journeySteps.forEach((btn) => {
    btn.addEventListener('click', function () {
      const stepIndex = this.getAttribute('data-step');
      journeySteps.forEach((s) => s.classList.remove('active'));
      journeyCards.forEach((c) => c.classList.remove('active'));

      this.classList.add('active');
      const targetCard = document.getElementById(`journeyCard${stepIndex}`);
      if (targetCard) targetCard.classList.add('active');
    });
  });

  if (btnApprove) {
    btnApprove.addEventListener('click', () => {
      if (journeyStatusMsg) {
        journeyStatusMsg.innerHTML = `
          <div class="decision-alert approved">
            <span class="icon">✓</span>
            <div>
              <strong>VISIT APPROVED BY FLAT 402</strong>
              <p>Temporary Digital Pass issued: #PASS-8842. Boom barrier unlocked for Tower A.</p>
            </div>
          </div>
        `;
      }
      setTimeout(() => {
        const step4Btn = document.querySelector('[data-step="4"]');
        if (step4Btn) step4Btn.click();
      }, 1000);
    });
  }

  if (btnDeny) {
    btnDeny.addEventListener('click', () => {
      if (journeyStatusMsg) {
        journeyStatusMsg.innerHTML = `
          <div class="decision-alert denied">
            <span class="icon">✕</span>
            <div>
              <strong>ENTRY DENIED BY RESIDENT</strong>
              <p>Guard alert triggered: Inform visitor politely that Flat 402 is unavailable.</p>
            </div>
          </div>
        `;
      }
    });
  }
});
