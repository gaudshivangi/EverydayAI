/**
 * Everyday AI — Survey Page JS
 * Author: Shivangi
 */

// ================================
// POLLS
// ================================

(function () {
    const pollData = {}; // { pollId: { option: count } }

    document.querySelectorAll('.poll-option').forEach(btn => {
        btn.addEventListener('click', function () {
            const pollId = this.dataset.poll;
            const option = this.dataset.option;
            const card   = document.getElementById('poll' + pollId);

            // Prevent double voting
            if (card.dataset.voted) {
                showNotification('You have already voted on this poll!', 'info');
                return;
            }
            card.dataset.voted = '1';

            // Record vote
            if (!pollData[pollId]) pollData[pollId] = {};
            pollData[pollId][option] = (pollData[pollId][option] || 0) + 1;

            // Style selected button
            card.querySelectorAll('.poll-option').forEach(b => {
                b.disabled = true;
                b.classList.remove('selected');
            });
            this.classList.add('selected');

            // Show results
            const resultsEl = card.querySelector('.poll-results');
            if (resultsEl) resultsEl.style.display = 'block';

            // Update bars
            const counts = pollData[pollId];
            const total  = Object.values(counts).reduce((a, b) => a + b, 0);

            card.querySelectorAll('.progress-fill').forEach(fill => {
                const key = fill.dataset.result;
                const pct = total ? Math.round(((counts[key] || 0) / total) * 100) : 0;
                setTimeout(() => { fill.style.width = pct + '%'; }, 100);

                const pctEl = card.querySelector(`.percentage[data-percent="${key}"]`);
                if (pctEl) pctEl.textContent = pct + '%';
            });

            // Update total
            const totalEl = card.querySelector(`[data-total="${pollId}"]`);
            if (totalEl) totalEl.textContent = total;

            showNotification('Thanks for voting! 🎉', 'success');
        });
    });
})();

// ================================
// NOTIFICATION TOAST
// ================================

function showNotification(message, type = 'success') {
    const existing = document.querySelector('.survey-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'survey-toast';

    const isSuccess = type === 'success';
    const isInfo    = type === 'info';

    toast.style.cssText = `
        position: fixed; top: 80px; right: 24px;
        padding: 0.85rem 1.3rem;
        background: ${isSuccess ? 'rgba(0,229,255,0.1)' : isInfo ? 'rgba(124,58,237,0.1)' : 'rgba(239,68,68,0.1)'};
        color: ${isSuccess ? '#00e5ff' : isInfo ? '#a78bfa' : '#f87171'};
        border: 1px solid ${isSuccess ? 'rgba(0,229,255,0.3)' : isInfo ? 'rgba(124,58,237,0.3)' : 'rgba(239,68,68,0.3)'};
        border-radius: 10px;
        backdrop-filter: blur(12px);
        font-size: 0.85rem; font-weight: 500;
        font-family: 'DM Sans', sans-serif;
        z-index: 9999;
        transform: translateX(120%);
        transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        display: flex; align-items: center; gap: 0.5rem;
        box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    `;

    const icon = isSuccess ? 'fa-circle-check' : isInfo ? 'fa-circle-info' : 'fa-circle-xmark';
    toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => { toast.style.transform = 'translateX(0)'; });
    });

    setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}
function filterGallery(category) {
    const sections = document.querySelectorAll('[id$="-section"]');
    if (category === 'all') {
        sections.forEach(section => {
            section.style.display = 'block';
            section.style.animation = 'fadeIn 0.5s ease-out';
        });
    } else {
        sections.forEach(section => {
            if (section.id === `${category}-section`) {
                section.style.display = 'block';
                section.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                section.style.display = 'none';
                section.style.animation = 'none';
            }
        });
    }
}