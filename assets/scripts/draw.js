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

function draw() {
  time += 1;

  // 清除原本背景 (覆蓋)
  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.rect(-2000, -2000, 4000, 4000);
  ctx.fill();

  // X, Y 軸
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.moveTo(-ww/2, 0);
  ctx.lineTo(ww/2, 0);
  ctx.moveTo(0, -wh/2);
  ctx.lineTo(0, wh/2);
  ctx.stroke();
}

$(window).ready(getWindowSize);
$(window).resize(getWindowSize);