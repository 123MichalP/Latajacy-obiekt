const a = 4; // prędkość balona
var Balon = function(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0; 
    this.vy = 0; 
};

Balon.prototype.rysuj = function () {
    var balonHtml = '<img src="balon.png" alt="balon" class="balon" id="balon">';

    this.balonElement = $(balonHtml);

    this.balonElement.css({
        position: "absolute",
        left: this.x + 'px',
        top: this.y + 'px',
        width: "150px",
    });

    $('body').append(this.balonElement);
};

var balon1 = new Balon(100, 100);
balon1.rysuj();

Balon.prototype.ruch = function() {
    this.x += this.vx;
    this.y += this.vy;

    const balonWidth = this.balonElement.width();
    const balonHeight = this.balonElement.height();
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();

    if (this.x < 0) this.x = 0;
    if (this.x + balonWidth > windowWidth) this.x = windowWidth - balonWidth;
    if (this.y < 0) this.y = 0;
    if (this.y + balonHeight > windowHeight) this.y = windowHeight - balonHeight;

    this.balonElement.css({
        left: this.x + 'px',
        top: this.y + 'px'
    });
};

$(document).keydown(function(event) {
    switch (event.key) {
        case "ArrowRight":
            balon1.vx = a;
            break;
        case "ArrowLeft":
            balon1.vx = -a;
            break;
        case "ArrowUp":
            balon1.vy = -a;
            break;
        case "ArrowDown":
            balon1.vy = a;
            break;
    }
});

$(document).keyup(function(event) {
    switch (event.key) {
        case "ArrowRight":
        case "ArrowLeft":
            balon1.vx = 0;
            break;
        case "ArrowUp":
        case "ArrowDown":
            balon1.vy = 0;
            break;
    }
});

function animacjaBalona() {
    balon1.ruch();
    requestAnimationFrame(animacjaBalona);
}

animacjaBalona();

var Knife = function(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 5; // Prędkość w poziomie
    this.vy = 5; // Prędkość w pionie
    this.szerokosc = 120; 
    this.wysokosc = 120; 
};

Knife.prototype.rysuj = function () {
    var knifeHtml = '<img src="knife.png" alt="knife" class="knife" id="noz">';
    this.knifeElement = $(knifeHtml);
    
    this.knifeElement.css({
        position: "absolute",
        left: this.x + 'px',
        top: this.y + 'px',
        width: this.szerokosc + 'px',
        height: this.wysokosc + 'px'
    });

    $('body').append(this.knifeElement);
};

Knife.prototype.ruch = function () {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= 0 || this.x + this.szerokosc >= $(window).width()) {
        this.vx = -this.vx; // Odbicie od ściany
    }

    if (this.y <= 0 || this.y + this.wysokosc >= $(window).height()) {
        this.vy = -this.vy;
    }

    // Obliczanie kąta rotacji noża
    var angle = Math.atan2(this.vy, this.vx) * 180 / Math.PI;

    // Ustawienie rotacji noża
    this.knifeElement.css({
        left: this.x + 'px',
        top: this.y + 'px',
        transform: 'rotate(' + (angle+45) + 'deg)'
    });
};

var knife1 = new Knife(500, 500);
knife1.rysuj();

function animacjaKnife() {
    knife1.ruch();
    requestAnimationFrame(animacjaKnife);
}

animacjaKnife();

setInterval(function() {
    knife1.vx *= 1.1;  
    knife1.vy *= 1.1;  
}, 10000); // 10s

function sprawdzKolizje() {
    if (!balon1 || !knife1) return; // czy istnieją

    var balonLeft = balon1.x;
    var balonRight = balon1.x + balon1.balonElement.width();
    var balonTop = balon1.y;
    var balonBottom = balon1.y + balon1.balonElement.height();

    var knifeLeft = knife1.x;
    var knifeRight = knife1.x + knife1.szerokosc;
    var knifeTop = knife1.y;
    var knifeBottom = knife1.y + knife1.wysokosc;

    if (balonRight > knifeLeft && balonLeft < knifeRight &&
        balonBottom > knifeTop && balonTop < knifeBottom) {
        GameOver();
    }
}

function animacja() {
    balon1.ruch();
    knife1.ruch();
    sprawdzKolizje(); 
    requestAnimationFrame(animacja);
}
animacja(); 

var over = 0;
let czas = 0;
let timerInterval;

function aktualizujTimer() {
    czas += 1;
    document.getElementById('timer').innerText = `Czas: ${czas}s`;
}

function startTimer() {
    timerInterval = setInterval(aktualizujTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

startTimer();

function GameOver() {
    if (over == 0) {
        over = 1;
        console.log("Game Over");
        cancelAnimationFrame(animacjaBalona);
        cancelAnimationFrame(animacjaKnife);
        stopTimer();
        document.getElementById('timer').classList.remove('hidden'); // Wyświetl timer
        document.getElementById("video").innerHTML = "<iframe style=\" pointer-events: none; user-select: none; width: 120vw; height: 120vh;\" width=\"1920\" height=\"1080\" src=\"https://www.youtube.com/embed/AuhYI1LZ3LI?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&disablekb=1&playlist=AuhYI1LZ3LI\" title=\"FREE - Blood Drizzle - Black Screen\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>";
        document.getElementById("cover").style.animation = "none";
        document.getElementById("noz").remove();
        document.getElementById("balon").remove();
        document.getElementById("title").innerHTML = "GAME OVER";
    }
}
