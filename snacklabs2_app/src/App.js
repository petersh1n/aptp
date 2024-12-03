import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import IndexMain from './components/Indexpage/IndexMain';
import Menu from './components/Menu/Menu';
import CustomIndex from './components/Custompage/CustomIndex';

import './App.css';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {


  const PageWithMenu = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen((prevState) => !prevState);
      if (!isMenuOpen) {
        setActiveMenu(0);
      }
    };

    return (
      <div className="page-with-menu">
        <Header onMenuToggle={toggleMenu} />
        <Menu
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          isOpen={isMenuOpen}
          onClose={toggleMenu}
        />
        {children}
      </div>
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PageWithMenu>
              <IndexMain />
            </PageWithMenu>
          }
        />
        <Route
          path="/custom/:department/:group/:model"
          element={
            <PageWithMenu>
              <CustomIndex />
            </PageWithMenu>
          }
        />
      </Routes>
    </div>
  );
}

export default App;