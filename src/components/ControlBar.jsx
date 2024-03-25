import { useThemeStore } from "@/store/themeStore";
import {
  NavigationMenu,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/lib/utils";
import { CirclePlus, History, Moon, Sun, UserRound } from "lucide-react";
import { THEME_TYPES } from "@/lib/constants";

const ControlBar = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <NavigationMenu className="list-none gap-1 fixed backdrop-blur-xl bottom-8 border border-solid rounded-lg p-2">
      <NavigationMenuItem>
        <Button variant={"ghost"} className={"md:gap-2"}>
          <CirclePlus />
          <span className="hidden md:inline">Add</span>
        </Button>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Button className={"md:gap-2"} variant={"ghost"}>
          <History />
          <span className="hidden md:inline">History</span>
        </Button>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Button className={"md:gap-2"} onClick={toggleTheme} variant={"ghost"}>
          {theme === THEME_TYPES.DARK ? (
            <>
              <Moon />
              <span className="hidden md:block">
                {capitalizeFirstLetter(THEME_TYPES.DARK)}
              </span>
            </>
          ) : (
            <>
              <Sun />
              <span className="hidden md:inline">
                {capitalizeFirstLetter(THEME_TYPES.LIGHT)}
              </span>
            </>
          )}
        </Button>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Button className={"md:gap-2"} variant={"ghost"}>
          <UserRound />
          <span className="hidden md:inline">Auth</span>
        </Button>
      </NavigationMenuItem>
    </NavigationMenu>
  );
};

export default ControlBar;
