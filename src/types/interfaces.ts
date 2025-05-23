
export interface Field {
    name: string;
    label: string;
    type?: 'text' | 'textarea' | 'select' | 'number' | "file";
    placeholder?: string;
    required?: boolean;
    inline?: boolean;
    options?: { value: string; label: string }[];
}

export interface Category {
    id: string;
    name: string;
    description?: string;
    parent_id?: string;
    status: 'Active' | 'Inactive';
}

export interface Course {
    id: string;
    title: string;
    description?: string;
    category_id?: string;
    price: number;
    discount_price?: number;
    duration?: number;
    user_name?: string;
    thumbnail_url: string | null;
    rating: number;
    level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
    status: 'Draft' | 'Published' | 'Archived';
}


export interface CourseDetailData {
    id: string;
    title: string;
    description: string | null;
    category_id: string;
    user_id: string;
    price: string;
    discount_price: string | null;
    thumbnail_url: string | null;
    duration: number;
    requirements: string | null;
    objectives: string | null;
    rating: string;
    enrollment_count: number;
    created_at: string;
    category: { id: string; name: string } | null;
    level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
    status: 'Draft' | 'Published' | 'Archived';
    user: { id: string; name: string } | null;
    lessons: Lesson[];
  }
  

export interface Lesson {
    id: string;
    course_id: string;
    title: string;
    description?: string;
    content?: string;
    video_url?: string;
    duration?: number;
    order_number: number;
    status: 'Draft' | 'Published' | 'Archived';
}

export interface Payment {
    id: string | number;
    invoice_code: string | null;
    enrollment_id: string;
    user_id: string;
    amount: string;
    payment_method: string;
    status: 'Pending' | 'Completed' | 'Failed' | 'Refunded';
    transaction_id?: string | null;
    created_at: string;
    updated_at: string;
    enrollment?: {
        id: string;
        course_id: string;
        price: string;
    };
    user?: {
        id: string;
        name: string;
    };
}