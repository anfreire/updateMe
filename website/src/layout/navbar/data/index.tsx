import { IoLogoAndroid } from "react-icons/io";
import { RiAdvertisementFill } from "react-icons/ri";
import { LuPopcorn } from "react-icons/lu";
import { BsMusicNoteList } from "react-icons/bs";
import { FaWindows } from "react-icons/fa";

export const menuItems = [
  {
    title: "Android App",
    route: "/android",
    icon: <IoLogoAndroid className="mr-1 size-8 fill-green-500" />,
    description: "Official Update Me Android App",
  },
  {
    title: "Ad-Exterminator",
    route: "/adblock",
    icon: <RiAdvertisementFill className="mr-2 size-7 fill-red-500" />,
    description: "Block ads on your browser and your devices",
  },
  {
    title: "Drop the Beat",
    route: "/music",
    icon: <BsMusicNoteList className="mr-2 size-7 fill-purple-500" />,
    description: "Unlock Spotify Premium on all your devices",
  },
  {
    title: "Netflix and Chill",
    route: "/cinema",
    icon: <LuPopcorn className="mr-2 size-7 stroke-yellow-400" />,
    description: "Collection of websites to watch Movies and TV Shows",
  },
  {
    title: "Activate my OS",
    route: "/microsoft",
    icon: <FaWindows className="mr-2 size-7 fill-blue-400" />,
    description: "Activate and Upgrade your Windows and Microsoft Office",
  },
];
