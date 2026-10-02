import React, { useState, useEffect } from 'react';
import hotelBuildingImg from './assets/hotel-building.png';
import logoImg from './assets/logo.jpg';
import {
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  UtensilsCrossed,
  Wind,
  Car,
  Zap,
  CheckCircle2,
  Calendar,
  Send,
  MessageSquare,
  Instagram,
  Navigation,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  AlertCircle,
  ExternalLink,
  Users,
  Compass,
  Star,
  Award,
  Wifi,
  Droplets,
  BedDouble,
  Info,
  ArrowRight,
  Copy,
  Check,
  RotateCcw,
  Play,
  Pause,
  ThumbsUp,
  ChevronDown,
  HelpCircle,
  BookOpen
} from 'lucide-react';

interface DishItem {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  badge: string;
  badgeColor: string; // ruby or emerald
  image: string;
  description: string;
  prepTime: string;
  ingredients: string[];
  cookingStyle: string;
  specialNote: string;
}

const DISHES_DATA: DishItem[] = [
  {
    id: 'dal-baati',
    name: 'पारंपरिक राजस्थानी दाल बाटी चूरमा थाली',
    nameEn: 'Traditional Rajasthani Dal Baati Churma Thali',
    category: 'थाली एवं स्पेशल',
    badge: 'मारवाड़ी राजस्थानी स्पेशल',
    badgeColor: 'ruby',
    image: '/images/dal-baati.jpg',
    description: 'शुद्ध देसी घी में डूबी बाटी, पंचमेल दाल, काजू चूरमा और तीखी लहसुन चटनी। मारवाड़ की पारंपरिक विरासत का प्रामाणिक स्वाद।',
    prepTime: '15-20 मिनट',
    ingredients: [
      'शुद्ध देसी घी (Pure Desi Ghee)',
      'गेहूं का दरदरा आटा (Coarse Wheat Flour)',
      'पंचमेल दाल (चना, मूंग, उड़द, तुअर, मसूर)',
      'काजू एवं बादाम गिरी (Cashews & Almonds)',
      'देसी खांड / बूरा (Desi Shakkar)',
      'देसी लहसुन एवं लाल मिर्च चटनी',
      'तड़के का जीरा व हींग',
      'पुदीना मसाला छाछ'
    ],
    cookingStyle: 'उपलों व तंदूर में धीमी आंच पर सेकी गई पारंपरिक गेहूं बाटी, शुद्ध देसी घी में डुबोकर धीमी आंच पर पकाई गई पंचमेल दाल के साथ परोसी जाती है।',
    specialNote: 'नोट: हमारे यहाँ दाल-बाटी हमेशा ताज़ा बनाई जाती है। ऑर्डर देने के बाद 15-20 मिनट का समय लगेगा।'
  },
  {
    id: 'paneer-toofani',
    name: 'पनीर तूफानी (कढ़ाई स्टाइल)',
    nameEn: 'Paneer Toofani (Kadhai Style)',
    category: 'पनीर स्पेशल',
    badge: 'शेफ स्पेशल',
    badgeColor: 'emerald',
    image: '/images/paneer-toofani.jpg',
    description: 'ताज़ा पनीर, भुनी शिमला मिर्च और गाढ़ी टमाटर-प्याज ग्रेवी का तीखा संगम। हाईवे मुसाफिरों की पहली पसंद।',
    prepTime: '15-20 मिनट',
    ingredients: [
      'ताज़ा मलाई पनीर (Fresh Soft Cottage Cheese)',
      'क्रंची शिमला मिर्च (Crisp Green Capsicum)',
      'भुने हुए साबुत मसाले व खड़ा धनिया',
      'देसी घी और मक्खन (Butter Gravy)',
      'कश्मीरी लाल मिर्च व अदरक के लच्छे',
      'कस्तूरी मेथी'
    ],
    cookingStyle: 'लोहे की कढ़ाई में तेज़ आंच पर साबुत खड़े मसालों और शिमला मिर्च के साथ भुना हुआ ताज़ा पनीर, तीखी गाढ़ी ग्रेवी में तैयार किया जाता है।',
    specialNote: 'गरमा-गरम तंदूरी बटर रोटी या मिस्सी रोटी के साथ इसका स्वाद सर्वोत्तम रहता है।'
  },
  {
    id: 'sev-tamatar',
    name: 'काठियावाड़ी सेव टमाटर',
    nameEn: 'Kathiyawadi Sev Tamatar',
    category: 'काठियावाड़ी स्वाद',
    badge: 'काठियावाड़ी स्वाद',
    badgeColor: 'emerald',
    image: '/images/sev-tamatar.jpg',
    description: 'रसीले टमाटरों और कुरकुरी रतलामी सेव से बना झटपट हाईवे कम्फर्ट मील। खट्टा-मीठा तीखा स्वाद जो सफर की थकान मिटा दे।',
    prepTime: '15-20 मिनट',
    ingredients: [
      'लाल पके देशी टमाटर (Juicy Country Tomatoes)',
      'रतलामी तीखी लोंगिया सेव (Crisp Ratlami Sev)',
      'सरसों के बीज (Mustard Seeds Tempering)',
      'हरी मिर्च, अदरक और करी पत्ता',
      'हल्का गुड़ व अमचूर का संतुलित स्वाद',
      'ताज़ा हरा धनिया'
    ],
    cookingStyle: 'टमाटर की तीखी खट्टी-मीठी ग्रेवी को सरसों और हींग का छौंक देकर पकाया जाता है और परोसते समय ऊपर से कुरकुरी सेव डाली जाती है।',
    specialNote: 'गुजरात व सांचोर की तरफ जाने वाले यात्रियों का सबसे पसंदीदा हल्का और सुपाच्य भोजन।'
  },
  {
    id: 'shahi-kaju-curry',
    name: 'शाही काजू करी (मारवाड़ी स्पेशल)',
    nameEn: 'Shahi Kaju Curry (Marwari Special)',
    category: 'काजू स्पेशल',
    badge: 'रॉयल चॉइस',
    badgeColor: 'ruby',
    image: '/images/kaju-curry.jpg',
    description: 'शुद्ध घी में भुने साबुत काजू, मखमली काजू-इलायची ग्रेवी में धीमी आंच पर तैयार की गई शाही डिश।',
    prepTime: '15-20 मिनट',
    ingredients: [
      'साबुत काजू (Whole Roasted W320 Cashews)',
      'काजू-मगज पेस्ट (Rich Cashew Cream)',
      'शुद्ध देसी घी (Desi Ghee)',
      'हरी इलायची व दालचीनी',
      'ताज़ा क्रीम व केसर का स्पर्श'
    ],
    cookingStyle: 'काजुओं को घी में सुनहरा भूनकर मखमली रिच काजू ग्रेवी में मिलाया जाता है। यह मध्यम तीखी व खुशबूदार होती है।',
    specialNote: 'पारिवारिक रात्रिभोज और खास मौकों के लिए सबसे लोकप्रिय व्यंजन।'
  },
  {
    id: 'double-tadka-dal',
    name: 'डबल तड़का दाल, जीरा राइस व मसाला छाछ',
    nameEn: 'Double Tadka Dal with Jeera Rice & Masala Chaas',
    category: 'दाल एवं राइस',
    badge: 'कम्फर्ट मील',
    badgeColor: 'emerald',
    image: '/images/dal-baati.jpg',
    description: 'देसी घी, लहसुन और साबुत लाल मिर्च का कड़क डबल छौंक, खुशबूदार बासमती जीरा चावल और ठंडी मसाला छाछ।',
    prepTime: '15-20 मिनट',
    ingredients: [
      'पीली अरहर/तुअर दाल (Yellow Lentils)',
      'देसी घी लहसुन डबल तड़का (Double Garlic Tempering)',
      'साबुत कश्मीरी मिर्च व जीरा',
      'बासमती जीरा चावल (Aromatic Cumin Basmati Rice)',
      'घर का जमाया दही व जीरा मसाला छाछ'
    ],
    cookingStyle: 'दाल को अच्छी तरह घोंटकर पहले हींग-जीरे का छौंक और अंत में जलते घी में लहसुन व कश्मीरी मिर्च का गरमागरम दूसरा तड़का लगाया जाता है।',
    specialNote: 'लंबी ड्राइविंग के बाद पेट के लिए बेहद हल्का और ताजगी देने वाला पूर्ण भोजन।'
  }
];

interface CarouselSlide {
  id: string;
  category: string;
  title: string;
  titleEn: string;
  description: string;
  image: string;
  badge: string;
}

const ABOUT_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 'entrance',
    category: 'होटल परिसर व हाईवे पार्किंग',
    title: 'मुख्य प्रवेश द्वार एवं 24 घंटे सुरक्षित विशाल पार्किंग',
    titleEn: 'Grand Hotel Entrance & Heavy Vehicle Highway Parking',
    description: 'RJ SH 28 (सांचोर रोड), सुभाष कॉलेज के सामने। कारों, पर्यटक बसों और एसयूवी के लिए 24 घंटे खुला, सुरक्षित व विशाल पार्किंग परिसर।',
    image: hotelBuildingImg,
    badge: 'RJ SH 28 हाईवे फ्रंट'
  },
  {
    id: 'rooms',
    category: 'एसी गेस्ट रूम्स',
    title: 'डीलक्स वातानुकूलित (AC) गेस्ट रूम्स',
    titleEn: 'Deluxe AC Rooms with Steady Desert Cooling',
    description: 'वोल्टेज स्टेबलाइजर युक्त आधुनिक स्प्लिट एसी, 24 घंटे जनरेटर पावर बैकअप, स्वच्छ बेड लिनन और सैनिटाइज्ड अटैच्ड वॉशरूम।',
    image: '/images/deluxe-room.jpg',
    badge: '24/7 चेक-इन सुविधा'
  },
  {
    id: 'dining',
    category: 'फैमिली भोजनालय',
    title: 'शांत वातानुकूलित (AC) फैमिली डाइनिंग हॉल',
    titleEn: 'Peaceful Air-Conditioned Family Dining Hall',
    description: 'हाईवे के शोर व धूल से पूरी तरह अलग। परिवारों, महिलाओं और बच्चों के लिए गरिमापूर्ण वातावरण, शुद्ध आरओ जल व त्वरित सेवा।',
    image: '/images/dining-hall.jpg',
    badge: '100% शुद्ध शाकाहारी'
  },
  {
    id: 'food',
    category: 'सिग्नेचर स्वाद',
    title: 'पारंपरिक राजस्थानी दाल बाटी चूरमा व सिग्नेचर व्यंजन',
    titleEn: 'Authentic Rajasthani Dal Baati Churma & Specialties',
    description: 'शुद्ध देसी घी में धीमी आंच पर सेकी बाटी, पंचमेल दाल, काजू चूरमा, तीखी लहसुन चटनी व पनीर तूफानी। ऑर्डर के 15-20 मिनट में ताज़ा तैयार।',
    image: '/images/dal-baati.jpg',
    badge: 'शुद्ध देसी घी स्पेशल'
  }
];

interface BlogPostItem {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  badge: string;
  badgeColor: string;
  publishDate: string;
  author: string;
  readTime: string;
  image: string;
  imageAlt: string;
  summary: string;
  paragraphs: string[];
  keyTakeaways: string[];
}

const BLOG_POSTS_DATA: BlogPostItem[] = [
  {
    id: 'blog-highway-guide',
    title: 'RJ SH 28 सिणधरी हाईवे गाइड: बालोतरा से सांचोर मार्ग पर सुरक्षित रात्रि विश्राम और भोजन',
    titleEn: 'RJ SH 28 Sindhari Highway Travel Guide: Safe Night Lodging & Pure Veg Dining',
    category: 'हाईवे ट्रैवल गाइड',
    badge: 'हाईवे रूट गाइड',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    publishDate: '01 अक्टूबर 2026',
    author: 'Hotel Mahadev Desk',
    readTime: '5 मिनट पढ़ाई',
    image: '/images/dining-hall.jpg',
    imageAlt: 'RJ SH 28 Sindhari Barmer Highway Safe Lodging and Dining at Hotel Mahadev',
    summary: 'बालोतरा-सिणधरी-सांचोर राज्य राजमार्ग 28 पर यात्रा कर रहे परिवारों, टूरिस्ट बसों और मुसाफिरों के लिए सुरक्षित रात्रि विश्राम, बड़ी बसों की पार्किंग और 24 घंटे सात्विक भोजन की संपूर्ण मार्गदर्शिका।',
    paragraphs: [
      'राजस्थान का राज्य राजमार्ग 28 (RJ SH 28) बालोतरा, सिणधरी और सांचोर को जोड़ते हुए गुजरात (थराद, डीसा, अहमदाबाद) की ओर जाने वाला एक अत्यंत व्यस्ततम व्यावसायिक व पर्यटन मार्ग है। इस 150+ किलोमीटर के सफर में रेगिस्तानी मौसम, लंबी दूरी और रात के समय सड़क पर सुरक्षित ठहराव खोजना हर परिवार और चालक की पहली आवश्यकता होती है।',
      'सिणधरी मुख्य चौराहे से मात्र 800 मीटर की दूरी पर सांचोर रोड की तरफ, सुभाष कॉलेज के ठीक सामने "होटल महादेव" इस पूरे रूट का सबसे मुख्य और सुरक्षित पड़ाव माना जाता है। यहाँ 50-सीटर टूरिस्ट बसों, स्लीपर कोचों, ट्रेलरों और निजी कारों के लिए कई एकड़ में फैली खुली, समतल व पूरी तरह सुरक्षित पार्किंग उपलब्ध है।',
      'होटल महादेव पर 24 घंटे सातों दिन रिसेप्शन और शुद्ध शाकाहारी रसोई चालू रहती है। चाहे आप आधी रात को 2 बजे पहुंचे या सुबह तड़के, आपको बिना किसी देरी के गरमा-गरम सात्विक भोजन, सुरक्षित एसी रूम्स और 24 घंटे जनरेटर पावर बैकअप के साथ सुकून भरा आराम मिलता है। ड्राइवरों और टूर गाइडों के लिए भी फ्रेश होने व आराम करने की उत्तम व्यवस्था है।'
    ],
    keyTakeaways: [
      'सुभाष कॉलेज के ठीक सामने, सिणधरी चौराहे से 800 मीटर',
      'टूरिस्ट बसों, ट्रकों व कारों के लिए 24 घंटे विशाल सुरक्षित पार्किंग',
      'रात में भी 24 घंटे गरमा-गरम शुद्ध शाकाहारी भोजन व रूम चेक-इन',
      'महिला यात्रियों व परिवारों के लिए स्वच्छ, सैनिटाइज्ड वॉशरूम'
    ]
  },
  {
    id: 'blog-marwar-taste',
    title: 'मारवाड़ का पारंपरिक स्वाद: सिणधरी में असली दाल बाटी चूरमा और काठियावाड़ी भोजन',
    titleEn: 'Authentic Taste of Marwar: Pure Desi Ghee Dal Baati Churma & Kathiyawadi Cuisine',
    category: 'पारंपरिक खान-पान',
    badge: 'शुद्ध मारवाड़ी स्वाद',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    publishDate: '01 अक्टूबर 2026',
    author: 'Hotel Mahadev Desk',
    readTime: '4 मिनट पढ़ाई',
    image: '/images/dal-baati.jpg',
    imageAlt: 'Authentic Rajasthani Dal Baati Churma in Pure Desi Ghee at Hotel Mahadev Sindhari',
    summary: 'शुद्ध देसी घी में धीमी आंच पर सेकी बाटी, पंचमेल दाल, काजू चूरमा और काठियावाड़ी सेव टमाटर की पारंपरिक मारवाड़ी रेसिपी और 15-20 मिनट में ताज़ा तैयार करने की शुद्धता।',
    paragraphs: [
      'रेगिस्तानी थार की मिट्टी में पके भोजन की खुशबू और शुद्ध देसी घी का स्वाद पूरी दुनिया में अनूठा है। होटल महादेव में हम पीढ़ियों पुरानी पारंपरिक राजस्थानी रसोई की परंपरा का निष्ठापूर्वक पालन करते हैं। यहाँ बाटी को पहले से बनाकर नहीं रखा जाता, बल्कि ग्राहक के ऑर्डर देने के बाद ही धीमी आंच पर ताज़ा सेका जाता है।',
      'हमारी पंचमेल दाल में चना, मूंग, उड़द, तुअर और मसूर का पौष्टिक मिश्रण होता है, जिसे हींग, जीरे और साबुत लाल मिर्च के देसी घी तड़के से तैयार किया जाता है। चूरमे में दरदरे गेहूं के आटे, देसी खांड और मेवों (काजू-बादाम) का भरपूर उपयोग किया जाता है। साथ ही तीखी लहसुन चटनी और पुदीना छाछ इस थाली को संपूर्ण बनाती है।',
      'गुजरात सीमा के निकट होने के कारण हमारा काठियावाड़ी सेव टमाटर और रतलामी सेव का तीखा-खट्टा-मीठा स्वाद हाईवे मुसाफिरों की लंबी ड्राइविंग की सारी थकान मिटा देता है। हमारी रसोई 100% शुद्ध शाकाहारी और अंडे-मांसाहार से पूर्णतः मुक्त है।'
    ],
    keyTakeaways: [
      '100% शुद्ध देसी घी और ताज़ा मसालों का प्रामाणिक प्रयोग',
      'ऑर्डर के 15-20 मिनट में गरमा-गरम ताज़ा भोजन तैयार',
      'पारंपरिक पंचमेल दाल, काजू चूरमा और तीखी लहसुन चटनी',
      'काठियावाड़ी सेव टमाटर व पनीर तूफानी की विशेष रेसिपी'
    ]
  },
  {
    id: 'blog-family-stay',
    title: 'लंबी यात्रा में फैमिली स्टे: सिणधरी में एसी रूम्स, वाटर कूलर और पावर बैकअप सुविधाएं',
    titleEn: 'Family Stay During Long Journeys: AC Rooms, Water Coolers & 24/7 Power Backup',
    category: 'होटल सुविधाएं व सुरक्षा',
    badge: 'फैमिली स्टे गाइड',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    publishDate: '01 अक्टूबर 2026',
    author: 'Hotel Mahadev Desk',
    readTime: '4 मिनट पढ़ाई',
    image: '/images/ac-room.jpg',
    imageAlt: 'Deluxe AC Rooms with 24/7 power backup at Hotel Mahadev Sindhari Barmer',
    summary: 'रेगिस्तानी जलवायु में परिवार, महिलाओं और बच्चों के साथ सफर करते समय आरामदायक एसी रूम्स, शीतल आरओ वाटर कूलर और 24 घंटे बिजली बैकअप का महत्व।',
    paragraphs: [
      'बाड़मेर और जालोर-सांचोर क्षेत्र में गर्मियों में तापमान अक्सर 40°C से ऊपर चला जाता है। ऐसे में महिलाओं, छोटे बच्चों और बुजुर्गों के साथ सड़क मार्ग से यात्रा करते समय ठंडे, शांत और धूल-मुक्त वातावरण का मिलना बहुत आवश्यक होता है।',
      'होटल महादेव में हमने परिवार की सुविधा और मर्यादा को सर्वोच्च प्राथमिकता देते हुए सड़क के शोर-शराबे और धूल से दूर पूरी तरह अलग वातानुकूलित (AC) फैमिली डाइनिंग हॉल तैयार किया है। यहाँ परिवार शांति और सुकून के साथ बैठ सकते हैं।',
      'हमारे डीलक्स एसी कमरों में हाई-कैपेसिटी स्प्लिट एसी लगे हैं जो रेगिस्तानी गर्मी में भी तुरंत ठंडक प्रदान करते हैं। ग्रामीण व हाईवे क्षेत्रों में बिजली कटौती की आम समस्या रहती है, इसलिए होटल महादेव में 24 घंटे चालू रहने वाला हेवी-ड्यूटी जनरेटर बैकअप स्थापित है, जिससे एसी, पंखे और लाइटें कभी बंद नहीं होतीं। साथ ही 24 घंटे शीतल आरओ वाटर कूलर और गर्म-ठंडा पानी उपलब्ध रहता है।'
    ],
    keyTakeaways: [
      'हाईवे की धूल व शोर से अलग सुरक्षित वातानुकूलित फैमिली हॉल',
      '24 घंटे निरंतर हेवी-ड्यूटी जनरेटर पावर बैकअप (बिजली जाने की चिंता नहीं)',
      'स्वच्छ, सैनिटाइज्ड अटैच्ड वॉशरूम व शीतल आरओ वाटर कूलर',
      'महिलाओं व बच्चों के लिए सुरक्षित, शांत व गरिमापूर्ण माहौल'
    ]
  }
];

interface GoogleReviewItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  date: string;
  avatarColor: string;
}

const VERIFIED_GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: 'rev-1',
    name: 'रमेश पटेल',
    role: 'Highway Family Traveler',
    rating: 5,
    text: 'बाड़मेर-सांचोर हाईवे पर परिवार के साथ रुकने और खाने के लिए सबसे सुरक्षित और साफ-सुथरी जगह। दाल बाटी और सेव टमाटर लाजवाब था।',
    date: '2 हफ़्ते पहले',
    avatarColor: 'bg-emerald-600',
  },
  {
    id: 'rev-2',
    name: 'सुखदेव सिंह',
    role: 'Tour & Travel Driver',
    rating: 5,
    text: 'दाल बाटी चूरमा और पनीर तूफानी का कोई मुकाबला नहीं! AC रूम्स भी बहुत आरामदायक हैं और 24 घंटे चेक-इन चालू रहता है।',
    date: '1 माह पहले',
    avatarColor: 'bg-blue-600',
  },
  {
    id: 'rev-3',
    name: 'महेंद्र विश्नोई',
    role: 'Local Highway Commuter',
    rating: 5,
    text: '24 घंटे गरमा-गरम चाय और सात्विक खाना उपलब्ध रहता है। गाड़ियों और ट्रकों के लिए पार्किंग स्पेस बहुत विशाल व सुरक्षित है।',
    date: '3 हफ़्ते पहले',
    avatarColor: 'bg-amber-600',
  },
  {
    id: 'rev-4',
    name: 'जगदीश देवासी',
    role: 'Truck & Logistics Operator',
    rating: 5,
    text: 'हाईवे 28 पर बड़े ट्रकों व ट्रेलर के लिए इतनी खुली व सुरक्षित पार्किंग कहीं नहीं है। 100% शुद्ध शाकाहारी खाना और साफ पानी।',
    date: '2 दिन पहले',
    avatarColor: 'bg-indigo-600',
  },
  {
    id: 'rev-5',
    name: 'अनिता चौधरी',
    role: 'Family Road-Trip (Barmer to Gujarat)',
    rating: 5,
    text: 'महिलाओं और बच्चों के लिए अलग एसी फैमिली डाइनिंग हॉल बहुत स्वच्छ है। वॉशरूम साफ-सुथरे हैं। बहुत ही सुखद अनुभव रहा।',
    date: '3 हफ़्ते पहले',
    avatarColor: 'bg-rose-600',
  },
  {
    id: 'rev-6',
    name: 'विकास गहलोत',
    role: 'Business Traveler',
    rating: 5,
    text: 'सिणधरी में रात के 2:30 बजे भी ताज़ा सेव टमाटर और तवा रोटी मिली। स्टाफ का व्यवहार बहुत आदरणीय और मदद करने वाला है।',
    date: '1 माह पहले',
    avatarColor: 'bg-teal-600',
  },
  {
    id: 'rev-7',
    name: 'प्रकाश कुमावत',
    role: 'Regular Traveler (RJ SH 28)',
    rating: 5,
    text: 'शुद्ध देसी घी की दाल बाटी और स्पेशल मसाला छाछ लाजवाब है। रूम्स में एसी कूलिंग और 24 घंटे जनरेटर पावर बैकअप बढ़िया है।',
    date: '2 माह पहले',
    avatarColor: 'bg-purple-600',
  },
  {
    id: 'rev-8',
    name: 'दिनेश प्रजापत',
    role: 'Tourist Bus Coordinator',
    rating: 5,
    text: 'पूरी बस के यात्रियों के लिए झटपट और ताज़ा मारवाड़ी भोजन तैयार किया। हाईवे पर सबसे भरोसेमंद होटल महादेव!',
    date: '3 हफ़्ते पहले',
    avatarColor: 'bg-orange-600',
  },
];

// Direct Google Business Profile Review URL with lrd parameter that triggers the review popup dialog directly
const GOOGLE_BUSINESS_REVIEW_URL = 'https://www.google.com/search?q=%E0%A4%B9%E0%A5%8B%E0%A4%9F%E0%A4%B2+%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%A6%E0%A5%87%E0%A4%B5+%E0%A4%8F%E0%A4%82%E0%A4%A1+%E0%A4%B0%E0%A5%82%E0%A4%AE%E0%A5%8D%E0%A4%B8+%E0%A4%B8%E0%A4%BF%E0%A4%A3%E0%A4%A7%E0%A4%B0%E0%A5%80#lrd=0x39447710a80af5e3:0x61874aee168a805b,3';
// Google Maps Profile Link
const GOOGLE_MAPS_LISTING_URL = 'https://maps.app.goo.gl/CDvWvvnhVHjADnGS6';

interface TravelFaqItem {
  id: string;
  category: 'checkin' | 'parking' | 'group' | 'food';
  question: string;
  questionEn: string;
  answer: string;
  badge: string;
  badgeColor: string;
}

const TRAVELER_FAQS: TravelFaqItem[] = [
  {
    id: 'faq-checkin',
    category: 'checkin',
    question: 'होटल में चेक-इन (Check-in) व चेक-आउट का क्या समय है? क्या देर रात को रूम मिल सकता है?',
    questionEn: 'What are the check-in times? Is late-night room check-in available?',
    badge: '24/7 चेक-इन सुविधा',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    answer: 'होटल महादेव पर 24 घंटे / 7 दिन (Round-the-Clock) चेक-इन और चेक-आउट की सुविधा उपलब्ध है। चाहे आप देर रात 12 बजे पहुंचें या तड़के 3 बजे, हमारा फ्रंट डेस्क और नाइट स्टाफ हमेशा उपलब्ध रहता है। सभी कमरों में आधुनिक स्प्लिट एसी, 24 घंटे जनरेटर पावर बैकअप, गर्म-ठंडा पानी और स्वच्छ बेड लिनन मिलता है। हाईवे पर सफर के दौरान आप रास्ते से ही +91-9509000904 पर कॉल करके अग्रिम कमरा बुक करवा सकते हैं।'
  },
  {
    id: 'faq-parking',
    category: 'parking',
    question: 'क्या बड़ी टूरिस्ट बसों, ट्रकों और भारी वाहनों के लिए सुरक्षित पार्किंग उपलब्ध है?',
    questionEn: 'Is there secure parking space for large tourist buses, sleeper coaches, and trucks?',
    badge: 'विशाल सुरक्षित परिसर',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    answer: 'हाँ, बिल्कुल! हमारे पास RJ SH 28 (सांचोर रोड) पर सुभाष कॉलेज के ठीक सामने कई एकड़ में फैला विशाल, समतल और सुरक्षित पार्किंग परिसर है। यहाँ 50-सीटर टूरिस्ट बसें, स्लीपर कोच, ट्रेलर, कारें और भारी कमर्शियल वाहन आसानी से पार्क हो सकते हैं। वाहनों को मोड़ने (Turning Radius) के लिए पर्याप्त खुली जगह है और 24 घंटे सुरक्षा निगरानी रहती है। बस ड्राइवरों व स्टाफ के लिए भी अलग फ्रेश होने व आराम की व्यवस्था है।'
  },
  {
    id: 'faq-group-dining',
    category: 'group',
    question: 'ग्रुप डाइनिंग (Group Dining) और पूरी टूरिस्ट बस के यात्रियों के लिए भोजन की क्या पॉलिसी है?',
    questionEn: 'What are the group dining and tour bus pre-order booking policies?',
    badge: '70+ सीटर AC फैमिली हॉल',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    answer: 'हमारे पास 70 से अधिक लोगों की क्षमता वाला वातानुकूलित (AC) फैमिली डाइनिंग हॉल उपलब्ध है। टूर आयोजक, बस चालक या ग्रुप कोऑर्डिनेटर सिणधरी पहुँचने से 30-45 मिनट पहले हमें +91-9509000904 पर कॉल करके मारवाड़ी दाल बाटी चूरमा, राजस्थानी थाली या अपनी पसंद का मेनू प्री-बुक (Pre-Order) करवा सकते हैं। इससे बस पहुँचते ही सभी यात्रियों को बिना किसी इंतज़ार के गरमा-गरम, ताज़ा और शुद्ध भोजन परोसा जाता है। टूर गाइड और बस ड्राइवर के लिए विशेष सहयोग सम्मानपूर्वक दिया जाता है।'
  },
  {
    id: 'faq-pure-veg',
    category: 'food',
    question: 'क्या भोजन 100% शुद्ध शाकाहारी है और फैमिली व महिलाओं के लिए सुरक्षित माहौल है?',
    questionEn: 'Is the food 100% pure vegetarian and safe for women and family travelers?',
    badge: '100% सात्विक रसोई',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    answer: 'होटल महादेव 100% शुद्ध शाकाहारी और सात्विक भोजनालय है। हमारे परिसर में अंडे, मांसाहार या शराब का कोई प्रवेश नहीं है। हाईवे पर सफर कर रही महिलाओं, बच्चों और वरिष्ठ नागरिकों के लिए धूल और सड़क के शोर से दूर अलग वातानुकूलित फैमिली हॉल और पूरी तरह साफ-सुथरे, नियमित सैनिटाइज्ड वॉशरूम उपलब्ध हैं।'
  },
  {
    id: 'faq-payment-modes',
    category: 'checkin',
    question: 'होटल में पेमेंट के कौन-से तरीके स्वीकार किए जाते हैं? क्या UPI व ऑनलाइन पेमेंट चालू है?',
    questionEn: 'What payment modes are accepted? Are UPI and online payments supported?',
    badge: 'सभी डिजिटल पेमेंट मान्य',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    answer: 'हमारे यहाँ Google Pay, PhonePe, Paytm, BHIM UPI, नेट बैंकिंग और कैश (नकद) सभी प्रकार के पेमेंट 24 घंटे आसानी से स्वीकार किए जाते हैं। डिजिटल क्यूआर कोड काउंटर पर उपलब्ध रहता है।'
  },
  {
    id: 'faq-highway-location',
    category: 'parking',
    question: 'होटल की सटीक लोकेशन क्या है और सिणधरी चौराहे से कितनी दूरी पर है?',
    questionEn: 'What is the exact highway location and distance from Sindhari Choraha?',
    badge: 'RJ SH 28 हाईवे फ्रंट',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    answer: 'होटल महादेव राजस्थान स्टेट हाईवे 28 (सांचोर रोड) पर सिणधरी मुख्य चौराहे से मात्र 800 मीटर की दूरी पर, सुभाष कॉलेज के ठीक सामने स्थित है। गूगल मैप्स पर "होटल महादेव एंड रूम्स" सर्च करके आप सीधे नेविगेट कर सकते हैं।'
  }
];

export default function App() {
  // Page Tab state: 'home' | 'about' | 'services' | 'blog' | 'contact'
  const [currentTab, setCurrentTab] = useState<'home' | 'about' | 'services' | 'blog' | 'contact'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Selected dish for popup modal
  const [selectedDish, setSelectedDish] = useState<DishItem | null>(null);

  // Selected blog post for reading full article modal
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPostItem | null>(null);

  // FAQ Accordion State in About Us section
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-checkin');

  // Auto-scroll Reviews Ticker state
  const [isReviewsPaused, setIsReviewsPaused] = useState(false);

  // Gemini AI Google Review Generator Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [selectedReviewServices, setSelectedReviewServices] = useState<string[]>([
    '100% शुद्ध शाकाहारी भोजन',
    'सुरक्षित व विशाल हाईवे पार्किंग'
  ]);
  const [selectedReviewDishes, setSelectedReviewDishes] = useState<string[]>([
    'मारवाड़ी दाल बाटी चूरमा',
    'काठियावाड़ी सेव टमाटर'
  ]);
  const [reviewLanguage, setReviewLanguage] = useState<'Hindi' | 'Rajasthani' | 'English'>('Hindi');
  const [customReviewNotes, setCustomReviewNotes] = useState('');
  const [generatedReviewText, setGeneratedReviewText] = useState('');
  const [isGeneratingReview, setIsGeneratingReview] = useState(false);
  const [reviewCopied, setReviewCopied] = useState(false);

  const toggleReviewService = (service: string) => {
    setSelectedReviewServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const toggleReviewDish = (dish: string) => {
    setSelectedReviewDishes(prev =>
      prev.includes(dish) ? prev.filter(d => d !== dish) : [...prev, dish]
    );
  };

  const handleGenerateReview = async () => {
    setIsGeneratingReview(true);
    setReviewCopied(false);

    try {
      const res = await fetch('/api/generate-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          services: selectedReviewServices,
          dishes: selectedReviewDishes,
          rating: reviewRating,
          language: reviewLanguage,
          customNotes: customReviewNotes,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.review) {
          setGeneratedReviewText(data.review);
          setIsGeneratingReview(false);
          return;
        }
      }
      throw new Error('API fallback');
    } catch {
      // Local fallback in case network is disconnected
      const dishesStr = selectedReviewDishes.length > 0 ? selectedReviewDishes.join(' और ') : 'दाल बाटी चूरमा';
      const servicesStr = selectedReviewServices.length > 0 ? selectedReviewServices.join(', ') : 'शुद्ध शाकाहारी खाना';

      let localReview = '';
      if (reviewLanguage === 'English') {
        localReview = `Outstanding 5-star experience at Hotel Mahadev on RJ SH 28 Sindhari! The pure veg food was fresh and delicious, especially the ${dishesStr}. Very safe parking for vehicles, neat AC family dining hall, and 24-hour attentive staff. Must visit on Barmer-Sanchore highway!`;
      } else if (reviewLanguage === 'Rajasthani') {
        localReview = `बाड़मेर-सांचोर हाईवे माथे होटल महादेव रो कोई जवाब कोनी! अठे रो ${dishesStr} घणो स्वादिष्ट अर शुद्ध देसी घी रो है। परिवार सागे रुकबा सारू एकदम साफ-सुथरो एसी डाइनिंग हॉल अर 24 घंटा सेवा घणी उत्तम है। सिणधरी पधारो तो अठे जरूर आवो!`;
      } else {
        localReview = `सिणधरी (RJ SH 28 सांचोर रोड) पर होटल महादेव का अनुभव बहुत ही शानदार रहा। यहाँ का 100% शुद्ध शाकाहारी भोजन और विशेषकर ${dishesStr} बहुत ही स्वादिष्ट और ताज़ा था। ${servicesStr} की सुविधा अति उत्तम है। हाईवे पर परिवार के साथ सुरक्षित ठहराव के लिए नंबर 1 होटल! 5/5 ⭐`;
      }
      setGeneratedReviewText(localReview);
      setIsGeneratingReview(false);
    }
  };

  const copyReviewToClipboard = (text: string) => {
    if (!text) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setReviewCopied(true);
    } catch {
      setReviewCopied(true);
    }
  };

  const handleCopyAndPostToGoogle = () => {
    if (!generatedReviewText) return;
    copyReviewToClipboard(generatedReviewText);
    try {
      window.open(GOOGLE_BUSINESS_REVIEW_URL, '_blank');
    } catch {
      window.location.href = GOOGLE_BUSINESS_REVIEW_URL;
    }
  };

  // Carousel State in About Us section
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselFading, setIsCarouselFading] = useState(false);

  const changeCarouselSlide = (targetIndex: number) => {
    if (targetIndex === carouselIndex) return;
    setIsCarouselFading(true);
    setTimeout(() => {
      setCarouselIndex(targetIndex);
      setIsCarouselFading(false);
    }, 180);
  };

  const handleNextSlide = () => {
    const nextIdx = (carouselIndex + 1) % ABOUT_CAROUSEL_SLIDES.length;
    changeCarouselSlide(nextIdx);
  };

  const handlePrevSlide = () => {
    const prevIdx = (carouselIndex - 1 + ABOUT_CAROUSEL_SLIDES.length) % ABOUT_CAROUSEL_SLIDES.length;
    changeCarouselSlide(prevIdx);
  };

  // Contact / Inquiry Form State
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    inquiryType: 'AC Deluxe Guest Room (कमरा बुकिंग)',
    guestsCount: '2 Guests',
    arrivalDate: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('');

  // Switch tab and scroll to top smoothly
  const navigateToTab = (tab: 'home' | 'about' | 'services' | 'blog' | 'contact') => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'कृपया अपना पूरा नाम दर्ज करें (Please enter your name)';
    }

    const cleanPhone = formData.mobile.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.mobile = 'कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें (Valid 10-digit number required)';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'कृपया सही ईमेल पता दर्ज करें (Valid email format required)';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Build clean WhatsApp URL and open immediately
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    let msg = `*होटल महादेव (सिणधरी) - नई WhatsApp पूछताछ*\n\n` +
      `👤 *अतिथि का नाम:* ${formData.fullName}\n` +
      `📞 *मोबाइल नंबर:* ${formData.mobile}\n`;
    if (formData.email.trim()) {
      msg += `📧 *ईमेल:* ${formData.email.trim()}\n`;
    }
    msg += `🏨 *पूछताछ प्रकार:* ${formData.inquiryType}\n` +
      `👥 *व्यक्तियों / कमरों की संख्या:* ${formData.guestsCount}\n`;
    if (formData.arrivalDate.trim()) {
      msg += `📅 *आगमन तारीख व समय:* ${formData.arrivalDate.trim()}\n`;
    }
    if (formData.message.trim()) {
      msg += `💬 *संदेश / विशेष मांग:* ${formData.message.trim()}\n`;
    }
    msg += `\n📍 *स्थान:* होटल महादेव, RJ SH 28 (सांचोर रोड), सुभाष कॉलेज के सामने, सिणधरी (बाड़मेर)\n` +
      `⏰ *समय:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

    const waUrl = `https://wa.me/919509000904?text=${encodeURIComponent(msg)}`;
    setLastWhatsAppUrl(waUrl);

    // Directly open WhatsApp with customer inquiry prefilled
    try {
      window.open(waUrl, '_blank');
    } catch {
      // fallback
    }

    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  const createWhatsAppUrl = (dishTitle?: string) => {
    let msg = `*होटल महादेव (सिणधरी) - पूछताछ*\n\n`;
    if (dishTitle) {
      msg += `🍲 *डिश ऑर्डर पूछताछ:* ${dishTitle}\n`;
    }
    if (formData.fullName) {
      msg += `👤 नाम: ${formData.fullName}\n`;
      msg += `📞 फोन: ${formData.mobile}\n`;
      msg += `🏨 प्रकार: ${formData.inquiryType}\n`;
      msg += `👥 व्यक्ति/कमरे: ${formData.guestsCount}\n`;
      msg += `📅 तारीख/समय: ${formData.arrivalDate || 'आज'}\n`;
      if (formData.message) {
        msg += `💬 संदेश: ${formData.message}\n`;
      }
    }
    msg += `\n📍 स्थान: RJ SH 28 (सांचोर रोड), सुभाष कॉलेज के सामने, सिणधरी (बाड़मेर)`;
    return `https://wa.me/919509000904?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen bg-[#F4F9F5] text-[#0F172A] font-sans selection:bg-[#15803D]/20 selection:text-[#166534]">
      
      {/* 1. STICKY TOP NAVIGATION BAR (CLEAN, NO YELLOW/GOLD) */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#0F172A]/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo Container (Homage to uploaded HM/RK Brand Logo) */}
          <button
            onClick={() => navigateToTab('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            {/* Actual Brand Logo Container */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#15803D] bg-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
              <img
                src={logoImg}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo.jpg';
                }}
                alt="Hotel Mahadev Logo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title & Micro-badges */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-title text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] leading-none">
                  Hotel Mahadev
                </span>
                {/* 100% Pure Veg Indian Standard Badge */}
                <span className="w-4 h-4 rounded-xs border border-[#15803D] flex items-center justify-center bg-white" title="100% Shuddh Shakahari">
                  <span className="w-2 h-2 rounded-full bg-[#15803D]"></span>
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#15803D] tracking-wider uppercase mt-1">
                Family Hall &amp; Pure Veg · AC Rooms
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (Tab Switching Without Reload) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F4F9F5] p-1.5 rounded-full border border-[#0F172A]/10 text-xs font-semibold">
            <button
              onClick={() => navigateToTab('home')}
              className={`px-4 py-2 rounded-full transition-all ${
                currentTab === 'home'
                  ? 'bg-[#15803D] text-white shadow-xs'
                  : 'text-[#0F172A] hover:text-[#15803D] hover:bg-white/80'
              }`}
            >
              Home (होम)
            </button>
            <button
              onClick={() => navigateToTab('about')}
              className={`px-4 py-2 rounded-full transition-all ${
                currentTab === 'about'
                  ? 'bg-[#15803D] text-white shadow-xs'
                  : 'text-[#0F172A] hover:text-[#15803D] hover:bg-white/80'
              }`}
            >
              About Us (परिचय)
            </button>
            <button
              onClick={() => navigateToTab('services')}
              className={`px-4 py-2 rounded-full transition-all ${
                currentTab === 'services'
                  ? 'bg-[#15803D] text-white shadow-xs'
                  : 'text-[#0F172A] hover:text-[#15803D] hover:bg-white/80'
              }`}
            >
              Products &amp; Services (व्यंजन व रूम्स)
            </button>
            <button
              onClick={() => navigateToTab('blog')}
              className={`px-4 py-2 rounded-full transition-all ${
                currentTab === 'blog'
                  ? 'bg-[#15803D] text-white shadow-xs'
                  : 'text-[#0F172A] hover:text-[#15803D] hover:bg-white/80'
              }`}
            >
              Blog &amp; Guides (हाईवे गाइड)
            </button>
            <button
              onClick={() => navigateToTab('contact')}
              className={`px-4 py-2 rounded-full transition-all ${
                currentTab === 'contact'
                  ? 'bg-[#15803D] text-white shadow-xs'
                  : 'text-[#0F172A] hover:text-[#15803D] hover:bg-white/80'
              }`}
            >
              Contact Us (संपर्क)
            </button>
          </nav>

          {/* Top Right Actions */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href="tel:+919509000904"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white bg-[#15803D] hover:bg-[#166534] rounded-md transition-colors shadow-xs"
            >
              <Phone className="w-3 h-3 text-white" />
              <span>Call 24/7 Desk: 9509000904</span>
            </a>
            <a
              href="https://maps.app.goo.gl/CDvWvvnhVHjADnGS6"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0F172A] bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition-colors"
            >
              <Navigation className="w-3 h-3 text-[#15803D]" />
              <span>Directions</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#0F172A] hover:text-[#15803D] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
            <div className="flex flex-col space-y-1 text-sm font-semibold text-[#0F172A]">
              <button
                onClick={() => navigateToTab('home')}
                className={`text-left py-2.5 px-3 rounded-md ${
                  currentTab === 'home' ? 'bg-[#15803D] text-white' : 'hover:bg-[#F4F9F5]'
                }`}
              >
                Home (मुख्य पृष्ठ)
              </button>
              <button
                onClick={() => navigateToTab('about')}
                className={`text-left py-2.5 px-3 rounded-md ${
                  currentTab === 'about' ? 'bg-[#15803D] text-white' : 'hover:bg-[#F4F9F5]'
                }`}
              >
                About Us (हमारे बारे में)
              </button>
              <button
                onClick={() => navigateToTab('services')}
                className={`text-left py-2.5 px-3 rounded-md ${
                  currentTab === 'services' ? 'bg-[#15803D] text-white' : 'hover:bg-[#F4F9F5]'
                }`}
              >
                Products &amp; Services (व्यंजन व रूम्स)
              </button>
              <button
                onClick={() => navigateToTab('blog')}
                className={`text-left py-2.5 px-3 rounded-md ${
                  currentTab === 'blog' ? 'bg-[#15803D] text-white' : 'hover:bg-[#F4F9F5]'
                }`}
              >
                Blog &amp; Guides (ब्लॉग व हाईवे गाइड)
              </button>
              <button
                onClick={() => navigateToTab('contact')}
                className={`text-left py-2.5 px-3 rounded-md ${
                  currentTab === 'contact' ? 'bg-[#15803D] text-white' : 'hover:bg-[#F4F9F5]'
                }`}
              >
                Contact Us (संपर्क व पता)
              </button>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="tel:+919509000904"
                className="flex items-center justify-center gap-2 py-3 bg-[#15803D] text-white text-xs font-bold uppercase rounded-md shadow-xs"
              >
                <Phone className="w-4 h-4" />
                Call Desk: +91-9509000904
              </a>
              <a
                href="https://maps.app.goo.gl/CDvWvvnhVHjADnGS6"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-[#0F172A] text-xs font-semibold uppercase rounded-md border border-slate-300"
              >
                <Navigation className="w-4 h-4 text-[#15803D]" />
                Google Maps पर रास्ता देखें
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================
          TAB 1: HOME PAGE (STRICT SECTION HIERARCHY)
         ======================================================== */}
      {currentTab === 'home' && (
        <main className="animate-fadeIn">
          
          {/* HERO SECTION WITH OVERLAY */}
          <section className="relative min-h-[580px] md:min-h-[640px] flex items-center justify-center overflow-hidden bg-[#0F172A] text-white">
            
            {/* Background Hotel Facade Overlay Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={hotelBuildingImg}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== '/hotel-building.png') {
                    target.src = '/hotel-building.png';
                  } else {
                    target.src = 'https://plain-apac-prod-public.komododecks.com/202610/01/EgtBPhLSkFJulyMWcvvr/image.png';
                  }
                }}
                alt="Hotel Mahadev Sindhari Building Facade"
                className="w-full h-full object-cover filter brightness-105 contrast-105"
              />
              {/* Reduced dark shadow: subtle gradient so the real hotel building is bright and clearly visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-black/25 to-black/35"></div>
            </div>

            {/* Top Badge: Actual Photo Indicator */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>होटल महादेव का वास्तविक चित्र</span>
            </div>

            {/* Centered Luxury Text Overlay with glass card for maximum readability and full image visibility */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
              <div className="bg-[#0F172A]/40 backdrop-blur-xs border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
                
                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15803D]/40 border border-[#15803D]/70 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping"></span>
                  <span>100% Shuddh Shakahari · 24/7 Dining &amp; Lodging</span>
                </div>

                {/* Main Semantic H1 for SEO, AEO & Voice Search */}
                <h1 className="font-title text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
                  24/7 Pure Veg Hotel &amp; AC Lodging on RJ SH 28, Sindhari | Hotel Mahadev
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-xl md:text-2xl text-slate-100 font-normal leading-relaxed max-w-3xl mx-auto">
                  सिणधरी का विश्वसनीय 24/7 शुद्ध शाकाहारी फैमिली होटल एवं एसी गेस्ट हाउस
                </p>

                {/* Micro-text */}
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-300 font-medium tracking-wide">
                  <MapPin className="w-4 h-4 shrink-0 text-[#22C55E]" />
                  <span>RJ SH 28, Near Subhash College, Sindhari (Barmer)</span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="tel:+919509000904"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#15803D] hover:bg-[#166534] text-white font-bold text-sm uppercase tracking-wider rounded-md transition-all shadow-lg active:scale-95"
                  >
                    <Phone className="w-4 h-4" />
                    <span>कमरा बुक करें / कॉल करें: +91-9509000904</span>
                  </a>

                  <a
                    href="https://maps.app.goo.gl/CDvWvvnhVHjADnGS6"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/15 hover:bg-white/25 text-white font-semibold text-sm uppercase tracking-wider rounded-md border border-white/30 transition-all backdrop-blur-xs"
                  >
                    <Navigation className="w-4 h-4 text-emerald-300" />
                    <span>Google Maps पर रास्ता देखें</span>
                  </a>
                </div>

                {/* Fast Highlight Points */}
                <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-200 border-t border-white/15 max-w-2xl mx-auto">
                  <div>✓ 24 घंटे निरंतर सेवा</div>
                  <div>✓ अलग AC फैमिली हॉल</div>
                  <div>✓ डीलक्स एसी रूम्स</div>
                  <div>✓ सुरक्षित विशाल पार्किंग</div>
                </div>

              </div>
            </div>
          </section>

          {/* TOP 3 TRENDING PRODUCTS (JUST BELOW HERO - NO PRICES) */}
          <section className="py-16 md:py-20 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#15803D] uppercase">
                    Highway Culinary Specialties
                  </span>
                  <h2 className="font-title text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F172A] mt-1">
                    हमारे सबसे लोकप्रिय पारंपरिक व्यंजन
                  </h2>
                  <p className="text-sm text-slate-600 mt-2">
                    ऑर्डर देने के बाद 15-20 मिनट में ताज़ा देसी मसालों व शुद्ध घी से तैयार किए जाने वाले सिग्नेचर स्वाद।
                  </p>
                </div>

                <button
                  onClick={() => navigateToTab('services')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#15803D] hover:text-[#166534] transition-colors"
                >
                  <span>सभी 5 सिग्नेचर व्यंजन देखें</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Grid of Top 3 Dishes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Dish 1: Dal Baati Churma */}
                <div className="bg-[#F4F9F5] rounded-lg border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group">
                  <div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <img
                        src={DISHES_DATA[0].image}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80';
                        }}
                        alt="Rajasthani Dal Baati Churma Thali"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-[#DC2626] text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                        मारवाड़ी राजस्थानी स्पेशल
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="font-title text-xl font-bold text-[#0F172A]">
                        Traditional Rajasthani Dal Baati Churma Thali
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        शुद्ध देसी घी में डूबी बाटी, पंचमेल दाल, काजू चूरमा और तीखी लहसुन चटनी।
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setSelectedDish(DISHES_DATA[0])}
                      className="w-full py-2.5 px-4 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>पूरी सामग्री देखें (View Dish Details)</span>
                    </button>
                  </div>
                </div>

                {/* Dish 2: Paneer Toofani */}
                <div className="bg-[#F4F9F5] rounded-lg border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group">
                  <div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <img
                        src={DISHES_DATA[1].image}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80';
                        }}
                        alt="Paneer Toofani Kadhai Style"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-[#15803D] text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                        शेफ स्पेशल
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="font-title text-xl font-bold text-[#0F172A]">
                        Paneer Toofani (Kadhai Style)
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        ताज़ा पनीर, भुनी शिमला मिर्च और गाढ़ी टमाटर-प्याज ग्रेवी का तीखा संगम।
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setSelectedDish(DISHES_DATA[1])}
                      className="w-full py-2.5 px-4 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>पूरी सामग्री देखें (View Dish Details)</span>
                    </button>
                  </div>
                </div>

                {/* Dish 3: Kathiyawadi Sev Tamatar */}
                <div className="bg-[#F4F9F5] rounded-lg border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group">
                  <div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <img
                        src={DISHES_DATA[2].image}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80';
                        }}
                        alt="Kathiyawadi Sev Tamatar"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-[#15803D] text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                        काठियावाड़ी स्वाद
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="font-title text-xl font-bold text-[#0F172A]">
                        Kathiyawadi Sev Tamatar
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        रसीले टमाटरों और कुरकुरी रतलामी सेव से बना झटपट हाईवे कम्फर्ट मील।
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setSelectedDish(DISHES_DATA[2])}
                      className="w-full py-2.5 px-4 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>पूरी सामग्री देखें (View Dish Details)</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* HOTEL MAHADEV REAL PREMISES PHOTO SHOWCASE */}
          <section className="py-14 bg-[#F4F9F5] border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] overflow-hidden bg-slate-100">
                    <img
                      src={hotelBuildingImg}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/hotel-building.png';
                      }}
                      alt="Hotel Mahadev Real Front View"
                      className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#15803D] text-white text-xs font-bold uppercase tracking-wider shadow-md inline-flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        होटल का वास्तविक चित्र (Actual Building Photo)
                      </span>
                    </div>
                  </div>
                  <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#15803D]">
                        <ShieldCheck className="w-4 h-4" />
                        <span>RJ SH 28 हाईवे फ्रंट · सिणधरी</span>
                      </div>
                      <h3 className="font-title text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">
                        होटल महादेव
                      </h3>
                      <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                        सिणधरी चौराहे से मात्र 800 मीटर की दूरी पर, सुभाष कॉलेज के ठीक सामने स्थित विशाल परिसर। 24 घंटे सुरक्षित भारी व हल्के वाहनों की पार्किंग, 100% शुद्ध शाकाहारी फैमिली भोजनालय एवं वातानुकूलित डीलक्स कमरे।
                      </p>
                      <div className="mt-5 space-y-2 text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                          <span>ट्रकों, बसों, ट्रेलर व कारों के लिए विशाल सुरक्षित पार्किंग</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                          <span>परिवारों और महिलाओं के लिए शांत व सुव्यवस्थित एसी डाइनिंग हॉल</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                          <span>24/7 जनरेटर पावर बैकअप व ठंडा आरओ पेयजल</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                      <a
                        href="tel:+919509000904"
                        className="flex-1 min-w-[180px] py-3 px-5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase rounded-md text-center transition-colors shadow-xs flex items-center justify-center gap-2"
                      >
                        <Phone className="w-4 h-4" />
                        <span>सीधे कॉल करें: 9509000904</span>
                      </a>
                      <a
                        href="https://maps.app.goo.gl/CDvWvvnhVHjADnGS6"
                        target="_blank"
                        rel="noreferrer"
                        className="py-3 px-5 border border-slate-300 hover:bg-slate-50 text-[#0F172A] text-xs font-bold uppercase rounded-md text-center transition-colors flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-4 h-4 text-[#15803D]" />
                        <span>Google Map</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BASIC HOTEL INFORMATION & ABOUT SNIPPET (2-COLUMN LAYOUT) */}
          <section className="py-16 md:py-20 bg-[#F4F9F5] border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Description Column */}
                <div className="lg:col-span-7 space-y-6">
                  <span className="text-xs font-bold tracking-widest text-[#15803D] uppercase">
                    Trusted Highway Hospitality
                  </span>
                  
                  <h2 className="font-title text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F172A]">
                    होटल महादेव, सिणधरी
                  </h2>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    राजस्थान स्टेट हाईवे 28 (RJ SH 28) पर स्थित <strong>होटल महादेव</strong> बाड़मेर, बालोतरा, सिणधरी और सांचोर के बीच सफर करने वाले यात्रियों, परिवारों और व्यापारिक टूरिस्टों के लिए सबसे सुरक्षित और आरामदायक ठहराव है।
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    हमारे यहाँ शुद्ध देसी घी में बने पारंपरिक राजस्थानी भोजन, काठियावाड़ी व पंजाबी सब्जियों के साथ-साथ परिवार के लिए वातानुकूलित (AC) डाइनिंग हॉल और आधुनिक सुविधायुक्त एसी कमरे 24 घंटे उपलब्ध हैं।
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-start gap-3 p-3 bg-white rounded-md border border-slate-200">
                      <Clock className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs sm:text-sm text-[#0F172A] block font-bold">24 घंटे निरंतर सेवा</strong>
                        <span className="text-xs text-slate-500">दिन-रात गर्म ताज़ा भोजन और रूम चेक-इन</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-white rounded-md border border-slate-200">
                      <ShieldCheck className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs sm:text-sm text-[#0F172A] block font-bold">100% शुद्ध शाकाहारी रसोई</strong>
                        <span className="text-xs text-slate-500">अंडे व मांसाहार रहित, पूर्णतः पवित्र व स्वच्छ</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-white rounded-md border border-slate-200">
                      <UtensilsCrossed className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs sm:text-sm text-[#0F172A] block font-bold">AC फैमिली डाइनिंग हॉल</strong>
                        <span className="text-xs text-slate-500">रोड रश व धूल से दूर परिवारों के लिए शांत वातावरण</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-white rounded-md border border-slate-200">
                      <Car className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs sm:text-sm text-[#0F172A] block font-bold">विशाल सुरक्षित पार्किंग</strong>
                        <span className="text-xs text-slate-500">कारों, पर्यटक बसों और एसयूवी के लिए खुला परिसर</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => navigateToTab('about')}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#15803D] hover:underline"
                    >
                      <span>होटल महादेव का पूरा परिचय पढ़ें</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                {/* Right Presentation Showcase */}
                <div className="lg:col-span-5">
                  <div className="bg-[#0F172A] text-white p-8 rounded-xl border border-[#15803D]/40 space-y-6 shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#15803D]/20 rounded-full blur-2xl pointer-events-none"></div>
                    
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                        Highway Transit Center
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 bg-[#15803D] text-white rounded">
                        RJ SH 28
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-title text-2xl font-bold">
                        सुभाष कॉलेज के ठीक सामने, सिणधरी
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        सिणधरी चौराहे से सांचोर की तरफ मात्र 800 मीटर। लंबी ड्राइविंग के बीच परिवार के लिए सुकून भरा विश्राम।
                      </p>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-2 text-xs text-slate-200">
                      <div className="flex justify-between">
                        <span>फोन / हेल्पलाइन:</span>
                        <a href="tel:+919509000904" className="text-emerald-400 font-bold hover:underline">+91-9509000904</a>
                      </div>
                      <div className="flex justify-between">
                        <span>संचालन समय:</span>
                        <span className="text-[#22C55E] font-semibold">24 घंटे / सातों दिन</span>
                      </div>
                    </div>

                    <a
                      href="tel:+919509000904"
                      className="block w-full text-center py-3 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-xs"
                    >
                      सीधे फोन पर बात करें
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* GOOGLE REVIEWS SECTION (WITH AUTO-SCROLLING RIGHT-TO-LEFT TICKER & GEMINI AI REVIEW ASSISTANT) */}
          <section className="py-16 md:py-20 bg-white border-b border-slate-200 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#15803D] text-xs font-bold border border-emerald-200 shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-[#15803D]" />
                  <span>Google Reviews Verified (4.8 / 5 Rating)</span>
                </div>
                <h2 className="font-title text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F172A]">
                  हमारे अतिथियों के वास्तविक अनुभव
                </h2>
                <p className="text-sm text-slate-600">
                  बाड़मेर-सांचोर हाईवे (RJ SH 28) पर यात्रा करने वाले परिवारों, मुसाफिरों व ड्राइवरों की असली Google Reviews।
                </p>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    onClick={() => setIsReviewsPaused(!isReviewsPaused)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium transition-colors cursor-pointer"
                    title={isReviewsPaused ? "ऑटो-स्क्रोल पुनः शुरू करें" : "स्क्रोलिंग को रोकें"}
                  >
                    {isReviewsPaused ? <Play className="w-3 h-3 text-[#15803D]" /> : <Pause className="w-3 h-3 text-slate-500" />}
                    <span>{isReviewsPaused ? 'स्क्रोल चालू करें' : 'रोकें (Pause)'}</span>
                  </button>
                  <span className="text-[11px] text-slate-400">· किसी भी कार्ड पर कर्सर रखने से स्क्रोल स्वतः रुक जाता है</span>
                </div>
              </div>

              {/* CONTINUOUS RIGHT-TO-LEFT INFINITE AUTO-SCROLLING REVIEWS TRACK */}
              <div className="relative mb-12 overflow-hidden py-3">
                {/* Left & Right gradient fade masks for clean visual blend */}
                <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <div
                  className={`animate-marquee-infinite flex gap-6 ${isReviewsPaused ? '[animation-play-state:paused]' : ''}`}
                >
                  {/* Render 2 copies of verified Google reviews for seamless infinite right-to-left loop */}
                  {[...VERIFIED_GOOGLE_REVIEWS, ...VERIFIED_GOOGLE_REVIEWS].map((rev, idx) => (
                    <div
                      key={`${rev.id}-${idx}`}
                      className="w-[300px] sm:w-[350px] p-5 sm:p-6 bg-[#F4F9F5] hover:bg-emerald-50/50 rounded-2xl border border-slate-200 hover:border-[#15803D]/40 space-y-4 shadow-xs hover:shadow-md transition-all shrink-0 flex flex-col justify-between group cursor-default"
                    >
                      <div className="space-y-3">
                        {/* Rating Stars & Google Emblem */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-amber-500">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="text-[11px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded-full border border-slate-200 inline-flex items-center gap-1">
                            <span className="text-[#4285F4] font-black">G</span>oogle
                          </span>
                        </div>

                        {/* Review text */}
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                          &ldquo;{rev.text}&rdquo;
                        </p>
                      </div>

                      {/* Reviewer Details */}
                      <div className="border-t border-slate-200/70 pt-3 flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${rev.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}>
                          {rev.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-xs sm:text-sm text-[#0F172A] block truncate">
                            {rev.name}
                          </span>
                          <span className="text-[11px] text-slate-500 block truncate">
                            {rev.role} · {rev.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dedicated "Review Now" Trigger & AI Assistant Call-to-Action */}
              <div className="text-center space-y-3">
                <button
                  onClick={() => {
                    setIsReviewModalOpen(true);
                    setGeneratedReviewText('');
                    setReviewCopied(false);
                  }}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-102 group cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>⭐ Google पर रिव्यू दें (AI रिव्यू असिस्टेंट)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  क्लिक करें और 2 प्रश्नों के उत्तर दें — Gemini AI आपके लिए सबसे अच्छा 5-स्टार रिव्यू स्वतः लिख देगा!
                </p>
              </div>

            </div>
          </section>

          {/* ROOMS QUICK PREVIEW SECTION */}
          <section className="py-16 md:py-20 bg-[#F4F9F5] border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#15803D] uppercase">
                    Comfort Lodging
                  </span>
                  <h2 className="font-title text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F172A] mt-1">
                    डीलक्स एसी गेस्ट रूम्स
                  </h2>
                  <p className="text-sm text-slate-600 mt-2">
                    थार रेगिस्तान के सफर में शांतिपूर्ण और ठंडी नींद के लिए सुसज्जित वातानुकूलित कमरे।
                  </p>
                </div>

                <button
                  onClick={() => navigateToTab('services')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#15803D] hover:underline"
                >
                  <span>सभी रूम्स और सुविधाएं देखें</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Room Preview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Room 1 */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                  <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                    <img
                      src="/images/deluxe-room.jpg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80';
                      }}
                      alt="Deluxe Double AC Room"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="font-title text-xl font-bold text-[#0F172A]">
                      Deluxe Double AC Room (डबल बेड एसी कमरा)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      आरामदायक डबल बेड, साफ-सुथरी कॉटन चादरें, शांत स्प्लिट एसी, 24 घंटे रनिंग हॉट/कोल्ड वाटर और अटैच्ड वॉशरूम।
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <div>✓ स्प्लिट AC + वोल्टेज स्टेबलाइजर</div>
                      <div>✓ 24/7 पावर बैकअप</div>
                      <div>✓ आरओ ठंडा पेयजल</div>
                      <div>✓ हाई-स्पीड वाई-फाई</div>
                    </div>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-600">
                        कमरे की उपलब्धता फोन पर जांचें
                      </span>
                      <a
                        href="tel:+919509000904"
                        className="px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase rounded-md transition-colors"
                      >
                        Call: 9509000904
                      </a>
                    </div>
                  </div>
                </div>

                {/* Room 2 */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                  <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                    <img
                      src="/images/dining-hall.jpg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
                      }}
                      alt="Deluxe Family AC Suite"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="font-title text-xl font-bold text-[#0F172A]">
                      Deluxe Family AC Suite (फैमिली एसी सुइट)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      परिवार के साथ सफर कर रहे यात्रियों के लिए बड़ा कमरा, बच्चों व बुजुर्गों के लिए पूरी निजता व सुरक्षा।
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <div>✓ मल्टी-बेड सेटअप</div>
                      <div>✓ शुद्ध शाकाहारी रूम सर्विस</div>
                      <div>✓ सैनिटाइज्ड अटैच्ड बाथरूम</div>
                      <div>✓ वाहन का सीधा दृश्य</div>
                    </div>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-600">
                        कमरे की उपलब्धता फोन पर जांचें
                      </span>
                      <a
                        href="tel:+919509000904"
                        className="px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase rounded-md transition-colors"
                      >
                        Call: 9509000904
                      </a>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* LOCAL SEO INFORMATION BLOCK (HIGHWAY ASSISTANCE) */}
          <section className="py-14 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="p-6 md:p-8 bg-[#F4F9F5] rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#15803D] uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  <span>Highway Driver Assistance &amp; Local Route Info</span>
                </div>

                <h3 className="font-title text-xl font-bold text-[#0F172A]">
                  सिणधरी-सांचोर-बालोतरा हाईवे पर सही लोकेशन
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong>स्थित:</strong> RJ SH 28 (सांचोर रोड), सुभाष कॉलेज के ठीक सामने, सिणधरी चौराहे से 800 मीटर।
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs text-slate-600">
                  <div className="p-3 bg-white rounded border border-slate-200">
                    <strong className="text-[#0F172A] block mb-1">बालोतरा / जोधपुर से:</strong>
                    SH 28 पर सीधे सिणधरी आएं, मुख्य चौराहे से सांचोर की तरफ 800 मीटर पर दाहिनी तरफ।
                  </div>
                  <div className="p-3 bg-white rounded border border-slate-200">
                    <strong className="text-[#0F172A] block mb-1">बाड़मेर शहर से:</strong>
                    बाड़मेर-सिणधरी रोड (लगभग 45 किमी) होते हुए सिणधरी चौराहे से सांचोर रोड की ओर।
                  </div>
                  <div className="p-3 bg-white rounded border border-slate-200">
                    <strong className="text-[#0F172A] block mb-1">सांचोर / गुजरात से:</strong>
                    उत्तर की ओर आते समय सिणधरी कस्बे में प्रवेश से ठीक 800 मीटर पहले बाईं ओर।
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-500">
                  सर्च कीवर्ड्स: Best pure veg restaurant on RJ SH 28 Sindhari · AC Hotel near Subhash College Sindhari · Sanchore to Balotra Highway Family Hotel.
                </div>
              </div>

            </div>
          </section>

          {/* HIGHWAY TRAVEL GUIDES & BLOG PREVIEW SECTION */}
          <section className="py-16 md:py-20 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#15803D] text-xs font-bold border border-emerald-200">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>सिणधरी हाईवे ट्रैवल ब्लॉग व गाइड</span>
                  </div>
                  <h2 className="font-title text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F172A]">
                    RJ SH 28 मार्ग पर सुरक्षित यात्रा और भोजन सलाह
                  </h2>
                  <p className="text-sm text-slate-600 max-w-2xl">
                    बालोतरा से सांचोर मार्ग पर सफर कर रहे यात्रियों और परिवारों के लिए उपयोगी स्थानीय जानकारी।
                  </p>
                </div>

                <button
                  onClick={() => navigateToTab('blog')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#15803D] hover:underline shrink-0 cursor-pointer"
                >
                  <span>सभी 3 विस्तृत लेख पढ़ें</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* 3 Blog Cards Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {BLOG_POSTS_DATA.map((post) => (
                  <article
                    key={post.id}
                    className="bg-[#F4F9F5] rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        <img
                          src={post.image}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/dal-baati.jpg';
                          }}
                          alt={post.imageAlt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className={`absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold rounded-full border shadow-xs ${post.badgeColor}`}>
                          {post.badge}
                        </span>
                        <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono rounded">
                          {post.readTime}
                        </span>
                      </div>

                      <div className="p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                          <span>{post.publishDate}</span>
                          <span>•</span>
                          <span>{post.author}</span>
                        </div>

                        <h3 className="font-title text-base sm:text-lg font-bold text-[#0F172A] leading-snug group-hover:text-[#15803D] transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {post.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 pt-0 border-t border-slate-200/60 mt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedBlogPost(post)}
                        className="w-full py-2.5 px-4 bg-white hover:bg-[#15803D] text-[#0F172A] hover:text-white border border-slate-300 hover:border-[#15803D] text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <span>पूरा लेख पढ़ें</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

            </div>
          </section>

          {/* DIRECT CONTACT CTA SECTION (TRANSPARENT GLASS CARD MATCHING HERO SECTION) */}
          <section className="py-16 bg-[#F4F9F5]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Selected Card: Transparent Glassmorphism with Hotel Building Overlay matching Hero Section */}
              <div className="relative overflow-hidden bg-[#0F172A]/75 backdrop-blur-md border border-white/20 text-white p-8 md:p-12 rounded-2xl shadow-2xl text-center space-y-6">
                
                {/* Background Hotel Facade Overlay Image matching Hero Section */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <img
                    src={hotelBuildingImg}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== '/hotel-building.png') {
                        target.src = '/hotel-building.png';
                      } else {
                        target.src = 'https://plain-apac-prod-public.komododecks.com/202610/01/EgtBPhLSkFJulyMWcvvr/image.png';
                      }
                    }}
                    alt="Hotel Mahadev Sindhari Building Facade"
                    className="w-full h-full object-cover filter brightness-90 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-black/45 to-[#0F172A]/80"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15803D]/40 border border-[#15803D]/70 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
                    <span>24 Hours Round-the-Clock Service</span>
                  </div>

                  <h2 className="font-title text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-white drop-shadow-md">
                    क्या आप रास्ते में हैं या कमरा बुक करना चाहते हैं?
                  </h2>

                  <p className="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto leading-relaxed">
                    चाहे आप भोजन के लिए रुक रहे हों या रात को ठहरने के लिए एसी रूम की आवश्यकता हो, हमारे फ्रंट डेस्क पर तुरंत संपर्क करें।
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="tel:+919509000904"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-md transition-all shadow-lg active:scale-95"
                    >
                      <Phone className="w-4 h-4" />
                      <span>सीधे कॉल करें: +91-9509000904</span>
                    </a>

                    <a
                      href="https://wa.me/919509000904"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-black/60 hover:bg-black/80 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-md transition-colors border border-white/20 backdrop-blur-md shadow-md"
                    >
                      <MessageSquare className="w-4 h-4 text-[#22C55E]" />
                      <span>WhatsApp पर संपर्क करें</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </section>

        </main>
      )}

      {/* ========================================================
          TAB 2: ABOUT US VIEW
         ======================================================== */}
      {currentTab === 'about' && (
        <main className="animate-fadeIn py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center space-y-3">
              <span className="text-xs font-bold tracking-widest text-[#15803D] uppercase">
                Marwari Hospitality Legacy
              </span>
              <h1 className="font-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A]">
                होटल महादेव
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
                सिणधरी, बाड़मेर (राजस्थान) में शुद्धता, आतिथ्य और सुरक्षित हाईवे विश्राम का विश्वसनीय प्रतीक।
              </p>
            </div>

            {/* HIGH-QUALITY RESPONSIVE IMAGE CAROUSEL WITH FADE-IN TRANSITION */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm space-y-4 p-4 sm:p-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#15803D]"></span>
                    <span className="text-xs font-bold text-[#15803D] uppercase tracking-wider">
                      होटल दर्शन · Interactive Photo Showcase
                    </span>
                  </div>
                  <h3 className="font-title text-xl sm:text-2xl font-bold text-[#0F172A] mt-0.5">
                    परिसर, एसी कमरे, फैमिली हॉल एवं व्यंजन
                  </h3>
                </div>
                
                {/* Carousel Counter and Navigation Arrows */}
                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                  <span className="text-xs font-mono font-bold text-slate-600 bg-[#F4F9F5] px-3 py-1 rounded-full border border-slate-200">
                    0{carouselIndex + 1} / 0{ABOUT_CAROUSEL_SLIDES.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrevSlide}
                      aria-label="Previous Slide"
                      className="w-9 h-9 rounded-full bg-[#F4F9F5] hover:bg-[#15803D] text-[#0F172A] hover:text-white border border-slate-300 flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      aria-label="Next Slide"
                      className="w-9 h-9 rounded-full bg-[#F4F9F5] hover:bg-[#15803D] text-[#0F172A] hover:text-white border border-slate-300 flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Carousel Display Frame */}
              <div className="relative aspect-[16/10] sm:aspect-[16/8] md:aspect-[21/9] rounded-xl overflow-hidden bg-slate-900 shadow-inner group">
                
                {/* Active Slide Image with subtle fade-in transition on click */}
                <img
                  src={ABOUT_CAROUSEL_SLIDES[carouselIndex].image}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== hotelBuildingImg) {
                      target.src = hotelBuildingImg;
                    }
                  }}
                  alt={ABOUT_CAROUSEL_SLIDES[carouselIndex].titleEn}
                  className={`w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
                    isCarouselFading ? 'opacity-0' : 'opacity-100'
                  }`}
                />

                {/* Measured Contrast Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent pointer-events-none"></div>

                {/* Floating Quick Navigation Arrows */}
                <button
                  onClick={handlePrevSlide}
                  aria-label="Previous Slide"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-[#15803D] text-white flex items-center justify-center backdrop-blur-xs transition-all border border-white/20 opacity-80 group-hover:opacity-100 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextSlide}
                  aria-label="Next Slide"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-[#15803D] text-white flex items-center justify-center backdrop-blur-xs transition-all border border-white/20 opacity-80 group-hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Slide Caption Overlay */}
                <div className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white space-y-2 transition-opacity duration-300 ${
                  isCarouselFading ? 'opacity-0' : 'opacity-100'
                }`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#15803D] text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
                      {ABOUT_CAROUSEL_SLIDES[carouselIndex].badge}
                    </span>
                    <span className="text-xs text-slate-300 font-medium">
                      {ABOUT_CAROUSEL_SLIDES[carouselIndex].category}
                    </span>
                  </div>

                  <h4 className="font-title text-lg sm:text-2xl font-bold leading-tight drop-shadow-sm">
                    {ABOUT_CAROUSEL_SLIDES[carouselIndex].title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {ABOUT_CAROUSEL_SLIDES[carouselIndex].description}
                  </p>
                </div>
              </div>

              {/* Bottom Thumbnail Strip (Responsive 4-column quick selector) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                {ABOUT_CAROUSEL_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => changeCarouselSlide(idx)}
                    className={`text-left p-2 rounded-lg border transition-all flex items-center gap-2.5 cursor-pointer ${
                      carouselIndex === idx
                        ? 'border-[#15803D] bg-emerald-50 ring-2 ring-[#15803D]/30'
                        : 'border-slate-200 bg-[#F4F9F5] hover:bg-slate-100'
                    }`}
                  >
                    <div className="w-12 h-10 rounded overflow-hidden shrink-0 bg-slate-200">
                      <img
                        src={slide.image}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== hotelBuildingImg) {
                            target.src = hotelBuildingImg;
                          }
                        }}
                        alt={slide.category}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className={`text-[10px] font-bold block uppercase tracking-wider truncate ${
                        carouselIndex === idx ? 'text-[#15803D]' : 'text-slate-500'
                      }`}>
                        0{idx + 1}. {slide.category}
                      </span>
                      <span className="text-[11px] font-semibold text-[#0F172A] block truncate">
                        {slide.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

            </div>

            {/* Content Story Card */}
            <div className="bg-white p-8 sm:p-12 rounded-xl border border-slate-200 shadow-xs space-y-8">
              
              <div className="space-y-4">
                <h2 className="font-title text-2xl font-bold text-[#0F172A]">
                  हमारी यात्रा व समर्पण
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  <strong>होटल महादेव</strong> की स्थापना सिणधरी क्षेत्र में हाईवे मुसाफिरों और परिवारों को एक ऐसा सुरक्षित और स्वच्छ माहौल देने के उद्देश्य से की गई, जहाँ वे घर जैसा सात्विक भोजन कर सकें और सुरक्षित विश्राम पा सकें।
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  बाड़मेर से सांचोर जाने वाला राज्य राजमार्ग 28 (RJ SH 28) एक व्यस्ततम मार्ग है। यहाँ दिन-रात गुजरने वाले वाहनों, तीर्थयात्रियों और स्थानीय नागरिकों के लिए हमने 24 घंटे निरंतर सेवाएं उपलब्ध कराई हैं।
                </p>
              </div>

              {/* 4 Pillars of Trust */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div className="p-5 bg-[#F4F9F5] rounded-lg border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#0F172A]">
                    <ShieldCheck className="w-5 h-5 text-[#15803D]" />
                    <span>100% शुद्ध शाकाहारी रसोई</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    हम केवल ताज़ा सब्जियां, शुद्ध देसी घी और उच्च गुणवत्ता वाले मसालों का उपयोग करते हैं। मांसाहार या अंडे का कोई स्थान नहीं।
                  </p>
                </div>

                <div className="p-5 bg-[#F4F9F5] rounded-lg border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#0F172A]">
                    <UtensilsCrossed className="w-5 h-5 text-[#15803D]" />
                    <span>वातानुकूलित (AC) फैमिली हॉल</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    परिवार के साथ सफर कर रही महिलाओं, बच्चों और बुजुर्गों के लिए पूरी तरह अलग, स्वच्छ और वातानुकूलित डाइनिंग हॉल।
                  </p>
                </div>

                <div className="p-5 bg-[#F4F9F5] rounded-lg border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#0F172A]">
                    <BedDouble className="w-5 h-5 text-[#15803D]" />
                    <span>डीलक्स वातानुकूलित गेस्ट रूम्स</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    आधुनिक स्प्लिट एसी, 24 घंटे गर्म-ठंडा पानी, बैकअप जनरेटर और साफ-सुथरे बेड के साथ सुरक्षित रात्रि विश्राम।
                  </p>
                </div>

                <div className="p-5 bg-[#F4F9F5] rounded-lg border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#0F172A]">
                    <Car className="w-5 h-5 text-[#15803D]" />
                    <span>विशाल व सुरक्षित हाईवे पार्किंग</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    बसों, गाड़ियों और ट्रकों के लिए हाईवे से सीधे जुड़ा सुरक्षित, खुला पार्किंग क्षेत्र जहाँ 24 घंटे सुरक्षा उपलब्ध है।
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => navigateToTab('services')}
                  className="px-6 py-3 bg-[#15803D] text-white text-xs font-bold uppercase rounded-md hover:bg-[#166534] transition-colors"
                >
                  हमारे व्यंजन व रूम्स देखें
                </button>
                <a
                  href="tel:+919509000904"
                  className="px-6 py-3 bg-[#0F172A] text-white text-xs font-bold uppercase rounded-md hover:bg-[#1E293B] transition-colors"
                >
                  कॉल करें: +91-9509000904
                </a>
              </div>

            </div>

            {/* ========================================================
                TRAVELER FAQ ACCORDION SECTION (ABOUT US VIEW)
               ======================================================== */}
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs space-y-8">
              
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#15803D] text-xs font-bold border border-emerald-200">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>यात्रियों के सामान्य सवाल (Traveler FAQs)</span>
                </div>
                <h2 className="font-title text-2xl sm:text-3xl font-bold text-[#0F172A]">
                  अक्सर पूछे जाने वाले प्रश्न व नीतियां
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  चेक-इन समय, बड़ी टूरिस्ट बसों की पार्किंग और ग्रुप डाइनिंग प्री-ऑर्डर से जुड़े महत्वपूर्ण उत्तर।
                </p>
              </div>

              {/* Accordion List */}
              <div className="space-y-3.5 max-w-4xl mx-auto">
                {TRAVELER_FAQS.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                        isOpen
                          ? 'border-[#15803D]/60 bg-white shadow-sm ring-1 ring-[#15803D]/20'
                          : 'border-slate-200 bg-[#F4F9F5]/70 hover:bg-[#F4F9F5]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full p-4 sm:p-5 flex items-start justify-between gap-4 text-left cursor-pointer transition-colors"
                        aria-expanded={isOpen}
                      >
                        <div className="space-y-1.5 min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${faq.badgeColor}`}>
                              {faq.badge}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium">
                              {faq.questionEn}
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-bold text-[#0F172A] leading-snug">
                            {faq.question}
                          </h3>
                        </div>

                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen ? 'bg-[#15803D] text-white rotate-180' : 'bg-slate-200/70 text-slate-600'
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-100 animate-fadeIn">
                          <div className="p-3.5 bg-slate-50/80 rounded-lg border border-slate-200/60 mt-2">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick Help Contact Banner */}
              <div className="p-5 sm:p-6 bg-[#0F172A] text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-title text-base sm:text-lg font-bold flex items-center justify-center sm:justify-start gap-2">
                    <span>क्या आपका कोई अन्य सवाल है?</span>
                  </h4>
                  <p className="text-xs text-slate-300">
                    हमारी 24 घंटे की रिसेप्शन टीम आपके सभी सवालों के जवाब और ग्रुप बुकिंग के लिए तुरंत तैयार है।
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href="tel:+919509000904"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase rounded-lg transition-colors shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>कॉल: 9509000904</span>
                  </a>

                  <a
                    href="https://wa.me/919509000904?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87%2C%20%E0%A4%B9%E0%A5%8B%E0%A4%9F%E0%A4%B2%20%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%A6%E0%A5%87%E0%A4%B5%20%E0%A4%B8%E0%A4%BF%E0%A4%A3%E0%A4%A7%E0%A4%B0%E0%A5%80%20%E0%A4%AE%E0%A5%87%E0%A4%82%20%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A5%81%E0%A4%AA%20%E0%A4%AC%E0%A5%81%E0%A4%95%E0%A4%BF%E0%A4%82%E0%A4%97%20%2F%20%E0%A4%B0%E0%A5%82%E0%A4%AE%20%E0%A4%B5%E0%A4%BF%E0%A4%B5%E0%A4%B0%E0%A4%A3%20%E0%A4%9A%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%8F"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase rounded-lg transition-colors border border-white/20"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </main>
      )}

      {/* ========================================================
          TAB 3: PRODUCTS & SERVICES VIEW (MENU + ROOMS DETAILS)
         ======================================================== */}
      {currentTab === 'services' && (
        <main className="animate-fadeIn py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            
            {/* PART A: TOP FOOD MENU (ALL 5 SIGNATURE PRODUCTS - NO PRICES) */}
            <div className="space-y-8">
              
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-xs font-bold tracking-widest text-[#15803D] uppercase">
                  Authentic Rajasthani &amp; Highway Cuisine
                </span>
                <h1 className="font-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A]">
                  हमारे 5 प्रमुख सिग्नेचर व्यंजन
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed">
                  ऑर्डर मिलने के बाद 15-20 मिनट में ताज़ा तैयार किया जाता है। किसी भी डिश की सामग्री और रेसिपी विवरण देखने के लिए नीचे बटन पर क्लिक करें।
                </p>
              </div>

              {/* 5 Signature Dish Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {DISHES_DATA.map((dish) => (
                  <div
                    key={dish.id}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                        <img
                          src={dish.image}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/dal-baati.jpg';
                          }}
                          alt={dish.nameEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span
                          className={`absolute top-3 left-3 px-3 py-1 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs ${
                            dish.badgeColor === 'ruby' ? 'bg-[#DC2626]' : 'bg-[#15803D]'
                          }`}
                        >
                          {dish.badge}
                        </span>
                        <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono rounded">
                          ताज़ा 15-20 मिनट
                        </span>
                      </div>

                      <div className="p-6 space-y-3">
                        <span className="text-[11px] font-bold text-[#15803D] uppercase tracking-wider">
                          {dish.category}
                        </span>
                        <h3 className="font-title text-xl font-bold text-[#0F172A]">
                          {dish.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          {dish.nameEn}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                          {dish.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 space-y-2">
                      <button
                        onClick={() => setSelectedDish(dish)}
                        className="w-full py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>सामग्री और विवरण देखें</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Highway Menu Note (From original real menu board) */}
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 text-center text-xs text-[#15803D] font-bold max-w-xl mx-auto">
                नोट: ऑर्डर देने के बाद 15-20 मिनट का समय लगेगा क्योंकि हमारे यहाँ हर डिश आपके सामने ताज़ा बनाई जाती है।
              </div>

            </div>

            {/* PART B: ROOMS & LODGING FULL DETAILS SECTION */}
            <div className="pt-12 border-t border-slate-200 space-y-10">
              
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-xs font-bold tracking-widest text-[#15803D] uppercase">
                  Hotel Mahadev Sindhari
                </span>
                <h2 className="font-title text-3xl sm:text-4xl font-bold text-[#0F172A]">
                  आरामदायक एसी रूम्स और ठहरने की व्यवस्था
                </h2>
                <p className="text-sm text-slate-600">
                  लंबी ड्राइविंग के बाद सुकून भरी नींद। वोल्टेज स्टेबलाइजर युक्त एसी रूम्स एवं 24 घंटे बैकअप।
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Deluxe Double Room Full Card */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs space-y-6 p-6 sm:p-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="aspect-[16/10] rounded-lg overflow-hidden bg-slate-100">
                      <img
                        src="/images/deluxe-room.jpg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80';
                        }}
                        alt="Deluxe Double AC Room"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#15803D] uppercase">
                          Double Occupancy (2 Guests)
                        </span>
                        <span className="text-xs text-slate-500 font-mono">24x7 Check-in</span>
                      </div>
                      <h3 className="font-title text-2xl font-bold text-[#0F172A]">
                        Deluxe Double AC Room
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        शांत, स्वच्छ वातावरण, सफेद चादरें, आरामदायक गद्दा और रात भर निर्बाध स्प्लिट कूलिंग।
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 bg-[#F4F9F5] p-4 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-2">
                        <Wind className="w-4 h-4 text-[#15803D]" />
                        <span>Split AC with Voltage Stabilizer</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-[#15803D]" />
                        <span>24/7 Running Hot &amp; Cold Water</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-[#15803D]" />
                        <span>High-Speed Free Wi-Fi</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#15803D]" />
                        <span>Power Inverter Backup</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UtensilsCrossed className="w-4 h-4 text-[#15803D]" />
                        <span>24-Hour Pure Veg Room Service</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-[#15803D]" />
                        <span>Direct Sight of Safe Parking</span>
                      </div>
                    </div>
                  </div>

                  {/* Price tag replacement & button */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-slate-500 block">बुकिंग दर:</span>
                      <strong className="text-xs sm:text-sm text-[#0F172A]">
                        कमरे की उपलब्धता और बुकिंग के लिए फोन करें
                      </strong>
                    </div>

                    <a
                      href="tel:+919509000904"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase rounded-md transition-colors shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>रूम उपलब्धता जांचें: 9509000904</span>
                    </a>
                  </div>
                </div>

                {/* Deluxe Family Suite Full Card */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs space-y-6 p-6 sm:p-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="aspect-[16/10] rounded-lg overflow-hidden bg-slate-100">
                      <img
                        src="/images/dining-hall.jpg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
                        }}
                        alt="Deluxe Family AC Suite"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#15803D] uppercase">
                          Family Suite (3 to 5 Guests)
                        </span>
                        <span className="text-xs text-[#DC2626] font-bold">फैमिली पसंदीदा</span>
                      </div>
                      <h3 className="font-title text-2xl font-bold text-[#0F172A]">
                        Deluxe Family AC Suite
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        परिवारों और ग्रुप्स के लिए अतिरिक्त स्पेस, मल्टी-बेड लेआउट और सैनिटाइज्ड प्राइवेट बाथरूम।
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 bg-[#F4F9F5] p-4 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#15803D]" />
                        <span>Spacious Multi-Bed Family Layout</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wind className="w-4 h-4 text-[#15803D]" />
                        <span>High-Capacity Split Air Conditioner</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#15803D]" />
                        <span>Heavy Generator 24/7 Power Support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-[#15803D]" />
                        <span>Cold RO Drinking Water Facility</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                        <span>Sanitized Sparkling Bathrooms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#15803D]" />
                        <span>Instant Front Desk Assistance</span>
                      </div>
                    </div>
                  </div>

                  {/* Price tag replacement & button */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-slate-500 block">बुकिंग दर:</span>
                      <strong className="text-xs sm:text-sm text-[#0F172A]">
                        कमरे की उपलब्धता और बुकिंग के लिए फोन करें
                      </strong>
                    </div>

                    <a
                      href="tel:+919509000904"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase rounded-md transition-colors shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>रूम उपलब्धता जांचें: 9509000904</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </main>
      )}

      {/* ========================================================
          TAB 4: BLOG & HIGHWAY GUIDES TAB (ZERO DATABASE - 100% HARD-CODED & GITHUB-READY)
         ======================================================== */}
      {currentTab === 'blog' && (
        <main className="animate-fadeIn py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Blog Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#15803D] text-xs font-bold border border-emerald-200">
                <BookOpen className="w-3.5 h-3.5" />
                <span>RJ SH 28 Highway Travel &amp; Food Guides</span>
              </div>
              <h1 className="font-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A]">
                सिणधरी हाईवे ट्रैवल ब्लॉग व मार्गदर्शिका
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                बालोतरा-सिणधरी-सांचोर मार्ग पर सुरक्षित रात्रि विश्राम, बड़ी टूरिस्ट बसों की पार्किंग, असली मारवाड़ी दाल बाटी चूरमा और फैमिली स्टे से जुड़ी प्रामाणिक मार्गदर्शिका।
              </p>
            </div>

            {/* 3 Hardcoded Static Blog Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* GITHUB BLOG TEMPLATE: Add new blog cards here by duplicating this block */}
              {BLOG_POSTS_DATA.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
                >
                  <div>
                    {/* Featured Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={post.image}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/dal-baati.jpg';
                        }}
                        alt={post.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className={`absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold rounded-full border shadow-xs ${post.badgeColor}`}>
                        {post.badge}
                      </span>
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono rounded">
                        {post.readTime}
                      </span>
                    </div>

                    {/* Article Content */}
                    <div className="p-6 space-y-3.5">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#15803D]" />
                          <span>{post.publishDate}</span>
                        </span>
                        <span>•</span>
                        <span>{post.author}</span>
                      </div>

                      <h2 className="font-title text-xl font-bold text-[#0F172A] leading-snug group-hover:text-[#15803D] transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-xs text-slate-500 font-medium italic">
                        {post.titleEn}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                        {post.summary}
                      </p>

                      {/* Key Highlights preview */}
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">
                          प्रमुख बिंदु:
                        </span>
                        <ul className="text-xs text-slate-600 space-y-1">
                          {post.keyTakeaways.slice(0, 2).map((point, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] shrink-0"></span>
                              <span className="truncate">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div className="p-6 pt-0 border-t border-slate-100 mt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedBlogPost(post)}
                      className="w-full py-3 px-4 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>पूरा लेख पढ़ें (Read Full Guide)</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Informational Callout / SEO Summary Card */}
            <div className="bg-[#0F172A] text-white p-8 sm:p-12 rounded-2xl shadow-xl space-y-6 text-center max-w-4xl mx-auto border border-white/10">
              <span className="inline-block px-3.5 py-1 bg-white/15 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-300">
                24 Hours Open Highway Rest Stop
              </span>

              <h2 className="font-title text-2xl sm:text-3xl font-bold leading-tight">
                हाईवे पर सुरक्षित यात्रा और भोजन के लिए कभी भी संपर्क करें
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                सुभाष कॉलेज के ठीक सामने, सिणधरी चौराहे से 800 मीटर। चाहे आप टूरिस्ट बस के साथ हों, फैमिली कार में हों या व्यावसायिक यात्रा पर — होटल महादेव 24 घंटे आपका स्वागत करता है।
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+919509000904"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>सीधे कॉल करें: +91-9509000904</span>
                </a>

                <a
                  href="https://maps.app.goo.gl/CDvWvvnhVHjADnGS6"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#0F172A] hover:bg-slate-100 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-md"
                >
                  <Navigation className="w-4 h-4 text-[#15803D]" />
                  <span>Google Maps पर रास्ता देखें</span>
                </a>
              </div>
            </div>

          </div>
        </main>
      )}

      {/* ========================================================
          TAB 5: CONTACT US VIEW (MAPS + HOTLINES + FORM)
         ======================================================== */}
      {currentTab === 'contact' && (
        <main className="animate-fadeIn py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center space-y-3">
              <span className="text-xs font-bold tracking-widest text-[#15803D] uppercase">
                Location &amp; Inquiries
              </span>
              <h1 className="font-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A]">
                संपर्क एवं लोकेशन (Contact Us)
              </h1>
              <p className="text-sm text-slate-600 max-w-2xl mx-auto">
                RJ SH 28 (सांचोर रोड), सुभाष कॉलेज के ठीक सामने, सिणधरी चौराहे से 800 मीटर, सिणधरी, बाड़मेर।
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left: Google Maps Iframe */}
              <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs space-y-4">
                <div className="p-4 bg-[#0F172A] text-white flex items-center justify-between text-xs">
                  <span className="font-bold flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#22C55E]" />
                    Live Google Maps Location
                  </span>
                  <a
                    href="https://maps.app.goo.gl/CDvWvvnhVHjADnGS6"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Open Map App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="w-full aspect-[4/3] sm:aspect-[16/10]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23983.833767468932!2d71.9008134074489!3d25.54815189522371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39447710a80af5e3%3A0x61874aee168a805b!2z4KS54KWL4KSf4KSyIOCkruCkueCkvuCkpuClh-CktSDgpI_gpILgpKEg4KSw4KWC4KSu4KWN4KS4!5e0!3m2!1shi!2sin!4v1790834990528!5m2!1shi!2sin"
                    className="w-full h-full border-0"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Hotel Mahadev Sindhari Google Map"
                  ></iframe>
                </div>

                <div className="p-4 pt-0 text-xs text-slate-600">
                  <strong>लैंडमार्क:</strong> सिणधरी चौराहे से सांचोर की तरफ केवल 800 मीटर, सुभाष कॉलेज के ठीक सामने।
                </div>
              </div>

              {/* Right: Contact Form & Hotline Box */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Immediate Hotline Card */}
                <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-4 shadow-xs">
                  <h3 className="font-title text-lg font-bold text-[#0F172A]">
                    24/7 फोन हेल्पलाइन
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between pb-2 border-b border-slate-100">
                      <span className="text-slate-500">हेल्पलाइन फोन:</span>
                      <a href="tel:+919509000904" className="font-bold text-[#15803D] hover:underline">
                        +91-9509000904
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">इंस्टाग्राम:</span>
                      <a
                        href="https://www.instagram.com/mahadev_hotel_sindhari/"
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-[#15803D] hover:underline"
                      >
                        @mahadev_hotel_sindhari
                      </a>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/919509000904"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase rounded-md text-center flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp पर संदेश भेजें
                  </a>
                </div>

                {/* Inquiry Form */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="font-title text-lg font-bold text-[#0F172A]">
                    ऑनलाइन पूछताछ फॉर्म
                  </h3>

                  {submitSuccess ? (
                    <div className="py-6 text-center space-y-4">
                      <div className="w-12 h-12 bg-emerald-100 text-[#15803D] rounded-full mx-auto flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <strong className="text-base font-bold text-[#0F172A] block">
                          आपकी WhatsApp पूछताछ तैयार है!
                        </strong>
                        <p className="text-xs text-slate-600 max-w-sm mx-auto">
                          यदि WhatsApp स्वतः नहीं खुला है, तो नीचे दिए गए हरे बटन पर क्लिक करके सीधे संदेश भेजें:
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                        <a
                          href={lastWhatsAppUrl || createWhatsAppUrl()}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase rounded-md shadow-xs transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>WhatsApp चैट खोलें</span>
                        </a>
                        <a
                          href="tel:+919509000904"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0F172A] text-white text-xs font-bold uppercase rounded-md hover:bg-[#1E293B] transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#22C55E]" />
                          <span>कॉल करें: 9509000904</span>
                        </a>
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            setSubmitSuccess(false);
                            setFormData({
                              fullName: '',
                              mobile: '',
                              email: '',
                              inquiryType: 'AC Deluxe Guest Room (कमरा बुकिंग)',
                              guestsCount: '2 Guests',
                              arrivalDate: '',
                              message: ''
                            });
                          }}
                          className="text-xs font-semibold text-slate-500 hover:text-[#0F172A] underline"
                        >
                          दूसरी नई पूछताछ लिखें (New Enquiry)
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] mb-1">
                          आपका नाम (Name) *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="उदा. रमेश कुमार"
                          className={`w-full px-3 py-2 text-xs bg-[#F4F9F5] border ${
                            formErrors.fullName ? 'border-red-500' : 'border-slate-300'
                          } rounded-md focus:outline-none focus:border-[#15803D]`}
                        />
                        {formErrors.fullName && (
                          <span className="text-[11px] text-red-600">{formErrors.fullName}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] mb-1">
                          मोबाइल नंबर (Mobile) *
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="10 अंकों का मोबाइल नंबर"
                          className={`w-full px-3 py-2 text-xs bg-[#F4F9F5] border ${
                            formErrors.mobile ? 'border-red-500' : 'border-slate-300'
                          } rounded-md focus:outline-none focus:border-[#15803D]`}
                        />
                        {formErrors.mobile && (
                          <span className="text-[11px] text-red-600">{formErrors.mobile}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] mb-1">
                          पूछताछ का प्रकार (Inquiry Type)
                        </label>
                        <select
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs bg-[#F4F9F5] border border-slate-300 rounded-md focus:outline-none focus:border-[#15803D]"
                        >
                          <option value="AC Deluxe Guest Room">AC Deluxe Guest Room (कमरा बुकिंग)</option>
                          <option value="AC Family Dining Hall">AC Family Dining Hall (पारिवारिक भोजन)</option>
                          <option value="Dal Baati Thali Order">Dal Baati Churma Thali Order</option>
                          <option value="Tour Bus / Group Package">टूर बस / ग्रुप भोजन पैकेज</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] mb-1">
                          संदेश या विशेष अनुरोध (Message)
                        </label>
                        <textarea
                          name="message"
                          rows={2}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="उदा. हम शाम 7 बजे पहुंचेंगे, 4 लोगों का भोजन..."
                          className="w-full px-3 py-2 text-xs bg-[#F4F9F5] border border-slate-300 rounded-md focus:outline-none focus:border-[#15803D] resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-bold uppercase rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs"
                      >
                        <MessageSquare className="w-4 h-4 text-white" />
                        <span>{isSubmitting ? 'व्हाट्सएप खुल रहा है...' : 'सीधे WhatsApp पर पूछताछ भेजें'}</span>
                      </button>
                    </form>
                  )}

                  <div className="pt-2 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#15803D]" />
                    <span>पूछताछ सीधे हमारे WhatsApp नंबर +91-9509000904 पर भेजी जाएगी</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </main>
      )}

      {/* ========================================================
          PRODUCT DETAIL SUB-MODAL / POPUP
         ======================================================== */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scaleUp">
            
            {/* Modal Header */}
            <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
              <img
                src={selectedDish.image}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/dal-baati.jpg';
                }}
                alt={selectedDish.nameEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-3 right-3 w-9 h-9 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Close dish details modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span
                  className={`inline-block px-3 py-1 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs ${
                    selectedDish.badgeColor === 'ruby' ? 'bg-[#DC2626]' : 'bg-[#15803D]'
                  }`}
                >
                  {selectedDish.badge}
                </span>
                <h3 className="font-title text-2xl font-bold leading-tight">
                  {selectedDish.name}
                </h3>
                <span className="text-xs text-slate-300 block">{selectedDish.nameEn}</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Preparation Guarantee Note */}
              <div className="p-3.5 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between text-xs">
                <span className="font-bold text-[#15803D]">
                  ताज़ा बनाने की गारंटी:
                </span>
                <span className="text-slate-700 font-semibold">
                  ऑर्डर देने के बाद 15-20 मिनट में तैयार
                </span>
              </div>

              {/* Ingredients List */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-[#0F172A] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#15803D]" />
                  <span>मुख्य सामग्री (Ingredients List):</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {selectedDish.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-center gap-2 p-2 bg-[#F4F9F5] rounded border border-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]"></span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cooking style & notes */}
              <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <strong className="text-[#0F172A] block font-bold">पकाने की विधि व विशेषता:</strong>
                <p className="leading-relaxed">{selectedDish.cookingStyle}</p>
                <p className="font-medium text-[#15803D] pt-1">{selectedDish.specialNote}</p>
              </div>

              {/* Action Buttons (NO PRICES SHOWN) */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="tel:+919509000904"
                  className="w-full sm:flex-1 py-3.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase tracking-wider rounded-md text-center transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>यह डिश ऑर्डर करने के लिए कॉल करें (+91-9509000904)</span>
                </a>

                <a
                  href={createWhatsAppUrl(selectedDish.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold uppercase rounded-md text-center transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#22C55E]" />
                  <span>WhatsApp ऑर्डर</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          FULL BLOG POST READER MODAL / EXPANDABLE VIEW
         ======================================================== */}
      {selectedBlogPost && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scaleUp">
            
            {/* Modal Header Image */}
            <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
              <img
                src={selectedBlogPost.image}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/dal-baati.jpg';
                }}
                alt={selectedBlogPost.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent"></div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedBlogPost(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close article modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Article Badge & Category */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full border ${selectedBlogPost.badgeColor}`}>
                    {selectedBlogPost.badge}
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    {selectedBlogPost.readTime}
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    • {selectedBlogPost.publishDate}
                  </span>
                </div>
                <h2 className="font-title text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-white drop-shadow-sm">
                  {selectedBlogPost.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Author & Entity info */}
              <div className="flex items-center justify-between p-3.5 bg-[#F4F9F5] rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#15803D] text-white flex items-center justify-center font-bold text-xs">
                    M
                  </div>
                  <div>
                    <span className="font-bold text-[#0F172A] block">{selectedBlogPost.author}</span>
                    <span className="text-slate-500 text-[11px]">होटल महादेव, सिणधरी</span>
                  </div>
                </div>
                <span className="text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  सत्यापित हाईवे गाइड
                </span>
              </div>

              {/* In-depth Paragraphs */}
              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                {selectedBlogPost.paragraphs.map((para, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Key Takeaways */}
              <div className="p-5 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-3">
                <h4 className="font-bold text-sm text-[#0F172A] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                  <span>मुख्य बिंदु व यात्रा सुझाव (Key Takeaways):</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                  {selectedBlogPost.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] shrink-0 mt-2"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Booking / Inquiry Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="tel:+919509000904"
                  className="w-full sm:flex-1 py-3.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase tracking-wider rounded-xl text-center transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>सीधे कॉल करें (+91-9509000904)</span>
                </a>

                <a
                  href="https://maps.app.goo.gl/CDvWvvnhVHjADnGS6"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded-xl text-center transition-colors flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span>Google Maps पर लोकेशन</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          GEMINI AI GOOGLE REVIEW ASSISTANT MODAL
         ======================================================== */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 relative space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-[#15803D] text-[11px] font-bold border border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                  <span>Google Review AI Assistant</span>
                </div>
                <h3 className="font-title text-2xl font-bold text-[#0F172A]">
                  होटल महादेव के लिए 5-स्टार रिव्यू तैयार करें
                </h3>
                <p className="text-xs text-slate-500">
                  नीचे अपने अनुभव के विकल्प चुनें — Gemini AI स्वतः एक प्रभावशाली, प्राकृतिक रिव्यू लिख देगा!
                </p>
              </div>

              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close review modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Questions Step Section */}
            <div className="space-y-5 text-left">
              
              {/* Question 1: Services experienced */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0F172A] block uppercase tracking-wider">
                  1. आपको क्या सबसे अच्छा लगा? (सुविधाएं चुनें)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    '100% शुद्ध शाकाहारी भोजन',
                    'वातानुकूलित (AC) फैमिली डाइनिंग',
                    'डीलक्स एसी रूम्स व साफ बिस्तर',
                    'सुरक्षित व विशाल हाईवे पार्किंग',
                    '24 घंटे तुरंत सेवा व विनम्र स्टाफ',
                    'साफ वॉशरूम व ठंडा आरओ जल'
                  ].map((service) => {
                    const isSelected = selectedReviewServices.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => toggleReviewService(service)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#15803D] text-white border-[#15803D] shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{service}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 2: Dishes tasted */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0F172A] block uppercase tracking-wider">
                  2. आपने कौन-से व्यंजन का आनंद लिया?
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'मारवाड़ी दाल बाटी चूरमा',
                    'स्पेशल पनीर तूफानी',
                    'काठियावाड़ी सेव टमाटर',
                    'शाही काजू करी',
                    'राजस्थानी कढ़ी पकोड़ा',
                    'मसाला छाछ व कुल्हड़ चाय'
                  ].map((dish) => {
                    const isSelected = selectedReviewDishes.includes(dish);
                    return (
                      <button
                        type="button"
                        key={dish}
                        onClick={() => toggleReviewDish(dish)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{dish}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 3: Star Rating & Language Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Rating Choice */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0F172A] block uppercase tracking-wider">
                    3. आपकी स्टार रेटिंग
                  </label>
                  <div className="flex items-center gap-2 p-2 bg-[#F4F9F5] rounded-lg border border-slate-200">
                    {[5, 4].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className={`flex-1 py-1.5 px-3 rounded-md text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                          reviewRating === star
                            ? 'bg-amber-400 text-[#0F172A] shadow-xs'
                            : 'bg-white text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{star} Stars</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language Choice */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0F172A] block uppercase tracking-wider">
                    4. रिव्यू की भाषा
                  </label>
                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
                    {[
                      { id: 'Hindi', label: 'हिंदी' },
                      { id: 'Rajasthani', label: 'मारवाड़ी' },
                      { id: 'English', label: 'English' }
                    ].map((lang) => (
                      <button
                        type="button"
                        key={lang.id}
                        onClick={() => setReviewLanguage(lang.id as any)}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                          reviewLanguage === lang.id
                            ? 'bg-white text-[#15803D] font-bold shadow-xs'
                            : 'text-slate-600 hover:text-[#0F172A]'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Optional custom note */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0F172A] block uppercase tracking-wider">
                  5. कोई विशेष बात या संदेश (वैकल्पिक)
                </label>
                <input
                  type="text"
                  value={customReviewNotes}
                  onChange={(e) => setCustomReviewNotes(e.target.value)}
                  placeholder="उदा. चाय बहुत बढ़िया थी, रात को सुरक्षित लगा..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#15803D]"
                />
              </div>

              {/* Generate Action Button */}
              <button
                type="button"
                onClick={handleGenerateReview}
                disabled={isGeneratingReview}
                className="w-full py-3 px-4 bg-[#15803D] hover:bg-[#166534] disabled:opacity-75 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                {isGeneratingReview ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Gemini AI रिव्यू लिख रहा है...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>✨ AI से बेस्ट रिव्यू तैयार करें (Generate Review)</span>
                  </>
                )}
              </button>

              {/* Generated Review Display Card */}
              {generatedReviewText && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-300/80 rounded-xl space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#15803D] flex items-center gap-1.5">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>आपका तैयार किया गया रिव्यू (Ready to Post):</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleGenerateReview}
                      className="text-[11px] text-slate-500 hover:text-[#15803D] inline-flex items-center gap-1 font-semibold"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>दोबारा बनाएं</span>
                    </button>
                  </div>

                  <textarea
                    rows={4}
                    value={generatedReviewText}
                    onChange={(e) => setGeneratedReviewText(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-[#15803D] text-slate-800 leading-relaxed resize-none shadow-xs font-normal"
                  />

                  {/* Copy & Redirect Buttons */}
                  <div className="space-y-2.5">
                    {/* Primary Button: Direct Google Business Review Dialog */}
                    <a
                      href={GOOGLE_BUSINESS_REVIEW_URL}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => copyReviewToClipboard(generatedReviewText)}
                      className="w-full py-4 px-5 bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-101 cursor-pointer text-center"
                    >
                      <Copy className="w-4 h-4 text-white" />
                      <span>📋 1-क्लिक: रिव्यू कॉपी करें व Google पर पब्लिश करें</span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
                    </a>

                    {/* Secondary Button: Direct Google Maps Profile */}
                    <a
                      href={GOOGLE_MAPS_LISTING_URL}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => copyReviewToClipboard(generatedReviewText)}
                      className="w-full py-2.5 px-4 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-center"
                    >
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Google Maps ऐप में खोलें (होटल महादेव &amp; रूम्स)</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>

                    {/* Detailed Instruction Box */}
                    {reviewCopied ? (
                      <div className="p-3.5 rounded-xl bg-emerald-100/90 border border-emerald-300 text-emerald-950 text-xs space-y-1.5 animate-fadeIn text-left">
                        <div className="font-bold flex items-center gap-1.5 text-[#15803D]">
                          <Check className="w-4 h-4 text-[#15803D]" />
                          <span>रिव्यू क्लिपबोर्ड पर कॉपी हो चुका है! Google खुल गया है:</span>
                        </div>
                        <ol className="list-decimal pl-5 space-y-1 text-slate-700 font-normal">
                          <li>खुले हुए Google पेज पर <strong>5 Stars (⭐⭐⭐⭐⭐)</strong> सेलेक्ट करें।</li>
                          <li>रिव्यू बॉक्स पर उंगली दबाकर (या Ctrl+V) <strong>Paste (चिपकाएं)</strong> करें।</li>
                          <li>ऊपर <strong>Post / Publish</strong> बटन दबाएं!</li>
                        </ol>
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-500 text-center">
                        बटन दबाते ही रिव्यू कॉपी होकर सीधे होटल महादेव की Google Business प्रोफाइल खुल जाएगी।
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Direct fallback link */}
              <div className="text-center pt-2 border-t border-slate-100">
                <a
                  href={GOOGLE_MAPS_LISTING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-500 hover:text-[#15803D] underline inline-flex items-center gap-1"
                >
                  <span>या सीधे Google Maps पर होटल महादेव की प्रोफाइल खोलें</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          FOOTER (CRISP SLATE/WHITE THEME, INSTAGRAM LINK)
         ======================================================== */}
      <footer className="bg-[#0F172A] text-white border-t border-[#15803D]/40 pt-16 pb-24 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            
            {/* Brand column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#15803D] bg-white flex items-center justify-center shrink-0 shadow-xs">
                  <img
                    src={logoImg}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/logo.jpg';
                    }}
                    alt="Hotel Mahadev Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-title text-xl font-bold tracking-tight text-white block">
                    Hotel Mahadev
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                    शुद्ध शाकाहारी फैमिली होटल एवं एसी रूम्स
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                सिणधरी (बाड़मेर) में 24 घंटे निरंतर सेवाएं। शुद्ध शाकाहारी मारवाड़ी व काठियावाड़ी भोजन, वातानुकूलित फैमिली डाइनिंग हॉल एवं सुरक्षित डीलक्स एसी रूम्स।
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#15803D]/20 text-emerald-300 rounded-full border border-[#15803D]/40 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                100% Shuddh Shakahari (Pure Veg)
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                पेज नेविगेशन
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>
                  <button onClick={() => navigateToTab('home')} className="hover:text-white transition-colors">
                    Home (मुख्य पृष्ठ)
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToTab('about')} className="hover:text-white transition-colors">
                    About Us (हमारे बारे में)
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToTab('services')} className="hover:text-white transition-colors">
                    Products &amp; Services
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToTab('contact')} className="hover:text-white transition-colors">
                    Contact Us (संपर्क)
                  </button>
                </li>
              </ul>
            </div>

            {/* Location & Numbers */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                हाईवे लोकेशन व फोन
              </span>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                  <span>RJ SH 28 (सांचोर रोड), सुभाष कॉलेज के सामने, सिणधरी, बाड़मेर - 344033</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <a href="tel:+919509000904" className="hover:text-white font-bold">+91-9509000904</a>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span>खुला: 24 घंटे / 7 दिन (Round the Clock)</span>
                </li>
              </ul>
            </div>

            {/* Instagram Social Connection */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                सोशल मीडिया कनेक्शन
              </span>
              <p className="text-xs text-slate-300">
                हमारे होटल व भोजनालय से जुड़े अपडेट्स के लिए इंस्टाग्राम पर फॉलो करें:
              </p>
              
              <a
                href="https://www.instagram.com/mahadev_hotel_sindhari/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-900/40 via-red-900/40 to-pink-900/40 hover:from-purple-900/60 hover:via-red-900/60 hover:to-pink-900/60 text-white rounded-md border border-white/20 text-xs font-semibold transition-all group"
              >
                <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                <span>@mahadev_hotel_sindhari</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <div className="pt-2">
                <a
                  href="https://maps.app.goo.gl/CDvWvvnhVHjADnGS6"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Star className="w-3.5 h-3.5 fill-emerald-400" />
                  <span>Google Reviews पर 4.5/5 रेटिंग</span>
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div>
              © {new Date().getFullYear()} Hotel Mahadev (Family Hall &amp; Pure Veg AC Rooms). All rights reserved.
            </div>
            <div>
              RJ SH 28 Sindhari (Barmer) · 100% Shuddh Shakahari
            </div>
          </div>

        </div>
      </footer>

      {/* ========================================================
          6. FLOATING MOBILE ACTIONS (PERSISTENT BOTTOM BAR)
         ======================================================== */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0F172A] border-t border-slate-700 px-3 py-2 shadow-2xl flex items-center justify-between gap-2">
        <a
          href="tel:+919509000904"
          className="flex-1 py-2.5 bg-[#15803D] active:bg-[#166534] text-white text-xs font-bold uppercase tracking-wider rounded-md text-center flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call: 9509000904</span>
        </a>

        <a
          href="https://maps.app.goo.gl/CDvWvvnhVHjADnGS6"
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-2.5 bg-white/10 active:bg-white/20 text-white border border-white/20 text-xs font-semibold uppercase tracking-wider rounded-md text-center flex items-center justify-center gap-1.5"
        >
          <Navigation className="w-3.5 h-3.5 text-emerald-400" />
          <span>Navigate</span>
        </a>

        <a
          href="https://maps.app.goo.gl/CDvWvvnhVHjADnGS6"
          target="_blank"
          rel="noreferrer"
          className="py-2.5 px-3 bg-[#DC2626] active:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-md text-center flex items-center justify-center gap-1 shadow-sm"
        >
          <Star className="w-3.5 h-3.5 fill-white" />
          <span>Review</span>
        </a>
      </div>

    </div>
  );
}
