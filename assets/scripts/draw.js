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

// 產生十個敵人的資訊
var enemies = Array(10).fill({}).map(
  function (obj) {
    return {
      r: Math.random() * 200,
      deg: Math.random() * 360,
      opacity: 0
    }
  }
);

function color(opacity) {
  return "rgba(185, 147, 98," + opacity + ")";
}

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
    // var deg = time - i; // 100 條掃掠線
    var deg1 = time - i - 1; // 小小角度差，製造小三角形
    var deg2 = time - i;
    var point1 = point(r, deg1);
    var point2 = point(r, deg2);
    var opacity = 1 - i/100;

    // var newPoint = point(r, deg);
    ctx.beginPath();
    ctx.fillStyle = color(opacity);

    ctx.moveTo(0, 0);
    ctx.lineTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.fill();
  }

  // 敵人
  enemies.forEach(function (obj) {
    var newPoint = point(obj.r, obj.deg);
    ctx.beginPath();
    ctx.fillStyle = color(1);
    ctx.arc(newPoint.x, newPoint.y, 10, 0, 2 * Math.PI);
    ctx.fill();
  })
}

$(window).ready(getWindowSize);
$(window).resize(getWindowSize);