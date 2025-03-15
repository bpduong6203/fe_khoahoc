import React, { useState } from "react";

interface Lecture {
  id: number;
  title: string;
  duration: string;
  type: "video" | "quiz" | "code";
  questions?: number;
}

interface Section {
  id: number;
  title: string;
  lectures: Lecture[];
  duration: string;
  expanded?: boolean;
}

const CourseCurriculum = () => {
  const [sections, setSections] = useState<Section[]>([
    { 
      id: 1, 
      title: "Ngày 1 - Người mới bắt đầu - Làm việc với các biến trong Python để quản lý dữ liệu", 
      duration: "1 giờ 12 phút",
      expanded: false,
      lectures: [
        { id: 101, title: "Mục tiêu ngày 1: những gì chúng ta sẽ làm vào cuối ngày", duration: "01:46", type: "video" },
        { id: 102, title: "Cài đặt Python và trình soạn thảo code", duration: "08:21", type: "video" },
        { id: 103, title: "Biến số trong Python", duration: "12:15", type: "video" },
        { id: 104, title: "Bài kiểm tra về biến số", duration: "", type: "quiz", questions: 3 }
      ]
    },
    { 
      id: 2, 
      title: "Ngày 2 - Người mới bắt đầu - Hiểu về các kiểu dữ liệu và cách thao tác chuỗi", 
      duration: "58 phút",
      expanded: true,
      lectures: [
        { id: 201, title: "Mục tiêu ngày 2: những gì chúng ta sẽ làm vào cuối ngày", duration: "01:46", type: "video" },
        { id: 202, title: "Kiểu dữ liệu nguyên thủy của Python", duration: "08:21", type: "video" },
        { id: 203, title: "Bài kiểm tra về kiểu dữ liệu", duration: "", type: "quiz", questions: 3 },
        { id: 204, title: "Lỗi Kiểu, Kiểm tra Kiểu và Chuyển đổi Kiểu", duration: "14:20", type: "video" },
        { id: 205, title: "Các phép toán trong Python", duration: "09:35", type: "video" },
        { id: 206, title: "Máy tính BMI", duration: "", type: "code", questions: 1 },
        { id: 207, title: "Thao tác số và chuỗi F trong Python", duration: "08:08", type: "video" },
        { id: 208, title: "Bài kiểm tra về phép tính toán học", duration: "", type: "quiz", questions: 3 },
        { id: 209, title: "Dự án ngày 2: Máy tính tiền bọa", duration: "15:14", type: "video" },
        { id: 210, title: "Bạn đã nằm trong top 50%", duration: "00:29", type: "video" },
      ]
    },
    { 
      id: 3, 
      title: "Ngày 3 - Người mới bắt đầu - Kiểm soát luồng và toán tử logic", 
      duration: "1 giờ 15 phút",
      expanded: false,
      lectures: [
        { id: 301, title: "Mục tiêu ngày 3: những gì chúng ta sẽ học", duration: "01:50", type: "video" },
        { id: 302, title: "Cấu trúc điều khiển if-else", duration: "10:20", type: "video" }
      ]
    },
    { 
      id: 4, 
      title: "Ngày 4 - Người mới bắt đầu - Ngẫu nhiên hóa và Danh sách Python", 
      duration: "1 giờ 4 phút",
      expanded: false,
      lectures: []
    },
    { 
      id: 5, 
      title: "Ngày 5 - Người mới bắt đầu - Vòng lặp Python", 
      duration: "41 phút",
      expanded: false,
      lectures: []
    },
    { 
      id: 6, 
      title: "Ngày 6 - Người mới bắt đầu - Hàm Python & Karel", 
      duration: "1 giờ 23 phút",
      expanded: false,
      lectures: []
    },
    { 
      id: 7, 
      title: "Ngày 7 - Người mới bắt đầu - Hangman", 
      duration: "58 phút",
      expanded: false,
      lectures: []
    },
  ]);
  
  const toggleSection = (id: number) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, expanded: !section.expanded } : section
    ));
  };
  
  const totalSections = 101;
  const totalLectures = 592;
  const totalDuration = "56 giờ 20 phút";
  
  const getLectureIcon = (type: string) => {
    switch(type) {
      case 'video':
        return <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>;
      case 'quiz':
        return <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
      case 'code':
        return <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
      default:
        return null;
    }
  };
  
  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Nội dung khóa học</h3>
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        {totalSections} phần • {totalLectures} bài giảng • Tổng thời lượng {totalDuration}
      </div>
      
      <button className="text-purple-600 text-sm mb-4 hover:underline">
        Mở rộng tất cả các phần
      </button>
      
      <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
        {sections.map((section) => (
          <div key={section.id} className="border-b border-gray-200 dark:border-gray-600 last:border-b-0">
            <button
              className="w-full text-left p-4 flex justify-between items-start hover:bg-gray-50 dark:hover:bg-neutral-800"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-start flex-1 min-w-0 mr-3">
                <span className={`mr-2 transform ${section.expanded ? 'rotate-0' : '-rotate-90'} transition-transform mt-1`}>▼</span>
                <span className="font-medium text-gray-900 dark:text-gray-100 max-w-lg break-words">
                  {section.title}
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
                {section.lectures.length} bài giảng • {section.duration}
              </div>
            </button>
            
            {section.expanded && (
              <div className="bg-gray-50 dark:bg-neutral-800">
                {section.lectures.map(lecture => (
                  <div key={lecture.id} className="border-t border-gray-200 dark:border-gray-700">
                    <div className="p-4 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-neutral-700">
                      <div className="flex items-center">
                        {getLectureIcon(lecture.type)}
                        <span className="ml-3 text-gray-800 dark:text-gray-200">{lecture.title}</span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {lecture.type === 'quiz' ? `${lecture.questions} câu hỏi` : lecture.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCurriculum;