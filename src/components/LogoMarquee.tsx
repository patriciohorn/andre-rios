import { cn } from '@/lib/utils';
import { Marquee } from '@/components/magicui/marquee';

import logo1 from '@/assets/logos/amcper.png';
import logo3 from '@/assets/logos/asps.png';
import logo2 from '@/assets/logos/cmcg.png';
import logo4 from '@/assets/logos/cmcp.png';
import logo5 from '@/assets/logos/isaps.png';

const logoImages = [logo5, logo4, logo2, logo3, logo1];

// const reviews = [
//   {
//     name: 'Jack',
//     username: '@jack',
//     body: "I've never seen anything like this before. It's amazing. I love it.",
//     img: 'https://avatar.vercel.sh/jack',
//   },
//   {
//     name: 'Jill',
//     username: '@jill',
//     body: "I don't know what to say. I'm speechless. This is amazing.",
//     img: 'https://avatar.vercel.sh/jill',
//   },
//   {
//     name: 'John',
//     username: '@john',
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: 'https://avatar.vercel.sh/john',
//   },
//   {
//     name: 'Jane',
//     username: '@jane',
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: 'https://avatar.vercel.sh/jane',
//   },
//   {
//     name: 'Jenny',
//     username: '@jenny',
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: 'https://avatar.vercel.sh/jenny',
//   },
//   {
//     name: 'James',
//     username: '@james',
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: 'https://avatar.vercel.sh/james',
//   },
// ];

// const firstRow = logoImages.slice(0, logoImages.length / 2);
// const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        'bg-[#FAFAFA] relative cursor-pointer p-4'
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
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#FAFAFA]"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#FAFAFA]"></div>
    </div>
  );
}
