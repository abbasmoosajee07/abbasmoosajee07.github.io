// social-links.js
function renderSocialLinks(containerSelector, options = {}) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const {
        size = '1.5rem',
        color = 'var(--text-color)',
        hoverColor = 'var(--feature-color)',
        gap = '1.5rem',
        margin = '1.5rem 0'
    } = options;

    let html = `
        <div class="social-links"
            style="--icon-size: ${size};
                    --icon-color: ${color};
                    --icon-hover-color: ${hoverColor};
                    --icon-gap: ${gap};
                    --icon-margin: ${margin}">
    `;

    socialLinksOrder.forEach(platform => {
        const { url, icon, label } = socialProfiles[platform];
        html += `
        <a href="${url}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="${label}">
            <i class="bi ${icon}"></i>
        </a>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}