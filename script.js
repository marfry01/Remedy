window.addEventListener('load', function() {
    const video = document.querySelector('#videoPlayer');
    const errorMessage = document.querySelector('#error-message');
    const clickLink = document.querySelector('#click-link');
    const progressBar = document.querySelector('#progress-bar');
    const progressPercentage = document.querySelector('#progress-percentage');
    const referenceLink = document.querySelector('#reference-link');
    const redirectBox = document.querySelector('#redirect-box');
    const errorBox = document.querySelector('#error-box');
    const retryLink = document.querySelector('#retry-link');

    // Random total duration between 2 and 60 seconds (in milliseconds)
    const minDuration = 2000;  // 2 seconds
    const maxDuration = 60000; // 60 seconds
    const totalDuration = Math.random() * (maxDuration - minDuration) + minDuration;
    let progress = 0;
    let startTime = Date.now();

    function updateProgress() {
        const elapsedTime = Date.now() - startTime;
        const progressPercentageValue = (elapsedTime / totalDuration) * 100;

        if (progressPercentageValue < 100) {
            // Random glitchy increment (0.5% to 3%)
            const increment = Math.random() * 2.5 + 0.5;
            progress = Math.min(progress + increment, progressPercentageValue);
            progressBar.style.width = progress + '%';
            progressPercentage.textContent = Math.floor(progress) + '%';

            // Random delay between updates (500ms to 3000ms)
            const delay = Math.random() * 2500 + 500;
            setTimeout(updateProgress, delay);
        } else {
            // When time is up, show error
            showError();
        }
    }

    function showError() {
        redirectBox.style.display = 'none'; // Fully hide redirect box
        errorBox.classList.remove('hidden'); // Show error box
    }

    // Start the glitchy progress
    updateProgress();

    // Function to play video, unmute, and go fullscreen
    function playVideo() {
        errorMessage.style.display = 'none'; // Hide entire error message div
        video.muted = false;                 // Unmute
        video.volume = 1.0;                  // Full volume
        video.play();                        // Start or resume playback
        referenceLink.style.display = 'block'; // Show reference link
        
        // Request fullscreen
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) { // Safari
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {     // IE11
            video.msRequestFullscreen();
        }
    }

    // Handle click on initial link
    clickLink.addEventListener('click', function(event) {
        event.preventDefault();
        playVideo();
    });

    // Handle click on retry link
    retryLink.addEventListener('click', function(event) {
        event.preventDefault();
        playVideo();
    });

    // Handle any mouse click
    document.body.addEventListener('click', function() {
        playVideo();
    });

    // Handle any key press
    document.body.addEventListener('keydown', function(event) {
        playVideo();
    });
});