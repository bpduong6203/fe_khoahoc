import React from "react";

interface CoursePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CoursePreviewModal: React.FC<CoursePreviewModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Dữ liệu mẫu cho danh sách video miễn phí
  const freeVideos = [
    { title: "100 Ngày Viết Mã: Trại Huấn Luyện Python Pro Hoàn Chỉnh", duration: "03:27", thumbnail: "https://img.upanh.tv/2025/03/16/DALLE-2025-03-16-03.45.35---A-modern-and-minimalistic-wide-image-featuring-the-words-Course-Preview-in-bold-clean-typography.-The-background-is-sleek-with-a-gradient-or-abstra.webp" },
    { title: "Những gì bạn sẽ được từ khóa học này", duration: "03:27", thumbnail: "https://img.upanh.tv/2025/03/16/DALLE-2025-03-16-03.45.35---A-modern-and-minimalistic-wide-image-featuring-the-words-Course-Preview-in-bold-clean-typography.-The-background-is-sleek-with-a-gradient-or-abstra.webp" },
    { title: "Tài nguyên có thể tải xuống và Mẹo để tham gia Khóa học", duration: "04:22", thumbnail: "https://img.upanh.tv/2025/03/16/DALLE-2025-03-16-03.45.35---A-modern-and-minimalistic-wide-image-featuring-the-words-Course-Preview-in-bold-clean-typography.-The-background-is-sleek-with-a-gradient-or-abstra.webp" },
    { title: "Đôi điều về tư duy với tư duy tự khóa", duration: "08:36", thumbnail: "https://img.upanh.tv/2025/03/16/DALLE-2025-03-16-03.45.35---A-modern-and-minimalistic-wide-image-featuring-the-words-Course-Preview-in-bold-clean-typography.-The-background-is-sleek-with-a-gradient-or-abstra.webp" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      {/* Modal Container */}
      <div className="bg-neutral-800 rounded-lg w-[60%] max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-bold">Xem trước khóa học 100 Ngày Viết Mã: Trại Huấn Luyện Python Pro Hoàn Chỉnh</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Video Player */}
        <div className="mb-6 flex justify-center">
          <video
            controls
            className="w-[90%] rounded-lg"
            style={{ aspectRatio: "16 / 10" }} // Tỷ lệ khung hình để tăng chiều cao
            poster="https://img.upanh.tv/2025/03/16/DALLE-2025-03-16-03.45.35---A-modern-and-minimalistic-wide-image-featuring-the-words-Course-Preview-in-bold-clean-typography.-The-background-is-sleek-with-a-gradient-or-abstra.webp"
          >
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4" // Thay bằng URL video thực tế
              type="video/mp4"
            />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        </div>

        {/* Free Videos List */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-2">Video miễn phí:</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {freeVideos.map((video, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 hover:bg-neutral-700 rounded-lg"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-20 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-white text-sm">{video.title}</p>
                  <p className="text-gray-400 text-xs">{video.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewModal;