
//getting interactable elements;
var dataButton = document.getElementById('sData');
var moreData = document.querySelector('.moreData');
moreData.style.display = 'none';
var clouds = document.querySelectorAll('.cloud');

//Change moreData
function toggleData(){
    if(moreData.style.display == 'none'){
        
        moreData.style.display = 'initial';
        dataButton.innerHTML = 'Less info &#8593;'
    } 
    else {
        moreData.style.display = 'none';
        dataButton.innerHTML = 'More info &#8595;'
    }
}
//times and make sure that the scroll listener dont trigger to often
function debounce(func, wait = 20, immediate = true) {
    console.log(window.scrollY);

    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function checkSlide() {
      console.log('test');
    clouds.forEach(sliderImage => {
      // half way through the image
      const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
      // bottom of the image
      const imageBottom = sliderImage.offsetTop + sliderImage.height;
      const isHalfShown = slideInAt > sliderImage.offsetTop;
      const isNotScrolledPast = window.scrollY < imageBottom;
      if (isHalfShown && isNotScrolledPast) {
        sliderImage.classList.add('active');
      } else {
        sliderImage.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', debounce(checkSlide));
dataButton.addEventListener('click',toggleData);
