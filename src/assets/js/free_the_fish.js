!function() {
  'use strict'

  if (window['wandafishmovingspeed']) {
    var free_the_fish = document.querySelector('button');
    if (free_the_fish) {
      button.textContent = 'Fish is swimming';
    }
    return;
  }

  window['wandafishmovinginitialspeed'] = 4;
  window['wandafishmovingspeed'] = window['wandafishmovinginitialspeed'];

  const WandaFishWidth = 36;
  const WandaFishHeight = 24;

  function randY() {
    var top = Math.round(Math.random()*(window.innerHeight / WandaFishHeight))*WandaFishHeight;
    return top+'px';
  }

  function randX() {
    var odd = Math.round(Math.random()*100)%2 == 1;
    if (odd) {
      return -fish.style.left;
    } else {
      return window.innerWidth + 'px';
    }
  }

  function Image(index) {
    var backgroundImage = chrome.extension.getURL('assets/images/wanda-'+index+'.png');
    return backgroundImage;
  }

  function whichDirection() {
    return (window['wandafishmovingspeed']/Math.abs(window['wandafishmovingspeed']));
  }

  function resetToInitialSpped() {
    window['wandafishmovingspeed'] = whichDirection() * window['wandafishmovinginitialspeed'];
  }

  function invertDirection() {
    window['wandafishmovingspeed'] = -window['wandafishmovingspeed'];
  }

  var index = 0;
  var fish = document.createElement('img');
  fish.style.cssText = 'position:fixed;left:'+randX()+';top:'+randY()+';z-index:9999999';
  fish.src = Image(index);
  fish.addEventListener('click', function() {
    window['wandafishmovingspeed'] += window['wandafishmovingspeed'];
  }, !0);
  document.body.appendChild(fish);

  setInterval(function() {
    if ((parseInt(fish.style.left) + parseInt(fish.style.width) < 0 &&
        window['wandafishmovingspeed'] < 0) ||
        (parseInt(fish.style.left) > window.innerWidth &&
        window['wandafishmovingspeed'] > 0)) {
      fish.style.top = randY();
      resetToInitialSpped();
      invertDirection();
    }

    index++, index %= 8;
    fish.src = Image(index);

    if (index % 7 == 0) {
      fish.style.left = (parseInt(fish.style.left) + window['wandafishmovingspeed']) + 'px';
    }
    // console.log(fish.style.left, fish.style.top);
  }, 200);
}();
