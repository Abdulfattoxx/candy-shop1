import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, ArrowLeft, Star, Heart, Gift, Candy } from 'lucide-react';

const CandyShopApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample data
  const categories = [
    { id: 'promotions', name: 'Aksiyalar', icon: '🎁', color: 'bg-red-500' },
    { id: 'chocolates', name: 'Shokoladlar', icon: '🍫', color: 'bg-amber-600' },
    { id: 'candies', name: 'Konfetlar', icon: '🍬', color: 'bg-pink-500' },
    { id: 'lollipops', name: 'Lolipoplar', icon: '🍭', color: 'bg-purple-500' },
    { id: 'gummies', name: 'Marmeladlar', icon: '🐻', color: 'bg-green-500' },
    { id: 'cookies', name: 'Pechenye', icon: '🍪', color: 'bg-orange-500' },
    { id: 'cakes', name: 'Tortlar', icon: '🎂', color: 'bg-blue-500' },
    { id: 'drinks', name: 'Ichimliklar', icon: '🥤', color: 'bg-cyan-500' }
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
      isPromo: true
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
      isPromo: true
    }
  ];

  const products = [
    // Chocolates
    { id: 3, name: 'Milk Chocolate Bar', price: 15000, image: '🍫', category: 'chocolates', rating: 4.5 },
    { id: 4, name: 'Dark Chocolate Premium', price: 18000, image: '🍫', category: 'chocolates', rating: 4.7 },
    { id: 5, name: 'White Chocolate Delight', price: 16000, image: '🤍🍫', category: 'chocolates', rating: 4.4 },
    
    // Candies
    { id: 6, name: 'Fruit Candies Mix', price: 12000, image: '🍬', category: 'candies', rating: 4.3 },
    { id: 7, name: 'Caramel Candies', price: 14000, image: '🍯🍬', category: 'candies', rating: 4.6 },
    { id: 8, name: 'Mint Fresh Candies', price: 11000, image: '🌿🍬', category: 'candies', rating: 4.2 },
    
    // Lollipops
    { id: 9, name: 'Rainbow Lollipops', price: 8000, image: '🍭', category: 'lollipops', rating: 4.5 },
    { id: 10, name: 'Cherry Lollipop', price: 7000, image: '🍒🍭', category: 'lollipops', rating: 4.4 },
    
    // Gummies
    { id: 11, name: 'Gummy Bears', price: 13000, image: '🐻', category: 'gummies', rating: 4.6 },
    { id: 12, name: 'Sour Gummies', price: 15000, image: '😋🐻', category: 'gummies', rating: 4.3 },
    
    // Cookies
    { id: 13, name: 'Chocolate Chip Cookies', price: 20000, image: '🍪', category: 'cookies', rating: 4.7 },
    { id: 14, name: 'Oatmeal Cookies', price: 18000, image: '🌾🍪', category: 'cookies', rating: 4.5 },
    
    // Cakes
    { id: 15, name: 'Mini Cupcakes (6pc)', price: 25000, image: '🧁', category: 'cakes', rating: 4.8 },
    { id: 16, name: 'Chocolate Cake Slice', price: 22000, image: '🎂', category: 'cakes', rating: 4.6 },
    
    // Drinks
    { id: 17, name: 'Hot Chocolate', price: 12000, image: '☕', category: 'drinks', rating: 4.5 },
    { id: 18, name: 'Milkshake Vanilla', price: 15000, image: '🥤', category: 'drinks', rating: 4.4 }
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
  };

  const getFilteredProducts = () => {
    let filtered = selectedCategory === 'all' ? allProducts : 
                   selectedCategory === 'promotions' ? promotionalProducts :
                   products.filter(p => p.category === selectedCategory);
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Candy className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Candy Shop</h1>
              <p className="text-pink-100 text-sm">Premium shirinliklar</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <ShoppingCart 
                className="w-6 h-6 cursor-pointer" 
                onClick={() => setCurrentPage('cart')}
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
            <User 
              className="w-6 h-6 cursor-pointer" 
              onClick={() => setCurrentPage('profile')}
            />
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="bg-white/20 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">🎁 AKSIYA!</h3>
              <p className="text-pink-100 text-sm">2 ta mahsulot sotib oling,</p>
              <p className="text-pink-100 text-sm">3-chisini BEPUL oling!</p>
              <div className="flex items-center mt-2">
                <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                  50% CHEGIRMA
                </span>
              </div>
            </div>
            <div className="text-6xl">🍭🍬</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Qidiruv..."
            className="w-full bg-white rounded-xl pl-12 pr-4 py-3 border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mb-6">
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl min-w-[80px] ${
              selectedCategory === 'all' 
                ? 'bg-pink-500 text-white shadow-lg' 
                : 'bg-white text-gray-600 shadow'
            }`}
          >
            <div className="text-2xl mb-1">🍯</div>
            <span className="text-xs font-medium">Hammasi</span>
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl min-w-[80px] ${
                selectedCategory === category.id 
                  ? `${category.color} text-white shadow-lg` 
                  : 'bg-white text-gray-600 shadow'
              }`}
            >
              <div className="text-2xl mb-1">{category.icon}</div>
              <span className="text-xs font-medium text-center">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 pb-6">
        {selectedCategory === 'promotions' && (
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Gift className="w-6 h-6 mr-2 text-red-500" />
            Aksiyalar
          </h2>
        )}
        <div className="grid grid-cols-2 gap-4">
          {getFilteredProducts().map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {product.isPromo && (
                <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 absolute z-10 rounded-br-lg">
                  AKSIYA
                </div>
              )}
              <div className="relative p-4">
                <div className="text-5xl mb-3 text-center">{product.image}</div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                  <Heart className="w-5 h-5 text-gray-300 hover:text-red-500 cursor-pointer" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-sm leading-tight">{product.name}</h3>
                {product.description && (
                  <p className="text-xs text-gray-500 mb-2">{product.description}</p>
                )}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-bold text-green-600">
                      {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs text-gray-400 line-through ml-2">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-colors"
                >
                  Savatga
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CartPage = () => {
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white p-4 shadow-sm flex items-center">
          <ArrowLeft 
            className="w-6 h-6 cursor-pointer mr-3" 
            onClick={() => setCurrentPage('home')}
          />
          <h1 className="text-xl font-bold">Savat</h1>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-bold text-gray-600 mb-2">Savat bo'sh</h2>
            <p className="text-gray-400 mb-4">Mahsulotlarni qo'shib boshlang</p>
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Xarid qilish
            </button>
          </div>
        ) : (
          <div className="p-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-xl p-4 mb-4 shadow">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{item.image}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-green-600 font-bold">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center">
                    <button 
                      onClick={() => {
                        setCart(prev => prev.map(cartItem => 
                          cartItem.id === item.id && cartItem.quantity > 1
                            ? { ...cartItem, quantity: cartItem.quantity - 1 }
                            : cartItem
                        ).filter(cartItem => cartItem.quantity > 0));
                      }}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="mx-3 font-semibold">{item.quantity}</span>
                    <button 
                      onClick={() => {
                        setCart(prev => prev.map(cartItem => 
                          cartItem.id === item.id
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem
                        ));
                      }}
                      className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-xl p-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Jami:</span>
                <span className="text-xl font-bold text-green-600">
                  {formatPrice(totalAmount)}
                </span>
              </div>
              <button
                onClick={() => setCurrentPage('checkout')}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg"
              >
                Buyurtma berish
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ProfilePage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 shadow-sm flex items-center">
        <ArrowLeft 
          className="w-6 h-6 cursor-pointer mr-3" 
          onClick={() => setCurrentPage('home')}
        />
        <h1 className="text-xl font-bold">Profil</h1>
      </div>

      <div className="p-4">
        {!user ? (
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-6xl mb-4">👤</div>
            <h2 className="text-xl font-bold mb-4">Akkauntga kirish</h2>
            <button
              onClick={() => setUser({ name: 'Foydalanuvchi', phone: '+998901234567' })}
              className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold mb-3"
            >
              Telegram orqali kirish
            </button>
            <button className="w-full border border-gray-300 py-3 rounded-xl font-semibold">
              Telefon orqali kirish
            </button>
          </div>
        ) : (
          <div>
            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  <p className="text-gray-600">{user.phone}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl">
              {[
                { title: 'Shaxsiy ma\'lumotlar', icon: '👤' },
                { title: 'Buyurtmalar tarixi', icon: '📋' },
                { title: 'Mening manzillarim', icon: '📍' },
                { title: 'Filiallar', icon: '🏪' },
                { title: 'Fikr bildirish', icon: '💬' },
                { title: 'Til', icon: '🌐' },
                { title: 'Biz haqimizda', icon: 'ℹ️' },
                { title: 'Ish bilan ta\'minlash', icon: '💼' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <div className="text-gray-400">›</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const CheckoutPage = () => {
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white p-4 shadow-sm flex items-center">
          <ArrowLeft 
            className="w-6 h-6 cursor-pointer mr-3" 
            onClick={() => setCurrentPage('cart')}
          />
          <h1 className="text-xl font-bold">Buyurtma rasmiylashtiruvi</h1>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-xl p-4 mb-4">
            <h3 className="font-bold mb-3">Yetkazib berish manzili</h3>
            <input
              type="text"
              placeholder="Ko'cha, uy raqami"
              className="w-full border border-gray-300 rounded-lg p-3 mb-3"
            />
            <input
              type="text"
              placeholder="Telefon raqam"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div className="bg-white rounded-xl p-4 mb-4">
            <h3 className="font-bold mb-3">To'lov usuli</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="radio" name="payment" className="mr-3" defaultChecked />
                <span>💳 Plastik karta</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="payment" className="mr-3" />
                <span>💵 Naqd pul</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="payment" className="mr-3" />
                <span>📱 Click / Payme</span>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span>Mahsulotlar:</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Yetkazib berish:</span>
              <span>15,000 so'm</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Jami:</span>
              <span className="text-green-600">{formatPrice(totalAmount + 15000)}</span>
            </div>
          </div>

          <button
            onClick={() => {
              alert('Buyurtma muvaffaqiyatli berildi! 🎉');
              setCart([]);
              setCurrentPage('home');
            }}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg"
          >
            Buyurtmani tasdiqlash
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'cart' && <CartPage />}
      {currentPage === 'profile' && <ProfilePage />}
      {currentPage === 'checkout' && <CheckoutPage />}
    </div>
  );
};

export default CandyShopApp;