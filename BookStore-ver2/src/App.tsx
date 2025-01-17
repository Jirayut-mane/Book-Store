import React, { useState } from 'react';
    import { Search, BookOpen, History, User, Menu, BookPlus } from 'lucide-react';
    import { AuthProvider } from './contexts/AuthContext';
    import { CartProvider } from "./contexts/CartContext";
    import { ThemeProvider } from './contexts/ThemeContext';
    import Navbar from './components/Navbar';
    import BookList from './components/BookList';
    import CategoryList from './components/CategoryList';
    import UserProfile from './components/UserProfile';
    import PurchaseHistory from './components/PurchaseHistory';
    import UserBooks from './components/UserBooks';

    function App() {
      const [activeTab, setActiveTab] = useState('books');
      const [searchQuery, setSearchQuery] = useState('');
      const [selectedCategory, setSelectedCategory] = useState('all');

      return (
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                
                <main className="container mx-auto px-4 py-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar */}
                    <aside className="w-full md:w-64 space-y-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">เมนู</h2>
                        <nav className="space-y-2">
                          <button
                            onClick={() => setActiveTab('books')}
                            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                              activeTab === 'books' 
                                ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                          >
                            <BookOpen size={20} />
                            <span>หนังสือทั้งหมด</span>
                          </button>
                          <button
                            onClick={() => setActiveTab('my-books')}
                            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                              activeTab === 'my-books' 
                                ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                          >
                            <BookPlus size={20} />
                            <span>หนังสือของฉัน</span>
                          </button>
                          <button
                            onClick={() => setActiveTab('history')}
                            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                              activeTab === 'history' 
                                ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                          >
                            <History size={20} />
                            <span>ประวัติการซื้อ</span>
                          </button>
                          <button
                            onClick={() => setActiveTab('profile')}
                            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                              activeTab === 'profile' 
                                ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                          >
                            <User size={20} />
                            <span>โปรไฟล์</span>
                          </button>
                        </nav>
                      </div>
                      
                      <CategoryList
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                      />
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                      {activeTab === 'books' && (
                        <BookList
                          searchQuery={searchQuery}
                          category={selectedCategory}
                        />
                      )}
                      {activeTab === 'my-books' && <UserBooks />}
                      {activeTab === 'history' && <PurchaseHistory />}
                      {activeTab === 'profile' && <UserProfile />}
                    </div>
                  </div>
                </main>
              </div>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      );
    }

    export default App;
