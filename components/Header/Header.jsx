import Link from "next/link";
import { AuthBtn, BarsBtn } from "./details";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { DashboardStudentsUrl, DashboardTeachersUrl } from "@/utils/router";
import { STUDENT_ROLE } from "@/utils/const";
import { useEffect } from "react";
import { getRolesFromLocal } from "@/redux/slice/settings";

export default function Header() {
  const router = useRouter();
  const isSidebar =
    router.asPath.startsWith("/login") || router.asPath.startsWith("/register");
  const { user_info, user_role } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRolesFromLocal());
  }, []);

  return (
    <header className="py-5 border-b border-gray-200 fixed top-0 left-0 w-full z-[1000] bg-white px-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <BarsBtn isSidebar={isSidebar} />
          <Link href={`/`}>
            <a
              role="link"
              className={`items-center gap-1 ${
                isSidebar ? "flex" : "xs:flex hidden "
              }`}
            >
              <img
                src="/images/logo.png"
                alt="classroom"
                title="classroom"
                className="w-20 sm:w-24"
              />
              {/* <span className="text-gray-700">Darstop Homeworks</span> */}
            </a>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`lang items-center flex bg-bg-2 rounded-full p-1 w-auto`}
          >
            <a
              href={`/uz/${router.asPath}`}
              title="uz"
              className={`w-10 h-10 flex rounded-full items-center justify-center ${
                router.locale == "uz" ? "bg-main text-white" : "text-primary"
              }`}
              locale={"uz"}
            >
              Uz
            </a>
            <a
              href={`/en/${router.asPath}`}
              title="en"
              className={`w-10 h-10 flex rounded-full items-center justify-center ${
                router.locale == "en" ? "bg-main text-white" : "text-primary"
              }`}
              locale={"en"}
            >
              En
            </a>
          </div>
          {user_info ? (
            <Link
              href={
                user_role == STUDENT_ROLE
                  ? `${DashboardStudentsUrl}`
                  : `${DashboardTeachersUrl}`
              }
            >
              <a role="link" className="flex items-center gap-2 cursor-pointer">
                <div className="flex flex-col items-end gap-0">
                  <h3 className="text-sm text-primary line-clamp-1 text-end">
                    {user_info?.name}
                  </h3>
                  <p className="text-xs text-gray-700">
                    {user_role ?? user_role}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              </a>
            </Link>
          ) : (
            // </Link>
            <AuthBtn />
          )}
        </div>
      </div>
    </header>
  );
}
