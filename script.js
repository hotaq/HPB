// Basic script structure - will add functionality later

document.addEventListener('DOMContentLoaded', () => {
    console.log('แอบ hack web รึป่าวเรา');

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

    // Initialize the bento gallery
    initBentoGallery();

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

// ------- FLOWER ANIMATION --------
function initBalloons(isMobile = false) {
    const flowersContainer = document.getElementById('flowers-container');
    const launchButton = document.getElementById('launch-flowers');

    if (!flowersContainer || !launchButton) return;

    const flowerVariants = [
        'default',
        'variant-1',
        'variant-2',
        'variant-3'
    ];

    // Launch flowers animation
    function launchFlowers(count = 30) {
        // Clear any existing flowers
        flowersContainer.innerHTML = '';

        // Reduce flower count on mobile
        const adjustedCount = isMobile ? Math.floor(count * 0.6) : count;

        for (let i = 0; i < adjustedCount; i++) {
            const flower = document.createElement('div');

            // Assign random variant
            const variant = flowerVariants[Math.floor(Math.random() * flowerVariants.length)];
            flower.className = variant === 'default' ? 'flower' : `flower ${variant}`;

            // Set random position
            flower.style.left = `${5 + Math.random() * 90}%`;

            // Slightly smaller flowers on mobile
            const sizeFactor = isMobile ? 0.8 : 1;
            const baseSize = 30 + Math.random() * 20;
            flower.style.width = `${baseSize * sizeFactor}px`;
            flower.style.height = `${baseSize * sizeFactor}px`;

            // Faster animation on mobile
            const duration = isMobile ? (4 + Math.random() * 6) : (5 + Math.random() * 10);
            flower.style.animationDuration = `${duration}s`;
            flower.style.animationDelay = `${Math.random() * 3}s`;

            flowersContainer.appendChild(flower);

            // Clean up after animation completes
            setTimeout(() => {
                if (flower.parentNode === flowersContainer) {
                    flowersContainer.removeChild(flower);
                }
            }, duration * 1000 + 5000);
        }
    }

    // Text flower animation - optimized for mobile
    function createTextFlower(text = "Happy Birthday!") {
        const flower = document.createElement('div');
        flower.className = 'flower';

        // Special styling for text flower
        flower.style.width = 'auto';
        flower.style.height = 'auto';

        // Create a container for text
        const textContainer = document.createElement('div');

        // Smaller text flower on mobile
        textContainer.style.minWidth = isMobile ? '120px' : '150px';
        textContainer.style.backgroundColor = '#e54c7c';
        textContainer.style.borderRadius = '50%';
        textContainer.style.padding = isMobile ? '20px' : '30px';
        textContainer.style.display = 'flex';
        textContainer.style.alignItems = 'center';
        textContainer.style.justifyContent = 'center';
        textContainer.style.color = 'white';
        textContainer.style.fontWeight = 'bold';
        textContainer.style.fontSize = isMobile ? '14px' : '16px';
        textContainer.style.textAlign = 'center';
        textContainer.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        textContainer.textContent = text;

        // Reset background image
        flower.style.backgroundImage = 'none';
        flower.appendChild(textContainer);

        // Position in center
        flower.style.left = '50%';
        flower.style.transform = 'translateX(-50%)';

        flowersContainer.appendChild(flower);

        // Clean up after animation completes
        setTimeout(() => {
            if (flower.parentNode === flowersContainer) {
                flowersContainer.removeChild(flower);
            }
        }, 15000);
    }

    // Add event listener to the flower button
    launchButton.addEventListener('click', () => {
        // Launch regular flowers
        launchFlowers(30);

        // Launch one text flower after a delay
        setTimeout(() => {
            createTextFlower("Happy Birthday!");
        }, 2000);

        // Show more confetti
        if (typeof initConfetti === 'function') {
            initConfetti(isMobile);
        }
    });

    // Launch a few flowers initially
    setTimeout(() => {
        launchFlowers(isMobile ? 3 : 5);
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
    const photoGrid = document.querySelector('.photo-grid');
    const photoContainer = document.getElementById('photo-container');

    if (!photoGrid) return;

    // Immediately show the photos instead of waiting for click
    photoGrid.innerHTML = ''; // Clear any existing content

    // Create a grid of photos
    const photos = [
        "https://source.unsplash.com/featured/600x600/?romantic,couple,1",
        "https://source.unsplash.com/featured/600x600/?romantic,couple,2",
        "https://source.unsplash.com/featured/600x600/?romantic,couple,3",
        "https://source.unsplash.com/featured/600x600/?love,couple,4",
        "https://source.unsplash.com/featured/600x600/?love,couple,5",
        "https://source.unsplash.com/featured/600x600/?love,couple,6"
    ];

    photos.forEach((photo, index) => {
        const photoElement = document.createElement('div');
        photoElement.className = 'photo-item';
        photoElement.style.animationDelay = `${index * 0.1}s`;

        const img = document.createElement('img');
        img.src = photo;
        img.alt = `Special memory ${index + 1}`;
        img.loading = 'lazy';

        photoElement.appendChild(img);
        photoGrid.appendChild(photoElement);
    });

    // Show the photo container with animation
    photoContainer.classList.add('visible');
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

    // Card data (gift and celebration themed emojis)
    const cardIcons = ['🎁', '🎀', '🧸', '🎂', '🍰', '🧁', '🍬', '🍭', '🎈', '🎊', '🎉', '🎄', '🎪', '🎮', '🏆', '🧩'];
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
            <h3>เก่งเกินไปลละะ</h3>
            <p>ของขวัญเอาเป็น pandas ละกันเนาะแต่ได้ตอนไหนนั้นรอดูอนาคตเนาะ</p>
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

    // Add images from local image folder with captions
    const sliderImages = [
        { url: 'image/6F44D8E8-B1F5-42BC-8765-1C9B7485AA37.JPG', caption: '' },
        { url: 'image/8D945DCF-5D5D-46AF-8349-3768FFF8A359.JPG', caption: '' },
        { url: 'image/86FB96B3-6479-4388-9F18-6DDE12C24EF3.JPG', caption: '' },
        { url: 'image/C3DF7DDE-9DBD-4208-96C8-7836825BFA67.JPG', caption: '' },
        { url: 'image/BF485A74-E745-40CA-9424-C1349DF5208D.JPG', caption: '' },
        { url: 'image/DDE2A9A0-E060-4B68-9159-9B3ABAA50EAD.JPG', caption: '' },
        { url: 'image/IMG_3594.jpg', caption: '' },
        { url: 'image/C9F5DB63-5537-4C5C-9834-F664D934E02F.JPG', caption: '' },
        { url: 'image/20C79697-8EF8-4CAD-9E98-99F90FF65974.JPG', caption: '' }
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
    let autoplayInterval; // For automatic sliding
    const autoplayDelay = 3000; // 3 seconds delay between slides
    let isPaused = false; // To track if autoplay is paused

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
        updateSliderPosition(currentPosition);
    }

    // Initial setup
    updateSlidesVisible();
    window.addEventListener('resize', updateSlidesVisible);

    // Update slider position
    function updateSliderPosition(position = currentPosition) {
        currentPosition = position; // Update current position

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

    // Function for automatic advancing of slides
    function startAutoplay() {
        // Clear any existing interval first
        stopAutoplay();

        // Set new interval
        autoplayInterval = setInterval(() => {
            if (!isPaused) {
                // If we're at the end, go back to the start
                if (currentPosition >= totalSlides - slidesVisible) {
                    currentPosition = 0;
                } else {
                    // Otherwise advance one slide
                    currentPosition++;
                }
                updateSliderPosition(currentPosition);
            }
        }, autoplayDelay);
    }

    // Function to stop autoplay
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    // Pause autoplay on hover/touch
    sliderContainer.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    sliderContainer.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    // Handle touch events
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
        isPaused = true; // Pause on touch
    }

    function handleTouchMove(e) {
        touchEndX = e.touches[0].clientX;
    }

    function handleTouchEnd() {
        if (touchStartX - touchEndX > 50) {
            // Swipe left
            if (currentPosition < totalSlides - slidesVisible) {
                currentPosition++;
                updateSliderPosition(currentPosition);
            }
        } else if (touchEndX - touchStartX > 50) {
            // Swipe right
            if (currentPosition > 0) {
                currentPosition--;
                updateSliderPosition(currentPosition);
            }
        }

        // Resume autoplay after 3 seconds
        setTimeout(() => {
            isPaused = false;
        }, 3000);
    }

    // Add navigation button functionality with both click and touch
    if (prevButton && nextButton) {
        ['click', 'touchend'].forEach(eventType => {
            prevButton.addEventListener(eventType, () => {
                if (currentPosition > 0) {
                    currentPosition--;
                    updateSliderPosition(currentPosition);
                }

                // Pause autoplay briefly after manual navigation
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                }, 4000);
            }, eventType === 'touchend' ? {passive: true} : false);

            nextButton.addEventListener(eventType, () => {
                if (currentPosition < totalSlides - slidesVisible) {
                    currentPosition++;
                    updateSliderPosition(currentPosition);
                }

                // Pause autoplay briefly after manual navigation
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                }, 4000);
            }, eventType === 'touchend' ? {passive: true} : false);
        });
    }

    // Add touch events to slider container for swipe
    sliderContainer.addEventListener('touchstart', handleTouchStart, {passive: true});
    sliderContainer.addEventListener('touchmove', handleTouchMove, {passive: true});
    sliderContainer.addEventListener('touchend', handleTouchEnd, {passive: true});

    // Start autoplay
    startAutoplay();

    // Clean up autoplay when leaving page
    window.addEventListener('beforeunload', stopAutoplay);
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

                // Launch a few flowers when the letter is opened
                if (typeof launchFlowers === 'function') {
                    setTimeout(() => {
                        launchFlowers(5);
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

// ------- BENTO GALLERY SECTION --------
function initBentoGallery() {
    const bentoGrid = document.getElementById('bento-grid');
    const galleryModal = document.getElementById('gallery-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalMediaContainer = document.querySelector('.modal-media-container');
    const modalTitle = document.querySelector('.modal-title');
    const modalDesc = document.querySelector('.modal-desc');
    const thumbnailContainer = document.querySelector('.thumbnail-container');

    if (!bentoGrid || !galleryModal) return;

    // Media items data using local images from the image folder
    const mediaItems = [
        {
            id: 1,
            type: "video",
            title: "วัน PISADE",
            desc: "เพราะพี่ใส่เสื้อ PISADE หยอกๆ",
            url: "image/1a27028b64d6443d9ec5d533c7fc9a08.MOV",
            span: "span-1-3"
        },
        {
            id: 2,
            type: "image",
            title: "น้องออมกับชุดนอนของเขา",
            desc: "พี่อยู่ไหนไม่รู้ไปไม่ไหน",
            url: "image/1E9067B9-FC7A-450E-AC63-9CBEEB7E6530.JPG",
            span: "span-2-3"
        },
        {
            id: 3,
            type: "image",
            title: "งามจริงๆ คนเรา",
            desc: "😍",
            url: "image/3C23313D-8EBF-4292-9226-EEFB15C4234F.JPG",
            span: "span-1-3"
        },
        {
            id: 4,
            type: "video",
            title: "อวดทรงผมใหม่เท่ๆ",
            desc: "",
            url: "image/55290b69ffd54c9e8f1869c6d34c9ab8.MOV",
            span: "span-1-3"
        },
        {
            id: 5,
            type: "video",
            title: "วัน PISADE again",
            desc: "ออมมองอะไรอ่ะ",
            url: "image/IMG_2486.MOV",
            span: "span-1-3"
        },
        {
            id: 6,
            type: "image",
            title: "แอบถ่ายแบบโหดๆ",
            desc: "ภาพโครตมู้ดโครตอันตราย",
            url: "image/IMG_4142.JPG",
            span: "span-2-3"
        },
        {
            id: 7,
            type: "image",
            title: "Icebear vs Aomsin",
            desc: "พี่แอบกอก Icebear ละ",
            url: "image/F476F148-0A08-453B-A7EB-D8D7C5C643CC.JPG",
            span: "span-1-3"
        },
        {
            id: 8,
            type: "image",
            title: "Friends Memory",
            desc: "",
            url: "image/EC457C40-ACA1-4C5B-8FD2-98572EAED848.JPG",
            span: "span-2-3"
        },
        {
            id: 9,
            type: "video",
            title: "PISADE forver",
            desc: "",
            url: "image/IMG_2495.MOV",
            span: "span-1-3"
        },
       
       
    ];

    let selectedItem = null;
    const videoRefs = {};
    const videoObservers = {};

    // Populate the bento grid with media items
    function populateGrid() {
        bentoGrid.innerHTML = '';

        mediaItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = `bento-item ${item.span}`;
            itemElement.dataset.id = item.id;
            itemElement.style.animationDelay = `${index * 0.05}s`;

            // Create media element based on type
            if (item.type === 'video') {
                const video = document.createElement('video');
                video.src = item.url;
                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                video.preload = 'metadata';

                // Add loading spinner
                const loadingElem = document.createElement('div');
                loadingElem.className = 'video-loading';
                loadingElem.innerHTML = '<div class="spinner"></div>';

                itemElement.appendChild(video);
                itemElement.appendChild(loadingElem);

                // Store video reference
                videoRefs[item.id] = video;

                // Set up intersection observer for video
                observeVideo(video, loadingElem);
            } else {
                const img = document.createElement('img');
                img.src = item.url;
                img.alt = item.title;
                img.loading = 'lazy';

                itemElement.appendChild(img);
            }

            // Add caption
            const caption = document.createElement('div');
            caption.className = 'item-caption';
            caption.innerHTML = `
                <h3 class="item-title">${item.title}</h3>
                <p class="item-desc">${item.desc}</p>
            `;

            itemElement.appendChild(caption);

            // Add click event to open modal
            itemElement.addEventListener('click', (e) => {
                // Only open modal if not dragging
                if (!itemElement.classList.contains('dragging')) {
                    openModal(item);
                }
            });

            // Make item draggable
            makeDraggable(itemElement);

            bentoGrid.appendChild(itemElement);
        });
    }

    // Set up intersection observer for videos
    function observeVideo(videoElement, loadingElem) {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Video is visible, try to play it
                    playVideo(videoElement, loadingElem);
                } else {
                    // Video is not visible, pause it
                    videoElement.pause();
                }
            });
        }, options);

        observer.observe(videoElement);
        return observer;
    }

    // Play video and handle loading states
    function playVideo(videoElement, loadingElem) {
        if (videoElement.readyState >= 3) {
            // Video is loaded enough to play
            loadingElem.style.display = 'none';
            videoElement.play().catch(error => {
                console.warn('Could not play video:', error);
            });
        } else {
            // Video is still loading
            loadingElem.style.display = 'flex';

            // Set up event listener for when video can play
            videoElement.addEventListener('canplay', function onCanPlay() {
                loadingElem.style.display = 'none';
                videoElement.play().catch(error => {
                    console.warn('Could not play video:', error);
                });
                videoElement.removeEventListener('canplay', onCanPlay);
            });
        }
    }

    // Make element draggable
    function makeDraggable(element) {
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        let elementIndex, initialOrder;

        element.addEventListener('mousedown', startDrag);
        element.addEventListener('touchstart', handleTouchStart, { passive: false });

        function startDrag(e) {
            // Only handle left mouse button (primary button)
            if (e.button !== 0) return;
            e.preventDefault();

            isDragging = false; // Start with false, will be set to true on move
            startX = e.clientX;
            startY = e.clientY;

            const rect = element.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;

            // Save element index in parent
            const parent = element.parentNode;
            elementIndex = Array.from(parent.children).indexOf(element);
            initialOrder = Array.from(parent.children);

            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', stopDrag);
        }

        function handleTouchStart(e) {
            e.preventDefault();

            const touch = e.touches[0];
            isDragging = false; // Start with false, will be set to true on move
            startX = touch.clientX;
            startY = touch.clientY;

            const rect = element.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;

            // Save element index in parent
            const parent = element.parentNode;
            elementIndex = Array.from(parent.children).indexOf(element);
            initialOrder = Array.from(parent.children);

            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleTouchEnd);
        }

        function onDrag(e) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            // Only count as dragging if moved more than 5px
            if (!isDragging && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
                isDragging = true;
                element.classList.add('dragging');
            }

            if (!isDragging) return;

            element.style.position = 'relative';
            element.style.zIndex = '10';
            element.style.transform = `translate(${dx}px, ${dy}px)`;

            checkPosition(e.clientX, e.clientY);
        }

        function handleTouchMove(e) {
            e.preventDefault();

            const touch = e.touches[0];
            const dx = touch.clientX - startX;
            const dy = touch.clientY - startY;

            // Only count as dragging if moved more than 5px
            if (!isDragging && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
                isDragging = true;
                element.classList.add('dragging');
            }

            if (!isDragging) return;

            element.style.position = 'relative';
            element.style.zIndex = '10';
            element.style.transform = `translate(${dx}px, ${dy}px)`;

            checkPosition(touch.clientX, touch.clientY);
        }

        function checkPosition(x, y) {
            const parent = element.parentNode;
            const siblings = Array.from(parent.children);

            for (let i = 0; i < siblings.length; i++) {
                if (siblings[i] === element) continue;

                const rect = siblings[i].getBoundingClientRect();
                if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
                    // Swap positions in the DOM
                    if (i < elementIndex) {
                        parent.insertBefore(element, siblings[i]);
                    } else {
                        parent.insertBefore(element, siblings[i].nextSibling);
                    }

                    // Update elementIndex
                    elementIndex = Array.from(parent.children).indexOf(element);
                    break;
                }
            }
        }

        function stopDrag() {
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', stopDrag);

            if (!isDragging) return;

            isDragging = false;
            element.classList.remove('dragging');
            element.style.position = '';
            element.style.zIndex = '';
            element.style.transform = '';

            // Update mediaItems array order based on new DOM order
            const parent = element.parentNode;
            const newOrder = Array.from(parent.children);
            mediaItems.sort((a, b) => {
                const aIndex = newOrder.findIndex(el => parseInt(el.dataset.id) === a.id);
                const bIndex = newOrder.findIndex(el => parseInt(el.dataset.id) === b.id);
                return aIndex - bIndex;
            });
        }

        function handleTouchEnd() {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);

            if (!isDragging) return;

            isDragging = false;
            element.classList.remove('dragging');
            element.style.position = '';
            element.style.zIndex = '';
            element.style.transform = '';

            // Update mediaItems array order based on new DOM order
            const parent = element.parentNode;
            const newOrder = Array.from(parent.children);
            mediaItems.sort((a, b) => {
                const aIndex = newOrder.findIndex(el => parseInt(el.dataset.id) === a.id);
                const bIndex = newOrder.findIndex(el => parseInt(el.dataset.id) === b.id);
                return aIndex - bIndex;
            });
        }
    }

    // Open modal with selected item
    function openModal(item) {
        selectedItem = item;

        // Populate modal content
        modalTitle.textContent = item.title;
        modalDesc.textContent = item.desc;

        // Create media element based on type
        modalMediaContainer.innerHTML = '';
        if (item.type === 'video') {
            const video = document.createElement('video');
            video.src = item.url;
            video.controls = true;
            video.muted = false;
            video.autoplay = true;

            modalMediaContainer.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = item.url;
            img.alt = item.title;

            modalMediaContainer.appendChild(img);
        }

        // Populate thumbnails
        thumbnailContainer.innerHTML = '';
        mediaItems.forEach(mediaItem => {
            const thumb = document.createElement('div');
            thumb.className = `thumbnail ${mediaItem.id === item.id ? 'active' : ''}`;

            if (mediaItem.type === 'video') {
                const video = document.createElement('video');
                video.src = mediaItem.url;
                video.muted = true;
                thumb.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.src = mediaItem.url;
                img.alt = mediaItem.title;
                thumb.appendChild(img);
            }

            thumb.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(mediaItem);
            });

            thumbnailContainer.appendChild(thumb);
        });

        // Show the modal
        galleryModal.classList.add('active');
    }

    // Close modal
    function closeModal() {
        galleryModal.classList.remove('active');
        selectedItem = null;

        // Pause any playing videos in the modal
        const modalVideo = modalMediaContainer.querySelector('video');
        if (modalVideo) {
            modalVideo.pause();
        }
    }

    // Make the thumbnail dock draggable
    function makeThumbnailDockDraggable() {
        const dock = document.getElementById('thumbnail-dock');
        if (!dock) return;

        let isDragging = false;
        let startX, startY, startLeft, startTop;

        dock.addEventListener('mousedown', startDrag);
        dock.addEventListener('touchstart', handleTouchStart, { passive: false });

        function startDrag(e) {
            if (e.target.closest('.thumbnail')) return; // Don't drag if clicking on a thumbnail

            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;

            const rect = dock.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;

            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', stopDrag);
        }

        function handleTouchStart(e) {
            if (e.target.closest('.thumbnail')) return;
            e.preventDefault();

            const touch = e.touches[0];
            isDragging = true;
            startX = touch.clientX;
            startY = touch.clientY;

            const rect = dock.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;

            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleTouchEnd);
        }

        function onDrag(e) {
            if (!isDragging) return;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            dock.style.left = `${startLeft + dx}px`;
            dock.style.top = `${startTop + dy}px`;
            dock.style.transform = 'none';
        }

        function handleTouchMove(e) {
            if (!isDragging) return;
            e.preventDefault();

            const touch = e.touches[0];
            const dx = touch.clientX - startX;
            const dy = touch.clientY - startY;

            dock.style.left = `${startLeft + dx}px`;
            dock.style.top = `${startTop + dy}px`;
            dock.style.transform = 'none';
        }

        function stopDrag() {
            isDragging = false;
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', stopDrag);
        }

        function handleTouchEnd() {
            isDragging = false;
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        }
    }

    // Set up event listeners
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    // Close modal on backdrop click
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Initialize
    populateGrid();
    makeThumbnailDockDraggable();
}