import { RegisterForm } from "@/components/forms";
import Seo from "@/components/Seo/Seo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

function page({ info }) {
  const router = useRouter();
  const intl = useIntl();
  const { user_role } = useSelector((state) => state.settings);

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [router.asPath]);

  return (
    <>
      <Seo
        title={intl.formatMessage({ id: "register" })}
        description={intl.formatMessage({ id: "register" })}
        body={intl.formatMessage({ id: "register" })}
      />
      <div className="flex items-center gap-2 justify-center flex-col w-full h-screen pt-20 md:pt-24">
        <RegisterForm />
      </div>
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  // fetch product
  // const info = "salom";
  const info = {
    seo_home_title: "Login",
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
