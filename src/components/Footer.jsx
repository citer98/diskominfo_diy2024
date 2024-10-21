import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#A83427', width: '100%' }}>
      <div className="text-center p-3">
        <span className="text-white">© Diskominfo DIY - {new Date().getFullYear()} </span>
      </div>
      {/* <div className="text-center p-2">
        <a href="#" className="text-white me-3">Privacy Policy</a>
        <a href="#" className="text-white me-3">Terms of Service</a>
        <a href="#" className="text-white">Contact Us</a>
      </div> */}
    </footer>
  );
}

export default Footer;
