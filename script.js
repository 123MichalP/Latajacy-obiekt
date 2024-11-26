var Balon = function(x, y) {
    this.x = x;
    this.y = y;
};

Balon.prototype.rysuj = function () {
    var balonHtml = '<img src="balon.png" alt="balon" class="balon">';

    this.balonElement = $(balonHtml)
    
    this.balonElement.css({
        posistion: "absolute",
        right: this.x + 'px',
        left: this.y + 'px'
    });

    $('body').append(this.balonElement);
};

var balon1 = new Balon(100, 100);
balon1.rysuj();
