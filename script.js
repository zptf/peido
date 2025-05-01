document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Copy script functionality
    const copyBtn = document.getElementById('copy-btn');
    const scriptCode = document.getElementById('script-code');
    const copyNotification = document.getElementById('copy-notification');
    
    if (copyBtn && scriptCode) {
        copyBtn.addEventListener('click', function() {
            // Select the script text
            const range = document.createRange();
            range.selectNode(scriptCode);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            
            try {
                // Execute copy command
                const successful = document.execCommand('copy');
                if (successful) {
                    // Show notification
                    copyNotification.classList.add('show');
                    setTimeout(() => {
                        copyNotification.classList.remove('show');
                    }, 2000);
                }
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
            
            // Deselect text
            window.getSelection().removeAllRanges();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add your actual script content to the pre element
    const scriptContent = `loadstring(game:HttpGet("https://raw.githubusercontent.com/zptf/peido/refs/heads/main/main.lua"))()`;
    if (scriptCode) {
        scriptCode.textContent = scriptContent;
    }
});