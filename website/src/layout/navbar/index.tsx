import {
  Divider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import NavBarLogo from "./components/logo";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoLogoAndroid } from "react-icons/io";
import { RiAdvertisementFill } from "react-icons/ri";
import { LuPopcorn } from "react-icons/lu";
import { BsMusicNoteList } from "react-icons/bs";
import { FaWindows } from "react-icons/fa";

const menuItems = [
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

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Navbar
      isBordered
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
    >
      <NavbarContent justify="start">
<NavbarBrand>
      <NavBarLogo />
      </NavbarBrand>
        </NavbarContent>
          <NavbarContent justify="end">
        <NavbarMenuToggle />
        </NavbarContent>
      <NavbarMenu className="gap-6 overflow-y-auto">
          {menuItems.map((item, index) => (
            <div key={index}>
              <Link to={item.route}>
                <NavbarMenuItem
                onClick={() => setIsMenuOpen(false)}
                className="flex w-full flex-col items-start gap-2"
              >
                  <div className="text-x flex w-full flex-row items-center gap-2">
                    {item.icon}
                    {item.title}
                    {item.title === "Android App" && (
                      <span className="text-sm text-red-600">NEW</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </NavbarMenuItem>
              </Link>
              {index !== menuItems.length - 1 && (
                <Divider key={item.title} className="mt-6 w-full opacity-30" />
              )}
            </div>
          ))}
        </NavbarMenu>
    </Navbar>
  );
}
