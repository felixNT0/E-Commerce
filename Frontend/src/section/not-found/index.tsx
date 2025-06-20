"use client";

import Button from "@/component/button";
import routes from "@/routes";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-[#216869]">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={() => router.back()}>go Back</Button>

          <p
            onClick={() => router.push(routes.app.contact)}
            className="text-sm font-semibold text-gray-900 w-full"
          >
            Contact support <span aria-hidden="true">&rarr;</span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
