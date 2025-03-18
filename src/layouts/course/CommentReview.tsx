import React, { useState } from "react";
import AllReviewsModal from "./AllReviewsModal";

const CommentReview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dữ liệu mẫu cho các đánh giá
  const reviews = [
    {
      username: "Sara R.",
      time: "2 weeks ago",
      rating: 5,
      comment:
        "Amazing thrill through the whole course, I highly recommend taking this class if you are thinking about it, you will learn so much and it’s packed with so much content, definitely worth the price. Thank you so much, I will definitely recommend others to take this course.",
    },
    {
      username: "Abel G.",
      time: "2 months ago",
      rating: 5,
      comment:
        "Fantastic course! Max really goes in depth about the fundamentals of React as well as behavioral and technical interviews. I highly recommend this course for anyone trying to learn React and prepare for interviews.",
    },
    {
      username: "Ông Bharat S.",
      time: "3 weeks ago",
      rating: 5,
      comment:
        "Phương pháp giảng dạy rất tốt và dễ hiểu. Bài giảng được chuẩn bị kỹ lưỡng, các ví dụ thực tế và bài tập rất hữu ích. Tôi đã học được rất nhiều từ khóa học này, cảm ơn giảng viên rất nhiều!",
    },
    {
      username: "Anh S.",
      time: "1 month ago",
      rating: 5,
      comment:
        "Khóa học này rất chi tiết, dễ hiểu, nội dung phong phú, phù hợp với cả người mới bắt đầu và người đã có kinh nghiệm. Giảng viên giải thích rõ ràng, dễ hiểu, và rất nhiệt tình. Rất đáng để học!",
    },
    {
      username: "Uttam M.",
      time: "1 month ago",
      rating: 5,
      comment:
        "Chào bạn! Khóa học này thực sự tuyệt vời, tôi đã học được rất nhiều điều bổ ích. Giảng viên rất tận tâm và nội dung được trình bày rõ ràng. Rất đáng để thử!",
    },
    {
      username: "Kurim L.",
      time: "2 months ago",
      rating: 5,
      comment:
        "An amazing course, Max is a good teacher. I have learned a lot of new things about React. I added this course for free of charge.",
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 p-6">
      {/* Tiêu đề */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Đánh giá khóa học 4.7 ★ 358K lượt đánh giá
        </h2>
      </div>

      {/* Danh sách đánh giá */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg shadow">
            {/* Thông tin người dùng và thời gian */}
            <div className="flex items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {review.username} • {review.time}
              </span>
            </div>

            {/* Số sao */}
            <div className="flex mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Nội dung đánh giá */}
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {review.comment}
            </p>

            {/* Nút Hữu ích */}
            <button className="mt-2 text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              Hữu ích
            </button>
          </div>
        ))}
      </div>

      {/* Nút Xem thêm đánh giá */}
      <div className="mt-6">
        <button
          onClick={handleOpenModal}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Xem tất cả đánh giá
        </button>
      </div>

      {/* Modal hiển thị tất cả đánh giá */}
      <AllReviewsModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default CommentReview;