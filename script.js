var Balon = function(x, y) {
    this.x = x;
    this.y = y;
};

var RysujBalon = function (balon) {
    var balonHtml = '<img src="balon.png" alt="balon" class="balon">';
    var balonElement = $(balonHtml);
    
    balonElement.css({
        left: balon.x,
    });

    $('body').append(balonElement);
};

var balon1 = new Balon(100, 100);
RysujBalon(balon1);
