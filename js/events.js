// ===================================
// IEEE Student Branch - Events Manager
// ===================================

// Events Array - Add your events here!
const events = [
  {
    title: "Intro to AI Workshop",
    date: "2025-11-25", // ISO format (YYYY-MM-DD)
    time: "3:00 PM – 5:00 PM",
    location: "Room 101, CS Building",
    description: "Hands-on session on basic AI concepts and Python demos.",
    type: "Workshop",
    registerLink: "https://example.com/register"
  },
  {
    title: "IEEE Welcome Meet",
    date: "2025-10-10",
    time: "4:00 PM – 6:00 PM",
    location: "Auditorium",
    description: "Kick-off event to introduce IEEE activities for the semester.",
    type: "Meetup",
    registerLink: ""
  },
  {
    title: "Web Development Bootcamp",
    date: "2025-12-05",
    time: "10:00 AM – 4:00 PM",
    location: "Computer Lab 2",
    description: "Full-day intensive bootcamp covering HTML, CSS, and JavaScript fundamentals.",
    type: "Workshop",
    registerLink: "https://example.com/register"
  },
  {
    title: "Tech Talk: IoT in Smart Cities",
    date: "2025-11-20",
    time: "2:00 PM – 3:30 PM",
    location: "Seminar Hall",
    description: "Expert speaker discussing IoT applications in modern urban development.",
    type: "Tech Talk",
    registerLink: ""
  },
  {
    title: "Annual Hackathon 2025",
    date: "2026-01-15",
    time: "9:00 AM – 9:00 PM",
    location: "Main Campus Hall",
    description: "24-hour hackathon challenging students to build innovative solutions.",
    type: "Hackathon",
    registerLink: "https://example.com/hackathon"
  }
];

// ===================================
// Helper Functions
// ===================================

/**
 * Get today's date at midnight for comparison
 */
function getTodayDate() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

/**
 * Split events into upcoming and past
 */
function splitEvents() {
  const today = getTodayDate();
  const upcoming = [];
  const past = [];

  events.forEach(event => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate >= today) {
      upcoming.push(event);
    } else {
      past.push(event);
    }
  });

  // Sort upcoming events: earliest first
  upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Sort past events: most recent first
  past.sort((a, b) => new Date(b.date) - new Date(a.date));

  return { upcoming, past };
}

/**
 * Format date for display (e.g., "November 25, 2025")
 */
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

/**
 * Create HTML for a single event card
 */
function createEventCard(event) {
  const formattedDate = formatDate(event.date);
  
  const registerButton = event.registerLink 
    ? `<a href="${event.registerLink}" class="btn btn-primary" target="_blank">Register for Event</a>`
    : '<a href="register.html" class="btn btn-primary">Become a Member</a>';

  return `
    <div class="event-card">
      <span class="event-type">${event.type}</span>
      <h3>${event.title}</h3>
      <div class="event-meta">
        <span>📅 ${formattedDate}</span>
        <span>⏰ ${event.time}</span>
        <span>📍 ${event.location}</span>
      </div>
      <p class="event-description">${event.description}</p>
      ${registerButton}
    </div>
  `;
}

/**
 * Display events on the events.html page
 */
function displayEvents() {
  const { upcoming, past } = splitEvents();

  // Display upcoming events
  const upcomingContainer = document.getElementById('upcoming-events');
  if (upcomingContainer) {
    if (upcoming.length > 0) {
      upcomingContainer.innerHTML = upcoming.map(event => createEventCard(event)).join('');
    } else {
      upcomingContainer.innerHTML = '<div class="no-events">No upcoming events at the moment. Check back soon!</div>';
    }
  }

  // Display past events
  const pastContainer = document.getElementById('past-events');
  if (pastContainer) {
    if (past.length > 0) {
      pastContainer.innerHTML = past.map(event => createEventCard(event)).join('');
    } else {
      pastContainer.innerHTML = '<div class="no-events">No past events to display.</div>';
    }
  }
}

/**
 * Display upcoming events preview on home page (shows only next 2 events)
 */
function displayUpcomingPreview() {
  const { upcoming } = splitEvents();
  const previewContainer = document.getElementById('events-preview');
  
  if (previewContainer) {
    const previewEvents = upcoming.slice(0, 2); // Get only first 2 upcoming events
    
    if (previewEvents.length > 0) {
      previewContainer.innerHTML = previewEvents.map(event => createEventCard(event)).join('');
    } else {
      previewContainer.innerHTML = '<div class="no-events">No upcoming events at the moment.</div>';
    }
  }
}

// ===================================
// Initialize on Page Load
// ===================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeEvents);
} else {
  initializeEvents();
}

function initializeEvents() {
  // Check which page we're on and call appropriate function
  if (document.getElementById('upcoming-events') || document.getElementById('past-events')) {
    // We're on events.html
    displayEvents();
  } else if (document.getElementById('events-preview')) {
    // We're on index.html
    displayUpcomingPreview();
  }
}
