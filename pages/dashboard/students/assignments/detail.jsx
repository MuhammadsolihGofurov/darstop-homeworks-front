import { AssignmentsCard } from "@/components/cards";
import { Pagination } from "@/components/custom";
import { CreateAssignmentsForm, EditAssignmentsForm } from "@/components/forms";
import SubmitSubmissionForm from "@/components/forms/submit-submission-form";
import withAuth from "@/components/hoc/with-auth";
import Seo from "@/components/Seo/Seo";
import fetcher from "@/utils/fetcher";
import { formatDate } from "@/utils/more";
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
    [`/student/assignments/${assignment_id}`, router.locale],
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
      <div className="flex-col flex items-start gap-5 w-full h-screen pt-24">
        <div
          className="flex w-full relative z-0 flex-col gap-2 justify-center items-center text-center min-h-[200px] rounded-xl overflow-hidden p-5"
          style={{
            backgroundImage: `url(https://gstatic.com/classroom/themes/img_code.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute top-5 left-5 text-white text-xs py-1 px-2 rounded-full bg-main">
            {formatDate(assignment?.data?.dueDate ?? "")}
          </div>
          <h1 className="text-white font-semibold text-lg sm:text-xl">
            {assignment?.data?.title}
          </h1>
        </div>
        {/* submissions */}
        <div className="grid col-span-1 md:grid-cols-3 w-full items-start gap-4">
          <div className="col-span-1 md:col-span-2 bg-white border border-gray-200 rounded-lg p-5 min-h-[240px] flex flex-col">
            <p className="text-gray-600 pb-4">{assignment?.data?.description}</p>
            {assignment?.data?.attachments?.map((item, index) => {
              return (
                <a href={item} key={index} className="text-sm text-main pb-1">
                  {intl.formatMessage({ id: "attachment-name" })} {index + 1}
                </a>
              );
            })}
          </div>
          <div className="col-span-1 md:col-span-1 bg-white border border-gray-200 rounded-lg p-5 min-h-[240px]">
            <SubmitSubmissionForm />
          </div>
        </div>
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
