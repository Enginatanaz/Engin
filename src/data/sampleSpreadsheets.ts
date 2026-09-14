export interface PresetSpreadsheet {
  id: string;
  name: string;
  description: string;
  category: string;
  headers: string[];
  rows: (string | number)[][];
  suggestedExercise: {
    task: string;
    targetCell: string;
    expectedFormula: string;
    hint: string;
  };
}

export const PRESET_SPREADSHEETS: PresetSpreadsheet[] = [
  {
    id: "sales-demo",
    name: "Teknoloji Satış Raporu",
    description: "Satış temsilcileri, bölgeler, ürün adetleri ve tutar hesaplamaları.",
    category: "Satış & Ticaret",
    headers: ["Ürün", "Temsilci", "Bölge", "Adet", "Birim Fiyat (₺)", "Toplam Ciro (₺)"],
    rows: [
      ["Dizüstü Bilgisayar", "Ahmet Yılmaz", "Marmara", 14, 28000, 392000],
      ["Akıllı Telefon", "Ayşe Kaya", "Ege", 22, 19500, 429000],
      ["Tablet Pro", "Mert Demir", "İç Anadolu", 18, 14000, 252000],
      ["4K Monitör", "Zeynep Çelik", "Marmara", 30, 8500, 255000],
      ["Kablosuz Kulaklık", "Caner Öztürk", "Akdeniz", 45, 2200, 99000],
      ["Mekanik Klavye", "Elif Şahin", "Ege", 35, 1800, 63000],
      ["GENEL TOPLAM", "-", "-", 164, "-", 0],
    ],
    suggestedExercise: {
      task: "F8 hücresine toplam ciro tutarını hesaplayan formülü yazın: =TOPLA(F2:F7)",
      targetCell: "F8",
      expectedFormula: "=TOPLA(F2:F7)",
      hint: "=TOPLA(F2:F7) yazarak F sütunundaki satışları toplayın.",
    },
  },
  {
    id: "employees-demo",
    name: "Personel Bordro & Performans",
    description: "Departmanlar, maaşlar, işe giriş tarihleri ve prim değerlendirmeleri.",
    category: "İnsan Kaynakları",
    headers: ["Ad Soyad", "Departman", "Maaş (₺)", "Performans Puanı", "Prim Durumu"],
    rows: [
      ["Selin Aksoy", "Pazarlama", 48000, 88, "Prim Var"],
      ["Burak Aydın", "Yazılım", 62000, 94, "Prim Var"],
      ["Derya Polat", "Finans", 52000, 76, "Prim Yok"],
      ["Oğuzhan Kurt", "Satış", 45000, 91, "Prim Var"],
      ["Büşra Koç", "İnsan Kaynakları", 42000, 82, "Prim Yok"],
      ["ORTALAMA", "-", 0, 0, "-"],
    ],
    suggestedExercise: {
      task: "C7 hücresine çalışanların ortalama maaşını hesaplayan formülü yazın: =ORTALAMA(C2:C6)",
      targetCell: "C7",
      expectedFormula: "=ORTALAMA(C2:C6)",
      hint: "=ORTALAMA(C2:C6) formülüyle maaşların ortalamasını alın.",
    },
  },
  {
    id: "inventory-demo",
    name: "Mağaza Stok & Tedarik Yönetimi",
    description: "Depodaki mevcut stok, kritik minimum eşik ve sipariş kontrolü.",
    category: "Lojistik & Depo",
    headers: ["Ürün Kodu", "Ürün Tanımı", "Mevcut Stok", "Kritik Eşik", "Sipariş Durumu"],
    rows: [
      ["STK-101", "USB-C Şarj Kablosu", 120, 50, "Yeterli"],
      ["STK-102", "Taşınabilir SSD 1TB", 14, 25, "Sipariş Ver!"],
      ["STK-103", "Ergonomik Mouse", 48, 30, "Yeterli"],
      ["STK-104", "Webcam Full HD", 8, 20, "Sipariş Ver!"],
      ["STK-105", "Dizüstü Standı", 65, 40, "Yeterli"],
    ],
    suggestedExercise: {
      task: "E2 hücresine Mevcut Stok (C2) Kritik Eşikten (D2) küçükse 'Sipariş Ver!', değilse 'Yeterli' yazdıran formülü uygulayın.",
      targetCell: "E2",
      expectedFormula: '=EĞER(C2<D2;"Sipariş Ver!";"Yeterli")',
      hint: '=EĞER(C2<D2;"Sipariş Ver!";"Yeterli") şeklinde EĞER fonksiyonunu kullanın.',
    },
  },
  {
    id: "expenses-demo",
    name: "Aylık Şirket Masraf ve Giderleri",
    description: "Tarihler, harcama kategorileri, açıklamalar ve harcama tutarları.",
    category: "Muhasebe & Finans",
    headers: ["Tarih", "Kategori", "Açıklama", "Tutar (₺)"],
    rows: [
      ["01.09.2026", "Ofis Kirası", "Levent Plaza Eylül Kirası", 65000],
      ["04.09.2026", "Bilişim", "Bulut Sunucu & Yazılım Lisansları", 18500],
      ["08.09.2026", "Pazarlama", "Google & LinkedIn Reklamları", 32000],
      ["12.09.2026", "Personel", "Yemek Kartı Yüklemeleri", 24000],
      ["15.09.2026", "Ulaşım", "Şehir Dışı Müşteri Ziyareti", 8400],
    ],
    suggestedExercise: {
      task: "D7 hücresine toplam harcama tutarını hesaplayan formülü yazın: =TOPLA(D2:D6)",
      targetCell: "D7",
      expectedFormula: "=TOPLA(D2:D6)",
      hint: "=TOPLA(D2:D6) formülünü yazın.",
    },
  },
];
