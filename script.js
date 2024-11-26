var ufo = function(x, y) {
    this.x = x;
    this.y = y;
};

var rysujUfo = function (ufoo) {
    var ufoHtml = '<div class = "ufo"></div>';
    var ufoElement = $(ufoHtml);
    
    ufoElement.css({
        left: ufoo.x,
    });

    $(body).append(ufoElement);
};

var ufo1 = new ufo(100, 100);
rysujUfo(ufo1);
