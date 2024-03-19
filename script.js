document.addEventListener('DOMContentLoaded', function() {
    var textWrapper = document.getElementById('typewriter');
    // Set the text content directly to avoid overwriting with empty spans
    var fullText = 'Ando Kivilaid\n\nfull stack human';
    textWrapper.innerHTML = '';

    function random(min, max) {
        return min + Math.random() * (max - min);
    }

    const body = document.querySelector('body');
    const canvasSize = body.offsetWidth * body.offsetHeight;
    const starsFraction = Math.ceil(canvasSize / 2000);

    for(let i = 0; i < starsFraction; i++) {
        // Set up random elements
        let xPos = random(0, 100);
        let yPos = random(0, 100);
        let alpha = random(0.5, 1);
        let size = random(1, 3); // Size range between 1px and 3px

        // Add them to the body
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.position = 'absolute';
        star.style.left = xPos + '%';
        star.style.top = yPos + '%';
        star.style.opacity = 0; // Start with 0 opacity
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.boxShadow = `0 0 ${size}px white`; // Optional: Add a glow effect
        star.style.animation = `appearDisappear ${random(5, 10)}s infinite`; // Randomize animation duration between 5s and 10s
        body.appendChild(star);
    }

    // Create spans for each character
    fullText.split('').forEach(function(char) {
        var span = document.createElement('span');
        span.textContent = char === '\n' ? '' : char; // Do not replace newline with space
        span.style.opacity = '0';
        textWrapper.appendChild(span);
    });
    // ... rest of the script remains unchanged ...
    // Insert a Tailwind CSS class for a new line
    var newLineSpan = document.createElement('span');
    newLineSpan.className = 'block';
    newLineSpan.style.opacity = '0';
    textWrapper.insertBefore(newLineSpan, textWrapper.childNodes[fullText.indexOf('\n\n') + 1]);

    // Animate each span to appear in sequence
    var spans = textWrapper.getElementsByTagName('span');
    var charIndex = 0;
    var interval = setInterval(function() {
        if (spans[charIndex]) {
            spans[charIndex].style.opacity = '1';
            charIndex++;
        }
        if (charIndex >= spans.length) {
            clearInterval(interval);
            // Create the cursor span and append it to the textWrapper
            var cursorSpan = document.createElement('span');
            cursorSpan.className = 'cursor';
            cursorSpan.textContent = '|';
            textWrapper.appendChild(cursorSpan);
        }
    }, 50); // Typing speed in milliseconds (now twice as fast)

});
