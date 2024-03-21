import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardWithForm } from "@/components/CardWithForm";
import { useThemeStore } from "./store/themeStore";

function App() {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <>
      <div className="flex flex-col text-center gap-4 items-center justify-center container h-dvh">
        <Button onClick={toggleTheme}>ChangeTheme</Button>
        <CardWithForm />
      </div>
    </>
  );
}

export default App;
