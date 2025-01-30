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
      <TabsList className="py-4 bg-transparent flex flex-wrap gap-4 h-auto justify-start">
        {tabsData.map((tab, idx) => (
          <TabsTrigger
            value={tab.title}
            className="sm:text-base text-sm py-1 text-neutral-600 px-0 min-w-20"
            key={idx}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabsData.map((tab, idx) => (
        <TabsContent
          value={tab.title}
          key={idx}
          className="mt-4 flex flex-col md:flex-row md:flex-wrap gap-x-8 gap-y-8 data-[state=inactive]:hidden">
          {tab.images.map((image, imgIndex) => (
            <picture key={imgIndex}>
              <source srcSet={image.webPSrc} type="image/webp" />
              <source srcSet={image.jpgSrc} type="image/jpeg" />
              <img
                src={image.jpgSrc}
                alt={image.alt}
                className="rounded-md overflow-hidden animate-fade-right w-full max-w-lg shadow-md"
              />
            </picture>
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
}
