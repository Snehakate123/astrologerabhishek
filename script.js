// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Check if the target element exists before trying to scroll
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        } else {
            console.warn(`Could not find element with ID: ${targetId}`);
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Book Appointment Button
const bookAppointmentButton = document.querySelector('.book-appointment');

if (bookAppointmentButton) {
    bookAppointmentButton.addEventListener('click', () => {
    // You can replace this with your actual booking logic
    const phoneNumber = '+918971474507';
    window.location.href = `tel:${phoneNumber}`;
});
}

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .about-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if(elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Mobile menu toggle
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    const menuButton = document.createElement('button');
    menuButton.classList.add('mobile-menu-button');
    menuButton.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    navbar.insertBefore(menuButton, navLinks);
    
    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuButton.classList.toggle('active');
    });
};

// Initialize mobile menu on load
document.addEventListener('DOMContentLoaded', createMobileMenu);

// Form validation for contact form (if added later)
const validateForm = (formElement) => {
    const inputs = formElement.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
        
        if (input.type === 'email') {
            const emailRegex = /^[\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.classList.add('error');
            }
        }
    });
    
    return isValid;
};

// Add loading state to buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('book-appointment')) {
            this.classList.add('loading');
            // Remove loading state after action completes
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        } else if (this.type === 'submit') { // Add loading state to submit buttons
             this.classList.add('loading');
             // Loading state will be removed after form submission logic completes
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
// Modal functionality
const modal = document.getElementById('pdfModal');
const closeBtn = document.querySelector('.close-modal');
const downloadForm = document.getElementById('pdfDownloadForm');

if (modal && closeBtn && downloadForm) {
    function openPdfModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closePdfModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePdfModal();
        }
    });

    // Close modal when clicking close button
    closeBtn.addEventListener('click', closePdfModal);

    // Handle form submission
    downloadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you can add your form submission logic
        // For example, send the data to your server and trigger the PDF download
        alert('Thank you! Your download will begin shortly.');
        closePdfModal();
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closePdfModal();
        }
    });
}

// Kundali Matching Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const kundaliForm = document.getElementById('kundali-matching-form-element');
    const resultsSection = document.getElementById('kundali-matching-results');
    const compatibilityAnalysisDiv = document.getElementById('compatibility-analysis');
    const scoreBoardDiv = document.querySelector('.score-board'); // Get the score board div
    const submitButton = kundaliForm ? kundaliForm.querySelector('button[type=\"submit\"]') : null; // Get the submit button

    if (kundaliForm) {
        console.log('Kundali Matching form found.'); // Log when form is found
        kundaliForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted.'); // Log when form is submitted
            
            // Get form data
            const partner1 = {
                name: document.getElementById('partner1-name').value,
                dob: document.getElementById('partner1-dob').value,
                time: document.getElementById('partner1-tob').value,
                place: document.getElementById('partner1-pob').value
            };
            
            const partner2 = {
                name: document.getElementById('partner2-name').value,
                dob: document.getElementById('partner2-dob').value,
                time: document.getElementById('partner2-tob').value,
                place: document.getElementById('partner2-pob').value
            };

            console.log('Partner 1 data:', partner1); // Log partner 1 data
            console.log('Partner 2 data:', partner2); // Log partner 2 data

            // Calculate compatibility using the provided ASCII sum method
            const compatibilityScore = calculateCompatibility(partner1, partner2);

            console.log('Compatibility Score:', compatibilityScore); // Log the calculated score

            // Hide the Guna score board
            if (scoreBoardDiv) {
                scoreBoardDiv.style.display = 'none';
            }

            // Update the UI with the result
            compatibilityAnalysisDiv.innerText = 
                `💖 Compatibility between ${partner1.name} and ${partner2.name} is: ${compatibilityScore}% 💖`;

            // Show the results section
            resultsSection.style.display = 'block';

            // Scroll to the results section
            resultsSection.scrollIntoView({ behavior: 'smooth' });

            // Remove loading state from submit button
            if (submitButton) {
                submitButton.classList.remove('loading');
            }
        });
    } else {
        console.log('Kundali Matching form element not found.'); // Log if form is not found
    }

    // Provided function to get ASCII sum of a string
    function getAsciiSum(str) {
        let sum = 0;
        for (let i = 0; i < str.length; i++) {
            sum += str.charCodeAt(i);
        }
        return sum;
    }

    // Provided function to calculate compatibility based on ASCII sums
    function calculateCompatibility(partner1, partner2) {
        let sum1 = getAsciiSum(partner1.name + partner1.dob + partner1.time + partner1.place);
        let sum2 = getAsciiSum(partner2.name + partner2.dob + partner2.time + partner2.place);
        const diff = Math.abs(sum1 - sum2);
        const compatibility = 100 - (diff % 100);
        return compatibility;
    }
});

// Add checks for image elements that might not exist on all pages
document.addEventListener('DOMContentLoaded', function() {
    const dmcaBadge = document.querySelector('.dmca-badge img');
    if (dmcaBadge) {
        // You might want to verify the src here if it's a common issue
        console.log('DMCA badge image found.');
    } else {
        console.log('DMCA badge element not found on this page.');
    }

    const whatsappChatImg = document.querySelector('.whatsapp-chat img');
    if (whatsappChatImg) {
         // Check if the data URL is valid if needed, though it seems standard
         console.log('WhatsApp chat image found.');
    } else {
        console.log('WhatsApp chat element not found on this page.');
    }
});

// Placeholder functions for calculations - REPLACE THESE with your actual logic
function calculateVarnaScore(partner1, partner2) {
    // Your calculation logic here
    console.log('Calculating Varna for', partner1.name, 'and', partner2.name);
    return Math.floor(Math.random() * 2); // Placeholder: Returns 0 or 1
}

function calculateVashyaScore(partner1, partner2) {
    // Your calculation logic here
    console.log('Calculating Vashya for', partner1.name, 'and', partner2.name);
    return Math.floor(Math.random() * 2); // Placeholder: Returns 0, 1, or 2
}

function calculateTaraScore(partner1, partner2) {
    // Your calculation logic here
    console.log('Calculating Tara for', partner1.name, 'and', partner2.name);
    return Math.floor(Math.random() * 4); // Placeholder: Returns 0, 1, 2, or 3
}

function calculateYoniScore(partner1, partner2) {
    // Your calculation logic here
    console.log('Calculating Yoni for', partner1.name, 'and', partner2.name);
    return Math.floor(Math.random() * 4); // Placeholder: Returns 0, 1, 2, 3, or 4
}

function calculateGrahaMaitriScore(partner1, partner2) {
    // Your calculation logic here
    console.log('Calculating Graha Maitri for', partner1.name, 'and', partner2.name);
    return Math.floor(Math.random() * 6); // Placeholder: Returns 0 to 5
}

function calculateGanaScore(partner1, partner2) {
    // Your calculation logic here
    console.log('Calculating Gana for', partner1.name, 'and', partner2.name);
    return Math.floor(Math.random() * 7); // Placeholder: Returns 0 to 6
}

function calculateBhakootScore(partner1, partner2) {
    // Your calculation logic here
    console.log('Calculating Bhakoot for', partner1.name, 'and', partner2.name);
    return Math.floor(Math.random() * 8); // Placeholder: Returns 0 to 7
}

function calculateNadiScore(partner1, partner2) {
    // Your calculation logic here
    console.log('Calculating Nadi for', partner1.name, 'and', partner2.name);
    return Math.floor(Math.random() * 9); // Placeholder: Returns 0 to 8
}

// Placeholder function for analysis text - Customize this based on actual scores
function generateAnalysisText(scores, totalScore, maxScore) {
    const percentage = (totalScore / maxScore) * 100;

    let analysis = `Based on the compatibility factors (Gunas) calculated, the total score is ${totalScore} out of ${maxScore}.\n\n`;

    if (percentage >= 70) {
        analysis += "This indicates a very strong compatibility between the partners. The Gunas are aligning favorably for a harmonious relationship. However, it's always recommended to consult with an experienced astrologer for a detailed analysis.";
    } else if (percentage >= 50) {
        analysis += "The compatibility score is moderate. While there are some favorable aspects, there might be areas that require understanding and adjustment. A detailed astrological consultation can provide deeper insights.";
    } else if (percentage >= 30) {
        analysis += "The compatibility score is on the lower side. There might be significant differences or challenges indicated by the Gunas. It is strongly advised to seek guidance from an expert astrologer to understand these challenges and potential remedies.";
    } else {
        analysis += "The compatibility score is low. This suggests potential significant incompatibilities according to Vedic astrology. Consulting with an experienced astrologer is highly recommended before proceeding.";
    }

    analysis += "\n\nPlease note that this is a basic compatibility check based on Gunas. A complete Kundali matching involves a deeper analysis of planetary positions, doshas, and other astrological factors. For a personalized and comprehensive compatibility report, please consider ordering a Premium Personalised Kundali Matching service from Astrologer Abhishek.";

    return analysis;
}


// --- Placeholder for Nakshatra Calculation Logic ---
// You would use the 'name', 'dob', 'tob', and 'pob' variables here
// to calculate the Nakshatra based on astrological principles.
// This typically involves complex calculations based on planetary positions
// at the time and place of birth.
// For now, we'll use a placeholder result.
const calculatedNakshatra = "Calculated Nakshatra Goes Here"; // Replace with actual calculation
// ------------------------------------------------------- 
});

// Kundali Matching Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const kundaliForm = document.getElementById('kundali-matching-form-element');
    const resultsSection = document.getElementById('kundali-matching-results');
    const compatibilityAnalysisDiv = document.getElementById('compatibility-analysis');
    const scoreBoardDiv = document.querySelector('.score-board'); // Get the score board div
    const submitButton = kundaliForm ? kundaliForm.querySelector('button[type=\"submit\"]') : null; // Get the submit button

    if (kundaliForm) {
        console.log('Kundali Matching form found.'); // Log when form is found
        kundaliForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted.'); // Log when form is submitted
            
            // Get form data
            const partner1 = {
                name: document.getElementById('partner1-name').value,
                dob: document.getElementById('partner1-dob').value,
                time: document.getElementById('partner1-tob').value,
                place: document.getElementById('partner1-pob').value
            };
            
            const partner2 = {
                name: document.getElementById('partner2-name').value,
                dob: document.getElementById('partner2-dob').value,
                time: document.getElementById('partner2-tob').value,
                place: document.getElementById('partner2-pob').value
            };

            console.log('Partner 1 data:', partner1); // Log partner 1 data
            console.log('Partner 2 data:', partner2); // Log partner 2 data

            // Calculate compatibility using the provided ASCII sum method
            const compatibilityScore = calculateCompatibility(partner1, partner2);

            console.log('Compatibility Score:', compatibilityScore); // Log the calculated score

            // Hide the Guna score board
            if (scoreBoardDiv) {
                scoreBoardDiv.style.display = 'none';
            }

            // Update the UI with the result
            compatibilityAnalysisDiv.innerText = 
                `💖 Compatibility between ${partner1.name} and ${partner2.name} is: ${compatibilityScore}% 💖`;

            // Show the results section
            resultsSection.style.display = 'block';

            // Scroll to the results section
            resultsSection.scrollIntoView({ behavior: 'smooth' });

            // Remove loading state from submit button
            if (submitButton) {
                submitButton.classList.remove('loading');
            }
        });
    } else {
        console.log('Kundali Matching form element not found.'); // Log if form is not found
    }

    // Provided function to get ASCII sum of a string
    function getAsciiSum(str) {
        let sum = 0;
        for (let i = 0; i < str.length; i++) {
            sum += str.charCodeAt(i);
        }
        return sum;
    }

    // Provided function to calculate compatibility based on ASCII sums
    function calculateCompatibility(partner1, partner2) {
        let sum1 = getAsciiSum(partner1.name + partner1.dob + partner1.time + partner1.place);
        let sum2 = getAsciiSum(partner2.name + partner2.dob + partner2.time + partner2.place);
        const diff = Math.abs(sum1 - sum2);
        const compatibility = 100 - (diff % 100);
        return compatibility;
    }
}); 

const clientId = 'YOUR_CLIENT_ID'; // Replace with your actual Client ID
const clientSecret = 'YOUR_CLIENT_SECRET'; // Replace with your actual Client Secret

async function getNakshatra(name, dob, tob, pob) {
    // Replace 'YOUR_GEONAMES_USERNAME' and 'YOUR_ACCESS_TOKEN' with your actual credentials
    const geoNamesUsername = 'mygeonamesuser123'; // <<< Your actual GeoNames username
    const prokeralaAccessToken = 'abcdef1234567890'; // <<< Your actual Prokerala access token

    try {
        // 1. Get coordinates from POB using GeoNames
        const geoResponse = await fetch(`https://secure.geonames.org/searchJSON?q=${encodeURIComponent(pob)}&maxRows=1&username=${geoNamesUsername}`);
        const geoData = await geoResponse.json();

        if (!geoData.geonames || geoData.geonames.length === 0) {
            console.error("Could not get coordinates for the given place of birth:", pob);
            document.getElementById("nakshatra-output").innerText = "Error: Could not find location for Place of Birth. Please check the input.";
            return;
        }

        const { lat, lng } = geoData.geonames[0];

        // 2. Get Nakshatra from Prokerala API
        const response = await fetch('https://api.prokerala.com/v2/astrology/nakshatra', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${prokeralaAccessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                datetime: `${dob}T${tob}:00+05:30`, // Assuming IST timezone (+05:30) and adding seconds
                coordinates: {
                    latitude: lat,
                    longitude: lng
                },
                timezone: "Asia/Kolkata" // Explicitly set timezone
            })
        });

        const data = await response.json();

        if (!data.data || !data.data.nakshatra || !data.data.nakshatra.name) {
             console.error("Could not get Nakshatra from API:", data);
             document.getElementById("nakshatra-output").innerText = "Error: Could not calculate Nakshatra using the provided details.";
             return;
        }

        const nakshatra = data.data.nakshatra.name;

        // Display the result
        document.getElementById("nakshatra-output").innerText = `Your Nakshatra: ${nakshatra}`;

    } catch (error) {
        console.error("An error occurred during Nakshatra calculation:", error);
        document.getElementById("nakshatra-output").innerText = "An unexpected error occurred during calculation.";
    }
} 
