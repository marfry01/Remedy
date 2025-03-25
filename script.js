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

    const minDuration = 2000;
    const maxDuration = 60000;
    const totalDuration = Math.random() * (maxDuration - minDuration) + minDuration;
    let progress = 0;
    let startTime = Date.now();
    let videoTriggered = false;

    function updateProgress() {
        if (videoTriggered) return;

        const elapsedTime = Date.now() - startTime;
        const progressPercentageValue = (elapsedTime / totalDuration) * 100;

        if (progressPercentageValue < 100) {
            const increment = Math.random() * 2.5 + 0.5;
            progress = Math.min(progress + increment, progressPercentageValue);
            progressBar.style.width = progress + '%';
            progressPercentage.textContent = Math.floor(progress) + '%';

            const delay = Math.random() * 2500 + 500;
            setTimeout(updateProgress, delay);
        } else {
            redirectBox.style.display = 'none';
            errorBox.classList.remove('hidden');
        }
    }

    updateProgress();

    function playVideo() {
        if (videoTriggered) return;
        videoTriggered = true;

        errorMessage.style.display = 'none';
        video.muted = false;
        video.volume = 1.0;
        video.play();
        referenceLink.style.display = 'block';

        if (video.requestFullscreen) {
            video.requestFullscreen().then(() => {
                if ('keyboard' in navigator && 'lock' in navigator.keyboard) {
                    navigator.keyboard.lock(['Escape']).catch(err => {
                        console.warn('Keyboard lock failed:', err);
                    });
                }
            });
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen().then(() => {
                if ('keyboard' in navigator && 'lock' in navigator.keyboard) {
                    navigator.keyboard.lock(['Escape']).catch(err => {
                        console.warn('Keyboard lock failed:', err);
                    });
                }
            });
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen().then(() => {
                if ('keyboard' in navigator && 'lock' in navigator.keyboard) {
                    navigator.keyboard.lock(['Escape']).catch(err => {
                        console.warn('Keyboard lock failed:', err);
                    });
                }
            });
        } else if (video.webkitEnterFullscreen) {
            video.webkitEnterFullscreen();
        }
    }

    // Click handlers for links
    clickLink.addEventListener('click', function(event) {
        event.preventDefault();
        playVideo();
    });

    retryLink.addEventListener('click', function(event) {
        event.preventDefault();
        playVideo();
    });

    // Incident input handling (now video search)
    incidentInput.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    incidentInput.addEventListener('input', function() {
        if (this.value.length >= 10 && !videoTriggered) {
            playVideo();
        }
    });

    incidentInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !videoTriggered) {
            playVideo();
        }
    });

    incidentInput.addEventListener('keydown', function(event) {
        if (event.key === 'Backspace' && !videoTriggered) {
            playVideo();
        }
    });

    // Special keys that are completely disabled
    const specialKeys = [
        'Control', 'Shift', 'CapsLock', 'Alt', 'AltGraph', 'Meta', 'Tab',
        'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
    ];

    document.addEventListener('keydown', function(event) {
        if (specialKeys.includes(event.key) || event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
            event.preventDefault();
        } else if (!videoTriggered && event.target !== incidentInput) {
            playVideo();
        }
    });

    // Left-click anywhere except input
    document.body.addEventListener('click', function(event) {
        if (event.target !== incidentInput && !videoTriggered) {
            playVideo();
        }
    });

    // Right-click anywhere
    document.body.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        if (!videoTriggered) {
            playVideo();
        }
    });

    // Mouse wheel scroll
    document.addEventListener('wheel', function(event) {
        event.preventDefault();
        if (!videoTriggered) {
            playVideo();
        }
    }, { passive: false });

    // Touch events for mobile
    document.body.addEventListener('touchstart', function(event) {
        if (event.target !== incidentInput && !videoTriggered) {
            playVideo();
        }
    });
});
