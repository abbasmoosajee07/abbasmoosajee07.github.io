// Language colors mapping
export const languageColors = {
  'Python': '#3572A5',
  'JavaScript': '#f1e05a',
  'TypeScript': '#2b7489',
  'Java': '#b07219',
  'HTML': '#e34c26',
  'CSS': '#563d7c',
  'PHP': '#4F5D95',
  'C++': '#f34b7d',
  'C': '#555555',
  'Ruby': '#701516',
  'Go': '#00ADD8',
  'Rust': '#dea584',
  'Shell': '#89e051',
  'Vue': '#41b883'
};

// Generate cards for each repository
export function generateCards(repositories) {
  const cardsContainer = document.getElementById('cards-container');
  cardsContainer.innerHTML = '';

  repositories.forEach((repo, index) => {
    const cardId = `card-${index + 1}`;
    const hasVisitUrl = repo.visitUrl && repo.visitUrl.trim() !== '';

    const cardHTML = `
      <div class="github-card" id="${cardId}">
        <div class="card-header">
          <i class="fab fa-github github-icon"></i>
          <div class="card-title">GitHub Repository</div>
        </div>
        <div class="card-body">
          <h2 class="repo-name">
            <i class="fas fa-book"></i>
            <span class="repo-name-text">${repo.owner}/${repo.name}</span>
          </h2>
          <p class="repo-description">
            <span class="loading">Loading repository data...</span>
          </p>
          <div class="repo-details">
            <div class="detail-item">
              <i class="fas fa-code"></i>
              <span class="language-color"></span>
              <span class="language">Loading...</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-star"></i>
              <span class="stars">0</span> stars
            </div>
            <div class="detail-item">
              <i class="fas fa-code-branch"></i>
              <span class="forks">0</span> forks
            </div>
          </div>
          <div class="card-footer">
            <div class="footer-left">
              ${hasVisitUrl ? `<a href="${repo.visitUrl}" target="_blank" class="btn visit-btn"><i class="fas fa-external-link-alt"></i>Visit</a>` : ''}
              <div class="last-updated">
                <i class="fas fa-clock"></i>
                Updated: <span class="updated">Loading...</span>
              </div>
            </div>
            <a href="#" target="_blank" class="github-link github-repo-link">
              <i class="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    `;
    cardsContainer.innerHTML += cardHTML;
  });
}

// Fetch repo data
export function fetchRepoData(owner, name, cardId) {
  const apiUrl = `/data/${owner}_${name}.json`;
  const card = document.getElementById(cardId);
  if (!card) return;

  const repoNameElement = card.querySelector('.repo-name-text');
  const repoDescription = card.querySelector('.repo-description');
  const languageElement = card.querySelector('.language');
  const languageColorElement = card.querySelector('.language-color');
  const starsElement = card.querySelector('.stars');
  const forksElement = card.querySelector('.forks');
  const updatedElement = card.querySelector('.updated');
  const githubLink = card.querySelector('.github-repo-link');

  repoDescription.innerHTML = '<span class="loading">Loading repository data...</span>';
  languageElement.textContent = 'Loading...';
  starsElement.textContent = '0';
  forksElement.textContent = '0';
  updatedElement.textContent = 'Loading...';

  fetch(apiUrl)
    .then(res => {
      if (!res.ok) throw new Error("Failed to load repo data JSON");
      return res.json();
    })
    .then(data => {
      repoNameElement.textContent = data.full_name;
      repoDescription.textContent = data.description || "No description provided";

      languageElement.textContent = data.language || "Not specified";
      languageColorElement.style.backgroundColor = languageColors[data.language] || "#586069";

      starsElement.textContent = data.stargazers_count.toLocaleString();
      forksElement.textContent = data.forks_count.toLocaleString();

      const updatedDate = new Date(data.updated_at);
      updatedElement.textContent = updatedDate.toLocaleDateString();

      githubLink.href = data.html_url;
    })
    .catch(err => {
      console.error(err);
      repoDescription.innerHTML = `<span class="error">Error loading repository data</span>`;
    });
}

export function injectRepoStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .github-card {
      width: 320px;
      background: var(--card-bg);
      border-radius: 12px;
      box-shadow: 0 5px 15px var(--card-shadow);
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: 1px solid var(--card-border);
    }

    .github-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px var(--card-shadow);
    }

    .card-header {
      background: #24292e;
      color: white;
      padding: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .github-icon { font-size: 20px; margin-right: 10px; }
    .card-title { font-size: 14px; font-weight: 600; }
    .card-body { padding: 20px; }
    .repo-name { font-size: 18px; font-weight: 700; color: #0366d6; margin-bottom: 5px; display: flex; justify-content: center; align-items: center; }
    .repo-name i { margin-right: 8px; color: #586069; font-size: 16px; }
    .repo-description { color: var(--muted); margin: 12px 0; line-height: 1.4; font-size: 14px; min-height: 20px; }
    .repo-details { display: flex; flex-wrap: wrap; gap: 10px; margin: 15px 0; justify-content: center; }
    .detail-item { display: flex; align-items: center; color: var(--muted); font-size: 12px; background: color-mix(in srgb, var(--card-bg) 90%, black 10%); padding: 5px 10px; border-radius: 4px; }
    .detail-item i { margin-right: 4px; font-size: 12px; }
    .language-color { width: 10px; height: 10px; background: #3572A5; border-radius: 50%; margin-right: 4px; }
    .card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--card-border); flex-wrap: wrap; gap: 10px; }
    .btn { display: inline-flex; align-items: center; justify-content: center; padding: 6px 12px; background: #0366d6; color: white; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 12px; transition: background 0.2s; }
    .btn i { margin-right: 4px; font-size: 12px; }
    .btn:hover { background: #0356b6; }
    .visit-btn { background: var(--feature-color); }
    .visit-btn:hover { background: color-mix(in srgb, var(--feature-color) 90%, black 10%); }
    .github-link { display: flex; align-items: center; justify-content: center; color: var(--muted); font-size: 20px; transition: color 0.2s ease, transform 0.2s ease; margin-left: 10px; }
    .github-link:hover { color: var(--feature-color); transform: scale(1.1); }
    .footer-left { display: flex; align-items: center; gap: 10px; }
    .last-updated { color: var(--muted); font-size: 12px; display: flex; align-items: center; }
    .loading { color: var(--muted); text-align: center; padding: 15px; font-style: italic; font-size: 14px; }
    .error { color: #d73a49; text-align: center; padding: 15px; font-weight: 500; font-size: 14px; }s
  `;
  document.head.appendChild(style);
}
