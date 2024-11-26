const a=8; //Szybkosc poruszania sie balonu
var Balon = function(x, y) {
    this.x = x;
    this.y = y;
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
Balon.prototype.wPrawo = function(){
    if (this.x + this.balonElement.width() < $(window).width()){
        this.x+=a;
    }

    this.balonElement.css({
        left:this.x,
        top:this.y
    });
};
Balon.prototype.wLewo = function(){
    if (this.x>-25){
    this.x-=a;
    }

    this.balonElement.css({
        left:this.x,
        top:this.y
    });
};
Balon.prototype.wGore = function(){
    if (this.y>-50){
        this.y-=a;
    }

    this.balonElement.css({
        left:this.x,
        top:this.y
    });
};
Balon.prototype.wDol = function(){
    if (this.y + this.balonElement.height() < $(window).height()) { 
        this.y+=a;
    }

    this.balonElement.css({
        left:this.x,
        top:this.y
    });
};
$(document).keydown(function(event) {
    if (event.key === "ArrowRight") {  
        balon1.wPrawo();  
    }
    if (event.key === "ArrowLeft") {  
        balon1.wLewo();  
    }
    if (event.key === "ArrowUp") {  
        balon1.wGore();  
    }
    if (event.key === "ArrowDown") {  
        balon1.wDol();  
    }
});
var Kamien = function(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 5; // Prędkość w poziomie
    this.vy = 5; // Prędkość w pionie
    this.szerokosc = 120; 
    this.wysokosc = 120; 
};

Kamien.prototype.rysuj = function () {
    var kamienHtml = '<img src="rock.png" alt="kamien" class="kamien">';
    this.kamienElement = $(kamienHtml);
    
    this.kamienElement.css({
        position: "absolute",
        left: this.x + 'px',
        top: this.y + 'px',
        width: this.szerokosc + 'px',
        height: this.wysokosc + 'px'
    });

    $('body').append(this.kamienElement);
};

// Metoda poruszająca kamieniem i odbijająca go od ścian
Kamien.prototype.ruch = function () {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= 0 || this.x + this.szerokosc >= $(window).width()) {
        this.vx = -this.vx; // Odbicie od ściany
    }

    if (this.y <= 0 || this.y + this.wysokosc >= $(window).height()) {
        this.vy = -this.vy;
    }

    this.kamienElement.css({
        left: this.x + 'px',
        top: this.y + 'px'
    });
};

var kamien1 = new Kamien(100, 100);
kamien1.rysuj(); //zakomentowac, zeby usunac kamien

function animacjaKamienia() {
    kamien1.ruch();
    requestAnimationFrame(animacjaKamienia)
}

animacjaKamienia();