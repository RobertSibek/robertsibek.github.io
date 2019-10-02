// Set the date we're counting down to
var countDownDate = new Date("Oct 24, 2019 12:00:00").getTime();
var rotZ = 0;
var rotated = false;
var rotZsec = 0;
var rotZmin = 0;
var rotZhour = 0;
var localNow = new Date();  

var utc = localNow.getTime() + (localNow.getTimezoneOffset() * 60000);
var now = new Date(utc + (3600000*3));    
var degMinus = 75;
var minDeg = ( (now.getMinutes() * 6) - degMinus);
var hourDeg = (0.5 * ( 60 * now.getHours() + now.getMinutes())) - degMinus;

var secRotated = false;
var minRotated = false;
var hourRotated = false;

// Initial rotation of all hands
var startRot = setInterval(function() {

  var secDeg = ( (now.getSeconds() * 6) - degMinus);
  var rotZ_sec_max = 360 + secDeg;
  var rotZ_min_max = 360 + minDeg;
  var rotZ_hour_max = 360 + hourDeg;

  if (rotZsec <= rotZ_sec_max) {
    document.getElementById("hand_sec").style.transform = 'rotateZ(' + rotZsec + 'deg)';  
    document.getElementById("hand_sec2").style.transform = 'rotateZ(' + rotZsec + 'deg)';  
    rotZsec += 2;
  } else {
      secRotated = true;
    
  }

  if (rotZmin <= rotZ_min_max) {
    document.getElementById("hand_min").style.transform = 'rotateZ(' + rotZmin  + 'deg)';    
    rotZmin += 3;
  } else {
      minRotated = true;
  }
  
  if (rotZhour <= rotZ_hour_max) {
    document.getElementById("hand_hrs").style.transform = 'rotateZ(' + rotZhour  + 'deg)';  
    rotZhour += 5;
  } else {
     hourRotated = true;
  }
  
  if (secRotated && minRotated && hourRotated) {
    rotated = true;  
    clearInterval(startRot);
  }
  
}, 10);

// Update the count down every 1 second
var x = setInterval(function() {

  var localNow = new Date();  
  
  var utc = localNow.getTime() + (localNow.getTimezoneOffset() * 60000);
  
  // Offset for Moscow 3 hours
  var cityOffset = 2;
  var now = new Date(utc + (3600000 * cityOffset));    
  
  var currentTime = now.getTime();
  
  // Find the distance between now and the count down date
  var distance = countDownDate - currentTime;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("days").innerHTML = days + '<div class="sub">Days</div>';
  document.getElementById("hours").innerHTML = hours + '<div class="sub">Hours</div>';
  document.getElementById("minutes").innerHTML = minutes + '<div class="sub">Minutes</div>';;
  document.getElementById("seconds").innerHTML = seconds + '<div class="sub">Secs</div>';
  
  degMinus = 75;
  secDeg = ( (now.getSeconds() * 6) - degMinus);
  minDeg = ( (now.getMinutes() * 6) - degMinus);
  hourDeg = (0.5 * ( 60 * now.getHours() + now.getMinutes())) - degMinus;
  
  // if all hands were rotated, let's animate
  if (rotated) {
    document.getElementById("hand_sec").style.transform = 'rotateZ(' + secDeg  + 'deg)';    
    document.getElementById("hand_sec2").style.transform = 'rotateZ(' + secDeg  + 'deg)';
    document.getElementById("hand_min").style.transform = 'rotateZ(' + minDeg  + 'deg)';
    document.getElementById("hand_hrs").style.transform = 'rotateZ(' + hourDeg  + 'deg)';    
    
  }
  
  // If the count down is finished, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("counterContainer").innerHTML = "EVENT IS LIVE";
  }
}, 1000);