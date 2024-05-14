import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { routes } from "@/lib/constants";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { LoaderCircle } from "lucide-react";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [logoutIsLoading, setLogoutIsLoading] = useState(false);

  useEffect(() => {
    if (!user) navigate(routes.auth);
  }, [user, navigate]);
  if (!user) return null;

  const handleLogout = async () => {
    setLogoutIsLoading(true);
    await signOut(auth);
    setLogoutIsLoading(false);
  };

  return (
    <>
      <div className="container relative h-[800px] flex flex-row items-center justify-center lg:max-w-none sm:px-2 px-0">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={cn("absolute right-4 top-4 md:right-8 md:top-8")}
        >
          {logoutIsLoading && (
            <LoaderCircle
              size={16}
              absoluteStrokeWidth={false}
              className="me-2 animate-spin"
            />
          )}
          Logout
        </Button>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <div className="flex justify-center self-center gap-2">
                <img
                  width={120}
                  height={120}
                  className={cn(
                    "hover:animate-spin hover:duration-4000 cursor-pointer rounded-full"
                  )}
                  alt="profile picture of user"
                  src={user.photoURL}
                ></img>
                <span className="text-2xl flex self-center flex-col font-semibold">
                  {user.displayName}
                  <p className="text-sm text-muted-foreground">
                    You are now authenticated!
                  </p>
                </span>
              </div>
              <pre className="w-[80vh] text-left text-sm overflow-x-auto p-2">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
