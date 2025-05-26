import { AssignmentsCard } from "@/components/cards";
import { Pagination } from "@/components/custom";
import withAuth from "@/components/hoc/with-auth";
import Seo from "@/components/Seo/Seo";
import { LOCAL_PRIVATE_ROLE } from "@/utils/const";
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

  const { data: assignments } = useSWR(
    [`/student/assignments/`, router.locale],
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
        title={intl.formatMessage({ id: "my-assignments" })}
        description={intl.formatMessage({ id: "my-assignments" })}
        body={intl.formatMessage({ id: "my-assignments" })}
      />
      <div className="flex-col flex gap-5 w-full h-screen pt-24">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-primary font-semibold text-lg">
            {intl.formatMessage({ id: "my-assignments" })}
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full pb-5">
          {assignments?.data?.map((item, index) => {
            return <AssignmentsCard data={item} key={index} role={localStorage.getItem(LOCAL_PRIVATE_ROLE)}/>;
          })}
        </div>
        <Pagination
          total={assignments?.data?.total}
          limit={assignments?.data?.limit}
          currentPage={assignments?.data?.currentPage}
        />
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
