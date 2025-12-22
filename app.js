// Image Converter Pro - Main Application Logic

class ImageConverter {
    constructor() {
        this.images = [];
        this.convertedImages = [];
        this.currentPreset = 'none';
        this.presetSizes = this.initializePresets();
        this.userPresets = this.loadUserPresets();
        this.conversionHistory = this.loadHistory();
        this.customSizesList = []; // User-defined custom sizes
        this.editingSizeIndex = null; // Index of size being edited
        this.initializeElements();
        this.setupEventListeners();
        this.checkFormatSupport();
        this.setupKeyboardShortcuts();
        this.setupAutoTheme();
    }

    initializePresets() {
        return {
            'none': [],
            'custom-list': [], // Custom size list - user builds this
            'logo': [
                { width: 512, height: 512, name: '512x512' },
                { width: 256, height: 256, name: '256x256' },
                { width: 128, height: 128, name: '128x128' },
                { width: 64, height: 64, name: '64x64' },
                { width: 32, height: 32, name: '32x32' }
            ],
            'favicon': [
                { width: 16, height: 16, name: '16x16' },
                { width: 32, height: 32, name: '32x32' },
                { width: 48, height: 48, name: '48x48' },
                { width: 64, height: 64, name: '64x64' }
            ],
            'android': [
                { width: 48, height: 48, name: 'mdpi_48x48' },
                { width: 72, height: 72, name: 'hdpi_72x72' },
                { width: 96, height: 96, name: 'xhdpi_96x96' },
                { width: 144, height: 144, name: 'xxhdpi_144x144' },
                { width: 192, height: 192, name: 'xxxhdpi_192x192' },
                { width: 512, height: 512, name: 'playstore_512x512' }
            ],
            'ios': [
                { width: 60, height: 60, name: '60x60' },
                { width: 120, height: 120, name: '120x120' },
                { width: 180, height: 180, name: '180x180' },
                { width: 1024, height: 1024, name: 'appstore_1024x1024' }
            ],
            'social': [
                { width: 1080, height: 1080, name: 'instagram_1080x1080' },
                { width: 1200, height: 630, name: 'facebook_1200x630' },
                { width: 1280, height: 720, name: 'youtube_1280x720' },
                { width: 1200, height: 675, name: 'twitter_1200x675' }
            ],
            'all': [
                { width: 512, height: 512, name: '512x512' },
                { width: 256, height: 256, name: '256x256' },
                { width: 128, height: 128, name: '128x128' },
                { width: 64, height: 64, name: '64x64' },
                { width: 32, height: 32, name: '32x32' },
                { width: 16, height: 16, name: '16x16' },
                { width: 1024, height: 1024, name: '1024x1024' },
                { width: 192, height: 192, name: '192x192' },
                { width: 180, height: 180, name: '180x180' },
                { width: 144, height: 144, name: '144x144' },
                { width: 120, height: 120, name: '120x120' },
                { width: 96, height: 96, name: '96x96' },
                { width: 72, height: 72, name: '72x72' },
                { width: 60, height: 60, name: '60x60' },
                { width: 48, height: 48, name: '48x48' }
            ]
        };
    }

    initializeElements() {
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.settingsPanel = document.getElementById('settingsPanel');
        this.imagesGrid = document.getElementById('imagesGrid');
        this.gridContainer = document.getElementById('gridContainer');
        this.progressSection = document.getElementById('progressSection');
        this.progressContainer = document.getElementById('progressContainer');
        this.resultsSection = document.getElementById('resultsSection');
        this.resultsContainer = document.getElementById('resultsContainer');
        this.convertBtn = document.getElementById('convertBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.downloadAllBtn = document.getElementById('downloadAllBtn');
        this.outputFormat = document.getElementById('outputFormat');
        this.quality = document.getElementById('quality');
        this.qualityValue = document.getElementById('qualityValue');
        this.resizeMode = document.getElementById('resizeMode');
        this.resizeWidth = document.getElementById('resizeWidth');
        this.resizeHeight = document.getElementById('resizeHeight');
        this.resizeDimensions = document.getElementById('resizeDimensions');
        this.resizeHeightGroup = document.getElementById('resizeHeightGroup');
        this.backgroundColorGroup = document.getElementById('backgroundColorGroup');
        this.backgroundColor = document.getElementById('backgroundColor');
        this.preserveTransparency = document.getElementById('preserveTransparency');
        this.removeMetadata = document.getElementById('removeMetadata');
        this.zipFormat = document.getElementById('zipFormat');
        this.presetButtons = document.querySelectorAll('.preset-btn');
        this.presetInfo = document.getElementById('presetInfo');
        this.bgPresetButtons = document.querySelectorAll('.bg-preset-btn');
        this.cropShape = document.getElementById('cropShape');
        this.autoPadding = document.getElementById('autoPadding');
        this.autoSharpening = document.getElementById('autoSharpening');
        this.dpi = document.getElementById('dpi');
        this.advancedOptions = document.getElementById('advancedOptions');
        this.resizeType = document.getElementById('resizeType');
        this.pixelDimensions = document.getElementById('pixelDimensions');
        this.percentageDimensions = document.getElementById('percentageDimensions');
        this.maxFileSizeGroup = document.getElementById('maxFileSizeGroup');
        this.maxDimensionsGroup = document.getElementById('maxDimensionsGroup');
        this.resizePercentage = document.getElementById('resizePercentage');
        this.percentageValue = document.getElementById('percentageValue');
        this.maxFileSize = document.getElementById('maxFileSize');
        this.maxWidth = document.getElementById('maxWidth');
        this.maxHeight = document.getElementById('maxHeight');
        this.keepAspectRatio = document.getElementById('keepAspectRatio');
        this.convertMultipleFormats = document.getElementById('convertMultipleFormats');
        this.formatSelection = document.getElementById('formatSelection');
        this.formatOptions = document.querySelectorAll('.format-option');
        this.customNaming = document.getElementById('customNaming');
        this.customNamingPattern = document.getElementById('customNamingPattern');
        this.zipOptionsGroup = document.getElementById('zipOptionsGroup');
        this.zipCompressionLevel = document.getElementById('zipCompressionLevel');
        this.zipFileName = document.getElementById('zipFileName');
        this.organizeByFormat = document.getElementById('organizeByFormat');
        this.organizeBySize = document.getElementById('organizeBySize');
        this.folderImport = document.getElementById('folderImport');
        this.autoTheme = document.getElementById('autoTheme');
        this.savePresetBtn = document.getElementById('savePresetBtn');
        this.historyBtn = document.getElementById('historyBtn');
        this.historySection = document.getElementById('historySection');
        this.historyList = document.getElementById('historyList');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
        this.presetModal = document.getElementById('presetModal');
        this.presetName = document.getElementById('presetName');
        this.savePresetConfirmBtn = document.getElementById('savePresetConfirmBtn');
        this.cancelPresetBtn = document.getElementById('cancelPresetBtn');
        this.userPresetsSection = document.getElementById('userPresetsSection');
        this.userPresetsList = document.getElementById('userPresetsList');
        this.folderInput = document.getElementById('folderInput');
        this.percentButtons = document.querySelectorAll('.percent-btn');
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle?.querySelector('.theme-icon');
        this.customSizeListSection = document.getElementById('customSizeListSection');
        this.newSizeWidth = document.getElementById('newSizeWidth');
        this.newSizeHeight = document.getElementById('newSizeHeight');
        this.newSizeKeepAspect = document.getElementById('newSizeKeepAspect');
        this.addSizeBtn = document.getElementById('addSizeBtn');
        this.customSizesListContainer = document.getElementById('customSizesList');
        this.clearSizeListBtn = document.getElementById('clearSizeListBtn');
        this.saveSizeListPresetBtn = document.getElementById('saveSizeListPresetBtn');
        this.editSizeModal = document.getElementById('editSizeModal');
        this.editSizeWidth = document.getElementById('editSizeWidth');
        this.editSizeHeight = document.getElementById('editSizeHeight');
        this.editSizeFormat = document.getElementById('editSizeFormat');
        this.editSizeQuality = document.getElementById('editSizeQuality');
        this.editQualityValue = document.getElementById('editQualityValue');
        this.editSizeKeepAspect = document.getElementById('editSizeKeepAspect');
        this.editSizeBackground = document.getElementById('editSizeBackground');
        this.editSizeResizeMode = document.getElementById('editSizeResizeMode');
        this.saveSizeEditBtn = document.getElementById('saveSizeEditBtn');
        this.cancelSizeEditBtn = document.getElementById('cancelSizeEditBtn');
    }

    setupEventListeners() {
        // Upload area events
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        this.uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        this.uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.uploadArea.addEventListener('drop', this.handleDrop.bind(this));
        
        // File input
        this.fileInput.addEventListener('change', (e) => this.handleFiles(e.target.files));
        this.folderInput.addEventListener('change', (e) => this.handleFiles(e.target.files));
        
        // Resize type change
        this.resizeType.addEventListener('change', (e) => {
            const type = e.target.value;
            this.pixelDimensions.style.display = type === 'pixels' ? 'block' : 'none';
            this.percentageDimensions.style.display = type === 'percentage' ? 'block' : 'none';
            this.maxFileSizeGroup.style.display = type === 'maxfilesize' ? 'block' : 'none';
            this.maxDimensionsGroup.style.display = type === 'maxdimensions' ? 'block' : 'none';
        });

        // Percentage slider
        this.resizePercentage.addEventListener('input', (e) => {
            this.percentageValue.textContent = e.target.value;
        });

        // Percentage preset buttons
        this.percentButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const percent = e.target.dataset.percent;
                this.resizePercentage.value = percent;
                this.percentageValue.textContent = percent;
            });
        });

        // Multiple formats
        this.convertMultipleFormats.addEventListener('change', (e) => {
            this.formatSelection.style.display = e.target.checked ? 'block' : 'none';
        });

        // Custom naming
        this.customNaming.addEventListener('change', (e) => {
            this.customNamingPattern.style.display = e.target.value === 'custom' ? 'block' : 'none';
        });

        // ZIP format change
        this.zipFormat.addEventListener('change', (e) => {
            this.zipOptionsGroup.style.display = e.target.value === 'zip' ? 'block' : 'none';
        });

        // Folder import
        this.folderImport.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.fileInput.setAttribute('webkitdirectory', '');
            } else {
                this.fileInput.removeAttribute('webkitdirectory');
            }
        });

        // Preset buttons
        this.savePresetBtn.addEventListener('click', () => this.showPresetModal());
        this.savePresetConfirmBtn.addEventListener('click', () => this.saveCurrentPreset());
        this.cancelPresetBtn.addEventListener('click', () => this.closePresetModal());
        this.historyBtn.addEventListener('click', () => this.toggleHistory());
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());

        // Custom size list
        this.addSizeBtn.addEventListener('click', () => this.addCustomSize());
        this.newSizeWidth.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addCustomSize();
        });
        this.newSizeHeight.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addCustomSize();
        });
        this.clearSizeListBtn.addEventListener('click', () => this.clearCustomSizesList());
        this.saveSizeListPresetBtn.addEventListener('click', () => this.saveSizeListAsPreset());
        this.saveSizeEditBtn.addEventListener('click', () => this.saveSizeEdit());
        this.cancelSizeEditBtn.addEventListener('click', () => this.closeSizeEditModal());
        this.editSizeQuality.addEventListener('input', (e) => {
            this.editQualityValue.textContent = e.target.value;
        });

        // Close modals on outside click
        this.presetModal.addEventListener('click', (e) => {
            if (e.target === this.presetModal) {
                this.closePresetModal();
            }
        });
        this.editSizeModal.addEventListener('click', (e) => {
            if (e.target === this.editSizeModal) {
                this.closeSizeEditModal();
            }
        });
        
        // Settings
        this.quality.addEventListener('input', (e) => {
            this.qualityValue.textContent = e.target.value;
        });

        this.resizeMode.addEventListener('change', (e) => {
            const showDimensions = e.target.value === 'custom' || e.target.value === 'fit' || e.target.value === 'fill';
            if (this.resizeDimensions) this.resizeDimensions.style.display = showDimensions ? 'block' : 'none';
            if (this.resizeHeightGroup) this.resizeHeightGroup.style.display = showDimensions ? 'block' : 'none';
        });

        this.outputFormat.addEventListener('change', (e) => {
            const needsBackground = e.target.value === 'jpg' || e.target.value === 'jpeg';
            this.backgroundColorGroup.style.display = needsBackground ? 'block' : 'none';
        });

        this.resizeMode.addEventListener('change', (e) => {
            const isCircular = e.target.value === 'circular';
            this.advancedOptions.style.display = isCircular ? 'block' : 'none';
        });

        // Preset buttons
        this.presetButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const preset = e.target.dataset.preset;
                this.selectPreset(preset);
            });
        });

        // Background color preset buttons
        this.bgPresetButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const color = e.target.dataset.color;
                if (color === 'transparent') {
                    this.preserveTransparency.checked = true;
                    this.outputFormat.value = 'png';
                } else {
                    this.backgroundColor.value = color;
                }
            });
        });

        // Action buttons
        this.convertBtn.addEventListener('click', () => this.convertAll());
        this.clearBtn.addEventListener('click', () => this.clearAll());
        this.downloadAllBtn.addEventListener('click', () => this.downloadAll());

        // Theme toggle
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());

        // Load saved theme preference
        this.loadThemePreference();

        // Initial format check
        this.outputFormat.dispatchEvent(new Event('change'));
        this.resizeType.dispatchEvent(new Event('change'));
        this.zipFormat.dispatchEvent(new Event('change'));
        this.selectPreset('none');
        this.updateUserPresetsUI();
    }

    loadThemePreference() {
        const savedTheme = localStorage.getItem('imageConverter_theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            this.updateThemeIcon(true);
        } else if (savedTheme === 'dark') {
            document.body.classList.remove('light-theme');
            this.updateThemeIcon(false);
        } else {
            // Use system preference if auto-theme is enabled
            if (this.autoTheme?.checked) {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                document.body.classList.toggle('light-theme', !prefersDark);
                this.updateThemeIcon(!prefersDark);
            }
        }
    }

    toggleTheme() {
        const isLight = document.body.classList.contains('light-theme');
        document.body.classList.toggle('light-theme');
        const newIsLight = document.body.classList.contains('light-theme');
        this.updateThemeIcon(newIsLight);
        
        // Save preference
        localStorage.setItem('imageConverter_theme', newIsLight ? 'light' : 'dark');
        
        // Disable auto-theme when manually toggled
        if (this.autoTheme) {
            this.autoTheme.checked = false;
        }
    }

    updateThemeIcon(isLight) {
        if (this.themeIcon) {
            this.themeIcon.textContent = isLight ? '☀️' : '🌙';
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            const ctrl = e.ctrlKey || e.metaKey;
            if (ctrl && e.key === 'u') {
                e.preventDefault();
                this.fileInput.click();
            } else if (ctrl && e.key === 'Enter') {
                e.preventDefault();
                this.convertBtn.click();
            } else if (ctrl && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                this.clearAll();
            } else if (ctrl && e.key === 'd') {
                e.preventDefault();
                if (this.convertedImages.length > 0) {
                    this.downloadAll();
                }
            } else if (ctrl && e.key === 'h') {
                e.preventDefault();
                this.toggleHistory();
            } else if (e.key === 'Escape') {
                this.closePresetModal();
                this.historySection.style.display = 'none';
            }
        });
    }

    setupAutoTheme() {
        if (this.autoTheme?.checked) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.body.classList.toggle('light-theme', !prefersDark);
            this.updateThemeIcon(!prefersDark);
            
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                document.body.classList.toggle('light-theme', !e.matches);
                this.updateThemeIcon(!e.matches);
            });
        }
        
        this.autoTheme?.addEventListener('change', (e) => {
            if (e.target.checked) {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                document.body.classList.toggle('light-theme', !prefersDark);
                this.updateThemeIcon(!prefersDark);
                localStorage.removeItem('imageConverter_theme'); // Clear manual preference
            }
        });
    }

    loadUserPresets() {
        try {
            const saved = localStorage.getItem('imageConverter_userPresets');
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    }

    saveUserPresets() {
        try {
            localStorage.setItem('imageConverter_userPresets', JSON.stringify(this.userPresets));
        } catch (e) {
            console.error('Failed to save presets:', e);
        }
    }

    loadHistory() {
        try {
            const saved = localStorage.getItem('imageConverter_history');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    }

    saveHistory() {
        try {
            // Keep only last 10
            const history = this.conversionHistory.slice(-10);
            localStorage.setItem('imageConverter_history', JSON.stringify(history));
        } catch (e) {
            console.error('Failed to save history:', e);
        }
    }

    selectPreset(preset) {
        this.currentPreset = preset;
        
        // Update button states
        this.presetButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.preset === preset);
        });

        // Show/hide custom size list section
        if (preset === 'custom-list') {
            if (this.customSizeListSection) this.customSizeListSection.style.display = 'block';
            if (this.presetInfo) {
                this.presetInfo.innerHTML = `
                    <strong>Custom Size List Mode</strong><br>
                    <small>💡 Add any sizes you want, then generate them all at once</small>
                `;
            }
        } else {
            if (this.customSizeListSection) this.customSizeListSection.style.display = 'none';
        }

        // Update preset info
        const sizes = this.presetSizes[preset];
        if (preset === 'none') {
            if (this.presetInfo) this.presetInfo.textContent = 'Using custom dimensions or no resize';
            if (this.resizeWidth) this.resizeWidth.disabled = false;
            if (this.resizeHeight) this.resizeHeight.disabled = false;
            if (this.resizeDimensions) this.resizeDimensions.style.display = 'block';
            if (this.resizeHeightGroup) this.resizeHeightGroup.style.display = 'block';
        } else if (preset === 'custom-list') {
            // Already handled above
        } else {
            const sizesList = sizes.map(s => `${s.name || s.width + 'x' + s.height}`).join(', ');
            const count = sizes.length;
            if (this.presetInfo) {
                this.presetInfo.innerHTML = `
                    <strong>${count} sizes will be generated:</strong><br>
                    ${sizesList}<br>
                    <small>💡 Each uploaded image will generate ${count} resized versions automatically</small>
                `;
            }
            if (this.resizeWidth) this.resizeWidth.disabled = true;
            if (this.resizeHeight) this.resizeHeight.disabled = true;
            if (this.resizeDimensions) this.resizeDimensions.style.display = 'none';
            if (this.resizeHeightGroup) this.resizeHeightGroup.style.display = 'none';
            // Auto-set resize mode to fit for presets
            if (this.resizeMode.value === 'none') {
                this.resizeMode.value = 'fit';
            }
        }
    }

    addCustomSize() {
        const width = parseInt(this.newSizeWidth.value);
        const height = parseInt(this.newSizeHeight.value);
        const keepAspect = this.newSizeKeepAspect.checked;

        if (!width && !height) {
            alert('Please enter at least width or height');
            return;
        }

        const newSize = {
            width: width || null,
            height: height || null,
            keepAspect: keepAspect,
            format: this.outputFormat.value,
            quality: parseInt(this.quality.value),
            backgroundColor: this.backgroundColor.value,
            resizeMode: this.resizeMode.value || 'fit',
            name: `${width || 'auto'}x${height || 'auto'}`
        };

        this.customSizesList.push(newSize);
        this.updateCustomSizesListUI();
        
        // Clear inputs
        this.newSizeWidth.value = '';
        this.newSizeHeight.value = '';
        this.newSizeKeepAspect.checked = false;
    }

    removeCustomSize(index) {
        this.customSizesList.splice(index, 1);
        this.updateCustomSizesListUI();
    }

    editCustomSize(index) {
        const size = this.customSizesList[index];
        this.editingSizeIndex = index;

        this.editSizeWidth.value = size.width || '';
        this.editSizeHeight.value = size.height || '';
        this.editSizeFormat.value = size.format || 'png';
        this.editSizeQuality.value = size.quality || 80;
        this.editQualityValue.textContent = size.quality || 80;
        this.editSizeKeepAspect.checked = size.keepAspect || false;
        this.editSizeBackground.value = size.backgroundColor || '#ffffff';
        this.editSizeResizeMode.value = size.resizeMode || 'fit';

        this.editSizeModal.style.display = 'flex';
    }

    saveSizeEdit() {
        if (this.editingSizeIndex === null) return;

        const size = this.customSizesList[this.editingSizeIndex];
        size.width = parseInt(this.editSizeWidth.value) || null;
        size.height = parseInt(this.editSizeHeight.value) || null;
        size.format = this.editSizeFormat.value;
        size.quality = parseInt(this.editSizeQuality.value);
        size.keepAspect = this.editSizeKeepAspect.checked;
        size.backgroundColor = this.editSizeBackground.value;
        size.resizeMode = this.editSizeResizeMode.value;
        size.name = `${size.width || 'auto'}x${size.height || 'auto'}`;

        this.updateCustomSizesListUI();
        this.closeSizeEditModal();
    }

    closeSizeEditModal() {
        this.editSizeModal.style.display = 'none';
        this.editingSizeIndex = null;
    }

    clearCustomSizesList() {
        if (this.customSizesList.length === 0) return;
        if (confirm(`Clear all ${this.customSizesList.length} custom sizes?`)) {
            this.customSizesList = [];
            this.updateCustomSizesListUI();
        }
    }

    updateCustomSizesListUI() {
        if (this.customSizesList.length === 0) {
            this.customSizesListContainer.innerHTML = '<p class="empty-message">No custom sizes added yet. Click "+ Add Size" to start building your list.</p>';
            return;
        }

        this.customSizesListContainer.innerHTML = this.customSizesList.map((size, index) => {
            const width = size.width || 'Auto';
            const height = size.height || 'Auto';
            return `
                <div class="custom-size-item">
                    <div class="size-item-info">
                        <div class="size-item-main">
                            <span class="size-item-dimensions">${width} × ${height}px</span>
                            ${size.keepAspect ? '<span style="color: var(--text-secondary); font-size: 0.9rem;">(Aspect ratio)</span>' : ''}
                        </div>
                        <div class="size-item-details">
                            <span>Format: ${size.format.toUpperCase()}</span>
                            <span>Quality: ${size.quality}%</span>
                            <span>Mode: ${size.resizeMode}</span>
                        </div>
                    </div>
                    <div class="size-item-actions">
                        <button class="btn-icon" onclick="window.imageConverter.editCustomSize(${index})" title="Edit">✏️</button>
                        <button class="btn-icon danger" onclick="window.imageConverter.removeCustomSize(${index})" title="Remove">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    saveSizeListAsPreset() {
        if (this.customSizesList.length === 0) {
            alert('Please add some custom sizes first');
            return;
        }

        const name = prompt('Enter preset name:', 'My Custom Sizes');
        if (!name || !name.trim()) return;

        const preset = {
            name: name.trim(),
            type: 'custom-size-list',
            sizes: JSON.parse(JSON.stringify(this.customSizesList)),
            timestamp: Date.now()
        };

        this.userPresets[name.trim()] = preset;
        this.saveUserPresets();
        this.updateUserPresetsUI();
        alert(`Preset "${name.trim()}" saved! You can load it from "Your Custom Presets" section.`);
    }

    checkFormatSupport() {
        // Check WebP support
        const webpSupported = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
        if (!webpSupported) {
            const webpOption = this.outputFormat.querySelector('option[value="webp"]');
            if (webpOption) {
                webpOption.disabled = true;
                webpOption.textContent += ' (not supported)';
            }
        }
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
        this.handleFiles(files);
    }

    async handleFiles(files) {
        if (files.length === 0) return;

        for (const file of files) {
            try {
                const imageData = await this.loadImage(file);
                this.images.push(imageData);
            } catch (error) {
                console.error('Error loading image:', error);
                alert(`Error loading ${file.name}: ${error.message}`);
            }
        }

        this.updateUI();
    }

    loadImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const img = new Image();
                
                img.onload = () => {
                    resolve({
                        file: file,
                        name: file.name,
                        originalSize: file.size,
                        width: img.width,
                        height: img.height,
                        image: img,
                        format: this.detectFormat(file.name, file.type)
                    });
                };
                
                img.onerror = () => reject(new Error('Failed to load image'));
                img.src = e.target.result;
            };
            
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(file);
        });
    }

    detectFormat(filename, mimeType) {
        const ext = filename.split('.').pop().toLowerCase();
        const formatMap = {
            'png': 'png',
            'jpg': 'jpg',
            'jpeg': 'jpeg',
            'webp': 'webp',
            'bmp': 'bmp',
            'gif': 'gif',
            'tiff': 'tiff',
            'svg': 'svg',
            'avif': 'avif',
            'heic': 'heic'
        };
        return formatMap[ext] || mimeType.split('/')[1] || 'unknown';
    }

    updateUI() {
        if (this.images.length > 0) {
            this.settingsPanel.style.display = 'block';
            this.imagesGrid.style.display = 'block';
            this.updateImageGrid();
        }
    }

    updateImageGrid() {
        this.gridContainer.innerHTML = '';
        
        this.images.forEach((imageData, index) => {
            const card = document.createElement('div');
            card.className = 'image-card';
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 300;
            canvas.height = 200;
            
            // Draw preview
            const scale = Math.min(canvas.width / imageData.width, canvas.height / imageData.height);
            const x = (canvas.width - imageData.width * scale) / 2;
            const y = (canvas.height - imageData.height * scale) / 2;
            ctx.drawImage(imageData.image, x, y, imageData.width * scale, imageData.height * scale);
            
            const img = document.createElement('img');
            img.className = 'image-preview';
            img.src = canvas.toDataURL();
            
            card.innerHTML = `
                ${img.outerHTML}
                <div class="image-name">${imageData.name}</div>
                <div class="image-info">
                    <div><strong>Format:</strong> ${imageData.format.toUpperCase()}</div>
                    <div><strong>Size:</strong> ${this.formatFileSize(imageData.originalSize)}</div>
                    <div><strong>Dimensions:</strong> ${imageData.width} × ${imageData.height}px</div>
                </div>
            `;
            
            this.gridContainer.appendChild(card);
        });
    }

    async convertAll() {
        if (this.images.length === 0) {
            alert('Please upload images first');
            return;
        }

        this.convertedImages = [];
        this.resultsSection.style.display = 'none';
        this.progressSection.style.display = 'block';
        this.progressContainer.innerHTML = '';
        this.convertBtn.disabled = true;

        const format = this.outputFormat.value;
        const quality = this.quality.value / 100;
        let resizeMode = this.resizeMode.value;
        const bgColor = this.backgroundColor.value === 'transparent' ? null : this.backgroundColor.value;
        const preserveTrans = this.preserveTransparency.checked;
        const autoPadding = this.autoPadding.checked;
        const autoSharpening = this.autoSharpening.checked;
        const cropShape = this.cropShape.value;
        const dpi = parseInt(this.dpi.value);

        // Get formats to generate
        let formatsToGenerate = this.convertMultipleFormats.checked
            ? Array.from(this.formatOptions).filter(opt => opt.checked).map(opt => opt.value)
            : [format];

        // Get sizes to generate based on preset
        let sizesToGenerate;
        if (this.currentPreset === 'custom-list') {
            // Use custom size list
            if (this.customSizesList.length === 0) {
                alert('Please add some custom sizes to your list first');
                if (this.convertBtn) this.convertBtn.disabled = false;
                return;
            }
            sizesToGenerate = this.customSizesList.map((size, idx) => ({
                width: size.width,
                height: size.height,
                name: size.name || `${size.width || 'auto'}x${size.height || 'auto'}`,
                format: size.format,
                quality: size.quality / 100,
                backgroundColor: size.backgroundColor,
                resizeMode: size.resizeMode,
                keepAspect: size.keepAspect
            }));
            // Use per-size formats if specified
            formatsToGenerate = [...new Set(sizesToGenerate.map(s => s.format))];
        } else if (this.currentPreset === 'none') {
            const resizeType = this.resizeType.value;
            
            if (resizeType === 'percentage') {
                const percentage = parseInt(this.resizePercentage.value) / 100;
                // Use first image as reference for percentage calculation
                const refImage = this.images[0];
                sizesToGenerate = [{
                    width: Math.round(refImage.width * percentage),
                    height: Math.round(refImage.height * percentage),
                    name: `${percentage * 100}%`
                }];
            } else if (resizeType === 'maxfilesize') {
                sizesToGenerate = [{ width: null, height: null, name: 'maxfilesize', maxSizeKB: parseInt(this.maxFileSize.value) }];
            } else if (resizeType === 'maxdimensions') {
                const maxW = parseInt(this.maxWidth.value);
                const maxH = parseInt(this.maxHeight.value);
                sizesToGenerate = [{ width: maxW, height: maxH, name: 'maxdimensions' }];
            } else {
                const customWidth = parseInt(this.resizeWidth.value);
                const customHeight = parseInt(this.resizeHeight.value);
                if (customWidth || customHeight) {
                    sizesToGenerate = [{ width: customWidth || null, height: customHeight || null, name: 'custom' }];
                } else {
                    sizesToGenerate = [{ width: null, height: null, name: 'original' }];
                }
            }
        } else {
            sizesToGenerate = this.presetSizes[this.currentPreset];
            // For presets, force fit mode to maintain aspect ratio
            resizeMode = 'fit';
        }

        let totalTasks = 0;
        let completedTasks = 0;

        for (let i = 0; i < this.images.length; i++) {
            const imageData = this.images[i];
            
            // Create progress item
            const progressItem = this.createProgressItem(imageData.name, i, sizesToGenerate.length);
            if (this.progressContainer) this.progressContainer.appendChild(progressItem);

            // Generate all sizes and formats for this image
            for (const size of sizesToGenerate) {
                // Use per-size format if available (for custom list), otherwise use format list
                const formatsForThisSize = size.format ? [size.format] : formatsToGenerate;
                
                for (const formatToUse of formatsForThisSize) {
                    totalTasks++;
                    const sizeName = size.name || `${size.width || 'auto'}x${size.height || 'auto'}`;
                    
                    try {
                        let converted;
                        
                        // Handle max file size resize
                        if (size.maxSizeKB) {
                            converted = await this.convertToMaxFileSize(
                                imageData,
                                formatToUse,
                                quality,
                                size.maxSizeKB * 1024,
                                bgColor,
                                preserveTrans,
                                sizeName,
                                (progress) => {
                                    const fill = progressItem.querySelector('.progress-fill');
                                    const currentProgress = ((completedTasks / totalTasks) * 100) + (progress / totalTasks);
                                    fill.style.width = `${currentProgress}%`;
                                    fill.textContent = `${Math.round(currentProgress)}%`;
                                }
                            );
                        } else {
                            // Use per-size settings if available (for custom list)
                            const sizeFormat = size.format || formatToUse;
                            const sizeQuality = size.quality !== undefined ? size.quality : quality;
                            const sizeResizeMode = size.resizeMode || resizeMode;
                            const sizeBgColor = size.backgroundColor || bgColor;
                            
                            // Handle keep aspect ratio for custom sizes
                            let finalWidth = size.width;
                            let finalHeight = size.height;
                            if (size.keepAspect && (finalWidth || finalHeight)) {
                                const aspect = imageData.width / imageData.height;
                                if (finalWidth && !finalHeight) {
                                    finalHeight = Math.round(finalWidth / aspect);
                                } else if (finalHeight && !finalWidth) {
                                    finalWidth = Math.round(finalHeight * aspect);
                                }
                            }

                            converted = await this.convertImage(
                                imageData,
                                sizeFormat,
                                sizeQuality,
                                sizeResizeMode,
                                finalWidth,
                                finalHeight,
                                sizeBgColor,
                                preserveTrans,
                                autoPadding,
                                autoSharpening,
                                cropShape,
                                sizeName,
                                (progress) => {
                                    const fill = progressItem.querySelector('.progress-fill');
                                    const currentProgress = ((completedTasks / totalTasks) * 100) + (progress / totalTasks);
                                    fill.style.width = `${currentProgress}%`;
                                    fill.textContent = `${Math.round(currentProgress)}%`;
                                }
                            );
                        }
                        
                        this.convertedImages.push(converted);
                        completedTasks++;
                    } catch (error) {
                        console.error('Conversion error:', error);
                        completedTasks++;
                        // Continue with other sizes/formats even if one fails
                    }
                }
            }
        }

        if (this.convertBtn) this.convertBtn.disabled = false;
        this.addToHistory();
        this.showResults();
    }

    async convertToMaxFileSize(imageData, format, quality, maxSizeBytes, bgColor, preserveTrans, sizeName, progressCallback) {
        // Binary search for optimal quality/size
        let minQuality = 0.1;
        let maxQuality = 1.0;
        let bestResult = null;
        const maxIterations = 10;

        for (let i = 0; i < maxIterations; i++) {
            const testQuality = (minQuality + maxQuality) / 2;
            progressCallback((i / maxIterations) * 100);

            const result = await this.convertImage(
                imageData,
                format,
                testQuality,
                'fit',
                imageData.width,
                imageData.height,
                bgColor,
                preserveTrans,
                false,
                false,
                'original',
                sizeName,
                () => {}
            );

            if (result.size <= maxSizeBytes) {
                bestResult = result;
                minQuality = testQuality;
            } else {
                maxQuality = testQuality;
            }

            if (Math.abs(result.size - maxSizeBytes) / maxSizeBytes < 0.05) {
                break; // Close enough
            }
        }

        if (!bestResult) {
            // Fallback: use minimum quality
            return await this.convertImage(
                imageData,
                format,
                0.1,
                'fit',
                imageData.width,
                imageData.height,
                bgColor,
                preserveTrans,
                false,
                false,
                'original',
                sizeName,
                progressCallback
            );
        }

        progressCallback(100);
        return bestResult;
    }

    createProgressItem(name, index, count = 1) {
        const item = document.createElement('div');
        item.className = 'progress-item';
        const statusText = count > 1 ? `Generating ${count} sizes...` : 'Converting...';
        item.innerHTML = `
            <div class="progress-item-header">
                <span>${name}</span>
                <span>${statusText}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: 0%">0%</div>
            </div>
        `;
        return item;
    }

    async convertImage(imageData, format, quality, resizeMode, width, height, bgColor, preserveTrans, autoPadding, autoSharpening, cropShape, sizeName, progressCallback) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Calculate dimensions
            let finalWidth = width || imageData.width;
            let finalHeight = height || imageData.height;

            // Handle auto padding for square icons
            if (autoPadding && width && height && width === height) {
                // Keep original aspect, add padding
                const scale = Math.min(width / imageData.width, height / imageData.height);
                const scaledWidth = imageData.width * scale;
                const scaledHeight = imageData.height * scale;
                const offsetX = (width - scaledWidth) / 2;
                const offsetY = (height - scaledHeight) / 2;

                canvas.width = finalWidth;
                canvas.height = finalHeight;

                // Fill background
                if (bgColor) {
                    ctx.fillStyle = bgColor;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

                ctx.drawImage(imageData.image, offsetX, offsetY, scaledWidth, scaledHeight);
            } else {
                // Normal resize modes
                if (resizeMode === 'stretch' && width && height) {
                    finalWidth = width;
                    finalHeight = height;
                } else if (resizeMode === 'fit' && (width || height)) {
                    const scale = Math.min(
                        (width || Infinity) / imageData.width,
                        (height || Infinity) / imageData.height
                    );
                    finalWidth = Math.round(imageData.width * scale);
                    finalHeight = Math.round(imageData.height * scale);
                } else if (resizeMode === 'fill' && (width || height)) {
                    const scale = Math.max(
                        (width || 0) / imageData.width,
                        (height || 0) / imageData.height
                    );
                    finalWidth = Math.round(imageData.width * scale);
                    finalHeight = Math.round(imageData.height * scale);
                } else if (resizeMode === 'circular' && width && height) {
                    finalWidth = Math.min(width, height);
                    finalHeight = finalWidth; // Make square for circle
                } else if (!width && !height) {
                    finalWidth = imageData.width;
                    finalHeight = imageData.height;
                }

                canvas.width = finalWidth;
                canvas.height = finalHeight;

                // Set background
                if ((format === 'jpg' || format === 'jpeg') && !preserveTrans) {
                    ctx.fillStyle = bgColor || '#ffffff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                } else if (bgColor && bgColor !== 'transparent') {
                    ctx.fillStyle = bgColor;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

                progressCallback(30);

                // Handle circular crop
                if (resizeMode === 'circular' && cropShape === 'circle') {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(finalWidth / 2, finalHeight / 2, finalWidth / 2, 0, Math.PI * 2);
                    ctx.clip();
                }

                // Handle fill mode (crop)
                if (resizeMode === 'fill' && (width || height)) {
                    const sourceWidth = imageData.width;
                    const sourceHeight = imageData.height;
                    const sourceAspect = sourceWidth / sourceHeight;
                    const targetAspect = finalWidth / finalHeight;

                    let sx = 0, sy = 0, sw = sourceWidth, sh = sourceHeight;

                    if (sourceAspect > targetAspect) {
                        sw = sourceHeight * targetAspect;
                        sx = (sourceWidth - sw) / 2;
                    } else {
                        sh = sourceWidth / targetAspect;
                        sy = (sourceHeight - sh) / 2;
                    }

                    ctx.drawImage(imageData.image, sx, sy, sw, sh, 0, 0, finalWidth, finalHeight);
                } else if (resizeMode === 'stretch' && width && height) {
                    ctx.drawImage(imageData.image, 0, 0, finalWidth, finalHeight);
                } else {
                    // Fit mode or custom
                    const scale = Math.min(finalWidth / imageData.width, finalHeight / imageData.height);
                    const scaledWidth = imageData.width * scale;
                    const scaledHeight = imageData.height * scale;
                    const x = (finalWidth - scaledWidth) / 2;
                    const y = (finalHeight - scaledHeight) / 2;
                    ctx.drawImage(imageData.image, x, y, scaledWidth, scaledHeight);
                }

                if (resizeMode === 'circular' && cropShape === 'circle') {
                    ctx.restore();
                }
            }

            // Apply sharpening filter if enabled
            if (autoSharpening && (finalWidth < imageData.width || finalHeight < imageData.height)) {
                const imageData_ctx = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData_ctx.data;
                
                // Simple unsharp mask approximation
                for (let i = 0; i < data.length; i += 4) {
                    // Light sharpening - can be enhanced with proper convolution
                    data[i] = Math.min(255, data[i] * 1.05);
                    data[i + 1] = Math.min(255, data[i + 1] * 1.05);
                    data[i + 2] = Math.min(255, data[i + 2] * 1.05);
                }
                ctx.putImageData(imageData_ctx, 0, 0);
            }

            progressCallback(70);

            // Handle SVG format separately
            if (format === 'svg') {
                // Convert canvas to base64 PNG for embedding in SVG
                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error('Failed to convert image'));
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = () => {
                        const base64Image = reader.result;
                        // Create SVG with embedded image
                        const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${finalWidth}" height="${finalHeight}" viewBox="0 0 ${finalWidth} ${finalHeight}">
    <image width="${finalWidth}" height="${finalHeight}" xlink:href="${base64Image}"/>
</svg>`;
                        
                        const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
                        progressCallback(100);

                        const convertedName = this.generateFileName(imageData.name, format, sizeName);
                        
                        resolve({
                            original: imageData,
                            blob: svgBlob,
                            name: convertedName,
                            size: svgBlob.size,
                            format: format,
                            width: finalWidth,
                            height: finalHeight,
                            url: URL.createObjectURL(svgBlob)
                        });
                    };
                    reader.onerror = () => reject(new Error('Failed to read image data'));
                    reader.readAsDataURL(blob);
                }, 'image/png', 1.0); // Use PNG at max quality for embedding
                return;
            }

            // Handle formats that Canvas API doesn't support natively
            // Canvas API natively supports: PNG, JPEG, WebP (browser dependent)
            // For other formats, we'll convert to a supported format
            const normalizedFormat = this.normalizeFormat(format);
            
            // Determine which format Canvas can actually generate
            let canvasFormat = normalizedFormat;
            let canvasMimeType = this.getMimeType(canvasFormat);
            
            // Check if format is natively supported by canvas.toBlob
            // Most browsers: PNG, JPEG, WebP
            // Limited support: AVIF (Chrome/Edge only)
            // Not supported: BMP, GIF (animated), TIFF - convert to PNG
            if (!['png', 'jpg', 'jpeg', 'webp', 'avif'].includes(normalizedFormat)) {
                // Fallback to PNG for unsupported formats (BMP, GIF, TIFF)
                canvasFormat = 'png';
                canvasMimeType = 'image/png';
            }
            
            // Try to convert - some browsers may not support all formats
            canvas.toBlob((blob) => {
                if (!blob) {
                    // If conversion failed, try PNG as fallback
                    canvas.toBlob((fallbackBlob) => {
                        if (!fallbackBlob) {
                            reject(new Error('Failed to convert image'));
                            return;
                        }
                        
                        progressCallback(100);
                        const convertedName = this.generateFileName(imageData.name, normalizedFormat, sizeName);
                        
                        resolve({
                            original: imageData,
                            blob: fallbackBlob,
                            name: convertedName,
                            size: fallbackBlob.size,
                            format: normalizedFormat, // Keep requested format name
                            width: finalWidth,
                            height: finalHeight,
                            url: URL.createObjectURL(fallbackBlob)
                        });
                    }, 'image/png', quality);
                    return;
                }

                progressCallback(100);
                const convertedName = this.generateFileName(imageData.name, normalizedFormat, sizeName);
                
                resolve({
                    original: imageData,
                    blob: blob,
                    name: convertedName,
                    size: blob.size,
                    format: normalizedFormat,
                    width: finalWidth,
                    height: finalHeight,
                    url: URL.createObjectURL(blob)
                });
            }, canvasMimeType, quality);
        });
    }

    generateFileName(originalName, format, sizeName = '', index = 0) {
        const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
        const normalizedFormat = this.normalizeFormat(format);
        // Keep the requested format extension even if we convert internally
        const formatExt = normalizedFormat;
        
        const namingPattern = this.customNaming.value === 'custom' 
            ? this.customNamingPattern.value || '{name}_{width}x{height}.{format}'
            : this.customNaming.value;

        // Extract dimensions from sizeName if available
        let width = '';
        let height = '';
        if (sizeName && sizeName.includes('x')) {
            const parts = sizeName.split('x');
            width = parts[0].replace(/\D/g, '');
            height = parts[1]?.replace(/\D/g, '') || '';
        }

        let fileName = namingPattern
            .replace(/{name}/g, nameWithoutExt)
            .replace(/{width}/g, width)
            .replace(/{height}/g, height)
            .replace(/{format}/g, formatExt)
            .replace(/{index}/g, index)
            .replace(/{size}/g, sizeName || '');

        // Fallback to default if pattern didn't work
        if (fileName === namingPattern || !fileName) {
            const sizeSuffix = sizeName && sizeName !== 'custom' && sizeName !== 'original' ? `_${sizeName}` : '';
            fileName = `${nameWithoutExt}${sizeSuffix}.${formatExt}`;
        }

        return fileName;
    }

    showResults() {
        if (this.progressSection) this.progressSection.style.display = 'none';
        if (this.resultsSection) this.resultsSection.style.display = 'block';
        if (this.resultsContainer) this.resultsContainer.innerHTML = '';

        // Group by original image if using presets
        const groupedResults = {};
        this.convertedImages.forEach((converted) => {
            const originalName = converted.original.name;
            if (!groupedResults[originalName]) {
                groupedResults[originalName] = [];
            }
            groupedResults[originalName].push(converted);
        });

        Object.keys(groupedResults).forEach((originalName, groupIndex) => {
            const results = groupedResults[originalName];
            const isMultipleSizes = results.length > 1;
            
            if (isMultipleSizes) {
                // Show grouped view for multiple sizes
                const groupCard = document.createElement('div');
                groupCard.className = 'result-card result-group';
                groupCard.innerHTML = `
                    <div class="result-card-header">
                        <h4>${originalName} - ${results.length} sizes generated</h4>
                    </div>
                    <div class="results-grid">
                        ${results.map((converted, idx) => {
                            const originalSize = converted.original.originalSize;
                            const newSize = converted.size;
                            return `
                                <div class="result-item">
                                    <img src="${converted.url}" class="result-thumbnail" alt="${converted.name}">
                                    <div class="result-details">
                                        <div class="result-name">${converted.name}</div>
                                        <div class="size-info">
                                            <div><strong>${converted.width} × ${converted.height}px</strong></div>
                                            <div>${this.formatFileSize(newSize)}</div>
                                        </div>
                                        <a href="${converted.url}" download="${converted.name}" class="btn btn-primary btn-small">
                                            ⬇️ Download
                                        </a>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;
                this.resultsContainer.appendChild(groupCard);
            } else {
                // Show single comparison view
                const converted = results[0];
                const resultCard = document.createElement('div');
                resultCard.className = 'result-card';

                const originalSize = converted.original.originalSize;
                const newSize = converted.size;
                const sizeSaved = originalSize - newSize;
                const percentSaved = ((sizeSaved / originalSize) * 100).toFixed(1);

                resultCard.innerHTML = `
                    <div class="result-card-header">
                        <h4>${converted.name}</h4>
                        <a href="${converted.url}" download="${converted.name}" class="btn btn-primary">
                            ⬇️ Download
                        </a>
                    </div>
                    <div class="comparison">
                        <div class="comparison-item">
                            <h4>Before</h4>
                            <img src="${converted.original.image.src}" class="comparison-preview" alt="Original">
                            <div class="size-info">
                                <div><strong>Size:</strong> ${this.formatFileSize(originalSize)}</div>
                                <div><strong>Dimensions:</strong> ${converted.original.width} × ${converted.original.height}px</div>
                                <div><strong>Format:</strong> ${converted.original.format.toUpperCase()}</div>
                            </div>
                        </div>
                        <div class="comparison-item">
                            <h4>After</h4>
                            <img src="${converted.url}" class="comparison-preview" alt="Converted">
                            <div class="size-info">
                                <div><strong>Size:</strong> ${this.formatFileSize(newSize)}</div>
                                <div><strong>Dimensions:</strong> ${converted.width} × ${converted.height}px</div>
                                <div><strong>Format:</strong> ${converted.format.toUpperCase()}</div>
                                ${sizeSaved > 0 ? `<div class="size-saved">💾 Saved: ${this.formatFileSize(sizeSaved)} (${percentSaved}%)</div>` : ''}
                            </div>
                        </div>
                    </div>
                `;

                this.resultsContainer.appendChild(resultCard);
            }
        });

        // Show download all button if multiple files
        if (this.convertedImages.length > 1) {
            this.downloadAllBtn.style.display = 'inline-block';
            this.downloadAllBtn.textContent = `📦 Download All (${this.convertedImages.length} files) as ZIP`;
        } else {
            this.downloadAllBtn.style.display = 'none';
        }
    }

    async downloadAll() {
        if (this.convertedImages.length === 0) return;

        const zipFormat = this.zipFormat.value;

        if (zipFormat === 'individual') {
            // Download individually
            this.convertedImages.forEach(converted => {
                const link = document.createElement('a');
                link.href = converted.url;
                link.download = converted.name;
                link.click();
            });
            return;
        }

        // Create ZIP
        if (typeof JSZip === 'undefined') {
            alert('ZIP library not loaded. Please refresh the page.');
            return;
        }

        const zip = new JSZip();
        const organizeByFormat = this.organizeByFormat.checked;
        const organizeBySize = this.organizeBySize.checked;
        
        for (const converted of this.convertedImages) {
            const blob = await fetch(converted.url).then(r => r.blob());
            
            let filePath = converted.name;
            
            if (organizeByFormat) {
                filePath = `${converted.format.toUpperCase()}/${filePath}`;
            }
            
            if (organizeBySize) {
                const sizeFolder = `${converted.width}x${converted.height}`;
                filePath = organizeByFormat 
                    ? `${converted.format.toUpperCase()}/${sizeFolder}/${converted.name}`
                    : `${sizeFolder}/${filePath}`;
            }
            
            zip.file(filePath, blob);
        }

        // Add readme if organized
        if (organizeByFormat || organizeBySize) {
            const readme = `Image Converter Pro - Generated Files\n` +
                          `Generated: ${new Date().toLocaleString()}\n` +
                          `Total files: ${this.convertedImages.length}\n`;
            zip.file('readme.txt', readme);
        }

        const compressionLevel = this.zipCompressionLevel.value === 'fast' ? 1 : 
                                this.zipCompressionLevel.value === 'maximum' ? 9 : 6;
        
        const zipFileName = this.zipFileName.value.trim() || `converted_images_${Date.now()}`;
        
        const zipBlob = await zip.generateAsync({ 
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: { level: compressionLevel }
        });
        
        const zipUrl = URL.createObjectURL(zipBlob);
        const link = document.createElement('a');
        link.href = zipUrl;
        link.download = `${zipFileName}.zip`;
        link.click();

        // Cleanup
        setTimeout(() => URL.revokeObjectURL(zipUrl), 100);
    }

    clearAll() {
        this.images = [];
        this.convertedImages = [];
        this.customSizesList = [];
        this.settingsPanel.style.display = 'none';
        this.imagesGrid.style.display = 'none';
        this.progressSection.style.display = 'none';
        this.resultsSection.style.display = 'none';
        this.customSizeListSection.style.display = 'none';
        this.fileInput.value = '';
        this.updateCustomSizesListUI();
    }

    addToHistory() {
        if (this.convertedImages.length === 0) return;
        
        const historyEntry = {
            timestamp: Date.now(),
            count: this.convertedImages.length,
            formats: [...new Set(this.convertedImages.map(img => img.format))],
            preview: this.convertedImages[0].url
        };
        
        this.conversionHistory.push(historyEntry);
        this.saveHistory();
    }

    toggleHistory() {
        if (this.historySection.style.display === 'none') {
            this.displayHistory();
            this.historySection.style.display = 'block';
        } else {
            this.historySection.style.display = 'none';
        }
    }

    displayHistory() {
        this.historyList.innerHTML = '';
        
        if (this.conversionHistory.length === 0) {
            this.historyList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No conversion history yet</p>';
            return;
        }

        this.conversionHistory.slice().reverse().forEach((entry, index) => {
            const item = document.createElement('div');
            item.className = 'history-item';
            const date = new Date(entry.timestamp);
            item.innerHTML = `
                <img src="${entry.preview}" alt="Preview">
                <div style="font-weight: 600; margin-top: 5px;">${entry.count} file(s)</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary);">${date.toLocaleString()}</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary);">${entry.formats.join(', ').toUpperCase()}</div>
            `;
            this.historyList.appendChild(item);
        });
    }

    clearHistory() {
        if (confirm('Clear all conversion history?')) {
            this.conversionHistory = [];
            this.saveHistory();
            this.displayHistory();
        }
    }

    showPresetModal() {
        this.presetModal.style.display = 'flex';
        this.presetName.value = '';
        this.presetName.focus();
    }

    closePresetModal() {
        this.presetModal.style.display = 'none';
    }

    saveCurrentPreset() {
        const name = this.presetName.value.trim();
        if (!name) {
            alert('Please enter a preset name');
            return;
        }

        const preset = {
            name: name,
            outputFormat: this.outputFormat.value,
            quality: this.quality.value,
            resizeMode: this.resizeMode.value,
            resizeType: this.resizeType.value,
            resizeWidth: this.resizeWidth.value,
            resizeHeight: this.resizeHeight.value,
            backgroundColor: this.backgroundColor.value,
            preserveTransparency: this.preserveTransparency.checked,
            autoPadding: this.autoPadding.checked,
            autoSharpening: this.autoSharpening.checked,
            customNaming: this.customNaming.value,
            customNamingPattern: this.customNamingPattern.value,
            timestamp: Date.now()
        };

        this.userPresets[name] = preset;
        this.saveUserPresets();
        this.updateUserPresetsUI();
        this.closePresetModal();
    }

    updateUserPresetsUI() {
        this.userPresetsList.innerHTML = '';
        
        if (Object.keys(this.userPresets).length === 0) {
            this.userPresetsSection.style.display = 'none';
            return;
        }

        this.userPresetsSection.style.display = 'block';
        
        Object.keys(this.userPresets).forEach(presetName => {
            const btn = document.createElement('button');
            btn.className = 'user-preset-btn';
            btn.textContent = presetName;
            btn.innerHTML = `${presetName} <span class="delete-preset" data-preset="${presetName}">×</span>`;
            
            btn.addEventListener('click', (e) => {
                if (e.target.classList.contains('delete-preset')) {
                    e.stopPropagation();
                    this.deletePreset(presetName);
                    return;
                }
                this.applyPreset(presetName);
            });
            
            this.userPresetsList.appendChild(btn);
        });
    }

    applyPreset(presetName) {
        const preset = this.userPresets[presetName];
        if (!preset) return;

        // Handle custom size list presets
        if (preset.type === 'custom-size-list' && preset.sizes) {
            this.customSizesList = JSON.parse(JSON.stringify(preset.sizes));
            this.updateCustomSizesListUI();
            this.selectPreset('custom-list');
            return;
        }

        // Handle regular presets
        this.outputFormat.value = preset.outputFormat || 'png';
        this.quality.value = preset.quality || 80;
        this.qualityValue.textContent = preset.quality || 80;
        this.resizeMode.value = preset.resizeMode || 'fit';
        this.resizeType.value = preset.resizeType || 'pixels';
        this.resizeWidth.value = preset.resizeWidth || '';
        this.resizeHeight.value = preset.resizeHeight || '';
        this.backgroundColor.value = preset.backgroundColor || '#ffffff';
        this.preserveTransparency.checked = preset.preserveTransparency !== false;
        this.autoPadding.checked = preset.autoPadding || false;
        this.autoSharpening.checked = preset.autoSharpening || false;
        this.customNaming.value = preset.customNaming || 'original_size';
        this.customNamingPattern.value = preset.customNamingPattern || '';

        this.selectPreset('none');
        this.resizeType.dispatchEvent(new Event('change'));
        this.customNaming.dispatchEvent(new Event('change'));
    }

    deletePreset(presetName) {
        if (confirm(`Delete preset "${presetName}"?`)) {
            delete this.userPresets[presetName];
            this.saveUserPresets();
            this.updateUserPresetsUI();
        }
    }

    normalizeFormat(format) {
        // Normalize format names
        const formatLower = format.toLowerCase();
        if (formatLower === 'jpeg') return 'jpg';
        return formatLower;
    }

    getMimeType(format) {
        const normalized = this.normalizeFormat(format);
        const mimeTypes = {
            'png': 'image/png',
            'jpg': 'image/jpeg',
            'webp': 'image/webp',
            'svg': 'image/svg+xml',
            'bmp': 'image/bmp',
            'gif': 'image/gif',
            'ico': 'image/png', // ICO is converted to PNG
            'avif': 'image/avif',
            'tiff': 'image/tiff'
        };
        return mimeTypes[normalized] || 'image/png';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
}

// Initialize the application
let imageConverter;
document.addEventListener('DOMContentLoaded', () => {
    imageConverter = new ImageConverter();
    window.imageConverter = imageConverter; // Make globally accessible for inline onclick handlers
});

// Service Worker message handling
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('Service Worker message:', event.data);
    });
}

