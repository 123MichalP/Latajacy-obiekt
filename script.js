const a = 4; //predkosc balona
var Balon = function(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0; 
    this.vy = 0; 
};

Balon.prototype.rysuj = function () {
    var balonHtml = '<img src="balon.png" alt="balon" class="balon">';

    this.balonElement = $(balonHtml)

    this.balonElement.css({
        position: "absolute",
        left: this.y + 'px',
        top: this.y + 'px',
        width: "200px",
    });

    $('body').append(this.balonElement);
};

var balon1 = new Balon(100, 100);
balon1.rysuj();

Balon.prototype.ruch = function() {
    this.x += this.vx;
    this.y += this.vy;

    this.balonElement.css({
        left: this.x,
        top: this.y
    });
};

$(document).keydown(function(event) {
    if (event.key === "ArrowRight") {  
        balon1.vx = a;  
    }
    if (event.key === "ArrowLeft") {  
        balon1.vx = -a;  
    }
    if (event.key === "ArrowUp") {  
        balon1.vy = -a;  
    }
    if (event.key === "ArrowDown") {  
        balon1.vy = a;  
    }
});

$(document).keyup(function(event) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {  
        balon1.vx = 0;  
    }
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {  
        balon1.vy = 0;  
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
    var knifeHtml = '<img src="knife.png" alt="knife" class="knife">';
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

// Metoda poruszająca nożem i odbijająca go od ścian
Knife.prototype.ruch = function () {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= 0 || this.x + this.szerokosc >= $(window).width()) {
        this.vx = -this.vx; // Odbicie od ściany
    }

    if (this.y <= 0 || this.y + this.wysokosc >= $(window).height()) {
        this.vy = -this.vy;
    }
    if (this.vx > 0) {
        this.kamienElement.css({
            left: this.x + 'px',
            top: this.y + 'px',
            transform: 'rotate(' +  (Math.atan((this.vy)/(this.vx)) * 180 / Math.PI +45) + 'deg)'
        });
    } else {
        this.kamienElement.css({
            left: this.x + 'px',
            top: this.y + 'px',
            transform: 'rotate(' +  (Math.atan((this.vy)/(this.vx)) * 180 / Math.PI -135) + 'deg)'
        });
    }


    
};

var knife1 = new Knife(100, 100);
knife1.rysuj(); //zakomentowac, zeby usunac knife

function animacjaKnife() {
    knife1.ruch();
    requestAnimationFrame(animacjaKnife)
}

animacjaKnife();

setInterval(function() {
    knife1.vx *= 1.2;  
    knife1.vy *= 1.2;  
}, 10000); 