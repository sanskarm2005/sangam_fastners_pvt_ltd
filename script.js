document.addEventListener('DOMContentLoaded', () => {
    console.log("Sangam Fasteners Script Loaded Successfully");

// 1. Simple Smooth Scrolling (No offset needed for static header)
// 1. Bulletproof Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;

            if (targetElement) {
                // Get position relative to the viewport
                const elementPosition = targetElement.getBoundingClientRect().top;
                // Add the current scroll position and subtract the header height
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Typing Animation Logic ---
    const textElement = document.getElementById('typing-text');
    const professionText = "Precision Engineered Fastening Solutions";
    let index = 0;

    function typeEffect() {
        if (index < professionText.length) {
            textElement.innerHTML += professionText.charAt(index);
            index++;
            setTimeout(typeEffect, 50); // Adjust typing speed here (ms)
        }
    }

    // Start typing after a short delay
    setTimeout(typeEffect, 500);

    // --- Hamburger Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        
        // Optional: Animate the bars into an 'X'
        menuToggle.classList.toggle('is-active');
    });

    // Close the menu automatically when a link is clicked
    document.querySelectorAll('#nav-list li a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });

    // --- Close Menu When Clicking Outside ---
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navList.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);

        // If the menu is open AND the click was NOT on the menu or the toggle button
        if (navList.classList.contains('active') && !isClickInsideMenu && !isClickOnToggle) {
            navList.classList.remove('active');
            menuToggle.classList.remove('is-active'); // Resets the 'X' back to 3 lines
        }
    });

    // Close the menu automatically when a link is clicked
    document.querySelectorAll('#nav-list li a').forEach(link => {
        link.addEventListener('click', () => {
            // 1. Hide the menu list
            navList.classList.remove('active');
            
            // 2. Reset the Hamburger Icon (Change X back to 3 lines)
            menuToggle.classList.remove('is-active'); 
        });
    });

    // --- Close Menu When Scrolling ---
    window.addEventListener('scroll', () => {
        // We check if the menu is currently active
        if (navList.classList.contains('active')) {
            // Check if the user has scrolled more than a tiny bit (e.g., 20px)
            // This prevents the menu from closing if there's just a tiny accidental vibration
            navList.classList.remove('active');
            menuToggle.classList.remove('is-active'); // Resets the 'X' back to 3 lines
        }
    });

    // 2. Back to Top Button
    const topBtn = document.createElement('button');
    topBtn.innerHTML = '↑';
    topBtn.id = 'backToTop';
    document.body.appendChild(topBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            topBtn.style.opacity = "1";
            topBtn.style.display = "block";
        } else {
            topBtn.style.opacity = "0";
            topBtn.style.display = "none";
        }
    });

    topBtn.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});

        // --- Animated Counter Logic ---
    const startCounters = () => {
        const counters = document.querySelectorAll('.counter');
        const speed = 500; // Lower is slower

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    // Round up for integers, or use toFixed(1) if you want decimals
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // --- Watch for the section to enter view ---
    const counterSection = document.querySelector('#financials'); // Make sure this matches your ID
    if (counterSection) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(entry.target); // Stops it from re-counting every time you scroll up/down
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(counterSection);
    }

    // 3. Initialize Charts (Graphs)
    const revCanvas = document.getElementById('revenueChart');
    if (revCanvas) {
        new Chart(revCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['FY21', 'FY22', 'FY23', 'FY24', 'FY25'],
                datasets: [{
                    label: 'Revenue (INR Cr)',
                    data: [14.6, 15.8, 16.4, 17.5, 19.4],
                    borderColor: '#fbbf24',
                    backgroundColor: 'rgba(251, 191, 36, 0.1)',
                    fill: true,
                    tension: 0.3
                }]
            }
        });
    }

    const ratCanvas = document.getElementById('ratioChart');
    if (ratCanvas) {
        new Chart(ratCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['EBITDA Margin', 'Net Profit Margin'],
                datasets: [{
                    label: 'Percentage (%)',
                    data: [23, 12],
                    backgroundColor: ['#0f172a', '#fbbf24']
                }]
            }
        });
    }

    // This should already be in your script.js from our previous steps
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });

    // 4. Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

            }
        });
    }, { 
        threshold: 0.15, // Trigger when only 15% of the section is visible
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before it hits the viewport
    });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });
});