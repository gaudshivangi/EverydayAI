/**
 * Everyday AI - Research Page JavaScript
 * Charts + PDF Preview Toggle
 */

// Chart colors
const chartColors = {
    primary: 'rgba(79, 70, 229, 0.8)',
    secondary: 'rgba(6, 182, 212, 0.8)',
    accent: 'rgba(245, 158, 11, 0.8)',
    success: 'rgba(16, 185, 129, 0.8)',
    danger: 'rgba(239, 68, 68, 0.8)'
};

// Initialize charts
document.addEventListener('DOMContentLoaded', function() {
    initUsageChart();
    initUnderstandingChart();
    initEthicsChart();
    initImpactChart();
});


// Chart 1: AI Usage in Daily Life
function initUsageChart() {
    const ctx = document.getElementById('usageChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Navigation Apps', 'Social Media', 'Voice Assistants', 'Online Shopping', 'Streaming Platforms'],
            datasets: [{
                label: 'Daily Usage (%)',
                data: [82, 76, 64, 71, 69],
                backgroundColor: [
                    chartColors.primary,
                    chartColors.secondary,
                    chartColors.accent,
                    chartColors.success,
                    chartColors.danger
                ]
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}


// Chart 2: Understanding of AI Concepts
function initUnderstandingChart() {
    const ctx = document.getElementById('understandingChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Understands AI Basics', 'Heard of AI Only', 'No Understanding'],
            datasets: [{
                data: [34, 42, 24],
                backgroundColor: [
                    chartColors.success,
                    chartColors.warning,
                    chartColors.danger
                ]
            }]
        },
        options: {
            responsive: true
        }
    });
}


// Chart 3: Ethical Awareness
function initEthicsChart() {
    const ctx = document.getElementById('ethicsChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Aware of Privacy Risks', 'Aware of Bias', 'Not Aware'],
            datasets: [{
                data: [46, 39, 31],
                backgroundColor: [
                    chartColors.primary,
                    chartColors.accent,
                    chartColors.danger
                ]
            }]
        }
    });
}


// Chart 4: Impact of AI Literacy Program
function initImpactChart() {
    const ctx = document.getElementById('impactChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'AI Awareness',
                'Responsible Usage',
                'Privacy Understanding',
                'Critical Thinking',
                'Confidence in Technology'
            ],
            datasets: [{
                label: 'After AI Literacy Program',
                data: [85, 78, 72, 74, 80],
                borderColor: chartColors.success,
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}


/* =========================
   PDF Preview Toggle
========================= */

function togglePreview() {
    const preview = document.getElementById("pdfPreview");
    if (!preview) return;

    preview.style.display =
        preview.style.display === "none" ? "block" : "none";
}
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("pdfContainer");
    const downloadBtn = document.getElementById("downloadFull");

    if (!container) return;

    container.addEventListener("scroll", function () {

        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;

        // If user scrolls to bottom
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            downloadBtn.style.display = "block";
        }
    });
});
