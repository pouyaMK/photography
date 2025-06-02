'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

export default function Footer() {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 60, damping: 15 }}
      className="bg-black text-white px-6 py-12 rounded-t-3xl shadow-inner"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info Section */}
        <div>
          <h2 className="text-3xl font-bold mb-4">تماس با من</h2>
          <p className="text-lg text-gray-300">
            برای همکاری یا سوالات بیشتر، خوشحال می‌شم باهام در تماس باشی.
          </p>
          <p className="mt-4 text-sm text-gray-400">ایمیل: example@email.com</p>
        </div>

        {/* Social Section */}
        <div className="flex flex-col items-start gap-4 md:items-end">
          <h2 className="text-3xl font-bold">دنبال کن</h2>
          <div className="flex gap-4">
            <motion.a
              whileHover={{ scale: 1.2, rotate: 5 }}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon icon="mdi:instagram" className="text-pink-500" width="30" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, rotate: -5 }}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon icon="mdi:twitter" className="text-blue-400" width="30" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon icon="mdi:linkedin" className="text-blue-600" width="30" />
            </motion.a>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} تمام حقوق برای عکاس محفوظ است.
      </div>
    </motion.footer>
  );
}
