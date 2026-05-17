import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Chatbot from './Chatbot';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return (
    <div className="site">
      <Header />
      <main className="site-main">
        <div key={pathname} className="page-transition">
          <Outlet />
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
