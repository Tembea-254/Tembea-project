// Video background management
class VideoManager {
    constructor() {
        this.currentVideo = 1;
        this.video1 = document.getElementById('video1');
        this.video2 = document.getElementById('video2');
    }

    switchVideo() {
        if (this.currentVideo === 1) {
            this.video1?.classList.remove('active');
            this.video2?.classList.add('active');
            this.currentVideo = 2;
        } else {
            this.video2?.classList.remove('active');
            this.video1?.classList.add('active');
            this.currentVideo = 1;
        }
    }
}

// Floating video player functionality
class FloatingVideoPlayer {
    constructor() {
        this.floatingVideo = document.getElementById('floatingVideo');
        this.videoFrame = document.getElementById('floatingVideoFrame');
    }

    play() {
        if (this.videoFrame && this.floatingVideo) {
            this.videoFrame.src = "https://www.youtube.com/embed/Ks-_Mh1QhMc?autoplay=1";
            this.floatingVideo.classList.add('show');
        }
    }

    close() {
        if (this.videoFrame && this.floatingVideo) {
            this.videoFrame.src = "";
            this.floatingVideo.classList.remove('show');
        }
    }
}

// Global functions for backward compatibility
window.playFloatingVideo = () => {
    window.floatingVideoPlayer?.play();
};

window.closeFloatingVideo = () => {
    window.floatingVideoPlayer?.close();
};

// Export classes
window.VideoManager = VideoManager;
window.FloatingVideoPlayer = FloatingVideoPlayer;
