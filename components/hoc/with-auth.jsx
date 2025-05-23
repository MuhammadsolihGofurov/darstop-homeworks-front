import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LOCAL_PRIVATE_ROLE, LOCAL_PRIVATE_TOKEN } from "@/utils/const";
import axios from "@/utils/axios";
import { ButtonSpinner } from "../loading";
import { toast } from "react-toastify"; // <-- toast import

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(null); // null - checking

    useEffect(() => {
      const checkAuth = async () => {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem(LOCAL_PRIVATE_TOKEN)
            : null;

        if (!token) {
          toast.error("Iltimos, qayta tizimga kiring"); // <-- toast error
          setAuthorized(false);
          // localStorage.removeItem(LOCAL_PRIVATE_ROLE);

          router.replace("/login");
          return false;
        }

        try {
          const res = await axios.get("/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.status === 200) {
            setAuthorized(true);
          } else {
            toast.error("Iltimos, qayta tizimga kiring"); // <-- toast error
            setAuthorized(false);
            // localStorage.removeItem(LOCAL_PRIVATE_ROLE);
            router.replace("/login");
          }
        } catch (err) {
          console.error("Auth check error:", err);
          // localStorage.removeItem(LOCAL_PRIVATE_ROLE);
          toast.error("Iltimos, qayta tizimga kiring"); // <-- toast error
          setAuthorized(false);
          router.replace("/login");
        }
      };

      checkAuth();
    }, []);

    if (authorized === null) {
      return (
        <div className="w-full h-screen flex items-center justify-center text-main text-lg ">
          <ButtonSpinner />
        </div>
      );
    }

    if (!authorized) return null;

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
