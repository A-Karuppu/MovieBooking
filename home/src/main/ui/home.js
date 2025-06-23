const searchInput = document.querySelector('.search-input');
const navLinks = document.querySelectorAll('.nav-link');
const signInBtn = document.querySelector('.sign-in-btn');
const menuBtn = document.querySelector('.menu-btn');
const backArrow = document.querySelector('.back-arrow');
const clapperboard = document.querySelector('.clapperboard');
const playButton = document.querySelector('.play-button');

searchInput.addEventListener('focus', function() {
    this.style.borderColor = '#e53e3e';
    this.style.boxShadow = '0 0 0 3px rgba(229, 62, 62, 0.1)';
});

searchInput.addEventListener('blur', function() {
    this.style.borderColor = '#ddd';
    this.style.boxShadow = 'none';
});

searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    if (query.length > 0) {
        console.log('Searching for:', query);
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        console.log('Navigation clicked:', this.textContent);
    });
});

signInBtn.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
    alert('Sign In functionality would be implemented here!');
});

menuBtn.addEventListener('click', function() {
    this.style.transform = 'rotate(90deg)';
    setTimeout(() => {
        this.style.transform = 'rotate(0deg)';
    }, 300);
    console.log('Menu button clicked');
});

backArrow.addEventListener('click', function() {
    this.style.transform = 'translateX(-5px)';
    setTimeout(() => {
        this.style.transform = 'translateX(0)';
    }, 200);
    console.log('Back button clicked');
});

clapperboard.addEventListener('click', function() {
    const clapperTop = this.querySelector('.clapper-top');
    clapperTop.style.transform = 'rotateX(-30deg)';
    clapperTop.style.transformOrigin = 'bottom';
    setTimeout(() => {
        clapperTop.style.transform = 'rotateX(0deg)';
    }, 300);
    playButton.style.transform = 'scale(1.2)';
    playButton.style.color = '#ffff00';
    setTimeout(() => {
        playButton.style.transform = 'scale(1)';
        playButton.style.color = 'white';
    }, 300);
    console.log('Clapperboard clicked - Play movie trailer!');
});

const cinemaElements = document.querySelectorAll('.popcorn, .film-reel, .movie-tickets, .clapperboard');

cinemaElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform += ' scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });

    element.addEventListener('mouseleave', function() {
        if (this.classList.contains('film-reel')) {
            this.style.transform = 'scale(1)';
        } else if (this.classList.contains('clapperboard')) {
            this.style.transform = 'rotate(-10deg) scale(1)';
        } else {
            this.style.transform = 'scale(1)';
        }
    });
});

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const floatingKernels = document.querySelectorAll('.floating-kernel');
    floatingKernels.forEach((kernel, index) => {
        const speed = 0.5 + (index * 0.1);
        kernel.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

function addTwinkle() {
    const floatingKernels = document.querySelectorAll('.floating-kernel');
    floatingKernels.forEach(kernel => {
        if (Math.random() > 0.8) {
            kernel.style.opacity = '0.3';
            setTimeout(() => {
                kernel.style.opacity = '0.8';
            }, 200);
        }
    });
}
setInterval(addTwinkle, 2000);

function popPopcorn() {
    const kernels = document.querySelectorAll('.popcorn .kernel');
    kernels.forEach((kernel, index) => {
        setTimeout(() => {
            kernel.style.transform += ' translateY(-10px)';
            setTimeout(() => {
                kernel.style.transform = kernel.style.transform.replace(' translateY(-10px)', '');
            }, 300);
        }, index * 100);
    });
}
setInterval(popPopcorn, 5000);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('load', function() {
    const hero = document.querySelector('.hero');
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(20px)';
    setTimeout(() => {
        hero.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }, 100);
});

console.log('🎬 Welcome to BookMyTicket! 🍿');
console.log('Ready to book your next movie adventure!');

function initTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    elements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                pointer-events: none;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(tooltip);
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - 35) + 'px';
            setTimeout(() => tooltip.style.opacity = '1', 10);
            this.tooltipElement = tooltip;
        });
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', initTooltips);
