// Circle Cards - Flip & Info Panel Interaction
document.addEventListener('DOMContentLoaded', function() {
    const flipCards = document.querySelectorAll('.flip-card');
    const infoPanel = document.getElementById('infoPanel');

    flipCards.forEach(card => {
        // Hover to update info panel and show flip
        card.addEventListener('mouseenter', function() {
            updateInfoPanel(this);
        });
    });

    function updateInfoPanel(card) {
        const title = card.dataset.title;
        const desc = card.dataset.desc;
        const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
        const icon = card.dataset.icon;

        if (title) {
            document.getElementById('infoTitle').textContent = title;
            document.getElementById('infoDesc').textContent = desc;
            document.getElementById('infoIcon').textContent = icon;
            
            const tagsEl = document.getElementById('infoTags');
            tagsEl.innerHTML = tags
                .map(tag => `<span class="info-tag">${tag.trim()}</span>`)
                .join('');

            // Animate panel
            infoPanel.classList.remove('visible');
            void infoPanel.offsetWidth;
            infoPanel.classList.add('visible');
        }
    }
});

// Flip Cards - Flip & Info Panel Interaction
document.addEventListener('DOMContentLoaded', function() {
    const flipCards = document.querySelectorAll('.flip-card');
    const infoPanel = document.getElementById('infoPanel');

    if (!infoPanel) {
        console.error('Info panel not found');
        return;
    }

    // Set first card as default
    if (flipCards.length > 0) {
        showInfoPanel(flipCards[0]);
    }

    flipCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            showInfoPanel(this);
        });
    });

    function showInfoPanel(card) {
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');
        const icon = card.getAttribute('data-icon');
        const tags = card.getAttribute('data-tags');

        if (!title) return;

        // Update content
        document.getElementById('infoIcon').textContent = icon;
        document.getElementById('infoTitle').textContent = title;
        document.getElementById('infoDesc').textContent = desc;

        // Update tags
        const tagsEl = document.getElementById('infoTags');
        if (tags) {
            tagsEl.innerHTML = tags
                .split(',')
                .map(tag => `<span class="info-tag">${tag.trim()}</span>`)
                .join('');
        }

        // Fade animation
        infoPanel.classList.remove('visible');
        setTimeout(() => {
            infoPanel.classList.add('visible');
        }, 10);
    }
});