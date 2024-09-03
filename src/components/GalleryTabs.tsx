import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
interface ImageData {
  webPSrc: string;
  jpgSrc: string;
  alt?: string;
}

interface Tab {
  title: string;
  images: ImageData[];
}

interface TabsProps {
  tabsData: Tab[];
}
export function GalleryTabs({ tabsData }: TabsProps) {
  // const [activeTab, setActiveTab] = useState(0);
  return (
    <Tabs defaultValue={tabsData[0].title} className="w-full">
      <TabsList className="py-4 bg-transparent flex items-center mb-8">
        {tabsData.map((tab, idx) => (
          <TabsTrigger value={tab.title} className="text-base px-8 py-1" key={idx}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabsData.map((tab, idx) => (
        <TabsContent value={tab.title} key={idx} className="grid grid-cols-4 gap-4">
          {tab.images.map((image, imgIndex) => (
            <picture key={imgIndex} className="animate__animated animate__zoomIn">
              <source srcSet={image.webPSrc} type="image/webp" />
              <source srcSet={image.jpgSrc} type="image/jpeg" />
              <img src={image.jpgSrc} alt={image.alt} className="rounded-md overflow-hidden" />
            </picture>
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
}