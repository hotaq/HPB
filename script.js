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

    // Initialize the music player
    initMusicPlayer();

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
            createTextFlower("สวยมั้ยดอกไม้แบบนี้ 🌺");
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
    // Check if device is iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // Use native smooth scrolling for iOS devices
    if (isIOS) {
        // Add header links scroll with native behavior
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Use native smooth scrolling
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Handle scroll indicator with native behavior
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const photoSection = document.getElementById('photo-box');
                if (photoSection) {
                    photoSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    } else if (window.Lenis) {
        // Use Lenis for non-iOS devices
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

        // Handle scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const photoSection = document.getElementById('photo-box');
                if (photoSection) {
                    lenis.scrollTo(photoSection);
                }
            });
        }
    } else {
        // Fallback for devices without Lenis
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const photoSection = document.getElementById('photo-box');
                if (photoSection) {
                    photoSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
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

// ------- MUSIC PLAYER SECTION --------
function initMusicPlayer() {
    // Get DOM elements
    const musicPlayer = document.getElementById('music-player');
    const miniPlayer = document.getElementById('mini-player');
    const minimizeBtn = document.getElementById('minimize-player');
    const musicCoverImg = document.getElementById('music-cover-img');
    const musicTitle = document.getElementById('music-title');
    const musicArtist = document.getElementById('music-artist');
    const progressBar = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const prevBtn = document.getElementById('prev-btn');
    const playBtn = document.getElementById('play-btn');
    const nextBtn = document.getElementById('next-btn');
    const stopBtn = document.getElementById('stop-btn');
    const muteBtn = document.getElementById('mute-btn');
    const volumeSlider = document.getElementById('volume-slider');

    // Create audio element
    const audio = new Audio();

    // Song data - using the correct song folder path based on the directory listing
    const songs = [
        {
            title: 'From The Start',
            artist: 'Laufey',
            cover: 'imagesong/fromthe start.jpg',
            file: 'song/Laufey - From The Start (Official Music Video).mp3'
        },
        {
            title: 'Falling Behind',
            artist: 'Laufey',
            cover: 'imagesong/falenn.jpg',
            file: 'song/Laufey - Falling Behind (Official Audio).mp3'
        },
        {
            title: 'Laufey - Valentine ',
            artist: 'Laufey',
            cover: 'imagesong/Laufey_Valentine_single_cover.jpeg',
            file: 'song/Laufey - Valentine (Official Audio).mp3'
        },
        {
            title: 'เพลงรักเพลงแรก (Blooming)',
            artist: 'LANDOKMAI',
            cover: 'imagesong/maxresdefault.jpg',
            file: 'song/LANDOKMAI - เพลงรกเพลงแรก (Blooming) [Official MV].mp3'
        }
    ];

    // Current song index
    let currentSongIndex = 0;
    let isPlaying = false;
    let autoplayAttempted = false;
    let isMuted = false;
    let lastVolume = 0.7; // Default volume (70%)

    // Initialize player
    function loadSong(index) {
        const song = songs[index];
        musicTitle.textContent = song.title;
        musicArtist.textContent = song.artist;
        musicCoverImg.src = song.cover;

        // Store the current time if we're switching songs while playing
        const wasPlaying = isPlaying;
        if (isPlaying) {
            pauseSong();
        }

        // Set the new source
        audio.src = song.file;
        audio.load();

        // Resume playing if we were playing before
        if (wasPlaying) {
            playSong();
        }
    }

    // Format time in minutes and seconds
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Update progress bar
    function updateProgress() {
        if (audio.duration) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            currentTimeEl.textContent = formatTime(audio.currentTime);
        }
    }

    // Set progress bar on click
    function setProgress(e) {
        const progressBarContainer = document.querySelector('.progress-bar');
        const width = progressBarContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

        audio.currentTime = (clickX / width) * duration;
    }

    // Play/pause song
    function togglePlay() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    // Play song
    function playSong() {
        isPlaying = true;

        // Change play button to pause
        playBtn.classList.add('pause');
        playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';

        // Start playing
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn('Could not play audio:', error);
                // Fallback for mobile devices that require user interaction
                isPlaying = false;
                playBtn.classList.remove('pause');
                playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';

                // Show a notification or visual cue that user needs to interact
                if (!autoplayAttempted) {
                    // Flash the player to draw attention
                    musicPlayer.classList.add('attention');
                    setTimeout(() => {
                        musicPlayer.classList.remove('attention');
                    }, 2000);
                    autoplayAttempted = true;
                }
            });
        }
    }

    // Pause song
    function pauseSong() {
        isPlaying = false;

        // Change pause button to play
        playBtn.classList.remove('pause');
        playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';

        // Pause playing
        audio.pause();
    }

    // Previous song
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    }

    // Next song
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0;
        }
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    }

    // Minimize player
    function minimizePlayer() {
        musicPlayer.classList.add('hidden');
        miniPlayer.classList.remove('hidden');
    }

    // Maximize player
    function maximizePlayer() {
        miniPlayer.classList.add('hidden');
        musicPlayer.classList.remove('hidden');
    }

    // Stop song completely
    function stopSong() {
        pauseSong();
        audio.currentTime = 0;
        progressBar.style.width = '0%';
        currentTimeEl.textContent = '0:00';
    }

    // Toggle mute
    function toggleMute() {
        if (isMuted) {
            // Unmute
            audio.volume = lastVolume;
            isMuted = false;
            muteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
            muteBtn.classList.remove('muted');
        } else {
            // Mute
            lastVolume = audio.volume;
            audio.volume = 0;
            isMuted = true;
            muteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
            muteBtn.classList.add('muted');
        }
    }

    // Set volume
    function setVolume() {
        const volume = volumeSlider.value / 100;
        audio.volume = volume;
        lastVolume = volume;

        // Update mute button state
        if (volume === 0) {
            isMuted = true;
            muteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
            muteBtn.classList.add('muted');
        } else if (isMuted) {
            isMuted = false;
            muteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
            muteBtn.classList.remove('muted');
        }
    }

    // Event listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    stopBtn.addEventListener('click', stopSong);
    muteBtn.addEventListener('click', toggleMute);
    volumeSlider.addEventListener('input', setVolume);
    minimizeBtn.addEventListener('click', minimizePlayer);
    miniPlayer.addEventListener('click', maximizePlayer);

    // Update progress bar as song plays
    audio.addEventListener('timeupdate', updateProgress);

    // When song ends, play next song
    audio.addEventListener('ended', nextSong);

    // Click on progress bar to seek
    document.querySelector('.progress-bar').addEventListener('click', setProgress);

    // When duration is available, update duration display
    audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audio.duration);
    });

    // Set initial volume
    audio.volume = lastVolume;

    // Load first song
    loadSong(currentSongIndex);

    // Try to autoplay when page loads
    // We need to wait for user interaction due to browser autoplay policies
    const attemptAutoplay = () => {
        playSong();
        // Remove the event listeners after first interaction
        document.removeEventListener('click', attemptAutoplay);
        document.removeEventListener('touchstart', attemptAutoplay);
    };

    // Listen for any user interaction to start playing
    document.addEventListener('click', attemptAutoplay, { once: true });
    document.addEventListener('touchstart', attemptAutoplay, { once: true });

    // Also try immediate autoplay (might work in some browsers)
    setTimeout(() => {
        if (!isPlaying) {
            playSong();
        }
    }, 1000);
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
        <p>Dear Aomsin,</p>

        <p>Guess what day it is todayyy?? It's Aom's birthdayyy! Happy birthday to my dear Aom. Kisses! </p>
        <P>I still remember it was around your birthday time when I followed your IG. I saw something really cute. Looked around a bit, and then, oops, I messaged you. We messaged back and forth, and then we started dating!</p>
        <p>I hope you have lots and lots of happiness! Are you turning 16 or 17? 17! Google says 2551 (the year) means 17. So, Aom is 17! Hehe.</p>

        <p>Let's stay together for a long time. Don't be too stubborn, okay? Or I'll have to tell you off!"
</p>



        <p class="signature">Forever and always yours, ❤️</p>
    `;

    // Check if device is iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // Function to toggle letter visibility
    function toggleLetter(e) {
        // Prevent default behavior
        if (e) e.preventDefault();

        if (letterContent.style.display === 'block') {
            // Close letter
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
    }

    // Special handling for iOS devices
    if (isIOS) {
        // Use simpler event handling for iOS
        letterButton.addEventListener('click', toggleLetter);
    } else {
        // Use both click and touchend for other devices
        ['click', 'touchend'].forEach(eventType => {
            letterButton.addEventListener(eventType, toggleLetter,
                eventType === 'touchend' ? {passive: false} : false);
        });
    }
}

// ------- SWIPE SUPPORT --------
function addSwipeSupport() {
    // Check if device is touch capable
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) return;

    // Check if device is iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // Disable swipe navigation on iOS to prevent blinking/jumping
    if (isIOS) {
        // Instead of swipe navigation, we'll just improve touch behavior
        document.querySelectorAll('button, .memory-card, .slider-nav, .letter-button').forEach(el => {
            el.style.touchAction = 'manipulation';
            el.style.webkitTapHighlightColor = 'transparent';
        });
        return;
    }

    // For non-iOS touch devices, implement swipe with improved behavior
    let touchStartY = 0;
    let touchEndY = 0;
    let isSwiping = false;
    let swipeThreshold = 80; // Reduced threshold for better responsiveness

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        isSwiping = false;
    }, {passive: true});

    document.addEventListener('touchmove', function(e) {
        // Mark as swiping during move to prevent other interactions
        if (Math.abs(e.touches[0].clientY - touchStartY) > 30) {
            isSwiping = true;
        }
    }, {passive: true});

    document.addEventListener('touchend', function(e) {
        if (!isSwiping) return; // Only process if we're actually swiping

        touchEndY = e.changedTouches[0].clientY;
        handleVerticalSwipe();
        isSwiping = false;
    }, {passive: true});

    function handleVerticalSwipe() {
        const sections = document.querySelectorAll('section');
        if (!sections.length) return;

        // Only respond to strong enough swipes
        if (Math.abs(touchStartY - touchEndY) < swipeThreshold) return;

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
        // Use native smooth scrolling for better performance
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
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

        // Check if we're on mobile
        const isMobileView = window.innerWidth <= 480;

        mediaItems.forEach((item, index) => {
            const itemElement = document.createElement('div');

            // Adjust spans for mobile view
            let spanClass = item.span;
            if (isMobileView) {
                // Simplify spans on mobile
                if (spanClass === 'span-2-3') {
                    spanClass = 'span-1-2';
                } else if (spanClass === 'span-1-3') {
                    spanClass = 'span-1-2';
                }
            }

            itemElement.className = `bento-item ${spanClass}`;
            itemElement.dataset.id = item.id;
            itemElement.style.animationDelay = `${index * 0.05}s`;

            // Create media element based on type
            if (item.type === 'video') {
                // Check if device is iOS
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

                // Create a poster image for iOS devices to show instead of loading spinner
                if (isIOS) {
                    // For iOS, use an image with a play button overlay instead of video preview
                    const imgContainer = document.createElement('div');
                    imgContainer.className = 'ios-video-container';

                    // Extract a frame from the video if possible, or use a placeholder
                    const img = document.createElement('img');
                    // Use the first frame of the video as poster if available
                    // Otherwise use a generic video thumbnail
                    img.src = 'image/video-thumbnail.svg'; // SVG fallback image
                    img.alt = item.title;

                    // Add play button overlay
                    const playButton = document.createElement('div');
                    playButton.className = 'play-button-overlay';
                    playButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><path fill="white" d="M8 5v14l11-7z"/></svg>';

                    imgContainer.appendChild(img);
                    imgContainer.appendChild(playButton);
                    itemElement.appendChild(imgContainer);

                    // Store the video URL for later use when clicked
                    itemElement.dataset.videoUrl = item.url;
                } else {
                    // For non-iOS devices, use the original video preview approach
                    const video = document.createElement('video');
                    video.src = item.url;
                    video.muted = true;
                    video.loop = true;
                    video.playsInline = true;
                    video.preload = 'metadata';
                    video.setAttribute('playsinline', ''); // Extra attribute for iOS
                    video.setAttribute('webkit-playsinline', ''); // For older iOS versions

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
                }
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

        // Check if device is iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        // Create media element based on type
        modalMediaContainer.innerHTML = '';
        if (item.type === 'video') {
            const video = document.createElement('video');
            video.src = item.url;
            video.controls = true;
            video.muted = false;
            video.autoplay = true;
            video.playsInline = true;
            video.setAttribute('playsinline', ''); // Extra attribute for iOS
            video.setAttribute('webkit-playsinline', ''); // For older iOS versions

            // For iOS, add poster and make sure controls are visible
            if (isIOS) {
                // Create a play button that will trigger video play on iOS
                const playOverlay = document.createElement('div');
                playOverlay.className = 'ios-play-overlay';
                playOverlay.innerHTML = '<div class="big-play-button">▶</div>';

                // Add click event to manually start the video
                playOverlay.addEventListener('click', function() {
                    video.play()
                        .then(() => {
                            // Hide overlay once video starts playing
                            playOverlay.style.display = 'none';
                        })
                        .catch(error => {
                            console.warn('Could not play video:', error);
                        });
                });

                modalMediaContainer.appendChild(video);
                modalMediaContainer.appendChild(playOverlay);
            } else {
                modalMediaContainer.appendChild(video);
            }
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

    // Handle window resize to update grid layout
    window.addEventListener('resize', () => {
        // Debounce resize event
        if (window.resizeTimer) clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(() => {
            populateGrid();
        }, 250);
    });
}