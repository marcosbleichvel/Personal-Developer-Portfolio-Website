// Portfolio Website JavaScript
class PortfolioWebsite {
    constructor() {
        this.currentFilter = 'all';
        this.chatOpen = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.setupFormHandling();
        this.setupPortfolioFiltering();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupActiveNavigation();
        this.setupProjectButtons();
        this.setupPricingButtons();
        this.setupPricingTabs();
        this.setupAIChat();
    }

    setupEventListeners() {
        // Navigation links with smooth scrolling
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    this.smoothScrollTo(target);
                }
            });
        });

        // Portfolio filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterPortfolio(btn.dataset.filter);
                this.updateActiveFilter(btn);
            });
        });

        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(e.target);
            });
        }

        // Hero CTA buttons
        document.querySelectorAll('.hero-cta .btn-primary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToContact();
            });
        });

        document.querySelectorAll('.hero-cta .btn-secondary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToPortfolio();
            });
        });

        // Service CTA buttons
        document.querySelectorAll('.service-actions .btn-primary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToContact();
            });
        });

        document.querySelectorAll('.service-actions .btn-outline').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToPortfolio();
            });
        });
    }

    setupProjectButtons() {
        // Project buttons - Ver Projeto (Opens link)
        document.querySelectorAll('.portfolio-actions .btn-primary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectPath = btn.getAttribute('data-project');
                if (projectPath) {
                    window.open(projectPath, '_blank');
                }
            });
        });

        // Project buttons - Detalhes (Scrolls to contact)
        document.querySelectorAll('.portfolio-actions .btn-outline').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToContact();
            });
        });
    }

    setupPricingButtons() {
        // All pricing card buttons now scroll to the contact section
        document.querySelectorAll('.pricing-card .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToContact();
            });
        });
    }

    setupPricingTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.pricing-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');

                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                btn.classList.add('active');
                document.getElementById(`${targetTab}-tab`).classList.add('active');
            });
        });
    }

    setupAIChat() {
        const chatToggle = document.querySelector('.chat-toggle');
        if (chatToggle) {
            chatToggle.addEventListener('click', () => this.toggleChat());
        }

        const chatClose = document.querySelector('.chat-close');
        if (chatClose) {
            chatClose.addEventListener('click', () => this.toggleChat());
        }

        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendChatMessage();
            });
        }

        const chatSendBtn = document.querySelector('.chat-input button');
        if (chatSendBtn) {
            chatSendBtn.addEventListener('click', () => this.sendChatMessage());
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    setupActiveNavigation() {
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card').forEach(el => {
            observer.observe(el);
        });
    }

    setupFormHandling() {
        document.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('focus', () => field.parentElement.classList.add('focused'));
            field.addEventListener('blur', () => {
                if (!field.value) field.parentElement.classList.remove('focused');
            });
        });
    }

    setupPortfolioFiltering() {
        this.filterPortfolio('all');
    }

    setupMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }
    }

    setupScrollEffects() {
        let lastScroll = 0;
        const header = document.querySelector('.header');
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        });
    }

    smoothScrollTo(element) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        const elementPosition = element.offsetTop - headerHeight - 20;
        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }

    scrollToContact() {
        const contact = document.getElementById('contact');
        if (contact) {
            contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    scrollToPortfolio() {
        const portfolio = document.getElementById('portfolio');
        if (portfolio) {
            portfolio.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    filterPortfolio(filter) {
        this.currentFilter = filter;
        const items = document.querySelectorAll('.portfolio-item');
        items.forEach(item => {
            const category = item.dataset.category;
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        this.updateActiveFilter(document.querySelector(`.filter-btn[data-filter="${filter}"]`));
    }

    updateActiveFilter(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    async handleContactForm(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        if (!this.validateForm(form)) {
            this.showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Enviando...';
        submitBtn.disabled = true;

        try {
            await this.simulateApiCall();
            this.showNotification('Mensagem enviada com sucesso!', 'success');
            form.reset();
        } catch (error) {
            this.showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    validateForm(form) {
        let isValid = true;
        form.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });
        return isValid;
    }

    simulateApiCall() {
        return new Promise(resolve => setTimeout(resolve, 1500));
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} show`;
        notification.innerHTML = `<span>${message}</span>`;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 4000);
    }

    toggleChat() {
        const chatContainer = document.getElementById('chatContainer');
        this.chatOpen = !this.chatOpen;
        chatContainer.classList.toggle('active', this.chatOpen);
    }

    sendChatMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        if (message) {
            this.addChatMessage(message, 'user');
            input.value = '';
            setTimeout(() => {
                const aiResponse = this.generateAIResponse(message);
                this.addChatMessage(aiResponse, 'bot');
            }, 1000);
        }
    }

    addChatMessage(text, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<div class="message-content"><p>${text}</p></div>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        if (message.includes('preço') || message.includes('valor')) {
            return 'Os preços variam conforme o projeto. Para um orçamento preciso, por favor, envie uma mensagem pelo formulário de contato.';
        }
        if (message.includes('tempo') || message.includes('prazo')) {
            return 'Um site simples leva cerca de 7-10 dias, enquanto projetos de e-commerce podem levar de 14 a 21 dias.';
        }
        if (message.includes('e-commerce') || message.includes('loja')) {
            return 'Sim, desenvolvo lojas virtuais completas com sistemas de pagamento, carrinho e gerenciamento de produtos.';
        }
        return 'Obrigado pela sua pergunta! Para detalhes específicos, por favor, utilize o formulário de contato. Terei prazer em ajudar.';
    }
}

// Inject notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--dark-surface);
        border-left: 4px solid var(--primary-color);
        border-radius: var(--border-radius);
        padding: 1rem;
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        transform: translateX(120%);
        transition: transform 0.3s ease;
    }
    .notification.show { transform: translateX(0); }
    .notification.notification-success { border-left-color: var(--secondary-color); }
    .notification.notification-error { border-left-color: #ef4444; }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);


// Initialize the website once the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.portfolioWebsite = new PortfolioWebsite();
});