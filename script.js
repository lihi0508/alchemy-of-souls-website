document.addEventListener('DOMContentLoaded', () => {
    // 1. Sword Slice Loader Animation
    const loader = document.getElementById('loader');
    if(loader) {
        setTimeout(() => {
            loader.classList.add('slice-active');
            setTimeout(() => {
                loader.classList.add('slice-open');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800); // Wait for panels to slide out
            }, 400); // Length of slice animation
        }, 300); // Initial delay
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 3. Ambient Particles (Only for non-home pages)
    const particlesContainer = document.getElementById('particles');
    if(particlesContainer) {
        for(let i=0; i<40; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 10 + 6}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particlesContainer.appendChild(particle);
        }
    }

    // 4. Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.episode-card, .cast-card, .more-content, .ost-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${Math.min(index * 0.05, 0.5)}s`;
        observer.observe(el);
    });

    // 5. 3D Tilt Effect for Hero Card (Index page only)
    const tiltCard = document.querySelector('.js-tilt');
    if (tiltCard) {
        tiltCard.addEventListener('mousemove', (e) => {
            const rect = tiltCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15; 
            const rotateY = ((x - centerX) / centerX) * 15;
            
            tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            const glow = tiltCard.querySelector('.card-glow');
            if(glow) {
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.25), transparent 60%)`;
            }
        });
        
        tiltCard.addEventListener('mouseleave', () => {
            tiltCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            const glow = tiltCard.querySelector('.card-glow');
            if(glow) {
                glow.style.background = `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 60%)`;
            }
        });
    }
});
