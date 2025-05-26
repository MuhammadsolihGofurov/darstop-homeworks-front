import { AssignmentsCard } from "@/components/cards";
import { Pagination } from "@/components/custom";
import {
  CreateAssignmentsForm,
  EditAssignmentsForm,
  SubmitGrade,
} from "@/components/forms";
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

  const { data: submissions } = useSWR(
    [`/teacher/submissions/assignment/${assignment_id}`, router.locale],
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
          className="flex relative z-0 w-full flex-col gap-2 justify-center items-center text-center min-h-[200px] rounded-xl overflow-hidden p-5"
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
          <p className="md:w-2/5 text-white line-clamp-3">{assignment?.data?.description}</p>
        </div>
        {/* submissions */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
          {submissions?.data
            ?.filter((item) => item?.assignment?._id == assignment_id)
            .map((submission, index) => {
              const assignment = submission.assignment;
              const student = submission.student;
              const attachment = assignment.attachments?.[0];

              return (
                <div
                  key={submission._id}
                  className="border rounded-md p-4 shadow-sm bg-white"
                >
                  <div className="flex xs:flex-row flex-col justify-between gap-1 xs:items-center">
                    <div>
                      <h2 className="text-lg font-semibold line-clamp-1">
                        {assignment.title}
                      </h2>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {intl.formatMessage({ id: "name" })}: {student?.name}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {intl.formatMessage({ id: "email" })}: {student?.email}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        Status: {submission?.status}
                      </p>
                      {submission?.score ? (
                        <p className="text-sm text-gray-600 line-clamp-1">
                          Score: {submission?.score}
                        </p>
                      ) : (
                        <></>
                      )}

                      {submission?.grade ? (
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {intl.formatMessage({ id: "Grade" })}:{" "}
                          {submission?.grade}
                        </p>
                      ) : (
                        <></>
                      )}

                      {attachment && (
                        <p className="text-sm text-blue-600 mt-1">
                          <a
                            href={attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {intl.formatMessage({ id: "attachment-name" })}
                          </a>
                        </p>
                      )}
                    </div>

                    <SubmitGrade submission={submission} />
                  </div>
                </div>
              );
            })}
          <div className="col-span-1 md:col-span-2">
            <Pagination
              total={submissions?.total}
              limit={submissions?.limit}
              currentPage={submissions?.currentPage}
            />
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
