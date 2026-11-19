// ========================================================
// متجر وقار وحياء للزي الشرعي - إدارة السلة والطلبات
// Waqar & Hayaa Modest Fashion - Shopping Bag Manager
// ========================================================

(function () {
  const CART_STORAGE_KEY = 'waqar_cart_v1';
  const COUPON_STORAGE_KEY = 'waqar_applied_coupon';

  // السلة الافتراضية الأولية المطابقة للتصميم بصور محلية دائمة
  const DEFAULT_CART = [
    {
      id: "royal-head-abaya-sakina",
      title: "طقم عباية الرأس الفاخرة «سَكينة» (طقم متكامل)",
      subtitle: "كريب صالونة ياباني (260 GSM) • سواد كاحل فاحم",
      price: 340,
      size: "58 إنش (لقامة 158-163 سم)",
      addons: ["نقاب ربط مائل مجاني"],
      quantity: 1,
      image: "images/abaya-sakina-royal.jpg",
      opacityGuarantee: "معتم 100% غير شفاف"
    },
    {
      id: "french-khimar-afaf",
      title: "طقم الخمار الفرنسي «عَفاف» قطعتين (لون الموكا الدافئ)",
      subtitle: "حرير المدينة الناعم (210 GSM) • خمار + تنورة كلوش",
      price: 295,
      size: "طول الخمار: 135 سم (سادل خلفي وأمامي) • تنورة: 104 سم",
      addons: ["رباط رأس داخلي مانع للانزلاق"],
      quantity: 1,
      image: "images/khimar-afaf-mocha.webp",
      opacityGuarantee: "معتم 100% غير شفاف"
    }
  ];

  function getCart() {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) {
        saveCart(DEFAULT_CART);
        return DEFAULT_CART;
      }
      const parsed = JSON.parse(raw);
      let updated = false;
      parsed.forEach(item => {
        if (item.image && item.image.includes('googleusercontent.com')) {
          if (item.id === 'royal-head-abaya-sakina') item.image = 'images/abaya-sakina-royal.jpg';
          else if (item.id === 'french-khimar-afaf') item.image = 'images/khimar-afaf-mocha.webp';
          else item.image = 'images/abaya-sakina-royal.jpg';
          updated = true;
        }
      });
      if (updated) {
        saveCart(parsed);
      }
      return parsed;
    } catch (e) {
      console.error("خطأ في قراءة السلة:", e);
      return DEFAULT_CART;
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      updateCartBadges();
      window.dispatchEvent(new CustomEvent('waqar-cart-updated', { detail: { cart } }));
    } catch (e) {
      console.error("خطأ في حفظ السلة:", e);
    }
  }

  function addToCart(item) {
    const cart = getCart();
    const existingIdx = cart.findIndex(c => c.id === item.id && c.size === item.size);

    if (existingIdx > -1) {
      cart[existingIdx].quantity += (item.quantity || 1);
    } else {
      cart.push({
        id: item.id || 'item-' + Date.now(),
        title: item.title,
        subtitle: item.subtitle || '',
        price: Number(item.price),
        size: item.size || 'قياس قياسي',
        addons: item.addons || [],
        quantity: item.quantity || 1,
        image: item.image || 'images/abaya-sakina-royal.jpg',
        opacityGuarantee: item.opacityGuarantee || 'معتم 100% غير شفاف'
      });
    }

    saveCart(cart);

    if (window.WaqarFirebase && typeof window.WaqarFirebase.logEvent === 'function') {
      window.WaqarFirebase.logEvent('add_to_cart', {
        item_name: item.title,
        value: item.price,
        currency: 'SAR'
      });
    }

    return cart;
  }

  function updateQuantity(index, delta) {
    const cart = getCart();
    if (cart[index]) {
      cart[index].quantity += delta;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      saveCart(cart);
    }
    return cart;
  }

  function removeFromCart(index) {
    const cart = getCart();
    if (cart[index]) {
      const removed = cart.splice(index, 1)[0];
      saveCart(cart);

      if (window.WaqarFirebase && typeof window.WaqarFirebase.logEvent === 'function') {
        window.WaqarFirebase.logEvent('remove_from_cart', {
          item_name: removed.title,
          value: removed.price,
          currency: 'SAR'
        });
      }
    }
    return cart;
  }

  function clearCart() {
    saveCart([]);
    localStorage.removeItem(COUPON_STORAGE_KEY);
    return [];
  }

  function getAppliedCoupon() {
    try {
      return JSON.parse(localStorage.getItem(COUPON_STORAGE_KEY) || 'null');
    } catch {
      return null;
    }
  }

  function applyCoupon(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!cleanCode) return { success: false, message: 'يرجى كتابة رمز الكوبون' };

    if (cleanCode === 'WAQAR10' || cleanCode === 'BARAKA') {
      const coupon = { code: cleanCode, discountPercent: 10, label: 'خصم وقار 10%' };
      localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
      window.dispatchEvent(new CustomEvent('waqar-cart-updated'));
      return { success: true, message: 'تم تطبيق الكوبون بنجاح (خصم 10%)' };
    } else if (cleanCode === 'HAYAA15') {
      const coupon = { code: cleanCode, discountPercent: 15, label: 'خصم حياء 15%' };
      localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
      window.dispatchEvent(new CustomEvent('waqar-cart-updated'));
      return { success: true, message: 'تم تطبيق الكوبون بنجاح (خصم 15%)' };
    }

    return { success: false, message: 'عذراً، هذا الكوبون غير صالح أو منتهي الصلاحية' };
  }

  function removeCoupon() {
    localStorage.removeItem(COUPON_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('waqar-cart-updated'));
  }

  function calculateTotals() {
    const cart = getCart();
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // خصم باقة الستر المتكاملة (10% عند شراء طقمين أو أكثر)
    let bundleDiscount = 0;
    if (count >= 2) {
      bundleDiscount = Math.round(subtotal * 0.10 * 100) / 100;
    }

    // كود الخصم الإضافي إن وجد
    const coupon = getAppliedCoupon();
    let couponDiscount = 0;
    if (coupon && coupon.discountPercent) {
      couponDiscount = Math.round((subtotal - bundleDiscount) * (coupon.discountPercent / 100) * 100) / 100;
    }

    const totalDiscount = bundleDiscount + couponDiscount;

    // شحن مجاني للطلبات فوق 350 ر.س
    const shippingFee = (subtotal - totalDiscount >= 350 || subtotal === 0) ? 0 : 35;

    const finalTotal = Math.max(0, Math.round((subtotal - totalDiscount + shippingFee) * 100) / 100);

    // ضريبة القيمة المضافة 15% (مشمولة ضمن السعر)
    const vat = Math.round((finalTotal * 15 / 115) * 100) / 100;

    return {
      count,
      subtotal,
      bundleDiscount,
      couponDiscount,
      totalDiscount,
      shippingFee,
      vat,
      finalTotal,
      coupon
    };
  }

  function updateCartBadges() {
    if (typeof document === 'undefined') return;
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const badges = document.querySelectorAll('.cart-badge-count, [data-cart-count]');
    badges.forEach(badge => {
      badge.textContent = totalCount;
      badge.classList.toggle('hidden', totalCount === 0);
    });
  }

  if (typeof window !== 'undefined') {
    window.WaqarCart = {
      getCart,
      saveCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      calculateTotals,
      updateCartBadges,
      applyCoupon,
      removeCoupon,
      getAppliedCoupon
    };

    document.addEventListener('DOMContentLoaded', updateCartBadges);
    window.addEventListener('storage', (e) => {
      if (e.key === CART_STORAGE_KEY) {
        updateCartBadges();
        window.dispatchEvent(new CustomEvent('waqar-cart-updated'));
      }
    });
  }
})();
