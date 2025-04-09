import * as React from "react";
import { useRouter } from "next/router";
import Heading from "@/components/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Lesson, CourseDetailData } from "@/types/interfaces";
import { apiFetch } from "@/lib/api";
import AppLayoutClient from "@/layouts/app-layout-client";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import "@/app/globals.css";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LoadingSpinner from "@/components/loading-spinner";

const CourseDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = React.useState<CourseDetailData | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false); 

  React.useEffect(() => {
    if (!id) return;

    const fetchCourseDetail = async () => {
      try {
        setLoading(true);
        const response = await apiFetch(`/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course detail:", error);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [id]);

  const handleEnroll = async () => {
    if (!course) return;
  
    try {
      setIsLoading(true); // Hiển thị LoadingSpinner
  
      // Gửi request POST và lấy response
      const response = await apiFetch(`/courses/${course.id}/enroll`, {
        method: "POST",
      });
  
      // Lấy enrollmentId từ response
      const enrollmentId = response.data.id; // "6ef64a50-416b-4897-a8e5-f1164506d8d0"
  
      // Lấy danh sách cartItems hiện tại từ localStorage
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  
      // Tạo item mới với enrollmentId
      const newItem = {
        id: course.id, // ID của khóa học
        name: course.title,
        price: Number(course.discount_price || course.price), // Chuẩn hóa thành số nguyên
        enrollmentId: enrollmentId, // Thêm enrollmentId vào đây
      };
  
      const updatedCart = [...cartItems.filter((item: any) => item.id !== course.id), newItem];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  
      setTimeout(() => {
        setIsLoading(false);
        setIsModalOpen(false);
        router.push("/cart/cartshopping"); 
      }, 1000);
    } catch (error) {
      console.error("Error enrolling course:", error);
      setIsLoading(false); 
    }
  };
  if (loading) {
    return (
      <AppLayoutClient>
        <div>
          <div className="bg-neutral-100 mt-3 p-6 rounded-lg shadow-lg max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              {/* Skeleton cho tiêu đề và nội dung */}
              <CardHeader className="mb-6">
                <Skeleton className="h-8 w-3/5 rounded-lg" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-6 w-full rounded-lg mb-3" />
                <Skeleton className="h-6 w-4/5 rounded-lg mb-3" />
                <Skeleton className="h-6 w-2/3 rounded-lg mb-3" />
                <div className="text-base font-semibold flex items-center">
                  <Skeleton className="h-8 w-2/5 rounded-lg" />
                </div>
              </CardContent>
            </div>

            {/* Skeleton cho hình ảnh */}
            <div className="flex-1">
              <Skeleton className="w-full h-64 rounded-lg" />
            </div>
          </div>

          <div className="mt-5 bg-neutral-50 p-8 rounded-xl shadow-2xl max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
            <div className="flex">
              <div className="px-4 py-6 w-140">
                {/* Skeleton cho danh sách bài học */}
                <Card>
                  <CardHeader className="pb-4 border-b border-gray-200">
                    <Skeleton className="h-8 w-2/5 rounded-lg" />
                  </CardHeader>
                  <CardContent className="mt-4">
                    {[...Array(5)].map((_, index) => (
                      <div key={index} className="border border-gray-300 rounded-lg p-4 bg-gray-100 shadow-sm space-y-2">
                        <Skeleton className="h-6 w-3/4 rounded-lg" />
                        <Skeleton className="h-5 w-2/3 rounded-lg" />
                        <Skeleton className="h-4 w-1/2 rounded-lg" />
                        <Skeleton className="h-4 w-1/4 rounded-lg" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              <div className="px-4 py-6 w-100">
                {/* Skeleton cho khung đăng ký khóa học */}
                <Card className="bg-white rounded-xl shadow-lg p-6 w-full">
                  <CardHeader className="pb-4 border-b border-gray-200">
                    <Skeleton className="h-8 w-2/5 rounded-lg" />
                  </CardHeader>
                  <CardContent className="mt-4">
                    <Skeleton className="h-6 w-full rounded-lg mb-3" />
                    <Skeleton className="h-6 w-4/5 rounded-lg mb-3" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </AppLayoutClient>

    );
  }

  if (!course) {
    return <div className="px-6 py-12 max-w-6xl mx-auto">Khóa học không tồn tại.</div>;
  }

  return (
    <>
      <Head>
        <title>{course.title} - Chi tiết khóa học</title>
        <meta name="description" content={`Chi tiết khóa học ${course.title}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayoutClient>
        <div className="bg-neutral-100 mt-3 p-6 rounded-lg shadow-lg max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="flex-1">
            <CardHeader className="mb-6">
              <CardTitle className="text-3xl font-bold text-gray-800">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-gray-700 mb-3">{course.description}</p>
              <p className="text-base text-gray-700 mb-3">
                <span className="font-semibold">Giá:</span> {course.discount_price || course.price} VNĐ
              </p>
              <p className="text-base text-gray-700 mb-3">
                <span className="font-semibold">Thời gian:</span> {course.duration} phút
              </p>
              <div className="text-base font-semibold flex items-center">
                <span className="font-semibold mr-2">Rating:</span>
                <div className="relative">
                  <div className="text-gray-300 text-lg">★★★★★</div>
                  <div
                    className="absolute top-0 left-0 text-yellow-400 text-lg overflow-hidden"
                    style={{ width: `${(Number(course.rating) / 5) * 100}%` }}
                  >
                    ★★★★★
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
          <div className="flex-1">
            <img
              src={course.thumbnail_url || "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="bg-neutral-50 p-8 rounded-xl shadow-2xl max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
          <div className="flex">
            <div className="px-4 py-6">
              <Card>
                <CardHeader className="pb-4 border-b border-gray-200">
                  <CardTitle className="text-xl font-bold">Danh sách bài học</CardTitle>
                </CardHeader>
                <CardContent className="mt-4">
                  {course.lessons.length > 0 ? (
                    <ul className="space-y-6">
                      {course.lessons.map((lesson) => (
                        <li key={lesson.id} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                          <h3 className="font-semibold text-lg text-blue-700">{lesson.title}</h3>
                          <p className="text-sm text-gray-600 mt-2">{lesson.description}</p>
                          <div className="flex justify-between items-center mt-3">
                            <p className="text-sm text-gray-800">⏱ Thời lượng: {lesson.duration} phút</p>
                            <p className={`text-sm font-medium ${lesson.status === 'Published' ? 'text-green-600' : 'text-red-600'}`}>
                              Trạng thái: {lesson.status}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">Chưa có bài học nào.</p>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="px-4 py-6 w-3/7">
              <Card className="bg-white rounded-xl shadow-lg p-6 w-full">
                <CardHeader className="pb-4 border-b border-gray-200">
                  <CardTitle className="text-xl font-bold text-gray-800">Đăng ký khóa học</CardTitle>
                </CardHeader>
                <CardContent className="mt-4">
                  <p className="text-base text-gray-700 mb-3">
                    Giá gốc: <span className="line-through text-gray-400">{Number(course.price).toLocaleString()} VNĐ</span>
                  </p>
                  <p className="text-base text-red-500 font-bold">
                    Giá ưu đãi: {Number(course.discount_price).toLocaleString()} VNĐ
                  </p>
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="mt-6 w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                        Đăng ký ngay
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      {isLoading ? (
                        <div className="flex items-center justify-center py-6">
                          <LoadingSpinner variant={1} /> {/* Hiển thị LoadingSpinner */}
                        </div>
                      ) : (
                        <>
                          <DialogHeader>
                            <DialogTitle>Xác nhận đăng ký</DialogTitle>
                            <DialogDescription>
                              Bạn có chắc chắn muốn đăng ký khóa học "{course.title}" với giá{" "}
                              {Number(course.discount_price || course.price).toLocaleString()} VNĐ không?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                              Hủy
                            </Button>
                            <Button onClick={handleEnroll}>Xác nhận</Button>
                          </DialogFooter>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AppLayoutClient>
    </>
  );
};

export default CourseDetail;