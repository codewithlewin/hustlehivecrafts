document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContent = document.querySelector('.category-info');
    const iconPlaceholder = document.querySelector('.icon-placeholder');

    const contentData = {
        magnets: {
            icon: '✨',
            title: 'Mini Art Fridge Magnets',
            text: 'Personalize your space with our curated collection of handmade magnets. From minimalist designs to playful characters, find the perfect companion for your fridge or workspace.'
        },
        candles: {
            icon: '🕯️',
            title: 'Decor Candles',
            text: 'Hand-poured soy wax candles with premium essential oils. Each candle is designed to create a calming atmosphere and fill your home with delightful, natural fragrances.'
        },
        toys: {
            icon: '🧸',
            title: 'Build & Create Toy Kits',
            text: 'Ignite your imagination with our unique DIY toy kits. Perfect for all ages, these sets provide everything you need to build and decorate your very own handmade playmates.'
        }
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');
            
            // 1. Update category info block (if it exists - Home Page)
            if (tabContent && contentData[category]) {
                const data = contentData[category];
                tabContent.style.opacity = '0';
                setTimeout(() => {
                    if (iconPlaceholder) iconPlaceholder.textContent = data.icon;
                    if (tabContent.querySelector('h3')) tabContent.querySelector('h3').textContent = data.title;
                    if (tabContent.querySelector('p')) tabContent.querySelector('p').textContent = data.text;
                    tabContent.style.opacity = '1';
                    tabContent.style.transition = 'opacity 0.3s ease';
                }, 300);
            }

            // 2. Filter products in grid
            const products = document.querySelectorAll('.product-card');
            products.forEach(product => {
                const productCategory = product.getAttribute('data-category');
                
                if (category === 'all' || productCategory === category) {
                    product.style.display = 'block';
                    // Trigger reveal animation
                    setTimeout(() => {
                        product.style.opacity = '1';
                        product.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    product.style.opacity = '0';
                    product.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        product.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Simple scroll reveal
    const revealOnScroll = () => {
        const elements = document.querySelectorAll('.product-card, .glass, .hero-content');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            if (isVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.transition = 'all 0.8s ease-out';
            }
        });
    };

    // Initial styles for reveal
    document.querySelectorAll('.product-card, .glass').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('open')) {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
            }
        });
    }

    // Initialize default category filter
    const activeBtn = document.querySelector('.tab-btn.active');
    if (activeBtn) {
        activeBtn.click();
    }
});
