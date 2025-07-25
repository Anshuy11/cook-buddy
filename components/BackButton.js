import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();

  return (
    <div>
      <button
        className="text-2xl p-2 cursor-pointer hover:bg-gray-400 hover:rounded-md transition-all duration-300 ease-in-out"
        onClick={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push("/");
          }
        }}
      >
        ←
      </button>
    </div>
  );
};

export default BackButton;
