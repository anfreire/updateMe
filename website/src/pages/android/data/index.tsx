import { ReactNode } from "react";
import UnlockSVG from "./unlock";
import VisibleSVG from "./visible";
import UpdatedSVG from "./update";

export interface AppData {
  title: string;
  description: string;
  icon: undefined | ReactNode;
}
export const appsData: AppData[] = [
  {
    title: "Unlock the Full Experience",
    description:
      "Discover a curated selection of your favorite apps with premium features unlocked. From ad-free YouTube to WhatsApp with enhanced privacy settings, our app brings you a carefully chosen collection for an elevated user experience.",
    icon: <UnlockSVG />,
  },
  {
    title: "Source Transparency",
    description:
      "We believe in transparency. Explore all the sources behind the modified apps in our collection. We provide clear information, giving you the power to make informed choices about the apps you use.",
    icon: <VisibleSVG />,
  },
  {
    title: "Stay Updated, Save Time",
    description:
      "No need to manually search for updates. Our app delivers the latest features and enhancements as soon as they are released. Save time and stay ahead with instant updates, so you can focus on what matters most.",
    icon: <UpdatedSVG />,
  },
];
