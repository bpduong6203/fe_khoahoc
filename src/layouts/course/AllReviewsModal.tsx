import React from "react";

interface AllReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AllReviewsModal: React.FC<AllReviewsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Dữ liệu mẫu cho các đánh giá
  const reviews = [
    {
      avatar: "https://via.placeholder.com/40", // URL placeholder cho avatar
      username: "Sara R.",
      time: "2 days ago",
      rating: 5,
      comment:
        "Angela is amazing, and so is the course. She explains concepts so clearly, making them easy to understand and follow. She has also structured the entire project in an incredibly coherent way, which makes progressing through the course very satisfying. This is a hands-on course where you actively participate from the beginning, applying what you've learned and building the projects yourself, which really makes you feel like you're acquiring knowledge and skills.",
    },
    {
      avatar: "https://via.placeholder.com/40",
      username: "Mert G.",
      time: "1 week ago",
      rating: 4,
      comment:
        "It's the best course I've ever seen, I learnt many things from here. The only thing is the tutor tries to cover all of the topics here, but sometimes it's not that good.",
    },
    {
      avatar: "https://via.placeholder.com/40",
      username: "Bharat S.",
      time: "2 weeks ago",
      rating: 5,
      comment:
        "The teaching style is clear and effective, making complex topics easier to understand. The lessons are well-structured, and doubts are addressed properly. Projects and hands-on practice would make the learning experience even more engaging and enriching.",
    },
  ];

  // Dữ liệu mẫu cho phân phối số sao
  const ratingDistribution = [
    { stars: 5, percentage: 69 },
    { stars: 4, percentage: 25 },
    { stars: 3, percentage: 4 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className="bg-white rounded-lg w-[80%] max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            4.7 course rating • 358K ratings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
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

        {/* Phân phối số sao */}
        <div className="mb-6">
          {ratingDistribution.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <span className="w-10 text-sm text-gray-600">{item.stars} star</span>
              <div className="flex-1 bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-gray-600 h-2 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <span className="w-12 text-sm text-gray-600 text-right">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>

        {/* Ô tìm kiếm */}
        <div className="mb-6">
          <div className="flex">
            <input
              type="text"
              placeholder="Search reviews"
              className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none"
            />
            <button className="bg-purple-600 text-white p-2 rounded-r-lg hover:bg-purple-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1114.65 5.65a7.5 7.5 0 012.3 11.3z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Danh sách đánh giá */}
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="flex">
              <img
                src={review.avatar}
                alt={review.username}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-600">
                    {review.username} • {review.time}
                  </span>
                </div>
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
                <p className="text-gray-700 text-sm leading-relaxed">
                  {review.comment}
                </p>
                <button className="mt-2 text-sm text-gray-500 hover:text-purple-600 flex items-center">
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
                  Helpful
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllReviewsModal;