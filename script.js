// Basic script structure - will add functionality later

document.addEventListener('DOMContentLoaded', () => {
    console.log('Happy Birthday Website loaded! 💖');

    // Check for mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Apply mobile optimizations if needed
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }

    // Initialize AOS (Animate on Scroll) with mobile optimization
    if (window.AOS) {
        AOS.init({
            duration: isMobile ? 600 : 800, // Faster animations on mobile
            easing: 'ease-in-out',
            once: true,
            startEvent: 'DOMContentLoaded',
            disable: window.innerWidth < 768 ? 'phone' : false
        });
    }

    // Initialize the intro animations
    initIntroAnimations();

    // Initialize confetti with reduced particle count for mobile
    initConfetti(isMobile);

    // Initialize balloons with mobile optimization
    initBalloons(isMobile);

    // Initialize smooth scrolling
    initSmoothScroll();

    // Initialize the photo box
    initPhotoBox();

    // Initialize the memory game with mobile optimization
    initMemoryGame();

    // Initialize the photo slider
    initPhotoSlider();

    // Initialize the letter reveal
    initLetterReveal();
    
    // Add swipe functionality for touch devices
    addSwipeSupport();
    
    // Add orientation change handling for better mobile experience
    window.addEventListener('orientationchange', handleOrientationChange);
});

// Add orientation change handler
function handleOrientationChange() {
    // Wait for the orientation change to finish
    setTimeout(() => {
        // Update slider properties
        const sliderContainer = document.querySelector('.slider-container');
        const sliderTrack = document.querySelector('.slider-track');
        
        if (sliderContainer && sliderTrack) {
            // Force reflow of slider elements
            const sliderItems = document.querySelectorAll('.slider-item');
            if (sliderItems.length > 0) {
                updateSliderPosition(0);
            }
        }
        
        // Adjust memory game layout if needed
        const gameContainer = document.querySelector('.memory-game');
        if (gameContainer) {
            // Force reflow of game elements
            const cardWidth = window.innerWidth < 480 ? '42%' : '';
            const cards = gameContainer.querySelectorAll('.memory-card');
            cards.forEach(card => {
                if (cardWidth) {
                    card.style.width = cardWidth;
                }
            });
        }
        
        // Re-initialize AOS
        if (window.AOS) {
            AOS.refresh();
        }
    }, 300);
}

// ------- INTRO ANIMATIONS SECTION --------
function initIntroAnimations() {
    // Create floating hearts
    createFloatingHearts();
    
    // Animate title text letter by letter
    animateLetterByLetter();
}

// Create floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    if (!heartsContainer) return;
    
    // Create 15 hearts with random positions and delays
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        
        // Set random position
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        
        // Set random size
        const size = 10 + Math.random() * 15;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        
        // Set random animation delay
        heart.style.animationDelay = `${Math.random() * 5}s`;
        
        heartsContainer.appendChild(heart);
    }
}

// Animate title text letter by letter
function animateLetterByLetter() {
    const titleElement = document.getElementById('animated-title');
    if (!titleElement) return;
    
    // Get the text but exclude the cake icon span
    const cakeIcon = titleElement.querySelector('.cake-icon');
    const birthdayText = titleElement.querySelector('.birthday-text');
    
    // Store original content
    const originalCake = cakeIcon ? cakeIcon.outerHTML : '';
    const originalBirthdayText = birthdayText ? birthdayText.outerHTML : '';
    
    // Get text without the spans
    let text = titleElement.textContent;
    titleElement.innerHTML = '';
    titleElement.style.opacity = '1'; // Make parent visible
    
    // Recreate the title with animated letters
    const parts = text.split(',');
    
    // Add first part
    Array.from(parts[0]).forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'letter-animate';
        span.textContent = char;
        span.style.animationDelay = `${0.5 + (index * 0.05)}s`;
        titleElement.appendChild(span);
    });
    
    // Add comma
    const comma = document.createElement('span');
    comma.className = 'letter-animate';
    comma.textContent = ',';
    comma.style.animationDelay = `${0.5 + (parts[0].length * 0.05)}s`;
    titleElement.appendChild(comma);
    
    // Add a space
    const space = document.createTextNode(' ');
    titleElement.appendChild(space);
    
    // Add the birthday text span back
    if (originalBirthdayText) {
        titleElement.innerHTML += originalBirthdayText;
    }
    
    // Add the cake icon back
    if (originalCake) {
        titleElement.innerHTML += originalCake;
    }
}

// ------- CONFETTI EFFECT --------
function initConfetti(isMobile = false) {
    const confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) return;
    
    const colors = [
        'var(--confetti-1)',
        'var(--confetti-2)',
        'var(--confetti-3)',
        'var(--confetti-4)',
        'var(--confetti-5)'
    ];
    
    // Create confetti pieces
    function createConfetti(amount = 50) {
        // Reduce amount by 50% on mobile
        const adjustedAmount = isMobile ? Math.floor(amount / 2) : amount;
        
        for (let i = 0; i < adjustedAmount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random position, color, shape, and animation
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${5 + Math.random() * 10}px`;
            confetti.style.height = `${10 + Math.random() * 15}px`;
            confetti.style.opacity = Math.random().toString();
            
            // Shorter animation duration on mobile for better performance
            const duration = isMobile ? (2 + Math.random() * 3) : (3 + Math.random() * 5);
            confetti.style.animationDuration = `${duration}s`;
            
            confetti.style.animationDelay = `${Math.random() * 3}s`;
            
            // Random rotation
            const rotation = Math.random() * 360;
            confetti.style.transform = `rotate(${rotation}deg)`;
            
            confettiContainer.appendChild(confetti);
            
            // Remove after animation completes
            setTimeout(() => {
                if (confetti.parentNode === confettiContainer) {
                    confettiContainer.removeChild(confetti);
                }
            }, (duration + 3) * 1000);
        }
    }
    
    // Initial confetti burst - reduced for mobile
    createConfetti(isMobile ? 50 : 100);
    
    // Schedule occasional confetti throughout the experience - reduced for mobile
    setInterval(() => {
        createConfetti(isMobile ? 10 : 20);
    }, isMobile ? 15000 : 10000); // Less frequent updates on mobile
}

// ------- BALLOON ANIMATION --------
function initBalloons(isMobile = false) {
    const balloonsContainer = document.getElementById('balloons-container');
    const launchButton = document.getElementById('launch-balloons');
    
    if (!balloonsContainer || !launchButton) return;
    
    const balloonColors = [
        '#FF5733', // Orange-red
        '#4CAF50', // Green
        '#2196F3', // Blue
        '#9C27B0', // Purple
        '#FFEB3B', // Yellow
        '#FF9800', // Orange
        '#E91E63', // Pink
        '#00BCD4'  // Cyan
    ];
    
    // Launch balloons animation
    function launchBalloons(count = 30) {
        // Clear any existing balloons
        balloonsContainer.innerHTML = '';
        
        // Reduce balloon count on mobile
        const adjustedCount = isMobile ? Math.floor(count * 0.6) : count;
        
        for (let i = 0; i < adjustedCount; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            
            // Set random properties
            const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            balloon.style.backgroundColor = color;
            balloon.style.left = `${5 + Math.random() * 90}%`;
            
            // Slightly smaller balloons on mobile
            const sizeFactor = isMobile ? 0.8 : 1;
            balloon.style.width = `${(30 + Math.random() * 20) * sizeFactor}px`;
            balloon.style.height = `${(40 + Math.random() * 30) * sizeFactor}px`;
            
            // Faster animation on mobile
            const duration = isMobile ? (4 + Math.random() * 6) : (5 + Math.random() * 10);
            balloon.style.animationDuration = `${duration}s`;
            balloon.style.animationDelay = `${Math.random() * 3}s`;
            
            balloonsContainer.appendChild(balloon);
            
            // Clean up after animation completes
            setTimeout(() => {
                if (balloon.parentNode === balloonsContainer) {
                    balloonsContainer.removeChild(balloon);
                }
            }, duration * 1000 + 5000);
        }
    }
    
    // Text balloon animation - optimized for mobile
    function createTextBalloon(text = "Happy Birthday!") {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        // Special styling for text balloon
        balloon.style.width = 'auto';
        balloon.style.height = 'auto';
        
        // Smaller text balloon on mobile
        balloon.style.minWidth = isMobile ? '120px' : '150px';
        balloon.style.backgroundColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.borderRadius = '50%';
        balloon.style.padding = isMobile ? '20px' : '30px';
        balloon.style.display = 'flex';
        balloon.style.alignItems = 'center';
        balloon.style.justifyContent = 'center';
        balloon.style.color = 'white';
        balloon.style.fontWeight = 'bold';
        balloon.style.fontSize = isMobile ? '14px' : '16px';
        balloon.style.textAlign = 'center';
        balloon.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        balloon.textContent = text;
        
        // Position in center
        balloon.style.left = '50%';
        balloon.style.transform = 'translateX(-50%)';
        
        balloonsContainer.appendChild(balloon);
        
        // Clean up after animation completes
        setTimeout(() => {
            if (balloon.parentNode === balloonsContainer) {
                balloonsContainer.removeChild(balloon);
            }
        }, 15000);
    }
    
    // Add event listener to the balloon button
    launchButton.addEventListener('click', () => {
        // Launch regular balloons
        launchBalloons(30);
        
        // Launch one text balloon after a delay
        setTimeout(() => {
            createTextBalloon("Happy Birthday!");
        }, 2000);
        
        // Show more confetti
        if (typeof initConfetti === 'function') {
            initConfetti(isMobile);
        }
    });
    
    // Launch a few balloons initially
    setTimeout(() => {
        launchBalloons(isMobile ? 3 : 5);
    }, 3000);
}

// ------- SMOOTH SCROLLING --------
function initSmoothScroll() {
    if (window.Lenis) {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureOrientation: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Add header links scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    lenis.scrollTo(targetElement);
                }
            });
        });
    }
    
    // Fallback for devices without Lenis
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const photoSection = document.getElementById('photo-box');
            if (photoSection) {
                if (window.Lenis) {
                    lenis.scrollTo(photoSection);
                } else {
                    photoSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
}

// ------- PHOTO BOX SECTION --------
function initPhotoBox() {
    const clickableBox = document.querySelector('.clickable-box');
    const photoReveal = document.querySelector('.photo-reveal');
    const photoGrid = document.querySelector('.photo-grid');

    // Special moments photos with romantic descriptions
    const photos = [
        { url: 'https://source.unsplash.com/featured/300x300/?couple,sunset', alt: 'Our magical sunset walk on the beach' },
        { url: 'https://source.unsplash.com/featured/300x300/?couple,beach', alt: 'Beach day adventures together' },
        { url: 'https://source.unsplash.com/featured/300x300/?couple,dinner', alt: 'Candlelit dinner date at our favorite restaurant' },
        { url: 'https://source.unsplash.com/featured/300x300/?couple,winter', alt: 'Snowy day cuddles by the fireplace' },
        { url: 'https://source.unsplash.com/featured/300x300/?couple,dance', alt: 'Dancing under the stars at midnight' },
        { url: 'https://source.unsplash.com/featured/300x300/?couple,travel', alt: 'Adventure together in our dream destination' },
        { url: 'https://source.unsplash.com/featured/300x300/?couple,coffee', alt: 'Morning coffee moments watching the sunrise' },
        { url: 'https://source.unsplash.com/featured/300x300/?couple,picnic', alt: 'Picnic in the park with your favorite foods' }
    ];

    if (clickableBox && photoReveal && photoGrid) {
        // Clear existing content first
        photoGrid.innerHTML = '';
        
        // Add caption display to each photo
        photos.forEach((photo, index) => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.style.animationDelay = `${index * 0.1}s`;

            const img = document.createElement('img');
            img.src = photo.url;
            img.alt = photo.alt;
            img.loading = 'lazy';
            
            const caption = document.createElement('div');
            caption.className = 'photo-caption';
            caption.textContent = photo.alt;
            
            photoItem.appendChild(img);
            photoItem.appendChild(caption);
            photoGrid.appendChild(photoItem);
            
            // Add touch events for mobile
            img.addEventListener('touchstart', function() {
                caption.style.transform = 'translateY(0)';
            }, {passive: true});
        });

        // Use both click and touch events for better mobile support
        ['click', 'touchend'].forEach(eventType => {
            clickableBox.addEventListener(eventType, () => {
                // Toggle visibility with a nice transition
                if (photoReveal.style.display === 'none' || photoReveal.style.display === '') {
                    photoReveal.style.display = 'block';
                    setTimeout(() => {
                        photoReveal.style.opacity = '1';
                        photoReveal.style.transform = 'translateY(0)';
                    }, 10);
                    clickableBox.textContent = 'Hide Our Memories';
                    clickableBox.classList.add('active');
                } else {
                    photoReveal.style.opacity = '0';
                    photoReveal.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        photoReveal.style.display = 'none';
                    }, 500);
                    clickableBox.textContent = 'Click to Reveal Our Memories';
                    clickableBox.classList.remove('active');
                }
            }, eventType === 'touchend' ? {passive: true} : false);
        });
    } else {
        console.error('Photo box elements not found!');
    }
}

// ------- MEMORY GAME SECTION --------
function initMemoryGame() {
    const gameContainer = document.querySelector('.memory-game');
    if (!gameContainer) {
        console.error('Memory game container not found!');
        return;
    }

    // Game state
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;
    
    // Card data (expanded love-themed emojis with variety)
    const cardIcons = ['❤️', '💘', '💝', '💖', '💗', '💓', '💞', '💟', '💑', '💏', '🌹', '🥰', '💋', '😘', '🫶', '💐'];
    const gamePairs = cardIcons.slice(0, 8); // Use only 8 pairs for a 4x4 grid
    
    // Double the icons for pairs and shuffle
    const allIcons = [...gamePairs, ...gamePairs];
    shuffleArray(allIcons);
    
    // Create game cards
    gameContainer.innerHTML = ''; // Clear existing cards
    allIcons.forEach((icon, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.icon = icon;
        
        const frontFace = document.createElement('div');
        frontFace.className = 'front-face';
        frontFace.textContent = icon;
        
        const backFace = document.createElement('div');
        backFace.className = 'back-face';
        backFace.textContent = '?';
        
        card.appendChild(frontFace);
        card.appendChild(backFace);
        
        // Add both click and touch events for better mobile support
        ['click', 'touchend'].forEach(eventType => {
            card.addEventListener(eventType, flipCard, eventType === 'touchend' ? {passive: true} : false);
        });
        
        gameContainer.appendChild(card);
    });
    
    // Card flipping function
    function flipCard(e) {
        if (e.type === 'touchend') {
            e.preventDefault(); // Prevent additional click event on touch devices
        }
        
        if (lockBoard) return;
        if (this === firstCard) return;
        
        this.classList.add('flip');
        
        if (!hasFlippedCard) {
            // First card flipped
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        
        // Second card flipped
        secondCard = this;
        checkForMatch();
    }
    
    // Check if cards match
    function checkForMatch() {
        let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;
        
        if (isMatch) {
            disableCards();
            matchedPairs++;
            
            // Check if all pairs are matched
            if (matchedPairs === gamePairs.length) {
                setTimeout(() => {
                    showCongratulations();
                }, 1000);
            }
        } else {
            unflipCards();
        }
    }
    
    // Disable matched cards
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        firstCard.removeEventListener('touchend', flipCard);
        secondCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('touchend', flipCard);
        
        // Add a little animation to matched cards
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        
        resetBoard();
    }
    
    // Unflip non-matching cards
    function unflipCards() {
        lockBoard = true;
        
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            
            resetBoard();
        }, 1000);
    }
    
    // Reset board after each round
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
    
    // Show congratulations message
    function showCongratulations() {
        // Create modal-style congratulations
        const congratsDiv = document.createElement('div');
        congratsDiv.className = 'congrats-message';
        congratsDiv.innerHTML = `
            <h3>Congratulations! 🎉</h3>
            <p>You've found all the matching love symbols, just like we found each other! Your love and dedication shine through in everything you do.</p>
            <button class="play-again">Play Again</button>
        `;
        
        document.body.appendChild(congratsDiv);
        
        // Add play again functionality with both click and touch
        const playAgainBtn = congratsDiv.querySelector('.play-again');
        ['click', 'touchend'].forEach(eventType => {
            playAgainBtn.addEventListener(eventType, () => {
                document.body.removeChild(congratsDiv);
                resetGame();
            }, eventType === 'touchend' ? {passive: true} : false);
        });
    }
    
    // Reset the game
    function resetGame() {
        matchedPairs = 0;
        
        // Remove existing cards
        gameContainer.innerHTML = '';
        
        // Reshuffle icons
        shuffleArray(allIcons);
        
        // Create new cards
        allIcons.forEach((icon, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.icon = icon;
            
            const frontFace = document.createElement('div');
            frontFace.className = 'front-face';
            frontFace.textContent = icon;
            
            const backFace = document.createElement('div');
            backFace.className = 'back-face';
            backFace.textContent = '?';
            
            card.appendChild(frontFace);
            card.appendChild(backFace);
            
            // Add both click and touch events for better mobile support
            ['click', 'touchend'].forEach(eventType => {
                card.addEventListener(eventType, flipCard, eventType === 'touchend' ? {passive: true} : false);
            });
            
            gameContainer.appendChild(card);
        });
    }
}

// Helper function to shuffle arrays
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ------- PHOTO SLIDER SECTION --------
function initPhotoSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    const sliderTrack = document.querySelector('.slider-track');
    const prevButton = document.querySelector('.slider-nav.prev');
    const nextButton = document.querySelector('.slider-nav.next');
    
    if (!sliderContainer || !sliderTrack) {
        console.error('Slider elements not found!');
        return;
    }
    
    // Add romantic images with captions
    const sliderImages = [
        { url: 'https://source.unsplash.com/featured/800x600/?couple,kiss', caption: 'Our first kiss under the starry sky' },
        { url: 'https://source.unsplash.com/featured/800x600/?couple,hands', caption: 'Holding hands through life\'s journey' },
        { url: 'https://source.unsplash.com/featured/800x600/?couple,flowers', caption: 'The day you surprised me with flowers' },
        { url: 'https://source.unsplash.com/featured/800x600/?couple,laugh', caption: 'Laughing together at our inside jokes' },
        { url: 'https://source.unsplash.com/featured/800x600/?couple,sunset', caption: 'Sunset walks along our favorite beach' },
        { url: 'https://source.unsplash.com/featured/800x600/?couple,travel', caption: 'That amazing trip where we got lost together' },
        { url: 'https://source.unsplash.com/featured/800x600/?couple,candlelight', caption: 'Our candlelit anniversary dinner' },
        { url: 'https://source.unsplash.com/featured/800x600/?couple,rain', caption: 'Dancing in the rain without a care' },
        { url: 'https://source.unsplash.com/featured/800x600/?couple,hug', caption: 'Your warm hugs that feel like home' }
    ];
    
    // Clear existing content
    sliderTrack.innerHTML = '';
    
    // Create slider items
    sliderImages.forEach((image) => {
        const sliderItem = document.createElement('div');
        sliderItem.className = 'slider-item';
        
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.caption;
        img.loading = 'lazy';
        
        const caption = document.createElement('div');
        caption.className = 'slider-caption';
        caption.textContent = image.caption;
        
        sliderItem.appendChild(img);
        sliderItem.appendChild(caption);
        sliderTrack.appendChild(sliderItem);
    });
    
    // Slider navigation variables
    let currentPosition = 0;
    const totalSlides = sliderImages.length;
    let slidesVisible = 3; // Default for desktop
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Responsive slides visible
    function updateSlidesVisible() {
        if (window.innerWidth < 768) {
            slidesVisible = 1;
        } else if (window.innerWidth < 1024) {
            slidesVisible = 2;
        } else {
            slidesVisible = 3;
        }
        
        // Update slider after changing slides visible
        updateSliderPosition();
    }
    
    // Initial setup
    updateSlidesVisible();
    window.addEventListener('resize', updateSlidesVisible);
    
    // Update slider position
    function updateSliderPosition(position) {
        const sliderTrack = document.querySelector('.slider-track');
        const sliderItems = document.querySelectorAll('.slider-item');
        const prevButton = document.querySelector('.slider-nav.prev');
        const nextButton = document.querySelector('.slider-nav.next');
        
        if (!sliderTrack || !sliderItems.length) return;
        
        const sliderItem = sliderItems[0];
        const itemStyle = window.getComputedStyle(sliderItem);
        const itemWidth = sliderItem.offsetWidth +
                        parseInt(itemStyle.marginLeft) +
                        parseInt(itemStyle.marginRight);
        
        // Number of visible slides based on screen width
        let slidesVisible = 3;
        if (window.innerWidth < 768) {
            slidesVisible = 1;
        } else if (window.innerWidth < 1024) {
            slidesVisible = 2;
        }
        
        // Update slider position
        sliderTrack.style.transform = `translateX(-${position * itemWidth}px)`;
        
        // Update button states
        if (prevButton && nextButton) {
            prevButton.style.opacity = position === 0 ? '0.5' : '1';
            prevButton.style.pointerEvents = position === 0 ? 'none' : 'auto';
            
            nextButton.style.opacity = position >= sliderItems.length - slidesVisible ? '0.5' : '1';
            nextButton.style.pointerEvents = position >= sliderItems.length - slidesVisible ? 'none' : 'auto';
        }
        
        return { itemWidth, slidesVisible };
    }
    
    // Handle touch events
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
    }
    
    function handleTouchMove(e) {
        touchEndX = e.touches[0].clientX;
    }
    
    function handleTouchEnd() {
        if (touchStartX - touchEndX > 50) {
            // Swipe left
            if (currentPosition < totalSlides - slidesVisible) {
                currentPosition++;
                updateSliderPosition();
            }
        } else if (touchEndX - touchStartX > 50) {
            // Swipe right
            if (currentPosition > 0) {
                currentPosition--;
                updateSliderPosition();
            }
        }
    }
    
    // Add navigation button functionality with both click and touch
    if (prevButton && nextButton) {
        ['click', 'touchend'].forEach(eventType => {
            prevButton.addEventListener(eventType, () => {
                if (currentPosition > 0) {
                    currentPosition--;
                    updateSliderPosition();
                }
            }, eventType === 'touchend' ? {passive: true} : false);
            
            nextButton.addEventListener(eventType, () => {
                if (currentPosition < totalSlides - slidesVisible) {
                    currentPosition++;
                    updateSliderPosition();
                }
            }, eventType === 'touchend' ? {passive: true} : false);
        });
    }
    
    // Add touch events to slider container for swipe
    sliderContainer.addEventListener('touchstart', handleTouchStart, {passive: true});
    sliderContainer.addEventListener('touchmove', handleTouchMove, {passive: true});
    sliderContainer.addEventListener('touchend', handleTouchEnd, {passive: true});
}

// ------- LETTER REVEAL SECTION --------
function initLetterReveal() {
    const letterButton = document.getElementById('show-letter') || document.querySelector('.letter-button');
    const letterContent = document.getElementById('letter-content') || document.querySelector('.letter-content');
    
    if (!letterButton || !letterContent) {
        console.error('Letter elements not found!');
        return;
    }
    
    // Updated letter content with birthday theme
    const letterHtml = `
        <p>My Dearest Birthday Star,</p>
        
        <p>As I write this birthday letter, my heart is overflowing with the deepest love and gratitude for having you in my life. Today marks another beautiful year of your journey, and I'm so blessed to celebrate it with you. From the moment we first met, my world changed forever in the most wonderful way.</p>
        
        <p>Each year with you has been more extraordinary than the last. I cherish every laugh we've shared, every challenge we've overcome together, and every quiet moment just being in each other's presence. You've taught me what it means to truly love someone with my whole heart.</p>
        
        <p>On your special day, I want you to know that you're the most amazing person I've ever known. Your kindness touches everyone around you. Your smile lights up even my darkest days. Your passion inspires me to be better. I fall more in love with you with each passing day.</p>
        
        <p>Thank you for being my partner, my best friend, my confidant, and my greatest adventure. Having you in my life is the greatest gift I could ever ask for.</p>
        
        <p>Today is all about celebrating the incredible person you are and the immeasurable joy you bring to my life. May this new year of your life bring you all the happiness, success, and love that you deserve.</p>
        
        <p class="signature">Forever and always yours, ❤️</p>
    `;
    
    // Click event to reveal letter with both click and touch
    ['click', 'touchend'].forEach(eventType => {
        letterButton.addEventListener(eventType, () => {
            if (letterContent.style.display === 'block') {
                letterContent.style.display = 'none';
                letterButton.textContent = 'Open My Birthday Letter';
            } else {
                // Show the letter container
                letterContent.style.display = 'block';
                letterButton.textContent = 'Close Letter';
                
                // Get letter text container
                const letterTextDiv = letterContent.querySelector('.letter-text');
                if (!letterTextDiv) return;
                
                // Set letter content
                letterTextDiv.innerHTML = letterHtml;
                
                // Animate paragraphs with staggered delay
                const paragraphs = letterTextDiv.querySelectorAll('p');
                paragraphs.forEach((paragraph, index) => {
                    setTimeout(() => {
                        paragraph.style.opacity = '1';
                        paragraph.style.transform = 'translateY(0)';
                    }, 300 * index); // Stagger by 300ms per paragraph
                });
                
                // Launch a few balloons when the letter is opened
                if (typeof launchBalloons === 'function') {
                    setTimeout(() => {
                        launchBalloons(5);
                    }, 1000);
                }
            }
        }, eventType === 'touchend' ? {passive: true} : false);
    });
}

// ------- SWIPE SUPPORT --------
function addSwipeSupport() {
    // Check if device is touch capable
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) return;
    
    // Simple swipe detection to navigate between sections
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, {passive: true});
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].clientY;
        handleVerticalSwipe();
    }, {passive: true});
    
    function handleVerticalSwipe() {
        const sections = document.querySelectorAll('section');
        if (!sections.length) return;
        
        // Only respond to strong swipes
        if (Math.abs(touchStartY - touchEndY) < 100) return;
        
        const currentSection = getCurrentSection(sections);
        if (currentSection === -1) return;
        
        if (touchEndY < touchStartY) {
            // Swipe up - go to next section
            if (currentSection < sections.length - 1) {
                scrollToSection(sections[currentSection + 1]);
            }
        } else {
            // Swipe down - go to previous section
            if (currentSection > 0) {
                scrollToSection(sections[currentSection - 1]);
            }
        }
    }
    
    function getCurrentSection(sections) {
        const viewportCenter = window.innerHeight / 2;
        for (let i = 0; i < sections.length; i++) {
            const rect = sections[i].getBoundingClientRect();
            // If the section covers the center of the viewport
            if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
                return i;
            }
        }
        return -1;
    }
    
    function scrollToSection(section) {
        if (window.Lenis) {
            lenis.scrollTo(section);
        } else {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
} 