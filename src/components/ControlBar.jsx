import { useThemeStore } from "@/store/themeStore";
import {
  NavigationMenu,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import {
  AreaChart,
  Database,
  Home,
  List,
  Moon,
  Sun,
  UserRound,
} from "lucide-react";
import { THEME_TYPES, mockTransactions, routes } from "@/lib/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import AddTransaction from "./add-or-edit-transaction/AddTransaction";
import { useTransactionStore } from "@/store/transactionStore";
import { useState } from "react";

const ControlBar = ({ className = "" }) => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const addMockTransactions = useTransactionStore(
    (state) => state.addMockTransactions
  );
  const removeMockTransactions = useTransactionStore(
    (state) => state.removeMockTransactions
  );

  const [hasMockTransactions, setHasMockTransactions] = useState(false);
  const handleMockToggle = () => {
    if (hasMockTransactions) {
      removeMockTransactions();
    } else {
      addMockTransactions(mockTransactions);
    }
    setHasMockTransactions((prev) => !prev);
  };

  return (
    <div className={cn("sticky bottom-4 ", className)}>
      <NavigationMenu
        className={
          "list-none gap-0 bg-background border shadow border-solid rounded-lg p-1 [&_button]:px-3 md:[&_button]:px-4"
        }
      >
        <NavigationMenuItem>
          <AddTransaction />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button
            className={"md:gap-2"}
            onClick={toggleTheme}
            variant={"ghost"}
          >
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

        {/* <NavigationMenuItem>
          <Button
            className={"md:gap-2"}
            onClick={handleMockToggle}
            variant={"ghost"}
          >
            <Database />
            <span className="hidden md:inline">
              {capitalizeFirstLetter("Toggle Mock")}
            </span>
          </Button>
        </NavigationMenuItem> */}

        <Separator orientation={"vertical"} className={"h-[24px]"} />
        <NavigationMenuItem>
          <Button
            onClick={() => {
              navigate("/");
            }}
            className={cn(
              "md:gap-2 after:absolute after:h-2 flex after:bottom-2 after:bg-primary",
              pathname === routes.home
                ? // 0 1px 0 0 red
                  "text-primary"
                : ""
            )}
            variant={"ghost"}
          >
            <Home />
            <span className="hidden md:inline self-center">Home</span>
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button
            onClick={() => {
              navigate("/all");
            }}
            className={cn(
              "md:gap-2 flex",
              pathname === routes.all ? "text-primary" : ""
            )}
            variant={"ghost"}
          >
            <List />
            <span className="hidden md:inline self-center">View All</span>
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button
            onClick={() => {
              navigate("auth");
            }}
            className={cn(
              "md:gap-2",
              pathname === routes.auth ? "text-primary" : ""
            )}
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
            className={cn(
              "md:gap-2",
              pathname === routes.analytics ? "text-primary" : ""
            )}
            variant={"ghost"}
          >
            <AreaChart />
            <span className="hidden md:inline">Analytics</span>
          </Button>
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  );
};

export default ControlBar;
