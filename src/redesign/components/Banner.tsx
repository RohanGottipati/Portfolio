import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { isInitialRevealDone } from '../utils/revealState';
import { revealEase } from './Reveal';

export function Banner() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(() => isInitialRevealDone());

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div className="h-[180px] w-full overflow-hidden bg-[#e4dfd5] sm:h-[242px]">
      <motion.img
        ref={imgRef}
        src={profile.bannerUrl}
        alt={profile.bannerAlt}
        onLoad={() => setLoaded(true)}
        initial={false}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.02 }}
        transition={{ duration: 0.8, ease: revealEase }}
        className="block h-full w-full object-cover" />

    </div>);

}
