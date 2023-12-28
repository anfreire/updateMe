import { useUrlParam } from "@/src/hooks/useURLParam";
import { ScrollShadow, Tab, Tabs } from "@nextui-org/react";
import { Suspense, lazy } from "react";
import { musicTabKeys, musicTabs } from "./data";

export default function MusicTabs() {
  const DynamicWindows = lazy(() => import("./variants/windows"));
  const DynamicMac = lazy(() => import("./variants/mac"));
  const DynamicLinux = lazy(() => import("./variants/linux"));
  const { value: active, update: setActive } = useUrlParam("active");

  return (
    <>
      <div className="mt-4 flex w-full flex-col items-center justify-center md:mt-5 lg:mt-6 xl:mt-7">
        <Tabs
          onSelectionChange={(key: any) => setActive(key)}
          selectedKey={active ?? "windows"}
          size="lg"
          color="primary"
          variant="light"
        >
          {musicTabKeys.map((tab) => (
            <Tab
              key={tab}
              className="sm:px-3 sm:py-5 md:px-4 md:py-6 xl:px-5 xl:py-7"
              title={
                <div className="flex items-center space-x-2">
                  {musicTabs[tab].icon}
                  <span className="text-lg sm:text-xl md:text-2xl xl:text-3xl">
                    {musicTabs[tab].title}
                  </span>
                </div>
              }
            />
          ))}
        </Tabs>
      </div>
      <Suspense>
        <ScrollShadow className="h-full w-full">
          {active == "linux" ? (
            <DynamicLinux />
          ) : active == "mac" ? (
            <DynamicMac />
          ) : (
            <DynamicWindows />
          )}
        </ScrollShadow>
      </Suspense>
    </>
  );
}
