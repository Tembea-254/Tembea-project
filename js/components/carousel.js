// Image carousel functionality
class ImageCarousel {
    constructor() {
        this.mainImages = document.querySelectorAll('.main-image .carousel-image');
        this.thumbnails = document.querySelectorAll('.thumbnail');
        this.currentImage = 0;
        this.imageInterval = null;
        this.init();
    }

    init() {
        if (this.mainImages.length > 0) {
            this.showImage(0);
            this.startImageInterval();
        }
    }

    showImage(index) {
        this.mainImages.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        this.thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        this.currentImage = index;
    }

    prevImage() {
        let index = this.currentImage - 1;
        if (index < 0) index = this.mainImages.length - 1;
        this.showImage(index);
        this.resetImageInterval();
    }

    nextImage() {
        let index = (this.currentImage + 1) % this.mainImages.length;
        this.showImage(index);
        this.resetImageInterval();
    }

    autoNextImage() {
        this.nextImage();
    }

    startImageInterval() {
        this.imageInterval = setInterval(() => this.autoNextImage(), 4000);
    }

    resetImageInterval() {
        clearInterval(this.imageInterval);
        this.startImageInterval();
    }
}

// Global functions for backward compatibility
window.showImage = (index) => {
    window.imageCarousel?.showImage(index);
};

window.prevImage = () => {
    window.imageCarousel?.prevImage();
};

window.nextImage = () => {
    window.imageCarousel?.nextImage();
};

// Export class
window.ImageCarousel = ImageCarousel;
