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
  const imagesWebp = [
    gallery1Webp,
    gallery2Webp,
    gallery3Webp,
    gallery4Webp,
    gallery5Webp,
    gallery6Webp
  ];

  const openDialog = (index: number) => {
    setSelectedImage(index);
    setIsOpen(true);
  };

  console.log(selectedImage);

  return (
    <div>
      <Carousel
        opts={{
          align: 'center',

          breakpoints: {
            '(min-width: 768px)': { align: 'center', loop: true }
          }
        }}
        className="-mr-4">
        <CarouselContent className="ml-2">
          {imagesWebp.map((image, idx) => (
            <CarouselItem
              className="basis-1/2 md:basis-1/4 overflow-hidden rounded-lg relative group hover:cursor-zoom-in px-0 mr-4 sm:mr-8"
              key={idx}
              onClick={() => openDialog(idx)}>
              <picture className="">
                <source srcSet={image.src} type="image/webp" />
                <source srcSet={imagesJpg[idx].src} type="image/jpg" />
                <img
                  src={imagesJpg[idx].src}
                  alt={`Gallery ${idx + 1}`}
                  width={1024}
                  height={1024}
                  className="object-cover w-full h-full aspect-[14/13] rounded-md"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-black opacity-0 group-hover:opacity-40 transition-opacity rounded-md"></div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="border-none bg-transparent text-primary-500">
          <Carousel
            opts={{
              loop: true,
              startIndex: selectedImage
            }}>
            <CarouselContent>
              {imagesWebp.map((image, idx) => (
                <CarouselItem className="basis-full rounded-md overflow-hidden" key={idx}>
                  <picture>
                    <source srcSet={image.src} type="image/webp" />
                    <source srcSet={imagesJpg[idx].src} type="image/jpg" />
                    <img
                      src={imagesJpg[idx].src}
                      alt={`Gallery ${idx + 1}`}
                      width={1024}
                      height={1024}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </picture>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hover:text-primary-500/80" />
            <CarouselNext className="hover:text-primary-500/80" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
