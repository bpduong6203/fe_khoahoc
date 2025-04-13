import React, { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import GenericModal from '@/components/generic-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Lesson, Course, Field } from '@/types/interfaces';

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const fetchLessons = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiFetch<{ lessons: Lesson[] }>('/lessons');
      const sortedLessons = response.lessons.sort((a: Lesson, b: Lesson) =>
        sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );
      setLessons(sortedLessons);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  }, [sortOrder]);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await apiFetch<{ data: Course[] }>('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }, []);

  useEffect(() => {
    fetchLessons();
    fetchCourses();
  }, [fetchLessons, fetchCourses]);

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setLessons([...lessons].sort((a, b) =>
      newSortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    ));
  };

  const openCreateModal = () => {
    setSelectedLesson(null);
    setModalOpen(true);
  };

  const openEditModal = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setModalOpen(true);
  };

  const handleSave = async (data: any & { file?: File | null }) => {
    try {
      // Không cần xử lý file vì bài học không dùng ảnh
      const payload = { ...data };
      delete payload.file; // Xóa file nếu có

      await apiFetch(selectedLesson ? `/lessons/${selectedLesson.id}` : '/lessons', {
        method: selectedLesson ? 'PUT' : 'POST',
        data: payload,
      });

      fetchLessons();
      setModalOpen(false);
    } catch (error) {
      console.error('Error saving lesson:', error);
      throw error; // Ném lỗi để GenericModal hiển thị
    }
  };

  const courseOptions = courses.map((course) => ({
    value: course.id,
    label: course.title,
  }));

  const lessonFields: Field[] = [
    {
      name: 'course_id',
      label: 'Khóa học',
      type: 'select',
      options: courseOptions,
      required: true,
    },
    { name: 'title', label: 'Tiêu đề', type: 'text', required: true },
    { name: 'description', label: 'Mô tả', type: 'textarea', required: true },
    { name: 'content', label: 'Nội dung', type: 'textarea', required: true },
    {
      name: 'video_url',
      label: 'URL Video',
      type: 'text',
      placeholder: 'https://example.com/video',
      inline: true,
      required: true,
    },
    { name: 'duration', label: 'Thời lượng (phút)', type: 'number', required: true, inline: true },
    { name: 'order_number', label: 'Thứ tự', type: 'number', required: true, inline: true },
    {
      name: 'status',
      label: 'Trạng thái',
      type: 'select',
      options: [
        { value: 'Draft', label: 'Bản nháp' },
        { value: 'Published', label: 'Đã xuất bản' },
        { value: 'Archived', label: 'Đã lưu trữ' },
      ],
      inline: true,
      required: true,
    },
  ];

  return (
    <Card className="m-1">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Danh sách bài học
          <Button onClick={openCreateModal} variant="secondary" className="px-4 py-2">
            Tạo mới
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div>
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-sm">
            <table className="min-w-full bg-neutral-50 border rounded-2xl shadow">
              <thead>
                <tr className="bg-neutral-200 uppercase text-xs tracking-wide">
                  <th
                    className="px-4 py-3 text-left cursor-pointer font-medium hover:text-neutral-900 transition-colors"
                    onClick={toggleSortOrder}
                  >
                    Tiêu đề {sortOrder === 'asc' ? '↑' : '↓'}
                  </th>
                  <th className="px-4 py-3 text-left font-medium">Mô tả</th>
                  <th className="px-4 py-3 text-left font-medium">Thời lượng</th>
                  <th className="px-4 py-3 text-left font-medium">Trạng thái</th>
                  <th className="px-4 py-3 text-left font-medium">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {lessons.map((lesson) => (
                  <tr key={lesson.id} className="border-t border-neutral-200 hover:bg-neutral-100 transition-colors">
                    <td className="px-4 py-2">{lesson.title}</td>
                    <td className="px-4 py-2">{lesson.description || 'N/A'}</td>
                    <td className="px-4 py-2">{lesson.duration} phút</td>
                    <td className="px-4 py-2">{lesson.status}</td>
                    <td className="px-4 py-2">
                      <Button
                        onClick={() => openEditModal(lesson)}
                        variant="outline"
                      >
                        Sửa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <GenericModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={selectedLesson ? 'Sửa bài học' : 'Tạo bài học mới'}
          initialData={selectedLesson || {}}
          fields={lessonFields}
          apiEndpoint={selectedLesson ? `/lessons/${selectedLesson.id}` : '/lessons'}
          method={selectedLesson ? 'PUT' : 'POST'}
          onSave={handleSave}
        />
      </CardContent>
    </Card>
  );
}