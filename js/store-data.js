// ========================================================
// متجر وقار وحياء للزي الشرعي - بيانات المنتجات والأقسام
// Waqar & Hayaa Modest Fashion - Store Catalog Data
// ========================================================

(function () {
  const STORE_PRODUCTS = [
    {
      id: "royal-head-abaya-sakina",
      title: "طقم عباية الرأس الملكية «سَكينة» مع بشت وأكمام مطاطية ساترة",
      shortTitle: "طقم عباية الرأس «سَكينة»",
      category: "abaya",
      categoryLabel: "عبايات الرأس الساترة",
      price: 340,
      originalPrice: 390,
      fabric: "كريب صالونة ياباني أصلي",
      gsm: "260 GSM (ثقيل وناعم)",
      opacity: "معتم بنسبة 100% تماماً",
      stretch: "ثابت لا يلتصق (Zero-Cling)",
      breathability: "مسامي وبارد على الجسم",
      rating: 4.95,
      reviewsCount: 148,
      image: "images/abaya-sakina-royal.jpg",
      gallery: [
        "images/abaya-sakina-royal.jpg",
        "images/abaya-head-satira.webp",
        "images/fabric-heavy-crepe.webp",
        "images/abaya-sakina-sleeve.jpg"
      ],
      description: "عباية رأس منسدلة من قمة الرأس بأناقة ووقار تام، مصنوعة من كريب صالونة ياباني أصلي بوزن ثقيل وسواد كاحل لا يبهت، مع نقاب ربط مريح مجاني.",
      availableSizes: [
        { size: "56″", heightRange: "لقامة 153 - 157 سم", note: "ستر تام للقدم" },
        { size: "58″", heightRange: "لقامة 158 - 163 سم", note: "الأكثر طلباً", default: true },
        { size: "60″", heightRange: "لقامة 164 - 169 سم", note: "ستر تام للقدم" },
        { size: "62″", heightRange: "لقامة 170 - 175 سم", note: "ستر تام للقدم" }
      ],
      addons: [
        { id: "addon-niqab", title: "نقاب طبيعي مسامي (مائل بخيط عين ناعم)", subtitle: "مطابق لدرجة سواد العباءة وخفيف على الأنف", price: 35, oldPrice: 45, image: "images/niqab-amira-trio.webp", checked: true },
        { id: "addon-dress", title: "إسدال داخلي / فستان كريب ساتر بلا أكمام", subtitle: "يمنع التصاق العباءة تماماً مع الخطوات السريعة", price: 85, oldPrice: 110, image: "images/fabric-medina-silk.webp", checked: true }
      ]
    },
    {
      id: "french-khimar-afaf",
      title: "طقم الخمار الفرنسي «عَفاف» الطويل مع تنورة دائرية واسعة",
      shortTitle: "طقم الخمار الفرنسي «عَفاف»",
      category: "khimar",
      categoryLabel: "أطقم خمار فرنسي",
      price: 295,
      originalPrice: 340,
      fabric: "حرير المدينة الناعم (Medina Silk)",
      gsm: "210 GSM (انسيابي وبارد)",
      opacity: "عتامة 100% غير شفاف",
      stretch: "انسيابي مهدل لا يصف",
      breathability: "بارد جداً وخفيف على الرأس",
      rating: 4.92,
      reviewsCount: 96,
      image: "images/khimar-afaf-mocha.webp",
      gallery: [
        "images/khimar-afaf-mocha.webp",
        "images/khimar-afaf.jpg",
        "images/fabric-medina-silk.webp",
        "images/opacity-test.jpg"
      ],
      description: "خمار مثلث طويل يتجاوز الركبة (طول 135 سم) مع تنورة كلوش واسعة لا تصف الجسم، مزود برباط داخلي مريح للرأس لمنع الانزلاق.",
      availableSizes: [
        { size: "56″", heightRange: "لقامة 153 - 157 سم", note: "تنورة 100 سم + خمار 135 سم" },
        { size: "58″", heightRange: "لقامة 158 - 163 سم", note: "الأكثر طلباً", default: true },
        { size: "60″", heightRange: "لقامة 164 - 169 سم", note: "تنورة 108 سم + خمار 140 سم" },
        { size: "62″", heightRange: "لقامة 170 - 175 سم", note: "ستر تام للقدم" }
      ],
      addons: [
        { id: "addon-niqab", title: "نقاب شيفون كوري مطابق", subtitle: "ربطة مريحة ومطاط ناعم", price: 35, oldPrice: 45, image: "images/niqab-amira-trio.webp", checked: true }
      ]
    },
    {
      id: "prayer-dress-mihrab",
      title: "إسدال «مِحراب» الواسع مع طرحة متصلة وسحاب مخفي",
      shortTitle: "إسدال الصلاة «مِحراب»",
      category: "isdal",
      categoryLabel: "إسدالات الصلاة المريحة",
      price: 185,
      originalPrice: 220,
      fabric: "قطن طبيعي وكتان صيفي",
      gsm: "200 GSM (قطن طبيعي)",
      opacity: "معتم 100% غير شفاف",
      stretch: "مريح وفسيح للركوع والسجود",
      breathability: "تنفس طبيعي ممتاز 100%",
      rating: 4.88,
      reviewsCount: 74,
      image: "images/isdal-salat-wasi.webp",
      gallery: [
        "images/isdal-salat-wasi.webp",
        "images/isdal-mihrab.jpg",
        "images/fabric-cotton-linen.jpg",
        "images/opacity-test.jpg"
      ],
      description: "تصميم مريح للصلوات الطويلة والتراويح واستقبال الضيوف، يستر القدمين بالكامل ولا يحتاج لتعديل أثناء الركوع والسجود بفضل الطرحة المتصلة.",
      availableSizes: [
        { size: "56″", heightRange: "لقامة 153 - 158 سم", note: "ستر تام للقدم" },
        { size: "58″", heightRange: "لقامة 158 - 165 سم", note: "مقاس حر فسيح", default: true },
        { size: "60″", heightRange: "لقامة 165 - 172 سم", note: "ستر تام للقدم" },
        { size: "62″", heightRange: "لقامة 172 - 178 سم", note: "طول إضافي للستر" }
      ],
      addons: []
    },
    {
      id: "niqab-trio-pack",
      title: "باقة نقابات «حشمة» الثلاثية (مائل، طبقتين، وخيط عين ناعم)",
      shortTitle: "باقة نقابات «حشمة» الثلاثية",
      category: "niqab",
      categoryLabel: "النقابات والبراقع",
      price: 145,
      originalPrice: 175,
      fabric: "شيفون كوري درجة أولى معتمد",
      gsm: "طبقات متدرجة خفيفة ومسامية",
      opacity: "سواد كاحل مع تنفس ممتاز",
      stretch: "أربطة قطنية مريحة لا تضغط",
      breathability: "تنفس طبي وطبيعي 100%",
      rating: 4.97,
      reviewsCount: 210,
      image: "images/niqab-amira-trio.webp",
      gallery: [
        "images/niqab-amira-trio.webp",
        "images/niqab-trio.jpg",
        "images/fabric-heavy-crepe.webp",
        "images/packaging-discreet.jpg"
      ],
      description: "أربطة مريحة لا تضغط على الرأس، خيط وسط ناعم لا يؤذي الأعين ومصممة لارتداء مريح مع النظارات الطبية مع كيس حفظ مخملي.",
      availableSizes: [
        { size: "قصير", heightRange: "طول اللثام 22 سم", note: "عملي وخفيف" },
        { size: "وسط", heightRange: "طول اللثام 28 سم", note: "الأكثر طلباً", default: true },
        { size: "طويل", heightRange: "طول اللثام 35 سم", note: "تغطية للصدر" },
        { size: "ملكي", heightRange: "طول اللثام 42 سم", note: "سابغ جداً" }
      ],
      addons: []
    },
    {
      id: "shoulder-abaya-mahaba",
      title: "بشت «مَهابة» الفسيح بقصة مغلقة بالكامل وأزرار مخفية",
      shortTitle: "بشت «مَهابة» الفسيح",
      category: "abaya",
      categoryLabel: "عباءات كتف فضفاضة",
      price: 365,
      originalPrice: 410,
      fabric: "كريب ملكي ثقيل ومحكم",
      gsm: "250 GSM (ثقيل رصين)",
      opacity: "معتم 100% غير شفاف",
      stretch: "قصة بشت واسع 180 سم",
      breathability: "مسامي ومهدل",
      rating: 4.93,
      reviewsCount: 88,
      image: "images/bisht-mahaba-fasih.webp",
      gallery: [
        "images/bisht-mahaba-fasih.webp",
        "images/bisht-mahaba.jpg",
        "images/fabric-heavy-crepe.webp",
        "images/abaya-sakina-sleeve.jpg"
      ],
      description: "عرض محيطي يتجاوز 180 سم لضمان عدم رسم الأكتاف أو المعالم، مع ياقة صينية وقورة وأزرار داخلية مخفية لستر ممتد.",
      availableSizes: [
        { size: "58″", heightRange: "لقامة 158 - 163 سم", note: "الأكثر طلباً", default: true },
        { size: "60″", heightRange: "لقامة 164 - 169 سم", note: "ستر تام للقدم" },
        { size: "62″", heightRange: "لقامة 170 - 175 سم", note: "ستر تام للقدم" },
        { size: "64″", heightRange: "لقامة فوق 176 سم", note: "طول خاص ساتر" }
      ],
      addons: [
        { id: "addon-niqab", title: "نقاب مائل مطابق", subtitle: "سواد فاحم ومتطابق تماماً", price: 35, oldPrice: 45, image: "images/niqab-amira-trio.webp", checked: true }
      ]
    },
    {
      id: "jilbab-rehab",
      title: "طقم جلباب «رِحاب» قطعتين مع تنورة كلوش فسيحة بخصر مطاطي",
      shortTitle: "طقم جلباب «رِحاب» قطعتين",
      category: "jilbab",
      categoryLabel: "جلباب إسلامي كلاسيكي",
      price: 310,
      originalPrice: 350,
      fabric: "كريب صيفي ناعم مهدل",
      gsm: "220 GSM (مبطن الصدر)",
      opacity: "معتم 100% غير شفاف",
      stretch: "فسيح ومرن لا يلتصق",
      breathability: "بارد ومريح طوال اليوم",
      rating: 4.90,
      reviewsCount: 65,
      image: "images/jilbab-rehab-two-piece.webp",
      gallery: [
        "images/jilbab-rehab-two-piece.webp",
        "images/jilbab-rehab.jpg",
        "images/fabric-medina-silk.webp",
        "images/opacity-test.jpg"
      ],
      description: "أعلى فضفاض يغطي ما بعد الركبتين، مصمم بخصائص مضادة للشفافية مع فتحة نقاب مدمجة قابلة للرفع وتنورة كلوش مريحة.",
      availableSizes: [
        { size: "56″", heightRange: "لقامة 153 - 157 سم", note: "ستر تام للقدم" },
        { size: "58″", heightRange: "لقامة 158 - 163 سم", note: "الأكثر طلباً", default: true },
        { size: "60″", heightRange: "لقامة 164 - 169 سم", note: "ستر تام للقدم" },
        { size: "62″", heightRange: "لقامة 170 - 175 سم", note: "ستر تام للقدم" }
      ],
      addons: []
    }
  ];

  function getProductById(id) {
    if (!id) return STORE_PRODUCTS[0];
    return STORE_PRODUCTS.find(p => p.id === id) || STORE_PRODUCTS[0];
  }

  if (typeof window !== 'undefined') {
    window.WaqarStore = {
      products: STORE_PRODUCTS,
      getProductById
    };
  }
})();
