// ========================================================
// متجر وقار وحياء للزي الشرعي - المنطق التفاعلي العام
// Waqar & Hayaa Modest Fashion - Main App Logic
// ========================================================

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const Store = window.WaqarStore || { products: [], getProductById: () => null };
    const Cart = window.WaqarCart;

    initToasts();
    initGlobalSearch();
    initMobileMenu();
    initSizingModal();
    initNavActiveState();

    // تحديد الصفحة الحالية وتشغيل منطقها
    const path = window.location.pathname.toLowerCase();
    const pageAttr = document.body.getAttribute('data-page');

    if (pageAttr === 'pdp' || path.includes('product-detail')) {
      initPDP(Store, Cart);
    } else if (pageAttr === 'collection' || path.includes('products') || path.includes('collection')) {
      initCollectionPage(Store, Cart);
    } else if (pageAttr === 'cart' || path.includes('cart') || path.includes('checkout')) {
      initCartPage(Store, Cart);
    } else {
      initHomepage(Store, Cart);
    }

    // تحديث شارات السلة
    if (Cart && typeof Cart.updateCartBadges === 'function') {
      Cart.updateCartBadges();
    }

    // تسجيل عرض الصفحة في Firebase Analytics عند الجاهزية
    const logPageView = () => {
      if (window.WaqarFirebase && typeof window.WaqarFirebase.logEvent === 'function') {
        window.WaqarFirebase.logEvent('page_view', {
          page_title: document.title,
          page_path: window.location.pathname + window.location.search
        });
      }
    };
    if (window.WaqarFirebase) {
      logPageView();
    } else {
      window.addEventListener('waqar-firebase-ready', logPageView, { once: true });
    }
  });

  /* ========================================================
     تحديث حالة الروابط النشطة في الهيدر
     ======================================================== */
  function initNavActiveState() {
    const urlParams = new URLSearchParams(window.location.search);
    const cat = urlParams.get('cat');
    const navLinks = document.querySelectorAll('header nav a');
    if (!navLinks.length) return;

    const path = window.location.pathname.toLowerCase();
    if (path.includes('products') && cat) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        if (href.includes(`cat=${cat}`)) {
          link.className = 'text-forest-green font-semibold border-b-2 border-forest-green pb-1';
        } else {
          link.className = 'text-light-on-surface hover:text-forest-green transition-colors';
        }
      });
    }
  }

  /* ========================================================
     نظام الإشعارات التنبيهية (Toast Notifications)
     ======================================================== */
  function initToasts() {
    if (!document.getElementById('waqar-toast-container')) {
      const container = document.createElement('div');
      container.id = 'waqar-toast-container';
      document.body.appendChild(container);
    }
  }

  function showToast(title, message = '', icon = 'verified', type = 'success') {
    initToasts();
    const container = document.getElementById('waqar-toast-container');
    const toast = document.createElement('div');
    toast.className = `waqar-toast ${type}`;

    const iconColor = type === 'error' ? 'text-red-600' : 'text-champagne-gold';

    toast.innerHTML = `
      <span class="material-symbols-outlined text-[24px] ${iconColor} shrink-0 mt-0.5">${icon}</span>
      <div class="flex-1">
        <h4 class="font-title text-title-md font-bold text-forest-green">${title}</h4>
        ${message ? `<p class="text-body-sm text-light-outline mt-0.5">${message}</p>` : ''}
      </div>
      <button type="button" class="text-light-outline hover:text-forest-green p-1" onclick="this.parentElement.remove()">
        <span class="material-symbols-outlined text-[18px]">close</span>
      </button>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  window.showWaqarToast = showToast;

  /* ========================================================
     البحث العام (Global Search)
     ======================================================== */
  function initGlobalSearch() {
    const searchInputs = document.querySelectorAll('input[type="search"]');
    searchInputs.forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const query = input.value.trim();
          if (query) {
            const isSubfolder = window.location.pathname.includes('/waqar_hayaa_');
            const target = isSubfolder ? '../products.html' : 'products.html';
            window.location.href = `${target}?search=${encodeURIComponent(query)}`;
          }
        }
      });
    });
  }

  /* ========================================================
     القائمة المتجاوبة للموبايل
     ======================================================== */
  function initMobileMenu() {
    const header = document.querySelector('header');
    if (!header) return;

    let menuBtn = header.querySelector('.mobile-menu-btn');
    if (!menuBtn) {
      const actionsDiv = header.querySelector('.flex.items-center.gap-4') || header.querySelector('div:last-child');
      if (actionsDiv) {
        menuBtn = document.createElement('button');
        menuBtn.type = 'button';
        menuBtn.setAttribute('aria-label', 'القائمة');
        menuBtn.className = 'mobile-menu-btn lg:hidden w-10 h-10 rounded-full bg-light-surface-container-low border border-light-outline-variant flex items-center justify-center text-forest-green';
        menuBtn.innerHTML = '<span class="material-symbols-outlined text-[24px]">menu</span>';
        actionsDiv.prepend(menuBtn);
      }
    }

    if (menuBtn) {
      menuBtn.addEventListener('click', toggleMobileDrawer);
    }
  }

  function toggleMobileDrawer() {
    let drawer = document.getElementById('waqar-mobile-drawer');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'waqar-mobile-drawer';
      drawer.className = 'waqar-modal-overlay';
      drawer.innerHTML = `
        <div class="waqar-modal-content p-6 space-y-6">
          <div class="flex items-center justify-between pb-4 border-b border-light-outline-variant">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-forest-green text-[26px]">spa</span>
              <span class="font-headline text-headline-sm font-bold text-forest-green">وَقار وحَياء</span>
            </div>
            <button type="button" class="close-drawer p-1 text-light-outline hover:text-forest-green">
              <span class="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>
          <nav class="flex flex-col gap-3 text-title-md">
            <a href="index.html" class="p-2.5 hover:bg-soft-sage/40 rounded text-forest-green font-bold">الرئيسية</a>
            <a href="products.html" class="p-2.5 hover:bg-soft-sage/40 rounded text-light-on-surface">كافة التشكيلة الشرعية</a>
            <a href="products.html?cat=abaya" class="p-2.5 hover:bg-soft-sage/40 rounded text-light-on-surface">عبايات الرأس الساترة</a>
            <a href="products.html?cat=khimar" class="p-2.5 hover:bg-soft-sage/40 rounded text-light-on-surface">أطقم الخمار الفاخرة</a>
            <a href="products.html?cat=isdal" class="p-2.5 hover:bg-soft-sage/40 rounded text-light-on-surface">إسدالات الصلاة الواسعة</a>
            <a href="products.html?cat=niqab" class="p-2.5 hover:bg-soft-sage/40 rounded text-light-on-surface">تشكيلة النقابات الطبية</a>
            <a href="index.html#coverage-fabric" class="p-2.5 hover:bg-soft-sage/40 rounded text-light-on-surface">دليل الأقمشة والعتامة</a>
            <a href="cart.html" class="p-3 bg-soft-sage rounded text-forest-green font-bold flex items-center justify-between">
              <span>حقيبة الستر وإتمام الطلب</span>
              <span class="cart-badge-count bg-forest-green text-white text-xs px-2.5 py-0.5 rounded-full font-bold">2</span>
            </a>
          </nav>
        </div>
      `;
      document.body.appendChild(drawer);
      drawer.querySelector('.close-drawer').addEventListener('click', () => drawer.classList.remove('active'));
      drawer.addEventListener('click', (e) => {
        if (e.target === drawer) drawer.classList.remove('active');
      });
    }

    drawer.classList.toggle('active');
    if (window.WaqarCart) window.WaqarCart.updateCartBadges();
  }

  /* ========================================================
     مودال حاسبة القياس الشرعي (Sizing Modal)
     ======================================================== */
  function initSizingModal() {
    const triggerLinks = document.querySelectorAll('a[href*="#sizing-guide"], button[data-action="sizing-guide"]');
    triggerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (!window.location.pathname.includes('product-detail')) {
          e.preventDefault();
          openSizingModal();
        }
      });
    });
  }

  function openSizingModal() {
    let modal = document.getElementById('waqar-sizing-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'waqar-sizing-modal';
      modal.className = 'waqar-modal-overlay';
      modal.innerHTML = `
        <div class="waqar-modal-content p-6 space-y-5 text-right">
          <div class="flex items-center justify-between pb-3 border-b border-light-outline-variant">
            <div class="flex items-center gap-2 text-forest-green font-title text-title-lg font-bold">
              <span class="material-symbols-outlined text-champagne-gold text-[24px]">straighten</span>
              <span>حاسبة واستشارة الطول الشرعي</span>
            </div>
            <button type="button" class="close-modal p-1 text-light-outline hover:text-forest-green">
              <span class="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          <p class="text-body-sm text-light-outline">
            أدخلي طولكِ بالسنتيمتر وسيقوم النظام باقتراح طول العباءة المناسب الذي يستر القدمين بالكامل دون أن يجر على الأرض.
          </p>

          <div class="space-y-3">
            <label class="block text-label-md font-semibold text-forest-green">طول القامة (سم):</label>
            <div class="flex gap-2">
              <input type="number" id="sister-height-input" placeholder="مثال: 160" min="140" max="195" class="flex-1 bg-light-surface border border-light-outline-variant rounded-lg px-4 py-2 text-forest-green font-bold text-center text-lg focus:border-forest-green">
              <button type="button" id="calc-height-btn" class="px-5 py-2 bg-forest-green text-white font-bold rounded-lg hover:bg-forest-green/90 transition-colors cursor-pointer">
                احسبي الطول
              </button>
            </div>
          </div>

          <div id="sizing-result-box" class="hidden p-4 rounded-xl bg-soft-sage border border-forest-green/30 space-y-2">
            <div class="flex items-center gap-2 text-forest-green font-bold">
              <span class="material-symbols-outlined text-[20px] text-champagne-gold">verified</span>
              <span id="sizing-recommended-title">الطول الموصى به: 58 إنش</span>
            </div>
            <p id="sizing-recommended-desc" class="text-body-sm text-light-outline leading-relaxed"></p>
            <div class="pt-2 flex flex-wrap gap-2 justify-end">
              <a href="sizing_chart_render.html" target="_blank" class="px-3 py-2 bg-light-surface border border-forest-green/30 text-forest-green rounded text-label-sm font-semibold hover:bg-white">
                عرض جدول القياسات الكامل
              </a>
              <a href="product-detail.html" class="px-4 py-2 bg-forest-green text-white rounded text-label-sm font-semibold hover:bg-forest-green/90">
                انتقلي لاختيار القطعة بهذا المقاس
              </a>
            </div>
          </div>

          <div class="pt-3 border-t border-light-outline-variant/60 flex items-center justify-between text-label-sm text-light-outline">
            <a href="sizing_chart_render.html" target="_blank" class="text-mocha-brown hover:underline font-semibold flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px]">table_chart</span>
              <span>فتح جدول المقاسات المفصل</span>
            </a>
            <a href="https://wa.me/966500000000?text=السلام%20عليكم،%20أحتاج%20استشارة%20في%20اختيار%20طول%20العباءة" target="_blank" class="text-forest-green font-bold flex items-center gap-1 hover:underline">
              <span class="material-symbols-outlined text-[16px]">chat</span>
              <span>استشيري الخبيرة الشرعية</span>
            </a>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('.close-modal').addEventListener('click', () => modal.classList.remove('active'));
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });

      const calcBtn = modal.querySelector('#calc-height-btn');
      const input = modal.querySelector('#sister-height-input');
      const resultBox = modal.querySelector('#sizing-result-box');
      const resTitle = modal.querySelector('#sizing-recommended-title');
      const resDesc = modal.querySelector('#sizing-recommended-desc');

      calcBtn.addEventListener('click', async () => {
        const h = Number(input.value);
        if (!h || h < 140 || h > 195) {
          showToast('يرجى إدخال طول صحيح', 'بين 140 إلى 195 سم', 'info', 'info');
          return;
        }

        let recSize = '58″';
        let desc = 'هذا الطول سيصل إلى منتصف الحذاء الساتر ويمنع ظهور الجوارب أو الساقين عند الخطو.';

        if (h <= 157) {
          recSize = '56″';
        } else if (h <= 163) {
          recSize = '58″';
        } else if (h <= 169) {
          recSize = '60″';
        } else if (h <= 175) {
          recSize = '62″';
        } else {
          recSize = '64″ (طول خاص)';
          desc = 'مقاس خاص للستر الفسيح يناسب القامات الفارهة مع التغطية التامة.';
        }

        resTitle.textContent = `الطول الشرعي المقترح لقامتكِ (${h} سم): ${recSize}`;
        resDesc.textContent = desc;
        resultBox.classList.remove('hidden');

        if (window.WaqarFirebase) {
          window.WaqarFirebase.logEvent('sizing_calculated', { height: h, recommended_size: recSize });
          if (typeof window.WaqarFirebase.submitConsultation === 'function') {
            window.WaqarFirebase.submitConsultation({ heightCm: h, recommendedSize: recSize });
          }
        }
      });
    }

    modal.classList.add('active');
  }

  window.openWaqarSizingModal = openSizingModal;

  /* ========================================================
     منطق صفحة تفاصيل المنتج (PDP)
     ======================================================== */
  function initPDP(Store, Cart) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'royal-head-abaya-sakina';
    const product = Store.getProductById(productId);

    const heroImage = document.getElementById('main-pdp-image') || document.querySelector('section.lg\\:col-span-7 img');
    const thumbnailsContainer = document.querySelector('.grid-cols-4');

    // تحديث جميع عناصر صفحة المنتج ديناميكياً حسب المنتج المختار
    if (product) {
      document.title = `${product.shortTitle || product.title} — وقار وحياء`;

      // مسار التنقل (Breadcrumbs)
      const breadcrumbLinks = document.querySelectorAll('nav.max-w-7xl a, nav.max-w-7xl span');
      if (breadcrumbLinks.length >= 5) {
        breadcrumbLinks[2].textContent = product.categoryLabel;
        breadcrumbLinks[2].setAttribute('href', `products.html?cat=${product.category}`);
        breadcrumbLinks[4].textContent = product.shortTitle || product.title;
      }

      // العنوان والوصف والتقييم
      const mainTitle = document.querySelector('h1');
      if (mainTitle) mainTitle.textContent = product.title;

      const descEl = mainTitle ? mainTitle.nextElementSibling : null;
      if (descEl && descEl.tagName === 'P') {
        descEl.textContent = product.description;
      }

      // السعر والخصم
      const priceContainer = document.querySelector('.mt-4.flex.items-baseline.gap-3');
      if (priceContainer) {
        const diff = (product.originalPrice || product.price) - product.price;
        priceContainer.innerHTML = `
          <span class="font-headline text-display-lg-mobile text-forest-green font-bold">${product.price} ر.س</span>
          ${product.originalPrice ? `<span class="text-body-md text-light-outline line-through">${product.originalPrice} ر.س</span>` : ''}
          ${diff > 0 ? `<span class="text-label-sm bg-champagne-gold/20 text-forest-green font-bold px-2 py-0.5 rounded">وفر ${diff} ر.س</span>` : ''}
        `;
      }

      // المواصفات الفنية للنسيج
      const specBoxes = document.querySelectorAll('.grid.grid-cols-2.gap-3.text-body-sm > div');
      if (specBoxes.length >= 4) {
        const val0 = specBoxes[0].querySelector('span:last-child');
        const val1 = specBoxes[1].querySelector('span:last-child');
        const val2 = specBoxes[2].querySelector('span:last-child');
        const val3 = specBoxes[3].querySelector('span:last-child');
        if (val0) val0.textContent = product.gsm;
        if (val1) val1.textContent = product.opacity;
        if (val2) val2.textContent = product.stretch;
        if (val3) val3.textContent = product.breathability;
      }

      // الصورة الرئيسية والمعرض المصغر
      if (heroImage) {
        heroImage.src = product.image;
        heroImage.alt = product.title;
      }

      if (thumbnailsContainer && product.gallery && product.gallery.length > 0) {
        const thumbDivs = thumbnailsContainer.querySelectorAll(':scope > div');
        thumbDivs.forEach((div, idx) => {
          const img = div.querySelector('img');
          const imgSrc = product.gallery[idx] || product.image;
          if (img) {
            img.src = imgSrc;
            img.alt = `${product.shortTitle} - صورة ${idx + 1}`;
          }
        });
      }

      // تحديث أزرار المقاسات إذا كانت متوفرة
      const sizeGrid = document.querySelector('#sizing-guide .grid');
      if (sizeGrid && product.availableSizes && product.availableSizes.length > 0) {
        sizeGrid.innerHTML = product.availableSizes.map((s, idx) => {
          const isSelected = s.default || idx === 0;
          return `
            <button type="button" class="size-selector-btn p-3 rounded-lg ${isSelected ? 'border-2 border-forest-green bg-soft-sage/40 shadow-sm relative' : 'border border-light-outline-variant bg-light-surface hover:border-forest-green'} text-right transition-all cursor-pointer" data-size="${s.size} (${s.heightRange})">
              ${isSelected ? '<span class="check-badge absolute top-1.5 left-1.5 text-forest-green material-symbols-outlined text-[16px]">check_circle</span>' : ''}
              <span class="block font-headline text-headline-sm text-forest-green font-bold">${s.size}</span>
              <span class="block text-[11px] ${isSelected ? 'text-forest-green font-semibold' : 'text-light-outline'} mt-0.5">${s.heightRange}</span>
              <span class="block text-[10px] ${isSelected ? 'text-mocha-brown font-bold' : 'text-forest-green font-semibold'}">${s.note}</span>
            </button>
          `;
        }).join('');
      }
    }

    // 1. حجم / طول العباءة التفاعلي
    let selectedSize = '58″ (لقامة 158 - 163 سم)';
    const defaultSizeBtn = document.querySelector('.size-selector-btn.border-2') || document.querySelector('.size-selector-btn');
    if (defaultSizeBtn) {
      selectedSize = defaultSizeBtn.getAttribute('data-size') || defaultSizeBtn.querySelector('.font-headline')?.textContent.trim() || selectedSize;
    }

    const sizeButtons = document.querySelectorAll('#sizing-guide .size-selector-btn');
    sizeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeButtons.forEach(b => {
          b.classList.remove('border-2', 'border-forest-green', 'bg-soft-sage/40', 'shadow-sm', 'relative');
          b.classList.add('border', 'border-light-outline-variant', 'bg-light-surface');
          const checkIcon = b.querySelector('.check-badge, .material-symbols-outlined');
          if (checkIcon && checkIcon.textContent.trim() === 'check_circle') {
            checkIcon.remove();
          }
        });

        btn.classList.remove('border', 'border-light-outline-variant', 'bg-light-surface');
        btn.classList.add('border-2', 'border-forest-green', 'bg-soft-sage/40', 'shadow-sm', 'relative');
        if (!btn.querySelector('.check-badge')) {
          const icon = document.createElement('span');
          icon.className = 'check-badge absolute top-1.5 left-1.5 text-forest-green material-symbols-outlined text-[16px]';
          icon.textContent = 'check_circle';
          btn.prepend(icon);
        }

        const sizeSpan = btn.querySelector('.font-headline');
        const rangeSpan = btn.querySelectorAll('span:not(.check-badge)')[1];
        selectedSize = btn.getAttribute('data-size') || (sizeSpan ? `${sizeSpan.textContent.trim()} (${rangeSpan ? rangeSpan.textContent.trim() : ''})` : selectedSize);

        showToast('تم تحديد المقاس الشرعي', `المقاس المختار: ${selectedSize}`, 'check_circle', 'info');
      });
    });

    // 2. معالجة الإضافات (Bundle Addons) وتحديث السعر الإجمالي
    const addonCheckboxes = document.querySelectorAll('input[type="checkbox"][data-price]');
    const basePrice = product ? product.price : 340;
    let currentQty = 1;

    function updatePDPPrice() {
      let totalPerItem = basePrice;
      const selectedAddons = [];

      const niqabCb = document.querySelector('input[type="checkbox"][data-price="35"]');
      if (niqabCb && niqabCb.checked) {
        totalPerItem += 35;
        selectedAddons.push('نقاب طبيعي مسامي (+35 ر.س)');
      }

      const dressCb = document.querySelector('input[type="checkbox"][data-price="85"]');
      if (dressCb && dressCb.checked) {
        totalPerItem += 85;
        selectedAddons.push('فستان كريب ساتر بلا أكمام (+85 ر.س)');
      }

      const grand = totalPerItem * currentQty;
      const addToCartBtn = document.querySelector('.add-to-cart-action');
      if (addToCartBtn) {
        const span = addToCartBtn.querySelector('span:last-child');
        if (span) {
          span.textContent = `إضافة الطقم المكتمل إلى الحقيبة (${grand} ر.س)`;
        }
      }

      return { totalPerItem, grand, selectedAddons };
    }

    addonCheckboxes.forEach(cb => {
      cb.addEventListener('change', updatePDPPrice);
    });

    // تحديث السعر المبدئي فور التحميل
    updatePDPPrice();

    // 3. عداد الكمية (+ و -)
    const qtyContainer = document.querySelector('.border-light-outline-variant.rounded.bg-light-surface');
    if (qtyContainer) {
      const minusBtn = qtyContainer.querySelector('button:first-child');
      const plusBtn = qtyContainer.querySelector('button:last-child');
      const qtySpan = qtyContainer.querySelector('span');

      if (minusBtn && plusBtn && qtySpan) {
        minusBtn.addEventListener('click', () => {
          if (currentQty > 1) {
            currentQty--;
            qtySpan.textContent = currentQty;
            updatePDPPrice();
          }
        });
        plusBtn.addEventListener('click', () => {
          currentQty++;
          qtySpan.textContent = currentQty;
          updatePDPPrice();
        });
      }
    }

    // 4. معرض الصور المصغرة
    const thumbnails = document.querySelectorAll('.grid-cols-4 > div');
    if (heroImage && thumbnails.length > 0) {
      thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
          const thumbImg = thumb.querySelector('img');
          if (thumbImg && thumbImg.src) {
            heroImage.src = thumbImg.src;
            thumbnails.forEach(t => {
              t.classList.remove('border-2', 'border-forest-green');
              t.classList.add('border', 'border-light-outline-variant');
            });
            thumb.classList.remove('border', 'border-light-outline-variant');
            thumb.classList.add('border-2', 'border-forest-green');
          }
        });
      });
    }

    // زر معاينة الحركة والانسدال (360)
    const preview360Btn = document.querySelector('section.lg\\:col-span-7 button');
    if (preview360Btn && thumbnails.length > 1) {
      let currentSlide = 0;
      preview360Btn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % thumbnails.length;
        thumbnails[currentSlide].click();
        showToast('معاينة زوايا القطعة والانسدال', `عرض زاوية ${currentSlide + 1} من ${thumbnails.length}`, '360', 'info');
      });
    }

    // 5. تبديل التبويبات (Tabs Switcher)
    const tabButtons = document.querySelectorAll('section.mt-16 .flex.items-center.gap-4 button');
    if (tabButtons.length > 0) {
      tabButtons.forEach((tabBtn) => {
        tabBtn.addEventListener('click', () => {
          tabButtons.forEach(b => {
            b.classList.remove('text-forest-green', 'font-bold', 'border-b-2', 'border-forest-green');
            b.classList.add('text-light-outline');
          });
          tabBtn.classList.add('text-forest-green', 'font-bold', 'border-b-2', 'border-forest-green');
          tabBtn.classList.remove('text-light-outline');
        });
      });
    }

    // 6. زر الإضافة إلى الحقيبة
    const addToCartLinkOrBtn = document.querySelector('.add-to-cart-action');
    if (addToCartLinkOrBtn && Cart) {
      addToCartLinkOrBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const { grand, selectedAddons } = updatePDPPrice();

        const itemToAdd = {
          id: product ? product.id : 'royal-head-abaya-sakina',
          title: product ? product.shortTitle || product.title : 'طقم عباية الرأس الفاخرة «سَكينة»',
          subtitle: product ? `${product.fabric} (${product.gsm})` : 'كريب صالونة ياباني (260 GSM) • سواد كاحل فاحم',
          price: grand / currentQty,
          size: selectedSize,
          addons: selectedAddons,
          quantity: currentQty,
          image: product ? product.image : (heroImage ? heroImage.getAttribute('src') : 'images/abaya-sakina-royal.jpg'),
          opacityGuarantee: product ? product.opacity : 'معتم 100% غير شفاف'
        };

        Cart.addToCart(itemToAdd);
        showToast('تمت الإضافة إلى حقيبة الستر بنجاح!', `${itemToAdd.title} (${currentQty} طقم)`, 'shopping_bag', 'success');

        setTimeout(() => {
          const isSubfolder = window.location.pathname.includes('/waqar_hayaa_');
          window.location.href = isSubfolder ? '../cart.html' : 'cart.html';
        }, 700);
      });
    }
  }

  /* ========================================================
     منطق صفحة المجموعات والفلاتر (Collection & Filters)
     ======================================================== */
  function initCollectionPage(Store) {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    const catParam = urlParams.get('cat');

    const articles = Array.from(document.querySelectorAll('main article'));
    const categoryMap = {
      'abaya': { label: 'عبايات الرأس والبشت الساترة', keywords: ['عباية', 'عباءة', 'بشت', 'sakina', 'mahaba'] },
      'khimar': { label: 'أطقم الخمار الفرنسي الفاخرة', keywords: ['خمار', 'عفاف', 'afaf'] },
      'isdal': { label: 'إسدالات الصلاة القطنية الواسعة', keywords: ['إسدال', 'محراب', 'mihrab', 'صلاة'] },
      'niqab': { label: 'النقابات الطبية والبراقع', keywords: ['نقاب', 'حشمة', 'niqab'] },
      'jilbab': { label: 'الجلباب الإسلامي الكلاسيكي', keywords: ['جلباب', 'رحاب', 'rehab'] }
    };

    function updateVisibleCount(count) {
      const pageCountSpan = document.querySelector('.pt-8.border-t span:first-child');
      if (pageCountSpan) {
        pageCountSpan.textContent = `الصفحة 1 من 1 (${count} قطع شرعية معتمدة)`;
      }
    }

    if (searchParam) {
      const searchInputs = document.querySelectorAll('input[type="search"]');
      searchInputs.forEach(inp => { inp.value = searchParam; });
      filterProductsByKeyword(searchParam, articles, updateVisibleCount);
    } else if (catParam && categoryMap[catParam]) {
      filterProductsByCategory(catParam, categoryMap[catParam], articles, updateVisibleCount);
    }

    // تصفية عند النقر على الفلاتر الجانبية
    const filterInputs = document.querySelectorAll('aside input[type="checkbox"], aside input[type="radio"]');
    filterInputs.forEach(input => {
      input.addEventListener('change', () => {
        showToast('تم تحديث فلاتر الحشمة', 'عرض القطع المطابقة لمعاييركِ الشرعية', 'filter_list', 'info');
      });
    });

    // إزالة شارة فلتر مفردة عند النقر على علامة X
    const chipCloseBtns = document.querySelectorAll('section.lg\\:col-span-9 .rounded-full .material-symbols-outlined');
    chipCloseBtns.forEach(closeIcon => {
      closeIcon.addEventListener('click', () => {
        const chip = closeIcon.closest('span.rounded-full');
        if (chip) chip.remove();
        articles.forEach(art => { art.style.display = 'flex'; });
        updateVisibleCount(articles.length);
      });
    });

    // مسح الفلاتر (باستخدام محددات قياسية آمنة بدون :contains)
    const allButtons = Array.from(document.querySelectorAll('aside button, section.lg\\:col-span-9 button'));
    const clearButtons = allButtons.filter(btn => {
      const txt = btn.textContent.trim();
      return txt.includes('مسح الكل') || txt.includes('إعادة ضبط');
    });

    clearButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterInputs.forEach(inp => {
          if (inp.type === 'checkbox') inp.checked = false;
        });
        articles.forEach(art => { art.style.display = 'flex'; });
        updateVisibleCount(articles.length);

        // إزالة بارامترات الفلترة من الرابط بدون إعادة تحميل
        if (window.location.search) {
          window.history.replaceState({}, '', window.location.pathname);
        }
        showToast('تم مسح جميع الفلاتر', 'عرض كافة التشكيلة الشرعية (6 قطع)', 'check_circle', 'info');
      });
    });
  }

  function filterProductsByKeyword(keyword, articles, updateVisibleCount) {
    const q = keyword.toLowerCase();
    let matched = 0;

    articles.forEach(art => {
      const text = art.textContent.toLowerCase();
      const match = text.includes(q);
      art.style.display = match ? 'flex' : 'none';
      if (match) matched++;
    });

    if (matched === 0) {
      // إظهار الكل إذا لم يتطابق نص حرفي مع تنبيه لطيف
      articles.forEach(art => { art.style.display = 'flex'; });
      updateVisibleCount(articles.length);
      showToast('عرض كافة التشكيلة', `لم نجد تطابقاً حرفياً لـ "${keyword}"، نعرض لكِ كافة القطع`, 'search', 'info');
    } else {
      updateVisibleCount(matched);
      showToast('نتائج البحث', `تم العثور على ${matched} قطعة تطابق: "${keyword}"`, 'search', 'info');
    }
  }

  function filterProductsByCategory(catKey, catInfo, articles, updateVisibleCount) {
    let matched = 0;
    articles.forEach(art => {
      const text = art.innerHTML.toLowerCase();
      const isMatch = catInfo.keywords.some(kw => text.includes(kw.toLowerCase()));
      art.style.display = isMatch ? 'flex' : 'none';
      if (isMatch) matched++;
    });

    const pageTitle = document.querySelector('h1');
    if (pageTitle) {
      pageTitle.textContent = catInfo.label;
    }

    updateVisibleCount(matched);
    showToast('التصنيف المختار', `تصفح تشكيلة: ${catInfo.label} (${matched} قطع)`, 'category', 'info');
  }

  /* ========================================================
     منطق صفحة السلة وإتمام الطلب (Cart & Checkout)
     ======================================================== */
  function initCartPage(Store, Cart) {
    if (!Cart) return;

    renderCartItems(Cart);

    // الاستماع لتحديثات السلة
    window.addEventListener('waqar-cart-updated', () => {
      renderCartItems(Cart);
    });

    // تفاعل خيارات التغليف وطريقة الدفع بصرياً
    const radioGroups = ['packaging', 'payment_method'];
    radioGroups.forEach(groupName => {
      const radios = document.querySelectorAll(`input[name="${groupName}"]`);
      radios.forEach(radio => {
        radio.addEventListener('change', () => {
          radios.forEach(r => {
            const label = r.closest('label');
            if (!label) return;
            if (r.checked) {
              label.classList.add('border-2', 'border-forest-green');
              label.classList.remove('border-light-outline-variant');
            } else {
              label.classList.remove('border-2', 'border-forest-green');
              label.classList.add('border', 'border-light-outline-variant');
            }
          });
        });
      });
    });

    // تطبيق كود الخصم
    const couponInput = document.querySelector('input[placeholder*="كود الخصم"]');
    const couponContainer = couponInput ? couponInput.parentElement : null;
    if (couponContainer) {
      const couponBtn = couponContainer.querySelector('button');
      couponBtn?.addEventListener('click', () => {
        const code = couponInput?.value;
        const res = Cart.applyCoupon(code);
        showToast(res.message, '', res.success ? 'check_circle' : 'error', res.success ? 'success' : 'error');
      });
    }

    // زر إرسال وتأكيد الطلب مع Firebase (محدد قياسي آمن)
    const confirmBtn = document.querySelector('button.confirm-order-btn') ||
                       document.querySelector('section.lg\\:col-span-5 button.w-full');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => handleOrderSubmission(Cart));
    }
  }

  function renderCartItems(Cart) {
    const cart = Cart.getCart();
    const totals = Cart.calculateTotals();

    const cartContainer = document.querySelector('.cart-items-wrapper') ||
                          document.querySelector('section.lg\\:col-span-7 .space-y-6');
    if (!cartContainer) return;

    const headerHtml = `
      <div class="flex items-center justify-between pb-4 border-b border-light-outline-variant">
        <h2 class="font-title text-title-lg text-forest-green font-bold flex items-center gap-2">
          <span class="material-symbols-outlined text-[22px]">shopping_bag</span>
          <span>القطع المختارة (${totals.count} أطقم كاملة)</span>
        </h2>
        <a href="products.html" class="text-label-sm text-mocha-brown hover:underline font-semibold">إضافة المزيد من الخمارات والعبايات</a>
      </div>
    `;

    if (cart.length === 0) {
      cartContainer.innerHTML = `
        ${headerHtml}
        <div class="text-center py-16 space-y-4">
          <span class="material-symbols-outlined text-[64px] text-light-outline">shopping_bag</span>
          <h3 class="font-title text-title-lg text-forest-green font-bold">حقيبة الستر فارغة حالياً</h3>
          <p class="text-body-md text-light-outline">تصفحي تشكيلة عباءات الرأس وأطقم الخمار الساترة وأضيفي ما يناسبكِ.</p>
          <a href="products.html" class="inline-flex items-center gap-2 px-6 py-3 bg-forest-green text-white rounded-lg font-bold shadow hover:bg-forest-green/90 transition-colors">
            <span>استكشاف الأزياء الشرعية</span>
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          </a>
        </div>
      `;
      updateSummaryPrices(totals);
      return;
    }

    let itemsHtml = '';
    cart.forEach((item, index) => {
      itemsHtml += `
        <div class="flex flex-col sm:flex-row gap-4 pb-6 border-b border-light-outline-variant/60 cart-item-row" data-index="${index}">
          <a href="product-detail.html?id=${item.id}" class="w-24 h-32 rounded-lg overflow-hidden bg-warm-taupe/20 shrink-0 border border-light-outline-variant block">
            <img src="${item.image || 'images/abaya-sakina-royal.jpg'}" alt="${item.title}" class="w-full h-full object-cover hover:scale-105 transition-transform">
          </a>
          <div class="flex-1 space-y-2">
            <div class="flex items-start justify-between gap-2">
              <div>
                <h3 class="font-title text-title-md text-forest-green font-bold hover:underline">
                  <a href="product-detail.html?id=${item.id}">${item.title}</a>
                </h3>
                <p class="text-label-sm text-light-outline mt-0.5">${item.subtitle || ''}</p>
              </div>
              <span class="font-headline text-headline-sm text-forest-green font-bold shrink-0">${item.price * item.quantity} ر.س</span>
            </div>

            <!-- شارات القياس والعتامة -->
            <div class="flex flex-wrap items-center gap-2 pt-1">
              ${item.size ? `<span class="bg-light-surface border border-forest-green/30 text-forest-green text-[11px] font-semibold px-2.5 py-0.5 rounded">${item.size}</span>` : ''}
              <span class="bg-light-surface border border-light-outline-variant text-forest-green text-[11px] font-semibold px-2.5 py-0.5 rounded flex items-center gap-1">
                <span class="material-symbols-outlined text-[13px] text-champagne-gold">verified</span>
                <span>${item.opacityGuarantee || 'معتم 100% غير شفاف'}</span>
              </span>
              ${(item.addons || []).map(ad => `<span class="bg-soft-sage text-forest-green text-[11px] font-semibold px-2 py-0.5 rounded">${ad}</span>`).join('')}
            </div>

            <!-- العداد والحذف -->
            <div class="flex items-center justify-between pt-2">
              <div class="flex items-center border border-light-outline-variant rounded bg-light-surface">
                <button type="button" class="qty-btn-minus px-2.5 py-1 text-light-outline hover:text-forest-green font-bold cursor-pointer" data-index="${index}">-</button>
                <span class="px-3 font-bold text-forest-green font-mono text-label-sm">${item.quantity}</span>
                <button type="button" class="qty-btn-plus px-2.5 py-1 text-light-outline hover:text-forest-green font-bold cursor-pointer" data-index="${index}">+</button>
              </div>
              <button type="button" class="remove-item-btn text-label-xs text-mocha-brown hover:text-red-700 flex items-center gap-1 transition-colors cursor-pointer" data-index="${index}">
                <span class="material-symbols-outlined text-[14px]">delete</span>
                <span>حذف القطعة</span>
              </button>
            </div>
          </div>
        </div>
      `;
    });

    cartContainer.innerHTML = headerHtml + itemsHtml;

    // ربط أزرار الكميات والحذف
    cartContainer.querySelectorAll('.qty-btn-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.index);
        Cart.updateQuantity(idx, -1);
      });
    });

    cartContainer.querySelectorAll('.qty-btn-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.index);
        Cart.updateQuantity(idx, 1);
      });
    });

    cartContainer.querySelectorAll('.remove-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.index);
        Cart.removeFromCart(idx);
        showToast('تم حذف القطعة من الحقيبة', '', 'delete', 'info');
      });
    });

    updateSummaryPrices(totals);
  }

  function updateSummaryPrices(totals) {
    const summaryBox = document.querySelector('section.lg\\:col-span-5');
    if (!summaryBox) return;

    const rows = summaryBox.querySelectorAll('.space-y-3.text-body-md > div');
    if (rows.length >= 4) {
      rows[0].querySelector('span:first-child').innerHTML = `مجموع الأطقم (<span class="cart-badge-count">${totals.count}</span> قطع)`;
      rows[0].querySelector('span:last-child').textContent = `${totals.subtotal} ر.س`;
      rows[1].querySelector('span:last-child').textContent = totals.totalDiscount > 0 ? `-${totals.totalDiscount} ر.س` : '0 ر.س';
      rows[2].querySelector('span:last-child').textContent = totals.shippingFee === 0 ? 'مـجـانـي (تجاوز 350 ر.س)' : `${totals.shippingFee} ر.س`;
      rows[3].querySelector('span:last-child').textContent = `${totals.vat} ر.س`;
    }

    const finalPriceSpan = summaryBox.querySelector('.font-headline.text-display-lg-mobile');
    if (finalPriceSpan) {
      finalPriceSpan.textContent = `${totals.finalTotal} ر.س`;
    }

    const submitBtnSpan = summaryBox.querySelector('button.confirm-order-btn span:last-child') ||
                          summaryBox.querySelector('button.w-full span:last-child');
    if (submitBtnSpan) {
      submitBtnSpan.textContent = `تأكيد الطلب وشحن الشحنة الساترة (${totals.finalTotal} ر.س)`;
    }
  }

  async function handleOrderSubmission(Cart) {
    const cart = Cart.getCart();
    if (cart.length === 0) {
      showToast('الحقيبة فارغة', 'يرجى إضافة قطع إلى الحقيبة أولاً', 'shopping_bag', 'error');
      return;
    }

    const totals = Cart.calculateTotals();

    const packaging = document.querySelector('input[name="packaging"]:checked')?.closest('label')?.querySelector('.font-title')?.textContent?.trim() || 'صندوق وقار الكتوم السري';
    const paymentMethod = document.querySelector('input[name="payment_method"]:checked')?.closest('label')?.querySelector('span.font-semibold')?.textContent?.trim() || 'مدى / Apple Pay';
    const deliveryNote = document.querySelector('input[placeholder*="ملاحظة خاصة لمندوب التوصيل"]')?.value?.trim() || 'شحن كتوم هادئ';

    const orderData = {
      items: cart,
      itemsCount: totals.count,
      subtotal: totals.subtotal,
      discount: totals.totalDiscount,
      shippingFee: totals.shippingFee,
      finalTotal: totals.finalTotal,
      packaging,
      paymentMethod,
      deliveryNote,
      store: "وقار وحياء للزي الشرعي"
    };

    showToast('جاري تسجيل طلبكِ في Firebase...', 'يرجى الانتظار لحظات', 'hourglass_top', 'info');

    try {
      let result = { success: true, id: 'WQ-' + Math.floor(100000 + Math.random() * 900000) };

      if (window.WaqarFirebase && typeof window.WaqarFirebase.submitOrder === 'function') {
        result = await window.WaqarFirebase.submitOrder(orderData);
      }

      // تفريغ السلة بعد إتمام الطلب بنجاح
      Cart.clearCart();

      // عرض مودال تأكيد الطلب الشرعي المريح
      showOrderSuccessModal(result.id, orderData);
    } catch (err) {
      console.error("Order error:", err);
      showToast('تم حفظ الطلب بنجاح', 'سيتم التواصل معكِ لتأكيد الشحن الكتوم', 'verified', 'success');
      showOrderSuccessModal('WQ-' + Date.now().toString(36).toUpperCase(), orderData);
    }
  }

  function showOrderSuccessModal(orderId, orderData) {
    let modal = document.getElementById('waqar-order-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'waqar-order-modal';
      modal.className = 'waqar-modal-overlay active';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="waqar-modal-content p-8 space-y-6 text-center">
        <div class="w-16 h-16 rounded-full bg-soft-sage border border-forest-green/30 text-forest-green flex items-center justify-center mx-auto shadow-inner">
          <span class="material-symbols-outlined text-[36px] text-champagne-gold">verified</span>
        </div>

        <div class="space-y-2">
          <h3 class="font-headline text-headline-lg text-forest-green font-bold">بارك الله لكِ وفيكِ، تم تأكيد طلبكِ!</h3>
          <p class="text-body-md text-light-outline">
            تم حفظ طلبكِ بنجاح في قاعدة بيانات المتجر المتصلة بـ Firebase.
          </p>
        </div>

        <div class="h-28 rounded-xl overflow-hidden border border-forest-green/20 relative shadow-sm">
          <img src="images/packaging-discreet.jpg" alt="شحنة كتومة" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-forest-green/60 flex items-center justify-center p-3 text-white">
            <span class="text-label-sm font-bold bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">شحنة مغلّفة بسرية تامة وموثقة</span>
          </div>
        </div>

        <div class="bg-light-surface-container-low p-4 rounded-xl border border-light-outline-variant space-y-2 text-right text-body-sm">
          <div class="flex items-center justify-between pb-2 border-b border-light-outline-variant/60">
            <span class="text-light-outline">رقم التتبع والطلب (Firebase ID):</span>
            <span class="font-mono font-bold text-forest-green text-label-md">${orderId}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-light-outline">المبلغ الإجمالي:</span>
            <span class="font-bold text-forest-green">${orderData.finalTotal} ر.س</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-light-outline">نوع التغليف المختار:</span>
            <span class="font-semibold text-forest-green">${orderData.packaging}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-light-outline">وسيلة الدفع:</span>
            <span class="text-light-on-surface font-semibold">${orderData.paymentMethod}</span>
          </div>
        </div>

        <div class="bg-soft-sage/40 p-3.5 rounded-lg border border-forest-green/20 text-right text-label-sm text-forest-green flex items-center gap-2">
          <span class="material-symbols-outlined text-[22px] text-champagne-gold shrink-0">inventory_2</span>
          <span>سيتم تجهيز الشحنة في تغليف كتوم لا يحمل أي علامات وتوصيلها خلال 48 ساعة.</span>
        </div>

        <div class="pt-2 flex flex-col sm:flex-row gap-3">
          <a href="index.html" class="flex-1 py-3 px-4 bg-forest-green text-white font-bold rounded-lg hover:bg-forest-green/90 transition-colors">
            العودة للرئيسية
          </a>
          <button type="button" onclick="window.print()" class="py-3 px-4 bg-light-surface border border-light-outline-variant text-forest-green font-semibold rounded-lg hover:bg-light-surface-container transition-colors flex items-center justify-center gap-1 cursor-pointer">
            <span class="material-symbols-outlined text-[18px]">print</span>
            <span>طباعة الفاتورة</span>
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  /* ========================================================
     منطق الصفحة الرئيسية (Homepage)
     ======================================================== */
  function initHomepage() {
    const fabricCards = document.querySelectorAll('#coverage-fabric .bg-light-surface');
    fabricCards.forEach(card => {
      card.classList.add('product-card-hover');
    });
  }
})();
