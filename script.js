const ADVENT_START_MONTH = 11;
const ADVENT_START_DAY = 25;
const TEST_DAY = null;

function openWindow(windowElement) {
  windowElement.classList.add('opened');
}

function closeWindow(windowElement) {
  windowElement.classList.remove('opened');
}

function updateWindowStates() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  let adventDay;
  if (TEST_DAY !== null) {
    adventDay = TEST_DAY;
  }
  else if (currentMonth === ADVENT_START_MONTH) {
    adventDay = currentDay - ADVENT_START_DAY + 1;
  }
  else if (currentMonth > ADVENT_START_MONTH || (currentMonth === 0 && ADVENT_START_MONTH === 11)) {
    adventDay = 13;
  }
  else {
    adventDay = 0;
  }
  
  const dateDisplay = document.getElementById('dateDisplay');
  if (TEST_DAY !== null) {
    dateDisplay.innerHTML = `🎄 Testing Day ${TEST_DAY}`;
  }
  else {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    dateDisplay.innerHTML = `🎄 ${today.toLocaleDateString('en-US', options)}`;
  }
  
  const windows = document.querySelectorAll('.window');
  windows.forEach(windowEl => {
    const dayNumber = parseInt(windowEl.dataset.day);
    
    windowEl.classList.remove('today', 'past', 'future');
    
    if (dayNumber === adventDay) {
      windowEl.classList.add('today');
    }
    else if (dayNumber < adventDay) {
      windowEl.classList.add('past');
    }
    else {
      windowEl.classList.add('future');
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  updateWindowStates();
  
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const msUntilMidnight = tomorrow - now;
  
  setTimeout(function() {
    updateWindowStates();
    setInterval(updateWindowStates, 24 * 60 * 60 * 1000);
  }, msUntilMidnight);
});

function createStars() {
  const starsContainer = document.getElementById('stars');
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.width = (Math.random() * 3 + 1) + 'px';
    star.style.height = star.style.width;
    star.style.animationDelay = Math.random() * 2 + 's';
    star.style.animationDuration = (Math.random() * 2 + 1) + 's';
    starsContainer.appendChild(star);
  }
}
createStars();

function createSnowflakes() {
  const snowflakesContainer = document.getElementById('snowflakes');
  const snowflakeChars = ['❄', '❅', '❆', '•'];
  for (let i = 0; i < 50; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.animationDuration = (Math.random() * 3 + 5) + 's';
    snowflake.style.animationDelay = Math.random() * 5 + 's';
    snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
    snowflake.style.opacity = Math.random() * 0.6 + 0.4;
    snowflakesContainer.appendChild(snowflake);
  }
}
createSnowflakes();
