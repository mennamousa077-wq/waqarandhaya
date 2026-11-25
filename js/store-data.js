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
        "images/opacity-sun-test.jpg",
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
        { id: "addon-niqab", title: "نقاب طبيعي مسامي (مائل بخيط عين ناعم)", subtitle: "مطابق لدرجة سواد العباءة وخفيف على الأنف", price: 35, oldPrice: 45, image: "images/niqab-medical-slanted.jpg", checked: true },
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
        "images/opacity-sun-test.jpg"
      ],
      description: "خمار مثلث طويل يتجاوز الركبة (طول 135 سم) مع تنورة كلوش واسعة لا تصف الجسم، مزود برباط داخلي مريح للرأس لمنع الانزلاق.",
      availableSizes: [
        { size: "56″", heightRange: "لقامة 153 - 157 سم", note: "تنورة 100 سم + خمار 135 سم" },
        { size: "58″", heightRange: "لقامة 158 - 163 سم", note: "الأكثر طلباً", default: true },
        { size: "60″", heightRange: "لقامة 164 - 169 سم", note: "تنورة 108 سم + خمار 140 سم" },
        { size: "62″", heightRange: "لقامة 170 - 175 سم", note: "ستر تام للقدم" }
      ],
      addons: [
        { id: "addon-niqab", title: "نقاب شيفون كوري مطابق", subtitle: "ربطة مريحة ومطاط ناعم", price: 35, oldPrice: 45, image: "images/niqab-medical-slanted.jpg", checked: true }
      ]
    },
    {
      id: "prayer-dress-mihrab",
      title: "إسدال «مِحراب» الواسع مع طرحة متصلة وسحاب مخفي (قطن وكتان صيفي)",
      shortTitle: "إسدال الصلاة «مِحراب»",
      category: "isdal",
      categoryLabel: "إسدالات الصلاة المريحة",
      price: 185,
      originalPrice: 220,
      fabric: "مزيج القطن الطبيعي والكتان الصيفي",
      gsm: "200 GSM (مبطن الصدر للستر)",
      opacity: "معتم 100% غير شفاف",
      stretch: "مريح وفسيح للركوع والسجود",
      breathability: "ألياف قطنية فائقة الامتصاص",
      rating: 4.88,
      reviewsCount: 74,
      image: "images/isdal-salat-wasi.webp",
      gallery: [
        "images/isdal-salat-wasi.webp",
        "images/fabric-cotton-linen.jpg",
        "images/fabric-cotton-linen-drape.jpg",
        "images/isdal-mihrab.jpg"
      ],
      description: "مصمم لأجواء الصيف الحارة والصلوات الطويلة وأداء مناسك الحج والعمرة. نسيج قطني وكتان نقي يسمح بمرور الهواء ويمنع التعرق تماماً، ومبطن في مناطق الصدر لمزيد من الستر للنساء.",
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
      title: "نقاب «الأميرة» الطبي الفاخر وباقة نقابات «حشمة» الثلاثية (مائل، طبقتين، وخيط عين ناعم)",
      shortTitle: "نقاب «الأميرة» وباقة «حشمة» الطبية",
      category: "niqab",
      categoryLabel: "تشكيلة النقابات الطبية",
      price: 145,
      originalPrice: 175,
      fabric: "شيفون كوري طبي درجة أولى",
      gsm: "طبقات متدرجة خفيفة ومسامية",
      opacity: "سواد كاحل مع تنفس ممتاز",
      stretch: "أربطة قطنية مريحة لا تضغط",
      breathability: "تنفس طبي وطبيعي 100%",
      rating: 4.97,
      reviewsCount: 210,
      image: "images/niqab-amira-trio.webp",
      gallery: [
        "images/niqab-amira-trio.webp",
        "images/niqab-royal-layers.jpg",
        "images/niqab-medical-slanted.jpg",
        "images/niqab-medical-glasses.jpg"
      ],
      description: "باقة متكاملة من 3 نقابات طبية بشيفون كوري بارد، أربطة مريحة لا تضغط على الرأس، وخيط وسط ناعم لا يؤذي الأعين مع كيس حفظ مخملي.",
      availableSizes: [
        { size: "قصير", heightRange: "طول اللثام 22 سم", note: "عملي وخفيف" },
        { size: "وسط", heightRange: "طول اللثام 28 سم", note: "الأكثر طلباً", default: true },
        { size: "طويل", heightRange: "طول اللثام 35 سم", note: "تغطية للصدر" },
        { size: "ملكي", heightRange: "طول اللثام 42 سم", note: "سابغ جداً" }
      ],
      addons: []
    },
    {
      id: "niqab-medical-slanted",
      title: "النقاب الطبي المائل «تَنفّس» بخيط عين ناعم ومسامات هوائية باردة",
      shortTitle: "النقاب الطبي المائل «تَنفّس»",
      category: "niqab",
      categoryLabel: "تشكيلة النقابات الطبية",
      price: 55,
      originalPrice: 70,
      fabric: "شيفون كوري طبي مسامي",
      gsm: "طبقتان ساترتان خفيفتان",
      opacity: "معتم 100% لا يشف الوجه",
      stretch: "مطاط جانبي مخفي مريح",
      breathability: "مضاد لكتم النفس والحرارة",
      rating: 4.96,
      reviewsCount: 134,
      image: "images/niqab-medical-slanted.jpg",
      gallery: [
        "images/niqab-medical-slanted.jpg",
        "images/niqab-amira-trio.webp",
        "images/niqab-royal-layers.jpg",
        "images/niqab-medical-glasses.jpg"
      ],
      description: "نقاب طبي مائل مصمم بقصة انسيابية تمنع ملامسة القماش للأنف والفم لراحة التنفس الطويل في العمل والجامعة، مع خيط عين قطني ناعم قابل للطي.",
      availableSizes: [
        { size: "وسط", heightRange: "طول اللثام 28 سم", note: "الأكثر طلباً", default: true },
        { size: "طويل", heightRange: "طول اللثام 35 سم", note: "تغطية للصدر" }
      ],
      addons: []
    },
    {
      id: "niqab-medical-glasses",
      title: "نقاب «بَصيرة» الطبي المخصص للنظارات بأربطة قطنية عريضة",
      shortTitle: "نقاب «بَصيرة» الطبي للنظارات",
      category: "niqab",
      categoryLabel: "تشكيلة النقابات الطبية",
      price: 60,
      originalPrice: 75,
      fabric: "شيفون كوري + جبهة قطن طبي",
      gsm: "تبطين قطني مانع لتبخر العدسات",
      opacity: "سواد فاحم وعتامة 100%",
      stretch: "ربطة خلفية عريضة لا تسبب الصداع",
      breathability: "تصريف هواء سفلي يمنع ضباب النظارة",
      rating: 4.98,
      reviewsCount: 162,
      image: "images/niqab-medical-glasses.jpg",
      gallery: [
        "images/niqab-medical-glasses.jpg",
        "images/niqab-medical-slanted.jpg",
        "images/niqab-royal-layers.jpg",
        "images/niqab-amira-trio.webp"
      ],
      description: "مصمم خصيصاً للأخوات اللواتي يرتدين النظارات الطبية؛ يمنع تكون الضباب والبخار على العدسات مع جبهة قطنية تثبت النظارة دون ضغط على الأذنين أو الصداع.",
      availableSizes: [
        { size: "وسط", heightRange: "فتحة عين مريحة للنظارة", note: "موصى به طبياً", default: true },
        { size: "طويل", heightRange: "طول اللثام 36 سم", note: "ستر ممتد" }
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
        "images/opacity-sun-test.jpg",
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
        { id: "addon-niqab", title: "نقاب مائل مطابق", subtitle: "سواد فاحم ومتطابق تماماً", price: 35, oldPrice: 45, image: "images/niqab-medical-slanted.jpg", checked: true }
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
        "images/opacity-sun-test.jpg"
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
