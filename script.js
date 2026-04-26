document.addEventListener('DOMContentLoaded', function() {
  // Бургер-меню
  const burgerIcon = document.getElementById('burgerToggle');
  const burgerOverlay = document.getElementById('burgerOverlay');
  
  if (burgerIcon && burgerOverlay) {
    burgerIcon.addEventListener('click', function() {
      this.classList.toggle('active');
      burgerOverlay.classList.toggle('active');
      document.body.style.overflow = burgerOverlay.classList.contains('active') ? 'hidden' : '';
    });
    
    burgerOverlay.addEventListener('click', function(e) {
      if (e.target === burgerOverlay) {
        burgerIcon.classList.remove('active');
        burgerOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ========== ГЛАВНЫЙ ВИДЕО-СЛАЙДЕР (исправлен под твои классы) ==========
  const videoSliderWrapper = document.querySelector('.video-slider-wrapper');
  if (videoSliderWrapper) {
    const track = videoSliderWrapper.querySelector('.video-slider-track');
    const slides = videoSliderWrapper.querySelectorAll('.video-slide');
    const prevBtn = videoSliderWrapper.querySelector('.prev-btn');
    const nextBtn = videoSliderWrapper.querySelector('.next-btn');
    const dotsContainer = videoSliderWrapper.querySelector('.slider-dots');
    
    if (slides.length && track) {
      let currentSlide = 0;
      
      // Очищаем контейнер с точками
      if (dotsContainer) dotsContainer.innerHTML = '';
      
      // Создаем точки для видео
      slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        if (dotsContainer) dotsContainer.appendChild(dot);
      });
      
      const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
      
      function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        
        // Управление видео
        slides.forEach((slide, i) => {
          const video = slide.querySelector('video');
          if (video) {
            if (i === currentSlide) {
              video.play().catch(() => {});
            } else {
              video.pause();
              video.currentTime = 0;
            }
          }
        });
      }
      
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          currentSlide = (currentSlide - 1 + slides.length) % slides.length;
          goToSlide(currentSlide);
        });
      }
      
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          currentSlide = (currentSlide + 1) % slides.length;
          goToSlide(currentSlide);
        });
      }
      
      // Автопрокрутка (работает только если мышь не на слайдере)
      let autoSlide = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
      }, 4000);
      
      const sliderContainer = videoSliderWrapper.querySelector('.video-slider-container');
      if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
        sliderContainer.addEventListener('mouseleave', () => {
          autoSlide = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
          }, 4000);
        });
      }
      
      // Запускаем первый слайд
      goToSlide(0);
    }
  }

  // ========== СЛАЙДЕРЫ ДЛЯ КАРТОЧЕК ТОВАРОВ ==========
  const productSliders = document.querySelectorAll('.product-slider');
  
  productSliders.forEach(slider => {
    const images = slider.querySelectorAll('.slider-img');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    let currentImg = 0;
    
    if (images.length === 0) return;
    
    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentImg = (currentImg - 1 + images.length) % images.length;
        showImage(currentImg);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentImg = (currentImg + 1) % images.length;
        showImage(currentImg);
      });
    }
  });

  // ========== ВИДЕО НА СТРАНИЦЕ КОНТАКТОВ ==========
  const instaVideos = document.querySelectorAll('.insta-video-card video');
  
  instaVideos.forEach(video => {
    const card = video.closest('.insta-video-card');
    if (card) {
      video.pause();
      
      card.addEventListener('mouseenter', () => {
        video.play().catch(() => {});
      });
      
      card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    }
  });
});