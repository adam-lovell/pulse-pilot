document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Logic ---
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-slate-900/90', 'backdrop-blur-md', 'shadow-lg', 'py-2');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.remove('bg-slate-900/90', 'backdrop-blur-md', 'shadow-lg', 'py-2');
            navbar.classList.add('py-4');
        }
    });

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    });

    // Close mobile menu on link click
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Count Up Animation ---
    const stats = document.querySelectorAll('.count-up');
    let hasAnimatedStats = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedStats) {
                hasAnimatedStats = true;
                stats.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
                    const duration = 2000; // ms
                    const increment = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    const updateCount = () => {
                        current += increment;
                        if (current < target) {
                            stat.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCount);
                        } else {
                            stat.innerText = target;
                        }
                    };
                    updateCount();
                });
            }
        });
    }, { threshold: 0.5 });

    const impactSection = document.getElementById('impact');
    if (impactSection) statsObserver.observe(impactSection);

    // --- Parallax Effect ---
    const heroBg = document.querySelector('.parallax-bg');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });

    // --- Modal Logic ---
    const modal = document.getElementById('modal');
    const downloadBtn = document.getElementById('download-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const modalContent = document.getElementById('modal-content');

    const openModal = () => {
        modal.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 10);
    };

    const closeModal = () => {
        modal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    };

    downloadBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // --- Form & Toast Logic ---
    const form = document.getElementById('lead-form');
    const toast = document.getElementById('toast');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        localStorage.setItem('pulsepilot_lead', email);
        
        // Show Toast
        toast.classList.remove('translate-y-20', 'opacity-0');
        form.reset();
        
        setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
        }, 3000);
    });

    // --- Back to Top ---
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.remove('translate-y-20', 'opacity-0');
        } else {
            backToTopBtn.classList.add('translate-y-20', 'opacity-0');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});