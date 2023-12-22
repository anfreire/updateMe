import {
  Divider,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import NavBarLogo from "./components/logo";
import { useState } from "react";
import { Search } from "lucide-react";
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
    icon: (
      <IoLogoAndroid
        style={{
          color: "#3ddc85",
        }}
        size={36}
      />
    ),
    description: "Official Update Me Android App",
  },
  {
    title: "Ad-Exterminator",
    route: "/adblock",
    icon: (
      <RiAdvertisementFill
        size={30}
        style={{
          marginRight: "6px",
          color: "#ff0000",
        }}
      />
    ),
    description: "Block ads on your browser and your devices",
  },
  {
    title: "Drop the Beat",
    route: "/music",
    icon: (
      <BsMusicNoteList
        size={29}
        style={{
          color: "#de38ff",
          marginRight: "7px",
        }}
      />
    ),
    description: "Unlock Spotify Premium on all your devices",
  },
  {
    title: "Netflix and Chill",
    route: "/cinema",
    icon: (
      <LuPopcorn
        size={30}
        style={{
          color: "#fff568",
          marginRight: "6px",
        }}
      />
    ),
    description: "Collection of websites to watch Movies and TV Shows",
  },
  {
    title: "Activate my OS",
    route: "/microsoft",
    icon: (
      <FaWindows
        size={29}
        style={{
          color: "#38b6ff",
          marginRight: "7px",
        }}
      />
    ),
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
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden"></NavbarMenuToggle>
        <NavbarBrand className="hidden sm:flex">
          <NavBarLogo />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent as="div" justify="center">
        <Input
          classNames={{
            base: "max-w-full h-10 ml-2 sm:ml-0",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search"
          size="sm"
          startContent={<Search size={18} />}
          type="search"
        />
      </NavbarContent>
      <NavbarContent className="hidden sm:flex" justify="end">
        <NavbarMenuToggle></NavbarMenuToggle>
      </NavbarContent>
      <NavbarMenu className="mt-2 gap-6 sm:mt-6">
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
