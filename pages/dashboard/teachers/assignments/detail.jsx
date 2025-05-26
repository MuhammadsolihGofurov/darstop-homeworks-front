import { AssignmentsCard } from "@/components/cards";
import { Pagination } from "@/components/custom";
import { CreateAssignmentsForm, EditAssignmentsForm } from "@/components/forms";
import withAuth from "@/components/hoc/with-auth";
import Seo from "@/components/Seo/Seo";
import fetcher from "@/utils/fetcher";
import { CreateAssignmentTeacherUrl } from "@/utils/router";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import useSWR from "swr";

function page({ info }) {
  const router = useRouter();
  const intl = useIntl();

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [router.asPath]);

  const assignment_id = router.query.id;

  const { data: assignment } = useSWR(
    [`/teacher/assignments/${assignment_id}`, router.locale],
    (url) =>
      fetcher(
        url,
        {
          headers: {
            "Accept-Language": router.locale,
          },
        },
        {},
        true
      )
  );

  return (
    <>
      <Seo
        title={assignment?.data?.title}
        description={assignment?.data?.title}
        body={assignment?.data?.title}
      />
      <div className="flex-col flex items-center gap-5 w-full h-screen pt-24">
        <div
          className="flex w-full flex-col gap-2 justify-center items-center text-center min-h-[200px] rounded-xl overflow-hidden p-5"
          style={{
            backgroundImage: `url(https://gstatic.com/classroom/themes/img_code.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-white font-semibold text-lg sm:text-xl">
            {assignment?.data?.title}
          </h1>
          <p className="md:w-2/5 text-white">{assignment?.data?.description}</p>
        </div>
        {/* submissions */}
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

export default withAuth(page);
