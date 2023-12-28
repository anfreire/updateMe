import { FaWindows } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaLinux } from "react-icons/fa";

export type TabType = "mac" | "linux" | "windows";

export const musicTabs: Record<
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

export const musicTabKeys: TabType[] = Object.keys(musicTabs) as TabType[];

export const tabData: Record<
  TabType,
  {
    features: string[];
    command: string;
  }
> = {
  mac: {
    features: [
      "Block all audio, banner & video ads",
      "Block logging",
      "Enable developer mode",
      "Enable experimental features",
      "Hide audiobooks, episodes & podcasts on home screen",
      "Remove lyrics background color",
      "Block automatic updates",
      "Install supported desktop client versions",
    ],
    command: "bash <(curl -sSL https://spotx-official.github.io/run.sh)",
  },
  linux: {
    features: [
      "Block all audio, banner & video ads",
      "Block logging",
      "Enable developer mode",
      "Enable experimental features",
      "Hide audiobooks, episodes & podcasts on home screen",
      "Remove lyrics background color",
      "Install latest desktop client on APT-based distros",
    ],
    command: "bash <(curl -sSL https://spotx-official.github.io/run.sh)",
  },
  windows: {
    features: [
      "Blocks all banner, video and audio ads in the client",
      "Disabled Sentry (Prevented Sentry from sending console log/error/warning to Spotify developers)",
      "Disabled logging (Stopped various elements to log user interaction)",
      "Removed RTL rules (Removed all right-to-left CSS rules to simplify CSS files)",
      "Code minification",
    ],
    command:
      "[Net.ServicePointManager]::SecurityProtocol = 3072; iex \"& { $(iwr -useb 'https://spotx-official.github.io/run.ps1') } -confirm_uninstall_ms_spoti -confirm_spoti_recomended_over -podcasts_off -block_update_on -start_spoti -new_theme -adsections_off -lyrics_stat spotify\"",
  },
};
