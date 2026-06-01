'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SampleRequestModal from './SampleRequestModal_tech';
import { Toaster } from 'react-hot-toast';

interface SampleRequestButtonProps {
  productName: string;
  className?: string;
  label?: string;
}

export default function SampleRequestButton({ productName, className, label }: SampleRequestButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Toaster position="top-right" />
      <motion.button
        onClick={() => setIsModalOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={className}
      >
        {label || 'Запросить консультацию'}
      </motion.button>
      <SampleRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={productName}
      />
    </>
  );
}







