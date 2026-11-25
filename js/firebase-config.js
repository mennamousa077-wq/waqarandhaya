// ========================================================
// متجر وقار وحياء للزي الشرعي - تكامل Firebase الكامل
// Waqar & Hayaa Modest Fashion - Firebase Integration (v13.4.0)
// ========================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAnalytics, logEvent as fbLogEvent } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

// إعدادات Firebase الخاصة بالمشروع
export const firebaseConfig = {
  apiKey: "AIzaSyDK-LcQqUt0YSF9DtOg3m9w_-1gF7H-awQ",
  authDomain: "tabliya-and-falafel-restaurant.firebaseapp.com",
  projectId: "tabliya-and-falafel-restaurant",
  storageBucket: "tabliya-and-falafel-restaurant.firebasestorage.app",
  messagingSenderId: "763122319755",
  appId: "1:763122319755:web:077e01d9fa88a9f8bcaf8e",
  measurementId: "G-YBQ0FGJ24Z"
};

// تهيئة Firebase بأمان مع معالجة الأخطاء
let app = null;
let analytics = null;
let db = null;
let isFirebaseReady = false;

try {
  app = initializeApp(firebaseConfig);
  if (typeof window !== 'undefined' && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
    try {
      analytics = getAnalytics(app);
    } catch (anErr) {
      console.warn("Firebase Analytics could not be initialized:", anErr);
    }
  }
  db = getFirestore(app);
  isFirebaseReady = true;
  console.log("✅ تم ربط Firebase بنجاح (tabliya-and-falafel-restaurant)");
} catch (error) {
  console.error("⚠️ خطأ في تهيئة Firebase:", error);
}

/**
 * تسجيل الأحداث التحليلية في Firebase Analytics
 */
export function logEvent(eventName, params = {}) {
  try {
    if (analytics) {
      fbLogEvent(analytics, eventName, params);
      console.log(`📊 Firebase Event [${eventName}]:`, params);
    }
  } catch (e) {
    console.debug("Analytics event skipped:", e);
  }
}

/**
 * إرسال وحفظ الطلب في Firestore (مجموعة orders)
 */
export async function submitOrder(orderData) {
  logEvent('begin_checkout', { value: orderData.finalTotal, currency: 'EGP' });

  const payload = {
    ...orderData,
    status: 'جديد - بانتظار الشحن الكتوم',
    createdAt: serverTimestamp(),
    localTimestamp: new Date().toISOString()
  };

  if (isFirebaseReady && db) {
    try {
      const docRef = await addDoc(collection(db, "orders"), payload);
      logEvent('purchase', {
        transaction_id: docRef.id,
        value: orderData.finalTotal,
        currency: 'EGP',
        items: orderData.items?.map(i => ({ item_name: i.title, quantity: i.quantity, price: i.price }))
      });
      return { success: true, id: docRef.id, fromFirebase: true };
    } catch (err) {
      console.warn("فشل الحفظ المباشر في Firestore، سيتم الحفظ محلياً:", err);
    }
  }

  // حفظ احتياطي محلي في حال انقطاع الشبكة أو قيود Firestore
  const localOrders = JSON.parse(localStorage.getItem('waqar_offline_orders') || '[]');
  const localId = 'LOCAL-' + Date.now().toString(36).toUpperCase();
  localOrders.push({ ...payload, id: localId, savedLocally: true });
  localStorage.setItem('waqar_offline_orders', JSON.stringify(localOrders));

  return { success: true, id: localId, fromFirebase: false };
}

/**
 * حفظ استشارة المقاس الشرعي في Firestore (مجموعة consultations)
 */
export async function submitConsultation(consultData) {
  logEvent('generate_lead', { type: 'modesty_sizing_consultation' });

  const payload = {
    ...consultData,
    status: 'جديد',
    createdAt: serverTimestamp(),
    localTimestamp: new Date().toISOString()
  };

  if (isFirebaseReady && db) {
    try {
      const docRef = await addDoc(collection(db, "consultations"), payload);
      return { success: true, id: docRef.id };
    } catch (err) {
      console.warn("حفظ الاستشارة محلياً:", err);
    }
  }

  const localConsults = JSON.parse(localStorage.getItem('waqar_consultations') || '[]');
  localConsults.push(payload);
  localStorage.setItem('waqar_consultations', JSON.stringify(localConsults));
  return { success: true, id: 'LOCAL-' + Date.now() };
}

/**
 * حفظ الاشتراك في القائمة البريدية للتخفيضات الشرعية
 */
export async function subscribeNewsletter(email) {
  if (!email || !email.includes('@')) return { success: false, message: 'بريد غير صالح' };

  if (isFirebaseReady && db) {
    try {
      await addDoc(collection(db, "subscribers"), {
        email,
        subscribedAt: serverTimestamp()
      });
      return { success: true };
    } catch (e) {
      console.warn("Newsletter saved locally:", e);
    }
  }

  const list = JSON.parse(localStorage.getItem('waqar_subscribers') || '[]');
  list.push({ email, date: new Date().toISOString() });
  localStorage.setItem('waqar_subscribers', JSON.stringify(list));
  return { success: true };
}

// إتاحة الكائن لجميع السكربتات العادية
if (typeof window !== 'undefined') {
  window.WaqarFirebase = {
    app,
    analytics,
    db,
    firebaseConfig,
    isReady: () => isFirebaseReady,
    logEvent,
    submitOrder,
    submitConsultation,
    subscribeNewsletter
  };

  window.dispatchEvent(new CustomEvent('waqar-firebase-ready'));
}
