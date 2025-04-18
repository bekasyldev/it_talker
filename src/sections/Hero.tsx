'use client'

import { useState } from 'react';
import HeroForm from '@/components/HeroForm';
import Badge from '@/components/Badge';
import SuccessPopup from '@/components/SuccessPopup';
import AnimatedSection from '@/components/AnimatedSection';
import styles from '@/styles/Hero.module.css';
import Image from 'next/image';


function Hero() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  const features = [
    'Группы по 20 человек',
    'Еженедельная real-time практика',
  ];

  const features2 = [
    'Настоящая практика в реальном проекте',
    'От старта в профессии до уровня middle',
    'Опытные и новички - в разных группах', 
    'Длительность обучения - 3 месяца'
  ];

  const companies = ['Теле2', 'Альфа банк', 'Сбербанк', 'Uzum'];

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section style={{ backgroundImage: "url('/assets/main-bg.png')" }} className="pt-6 min-h-[690px] bg-[var(--bg-primary)] overflow-hidden rounded-b-3xl">
      <div className="md:container">
        {/* Mobile Hero */}
        <div className="md:hidden relative">
          {/* Content */}
          <div className="px-4">
            <AnimatedSection direction="right">
              <h1 className="text-[30px] leading-[129%] tracking-[-0.01em] text-[#010024] mb-6 font-bold">
                Освой профессию системного аналитика!
              </h1>
            </AnimatedSection>

            <div className="flex flex-wrap gap-2 mb-2">
              {features.map((feature) => (
                <Badge key={feature} className='bg-[#E9F0F7] text-xs'>{feature}</Badge>
              ))}
            </div>

            <div className='flex flex-wrap-reverse gap-2'>
                {features2.map((feature, index) => (
                <Badge 
                  key={feature} 
                  className={`${index === 0 ? 'bg-[#F8FAFC] border border-[#006DFC]' : 'bg-[#E7EDF5]'} text-xs`}
                >
                  {feature}
                </Badge>
                ))}
            </div>

            {/* Mobile Chart Card */}
            <div className={styles.chartCard}>
              <Image 
                src="/assets/chart.png" 
                alt="Salary Chart" 
                width={190}
                height={120}
                className="w-full h-auto max-w-[150px]"
              />
            </div>
          </div>

          {/* Mobile Person Image and Company Card */}
          <div className={styles.mobileHeroImage}>
            <img 
              src="/assets/hero-person.png" 
              alt="hero" 
              className={styles.heroImage}
            />
            <div className={styles.companyCard}>
              <p className="text-xs font-semibold mb-1.5">
                Старший и ведущий SA:
              </p>
              {companies.map((company) => (
                <li 
                  key={company}
                  className="text-[#2F87FB] text-xs ml-3 font-semibold"
                >
                  {company}
                </li>
              ))}
            </div>
          </div>

          {/* Mobile Form */}
          <div className="relative z-10">
            <div className="bg-[rgba(12,54,127,0.5)] backdrop-blur-[25px] rounded-[25px]">
              <div className="px-6 py-8">
                <div className='flex flex-col w-full'>
                  <div className='flex justify-between items-start mb-8'>
                    <h3 className="text-[25px] font-semibold text-white">
                      Запишись на бесплатную консультацию!
                    </h3>
                  </div>

                  <HeroForm 
                    className="mb-4"
                    onSubmitSuccess={() => setShowSuccess(true)} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Hero */}
        <div className="h-full hidden md:block relative min-h-[calc(90vh-50px)]">
          {/* Content */}
          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            <div className='mt-16'>
              <AnimatedSection direction="right">
                <h1 className="text-3xl lg:text-4xl font-bold mb-8">
                  Освой профессию  <br />
                  системного аналитика!
                </h1>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={0.2}>
                <div className='mb-56 space-y-1'>
                  <div className="flex gap-1.5 mb-2">
                    {features.map((feature) => (
                      <Badge key={feature} className="bg-[#E9F0F7] text-sm lg:text-base">{feature}</Badge>
                    ))}
                  </div>
                  <div className="grid gap-3">
                    {features2.map((feature, index) => (
                      <Badge 
                      key={feature} 
                      className={`${index === 0 ? 'bg-[#F8FAFC] border border-[#006DFC]' : 'bg-[#E7EDF5]'} text-sm lg:text-base`}
                      >
                      {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div className="relative h-full">
              <img 
                src="/assets/hero-person.png" 
                alt="hero" 
                className={styles.heroImage}
              />
              <div className={styles.companyCard}>
                <p className="text-base lg:text-lg mb-2 font-semibold">
                  Старший и ведущий SA:
                </p>
                {companies.map((company) => (
                  <li 
                    className='ml-6 text-[var(--button-primary)] text-lg lg:text-xl font-semibold' 
                    key={company}
                  >
                    {company}
                  </li>
                ))}
              </div>

              {/* Desktop Chart Card */}
                <div className={styles.chartCard}>
                <Image 
                  src="/assets/chart.png" 
                  alt="Chart" 
                  width={300}
                  height={200}
                  className="w-full h-auto"
                  priority
                />
                </div>
            </div>

            {/* Desktop Form */}
            <div 
              className={`
                absolute z-20 
                bg-[rgba(12,54,127,0.5)] backdrop-blur-[25px] rounded-[25px]
                w-[90%] p-4 mx-4
                md:w-[90%] md:px-6 md:-bottom-[20px]
                lg:w-[80%] lg:px-8 lg:-bottom-[0px]
                xl:w-[1000px] xl:px-10 xl:left-[0] xl:-bottom-[20px]
                2xl:w-[1200px] 2xl:px-12 2xl:left-[0%] 2xl:bottom-0
                transform transition-all duration-300
              `}
            >
              <div className='flex items-center justify-between'>
                <p className='text-start text-white text-xl lg:text-3xl font-bold'>
                  Запишись на бесплатную консультацию!
                </p>
                
                <form onSubmit={handlePromoSubmit} className="mb-4">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Промокод"
                    className="bg-[#3D4C6A] text-white text-md opacity-60 py-4 pl-4 rounded-2xl w-64 font-medium placeholder-white/70"
                  />
                </form>
              </div>


              <HeroForm 
                onSubmitSuccess={() => setShowSuccess(true)} 
                promoCode={promoCode}
              />
            </div>
          </div>
        </div>
      </div>

      <SuccessPopup 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
      />
    </section>
  );
}

export default Hero;
