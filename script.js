const homePhotoSources = [
  "assets/home/home-photo-01.jpeg",
  "assets/home/home-photo-02.jpeg",
  "assets/home/home-photo-03.jpeg",
  "assets/home/home-photo-04.jpeg",
  "assets/home/home-photo-05.jpeg",
  "assets/home/home-photo-06.jpeg",
  "assets/home/home-photo-07.jpeg",
  "assets/home/home-photo-08.jpeg",
  "assets/home/home-photo-09.jpeg",
  "assets/home/home-photo-10.jpeg",
  "assets/home/home-photo-11.jpeg",
  "assets/home/home-photo-12.jpeg",
  "assets/home/home-photo-13.jpeg",
  "assets/home/home-photo-14.jpeg",
  "assets/home/home-photo-15.jpeg",
  "assets/home/home-photo-16.jpeg",
  "assets/home/home-photo-17.jpeg",
  "assets/home/home-photo-18.jpeg",
  "assets/home/home-photo-19.jpeg",
  "assets/home/home-photo-20.jpeg",
  "assets/home/home-photo-21.jpeg",
  "assets/home/home-photo-22.jpeg",
  "assets/home/home-photo-23.jpeg",
  "assets/home/home-photo-24.jpeg",
  "assets/home/home-photo-25.jpeg",
  "assets/home/home-photo-26.jpeg",
  "assets/home/home-photo-27.jpeg",
  "assets/home/home-photo-28.jpeg",
  "assets/home/home-photo-29.jpeg",
  "assets/home/home-photo-30.jpeg",
  "assets/home/home-photo-31.jpeg",
  "assets/home/home-photo-32.jpeg",
  "assets/home/home-photo-33.jpeg",
  "assets/home/home-photo-34.jpeg",
  "assets/home/home-photo-35.jpeg",
  "assets/home/home-photo-36.jpeg",
  "assets/home/home-photo-37.jpeg",
  "assets/home/home-photo-38.jpeg",
  "assets/home/home-photo-39.jpeg",
];

class SlidingPhotoCarousel {
  constructor(rootElement, photoSources) {
    this.rootElement = rootElement;
    this.trackElement = rootElement.querySelector(".carousel-track");
    this.previousButton = rootElement.querySelector(".carousel-button-left");
    this.nextButton = rootElement.querySelector(".carousel-button-right");
    this.photoSources = photoSources;
    this.currentIndex = 0;
    this.autoAdvanceIntervalId = null;
    this.resumeTimeoutId = null;
    this.autoAdvanceDelay = 3000;
    this.resumeDelay = 10000;

    this.previousButton.addEventListener("click", () => this.handleManualPrevious());
    this.nextButton.addEventListener("click", () => this.handleManualNext());

    this.update();
    this.startAutoAdvance();
  }

  renderVisiblePhotos() {
    const visiblePhotoIndexes = [
      this.getCircularIndex(this.currentIndex - 1),
      this.currentIndex,
      this.getCircularIndex(this.currentIndex + 1),
    ];
    const positions = ["left", "center", "right"];

    this.trackElement.innerHTML = "";

    visiblePhotoIndexes.forEach((photoIndex, positionIndex) => {
      const photo = document.createElement("figure");
      const image = document.createElement("img");
      const position = positions[positionIndex];

      photo.className = `photo-card photo-card-${position}`;
      image.src = this.photoSources[photoIndex];
      image.alt = `Foto di Ambrogio e Francesca ${photoIndex + 1}`;
      photo.append(image);
      this.trackElement.append(photo);
    });
  }

  handleManualPrevious() {
    this.pauseAutoAdvance();
    this.currentIndex = this.getCircularIndex(this.currentIndex - 1);
    this.update();
    this.scheduleAutoAdvanceResume();
  }

  handleManualNext() {
    this.pauseAutoAdvance();
    this.showNextPhoto();
    this.scheduleAutoAdvanceResume();
  }

  showNextPhoto() {
    this.currentIndex = this.getCircularIndex(this.currentIndex + 1);
    this.update();
  }

  update() {
    this.renderVisiblePhotos();
  }

  startAutoAdvance() {
    this.pauseAutoAdvance();
    this.autoAdvanceIntervalId = window.setInterval(() => {
      this.showNextPhoto();
    }, this.autoAdvanceDelay);
  }

  pauseAutoAdvance() {
    if (this.autoAdvanceIntervalId !== null) {
      window.clearInterval(this.autoAdvanceIntervalId);
      this.autoAdvanceIntervalId = null;
    }
  }

  scheduleAutoAdvanceResume() {
    if (this.resumeTimeoutId !== null) {
      window.clearTimeout(this.resumeTimeoutId);
    }

    this.resumeTimeoutId = window.setTimeout(() => {
      this.startAutoAdvance();
      this.resumeTimeoutId = null;
    }, this.resumeDelay);
  }

  getCircularIndex(index) {
    const photoCount = this.photoSources.length;

    return ((index % photoCount) + photoCount) % photoCount;
  }
}

document.querySelectorAll(".photo-carousel").forEach((carouselElement) => {
  new SlidingPhotoCarousel(carouselElement, homePhotoSources);
});
