const a=5; //Szybkosc poruszania sie balonu
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
        top: this.y + 'px'  
    });

    $('body').append(this.balonElement);
};

var balon1 = new Balon(100, 100);
balon1.rysuj();
Balon.prototype.wPrawo = function(){
    this.x+=a;

    this.balonElement.css({
        left:this.x,
        top:this.y
    });
};
Balon.prototype.wLewo = function(){
    this.x-=a;

    this.balonElement.css({
        left:this.x,
        top:this.y
    });
};
Balon.prototype.wGore = function(){
    this.y-=a;

    this.balonElement.css({
        left:this.x,
        top:this.y
    });
};
Balon.prototype.wDol = function(){
    this.y+=a;

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


