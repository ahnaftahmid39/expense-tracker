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
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  useEffect(() => {
    if (!user) navigate(routes.auth);
  }, [user, navigate]);
  if (!user) return null;

  const handleLogOut = async () => {
    setIsLogoutLoading(true);
    await signOut(auth);
    setIsLogoutLoading(false);
  };

  return (
    <>
      <div className="container relative flex flex-row items-center justify-center lg:max-w-none sm:px-2 px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center ">
            <div className="flex flex-col space-y-2 text-center">
              <Button
                onClick={handleLogOut}
                variant="ghost"
                className={cn("ms-auto me-2")}
              >
                {isLogoutLoading && (
                  <LoaderCircle
                    className="animate-spin me-2"
                    size={16}
                    absoluteStrokeWidth={false}
                  />
                )}
                Logout
              </Button>
              <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                <img
                  width={120}
                  height={120}
                  className={cn(
                    "hover:animate-spin hover:duration-4000 cursor-pointer rounded-full "
                  )}
                  alt="profile picture of user"
                  src={user.photoURL}
                ></img>
                <span className="text-2xl flex flex-col font-semibold">
                  {user.displayName}
                  <p className="text-sm text-muted-foreground">
                    You are now authenticated!
                  </p>
                </span>
              </div>
              <pre className="w-[96vw] md:w-[50vw] text-left text-sm overflow-x-auto m-8 p-4">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
