import { cn } from '@/lib/utils';
import { Marquee } from '@/components/magicui/marquee';

import logo1 from '@/assets/logos/amcper.png';
import logo3 from '@/assets/logos/asps.png';
import logo2 from '@/assets/logos/cmcg.png';
import logo4 from '@/assets/logos/cmcp.png';
import logo5 from '@/assets/logos/isaps.png';

const logoImages = [logo5, logo4, logo2, logo3, logo1];

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        'bg-section relative cursor-pointer p-4'
        // light styles
      )}>
      <div className="flex flex-row items-center">
        <img
          className="w-full h-full object-cover grayscale brightness-0"
          width="32"
          height="32"
          alt=""
          src={img}
        />
      </div>
    </figure>
  );
};

export function LogoMarque() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee className="[--duration:30s]">
        {logoImages.map((image, idx) => (
          <ReviewCard key={idx} img={image.src} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-section"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-section"></div>
    </div>
  );
}
