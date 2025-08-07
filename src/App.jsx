import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, User, Search, ArrowLeft, Star, Heart, Gift, Candy,
  X, Plus, Minus, LogIn, LogOut, Home, History, MapPin, CreditCard,
  Package, CheckCircle, ChevronDown, ChevronUp
} from 'lucide-react';

// Ranglar palitrasi
const colors = {
  primary: '#FF6BBD',
  secondary: '#A45CFF',
  accent: '#FFD166',
  background: '#FFF5F9',
  text: '#4A2B3A',
  lightText: '#8C6A7D',
  success: '#4CC9A7',
  warning: '#FF9E5E',
  card: '#FFFFFF',
  shadow: 'rgba(164, 92, 255, 0.2)'
};

const CandyShopApp = () => {
  // Sahifa va navbar state
  const [currentPage, setCurrentPage] = useState('home');
  const [activeTab, setActiveTab] = useState('home');
  useEffect(() => {
    setCurrentPage(activeTab);
  }, [activeTab]);

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms kechikish

    return () => clearTimeout(timer);
  }, [searchQuery]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showProductDetails, setShowProductDetails] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMethod, setLoginMethod] = useState(null);
  const [registerData, setRegisterData] = useState({
    name: '',
    phone: '',
    password: ''
  });
  const [loginData, setLoginData] = useState({
    phone: '',
    password: ''
  });
  const searchInputRef = useRef(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('candyShopDark') === 'true');

  // 1. Like tizimi uchun state va localStorage
  const [likedProducts, setLikedProducts] = useState(() => {
    const saved = localStorage.getItem('candyShopLikes');
    return saved ? JSON.parse(saved) : [];
  });
  const [likeAnim, setLikeAnim] = useState(null);

  // Like funksiyasi
  const toggleLike = (product) => {
    setLikedProducts(prev => {
      let updated;
      if (prev.some(p => p.id === product.id)) {
        updated = prev.filter(p => p.id !== product.id);
      } else {
        updated = [...prev, product];
        setLikeAnim(product.id); // animatsiya uchun
        setTimeout(() => setLikeAnim(null), 800);
      }
      localStorage.setItem('candyShopLikes', JSON.stringify(updated));
      return updated;
    });
  };

  // Dark mode localStorage va <html> class bilan boshqariladi
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('candyShopDark', darkMode ? 'true' : 'false');
  }, [darkMode]);

  // Mahalliy saqlashdan ma'lumotlarni o'qish
  useEffect(() => {
    const savedCart = localStorage.getItem('candyShopCart');
    const savedUser = localStorage.getItem('candyShopUser');
    const savedHistory = localStorage.getItem('candyShopHistory');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedHistory) setOrderHistory(JSON.parse(savedHistory));
  }, []);

  // Mahalliy saqlashga yozish
  useEffect(() => {
    localStorage.setItem('candyShopCart', JSON.stringify(cart));
    if (user) localStorage.setItem('candyShopUser', JSON.stringify(user));
    localStorage.setItem('candyShopHistory', JSON.stringify(orderHistory));
  }, [cart, user, orderHistory]);

  // Sample data - yanada boyitilgan
  const categories = [
    { id: 'promotions', name: 'Aksiyalar', icon: '🎁', color: colors.primary },
    { id: 'chocolates', name: 'Shokoladlar', icon: '🍫', color: '#8B5A2B' },
    { id: 'candies', name: 'Konfetlar', icon: '🍬', color: colors.secondary },
    { id: 'lollipops', name: 'Lolipoplar', icon: '🍭', color: '#FF6B6B' },
    { id: 'gummies', name: 'Marmeladlar', icon: '🐻', color: colors.accent },
    { id: 'cookies', name: 'Pechenye', icon: '🍪', color: '#D4A76A' },
    { id: 'cakes', name: 'Tortlar', icon: '🎂', color: '#FF9AA2' },
    { id: 'drinks', name: 'Ichimliklar', icon: '🥤', color: '#6B9AC4' }
  ];

  const promotionalProducts = [
    {
      id: 1,
      name: 'Premium Chocolate Set',
      price: 45000,
      oldPrice: 60000,
      image: '🍫🎁',
      category: 'promotions',
      rating: 4.8,
      description: '3 ta premium shokolad + sovg\'a qadoq',
      isPromo: true,
      details: 'Har xil turdagi 3 ta premium shokoladlar to\'plami. Har biri Belgiya kakao donalaridan tayyorlangan. Muzqaymoq qadoqda yetkazib beriladi.',
      ingredients: 'Kakao massasi, shakar, kakao yog\'i, sut kukuni, lesitin, vanilin',
      weight: '300g'
    },
    {
      id: 2,
      name: 'Candy Mix Box',
      price: 35000,
      oldPrice: 50000,
      image: '🍬📦',
      category: 'promotions',
      rating: 4.6,
      description: 'Turli xil konfetlardan iborat to\'plam',
      isPromo: true,
      details: '25 xil turdagi shirinliklar to\'plami. Har birida meva, yong\'oq va shokoladli konfetlar mavjud. Ajoyib sovg\'a varianti.',
      ingredients: 'Shakar, glikoz shirasi, meva ekstraktlari, yong\'oqlar, kakao',
      weight: '500g'
    }
  ];

  const products = [
    // Chocolates
    { 
      id: 3, 
      name: 'Milk Chocolate Bar', 
      price: 15000, 
      image: '🍫', 
      category: 'chocolates', 
      rating: 4.5,
      details: 'Sutli shokolad 70% kakao bilan. Yumshoq tekstura va nozik ta\'m.',
      ingredients: 'Kakao massasi, shakar, sut kukuni, kakao yog\'i, lesitin',
      weight: '100g'
    },
    { 
      id: 4, 
      name: 'Dark Chocolate Premium', 
      price: 18000, 
      image: '🍫', 
      category: 'chocolates', 
      rating: 4.7,
      details: '85% kakao bilan qora shokolad. Kuchli va boy ta\'m.',
      ingredients: 'Kakao massasi, shakar, kakao yog\'i, vanilin',
      weight: '100g'
    },
    { 
      id: 5, 
      name: 'White Chocolate Delight', 
      price: 16000, 
      image: '🤍🍫', 
      category: 'chocolates', 
      rating: 4.4,
      details: 'Oq shokolad vanil va karamel notalari bilan.',
      ingredients: 'Kakao yog\'i, shakar, sut kukuni, vanilin',
      weight: '100g'
    },
    
    // Candies
    { 
      id: 6, 
      name: 'Fruit Candies Mix', 
      price: 12000, 
      image: '🍬', 
      category: 'candies', 
      rating: 4.3,
      details: '6 xil meva ta\'mlari bilan konfetlar to\'plami.',
      ingredients: 'Shakar, glikoz shirasi, meva ekstraktlari, oziq-ruzgori bo\'yoqlari',
      weight: '200g'
    },
    { 
      id: 7, 
      name: 'Caramel Candies', 
      price: 14000, 
      image: '🍯🍬', 
      category: 'candies', 
      rating: 4.6,
      details: 'Klasik tuzli karamel konfetlari.',
      ingredients: 'Shakar, sut, glyukoz shirasi, tuz',
      weight: '180g'
    },
    { 
      id: 8, 
      name: 'Mint Fresh Candies', 
      price: 11000, 
      image: '🌿🍬', 
      category: 'candies', 
      rating: 4.2,
      details: 'Yangi nafas uchun naneli konfetlar.',
      ingredients: 'Shakar, glyukoz shirasi, nana ekstrakti, mentol',
      weight: '150g'
    },
    
    // Lollipops
    { 
      id: 9, 
      name: 'Rainbow Lollipops', 
      price: 8000, 
      image: '🍭', 
      category: 'lollipops', 
      rating: 4.5,
      details: 'Rang-barang lolipoplar bolalar uchun.',
      ingredients: 'Shakar, glyukoz shirasi, oziq-ruzgori bo\'yoqlari',
      weight: '50g'
    },
    { 
      id: 10, 
      name: 'Cherry Lollipop', 
      price: 7000, 
      image: '🍒🍭', 
      category: 'lollipops', 
      rating: 4.4,
      details: 'Tabiiy olcha ekstrakti bilan lolipop.',
      ingredients: 'Shakar, glyukoz shirasi, olcha ekstrakti',
      weight: '40g'
    },
    
    // Gummies
    { 
      id: 11, 
      name: 'Gummy Bears', 
      price: 13000, 
      image: '🐻', 
      category: 'gummies', 
      rating: 4.6,
      details: '5 xil meva ta\'mlari bilan marmelad ayiqlar.',
      ingredients: 'Shakar, gelatin, meva ekstraktlari, limon kislotasi',
      weight: '200g'
    },
    { 
      id: 12, 
      name: 'Sour Gummies', 
      price: 15000, 
      image: '😋🐻', 
      category: 'gummies', 
      rating: 4.3,
      details: 'Nordon ta\'mli marmelad konfetlari.',
      ingredients: 'Shakar, gelatin, limon kislotasi, meva ekstraktlari',
      weight: '200g'
    },
    
    // Cookies
    { 
      id: 13, 
      name: 'Chocolate Chip Cookies', 
      price: 20000, 
      image: '🍪', 
      category: 'cookies', 
      rating: 4.7,
      details: 'Klasik shokolad bo\'laklari bilan pechene.',
      ingredients: 'Un, shakar, shokolad bo\'laklari, tuxum, sariyog\'',
      weight: '250g'
    },
    { 
      id: 14, 
      name: 'Oatmeal Cookies', 
      price: 18000, 
      image: '🌾🍪', 
      category: 'cookies', 
      rating: 4.5,
      details: 'Sog\'lom jo\'xori pechenelari quritilgan mevalar bilan.',
      ingredients: 'Jo\'xori, shakar, quritilgan mevalar, yong\'oqlar',
      weight: '250g'
    },
    
    // Cakes
    { 
      id: 15, 
      name: 'Mini Cupcakes (6pc)', 
      price: 25000, 
      image: '🧁', 
      category: 'cakes', 
      rating: 4.8,
      details: '6 ta xil ta\'mdagi minik kekslar.',
      ingredients: 'Un, shakar, tuxum, sariyog\', shokolad, mevalar',
      weight: '300g'
    },
    { 
      id: 16, 
      name: 'Chocolate Cake Slice', 
      price: 22000, 
      image: '🎂', 
      category: 'cakes', 
      rating: 4.6,
      details: 'Mo\'tadil shirinlikdagi shokoladli tort bo\'lagi.',
      ingredients: 'Un, shakar, kakao, tuxum, sariyog\', qaymoq',
      weight: '200g'
    },
    
    // Drinks
    { 
      id: 17, 
      name: 'Hot Chocolate', 
      price: 12000, 
      image: '☕', 
      category: 'drinks', 
      rating: 4.5,
      details: 'Issiq shokolad qaymoq va marshmallow bilan.',
      ingredients: 'Sut, shokolad, qaymoq, marshmallow',
      volume: '250ml'
    },
    { 
      id: 18, 
      name: 'Milkshake Vanilla', 
      price: 15000, 
      image: '🥤', 
      category: 'drinks', 
      rating: 4.4,
      details: 'Tabiiy vanil bilan sut kokteyli.',
      ingredients: 'Sut, muzqaymoq, vanilin, shakar',
      volume: '300ml'
    }
  ];

  const allProducts = [...promotionalProducts, ...products];

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Animatsiya uchun
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
      cartBtn.classList.add('animate-bounce');
      setTimeout(() => cartBtn.classList.remove('animate-bounce'), 1000);
    }
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getFilteredProducts = (query = '') => {
    let filtered = selectedCategory === 'all' ? allProducts :
                   selectedCategory === 'promotions' ? promotionalProducts :
                   products.filter(p => p.category === selectedCategory);
    if (query) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
      );
    }
    return filtered;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  const handleCheckout = () => {
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cart,
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 15000,
      status: 'Yetkazilmoqda'
    };
    
    setOrderHistory(prev => [newOrder, ...prev]);
    setCart([]);
    alert(`Buyurtma #${newOrder.id} muvaffaqiyatli berildi! 🎉`);
    setCurrentPage('home');
  };

  const handleTelegramLogin = () => {
    // Telegram WebApp integratsiyasi
    if (window.Telegram && window.Telegram.WebApp) {
      const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
      if (tgUser) {
        setUser({
          name: `${tgUser.first_name} ${tgUser.last_name || ''}`.trim(),
          phone: '+998XXXXXXXXX',
          telegramId: tgUser.id
        });
        setShowLoginModal(false);
        return;
      }
    }
    
    // Agar Telegram WebApp bo'lmasa, demo foydalanuvchi
    setUser({
      name: 'Telegram Foydalanuvchi',
      phone: '+998901234567',
      telegramId: '123456789'
    });
    setShowLoginModal(false);
  };

  // Foydalanuvchilar ro'yxati (localStorage orqali)
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('candyShopUsers');
    return saved ? JSON.parse(saved) : [];
  });

  // Register funksiyasi
  const handleRegister = () => {
    if (
      !registerData.name ||
      !registerData.phone.match(/^\+998\d{9}$/) ||
      registerData.password.length < 6
    ) {
      alert("To‘g‘ri ism, telefon va parol kiriting!");
      return;
    }
    // Telefon raqami unikal bo‘lishi kerak
    if (users.some(u => u.phone === registerData.phone)) {
      alert("Bu telefon raqami bilan foydalanuvchi mavjud!");
      return;
    }
    const newUser = {
      name: registerData.name,
      phone: registerData.phone,
      password: registerData.password
    };
    setUsers(prev => {
      const updated = [...prev, newUser];
      localStorage.setItem('candyShopUsers', JSON.stringify(updated));
      return updated;
    });
    setUser(newUser);
    setShowLoginModal(false);
    setRegisterData({ name: '', phone: '', password: '' });
  };

  // Login funksiyasi
  const handleLogin = () => {
    const found = users.find(
      u => u.phone === loginData.phone && u.password === loginData.password
    );
    if (found) {
      setUser(found);
      setShowLoginModal(false);
      setLoginData({ phone: '', password: '' });
    } else {
      alert("Telefon yoki parol noto‘g‘ri!");
    }
  };

  // Qidiruv faqat tugma bosilganda ishlaydi
  const [searchResults, setSearchResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);

  const handleSearch = () => {
    setSearchActive(true);
    setSearchResults(getFilteredProducts(searchQuery));
  };

  // Animatsiya variantlari
  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.3
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const scaleUp = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } }
  };

  const HomePage = () => (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      {/* Header */}
      <div 
        className="p-4 rounded-b-3xl shadow-lg"
        style={{ 
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          boxShadow: `0 4px 20px ${colors.shadow}`
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div 
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
              whileHover={{ rotate: 20 }}
            >
              <Candy className="w-6 h-6" style={{ color: colors.primary }} />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-white">Candy Shop</h1>
              <p className="text-pink-100 text-sm">Premium shirinliklar</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="cart-btn"
              >
                <ShoppingCart 
                  className="w-6 h-6 cursor-pointer text-white" 
                  onClick={() => setCurrentPage('cart')}
                />
              </motion.button>
              {cart.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </motion.span>
              )}
            </div>
            <User 
              className="w-6 h-6 cursor-pointer text-white" 
              onClick={() => setCurrentPage('profile')}
            />
          </motion.div>
        </div>

        {/* Promotional Banner */}
        <motion.div 
          className="bg-white/20 rounded-2xl p-4 mb-4 backdrop-blur-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1 text-white">🎁 AKSIYA!</h3>
              <p className="text-pink-100 text-sm">2 ta mahsulot sotib oling,</p>
              <p className="text-pink-100 text-sm">3-chisini BEPUL oling!</p>
              <div className="flex items-center mt-2">
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold"
                >
                  50% CHEGIRMA
                </motion.span>
              </div>
            </div>
            <motion.div 
              animate={{ 
                rotate: [0, 10, -10, 0],
                transition: { repeat: Infinity, duration: 3 } 
              }}
              className="text-6xl"
            >
              🍭🍬
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Search */}
      <motion.div className="p-4" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
        <div className="relative flex">
          <Search className="absolute left-3 top-3 w-5 h-5" style={{ color: colors.lightText }} />
          <input
            type="text"
            placeholder="Qidiruv..."
            className="w-full bg-white rounded-xl pl-12 pr-4 py-3 border-0 focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-md"
            style={{ color: colors.text }}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="absolute right-2 top-2 bg-pink-500 text-white rounded-lg px-3 py-1 font-bold shadow"
            onClick={handleSearch}
          >
            Qidirish
          </motion.button>
        </div>
      </motion.div>

      {/* Categories */}
      <div className="px-4 mb-6">
        <motion.div 
          className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            whileHover={{ y: -3 }}
            onClick={() => setSelectedCategory('all')}
            className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl min-w-[80px] shadow-md ${
              selectedCategory === 'all' 
                ? 'bg-gradient-to-br from-pink-500 to-purple-500 text-white' 
                : 'bg-white'
            }`}
            style={{ color: selectedCategory === 'all' ? 'white' : colors.text }}
          >
            <div className="text-2xl mb-1">🍯</div>
            <span className="text-xs font-medium">Hammasi</span>
          </motion.button>
          
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              whileHover={{ y: -3 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl min-w-[80px] shadow-md ${
                selectedCategory === category.id 
                  ? 'text-white' 
                  : 'bg-white'
              }`}
              style={{ 
                backgroundColor: selectedCategory === category.id ? category.color : 'white',
                color: selectedCategory === category.id ? 'white' : colors.text
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + (index * 0.05) }}
            >
              <div className="text-2xl mb-1">{category.icon}</div>
              <span className="text-xs font-medium text-center">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Products Grid */}
      <div className="px-4 pb-6">
        {selectedCategory === 'promotions' && (
          <motion.h2 
            className="text-xl font-bold mb-4 flex items-center"
            style={{ color: colors.text }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Gift className="w-6 h-6 mr-2" style={{ color: colors.primary }} />
            Aksiyalar
          </motion.h2>
        )}
        
        <motion.div 
          className="grid grid-cols-2 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1
              }
            }
          }}
        >
          {searchActive ? (
            <motion.div className="grid grid-cols-2 gap-4">
              {searchResults.length === 0 && (
                <div className="col-span-2 text-center text-gray-400 py-12">
                  <span>Mahsulot topilmadi</span>
                </div>
              )}
              {searchResults.map(product => (
                <motion.div
                  key={product.id}
                  variants={scaleUp}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProductDetails(product)}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                  style={{ border: `1px solid ${colors.background}` }}
                >
                  {product.isPromo && (
                    <motion.div 
                      className="bg-red-500 text-white text-xs font-bold px-3 py-1 absolute z-10 rounded-br-lg"
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.1 + (index * 0.05) }}
                    >
                      AKSIYA
                    </motion.div>
                  )}
                  <div className="relative p-4">
                    <motion.div 
                      className="text-5xl mb-3 text-center"
                      animate={{
                        rotate: [0, 5, -5, 0],
                        transition: { delay: index * 0.05 }
                      }}
                    >
                      {product.image}
                    </motion.div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm ml-1" style={{ color: colors.lightText }}>
                          {product.rating}
                        </span>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        animate={likeAnim === product.id ? { scale: [1, 1.5, 1] } : {}}
                        transition={{ duration: 0.5 }}
                        onClick={e => {
                          e.stopPropagation();
                          toggleLike(product);
                        }}
                      >
                        <Heart
                          className={`w-5 h-5 cursor-pointer ${likedProducts.some(p => p.id === product.id) ? 'text-pink-500' : 'text-gray-300 hover:text-red-500'}`}
                          fill={likedProducts.some(p => p.id === product.id) ? 'currentColor' : 'none'}
                        />
                      </motion.button>
                    </div>
                    <h3 className="font-bold mb-2 text-sm leading-tight" style={{ color: colors.text }}>
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-xs mb-2" style={{ color: colors.lightText }}>
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-lg font-bold" style={{ color: colors.primary }}>
                          {formatPrice(product.price)}
                        </span>
                        {product.oldPrice && (
                          <span className="text-xs line-through ml-2" style={{ color: colors.lightText }}>
                            {formatPrice(product.oldPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-full py-2 rounded-xl font-semibold transition-colors"
                      style={{ 
                        background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                        color: 'white'
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Savatga
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            allProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={scaleUp}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowProductDetails(product)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                style={{ border: `1px solid ${colors.background}` }}
              >
                {product.isPromo && (
                  <motion.div 
                    className="bg-red-500 text-white text-xs font-bold px-3 py-1 absolute z-10 rounded-br-lg"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.1 + (index * 0.05) }}
                  >
                    AKSIYA
                  </motion.div>
                )}
                <div className="relative p-4">
                  <motion.div 
                    className="text-5xl mb-3 text-center"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      transition: { delay: index * 0.05 }
                    }}
                  >
                    {product.image}
                  </motion.div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm ml-1" style={{ color: colors.lightText }}>
                        {product.rating}
                      </span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      animate={likeAnim === product.id ? { scale: [1, 1.5, 1] } : {}}
                      transition={{ duration: 0.5 }}
                      onClick={e => {
                        e.stopPropagation();
                        toggleLike(product);
                      }}
                    >
                      <Heart
                        className={`w-5 h-5 cursor-pointer ${likedProducts.some(p => p.id === product.id) ? 'text-pink-500' : 'text-gray-300 hover:text-red-500'}`}
                        fill={likedProducts.some(p => p.id === product.id) ? 'currentColor' : 'none'}
                      />
                    </motion.button>
                  </div>
                  <h3 className="font-bold mb-2 text-sm leading-tight" style={{ color: colors.text }}>
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-xs mb-2" style={{ color: colors.lightText }}>
                      {product.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold" style={{ color: colors.primary }}>
                        {formatPrice(product.price)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-xs line-through ml-2" style={{ color: colors.lightText }}>
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="w-full py-2 rounded-xl font-semibold transition-colors"
                    style={{ 
                      background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                      color: 'white'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Savatga
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );

  const CartPage = () => {
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 15000;

    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen"
        style={{ backgroundColor: colors.background }}
      >
        <div 
          className="bg-white p-4 shadow-sm flex items-center"
          style={{ borderBottom: `1px solid ${colors.background}` }}
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft 
              className="w-6 h-6 cursor-pointer mr-3" 
              onClick={() => setCurrentPage('home')}
              style={{ color: colors.text }}
            />
          </motion.button>
          <h1 className="text-xl font-bold" style={{ color: colors.text }}>Savat</h1>
        </div>

        {cart.length === 0 ? (
          <motion.div 
            className="flex flex-col items-center justify-center h-96"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className="text-6xl mb-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                transition: { repeat: Infinity, duration: 3 } 
              }}
            >
              🛒
            </motion.div>
            <h2 className="text-xl font-bold mb-2" style={{ color: colors.text }}>Savat bo'sh</h2>
            <p className="mb-4" style={{ color: colors.lightText }}>Mahsulotlarni qo'shib boshlang</p>
            <motion.button
              onClick={() => setCurrentPage('home')}
              className="px-6 py-3 rounded-xl font-semibold"
              style={{ 
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                color: 'white'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Xarid qilish
            </motion.button>
          </motion.div>
        ) : (
          <div className="p-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={fadeIn}
                  className="bg-white rounded-xl p-4 mb-4 shadow"
                  style={{ border: `1px solid ${colors.background}` }}
                >
                  <div className="flex items-center">
                    <motion.div 
                      className="text-3xl mr-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.image}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold" style={{ color: colors.text }}>
                        {item.name}
                      </h3>
                      <p className="font-bold" style={{ color: colors.primary }}>
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: colors.background }}
                      >
                        <Minus className="w-4 h-4" style={{ color: colors.text }} />
                      </motion.button>
                      <span className="mx-3 font-semibold" style={{ color: colors.text }}>
                        {item.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ 
                          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                          color: 'white'
                        }}
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs flex items-center"
                      style={{ color: colors.lightText }}
                    >
                      <X className="w-3 h-3 mr-1" />
                      O'chirish
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-4 mt-6 shadow-md"
              style={{ border: `1px solid ${colors.background}` }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium" style={{ color: colors.text }}>Mahsulotlar:</span>
                <span className="font-medium" style={{ color: colors.text }}>
                  {formatPrice(totalAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium" style={{ color: colors.text }}>Yetkazib berish:</span>
                <span className="font-medium" style={{ color: colors.text }}>
                  {formatPrice(deliveryFee)}
                </span>
              </div>
              <hr className="my-3" style={{ borderColor: colors.background }} />
              <div className="flex justify-between items-center font-bold text-lg mb-4">
                <span style={{ color: colors.text }}>Jami:</span>
                <span style={{ color: colors.primary }}>
                  {formatPrice(totalAmount + deliveryFee)}
                </span>
              </div>
              <motion.button
                onClick={() => setCurrentPage('checkout')}
                className="w-full py-4 rounded-xl font-bold text-lg"
                style={{ 
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                  color: 'white'
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                Buyurtma berish
              </motion.button>
            </motion.div>
          </div>
        )}
      </motion.div>
    );
  };

  const ProfilePage = () => (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <div 
        className="bg-white p-4 shadow-sm flex items-center"
        style={{ borderBottom: `1px solid ${colors.background}` }}
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft 
            className="w-6 h-6 cursor-pointer mr-3" 
            onClick={() => setCurrentPage('home')}
            style={{ color: colors.text }}
          />
        </motion.button>
        <h1 className="text-xl font-bold" style={{ color: colors.text }}>Profil</h1>
      </div>

      <div className="p-4">
        {!user ? (
          <motion.div 
            className="bg-white rounded-xl p-6 text-center shadow-md"
            style={{ border: `1px solid ${colors.background}` }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <motion.div 
              className="text-6xl mb-4"
              animate={{ 
                y: [0, -10, 0],
                transition: { repeat: Infinity, duration: 2 } 
              }}
            >
              👤
            </motion.div>
            <h2 className="text-xl font-bold mb-4" style={{ color: colors.text }}>Akkauntga kirish</h2>
            <motion.button
              onClick={() => setShowLoginModal(true)}
              className="w-full py-3 rounded-xl font-semibold mb-3 flex items-center justify-center"
              style={{ 
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                color: 'white'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogIn className="w-5 h-5 mr-2" />
              Kirish
            </motion.button>
            <motion.button 
              onClick={() => {
                setShowLoginModal(true);
                setLoginMethod('register');
              }}
              className="w-full border py-3 rounded-xl font-semibold flex items-center justify-center"
              style={{ 
                borderColor: colors.primary,
                color: colors.primary
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Ro'yxatdan o'tish
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.div 
              variants={fadeIn}
              className="bg-white rounded-xl p-4 mb-4 shadow-md"
              style={{ border: `1px solid ${colors.background}` }}
            >
              <div className="flex items-center mb-4">
                <motion.div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4"
                  style={{ backgroundColor: colors.primary }}
                  whileHover={{ rotate: 10 }}
                >
                  {user.name.charAt(0)}
                </motion.div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: colors.text }}>
                    {user.name}
                  </h3>
                  <p style={{ color: colors.lightText }}>{user.phone}</p>
                </div>
              </div>
              <motion.button
                onClick={handleLogout}
                className="w-full py-2 rounded-lg flex items-center justify-center"
                style={{ 
                  backgroundColor: colors.background,
                  color: colors.primary
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Chiqish
              </motion.button>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="bg-white rounded-xl shadow-md"
              style={{ border: `1px solid ${colors.background}` }}
            >
              {[
                { title: 'Shaxsiy ma\'lumotlar', icon: <User className="w-5 h-5 mr-3" />, page: 'profile' },
                { title: 'Buyurtmalar tarixi', icon: <History className="w-5 h-5 mr-3" />, page: 'history' },
                { title: 'Mening manzillarim', icon: <MapPin className="w-5 h-5 mr-3" /> },
                { title: 'Filiallar', icon: <Home className="w-5 h-5 mr-3" /> },
                { title: 'Fikr bildirish', icon: '💬' },
                { title: 'Til', icon: '🌐' },
                { title: 'Biz haqimizda', icon: 'ℹ️' },
                { title: 'Ish bilan ta\'minlash', icon: '💼' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => item.page && setCurrentPage(item.page)}
                  className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 cursor-pointer"
                  style={{ borderColor: colors.background }}
                >
                  <div className="flex items-center">
                    {typeof item.icon === 'string' ? (
                      <span className="text-xl mr-3">{item.icon}</span>
                    ) : (
                      item.icon
                    )}
                    <span className="font-medium" style={{ color: colors.text }}>
                      {item.title}
                    </span>
                  </div>
                  <div style={{ color: colors.lightText }}>›</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  const CheckoutPage = () => {
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [deliveryTime, setDeliveryTime] = useState('asap');
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
    
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 15000;

    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen"
        style={{ backgroundColor: colors.background }}
      >
        <div 
          className="bg-white p-4 shadow-sm flex items-center"
          style={{ borderBottom: `1px solid ${colors.background}` }}
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft 
              className="w-6 h-6 cursor-pointer mr-3" 
              onClick={() => setCurrentPage('cart')}
              style={{ color: colors.text }}
            />
          </motion.button>
          <h1 className="text-xl font-bold" style={{ color: colors.text }}>
            Buyurtma rasmiylashtiruvi
          </h1>
        </div>

        <div className="p-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.div 
              variants={fadeIn}
              className="bg-white rounded-xl p-4 mb-4 shadow-md"
              style={{ border: `1px solid ${colors.background}` }}
            >
              <h3 className="font-bold mb-3" style={{ color: colors.text }}>
                Yetkazib berish ma'lumotlari
              </h3>
              <div className="mb-3">
                <label className="block text-sm mb-1" style={{ color: colors.lightText }}>
                  To'liq manzil
                </label>
                <input
                  type="text"
                  placeholder="Ko'cha, uy raqami"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  style={{ 
                    borderColor: colors.background,
                    color: colors.text
                  }}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.lightText }}>
                  Telefon raqam
                </label>
                <input
                  type="tel"
                  placeholder="+998901234567"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  style={{ 
                    borderColor: colors.background,
                    color: colors.text
                  }}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              
              <div className="mt-4">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDeliveryOptions(!showDeliveryOptions)}
                  className="w-full flex justify-between items-center p-3"
                >
                  <div className="flex items-center">
                    <Package className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                    <span style={{ color: colors.text }}>
                      {deliveryTime === 'asap' ? 'Tez yetkazib berish' : 'Vaqt belgilash'}
                    </span>
                  </div>
                  {showDeliveryOptions ? (
                    <ChevronUp className="w-5 h-5" style={{ color: colors.lightText }} />
                  ) : (
                    <ChevronDown className="w-5 h-5" style={{ color: colors.lightText }} />
                  )}
                </motion.button>
                
                <AnimatePresence>
                  {showDeliveryOptions && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 pl-7 pr-3 pb-3">
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            name="deliveryTime" 
                            className="mr-3" 
                            checked={deliveryTime === 'asap'}
                            onChange={() => setDeliveryTime('asap')}
                          />
                          <span style={{ color: colors.text }}>Tez yetkazib berish (30-60 min)</span>
                        </label>
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            name="deliveryTime" 
                            className="mr-3" 
                            checked={deliveryTime === 'schedule'}
                            onChange={() => setDeliveryTime('schedule')}
                          />
                          <span style={{ color: colors.text }}>Vaqt belgilash</span>
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="bg-white rounded-xl p-4 mb-4 shadow-md"
              style={{ border: `1px solid ${colors.background}` }}
            >
              <h3 className="font-bold mb-3" style={{ color: colors.text }}>
                To'lov usuli
              </h3>
              
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                className="w-full flex justify-between items-center p-3"
              >
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                  <span style={{ color: colors.text }}>
                    {paymentMethod === 'card' && 'Plastik karta'}
                    {paymentMethod === 'cash' && 'Naqd pul'}
                    {paymentMethod === 'click' && 'Click/Payme'}
                  </span>
                </div>
                {showPaymentOptions ? (
                  <ChevronUp className="w-5 h-5" style={{ color: colors.lightText }} />
                ) : (
                  <ChevronDown className="w-5 h-5" style={{ color: colors.lightText }} />
                )}
              </motion.button>
              
              <AnimatePresence>
                {showPaymentOptions && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 pl-7 pr-3 pb-3">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="payment" 
                          className="mr-3" 
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                        />
                        <div className="flex items-center">
                          <CreditCard className="w-5 h-5 mr-2" style={{ color: colors.text }} />
                          <span style={{ color: colors.text }}>Plastik karta</span>
                        </div>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="payment" 
                          className="mr-3" 
                          checked={paymentMethod === 'cash'}
                          onChange={() => setPaymentMethod('cash')}
                        />
                        <div className="flex items-center">
                          <span className="text-xl mr-2">💵</span>
                          <span style={{ color: colors.text }}>Naqd pul</span>
                        </div>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="payment" 
                          className="mr-3" 
                          checked={paymentMethod === 'click'}
                          onChange={() => setPaymentMethod('click')}
                        />
                        <div className="flex items-center">
                          <span className="text-xl mr-2">📱</span>
                          <span style={{ color: colors.text }}>Click / Payme</span>
                        </div>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="bg-white rounded-xl p-4 mb-4 shadow-md"
              style={{ border: `1px solid ${colors.background}` }}
            >
              <h3 className="font-bold mb-3" style={{ color: colors.text }}>
                Buyurtma xulosasi
              </h3>
              
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span style={{ color: colors.text }}>
                      {item.name} × {item.quantity}
                    </span>
                    <span style={{ color: colors.text }}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span style={{ color: colors.text }}>Mahsulotlar:</span>
                <span style={{ color: colors.text }}>{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span style={{ color: colors.text }}>Yetkazib berish:</span>
                <span style={{ color: colors.text }}>{formatPrice(deliveryFee)}</span>
              </div>
              <hr className="my-3" style={{ borderColor: colors.background }} />
              <div className="flex justify-between items-center font-bold text-lg">
                <span style={{ color: colors.text }}>Jami:</span>
                <span style={{ color: colors.primary }}>
                  {formatPrice(totalAmount + deliveryFee)}
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.button
            onClick={handleCheckout}
            disabled={!deliveryAddress || !phoneNumber}
            className={`w-full py-4 rounded-xl font-bold text-lg ${
              !deliveryAddress || !phoneNumber ? 'opacity-50' : ''
            }`}
            style={{ 
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
              color: 'white'
            }}
            whileHover={{ scale: !deliveryAddress || !phoneNumber ? 1 : 1.01 }}
            whileTap={{ scale: !deliveryAddress || !phoneNumber ? 1 : 0.98 }}
          >
            Buyurtmani tasdiqlash
          </motion.button>
        </div>
      </motion.div>
    );
  };

  const LikePage = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <div className="bg-white p-4 shadow-sm flex items-center" style={{ borderBottom: `1px solid ${colors.background}` }}>
        <motion.button whileTap={{ scale: 0.9 }}>
          <ArrowLeft className="w-6 h-6 cursor-pointer mr-3" onClick={() => setActiveTab('home')} style={{ color: colors.text }} />
        </motion.button>
        <h1 className="text-xl font-bold" style={{ color: colors.text }}>Sevimlilar</h1>
      </div>
      <div className="p-4">
        {likedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: colors.text }}>Sevimlilar yo‘q</h2>
            <p className="mb-4" style={{ color: colors.lightText }}>Mahsulotlarga like bosing</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {likedProducts.map(product => (
              <motion.div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer relative"
                style={{ border: `1px solid ${colors.background}` }}
                whileHover={{ y: -5 }}
                onClick={() => setShowProductDetails(product)}
              >
                <motion.div
                  className="absolute top-3 right-3 z-10"
                  animate={likeAnim === product.id ? { scale: [1, 1.4, 1] } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <Heart
                    className="w-6 h-6 text-pink-500 cursor-pointer"
                    fill="currentColor"
                    onClick={e => {
                      e.stopPropagation();
                      toggleLike(product);
                    }}
                  />
                </motion.div>
                <div className="relative p-4">
                  <div className="text-5xl mb-3 text-center">{product.image}</div>
                  <h3 className="font-bold mb-2 text-sm leading-tight" style={{ color: colors.text }}>{product.name}</h3>
                  <span className="text-lg font-bold" style={{ color: colors.primary }}>{formatPrice(product.price)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );

  const ProductDetailsModal = ({ product, onClose }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    
    const images = [
      product.image,
      '📷',
      '🖼️'
    ];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          style={{ color: colors.text }}
        >
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.8 }}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </motion.button>
            
            <div className="h-48 bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center text-8xl">
              {images[selectedImage]}
            </div>
            
            <div className="flex justify-center space-x-2 p-4">
              {images.map((img, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                    selectedImage === index ? 'bg-pink-100' : 'bg-gray-100'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  {img}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-2xl font-bold" style={{ color: colors.primary }}>
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-sm line-through ml-2" style={{ color: colors.lightText }}>
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center">
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.background }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <span className="mx-3 font-medium">{quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                    color: 'white'
                  }}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-bold mb-2">Tavsif</h3>
              <p className="text-sm" style={{ color: colors.lightText }}>
                {product.details}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="text-xs font-medium mb-1" style={{ color: colors.lightText }}>
                  Tarkibi
                </h4>
                <p className="text-sm">{product.ingredients}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium mb-1" style={{ color: colors.lightText }}>
                  {product.weight ? 'Og\'irligi' : 'Hajmi'}
                </h4>
                <p className="text-sm">{product.weight || product.volume}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Izohlar</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {reviews.map((r, i) => (
                  <div key={i} className="text-sm bg-gray-50 rounded p-2">{r}</div>
                ))}
              </div>
              <div className="flex mt-2">
                <input
                  type="text"
                  className="flex-1 border rounded-l p-2"
                  placeholder="Izoh yozing..."
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                />
                <button
                  className="bg-pink-500 text-white px-4 rounded-r"
                  onClick={() => {
                    if (reviewText.trim()) {
                      setReviews([...reviews, reviewText]);
                      setReviewText('');
                    }
                  }}
                >Yuborish</button>
              </div>
            </div>
            
            <motion.button
              onClick={() => {
                const productToAdd = { ...product, quantity };
                addToCart(productToAdd);
                onClose();
              }}
              className="w-full py-4 rounded-xl font-bold text-lg"
              style={{ 
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                color: 'white'
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              Savatga qo'shish
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const LoginModal = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        onClick={() => setShowLoginModal(false)}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white rounded-2xl w-full max-w-md p-6"
          onClick={(e) => e.stopPropagation()}
          style={{ color: colors.text }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {loginMethod === 'register' ? "Ro'yxatdan o'tish" : 'Kirish'}
            </h2>
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => setShowLoginModal(false)}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>
          
          {!loginMethod ? (
            <div className="space-y-4">
              <motion.button
                onClick={handleTelegramLogin}
                className="w-full py-3 rounded-xl font-semibold flex items-center justify-center"
                style={{ 
                  background: '#0088CC',
                  color: 'white'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-2">📱</span>
                Telegram orqali kirish
              </motion.button>
              
              <motion.button
                onClick={() => setLoginMethod('login')}
                className="w-full py-3 rounded-xl font-semibold flex items-center justify-center border"
                style={{ 
                  borderColor: colors.primary,
                  color: colors.primary
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogIn className="w-5 h-5 mr-2" />
                Kirish
              </motion.button>
              
              <motion.button
                onClick={() => setLoginMethod('register')}
                className="w-full py-3 rounded-xl font-semibold flex items-center justify-center"
                style={{ 
                  background: colors.background,
                  color: colors.primary
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ro'yxatdan o'tish
              </motion.button>
            </div>
          ) : loginMethod === 'register' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.lightText }}>
                  Ismingiz
                </label>
                <input
                  type="text"
                  placeholder="Ism familiya"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  style={{ 
                    borderColor: colors.background,
                    color: colors.text
                  }}
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.lightText }}>
                  Telefon raqam
                </label>
                <input
                  type="tel"
                  placeholder="+998901234567"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  style={{ 
                    borderColor: colors.background,
                    color: colors.text
                  }}
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.lightText }}>
                  Parol
                </label>
                <input
                  type="password"
                  placeholder="Kamida 6 ta belgi"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  style={{ 
                    borderColor: colors.background,
                    color: colors.text
                  }}
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                />
              </div>
              
              <motion.button
                onClick={handleRegister}
                className="w-full py-3 rounded-xl font-semibold mt-4"
                style={{ 
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                  color: 'white'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ro'yxatdan o'tish
              </motion.button>
              
              <div className="text-center mt-4">
                <button 
                  onClick={() => setLoginMethod('login')}
                  className="text-sm"
                  style={{ color: colors.primary }}
                >
                  Akkauntingiz bormi? Kirish
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.lightText }}>
                  Telefon raqam
                </label>
                <input
                  type="tel"
                  placeholder="+998901234567"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  style={{ 
                    borderColor: colors.background,
                    color: colors.text
                  }}
                  value={loginData.phone}
                  onChange={(e) => setLoginData({...loginData, phone: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.lightText }}>
                  Parol
                </label>
                <input
                  type="password"
                  placeholder="Parolingizni kiriting"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  style={{ 
                    borderColor: colors.background,
                    color: colors.text
                  }}
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                />
              </div>
              
              <motion.button
                onClick={handleLogin}
                className="w-full py-3 rounded-xl font-semibold mt-4"
                style={{ 
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                  color: 'white'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Kirish
              </motion.button>
              
              <div className="text-center mt-4">
                <button 
                  onClick={() => setLoginMethod('register')}
                  className="text-sm"
                  style={{ color: colors.primary }}
                >
                  Akkauntingiz yo'qmi? Ro'yxatdan o'tish
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  // 1. Responsive container va dark mode
  return (
    <div
      className={`fixed inset-0 w-full min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-y-auto`}
      style={{ backgroundColor: colors.background, zIndex: 0 }}
    >
      {/* Background decorative elements */}
      <motion.div 
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full"
        style={{ backgroundColor: colors.primary, opacity: 0.1 }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0],
          transition: { repeat: Infinity, duration: 8 }
        }}
      />

      <motion.div 
        className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full"
        style={{ backgroundColor: colors.secondary, opacity: 0.1 }}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, -5, 0],
          transition: { repeat: Infinity, duration: 10 }
        }}
      />
      
      <AnimatePresence mode="wait">
        {currentPage === 'home' && <HomePage key="home" />}
        {currentPage === 'cart' && <CartPage key="cart" />}
        {currentPage === 'profile' && <ProfilePage key="profile" />}
        {currentPage === 'checkout' && <CheckoutPage key="checkout" />}
        {currentPage === 'history' && <HistoryPage key="history" />}
        {currentPage === 'like' && <LikePage key="like" />}
      </AnimatePresence>

      {showProductDetails && (
        <ProductDetailsModal
          product={showProductDetails}
          onClose={() => setShowProductDetails(null)}
        />
      )}

      {showLoginModal && <LoginModal />}
      {/* Dark mode tugmasini quyidagicha o‘zgartiring: */}
      <button
        className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-full shadow-lg p-3"
        onClick={() => setDarkMode(d => !d)}
        aria-label="Tungi rejim"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* Pastki navbar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around py-2 shadow-lg">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-pink-500' : 'text-gray-400'}`}>
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </button>
        <button onClick={() => setActiveTab('like')} className={`flex flex-col items-center ${activeTab === 'like' ? 'text-pink-500' : 'text-gray-400'}`}>
          <Heart className="w-6 h-6" />
          <span className="text-xs">Like</span>
        </button>
        <button onClick={() => setActiveTab('cart')} className={`flex flex-col items-center ${activeTab === 'cart' ? 'text-pink-500' : 'text-gray-400'}`}>
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xs">Savat</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-pink-500' : 'text-gray-400'}`}>
          <User className="w-6 h-6" />
          <span className="text-xs">Hisob</span>
        </button>
      </nav>
    </div>
  );
};

export default CandyShopApp;