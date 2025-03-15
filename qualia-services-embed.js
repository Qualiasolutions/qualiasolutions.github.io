/**
 * Qualia AI Services Embed Script
 * Main functionality for the interactive services section
 */

window.QualiaServicesEmbed = (function() {
    // Private variables
    let config = {
        formspreeEndpoints: {},
        thankYouPage: '',
        enableAnimations: true,
        loadFontAwesome: true
    };

    // Cache DOM elements
    let elements = {};

    // Demo responses for the chat assistant
    const chatResponses = {
        default: [
            "I'd be happy to help with that! What specific information would you like to know about our services?",
            "That's a great question! Our AI assistants are designed to integrate seamlessly with your existing systems.",
            "We can definitely help with that. Our solution can reduce response times by up to 70% while maintaining high customer satisfaction."
        ],
        services: [
            "At Qualia Solutions, we offer several AI-powered services including:<br>1. Customer Support AI<br>2. Business Process Automation<br>3. Lead Generation Agents<br>4. Custom AI Solutions<br>Which one would you like to learn more about?"
        ],
        pricing: [
            "Our pricing is customized based on your specific needs and business size. Plans typically start at €149/month for basic AI assistants, with enterprise solutions available. Would you like me to arrange a personalized quote for you?"
        ]
    };

    // HTML Templates
    const templates = {
        servicesSection: `
            <div class="ai-services-section section">
                <div class="bg-noise"></div>
                <div class="bg-gradient"></div>
                <div class="bg-grid"></div>
                <div class="container">
                    <div class="section-header">
                        <div class="section-subtitle">Our Services</div>
                        <h2 class="section-title">AI-Powered <span>Solutions</span></h2>
                        <p class="section-description">Choose the perfect AI solution for your specific business needs. Our intelligent agents and tools can help you automate processes, engage customers, and drive growth.</p>
                    </div>
                    <div class="services-grid">
                        <!-- Service cards will be injected here -->
                    </div>
                </div>
            </div>
        `,
        serviceCard: (service) => `
            <div class="service-card">
                <div class="service-header">
                    <div class="service-icon">
                        <i class="${service.icon}"></i>
                    </div>
                    <h3 class="service-title">${service.title}</h3>
                </div>
                <div class="service-body">
                    <p class="service-description">${service.description}</p>
                    <ul class="service-features">
                        ${service.features.map(feature => `
                            <li><i class="fas fa-check"></i> ${feature}</li>
                        `).join('')}
                    </ul>
                </div>
                <div class="service-footer">
                    <button class="service-demo-btn" data-demo="${service.demoId}">
                        <i class="fas fa-play"></i> Try Demo
                    </button>
                    <button class="service-action-btn" data-service="${service.id}">Get Started</button>
                </div>
            </div>
        `
    };

    // Service definitions
    const services = [
        {
            id: 'CustomerAssistant',
            title: 'Customer Assistant',
            icon: 'fas fa-comments',
            description: 'Provide immediate, helpful responses to customer inquiries 24/7, reducing wait times and scaling your support operations efficiently.',
            features: [
                'Instant responses to common questions',
                'Multi-channel support (Web, Social, Email, SMS)',
                'Seamless handoff to human agents when needed',
                'Personalized customer experiences',
                'Natural language understanding'
            ],
            demoId: 'chat-demo'
        },
        {
            id: 'BusinessAgent',
            title: 'Business Agent',
            icon: 'fas fa-briefcase',
            description: 'Create custom AI agents that integrate with your company\'s systems and data to provide 24/7 assistance for employees and stakeholders.',
            features: [
                'Knowledge base integration',
                'Document retrieval and analysis',
                'CRM and ERP system integration',
                'Meeting scheduling and management',
                'Custom reporting and insights'
            ],
            demoId: 'agent-demo'
        },
        {
            id: 'LeadGeneration',
            title: 'Lead Generation',
            icon: 'fas fa-user-plus',
            description: 'Increase conversion rates with AI agents that qualify leads, provide personalized recommendations, and guide prospects through the sales funnel.',
            features: [
                'Lead qualification and scoring',
                'Intelligent follow-up sequences',
                'Product recommendations',
                'Appointment scheduling',
                'CRM integration for lead tracking'
            ],
            demoId: 'lead-demo'
        },
        {
            id: 'BusinessAutomation',
            title: 'Business Automation',
            icon: 'fas fa-cogs',
            description: 'Streamline operations and reduce manual work with intelligent automation solutions that handle invoices, reporting, document processing, and more.',
            features: [
                'Intelligent document processing',
                'Automated invoice generation',
                'Data extraction and entry',
                'Workflow automation',
                'Custom reporting'
            ],
            demoId: 'automation-demo'
        }
    ];

    // Private methods
    function cacheElements() {
        elements = {
            mountPoint: document.querySelector('#qualia-services-mount'),
            modals: {},
            forms: {}
        };
    }

    function renderServices() {
        if (!elements.mountPoint) return;
        
        // Insert base template
        elements.mountPoint.innerHTML = templates.servicesSection;
        
        // Get services grid and insert service cards
        const servicesGrid = elements.mountPoint.querySelector('.services-grid');
        services.forEach(service => {
            servicesGrid.insertAdjacentHTML('beforeend', templates.serviceCard(service));
        });
    }

    function initializeEventListeners() {
        // Demo buttons
        document.querySelectorAll('.service-demo-btn').forEach(button => {
            button.addEventListener('click', handleDemoClick);
        });

        // Get Started buttons
        document.querySelectorAll('.service-action-btn').forEach(button => {
            button.addEventListener('click', handleGetStartedClick);
        });
    }

    function handleDemoClick(event) {
        const demoId = event.currentTarget.getAttribute('data-demo');
        switch(demoId) {
            case 'chat-demo':
                initializeChatDemo();
                break;
            case 'agent-demo':
                initializeAgentDemo();
                break;
            case 'lead-demo':
                initializeLeadDemo();
                break;
            case 'automation-demo':
                initializeAutomationDemo();
                break;
        }
    }

    function handleGetStartedClick(event) {
        const serviceId = event.currentTarget.getAttribute('data-service');
        openServiceRequestModal(serviceId);
    }

    // Demo initializers
    function initializeChatDemo() {
        // Chat demo initialization code
        console.log('Initializing chat demo...');
        // Implementation will go here
    }

    function initializeAgentDemo() {
        // Business agent demo initialization code
        console.log('Initializing business agent demo...');
        // Implementation will go here
    }

    function initializeLeadDemo() {
        // Lead generation demo initialization code
        console.log('Initializing lead generation demo...');
        // Implementation will go here
    }

    function initializeAutomationDemo() {
        // Business automation demo initialization code
        console.log('Initializing automation demo...');
        // Implementation will go here
    }

    function openServiceRequestModal(serviceId) {
        // Service request modal code
        console.log('Opening service request modal for:', serviceId);
        // Implementation will go here
    }

    // Performance optimizations
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Public API
    return {
        init: function(options = {}) {
            // Merge options with defaults
            config = { ...config, ...options };
            
            // Initialize the component
            cacheElements();
            renderServices();
            initializeEventListeners();
            
            // Return the public API
            return this;
        },
        
        // Public methods for external interaction
        refreshServices: function() {
            renderServices();
            return this;
        },
        
        updateConfig: function(newConfig) {
            config = { ...config, ...newConfig };
            return this;
        }
    };
})();
