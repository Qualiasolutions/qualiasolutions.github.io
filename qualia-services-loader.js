/**
 * Qualia AI Services Section Loader
 * This script dynamically loads the necessary CSS and JS for the Qualia AI Services section
 * For use in Squarespace as an embedded script
 */

(function() {
    // Configuration
    const config = {
        // Base URL where your assets are hosted - update with your actual hosting URL
        baseURL: 'https://cdn.example.com/qualia-agents/', // Update this to your actual hosting URL
        
        // Assets to load
        css: 'styles.css',
        js: 'qualia-services-embed.js',
        
        // Target where to mount the component
        mountTarget: '#qualia-services-mount',
        
        // Default options
        options: {
            formspreeEndpoints: {
                customerAssistant: 'https://formspree.io/f/xeoaqyyg',
                businessAgent: 'https://formspree.io/f/moveqggw',
                leadGeneration: 'https://formspree.io/f/xgvaeggz',
                businessAutomation: 'https://formspree.io/f/xpwpzvvj'
            },
            thankYouPage: 'https://qualiasolutions.net/thank-you',
            enableAnimations: true,
            loadFontAwesome: true
        }
    };

    // Function to load CSS
    function loadCSS(url) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            
            link.onload = () => resolve();
            link.onerror = () => reject(new Error(`Failed to load CSS: ${url}`));
            
            document.head.appendChild(link);
        });
    }

    // Function to load JavaScript
    function loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
            
            document.body.appendChild(script);
        });
    }

    // Function to check if Font Awesome is loaded, and load it if not
    function ensureFontAwesome() {
        if (config.options.loadFontAwesome && !document.querySelector('link[href*="font-awesome"]')) {
            return loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');
        }
        return Promise.resolve();
    }

    // Main initialization function
    async function init() {
        try {
            // Step 1: Create mount point if it doesn't exist
            if (!document.querySelector(config.mountTarget)) {
                const mountPoint = document.createElement('div');
                mountPoint.id = config.mountTarget.substring(1); // Remove # from the id
                document.querySelector('.sqs-block-content').appendChild(mountPoint);
            }

            // Step 2: Load Font Awesome if needed
            await ensureFontAwesome();
            
            // Step 3: Load CSS
            await loadCSS(`${config.baseURL}${config.css}`);
            
            // Step 4: Load JS
            await loadScript(`${config.baseURL}${config.js}`);
            
            // Step 5: Initialize once everything is loaded
            if (window.QualiaServicesEmbed && typeof window.QualiaServicesEmbed.init === 'function') {
                window.QualiaServicesEmbed.init(config.options);
                console.log('Qualia AI Services section successfully initialized');
            } else {
                console.error('Failed to initialize Qualia AI Services: Embed script not loaded correctly');
            }
        } catch (error) {
            console.error('Error initializing Qualia AI Services:', error);
        }
    }

    // Initialize when the document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
