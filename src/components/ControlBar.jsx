import { useThemeStore } from "@/store/themeStore";
import {
  NavigationMenu,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/lib/utils";
import {
  AreaChart,
  CirclePlus,
  History,
  Home,
  Moon,
  Sun,
  UserRound,
} from "lucide-react";
import { THEME_TYPES } from "@/lib/constants";
import { AddOrEditTransaction } from "./add-or-edit-transaction/AddOrEditTransaction";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const ControlBar = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <NavigationMenu className="list-none gap-1 fixed backdrop-blur-xl bottom-8 border-2 border-solid rounded-lg p-2 [&_span]:leading-[1.8rem]">
      <NavigationMenuItem>
        <AddOrEditTransaction />
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
      <Separator orientation={"vertical"} className={"h-[24px]"} />
      <NavigationMenuItem>
        <Button
          onClick={() => {
            navigate("/");
          }}
          className={
            "md:gap-2 after:absolute after:h-2 flex after:bottom-2 after:bg-primary"
          }
          variant={"ghost"}
        >
          <Home />
          <span className="hidden md:inline self-center">Home</span>
        </Button>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <Button
          onClick={() => {
            navigate("auth");
          }}
          className={"md:gap-2"}
          variant={"ghost"}
        >
          <UserRound />
          <span className="hidden md:inline">Auth</span>
        </Button>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Button
          onClick={() => {
            navigate("analytics");
          }}
          className={"md:gap-2"}
          variant={"ghost"}
        >
          <AreaChart />
          <span className="hidden md:inline">Analytics</span>
        </Button>
      </NavigationMenuItem>
    </NavigationMenu>
  );
};

export default ControlBar;
