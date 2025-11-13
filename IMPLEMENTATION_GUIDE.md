# DYNAMIC MULTI-TIER IMPLEMENTATION GUIDE

## Overview
This guide shows how to maintain ALL tier functionality with just 30 files using dynamic JavaScript.

## ✅ The Solution: Package-Based Feature Toggling

Instead of 5 separate HTML files per page (basic, bronze, silver, gold, platinum), we have:
- **ONE HTML file** with ALL features included
- **JavaScript** that shows/hides features based on user's package
- **CSS** that styles elements differently per package

## 🎯 How It Works

### 1. Store User's Package
```javascript
// In login.js or session management
localStorage.setItem('userPackage', 'silver'); // 'basic', 'bronze', 'silver', 'gold', 'platinum'
localStorage.setItem('userRole', 'player'); // 'player', 'scout', 'coach', 'admin'
```

### 2. HTML Structure with Data Attributes
```html
<!-- Feature available for silver+ packages -->
<div class="video-upload-section" data-min-package="silver">
  <h3>Upload Highlight Videos</h3>
  <button class="upload-btn">Upload Video</button>
</div>

<!-- Feature only for basic/bronze -->
<div class="upgrade-notice" data-max-package="bronze">
  <p>Upgrade to Silver to upload videos!</p>
  <button class="upgrade-btn">Upgrade Now</button>
</div>

<!-- Premium feature for gold+ -->
<div class="advanced-analytics" data-min-package="gold">
  <h3>AI-Powered Analytics</h3>
  <!-- analytics content -->
</div>
```

### 3. JavaScript Package Detection & Feature Control
```javascript
// playerdashboard.js

const PACKAGE_HIERARCHY = {
  basic: 0,
  bronze: 1,
  silver: 2,
  gold: 3,
  platinum: 4
};

const PACKAGE_FEATURES = {
  basic: {
    videoUpload: false,
    messaging: 0, // messages per month
    analytics: false,
    scoutVisibility: 'low'
  },
  bronze: {
    videoUpload: false,
    messaging: 5,
    analytics: false,
    scoutVisibility: 'medium'
  },
  silver: {
    videoUpload: true,
    messaging: -1, // unlimited
    analytics: 'basic',
    scoutVisibility: 'high'
  },
  gold: {
    videoUpload: true,
    messaging: -1,
    analytics: 'advanced',
    scoutVisibility: 'premium',
    aiInsights: true
  },
  platinum: {
    videoUpload: true,
    messaging: -1,
    analytics: 'advanced',
    scoutVisibility: 'elite',
    aiInsights: true,
    personalAgent: true
  }
};

function initializePackageFeatures() {
  const userPackage = localStorage.getItem('userPackage') || 'basic';
  const userPackageLevel = PACKAGE_HIERARCHY[userPackage];
  
  // Set body attribute for CSS styling
  document.body.setAttribute('data-package', userPackage);
  
  // Update package badge
  const badge = document.querySelector('.package-badge');
  if (badge) {
    badge.textContent = userPackage.toUpperCase() + ' PACKAGE';
    badge.className = `package-badge ${userPackage}`;
  }
  
  // Show/hide features based on package
  document.querySelectorAll('[data-min-package]').forEach(element => {
    const minPackage = element.getAttribute('data-min-package');
    const minLevel = PACKAGE_HIERARCHY[minPackage];
    
    if (userPackageLevel >= minLevel) {
      element.style.display = ''; // Show element
      element.classList.remove('package-locked');
    } else {
      element.style.display = 'none'; // Hide element
      element.classList.add('package-locked');
    }
  });
  
  // Hide elements for higher packages
  document.querySelectorAll('[data-max-package]').forEach(element => {
    const maxPackage = element.getAttribute('data-max-package');
    const maxLevel = PACKAGE_HIERARCHY[maxPackage];
    
    if (userPackageLevel <= maxLevel) {
      element.style.display = '';
    } else {
      element.style.display = 'none';
    }
  });
  
  // Disable features based on package
  const features = PACKAGE_FEATURES[userPackage];
  
  // Video upload control
  if (!features.videoUpload) {
    document.querySelectorAll('.video-upload-btn').forEach(btn => {
      btn.disabled = true;
      btn.title = 'Upgrade to Silver or higher';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showUpgradeModal('video upload');
      });
    });
  }
  
  // Messaging limits
  if (features.messaging >= 0) {
    updateMessageCounter(features.messaging);
  }
}

function showUpgradeModal(feature) {
  const modal = document.getElementById('upgradeModal');
  const featureText = document.getElementById('upgradeFeatureText');
  featureText.textContent = `Upgrade to unlock ${feature}`;
  modal.style.display = 'block';
}

function updateMessageCounter(limit) {
  const counter = document.querySelector('.message-counter');
  if (counter && limit >= 0) {
    const sent = parseInt(localStorage.getItem('messagesSent') || '0');
    counter.textContent = `${sent}/${limit} messages used this month`;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializePackageFeatures);
```

### 4. CSS Package-Specific Styling
```css
/* playerdashboard.css */

/* Package badges */
.package-badge {
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.8rem;
}

.package-badge.basic { background: #999; color: #fff; }
.package-badge.bronze { background: #cd7f32; color: #fff; }
.package-badge.silver { background: #c0c0c0; color: #333; }
.package-badge.gold { background: #ffd700; color: #333; }
.package-badge.platinum { background: linear-gradient(135deg, #e5e4e2, #a9a9a9); color: #333; }

/* Package-specific visibility */
body[data-package="basic"] .bronze-plus,
body[data-package="basic"] .silver-plus,
body[data-package="basic"] .gold-plus,
body[data-package="basic"] .platinum-only {
  display: none !important;
}

body[data-package="bronze"] .silver-plus,
body[data-package="bronze"] .gold-plus,
body[data-package="bronze"] .platinum-only {
  display: none !important;
}

body[data-package="silver"] .gold-plus,
body[data-package="silver"] .platinum-only {
  display: none !important;
}

body[data-package="gold"] .platinum-only {
  display: none !important;
}

/* Locked features styling */
.package-locked {
  position: relative;
  opacity: 0.5;
  pointer-events: none;
}

.package-locked::after {
  content: '\f023'; /* Font Awesome lock icon */
  font-family: 'Font Awesome 6 Free';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: #ffd700;
}

/* Upgrade notices */
.upgrade-notice {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin: 20px 0;
}

/* Premium features glow effect */
body[data-package="gold"] .gold-feature,
body[data-package="platinum"] .gold-feature,
body[data-package="platinum"] .platinum-feature {
  border: 2px solid #ffd700;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}
```

### 5. Testing Different Packages
```javascript
// Add to your JS console or create a dev panel
function switchPackage(packageName) {
  localStorage.setItem('userPackage', packageName);
  location.reload();
}

// Test commands:
// switchPackage('basic');
// switchPackage('bronze');
// switchPackage('silver');
// switchPackage('gold');
// switchPackage('platinum');
```

## 📁 Final File Structure
```
TalantaScout/
├── assets/
│   ├── css/
│   │   ├── styles.css           (global styles)
│   │   ├── playerdashboard.css  (ALL player styles)
│   │   ├── scoutdashboard.css
│   │   ├── coachdashboard.css
│   │   └── admindashboard.css
│   ├── js/
│   │   ├── main.js              (global JS)
│   │   ├── playerdashboard.js   (dynamic player logic)
│   │   ├── scoutdashboard.js
│   │   ├── coachdashboard.js
│   │   └── admindashboard.js
│   └── images/
├── player/
│   ├── dashboard.html           (ONE file for ALL tiers)
│   ├── profile.html
│   ├── training.html
│   ├── matches.html
│   ├── scout_connect.html
│   ├── achievements.html
│   └── settings.html
├── scout/
├── coach/
├── admin/
├── index.html
└── login.html
```

## ✅ Benefits
- 30 files instead of 170+
- Easy to maintain (fix once, works for all tiers)
- Can switch packages instantly
- All styling preserved
- All buttons/modals/icons work
- No broken navigation
- **User experience identical to separate files**

## 🚀 Implementation Priority
1. Update one page (player dashboard) with dynamic features
2. Test all 5 tiers thoroughly
3. Replicate pattern to other player pages
4. Apply to scout, coach, admin
5. Delete old tier folders

**Result**: Fully functional multi-tier system with 75% less code!
