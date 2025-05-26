import Link from "next/link";
import { AuthBtn, BarsBtn } from "./details";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Header() {
  const router = useRouter();
  const isSidebar =
    router.asPath.startsWith("/login") || router.asPath.startsWith("/register");
  const { user_info, user_role } = useSelector((state) => state.settings);

  return (
    <header className="py-5 border-b border-gray-200 fixed top-0 left-0 w-full z-[1000] bg-white">
      <div className="container">
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
                  src="https://www.gstatic.com/classroom/logo_square_rounded.svg"
                  alt="classroom"
                  title="classroom"
                  className="w-6"
                />
                <span className="text-gray-700">Darstop Homeworks</span>
              </a>
            </Link>
          </div>
          {user_info ? (
            <Link href={`/dashboard/user/settings`}>
              <a role="link" className="flex items-center gap-2">
                <div className="flex flex-col items-end gap-0">
                  <h3 className="text-sm text-primary line-clamp-1 text-end">{user_info?.name}</h3>
                  <p className="text-xs text-gray-700">
                    {user_role ?? user_role}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              </a>
            </Link>
          ) : (
            <AuthBtn />
          )}
        </div>
      </div>
    </header>
  );
}
