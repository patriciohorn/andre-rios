import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
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
export function BreastLiftTabs({ tabsData }: TabsProps) {
  return (
    <Tabs defaultValue={tabsData[0].title} className="w-full">
      <TabsList className="mb-4 bg-transparent flex flex-wrap gap-4 sm:items-center items-start h-auto">
        {tabsData.map((tab, idx) => (
          <TabsTrigger
            value={tab.title}
            className="sm:text-base text-sm sm:px-8 px-4 py-1"
            key={idx}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabsData.map((tab, idx) => (
        <TabsContent
          value={tab.title}
          key={idx}
          className="grid justify-center gap-x-4">
          {tab.images.map((image, imgIndex) => (
            <picture key={imgIndex}>
              <source srcSet={image.webPSrc} type="image/webp" />
              <source srcSet={image.jpgSrc} type="image/jpeg" />
              <img
                src={image.jpgSrc}
                alt={image.alt}
                className="rounded-md overflow-hidden animate-fade-right max-w-auto md:max-w-sm mx-auto"
              />
            </picture>
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
}
