// ============================================
// DATA.JS - PHẦN 1: DỮ LIỆU NGƯỜI DÙNG
// ============================================

window.fakeUsers = [
    {
        id: 1,
        username: 'hocsinh1',
        password: '123456',
        name: 'Nguyễn Văn An',
        email: 'nguyenvanan@gmail.com',
        phone: '0987654321',
        class: '5A1',
        avatar: 'A',
        points: 12500,
        rank: 1,
        registeredAt: '2025-01-15',
        package: 'vip',
        packageExpire: '2025-12-31',
        address: 'Hà Nội',
        school: 'Trường Tiểu học Kim Đồng'
    },
    {
        id: 2,
        username: 'hocsinh2',
        password: '123456',
        name: 'Trần Thị Bình',
        email: 'tranthibinh@gmail.com',
        phone: '0987654322',
        class: '5A2',
        avatar: 'B',
        points: 11800,
        rank: 2,
        registeredAt: '2025-01-20',
        package: 'pro',
        packageExpire: '2025-06-30',
        address: 'Hồ Chí Minh',
        school: 'Trường Tiểu học Lê Văn Tám'
    },
    {
        id: 3,
        username: 'hocsinh3',
        password: '123456',
        name: 'Lê Văn Cường',
        email: 'levancuong@gmail.com',
        phone: '0987654323',
        class: '4A1',
        avatar: 'C',
        points: 11200,
        rank: 3,
        registeredAt: '2025-02-01',
        package: 'basic',
        packageExpire: '2025-05-31',
        address: 'Đà Nẵng',
        school: 'Trường Tiểu học Nguyễn Bá Ngọc'
    },
    {
        id: 4,
        username: 'hocsinh4',
        password: '123456',
        name: 'Phạm Thị Dung',
        email: 'phamthidung@gmail.com',
        phone: '0987654324',
        class: '5A1',
        avatar: 'D',
        points: 10900,
        rank: 4,
        registeredAt: '2025-02-15',
        package: 'basic',
        packageExpire: '2025-04-30',
        address: 'Hải Phòng',
        school: 'Trường Tiểu học Trần Quốc Toản'
    },
    {
        id: 5,
        username: 'hocsinh5',
        password: '123456',
        name: 'Hoàng Văn Em',
        email: 'hoangvanem@gmail.com',
        phone: '0987654325',
        class: '5A3',
        avatar: 'E',
        points: 10500,
        rank: 5,
        registeredAt: '2025-03-01',
        package: 'none',
        packageExpire: null,
        address: 'Cần Thơ',
        school: 'Trường Tiểu học Lê Lợi'
    },
    {
        id: 6,
        username: 'demo',
        password: 'demo',
        name: 'Tài khoản Demo',
        email: 'demo@vioedu.com',
        phone: '0987654326',
        class: '5A1',
        avatar: 'D',
        points: 9999,
        rank: 6,
        registeredAt: '2025-03-01',
        package: 'vip',
        packageExpire: '2025-12-31',
        address: 'Hà Nội',
        school: 'Trường Tiểu học Thực Nghiệm'
    }
];
// ============================================
// DATA.JS - PHẦN 2: DỮ LIỆU GIÁO VIÊN
// ============================================

window.teachers = [
    {
        id: 1,
        name: 'Cô Nguyễn Thị Hương',
        subject: 'toan',
        qualification: 'Thạc sĩ Giáo dục Tiểu học',
        experience: '15 năm',
        avatar: 'H',
        students: 2500,
        rating: 4.9
    },
    {
        id: 2,
        name: 'Cô Trần Thị Lan',
        subject: 'van',
        qualification: 'Tiến sĩ Ngôn ngữ',
        experience: '12 năm',
        avatar: 'L',
        students: 2100,
        rating: 4.8
    },
    {
        id: 3,
        name: 'Thầy Lê Văn Minh',
        subject: 'toan',
        qualification: 'Thạc sĩ Sư phạm Toán',
        experience: '10 năm',
        avatar: 'M',
        students: 1800,
        rating: 4.9
    },
    {
        id: 4,
        name: 'Cô Phạm Thị Dung',
        subject: 'van',
        qualification: 'Cử nhân Sư phạm',
        experience: '8 năm',
        avatar: 'D',
        students: 1500,
        rating: 4.7
    },
    {
        id: 5,
        name: 'Thầy John Smith',
        subject: 'anh',
        qualification: 'Thạc sĩ Ngôn ngữ Anh',
        experience: '10 năm',
        avatar: 'J',
        students: 2000,
        rating: 4.9
    },
    {
        id: 6,
        name: 'Cô Sarah Wilson',
        subject: 'anh',
        qualification: 'Cử nhân Sư phạm Tiếng Anh',
        experience: '7 năm',
        avatar: 'S',
        students: 1200,
        rating: 4.8
    }
];
// ============================================
// DATA.JS - PHẦN 3: DỮ LIỆU KHÓA HỌC (TOÁN)
// ============================================

window.courses = [
    // TOÁN LỚP 1-5
    {
        id: 1,
        name: 'Toán lớp 1',
        teacher: 'Cô Nguyễn Thị Hương',
        teacherId: 1,
        price: 299000,
        lessons: 15,
        students: 1200,
        rating: 4.8,
        reviews: 234,
        image: '📚',
        class: 1,
        subject: 'toan',
        level: 'Cơ bản',
        duration: '3 tháng',
        description: 'Khóa học toán cơ bản cho học sinh lớp 1, giúp các em làm quen với các phép tính đơn giản.'
    },
    {
        id: 2,
        name: 'Toán lớp 2',
        teacher: 'Cô Trần Thị Lan',
        teacherId: 2,
        price: 349000,
        lessons: 18,
        students: 1100,
        rating: 4.7,
        reviews: 198,
        image: '📚',
        class: 2,
        subject: 'toan',
        level: 'Cơ bản',
        duration: '3 tháng',
        description: 'Khóa học toán lớp 2 với các phép tính có nhớ, bảng nhân chia đơn giản.'
    },
    {
        id: 3,
        name: 'Toán lớp 3',
        teacher: 'Thầy Lê Văn Minh',
        teacherId: 3,
        price: 399000,
        lessons: 22,
        students: 980,
        rating: 4.9,
        reviews: 187,
        image: '📚',
        class: 3,
        subject: 'toan',
        level: 'Cơ bản',
        duration: '4 tháng',
        description: 'Khóa học toán lớp 3 với bảng cửu chương, phép nhân chia nâng cao.'
    },
    {
        id: 4,
        name: 'Toán lớp 4',
        teacher: 'Cô Phạm Thị Dung',
        teacherId: 4,
        price: 449000,
        lessons: 25,
        students: 870,
        rating: 4.8,
        reviews: 156,
        image: '📚',
        class: 4,
        subject: 'toan',
        level: 'Cơ bản',
        duration: '4 tháng',
        description: 'Khóa học toán lớp 4 với phân số, hình học, đo lường.'
    },
    {
        id: 5,
        name: 'Toán lớp 5',
        teacher: 'Cô Nguyễn Thị Hương',
        teacherId: 1,
        price: 499000,
        lessons: 28,
        students: 1500,
        rating: 4.9,
        reviews: 312,
        image: '📚',
        class: 5,
        subject: 'toan',
        level: 'Cơ bản',
        duration: '5 tháng',
        description: 'Khóa học toán lớp 5 với phân số nâng cao, số thập phân, tỉ số phần trăm.'
    },
    {
        id: 6,
        name: 'Toán nâng cao lớp 5',
        teacher: 'Thầy Lê Văn Minh',
        teacherId: 3,
        price: 699000,
        lessons: 32,
        students: 450,
        rating: 4.9,
        reviews: 89,
        image: '📚',
        class: 5,
        subject: 'toan',
        level: 'Nâng cao',
        duration: '5 tháng',
        description: 'Khóa học toán nâng cao dành cho học sinh lớp 5 muốn ôn thi vào trường chuyên.'
    }
];
// ============================================
// DATA.JS - PHẦN 4: DỮ LIỆU KHÓA HỌC (TIẾNG VIỆT)
// ============================================

// TIẾNG VIỆT LỚP 1-5
window.courses.push(
    {
        id: 7,
        name: 'Tiếng Việt lớp 1',
        teacher: 'Cô Trần Thị Lan',
        teacherId: 2,
        price: 249000,
        lessons: 12,
        students: 980,
        rating: 4.7,
        reviews: 167,
        image: '📝',
        class: 1,
        subject: 'van',
        level: 'Cơ bản',
        duration: '3 tháng',
        description: 'Khóa học tiếng Việt lớp 1 với các bài học về chữ cái, vần đơn giản.'
    },
    {
        id: 8,
        name: 'Tiếng Việt lớp 2',
        teacher: 'Cô Nguyễn Thị Hương',
        teacherId: 1,
        price: 299000,
        lessons: 14,
        students: 870,
        rating: 4.8,
        reviews: 145,
        image: '📝',
        class: 2,
        subject: 'van',
        level: 'Cơ bản',
        duration: '3 tháng',
        description: 'Khóa học tiếng Việt lớp 2 với từ ngữ, chính tả, tập làm văn.'
    },
    {
        id: 9,
        name: 'Tiếng Việt lớp 3',
        teacher: 'Cô Phạm Thị Dung',
        teacherId: 4,
        price: 349000,
        lessons: 18,
        students: 760,
        rating: 4.8,
        reviews: 134,
        image: '📝',
        class: 3,
        subject: 'van',
        level: 'Cơ bản',
        duration: '4 tháng',
        description: 'Khóa học tiếng Việt lớp 3 với từ và câu, chính tả, tập làm văn nâng cao.'
    },
    {
        id: 10,
        name: 'Tiếng Việt lớp 4',
        teacher: 'Thầy Lê Văn Minh',
        teacherId: 3,
        price: 399000,
        lessons: 20,
        students: 650,
        rating: 4.7,
        reviews: 112,
        image: '📝',
        class: 4,
        subject: 'van',
        level: 'Cơ bản',
        duration: '4 tháng',
        description: 'Khóa học tiếng Việt lớp 4 với từ loại, chính tả, tập làm văn.'
    },
    {
        id: 11,
        name: 'Tiếng Việt lớp 5',
        teacher: 'Cô Trần Thị Lan',
        teacherId: 2,
        price: 399000,
        lessons: 22,
        students: 890,
        rating: 4.8,
        reviews: 178,
        image: '📝',
        class: 5,
        subject: 'van',
        level: 'Cơ bản',
        duration: '5 tháng',
        description: 'Khóa học tiếng Việt lớp 5 với các dạng bài tập làm văn, cảm thụ văn học.'
    }
);
// ============================================
// DATA.JS - PHẦN 5: DỮ LIỆU KHÓA HỌC (TIẾNG ANH)
// ============================================

// TIẾNG ANH LỚP 1-5
window.courses.push(
    {
        id: 12,
        name: 'Tiếng Anh lớp 1',
        teacher: 'Thầy John Smith',
        teacherId: 5,
        price: 399000,
        lessons: 10,
        students: 1100,
        rating: 4.9,
        reviews: 245,
        image: '🇬🇧',
        class: 1,
        subject: 'anh',
        level: 'Cơ bản',
        duration: '3 tháng',
        description: 'Khóa học tiếng Anh lớp 1 với bảng chữ cái, số đếm, màu sắc.'
    },
    {
        id: 13,
        name: 'Tiếng Anh lớp 2',
        teacher: 'Cô Sarah Wilson',
        teacherId: 6,
        price: 449000,
        lessons: 12,
        students: 980,
        rating: 4.8,
        reviews: 198,
        image: '🇬🇧',
        class: 2,
        subject: 'anh',
        level: 'Cơ bản',
        duration: '3 tháng',
        description: 'Khóa học tiếng Anh lớp 2 với các chủ đề gia đình, đồ chơi, động vật.'
    },
    {
        id: 14,
        name: 'Tiếng Anh lớp 3',
        teacher: 'Thầy John Smith',
        teacherId: 5,
        price: 499000,
        lessons: 15,
        students: 870,
        rating: 4.9,
        reviews: 167,
        image: '🇬🇧',
        class: 3,
        subject: 'anh',
        level: 'Cơ bản',
        duration: '4 tháng',
        description: 'Khóa học tiếng Anh lớp 3 với các chủ đề trường học, bạn bè, gia đình.'
    },
    {
        id: 15,
        name: 'Tiếng Anh lớp 4',
        teacher: 'Cô Sarah Wilson',
        teacherId: 6,
        price: 549000,
        lessons: 18,
        students: 760,
        rating: 4.8,
        reviews: 145,
        image: '🇬🇧',
        class: 4,
        subject: 'anh',
        level: 'Cơ bản',
        duration: '4 tháng',
        description: 'Khóa học tiếng Anh lớp 4 với các chủ đề sở thích, thói quen hàng ngày.'
    },
    {
        id: 16,
        name: 'Tiếng Anh lớp 5',
        teacher: 'Thầy John Smith',
        teacherId: 5,
        price: 599000,
        lessons: 20,
        students: 1200,
        rating: 4.9,
        reviews: 278,
        image: '🇬🇧',
        class: 5,
        subject: 'anh',
        level: 'Cơ bản',
        duration: '5 tháng',
        description: 'Khóa học tiếng Anh lớp 5 với các chủ đề giao tiếp cơ bản, ngữ pháp.'
    }
);
// ============================================
// DATA.JS - PHẦN 6: DỮ LIỆU BÀI TẬP (TOÁN)
// ============================================

window.exercises = {
    // TOÁN LỚP 5
    'toan-5-1': {
        id: 'toan-5-1',
        title: 'Phân số - Cơ bản',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        questions: 15,
        time: 20,
        difficulty: 'Dễ',
        completed: false,
        score: null,
        description: 'Ôn tập các phép tính cơ bản với phân số'
    },
    'toan-5-2': {
        id: 'toan-5-2',
        title: 'Phân số - Nâng cao',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        questions: 20,
        time: 30,
        difficulty: 'Khó',
        completed: false,
        score: null,
        description: 'Các bài toán nâng cao về phân số'
    },
    'toan-5-3': {
        id: 'toan-5-3',
        title: 'Số thập phân',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        questions: 18,
        time: 25,
        difficulty: 'Trung bình',
        completed: true,
        score: 85,
        description: 'Các phép tính với số thập phân'
    },
    'toan-5-4': {
        id: 'toan-5-4',
        title: 'Hình học',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        questions: 15,
        time: 20,
        difficulty: 'Trung bình',
        completed: false,
        score: null,
        description: 'Tính diện tích, chu vi các hình'
    },
    'toan-5-5': {
        id: 'toan-5-5',
        title: 'Tỉ số phần trăm',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        questions: 12,
        time: 15,
        difficulty: 'Dễ',
        completed: false,
        score: null,
        description: 'Các bài toán về tỉ số phần trăm'
    },
    
    // TOÁN LỚP 4
    'toan-4-1': {
        id: 'toan-4-1',
        title: 'Phép nhân, chia',
        subject: 'toan',
        subjectName: 'Toán',
        class: 4,
        questions: 15,
        time: 20,
        difficulty: 'Dễ',
        completed: true,
        score: 90,
        description: 'Ôn tập phép nhân, chia số có nhiều chữ số'
    },
    'toan-4-2': {
        id: 'toan-4-2',
        title: 'Phân số',
        subject: 'toan',
        subjectName: 'Toán',
        class: 4,
        questions: 18,
        time: 25,
        difficulty: 'Trung bình',
        completed: false,
        score: null,
        description: 'Giới thiệu về phân số'
    },
    
    // TOÁN LỚP 3
    'toan-3-1': {
        id: 'toan-3-1',
        title: 'Bảng cửu chương',
        subject: 'toan',
        subjectName: 'Toán',
        class: 3,
        questions: 20,
        time: 25,
        difficulty: 'Dễ',
        completed: false,
        score: null,
        description: 'Ôn tập bảng cửu chương từ 2 đến 9'
    }
};
// ============================================
// DATA.JS - PHẦN 7: DỮ LIỆU BÀI TẬP (TIẾNG VIỆT & TIẾNG ANH)
// ============================================

// TIẾNG VIỆT LỚP 5
window.exercises['van-5-1'] = {
    id: 'van-5-1',
    title: 'Tập làm văn',
    subject: 'van',
    subjectName: 'Tiếng Việt',
    class: 5,
    questions: 12,
    time: 25,
    difficulty: 'Trung bình',
    completed: false,
    score: null,
    description: 'Các dạng bài tập làm văn'
};

window.exercises['van-5-2'] = {
    id: 'van-5-2',
    title: 'Chính tả',
    subject: 'van',
    subjectName: 'Tiếng Việt',
    class: 5,
    questions: 10,
    time: 15,
    difficulty: 'Dễ',
    completed: false,
    score: null,
    description: 'Luyện viết chính tả, phân biệt âm vần'
};

window.exercises['van-5-3'] = {
    id: 'van-5-3',
    title: 'Luyện từ và câu',
    subject: 'van',
    subjectName: 'Tiếng Việt',
    class: 5,
    questions: 15,
    time: 20,
    difficulty: 'Trung bình',
    completed: true,
    score: 75,
    description: 'Các dạng bài tập về từ loại, câu'
};

// TIẾNG ANH LỚP 5
window.exercises['anh-5-1'] = {
    id: 'anh-5-1',
    title: 'Unit 1: Hello',
    subject: 'anh',
    subjectName: 'Tiếng Anh',
    class: 5,
    questions: 10,
    time: 15,
    difficulty: 'Dễ',
    completed: true,
    score: 90,
    description: 'Chào hỏi, giới thiệu bản thân'
};

window.exercises['anh-5-2'] = {
    id: 'anh-5-2',
    title: 'Unit 2: School',
    subject: 'anh',
    subjectName: 'Tiếng Anh',
    class: 5,
    questions: 12,
    time: 20,
    difficulty: 'Trung bình',
    completed: false,
    score: null,
    description: 'Từ vựng về trường học'
};

window.exercises['anh-5-3'] = {
    id: 'anh-5-3',
    title: 'Unit 3: Friends',
    subject: 'anh',
    subjectName: 'Tiếng Anh',
    class: 5,
    questions: 12,
    time: 20,
    difficulty: 'Trung bình',
    completed: false,
    score: null,
    description: 'Miêu tả bạn bè'
};
// ============================================
// DATA.JS - PHẦN 8: DỮ LIỆU CÂU HỎI (TOÁN)
// ============================================

window.questions = {
    // TOÁN 5 - PHÂN SỐ CƠ BẢN
    'toan-5-1': [
        {
            id: 1,
            question: '1/2 + 1/2 = ?',
            options: ['A. 1/4', 'B. 1/2', 'C. 1', 'D. 2'],
            answer: 2,
            explanation: '1/2 + 1/2 = (1+1)/2 = 2/2 = 1'
        },
        {
            id: 2,
            question: '2/3 của 12 là bao nhiêu?',
            options: ['A. 4', 'B. 6', 'C. 8', 'D. 10'],
            answer: 2,
            explanation: '2/3 × 12 = (2×12)/3 = 24/3 = 8'
        },
        {
            id: 3,
            question: '3/4 - 1/4 = ?',
            options: ['A. 1/4', 'B. 1/2', 'C. 3/4', 'D. 1'],
            answer: 1,
            explanation: '3/4 - 1/4 = (3-1)/4 = 2/4 = 1/2'
        },
        {
            id: 4,
            question: 'Phân số nào lớn hơn 1?',
            options: ['A. 3/4', 'B. 4/5', 'C. 5/4', 'D. 2/3'],
            answer: 2,
            explanation: '5/4 > 1 vì tử số lớn hơn mẫu số'
        },
        {
            id: 5,
            question: 'Rút gọn phân số 6/8 được kết quả:',
            options: ['A. 2/3', 'B. 3/4', 'C. 4/5', 'D. 5/6'],
            answer: 1,
            explanation: '6/8 = (6:2)/(8:2) = 3/4'
        }
    ],
    
    // TOÁN 5 - PHÂN SỐ NÂNG CAO
    'toan-5-2': [
        {
            id: 1,
            question: 'Kết quả của phép tính 2/3 + 3/4 là:',
            options: ['A. 5/7', 'B. 17/12', 'C. 5/12', 'D. 12/17'],
            answer: 1,
            explanation: '2/3 + 3/4 = 8/12 + 9/12 = 17/12'
        }
    ]
};
// ============================================
// DATA.JS - PHẦN 9: DỮ LIỆU CÂU HỎI (VĂN & ANH)
// ============================================

// TIẾNG VIỆT 5
window.questions['van-5-1'] = [
    {
        id: 1,
        question: 'Từ nào là từ láy?',
        options: ['A. Xanh xanh', 'B. Xanh lè', 'C. Xanh ngắt', 'D. Xanh tươi'],
        answer: 0,
        explanation: 'Xanh xanh là từ láy (lặp lại âm đầu)'
    },
    {
        id: 2,
        question: 'Từ "chạy" trong câu "Anh ấy chạy nhanh" thuộc từ loại gì?',
        options: ['A. Danh từ', 'B. Động từ', 'C. Tính từ', 'D. Đại từ'],
        answer: 1,
        explanation: 'Chạy là động từ chỉ hoạt động'
    }
];

window.questions['van-5-2'] = [
    {
        id: 1,
        question: 'Từ nào viết đúng chính tả?',
        options: ['A. Xanh sao', 'B. Xanh xao', 'C. Sanh sao', 'D. Sanh xao'],
        answer: 1,
        explanation: 'Xanh xao là từ đúng chính tả'
    }
];

// TIẾNG ANH 5
window.questions['anh-5-1'] = [
    {
        id: 1,
        question: '"Hello" có nghĩa là gì?',
        options: ['A. Tạm biệt', 'B. Xin chào', 'C. Cảm ơn', 'D. Xin lỗi'],
        answer: 1,
        explanation: 'Hello nghĩa là xin chào'
    },
    {
        id: 2,
        question: '"My name is John." có nghĩa là:',
        options: ['A. Tên tôi là John', 'B. Tôi là John', 'C. Bạn tên là John', 'D. John là tôi'],
        answer: 0,
        explanation: 'My name is John = Tên tôi là John'
    },
    {
        id: 3,
        question: '"How are you?" có nghĩa là:',
        options: ['A. Bạn là ai?', 'B. Bạn bao nhiêu tuổi?', 'C. Bạn có khỏe không?', 'D. Bạn tên là gì?'],
        answer: 2,
        explanation: 'How are you? = Bạn có khỏe không?'
    }
];

window.questions['anh-5-2'] = [
    {
        id: 1,
        question: '"School" có nghĩa là:',
        options: ['A. Nhà', 'B. Trường học', 'C. Bệnh viện', 'D. Công viên'],
        answer: 1,
        explanation: 'School = Trường học'
    }
];
// ============================================
// DATA.JS - PHẦN 10: DỮ LIỆU ĐỀ THI
// ============================================

window.exams = [
    {
        id: 1,
        name: 'Đề thi thử Toán lớp 5 - Tháng 3',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        questions: 30,
        time: 45,
        attempts: 1234,
        rating: 4.8,
        type: 'monthly',
        price: 0,
        description: 'Đề thi thử theo cấu trúc mới nhất'
    },
    {
        id: 2,
        name: 'Đề thi thử Toán lớp 5 - Tháng 2',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        questions: 30,
        time: 45,
        attempts: 987,
        rating: 4.7,
        type: 'monthly',
        price: 0,
        description: 'Đề thi thử chất lượng cao'
    },
    {
        id: 3,
        name: 'Đề thi thử Tiếng Việt lớp 5 - Tháng 3',
        subject: 'van',
        subjectName: 'Tiếng Việt',
        class: 5,
        questions: 25,
        time: 40,
        attempts: 756,
        rating: 4.7,
        type: 'monthly',
        price: 0,
        description: 'Đề thi thử môn Tiếng Việt'
    },
    {
        id: 4,
        name: 'Đề thi thử Tiếng Anh lớp 5 - Tháng 3',
        subject: 'anh',
        subjectName: 'Tiếng Anh',
        class: 5,
        questions: 35,
        time: 50,
        attempts: 543,
        rating: 4.9,
        type: 'monthly',
        price: 0,
        description: 'Đề thi thử môn Tiếng Anh'
    },
    {
        id: 5,
        name: 'Đề thi cuối kỳ 1 - Toán 5',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        questions: 40,
        time: 60,
        attempts: 890,
        rating: 4.8,
        type: 'final',
        price: 0,
        description: 'Đề thi cuối kỳ 1'
    },
    {
        id: 6,
        name: 'Đề thi thử vào lớp 6 - Toán',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        questions: 45,
        time: 70,
        attempts: 567,
        rating: 4.9,
        type: 'entrance',
        price: 0,
        description: 'Đề thi thử chuyển cấp'
    }
];
// ============================================
// DATA.JS - PHẦN 11: DỮ LIỆU BẢNG XẾP HẠNG
// ============================================

window.rankings = {
    week: [
        { rank: 1, name: 'Nguyễn Văn An', points: 1250, class: '5A1', avatar: 'A', school: 'Kim Đồng' },
        { rank: 2, name: 'Trần Thị Bình', points: 1180, class: '5A2', avatar: 'B', school: 'Lê Văn Tám' },
        { rank: 3, name: 'Lê Văn Cường', points: 1120, class: '4A1', avatar: 'C', school: 'Nguyễn Bá Ngọc' },
        { rank: 4, name: 'Phạm Thị Dung', points: 1090, class: '5A1', avatar: 'D', school: 'Trần Quốc Toản' },
        { rank: 5, name: 'Hoàng Văn Em', points: 1050, class: '5A3', avatar: 'E', school: 'Lê Lợi' },
        { rank: 6, name: 'Ngô Thị Phương', points: 1020, class: '5A2', avatar: 'P', school: 'Kim Đồng' },
        { rank: 7, name: 'Đỗ Văn Quân', points: 980, class: '4A2', avatar: 'Q', school: 'Lê Văn Tám' },
        { rank: 8, name: 'Vũ Thị Trang', points: 950, class: '5A1', avatar: 'T', school: 'Nguyễn Bá Ngọc' },
        { rank: 9, name: 'Lý Văn Sơn', points: 920, class: '4A3', avatar: 'S', school: 'Trần Quốc Toản' },
        { rank: 10, name: 'Trịnh Thị Hoa', points: 900, class: '5A2', avatar: 'H', school: 'Lê Lợi' }
    ],
    month: [
        { rank: 1, name: 'Nguyễn Văn An', points: 5200, class: '5A1', avatar: 'A', school: 'Kim Đồng' },
        { rank: 2, name: 'Trần Thị Bình', points: 4800, class: '5A2', avatar: 'B', school: 'Lê Văn Tám' },
        { rank: 3, name: 'Lê Văn Cường', points: 4500, class: '4A1', avatar: 'C', school: 'Nguyễn Bá Ngọc' },
        { rank: 4, name: 'Phạm Thị Dung', points: 4200, class: '5A1', avatar: 'D', school: 'Trần Quốc Toản' },
        { rank: 5, name: 'Hoàng Văn Em', points: 4000, class: '5A3', avatar: 'E', school: 'Lê Lợi' }
    ],
    all: [
        { rank: 1, name: 'Nguyễn Văn An', points: 12500, class: '5A1', avatar: 'A', school: 'Kim Đồng' },
        { rank: 2, name: 'Trần Thị Bình', points: 11800, class: '5A2', avatar: 'B', school: 'Lê Văn Tám' },
        { rank: 3, name: 'Lê Văn Cường', points: 11200, class: '4A1', avatar: 'C', school: 'Nguyễn Bá Ngọc' },
        { rank: 4, name: 'Phạm Thị Dung', points: 10900, class: '5A1', avatar: 'D', school: 'Trần Quốc Toản' },
        { rank: 5, name: 'Hoàng Văn Em', points: 10500, class: '5A3', avatar: 'E', school: 'Lê Lợi' }
    ]
};
// ============================================
// DATA.JS - PHẦN 12: DỮ LIỆU GÓI HỌC
// ============================================

window.packages = {
    basic: {
        id: 'basic',
        name: 'Gói Cơ bản',
        price: 199000,
        period: 'tháng',
        features: [
            { name: '50 bài tập/tháng', included: true },
            { name: '5 đề thi thử', included: true },
            { name: 'Theo dõi tiến độ', included: true },
            { name: 'Hỏi đáp với giáo viên', included: false },
            { name: 'Bài giảng video', included: false },
            { name: 'Kèm 1-1', included: false }
        ],
        popular: false
    },
    pro: {
        id: 'pro',
        name: 'Gói Pro',
        price: 399000,
        period: 'tháng',
        features: [
            { name: '200 bài tập/tháng', included: true },
            { name: '20 đề thi thử', included: true },
            { name: 'Theo dõi tiến độ', included: true },
            { name: 'Hỏi đáp với giáo viên', included: true },
            { name: 'Bài giảng video', included: true },
            { name: 'Kèm 1-1', included: false }
        ],
        popular: true
    },
    vip: {
        id: 'vip',
        name: 'Gói VIP',
        price: 799000,
        period: 'tháng',
        features: [
            { name: 'Không giới hạn bài tập', included: true },
            { name: '50 đề thi thử', included: true },
            { name: 'Theo dõi tiến độ', included: true },
            { name: 'Hỏi đáp với giáo viên', included: true },
            { name: 'Bài giảng video', included: true },
            { name: 'Kèm 1-1 với giáo viên', included: true }
        ],
        popular: false
    }
};
// ============================================
// DATA.JS - PHẦN 13: DỮ LIỆU THÔNG BÁO
// ============================================

window.notifications = [
    {
        id: 1,
        title: 'Bài tập mới',
        content: 'Có bài tập Toán lớp 5 mới: Phân số - Nâng cao',
        time: '5 phút trước',
        read: false,
        type: 'exercise'
    },
    {
        id: 2,
        title: 'Thông báo bảo trì',
        content: 'Hệ thống bảo trì từ 23h-24h ngày 15/03',
        time: '1 giờ trước',
        read: false,
        type: 'system'
    },
    {
        id: 3,
        title: 'Kết quả học tập',
        content: 'Bạn đã hoàn thành 5 bài tập trong tuần',
        time: '1 ngày trước',
        read: true,
        type: 'achievement'
    },
    {
        id: 4,
        title: 'Khuyến mãi',
        content: 'Giảm 20% khi nâng cấp gói Pro',
        time: '2 ngày trước',
        read: true,
        type: 'promo'
    },
    {
        id: 5,
        title: 'Sinh nhật VioEdu',
        content: 'Chào mừng sinh nhật VioEdu 10 năm',
        time: '3 ngày trước',
        read: true,
        type: 'event'
    }
];
// ============================================
// DATA.JS - PHẦN 14: DỮ LIỆU THÀNH TỰU
// ============================================

window.achievements = [
    {
        id: 1,
        name: 'Nhà toán học nhí',
        description: 'Hoàn thành 10 bài tập Toán',
        icon: '🏆',
        progress: 8,
        total: 10,
        completed: false
    },
    {
        id: 2,
        name: 'Vua Tiếng Việt',
        description: 'Đạt điểm 10 môn Tiếng Việt',
        icon: '📚',
        progress: 3,
        total: 5,
        completed: false
    },
    {
        id: 3,
        name: 'Chuyên gia Tiếng Anh',
        description: 'Học 50 từ vựng',
        icon: '🇬🇧',
        progress: 25,
        total: 50,
        completed: false
    },
    {
        id: 4,
        name: 'Chăm chỉ',
        description: 'Học 7 ngày liên tiếp',
        icon: '📅',
        progress: 5,
        total: 7,
        completed: false
    },
    {
        id: 5,
        name: 'Cao thủ giải đề',
        description: 'Làm 20 đề thi thử',
        icon: '📝',
        progress: 12,
        total: 20,
        completed: false
    },
    {
        id: 6,
        name: 'Vàng',
        description: 'Đạt top 1 bảng xếp hạng',
        icon: '🥇',
        progress: 1,
        total: 1,
        completed: true
    }
];
// ============================================
// DATA.JS - PHẦN 15: DỮ LIỆU LỊCH SỬ HỌC TẬP
// ============================================

window.studyHistory = [
    {
        id: 1,
        date: '2025-03-09',
        exercise: 'Phân số - Cơ bản',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        score: 85,
        time: '15 phút',
        status: 'completed',
        questions: 15,
        correct: 13
    },
    {
        id: 2,
        date: '2025-03-08',
        exercise: 'Tập làm văn',
        subject: 'van',
        subjectName: 'Tiếng Việt',
        class: 5,
        score: 70,
        time: '20 phút',
        status: 'completed',
        questions: 12,
        correct: 8
    },
    {
        id: 3,
        date: '2025-03-07',
        exercise: 'Unit 1: Hello',
        subject: 'anh',
        subjectName: 'Tiếng Anh',
        class: 5,
        score: 90,
        time: '12 phút',
        status: 'completed',
        questions: 10,
        correct: 9
    },
    {
        id: 4,
        date: '2025-03-06',
        exercise: 'Phép nhân, chia',
        subject: 'toan',
        subjectName: 'Toán',
        class: 4,
        score: 95,
        time: '18 phút',
        status: 'completed',
        questions: 15,
        correct: 14
    },
    {
        id: 5,
        date: '2025-03-05',
        exercise: 'Chính tả',
        subject: 'van',
        subjectName: 'Tiếng Việt',
        class: 5,
        score: 80,
        time: '10 phút',
        status: 'completed',
        questions: 10,
        correct: 8
    },
    {
        id: 6,
        date: '2025-03-04',
        exercise: 'Unit 2: School',
        subject: 'anh',
        subjectName: 'Tiếng Anh',
        class: 5,
        score: 0,
        time: '0 phút',
        status: 'pending',
        questions: 12,
        correct: 0
    }
];
// ============================================
// DATA.JS - PHẦN 16: DỮ LIỆU PHƯƠNG THỨC THANH TOÁN
// ============================================

window.paymentMethods = [
    {
        id: 'momo',
        name: 'Ví MoMo',
        icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'50\' height=\'50\' viewBox=\'0 0 50 50\'%3E%3Ccircle cx=\'25\' cy=\'25\' r=\'25\' fill=\'%23a50064\'/%3E%3Ctext x=\'25\' y=\'30\' text-anchor=\'middle\' fill=\'white\' font-size=\'12\'%3EMoMo%3C/text%3E%3C/svg%3E',
        color: '#a50064'
    },
    {
        id: 'vnpay',
        name: 'VNPAY',
        icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'50\' height=\'50\' viewBox=\'0 0 50 50\'%3E%3Ccircle cx=\'25\' cy=\'25\' r=\'25\' fill=\'%23003399\'/%3E%3Ctext x=\'25\' y=\'30\' text-anchor=\'middle\' fill=\'white\' font-size=\'12\'%3EVNPAY%3C/text%3E%3C/svg%3E',
        color: '#003399'
    },
    {
        id: 'zalopay',
        name: 'ZaloPay',
        icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'50\' height=\'50\' viewBox=\'0 0 50 50\'%3E%3Ccircle cx=\'25\' cy=\'25\' r=\'25\' fill=\'%230066ff\'/%3E%3Ctext x=\'25\' y=\'30\' text-anchor=\'middle\' fill=\'white\' font-size=\'12\'%3EZalo%3C/text%3E%3C/svg%3E',
        color: '#0066ff'
    },
    {
        id: 'bank',
        name: 'Thẻ ATM',
        icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'50\' height=\'50\' viewBox=\'0 0 50 50\'%3E%3Ccircle cx=\'25\' cy=\'25\' r=\'25\' fill=\'%23333\'/%3E%3Ctext x=\'25\' y=\'30\' text-anchor=\'middle\' fill=\'white\' font-size=\'12\'%3EATM%3C/text%3E%3C/svg%3E',
        color: '#333333'
    },
    {
        id: 'credit',
        name: 'Thẻ tín dụng',
        icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'50\' height=\'50\' viewBox=\'0 0 50 50\'%3E%3Ccircle cx=\'25\' cy=\'25\' r=\'25\' fill=\'%23444\'/%3E%3Ctext x=\'25\' y=\'30\' text-anchor=\'middle\' fill=\'white\' font-size=\'12\'%3EVisa%3C/text%3E%3C/svg%3E',
        color: '#444444'
    }
];
// ============================================
// DATA.JS - PHẦN 17: DỮ LIỆU GIAO DỊCH
// ============================================

window.transactions = [
    {
        id: 1,
        userId: 1,
        userName: 'Nguyễn Văn An',
        package: 'vip',
        packageName: 'Gói VIP',
        amount: 799000,
        method: 'momo',
        methodName: 'Ví MoMo',
        time: '2025-03-01 10:30',
        status: 'completed'
    },
    {
        id: 2,
        userId: 2,
        userName: 'Trần Thị Bình',
        package: 'pro',
        packageName: 'Gói Pro',
        amount: 399000,
        method: 'vnpay',
        methodName: 'VNPAY',
        time: '2025-03-02 14:45',
        status: 'completed'
    },
    {
        id: 3,
        userId: 3,
        userName: 'Lê Văn Cường',
        package: 'basic',
        packageName: 'Gói Cơ bản',
        amount: 199000,
        method: 'zalopay',
        methodName: 'ZaloPay',
        time: '2025-03-03 09:15',
        status: 'completed'
    },
    {
        id: 4,
        userId: 4,
        userName: 'Phạm Thị Dung',
        package: 'basic',
        packageName: 'Gói Cơ bản',
        amount: 199000,
        method: 'bank',
        methodName: 'Thẻ ATM',
        time: '2025-03-04 16:20',
        status: 'pending'
    }
];
// ============================================
// DATA.JS - PHẦN 18: HÀM TIỆN ÍCH
// ============================================

window.getUserByUsername = function(username) {
    return window.fakeUsers.find(u => u.username === username);
};

window.getUserById = function(id) {
    return window.fakeUsers.find(u => u.id === id);
};

window.getCoursesByClass = function(classId) {
    return window.courses.filter(c => c.class == classId);
};

window.getCoursesBySubject = function(subject) {
    return window.courses.filter(c => c.subject === subject);
};

window.getExercisesByClassAndSubject = function(classId, subject) {
    return Object.values(window.exercises).filter(ex => ex.class == classId && ex.subject === subject);
};

window.getExerciseById = function(id) {
    return window.exercises[id];
};

window.getQuestionsByExerciseId = function(id) {
    return window.questions[id] || [];
};

window.getRankingByPeriod = function(period) {
    return window.rankings[period] || window.rankings.week;
};

window.getPackageById = function(id) {
    return window.packages[id];
};

window.getNotifications = function(unreadOnly = false) {
    if (unreadOnly) {
        return window.notifications.filter(n => !n.read);
    }
    return window.notifications;
};

window.getAchievements = function() {
    return window.achievements;
};

window.getStudyHistory = function(days = 30) {
    return window.studyHistory;
};

window.getPaymentMethods = function() {
    return window.paymentMethods;
};

window.getTransactionsByUser = function(userId) {
    return window.transactions.filter(t => t.userId === userId);
};

window.getTotalStudents = function() {
    return 5200000;
};

window.getTotalLessons = function() {
    return 52000;
};

window.getTotalTeachers = function() {
    return 127;
};

window.getSatisfactionRate = function() {
    return 98;
};