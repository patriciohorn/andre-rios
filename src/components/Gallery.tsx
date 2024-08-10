import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

// Images
import gallery1 from '../assets/gallery/gallery_1.jpg';
import gallery1Webp from '../assets/gallery/gallery_1.webp';

import gallery2 from '../assets/gallery/gallery_2.jpg';
import gallery2Webp from '../assets/gallery/gallery_2.webp';

import gallery3 from '../assets/gallery/gallery_3.jpg';
import gallery3Webp from '../assets/gallery/gallery_3.webp';

import gallery4 from '../assets/gallery/gallery_4.jpg';
import gallery4Webp from '../assets/gallery/gallery_4.webp';

import gallery5 from '../assets/gallery/gallery_5.jpg';
import gallery5Webp from '../assets/gallery/gallery_5.webp';

import gallery6 from '../assets/gallery/gallery_6.jpg';
import gallery6Webp from '../assets/gallery/gallery_6.webp';
import { Button } from './ui/button';

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const imagesJpg = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];
  const imagesWebp = [gallery1Webp, gallery2Webp, gallery3Webp, gallery4Webp, gallery5Webp];

  const openDialog = (index: number) => {
    setSelectedImage(index);
    setIsOpen(true);
  };

  const closeDialog = () => setIsOpen(false);

  return (
    <div>
      <Carousel>
        <CarouselContent className="p-4 gap-12">
          {imagesWebp.map((image, idx) => (
            <CarouselItem
              className="basis-full md:basis-1/4 overflow-hidden rounded-lg px-0"
              key={idx}>
              <picture>
                <source srcSet={image.src} type="image/webp" />
                <source srcSet={imagesJpg[idx].src} type="image/jpg" />
                <img
                  src={imagesJpg[idx].src}
                  alt={`Gallery ${idx + 1}`}
                  width={1024}
                  height={1024}
                  className="object-cover w-full h-full"
                  onClick={() => openDialog(idx)}
                />
              </picture>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Gallery;
