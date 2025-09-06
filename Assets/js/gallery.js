// Gallery Section Management
class GalleryManager {
    constructor() {
        this.currentFilter = 'all';
        this.currentLightboxIndex = 0;
        this.galleryItems = [];
        this.filteredItems = [];
        this.itemsPerPage = 9;
        this.currentPage = 1;
        this.isLoading = false;
        
        // Sample gallery data - replace with your actual images
        this.galleryData = [
            {
                id: 1,
                title: "Maasai Mara Wildlife",
                description: "Experience the great wildebeest migration",
                category: "wildlife",
                image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500",
                fullImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200"
            },
            {
                id: 2,
                title: "Mount Kenya Peak",
                description: "Breathtaking views from Africa's second highest peak",
                category: "mountains",
                image: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=500",
                fullImage: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=1200"
            },
            {
                id: 3,
                title: "Diani Beach Paradise",
                description: "Crystal clear waters and white sandy beaches",
                category: "beaches",
                image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500",
                fullImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200"
            },
            {
                id: 4,
                title: "Samburu Cultural Experience",
                description: "Traditional dances and authentic cultural immersion",
                category: "culture",
                image: "https://images.unsplash.com/photo-1516495080664-3ac05d6b2c35?w=500",
                fullImage: "https://images.unsplash.com/photo-1516495080664-3ac05d6b2c35?w=1200"
            },
            {
                id: 5,
                title: "Lake Nakuru Flamingos",
                description: "Millions of pink flamingos in their natural habitat",
                category: "wildlife",
                image: "https://images.unsplash.com/photo-1534188753412-5cd9463b1bb7?w=500",
                fullImage: "https://images.unsplash.com/photo-1534188753412-5cd9463b1bb7?w=1200"
            },
            {
                id: 6,
                title: "Lamu Island Heritage",
                description: "UNESCO World Heritage site with Swahili architecture",
                category: "culture",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
                fullImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200"
            },
            {
                id: 7,
                title: "Amboseli Elephants",
                description: "Majestic elephants with Mount Kilimanjaro backdrop",
                category: "wildlife",
                image: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=500",
                fullImage: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=1200"
            },
            {
                id: 8,
                title: "Hell's Gate Adventure",
                description: "Rock climbing and geothermal wonders",
                category: "adventure",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
                fullImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
            },
            {
                id: 9,
                title: "Watamu Marine Park",
                description: "Pristine coral reefs and marine biodiversity",
                category: "beaches",
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500",
                fullImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200"
            }
        ];
        
        this.init();
    }

    init() {
        this.createGalleryHTML();
        this.createLightboxHTML();
        this.bindEvents();
        this.filterGallery('all');
        console.log('Gallery initialized successfully');
    }

    createGalleryHTML() {
        const gallerySection = document.getElementById('gallery');
        if (!gallerySection) return;

        gallerySection.innerHTML = `
            <div class="container">
                <div class="gallery-content-wrapper">
                    <div class="gallery-header">
                        <h2 class="gallery-title">Discover Kenya</h2>
                        <p class="gallery-subtitle">
                            Explore the breathtaking beauty and rich culture of Kenya through our curated collection of experiences and destinations.
                        </p>
                    </div>
                    
                    <div class="gallery-filter">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="wildlife">Wildlife</button>
                        <button class="filter-btn" data-filter="culture">Culture</button>
                        <button class="filter-btn" data-filter="beaches">Beaches</button>
                        <button class="filter-btn" data-filter="mountains">Mountains</button>
                        <button class="filter-btn" data-filter="adventure">Adventure</button>
                    </div>
                    
                    <div class="gallery-grid" id="galleryGrid">
                        <!-- Gallery items will be populated here -->
                    </div>
                    
                    <div class="gallery-loading" id="galleryLoading">
                        <div class="loading-spinner"></div>
                        <p>Loading more images...</p>
                    </div>
                    
                    <div class="gallery-load-more">
                        <button class="load-more-btn" id="loadMoreBtn" style="display: none;">
                            Load More Images
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    createLightboxHTML() {
        const lightboxHTML = `
            <div class="lightbox" id="lightbox">
                <div class="lightbox-content">
                    <button class="lightbox-close" id="lightboxClose">
                        <i class="fas fa-times"></i>
                    </button>
                    <button class="lightbox-nav lightbox-prev" id="lightboxPrev">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <img class="lightbox-image" id="lightboxImage" src="" alt="">
                    <button class="lightbox-nav lightbox-next" id="lightboxNext">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }

    bindEvents() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterGallery(filter);
                this.updateFilterButtons(e.target);
            });
        });

        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreItems());
        }

        // Lightbox events
        const lightbox = document.getElementById('lightbox');
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');

        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => this.closeLightbox());
        }

        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', () => this.prevImage());
        }

        if (lightboxNext) {
            lightboxNext.addEventListener('click', () => this.nextImage());
        }

        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    this.closeLightbox();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox && lightbox.classList.contains('show')) {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.prevImage();
                if (e.key === 'ArrowRight') this.nextImage();
            }
        });
    }

    filterGallery(filter) {
        this.currentFilter = filter;
        this.currentPage = 1;
        
        if (filter === 'all') {
            this.filteredItems = [...this.galleryData];
        } else {
            this.filteredItems = this.galleryData.filter(item => item.category === filter);
        }
        
        this.renderGallery();
    }

    updateFilterButtons(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    renderGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;

        // Clear existing items
        galleryGrid.innerHTML = '';

        // Calculate items to show
        const itemsToShow = this.currentPage * this.itemsPerPage;
        const itemsToRender = this.filteredItems.slice(0, itemsToShow);

        // Render items
        itemsToRender.forEach((item, index) => {
            const galleryItem = this.createGalleryItem(item, index);
            galleryGrid.appendChild(galleryItem);
        });

        // Update load more button
        this.updateLoadMoreButton();

        // Add animation
        setTimeout(() => {
            galleryGrid.querySelectorAll('.gallery-item').forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('fade-in');
                }, index * 100);
            });
        }, 100);
    }

    createGalleryItem(item, index) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img class="gallery-item-image" src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="gallery-item-category">${item.category}</div>
            <div class="gallery-item-overlay">
                <div class="gallery-item-content">
                    <h3 class="gallery-item-title">${item.title}</h3>
                    <p class="gallery-item-description">${item.description}</p>
                    <button class="gallery-view-btn">
                        <i class="fas fa-eye"></i> View Full Size
                    </button>
                </div>
            </div>
        `;

        // Add click event for lightbox
        galleryItem.addEventListener('click', () => {
            this.openLightbox(index);
        });

        return galleryItem;
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (!loadMoreBtn) return;

        const totalItems = this.filteredItems.length;
        const shownItems = this.currentPage * this.itemsPerPage;

        if (shownItems < totalItems) {
            loadMoreBtn.style.display = 'inline-block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }

    loadMoreItems() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        const loadingElement = document.getElementById('galleryLoading');
        
        if (loadingElement) {
            loadingElement.style.display = 'block';
        }

        // Simulate loading delay
        setTimeout(() => {
            this.currentPage++;
            this.renderGallery();
            this.isLoading = false;
            
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
        }, 1000);
    }

    openLightbox(index) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        
        if (!lightbox || !lightboxImage) return;

        this.currentLightboxIndex = index;
        const currentItem = this.filteredItems[index];
        
        lightboxImage.src = currentItem.fullImage;
        lightboxImage.alt = currentItem.title;
        
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        lightbox.classList.remove('show');
        document.body.style.overflow = '';
    }

    prevImage() {
        if (this.currentLightboxIndex > 0) {
            this.currentLightboxIndex--;
        } else {
            this.currentLightboxIndex = this.filteredItems.length - 1;
        }
        this.updateLightboxImage();
    }

    nextImage() {
        if (this.currentLightboxIndex < this.filteredItems.length - 1) {
            this.currentLightboxIndex++;
        } else {
            this.currentLightboxIndex = 0;
        }
        this.updateLightboxImage();
    }

    updateLightboxImage() {
        const lightboxImage = document.getElementById('lightboxImage');
        if (!lightboxImage) return;

        const currentItem = this.filteredItems[this.currentLightboxIndex];
        lightboxImage.src = currentItem.fullImage;
        lightboxImage.alt = currentItem.title;
    }

    // Method to add new images dynamically
    addImages(newImages) {
        this.galleryData.push(...newImages);
        this.filterGallery(this.currentFilter);
    }

    // Method to remove image
    removeImage(imageId) {
        this.galleryData = this.galleryData.filter(item => item.id !== imageId);
        this.filterGallery(this.currentFilter);
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.galleryManager = new GalleryManager();
});

// Export for use in other modules
window.GalleryManager = GalleryManager;
