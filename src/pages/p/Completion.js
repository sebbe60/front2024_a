import Link from "next/link";
import { useRouter } from "next/router";
function Completion(props) {
  const router = useRouter();
  const { redirect_status } = router.query;

  return (
    <div className="flex-flex-col items-center mt-20">
      <div className="bg-gray-100 ">
        <div className="bg-white p-6  md:mx-auto">
          <div>
            {" "}
            {redirect_status === "succeeded" ? (
              <>
                {" "}
                <svg
                  viewBox="0 0 24 24"
                  className="text-green-600 w-16 h-16 mx-auto my-6"
                >
                  <path
                    fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                  ></path>
                </svg>
                <div className="text-center">
                  <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                    Deposit Successful!
                  </h3>
                  <p className="text-gray-600 my-2">Thank you! 🎉 .</p>{" "}
                </div>
              </>
            ) : (
              <div className="text-center">
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                  Deposit failed!
                </h3>
                <p className="text-gray-600 my-2"> </p>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Completion;
