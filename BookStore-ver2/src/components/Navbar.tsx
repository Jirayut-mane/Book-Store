import React, { useState } from 'react';
    import { BookOpen, User, ShoppingCart as CartIcon, Sun, Moon, Menu, X, ChevronDown, ChevronUp, Search } from 'lucide-react';
    import { useAuth } from '../contexts/AuthContext';
    import { useCart } from '../contexts/CartContext';
    import { useTheme } from '../contexts/ThemeContext';
    import LoginForm from './LoginForm';
    import RegisterForm from './RegisterForm';
    import ShoppingCart from './ShoppingCart';

    interface NavbarProps {
      searchQuery: string;
      onSearchChange: (query: string) => void;
    }

    const Navbar = ({ searchQuery, onSearchChange }: NavbarProps) => {
      const { user, logout } = useAuth();
      const { items } = useCart();
      const { isDark, toggleTheme } = useTheme();
      const [showLogin, setShowLogin] = useState(false);
      const [showRegister, setShowRegister] = useState(false);
      const [showCart, setShowCart] = useState(false);
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

      const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

      const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

      const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
      };

      return (
        <header className="bg-white dark:bg-gray-800 shadow transition-colors duration-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <button onClick={() => window.location.href = '/'}>
                  <BookOpen className="text-blue-600 dark:text-blue-400" size={24} />
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">ร้านหนังสือออนไลน์</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-4 flex-1 justify-center md:justify-end">
                <div className="relative flex-1 md:flex-none md:max-w-xs mx-4">
                  <input
                    type="text"
                    placeholder="ค้นหาหนังสือ..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleTheme}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white md:block hidden"
                  >
                    {isDark ? <Sun size={24} /> : <Moon size={24} />}
                  </button>
                  
                  <button
                    onClick={() => setShowCart(true)}
                    className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white md:block hidden"
                  >
                    <CartIcon size={24} />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cartItemsCount}
                      </span>
                    )}
                  </button>
                  
                  {user ? (
                    <div className="relative md:block hidden">
                      <button
                        onClick={toggleUserMenu}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      >
                        <User size={20} className="text-gray-600 dark:text-gray-300" />
                        <span className="text-gray-800 dark:text-white">{user.name}</span>
                        {isUserMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-md rounded-md p-2 w-48 z-50">
                          <button
                            onClick={() => {
                              logout();
                              toggleUserMenu();
                            }}
                            className="w-full px-4 py-2 text-left text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md"
                          >
                            ออกจากระบบ
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="md:block hidden">
                      <button
                        onClick={() => setShowLogin(true)}
                        className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      >
                        เข้าสู่ระบบ
                      </button>
                      <button
                        onClick={() => setShowRegister(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        สมัครสมาชิก
                      </button>
                    </div>
                  )}
                  
                  <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>
            </div>
            
            {isMenuOpen && (
              <div className="md:hidden absolute top-16 right-0 bg-white dark:bg-gray-800 shadow-md rounded-md p-4 w-64 z-50">
                <nav className="space-y-2">
                  <button
                    onClick={() => {
                      toggleTheme();
                      toggleMenu();
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    <span>{isDark ? 'สว่าง' : 'มืด'}</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowCart(true);
                      toggleMenu();
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <CartIcon size={20} />
                    <span>ตะกร้าสินค้า</span>
                    {cartItemsCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cartItemsCount}
                      </span>
                    )}
                  </button>
                  
                  {user ? (
                    <>
                      <div className="flex items-center space-x-2 px-4 py-2">
                        <User size={20} className="text-gray-600 dark:text-gray-300" />
                        <span className="text-gray-800 dark:text-white">{user.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          toggleMenu();
                        }}
                        className="w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg"
                      >
                        ออกจากระบบ
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setShowLogin(true);
                          toggleMenu();
                        }}
                        className="w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg"
                      >
                        เข้าสู่ระบบ
                      </button>
                      <button
                        onClick={() => {
                          setShowRegister(true);
                          toggleMenu();
                        }}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        สมัครสมาชิก
                      </button>
                    </>
                  )}
                </nav>
              </div>
            )}
          </div>

          {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
          {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}
          {showCart && <ShoppingCart onClose={() => setShowCart(false)} />}
        </header>
      );
    }

    export default Navbar;
