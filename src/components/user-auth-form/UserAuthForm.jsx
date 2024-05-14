import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithPopup } from "firebase/auth";
import { auth, githubProvider, googleProvider } from "../../../firebase-config";
import { toast, useToast } from "../ui/use-toast";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

// response for google
// {
//   "user": {
//       "uid": "XpArKwn70aV6B3XhsKmpk5NBC4y2",
//       "email": "ahnaf.24csedu.039@gmail.com",
//       "emailVerified": true,
//       "displayName": "Ahnaf Tahmid",
//       "isAnonymous": false,
//       "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocKRIDb9U1HP3XfwM7vVvKpKxntujtWG-9GC-c1dDgDZh7l0rv9m=s96-c",
//       "providerData": [
//           {
//               "providerId": "google.com",
//               "uid": "112982530130611015044",
//               "displayName": "Ahnaf Tahmid",
//               "email": "ahnaf.24csedu.039@gmail.com",
//               "phoneNumber": null,
//               "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocKRIDb9U1HP3XfwM7vVvKpKxntujtWG-9GC-c1dDgDZh7l0rv9m=s96-c"
//           }
//       ],
//       "stsTokenManager": {
//           "refreshToken": "AMf-vByBctgjlhg0QbwqU1InQR_RN3iE8RX8uO0Thtk-JqzZXyLrs-zVUu-oxcSrXTxRizEPc01YFpWzyAJEttGpuXRMLjq0P1tMpp1s11yzB72ozJ0VDaohIRDGfEOhxgX76xwPGdk8zaIq_A7ho8rrzKZMqLAs525fEANYmUes25nP9edQoio7jpNmv22vpO1awiVqq-8rxJQ0cMP5nNfI4AZx3413xtaTTDxMBf9WLaTfUCvDVZWYdXHTGbmkF-upTBtbj7LGGC0Hh6KjzVKACPNJNcB3sIUBQLAH7dca5BeHfV7_mHEG2SC7aKwXI57h8fW2P1M6Q8jwB2IFL15ChUnoxtYCrfd-yRTb-h3WxdnrESl2d4pwg-XqLNvjTb_OdwGN7R9ctFk9H9-q_PF1jcVZ30EyEH_B-8bfw67XGjmFPZniOyga6lHrw9lVx0QCtUk0ZknUvWRVeDvgRt5u38pk2rnLrg",
//           "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUyYjIyZmQ0N2VkZTY4MmY2OGZhY2NmZTdjNGNmNWIxMWIxMmI1NGIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQWhuYWYgVGFobWlkIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tSSURiOVUxSFAzWGZ3TTd2VnZLcEt4bnR1anRXRy05R0MtYzFkRGdEWmg3bDBydjltPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2V4cGVuc2UtdHJhY2tlci1haG5hZiIsImF1ZCI6ImV4cGVuc2UtdHJhY2tlci1haG5hZiIsImF1dGhfdGltZSI6MTcxNTY3MzMzNywidXNlcl9pZCI6IlhwQXJLd243MGFWNkIzWGhzS21wazVOQkM0eTIiLCJzdWIiOiJYcEFyS3duNzBhVjZCM1hoc0ttcGs1TkJDNHkyIiwiaWF0IjoxNzE1NjczMzM3LCJleHAiOjE3MTU2NzY5MzcsImVtYWlsIjoiYWhuYWYuMjRjc2VkdS4wMzlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTI5ODI1MzAxMzA2MTEwMTUwNDQiXSwiZW1haWwiOlsiYWhuYWYuMjRjc2VkdS4wMzlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.duis4EC653aFOWPj0cZQTkXUR1pJxODcdcXdeBxZXylK30CAUY6xUs3IIWM6qb4WhKkm4B4A7SMZ66aESwpB83l7DjminPnmpn_ORcnCnRTMpzVFKT2OJJcT3_Qp_9-CKcNpN_GPuAiiOdtyRO8DFMqOxVXtxIJtBxe6kV7EdwH6M_o7TbcZEhRuMo9rs7flByBKsUl_-4ly4kjV6mC_YpaGKaaxCBNbm6IX_RnV0QTCBamFeo0TzURNOe2_jJ11itws78HHn_ymdtsJKRss7WAiZ7k8cZ15M6m3qO8MeyTq7l8cu5qvMASWRqQFR_Q3kH6Kms-r4cY64nxyKf5d5Q",
//           "expirationTime": 1715676937758
//       },
//       "createdAt": "1715673337309",
//       "lastLoginAt": "1715673337309",
//       "apiKey": "AIzaSyDuvI0lG8WoEI5vvKbqlEMHqlgMx3Mkyfk",
//       "appName": "[DEFAULT]"
//   },
//   "providerId": "google.com",
//   "_tokenResponse": {
//       "federatedId": "https://accounts.google.com/112982530130611015044",
//       "providerId": "google.com",
//       "email": "ahnaf.24csedu.039@gmail.com",
//       "emailVerified": true,
//       "firstName": "Ahnaf",
//       "fullName": "Ahnaf Tahmid",
//       "lastName": "Tahmid",
//       "photoUrl": "https://lh3.googleusercontent.com/a/ACg8ocKRIDb9U1HP3XfwM7vVvKpKxntujtWG-9GC-c1dDgDZh7l0rv9m=s96-c",
//       "localId": "XpArKwn70aV6B3XhsKmpk5NBC4y2",
//       "displayName": "Ahnaf Tahmid",
//       "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUyYjIyZmQ0N2VkZTY4MmY2OGZhY2NmZTdjNGNmNWIxMWIxMmI1NGIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQWhuYWYgVGFobWlkIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tSSURiOVUxSFAzWGZ3TTd2VnZLcEt4bnR1anRXRy05R0MtYzFkRGdEWmg3bDBydjltPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2V4cGVuc2UtdHJhY2tlci1haG5hZiIsImF1ZCI6ImV4cGVuc2UtdHJhY2tlci1haG5hZiIsImF1dGhfdGltZSI6MTcxNTY3MzMzNywidXNlcl9pZCI6IlhwQXJLd243MGFWNkIzWGhzS21wazVOQkM0eTIiLCJzdWIiOiJYcEFyS3duNzBhVjZCM1hoc0ttcGs1TkJDNHkyIiwiaWF0IjoxNzE1NjczMzM3LCJleHAiOjE3MTU2NzY5MzcsImVtYWlsIjoiYWhuYWYuMjRjc2VkdS4wMzlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTI5ODI1MzAxMzA2MTEwMTUwNDQiXSwiZW1haWwiOlsiYWhuYWYuMjRjc2VkdS4wMzlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.duis4EC653aFOWPj0cZQTkXUR1pJxODcdcXdeBxZXylK30CAUY6xUs3IIWM6qb4WhKkm4B4A7SMZ66aESwpB83l7DjminPnmpn_ORcnCnRTMpzVFKT2OJJcT3_Qp_9-CKcNpN_GPuAiiOdtyRO8DFMqOxVXtxIJtBxe6kV7EdwH6M_o7TbcZEhRuMo9rs7flByBKsUl_-4ly4kjV6mC_YpaGKaaxCBNbm6IX_RnV0QTCBamFeo0TzURNOe2_jJ11itws78HHn_ymdtsJKRss7WAiZ7k8cZ15M6m3qO8MeyTq7l8cu5qvMASWRqQFR_Q3kH6Kms-r4cY64nxyKf5d5Q",
//       "context": "",
//       "oauthAccessToken": "ya29.a0AXooCgsUXQlFefF3yjLSCUwNdaZHzzn0Foq6GYgn3weza-jN9_j4WP3f81JdOpmgjEKOhVey_kmiJVwu1V2g0Tg0iXqoWBabqP8HLjxqQ7EXrsBOJe4CkuqMCi7222ZinGPiSkhPYDFDTWYHqHWyzvrPvS_IgKTjEJCuaCgYKAS0SARASFQHGX2MiRd7xzEWCxSQSgt1jevm9GQ0171",
//       "oauthExpireIn": 3599,
//       "refreshToken": "AMf-vByBctgjlhg0QbwqU1InQR_RN3iE8RX8uO0Thtk-JqzZXyLrs-zVUu-oxcSrXTxRizEPc01YFpWzyAJEttGpuXRMLjq0P1tMpp1s11yzB72ozJ0VDaohIRDGfEOhxgX76xwPGdk8zaIq_A7ho8rrzKZMqLAs525fEANYmUes25nP9edQoio7jpNmv22vpO1awiVqq-8rxJQ0cMP5nNfI4AZx3413xtaTTDxMBf9WLaTfUCvDVZWYdXHTGbmkF-upTBtbj7LGGC0Hh6KjzVKACPNJNcB3sIUBQLAH7dca5BeHfV7_mHEG2SC7aKwXI57h8fW2P1M6Q8jwB2IFL15ChUnoxtYCrfd-yRTb-h3WxdnrESl2d4pwg-XqLNvjTb_OdwGN7R9ctFk9H9-q_PF1jcVZ30EyEH_B-8bfw67XGjmFPZniOyga6lHrw9lVx0QCtUk0ZknUvWRVeDvgRt5u38pk2rnLrg",
//       "expiresIn": "3600",
//       "oauthIdToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImEzYjc2MmY4NzFjZGIzYmFlMDA0NGM2NDk2MjJmYzEzOTZlZGEzZTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTI3NTQ4MDk3MzQwLXA4NTd1YjZkaHY3bjdrbmxra2o2ZGhoNnVyMjFhc3ByLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTI3NTQ4MDk3MzQwLXA4NTd1YjZkaHY3bjdrbmxra2o2ZGhoNnVyMjFhc3ByLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEyOTgyNTMwMTMwNjExMDE1MDQ0IiwiZW1haWwiOiJhaG5hZi4yNGNzZWR1LjAzOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Im9ZQ09DazNRamFLVzl1WW9PY2FPc1EiLCJpYXQiOjE3MTU2NzMzMzcsImV4cCI6MTcxNTY3NjkzN30.Y_zrHGzOIq6ifWFeR5-tFl-kaukXvTRQO6YIlq-k1HOPz8tAz3dTmYvmHjX0YzSvNFgmhv5Z16dtTYBh7z9ulMcNa-l-HgN7UWpEbxEtoUc9hzLMZkaJBxrc0XWKYUOwXzBYstvNVR6kK0tq-Gb5eGS_VhkS_fL1s3s1TMfDoLESON2ChDkh_dAseJFhUbUMrAZIXpVBXp_elDvvcUGIJKczWnk8faYES8_L8lrBawF902ONvbVmxsu2g1QWgc3-VI1AxUzppXKUkJfBrTxAK7_cnLGODncJkChBDeWmxcnRWuJyT4k4xbq8Iwfd_ekWeWSU7sDpyTxNIGxjU8rkOg",
//       "rawUserInfo": "{\"name\":\"Ahnaf Tahmid\",\"granted_scopes\":\"openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email\",\"id\":\"112982530130611015044\",\"verified_email\":true,\"given_name\":\"Ahnaf\",\"locale\":\"en\",\"family_name\":\"Tahmid\",\"email\":\"ahnaf.24csedu.039@gmail.com\",\"picture\":\"https://lh3.googleusercontent.com/a/ACg8ocKRIDb9U1HP3XfwM7vVvKpKxntujtWG-9GC-c1dDgDZh7l0rv9m=s96-c\"}",
//       "isNewUser": true,
//       "kind": "identitytoolkit#VerifyAssertionResponse"
//   },
//   "operationType": "signIn"
// }

export function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  const { toast } = useToast();

  const signInWithProvider = async (providerName) => {
    try {
      setIsLoading(true);
      if (providerName === "google") {
        await signInWithPopup(auth, googleProvider);
      }
      if (providerName === "github") {
        await signInWithPopup(auth, githubProvider);
      }
    } catch (e) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = () => {
    signInWithProvider("google");
  };
  const signInWithGithub = () => {
    signInWithProvider("github");
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="#0PassworD0#"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          onClick={signInWithGithub}
          variant="outline"
          type="button"
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          GitHub
        </Button>
        <Button
          variant="outline"
          onClick={signInWithGoogle}
          type="button"
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
      </div>
    </div>
  );
}
