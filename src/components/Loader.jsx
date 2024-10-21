// Loader.jsx
import React, { useEffect, useRef } from 'react';

const Loader = () => {
  const loaderRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let angle = 0; // Sudut untuk perputaran

    const animate = () => {
      if (loaderRef.current) {
        angle += 0.05; // Kecepatan rotasi
        const radius = 50; // Jarak dari pusat
        const ballCount = 3; // Jumlah bola

        // Menghapus semua bola yang ada
        loaderRef.current.innerHTML = '';

        // Warna bola
        const colors = ['red', 'green', 'blue'];

        // Membuat dan menambahkan bola ke loader
        for (let i = 0; i < ballCount; i++) {
          const ball = document.createElement('div');
          const theta = (2 * Math.PI / ballCount) * i + angle; // Menghitung sudut masing-masing bola
          const x = Math.cos(theta) * radius; // Posisi X
          const y = Math.sin(theta) * radius; // Posisi Y

          ball.style.width = '20px';
          ball.style.height = '20px';
          ball.style.borderRadius = '50%';
          ball.style.backgroundColor = colors[i]; // Menggunakan warna dari array
          ball.style.position = 'absolute';
          ball.style.transform = `translate(${x}px, ${y}px)`;
          loaderRef.current.appendChild(ball);
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate(); // Memulai animasi

    return () => {
      cancelAnimationFrame(animationFrameId); // Membersihkan saat komponen di-unmount
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        position: 'relative',
      }}
    >
      <h2 style={{ color: 'black', position: 'absolute' }}>Loading...</h2>
    </div>
  );
};

export default Loader;
