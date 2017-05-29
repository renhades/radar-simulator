var c = $("#myCanvas")[0],
    ctx = c.getContext("2d"),
    ww,
    wh,
    center = {x: 0, y: 0};


// 將畫布的寬高設定為視窗的寬高
function getWindowSize() {
  ww = $(window).outerWidth();
  wh = $(window).outerHeight();
  c.width = ww;
  c.height = wh;
  center = {x: ww/2, y: wh/2};

  ctx.restore(); // 重設畫布狀態
  ctx.translate(center.x, center.y); // 重設畫布的中心點
}


setInterval(draw, 10);
var time = 0;

var degToPi = Math.PI / 180;

function point(r, deg) {
  return {
    x: r * Math.cos( deg * degToPi ),
    y: r * Math.sin( deg * degToPi )
  }
}

function draw() {
  time += 1;

  // 清除原本背景 (覆蓋)
  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.rect(-2000, -2000, 4000, 4000);
  ctx.fill();

  // X, Y 軸
  ctx.beginPath();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.moveTo(-ww/2, 0);
  ctx.lineTo(ww/2, 0);
  ctx.moveTo(0, -wh/2);
  ctx.lineTo(0, wh/2);
  ctx.stroke();

  // 掃掠線
  var r = 200;
  var deg = time;
  var newPoint = point(r, deg);
  // ctx.beginPath();
  // ctx.moveTo(0, 0);
  // ctx.lineTo(newPoint.x, newPoint.y);
  // ctx.stroke();

  // 有漸層的掃掠線
  for (var i = 0; i < 100; i++) {
    var deg = time - i;
    // console.log(deg)
    var newPoint = point(r, deg);
    ctx.beginPath();
    ctx.strokeStyle = "rgba(185, 147, 98," + (1 - i/100) + ")";

    ctx.moveTo(0, 0);
    ctx.lineTo(newPoint.x, newPoint.y);
    ctx.stroke();
  }
}

$(window).ready(getWindowSize);
$(window).resize(getWindowSize);