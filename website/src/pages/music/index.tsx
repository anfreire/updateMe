import { useUrlParam } from "@/src/hooks/useURLParam";
import { ScrollShadow, Tab, Tabs } from "@nextui-org/react";
import React, { Suspense, useEffect } from "react";
import { FaWindows } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaLinux } from "react-icons/fa";

type TabType = "mac" | "linux" | "windows";

const AllTabs: TabType[] = ["windows", "mac", "linux"] as const;

const tabs: Record<
  TabType,
  {
    title: string;
    icon: JSX.Element;
  }
> = {
  windows: {
    title: "Windows",
    icon: <FaWindows className="size-5 sm:size-6 md:size-7 xl:size-8" />,
  },
  mac: {
    title: "Mac OS",
    icon: <FaApple className="size-5 sm:size-6 md:size-7 xl:size-8" />,
  },
  linux: {
    title: "Linux",
    icon: <FaLinux className="size-5 sm:size-6 md:size-7 xl:size-8" />,
  },
};

export default function MusicTabs() {
  const DynamicWindows = React.lazy(() => import("./variants/windows"));
  const DynamicMac = React.lazy(() => import("./variants/mac"));
  const DynamicLinux = React.lazy(() => import("./variants/linux"));
  const { value: active, update: setActive } = useUrlParam("active");
  useEffect(() => {
    console.log("MusicTabs", active);
  }, [active]);
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
          {AllTabs.map((tab: TabType) => (
            <Tab
              key={tab}
              className="sm:px-3 sm:py-5 md:px-4 md:py-6 xl:px-5 xl:py-7"
              title={
                <div className="flex items-center space-x-2">
                  {tabs[tab].icon}
                  <span className="text-lg sm:text-xl md:text-2xl xl:text-3xl">
                    {tabs[tab].title}
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
