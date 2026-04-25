"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

export default function CallbackPage() {
  // const router = useRouter();
  // const params = useSearchParams();

  // useEffect(() => {
  //   const token = params.get("token");

  //   if (token) {
  //     Cookies.set("access_token", token, { expires: 7 });

  //     router.push("/client-home");
  //   } else {
  //     router.push("/");
  //   }
  // }, []);

  // return <p>Logging you in...</p>;
}
