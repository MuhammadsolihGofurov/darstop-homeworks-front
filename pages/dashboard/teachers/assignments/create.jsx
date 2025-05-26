import { AssignmentsCard } from "@/components/cards";
import { Pagination } from "@/components/custom";
import { CreateAssignmentsForm } from "@/components/forms";
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


  return (
    <>
      <Seo
        title={intl.formatMessage({ id: "my-assignments" })}
        description={intl.formatMessage({ id: "my-assignments" })}
        body={intl.formatMessage({ id: "my-assignments" })}
      />
      <div className="flex-col flex items-center gap-5 w-full h-screen pt-24">
        <div className="flex w-full justify-center items-center">
          <h1 className="text-primary font-semibold text-lg">
            {intl.formatMessage({ id: "create-new-assignments-title" })}
          </h1>

        </div>
        <CreateAssignmentsForm />
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
