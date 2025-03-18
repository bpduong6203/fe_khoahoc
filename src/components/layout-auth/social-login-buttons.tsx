import { FaGoogle, FaFacebook } from "react-icons/fa";

export default function SocialLoginButtons () {
  return (
    <div className="space-y-2">
      <button
        type="button"
        className="w-full flex items-center justify-center py-2 px-4 bg-white/70 border border-gray-200 rounded-md hover:bg-white/90"
      >
        <FaGoogle className="text-red-500 mr-2" size={16} />
        <span className="text-sm">Đăng nhập với Google</span>
      </button>
      <button
        type="button"
        className="w-full flex items-center justify-center py-2 px-4 bg-white/70 border border-gray-200 rounded-md hover:bg-white/90"
      >
        <FaFacebook className="text-blue-600 mr-2" size={16} />
        <span className="text-sm">Đăng nhập với Facebook</span>
      </button>
    </div>
  );
}
