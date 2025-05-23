import { AuthBtn, BarsBtn } from "@/components/Header/details";
import Seo from "@/components/Seo/Seo";
import { getMe } from "@/redux/slice/settings";
import { STUDENT_ROLE, TEACHER_ROLE } from "@/utils/const";
import { AssignmentStudentUrl, AssignmentTeacherUrl } from "@/utils/router";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

function page({ info }) {
  const router = useRouter();
  const intl = useIntl();
  const { user_role } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [router.asPath]);

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <>
      <Seo title={"Home"} description={"Home"} body={"Home"} />
      <div className="flex items-center gap-2 justify-center flex-col w-full h-screen pt-20 md:pt-24">
        <img
          src="/images/welcome.jpg"
          alt="welcome"
          title="welcome"
          loading="lazy"
          className="w-[220px] small:w-[360px]"
        />
        <p className="text-gray-800 pb-5 text-center">
          {intl.formatMessage({ id: "welcome-body" })}
        </p>
        {user_role === "all" ? <AuthBtn /> : <></>}
        {user_role === TEACHER_ROLE ? (
          <Link href={AssignmentTeacherUrl}>
            <a
              role="link"
              className="flex items-center justify-center bg-accent rounded-md px-5 py-2 font-medium text-base text-white hover:bg-main transition-colors duration-200"
            >
              {intl.formatMessage({ id: "View all assignments" })}
            </a>
          </Link>
        ) : (
          <></>
        )}
        {user_role === STUDENT_ROLE ? (
          <Link href={AssignmentStudentUrl}>
            <a
              role="link"
              className="flex items-center justify-center bg-accent rounded-md px-5 py-2 font-medium text-base text-white hover:bg-main transition-colors duration-200"
            >
              {intl.formatMessage({ id: "View all assignments" })}
            </a>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  // fetch product
  // const info = "salom";
  const info = {
    seo_home_title: "Home for Tasks",
    seo_home_keywords: "",
    seo_home_description: "",
  };
  // const info = await axios
  //   .get(`seo`, {
  //     headers: {
  //       "Accept-Language": locale,
  //     },
  //   })
  //   .then((res) => res?.data)
  //   .catch((err) => console.error(err));

  if (!info) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      info: info,
    },
  };
}

export default page;
