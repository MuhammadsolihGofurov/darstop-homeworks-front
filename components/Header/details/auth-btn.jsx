import Link from "next/link";
import React from "react";
import { useIntl } from "react-intl";

export default function AuthBtn() {
  const isAuth = false;
  const intl = useIntl();

  return (
    <div className="flex items-center gap-5">
      <Link href={"/register"}>
        <a role="link">{intl.formatMessage({ id: "register" })}</a>
      </Link>
      <Link href={`/login`}>
        <a
          role="link"
          className="flex items-center justify-center bg-accent rounded-md px-5 py-2 font-medium text-base text-white hover:bg-main transition-colors duration-200"
        >
          {intl.formatMessage({ id: "login" })}
        </a>
      </Link>
    </div>
  );
}
