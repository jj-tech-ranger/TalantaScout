// TalantaScout Player Basic Dashboard JavaScript
// Kenyan Football Data and Functionality

// Kenyan Football Data
const kenyanTeams = [
    'Gor Mahia FC', 'AFC Leopards', 'Tusker FC', 'KCB FC', 'Bandari FC',
    'Sofapaka FC', 'Mathare United', 'Wazito FC', 'Kakamega Homeboyz',
    'Ulinzi Stars', 'Nzoia Sugar FC', 'Posta Rangers', 'Zoo FC',
    'Bidco United', 'Nairobi City Stars', 'Vihiga United'
];

const kenyanPlayers = [
    'Brian Otieno', 'Michael Wanyama', 'Dennis Oliech', 'Allan Wanga',
    'Jesse Were', 'Clifton Miheso', 'Eric Johanna', 'Kenneth Muguna',
    'Francis Kahata', 'Meddie Kagere', 'George Odhiambo', 'David Owino',
    'Joash Onyango', 'Musa Mohammed', 'Collins Okoth', 'Timothy Otieno',
    'Lawrence Juma', 'Boniface Muchiri', 'Elvis Rupia', 'John Makwatta'
];

const kenyanCounties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Kakamega',
    'Machakos', 'Meru', 'Nyeri', 'Thika', 'Kitale', 'Garissa',
    'Malindi', 'Lamu', 'Isiolo', 'Marsabit', 'Wajir', 'Mandera'
];

const kenyanCoaches = [
    'Coach Wambua', 'Coach Kimanzi', 'Coach Migne', 'Coach Ouma',
    'Coach Nyangweso', 'Coach Matano', 'Coach Baraza', 'Coach Okumbi',
    'Coach Mulei', 'Coach Nandwa', 'Coach Omollo', 'Coach Kamau'
];

const trainingTypes = [
    'Technical Skills', 'Physical Fitness', 'Tactical Training', 'Match Preparation',
    'Recovery Session', 'Strength Training', 'Speed & Agility', 'Ball Control',
    'Shooting Practice', 'Passing Drills', 'Defensive Training', 'Set Pieces'
];

const venues = [
    'Kasarani Stadium', 'Nyayo Stadium', 'Moi International Sports Centre',
    'Bukhungu Stadium', 'Afraha Stadium', 'Machakos Stadium',
    'Kenyatta Stadium', 'Kipchoge Keino Stadium', 'Kinoru Stadium',
    'Mumias Sports Complex', 'Thika Stadium', 'ASK Showground'
];

// DOM Elements
let morphOverlay, themeToggle, profileBtn, profileDropdown, logoutBtn;
let totalMatches, goalsScored, assists, trainingSessions;
let skillTable, ratingList, trainingTable, matchCards, videoGrid, scoutInteractions;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    loadDashboardData();
    hideLoadingOverlay();
});

function initializeElements() {
    morphOverlay = document.getElementById('morphOverlay');
    themeToggle = document.getElementById('themeToggle');
    profileBtn = document.getElementById('profileBtn');
    profileDropdown = document.getElementById('profileDropdown');
    logoutBtn = document.getElementById('logoutBtn');
    
    totalMatches = document.getElementById('totalMatches');
    goalsScored = document.getElementById('goalsScored');
    assists = document.getElementById('assists');
    trainingSessions = document.getElementById('trainingSessions');
    
    skillTable = document.getElementById('skillTable');
    ratingList = document.getElementById('ratingList');
    trainingTable = document.getElementById('trainingTable');
    matchCards = document.getElementById('matchCards');
    videoGrid = document.getElementById('videoGrid');
    scoutInteractions = document.getElementById('scoutInteractions');
}

function setupEventListeners() {
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Profile dropdown
    if (profileBtn) {
        profileBtn.addEventListener('click', toggleProfileDropdown);
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (profileDropdown && !profileBtn.contains(event.target)) {
            profileDropdown.classList.remove('active');
        }
    });
    
    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    const logoutDropdown = document.getElementById('logoutDropdown');
    if (logoutDropdown) {
        logoutDropdown.addEventListener('click', logout);
    }
    
    // Modal functionality
    setupModalListeners();
}

function setupModalListeners() {
    // Match modal
    const matchModal = document.getElementById('matchModal');
    const closeMatchModal = document.getElementById('closeMatchModal');
    
    if (closeMatchModal) {
        closeMatchModal.addEventListener('click', () => {
            matchModal.classList.remove('active');
        });
    }
    
    // Upgrade modal
    const upgradeModal = document.getElementById('upgradeModal');
    const closeUpgradeModal = document.getElementById('closeUpgradeModal');
    
    if (closeUpgradeModal) {
        closeUpgradeModal.addEventListener('click', () => {
            upgradeModal.classList.remove('active');
        });
    }
    
    // Close modals when clicking overlay
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(event) {
            if (event.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });
}

function hideLoadingOverlay() {
    setTimeout(() => {
        if (morphOverlay) {
            morphOverlay.style.opacity = '0';
            setTimeout(() => {
                morphOverlay.style.display = 'none';
            }, 500);
        }
    }, 1500);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function toggleProfileDropdown() {
    if (profileDropdown) {
        profileDropdown.classList.toggle('active');
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userSession');
        window.location.href = '../../../index.html';
    }
}

function loadDashboardData() {
    loadSkillProgression();
    loadMatchRatings();
    loadTrainingSessions();
    loadMatchHighlights();
    loadVideoPortfolio();
    loadScoutInteractions();
    updateOverviewCards();
}

function updateOverviewCards() {
    // Simulate real-time data updates
    const stats = {
        matches: Math.floor(Math.random() * 20) + 35,
        goals: Math.floor(Math.random() * 8) + 8,
        assists: Math.floor(Math.random() * 6) + 5,
        training: Math.floor(Math.random() * 10) + 20
    };
    
    if (totalMatches) totalMatches.textContent = stats.matches;
    if (goalsScored) goalsScored.textContent = stats.goals;
    if (assists) assists.textContent = stats.assists;
    if (trainingSessions) trainingSessions.textContent = stats.training;
}

function loadSkillProgression() {
    if (!skillTable) return;
    
    const skills = [
        { name: 'Shooting', level: 'Intermediate', rating: 7.2, updated: '2025-01-05', progress: 72 },
        { name: 'Passing', level: 'Advanced', rating: 8.1, updated: '2025-01-06', progress: 81 },
        { name: 'Dribbling', level: 'Intermediate', rating: 6.8, updated: '2025-01-04', progress: 68 },
        { name: 'Defense', level: 'Beginner', rating: 5.5, updated: '2025-01-03', progress: 55 },
        { name: 'Speed', level: 'Advanced', rating: 8.5, updated: '2025-01-07', progress: 85 }
    ];
    
    const tbody = skillTable.querySelector('tbody');
    if (tbody) {
        tbody.innerHTML = skills.map(skill => `
            <tr>
                <td><strong>${skill.name}</strong></td>
                <td><span class="level-badge ${skill.level.toLowerCase()}">${skill.level}</span></td>
                <td><span class="rating">${skill.rating}/10</span></td>
                <td>${skill.updated}</td>
                <td>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${skill.progress}%"></div>
                    </div>
                </td>
            </tr>
        `).join('');
    }
}

function loadMatchRatings() {
    if (!ratingList) return;
    
    const ratings = [
        { date: '2025-01-05', opponent: 'AFC Leopards', rating: 8.2, result: 'Win 2-1' },
        { date: '2024-12-28', opponent: 'Tusker FC', rating: 7.5, result: 'Draw 1-1' },
        { date: '2024-12-21', opponent: 'KCB FC', rating: 6.8, result: 'Loss 0-2' },
        { date: '2024-12-14', opponent: 'Bandari FC', rating: 8.7, result: 'Win 3-0' },
        { date: '2024-12-07', opponent: 'Sofapaka FC', rating: 7.9, result: 'Win 2-0' }
    ];
    
    ratingList.innerHTML = ratings.map(match => `
        <div class="rating-item">
            <div class="rating-header">
                <span class="rating-date">${match.date}</span>
                <span class="rating-score ${match.rating >= 8 ? 'excellent' : match.rating >= 7 ? 'good' : 'average'}">${match.rating}/10</span>
            </div>
            <div class="rating-match">vs ${match.opponent}</div>
            <div class="rating-result">${match.result}</div>
        </div>
    `).join('');
}

function loadTrainingSessions() {
    if (!trainingTable) return;
    
    const sessions = [
        {
            date: '2025-01-09',
            time: '16:00',
            type: 'Technical Skills',
            coach: 'Coach Wambua',
            location: 'Kasarani Stadium',
            status: 'Scheduled'
        },
        {
            date: '2025-01-11',
            time: '09:00',
            type: 'Physical Fitness',
            coach: 'Coach Kimanzi',
            location: 'Nyayo Stadium',
            status: 'Confirmed'
        },
        {
            date: '2025-01-13',
            time: '15:30',
            type: 'Tactical Training',
            coach: 'Coach Ouma',
            location: 'Moi Sports Centre',
            status: 'Pending'
        },
        {
            date: '2025-01-15',
            time: '17:00',
            type: 'Match Preparation',
            coach: 'Coach Nyangweso',
            location: 'Bukhungu Stadium',
            status: 'Scheduled'
        },
        {
            date: '2025-01-17',
            time: '10:00',
            type: 'Recovery Session',
            coach: 'Coach Matano',
            location: 'Afraha Stadium',
            status: 'Optional'
        }
    ];
    
    const tbody = trainingTable.querySelector('tbody');
    if (tbody) {
        tbody.innerHTML = sessions.map(session => `
            <tr>
                <td>${session.date}</td>
                <td>${session.time}</td>
                <td>${session.type}</td>
                <td>${session.coach}</td>
                <td>${session.location}</td>
                <td><span class="status-badge ${session.status.toLowerCase()}">${session.status}</span></td>
            </tr>
        `).join('');
    }
}

function loadMatchHighlights() {
    if (!matchCards) return;
    
    const matches = [
        {
            date: '2025-01-05',
            teams: 'Gor Mahia FC vs AFC Leopards',
            score: '2-1',
            goals: 1,
            assists: 1,
            rating: 8.2
        },
        {
            date: '2024-12-28',
            teams: 'Tusker FC vs Gor Mahia FC',
            score: '1-1',
            goals: 0,
            assists: 1,
            rating: 7.5
        },
        {
            date: '2024-12-21',
            teams: 'KCB FC vs Gor Mahia FC',
            score: '2-0',
            goals: 0,
            assists: 0,
            rating: 6.8
        }
    ];
    
    matchCards.innerHTML = matches.map(match => `
        <div class="match-card" onclick="showMatchDetails('${match.date}', '${match.teams}', '${match.score}', ${match.goals}, ${match.assists}, ${match.rating})">
            <div class="match-header">
                <span class="match-date">${match.date}</span>
                <span class="match-score">${match.score}</span>
            </div>
            <div class="match-teams">${match.teams}</div>
            <div class="match-stats">
                <span>Goals: ${match.goals}</span>
                <span>Assists: ${match.assists}</span>
                <span>Rating: ${match.rating}/10</span>
            </div>
        </div>
    `).join('');
}

function loadVideoPortfolio() {
    if (!videoGrid) return;
    
    const videos = [
        { title: 'Training Highlights', duration: '2:30', type: 'training' },
        { title: 'Match Performance vs AFC Leopards', duration: '1:45', type: 'match' },
        { title: 'Skill Demonstration', duration: '3:15', type: 'skills' }
    ];
    
    videoGrid.innerHTML = videos.map(video => `
        <div class="video-item">
            <div class="video-thumbnail">
                <i class="fas fa-play"></i>
            </div>
            <div class="video-info">
                <div class="video-title">${video.title}</div>
                <div class="video-duration">${video.duration}</div>
                <div class="basic-limitation">
                    <i class="fas fa-lock"></i>
                    <span>View Only</span>
                </div>
            </div>
        </div>
    `).join('');
}

function loadScoutInteractions() {
    if (!scoutInteractions) return;
    
    const scouts = [
        { name: 'Samuel Ochieng', organization: 'Gor Mahia FC', date: '2025-01-06' },
        { name: 'Mary Wanjiku', organization: 'AFC Leopards', date: '2025-01-04' },
        { name: 'Peter Kimani', organization: 'Tusker FC', date: '2025-01-02' },
        { name: 'Grace Akinyi', organization: 'KCB FC', date: '2024-12-30' }
    ];
    
    scoutInteractions.innerHTML = scouts.map(scout => `
        <div class="scout-item">
            <div class="scout-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="scout-info">
                <h4>${scout.name}</h4>
                <p>${scout.organization} • Viewed on ${scout.date}</p>
                <div class="basic-limitation">
                    <i class="fas fa-eye"></i>
                    <span>View Only - Upgrade for messaging</span>
                </div>
            </div>
        </div>
    `).join('');
}

function showMatchDetails(date, teams, score, goals, assists, rating) {
    const modal = document.getElementById('matchModal');
    if (!modal) return;
    
    document.getElementById('modalMatchDate').textContent = date;
    document.getElementById('modalOpponent').textContent = teams;
    document.getElementById('modalScore').textContent = score;
    document.getElementById('modalGoals').textContent = goals;
    document.getElementById('modalAssists').textContent = assists;
    document.getElementById('modalRating').textContent = `${rating}/10`;
    
    modal.classList.add('active');
}

// Utility functions
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-KE');
}

function generateRandomStats() {
    return {
        matches: Math.floor(Math.random() * 50) + 20,
        goals: Math.floor(Math.random() * 25) + 5,
        assists: Math.floor(Math.random() * 20) + 3,
        training: Math.floor(Math.random() * 30) + 15
    };
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeIcon = document.querySelector('#themeToggle i');
    if (themeIcon) {
        themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
});

// Auto-refresh data every 30 seconds
setInterval(() => {
    updateOverviewCards();
}, 30000);

// Add CSS for new elements
const additionalStyles = `
<style>
.package-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 8px;
}

.package-badge.basic {
    background: #e3f2fd;
    color: #1976d2;
}

.upgrade-notice {
    margin: 20px 30px;
    background: linear-gradient(135deg, #ffd700, #ffed4e);
    border-radius: 12px;
    padding: 20px;
    color: #333;
}

.upgrade-content {
    display: flex;
    align-items: center;
    gap: 20px;
}

.upgrade-content i {
    font-size: 2rem;
    color: #ff6f00;
}

.upgrade-content h3 {
    margin: 0 0 5px 0;
    font-size: 1.2rem;
}

.upgrade-content p {
    margin: 0;
    opacity: 0.8;
}

.basic-badge {
    background: #e3f2fd;
    color: #1976d2;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
}

.basic-limitation {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
    font-size: 0.9rem;
    margin-top: 10px;
}

.basic-limitation i {
    color: #ff9800;
}

.level-badge {
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 500;
}

.level-badge.beginner {
    background: #ffebee;
    color: #c62828;
}

.level-badge.intermediate {
    background: #fff3e0;
    color: #ef6c00;
}

.level-badge.advanced {
    background: #e8f5e8;
    color: #2e7d32;
}

.progress-bar {
    width: 100%;
    height: 8px;
    background: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4caf50, #8bc34a);
    transition: width 0.3s ease;
}

.rating-item {
    padding: 15px;
    background: var(--background-light);
    border-radius: 8px;
    margin-bottom: 10px;
    border-left: 4px solid var(--primary-color);
}

.rating-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.rating-score {
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 8px;
}

.rating-score.excellent {
    background: #e8f5e8;
    color: #2e7d32;
}

.rating-score.good {
    background: #fff3e0;
    color: #ef6c00;
}

.rating-score.average {
    background: #ffebee;
    color: #c62828;
}

.status-badge {
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 500;
}

.status-badge.scheduled {
    background: #e3f2fd;
    color: #1976d2;
}

.status-badge.confirmed {
    background: #e8f5e8;
    color: #2e7d32;
}

.status-badge.pending {
    background: #fff3e0;
    color: #ef6c00;
}

.status-badge.optional {
    background: #f3e5f5;
    color: #7b1fa2;
}

.upgrade-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
}

.upgrade-option {
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    text-align: center;
}

.upgrade-option h4 {
    margin-bottom: 10px;
    color: var(--text-dark);
}

.upgrade-option .price {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 15px;
}

.upgrade-option ul {
    list-style: none;
    margin-bottom: 20px;
}

.upgrade-option li {
    padding: 5px 0;
    color: var(--text-color);
}

@media (max-width: 768px) {
    .upgrade-content {
        flex-direction: column;
        text-align: center;
    }
    
    .upgrade-options {
        grid-template-columns: 1fr;
    }
}
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);

