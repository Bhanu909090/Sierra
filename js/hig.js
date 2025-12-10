// Sierra Highlights Counter Animation
(function () {
    // Format number with commas
    function sierraFormatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Easing function for smooth animation
    function sierraEaseOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    // Animated counter function with upward effect
    function sierraAnimateCounter(element, target, duration) {
        duration = duration || 2000;
        const startTime = performance.now();
        element.classList.add('sierra-animated');

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easedProgress = sierraEaseOutExpo(progress);
            const current = Math.floor(easedProgress * target);

            element.textContent = sierraFormatNumber(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = sierraFormatNumber(target);
            }
        }

        requestAnimationFrame(update);
    }

    // Intersection Observer to trigger animation when in viewport
    const sierraObserverOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const sierraObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.sierra-counter');
                counters.forEach(function (counter, index) {
                    if (!counter.classList.contains('sierra-counted')) {
                        counter.classList.add('sierra-counted');
                        const target = parseInt(counter.getAttribute('data-sierra-target'));
                        // Stagger the animations slightly
                        setTimeout(function () {
                            sierraAnimateCounter(counter, target, 2000);
                        }, index * 150);
                    }
                });
            }
        });
    }, sierraObserverOptions);

    // Observe the highlights section when DOM is ready
    function initSierraHighlights() {
        const sierraHighlightsSection = document.querySelector('.sierra-highlights-section');
        if (sierraHighlightsSection) {
            sierraObserver.observe(sierraHighlightsSection);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSierraHighlights);
    } else {
        initSierraHighlights();
    }
})();