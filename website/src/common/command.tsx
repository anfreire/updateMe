import { Tooltip } from "@nextui-org/react";
import { Clipboard, ClipboardCheck } from "lucide-react";
import React, { useState } from "react";

export interface CommandProps {
  command: string;
}

type ActiveType = 1 | 0;

const ClipboardIcon: Record<
  ActiveType,
  { component: React.FC<any>; className: string }
> = {
  1: {
    component: ClipboardCheck,
    className: "stroke-green-400",
  },
  0: {
    component: Clipboard,
    className: "stroke-current",
  },
};

export default function Command({ command }: CommandProps) {
  const [copied, setCopied] = useState<ActiveType>(0);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(1);
    setTimeout(() => {
      setCopied(0);
    }, 3000);
  };

  return (
    <div className="flex w-full max-w-fit flex-row items-center justify-between gap-1 rounded-md bg-gray-1/3 p-2">
      <p className="hide-scrollbar w-full overflow-x-scroll whitespace-nowrap font-mono text-base text-current">
        {command}
      </p>
      <Tooltip
        content="Copied!"
        color="success"
        placement="left"
        size="md"
        isOpen={copied === 1}
      >
        {React.createElement(ClipboardIcon[copied].component, {
          onClick: copyToClipboard,
          stroke: "currentColor",
          size: 24,
          className:
            ClipboardIcon[copied].className +
            " size-6 cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95",
        })}
      </Tooltip>
    </div>
  );
}
