import {
  getRolesFromLocal,
  setUserInfo,
  toggleOffanvas,
} from "@/redux/slice/settings";
import {
  LOCAL_PRIVATE_ROLE,
  LOCAL_PRIVATE_TOKEN,
  STUDENT_ROLE,
  TEACHER_ROLE,
} from "@/utils/const";
import {
  AssignmentStudentUrl,
  AssignmentTeacherUrl,
  DashboardStudentsUrl,
  DashboardTeachersUrl,
  NotificationsUrl,
  SubmissionsViewStudentUrl,
} from "@/utils/router";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function SideBar() {
  const intl = useIntl();
  const router = useRouter();
  const dispatch = useDispatch();
  const { offcanvas, user_role } = useSelector((state) => state.settings);

  const menu = [
    {
      id: 1,
      title: "Home",
      url:
        user_role == STUDENT_ROLE
          ? `${DashboardStudentsUrl}`
          : `${DashboardTeachersUrl}`,
      forRole: "all",
      icon: `<svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.07324 9.78973L12.0732 2.78973L21.0732 9.78973V20.7897C21.0732 21.3202 20.8625 21.8289 20.4875 22.2039C20.1124 22.579 19.6037 22.7897 19.0732 22.7897H5.07324C4.54281 22.7897 4.0341 22.579 3.65903 22.2039C3.28396 21.8289 3.07324 21.3202 3.07324 20.7897V9.78973Z" stroke="#5F6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.07324 22.7897V12.7897H15.0732V22.7897" stroke="#5F6368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `,
    },
    {
      id: 2,
      title: "notifications",
      url: `${NotificationsUrl}`,
      forRole: "all",
      icon: `<svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.9111 8.89691C18.9111 7.30561 18.279 5.77949 17.1538 4.65427C16.0286 3.52905 14.5024 2.89691 12.9111 2.89691C11.3198 2.89691 9.79371 3.52905 8.66849 4.65427C7.54327 5.77949 6.91113 7.30561 6.91113 8.89691C6.91113 15.8969 3.91113 17.8969 3.91113 17.8969H21.9111C21.9111 17.8969 18.9111 15.8969 18.9111 8.89691Z" stroke="#5F6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.6412 21.8969C14.4653 22.2 14.213 22.4516 13.9094 22.6264C13.6058 22.8013 13.2615 22.8934 12.9112 22.8934C12.5608 22.8934 12.2165 22.8013 11.9129 22.6264C11.6093 22.4516 11.357 22.2 11.1812 21.8969" stroke="#5F6368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `,
    },
    {
      id: 3,
      title: "my-assignments",
      url: AssignmentTeacherUrl,
      forRole: TEACHER_ROLE,
      icon: `<svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.58398 19.9882C4.58398 19.3251 4.84738 18.6892 5.31622 18.2204C5.78506 17.7516 6.42094 17.4882 7.08398 17.4882H20.584" stroke="#5F6368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.08398 2.48816H20.584V22.4882H7.08398C6.42094 22.4882 5.78506 22.2248 5.31622 21.7559C4.84738 21.2871 4.58398 20.6512 4.58398 19.9882V4.98816C4.58398 4.32512 4.84738 3.68923 5.31622 3.22039C5.78506 2.75155 6.42094 2.48816 7.08398 2.48816Z" stroke="#5F6368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `,
    },
    {
      id: 4,
      title: "my-assignments",
      url: AssignmentStudentUrl,
      forRole: STUDENT_ROLE,
      icon: `<svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.58398 19.9882C4.58398 19.3251 4.84738 18.6892 5.31622 18.2204C5.78506 17.7516 6.42094 17.4882 7.08398 17.4882H20.584" stroke="#5F6368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.08398 2.48816H20.584V22.4882H7.08398C6.42094 22.4882 5.78506 22.2248 5.31622 21.7559C4.84738 21.2871 4.58398 20.6512 4.58398 19.9882V4.98816C4.58398 4.32512 4.84738 3.68923 5.31622 3.22039C5.78506 2.75155 6.42094 2.48816 7.08398 2.48816Z" stroke="#5F6368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `,
    },
    {
      id: 5,
      title: "my-submissions",
      url: SubmissionsViewStudentUrl,
      forRole: STUDENT_ROLE,
      icon: `<svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.58398 19.9882C4.58398 19.3251 4.84738 18.6892 5.31622 18.2204C5.78506 17.7516 6.42094 17.4882 7.08398 17.4882H20.584" stroke="#5F6368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.08398 2.48816H20.584V22.4882H7.08398C6.42094 22.4882 5.78506 22.2248 5.31622 21.7559C4.84738 21.2871 4.58398 20.6512 4.58398 19.9882V4.98816C4.58398 4.32512 4.84738 3.68923 5.31622 3.22039C5.78506 2.75155 6.42094 2.48816 7.08398 2.48816Z" stroke="#5F6368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `,
    },
  ];

  const toggleOffcanvasFn = () => {
    if (window.innerWidth < 992) {
      dispatch(toggleOffanvas());
    }
  };

  const logOut = () => {
    localStorage.removeItem(LOCAL_PRIVATE_TOKEN);
    localStorage.removeItem(LOCAL_PRIVATE_ROLE);
    dispatch(setUserInfo(null));
    toast.success(intl.formatMessage({ id: "success" }));

    setTimeout(() => {
      router.push("/login");
    }, 500);
  };

  useEffect(() => {
    dispatch(getRolesFromLocal());
  }, []);

  return (
    <div
      className={`border-r border-r-gray-200 h-screen fixed top-0 left-0  ${
        offcanvas
          ? "lg:opacity-100 opacity-100 top-0 left-0 z-[99] lg:w-1/5 w-full lg:bg-white bg-black lg:bg-opacity-100 bg-opacity-10"
          : "lg:opacity-100 opacity-0 z-[-1] lg:z-0 lg:w-1/5 w-full lg:bg-white"
      }`}
    >
      <div
        className={`flex flex-col justify-between pb-5 gap-4 bg-white transition-all duration-150 h-full w-[320px] lg:w-full px-5 pt-24 ${
          offcanvas ? "translate-x-0" : "lg:translate-x-0 -translate-x-full "
        }`}
      >
        <div className="flex flex-col gap-4">
          {menu.map((item, index) => {
            if (item.forRole === "all" || item.forRole === user_role) {
              return (
                <Link href={item.url} key={index}>
                  <a
                    role="link"
                    onClick={() => toggleOffcanvasFn()}
                    className={`flex items-center justify-start gap-2 ${
                      router.asPath == item?.url
                        ? "active_link text-accent"
                        : "text-gray-700"
                    }`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: item?.icon }} />
                    <span>{intl.formatMessage({ id: item.title })}</span>
                  </a>
                </Link>
              );
            }
            return null;
          })}
        </div>
        <button
          onClick={() => logOut()}
          className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-sm py-2 px-2 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200"
        >
          <LogOut size={15} />
          {intl.formatMessage({ id: "logOut" })}
        </button>
      </div>
    </div>
  );
}
