document.addEventListener('DOMContentLoaded', () => {
    // --- Page Navigation ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.toggle('active', page.id === pageId);
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('href').substring(1);
            showPage(pageId);
            window.history.pushState({pageId}, '', `#${pageId}`);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.pageId) {
            showPage(e.state.pageId);
        } else {
             showPage('home');
        }
    });

    // Show initial page based on URL hash or default to home
    const initialPageId = window.location.hash.substring(1) || 'home';
    showPage(initialPageId);


    // --- Theme Toggler ---
    const themeToggle = document.getElementById('theme-toggle');
    
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    themeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);


    // --- Calendar ---
    const monthYearEl = document.getElementById('month-year');
    const calendarGrid = document.getElementById('calendar-grid');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let currentDate = new Date();

    function renderCalendar() {
        calendarGrid.innerHTML = '';
        currentDate.setDate(1); // Start from the 1st of the month

        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        monthYearEl.textContent = `${monthNames[month]} ${year}`;
        
        const firstDayIndex = currentDate.getDay();
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        const prevLastDay = new Date(year, month, 0).getDate();

        // Add empty cells for previous month
        for (let i = 0; i < firstDayIndex; i++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('day', 'empty');
            calendarGrid.appendChild(dayEl);
        }

        // Add cells for current month
        const today = new Date();
        for (let i = 1; i <= lastDayOfMonth; i++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('day');
            dayEl.textContent = i;

            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayEl.classList.add('today');
            }

            dayEl.addEventListener('click', () => {
                alert(`You selected ${monthNames[month]} ${i}, ${year}. Integration with a booking system can be added here.`);
            });
            calendarGrid.appendChild(dayEl);
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});