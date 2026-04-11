// ============================================
// DATA.JS - SIÊU THÔNG MINH VERSION 4.0
// ============================================
// Hệ thống dữ liệu thông minh với AI và Machine Learning
// Team C00LKIDD - VioEdu Platform
// ============================================

console.log('%c🚀 DATA.JS SIÊU THÔNG MINH LOADING...', 'color: #00b14f; font-size: 14px; font-weight: bold;');

// ============================================
// PHẦN 1: CẤU HÌNH HỆ THỐNG
// ============================================

window.SYSTEM_CONFIG = {
    VERSION: '4.0.0',
    BUILD_DATE: '2025-03-15',
    AI_ENABLED: true,
    ML_ENABLED: true,
    ANALYTICS_ENABLED: true,
    OFFLINE_MODE: false,
    SYNC_INTERVAL: 300000,
    CACHE_DURATION: 3600000,
    MAX_HISTORY_ITEMS: 500,
    API_ENDPOINTS: {
        USER: '/api/user',
        COURSES: '/api/courses',
        EXERCISES: '/api/exercises',
        EXAMS: '/api/exams',
        ANALYTICS: '/api/analytics',
        RECOMMENDATIONS: '/api/recommendations',
        LEADERBOARD: '/api/leaderboard',
        PAYMENTS: '/api/payments'
    }
};

// ============================================
// PHẦN 2: DỮ LIỆU NGƯỜI DÙNG - SIÊU CHI TIẾT
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
        school: 'Trường Tiểu học Kim Đồng',
        // Thông tin học tập chi tiết
        learningProfile: {
            strengths: ['toan', 'anh'],
            weaknesses: ['van'],
            preferredTime: 'evening',
            averageSession: 45,
            totalStudyTime: 127,
            completionRate: 0.85,
            accuracy: 0.78,
            speed: 0.82,
            consistency: 0.91
        },
        // Tiến độ chi tiết
        progress: {
            toan: { completed: 28, total: 28, score: 92 },
            van: { completed: 15, total: 22, score: 75 },
            anh: { completed: 18, total: 20, score: 88 }
        },
        // Thành tích
        achievements: [1, 3, 4, 6, 7, 9],
        // Cài đặt cá nhân
        settings: {
            theme: 'light',
            notifications: true,
            sound: true,
            autoSave: true,
            fontSize: 'medium',
            language: 'vi'
        }
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
        school: 'Trường Tiểu học Lê Văn Tám',
        learningProfile: {
            strengths: ['van'],
            weaknesses: ['toan'],
            preferredTime: 'morning',
            averageSession: 35,
            totalStudyTime: 115,
            completionRate: 0.78,
            accuracy: 0.82,
            speed: 0.75,
            consistency: 0.85
        },
        progress: {
            toan: { completed: 20, total: 28, score: 68 },
            van: { completed: 22, total: 22, score: 94 },
            anh: { completed: 15, total: 20, score: 78 }
        },
        achievements: [1, 2, 5, 8],
        settings: {
            theme: 'dark',
            notifications: true,
            sound: false,
            autoSave: true,
            fontSize: 'large',
            language: 'vi'
        }
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
        school: 'Trường Tiểu học Nguyễn Bá Ngọc',
        learningProfile: {
            strengths: ['toan'],
            weaknesses: ['anh'],
            preferredTime: 'afternoon',
            averageSession: 30,
            totalStudyTime: 108,
            completionRate: 0.72,
            accuracy: 0.75,
            speed: 0.88,
            consistency: 0.72
        },
        progress: {
            toan: { completed: 22, total: 25, score: 88 },
            van: { completed: 15, total: 20, score: 78 },
            anh: { completed: 10, total: 18, score: 65 }
        },
        achievements: [1, 4, 7],
        settings: {
            theme: 'light',
            notifications: true,
            sound: true,
            autoSave: true,
            fontSize: 'medium',
            language: 'vi'
        }
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
        school: 'Trường Tiểu học Trần Quốc Toản',
        learningProfile: {
            strengths: ['van', 'anh'],
            weaknesses: ['toan'],
            preferredTime: 'evening',
            averageSession: 40,
            totalStudyTime: 102,
            completionRate: 0.68,
            accuracy: 0.72,
            speed: 0.70,
            consistency: 0.78
        },
        progress: {
            toan: { completed: 12, total: 25, score: 58 },
            van: { completed: 18, total: 20, score: 85 },
            anh: { completed: 14, total: 18, score: 82 }
        },
        achievements: [1, 2, 6],
        settings: {
            theme: 'light',
            notifications: true,
            sound: false,
            autoSave: true,
            fontSize: 'medium',
            language: 'vi'
        }
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
        school: 'Trường Tiểu học Lê Lợi',
        learningProfile: {
            strengths: ['toan'],
            weaknesses: ['van', 'anh'],
            preferredTime: 'morning',
            averageSession: 25,
            totalStudyTime: 98,
            completionRate: 0.55,
            accuracy: 0.65,
            speed: 0.72,
            consistency: 0.60
        },
        progress: {
            toan: { completed: 15, total: 28, score: 72 },
            van: { completed: 8, total: 22, score: 52 },
            anh: { completed: 5, total: 20, score: 48 }
        },
        achievements: [1],
        settings: {
            theme: 'dark',
            notifications: false,
            sound: false,
            autoSave: true,
            fontSize: 'medium',
            language: 'vi'
        }
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
        school: 'Trường Tiểu học Thực Nghiệm',
        learningProfile: {
            strengths: ['toan', 'van', 'anh'],
            weaknesses: [],
            preferredTime: 'flexible',
            averageSession: 60,
            totalStudyTime: 200,
            completionRate: 0.95,
            accuracy: 0.92,
            speed: 0.90,
            consistency: 0.95
        },
        progress: {
            toan: { completed: 28, total: 28, score: 98 },
            van: { completed: 22, total: 22, score: 96 },
            anh: { completed: 20, total: 20, score: 97 }
        },
        achievements: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        settings: {
            theme: 'light',
            notifications: true,
            sound: true,
            autoSave: true,
            fontSize: 'large',
            language: 'vi'
        }
    }
];

// ============================================
// PHẦN 3: DỮ LIỆU GIÁO VIÊN - SIÊU CHI TIẾT
// ============================================

window.teachers = [
    {
        id: 1,
        name: 'Cô Nguyễn Thị Hương',
        subject: 'toan',
        qualification: 'Thạc sĩ Giáo dục Tiểu học - ĐH Sư phạm Hà Nội',
        experience: '15 năm',
        avatar: 'H',
        students: 2500,
        rating: 4.9,
        reviews: 456,
        bio: 'Giáo viên ưu tú cấp thành phố, chuyên gia đào tạo học sinh giỏi Toán',
        teachingStyle: 'Sinh động, dễ hiểu, tương tác cao',
        achievements: ['Giáo viên xuất sắc 2020-2024', 'Sáng kiến kinh nghiệm cấp quốc gia'],
        courses: [1, 5, 8],
        schedule: {
            monday: ['19:00-20:00', '20:00-21:00'],
            wednesday: ['19:00-20:00', '20:00-21:00'],
            friday: ['19:00-20:00', '20:00-21:00']
        },
        specialties: ['Toán tư duy', 'Toán nâng cao', 'Luyện thi vào lớp 6']
    },
    {
        id: 2,
        name: 'Cô Trần Thị Lan',
        subject: 'van',
        qualification: 'Tiến sĩ Ngôn ngữ - ĐH Khoa học Xã hội và Nhân văn',
        experience: '12 năm',
        avatar: 'L',
        students: 2100,
        rating: 4.8,
        reviews: 389,
        bio: 'Chuyên gia ngôn ngữ học, tác giả sách giáo khoa Tiếng Việt',
        teachingStyle: 'Truyền cảm, sâu sắc, khơi gợi sáng tạo',
        achievements: ['Nhà giáo trẻ tiêu biểu', 'Giải thưởng Cánh én hồng'],
        courses: [2, 7, 11],
        schedule: {
            tuesday: ['19:00-20:00', '20:00-21:00'],
            thursday: ['19:00-20:00', '20:00-21:00'],
            saturday: ['09:00-10:00', '10:00-11:00']
        },
        specialties: ['Cảm thụ văn học', 'Tập làm văn sáng tạo', 'Luyện chữ đẹp']
    },
    {
        id: 3,
        name: 'Thầy Lê Văn Minh',
        subject: 'toan',
        qualification: 'Thạc sĩ Sư phạm Toán - ĐH Sư phạm TP.HCM',
        experience: '10 năm',
        avatar: 'M',
        students: 1800,
        rating: 4.9,
        reviews: 312,
        bio: 'Chuyên gia luyện thi Toán, tác giả nhiều đầu sách tham khảo',
        teachingStyle: 'Logic, hệ thống, bài bản',
        achievements: ['Giáo viên dạy giỏi cấp tỉnh 5 năm liền', 'Tác giả sách Toán tiểu học'],
        courses: [3, 6, 10],
        schedule: {
            monday: ['18:00-19:00', '19:00-20:00'],
            wednesday: ['18:00-19:00', '19:00-20:00'],
            friday: ['18:00-19:00', '19:00-20:00']
        },
        specialties: ['Toán logic', 'Giải toán nhanh', 'Toán Olympic']
    },
    {
        id: 4,
        name: 'Cô Phạm Thị Dung',
        subject: 'van',
        qualification: 'Cử nhân Sư phạm - ĐH Sư phạm Huế',
        experience: '8 năm',
        avatar: 'D',
        students: 1500,
        rating: 4.7,
        reviews: 245,
        bio: 'Giáo viên trẻ năng động, yêu nghề, tận tâm với học sinh',
        teachingStyle: 'Nhẹ nhàng, kiên nhẫn, chi tiết',
        achievements: ['Giáo viên trẻ xuất sắc 2023', 'Dự án giáo dục STEM'],
        courses: [4, 9],
        schedule: {
            tuesday: ['18:00-19:00', '19:00-20:00'],
            thursday: ['18:00-19:00', '19:00-20:00'],
            saturday: ['14:00-15:00', '15:00-16:00']
        },
        specialties: ['Chính tả', 'Tập làm văn cơ bản', 'Đọc hiểu']
    },
    {
        id: 5,
        name: 'Thầy John Smith',
        subject: 'anh',
        qualification: 'Thạc sĩ Ngôn ngữ Anh - TESOL Certificate',
        experience: '10 năm',
        avatar: 'J',
        students: 2000,
        rating: 4.9,
        reviews: 423,
        bio: 'Giáo viên bản ngữ, chuyên gia đào tạo tiếng Anh trẻ em',
        teachingStyle: 'Vui nhộn, tương tác, thực hành nhiều',
        achievements: ['Chứng chỉ TESOL Advanced', 'Giáo viên được yêu thích nhất 2024'],
        courses: [12, 14, 16],
        schedule: {
            monday: ['17:00-18:00', '18:00-19:00'],
            wednesday: ['17:00-18:00', '18:00-19:00'],
            friday: ['17:00-18:00', '18:00-19:00']
        },
        specialties: ['Phát âm chuẩn', 'Giao tiếp', 'Ngữ pháp cơ bản']
    },
    {
        id: 6,
        name: 'Cô Sarah Wilson',
        subject: 'anh',
        qualification: 'Cử nhân Sư phạm Tiếng Anh - CELTA Certificate',
        experience: '7 năm',
        avatar: 'S',
        students: 1200,
        rating: 4.8,
        reviews: 198,
        bio: 'Giáo viên nhiệt huyết, yêu trẻ, phương pháp giảng dạy hiện đại',
        teachingStyle: 'Sáng tạo, trò chơi hóa, học mà chơi',
        achievements: ['CELTA Pass A', 'Sáng tạo nội dung giáo dục'],
        courses: [13, 15],
        schedule: {
            tuesday: ['17:00-18:00', '18:00-19:00'],
            thursday: ['17:00-18:00', '18:00-19:00'],
            saturday: ['10:00-11:00', '11:00-12:00']
        },
        specialties: ['Từ vựng', 'Bài hát tiếng Anh', 'Kể chuyện tiếng Anh']
    }
];

// ============================================
// PHẦN 4: DỮ LIỆU KHÓA HỌC - TOÁN (SIÊU CHI TIẾT)
// ============================================

window.courses = [
    // TOÁN LỚP 1
    {
        id: 1,
        name: 'Toán lớp 1 - Cơ bản',
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
        description: 'Khóa học toán cơ bản cho học sinh lớp 1, giúp các em làm quen với các phép tính đơn giản.',
        curriculum: [
            { week: 1, topic: 'Làm quen với số 1-5', lessons: ['Số 1, 2, 3', 'Số 4, 5', 'So sánh số lượng'] },
            { week: 2, topic: 'Số 6-10', lessons: ['Số 6, 7', 'Số 8, 9, 10', 'Đếm và so sánh'] },
            { week: 3, topic: 'Phép cộng trong phạm vi 5', lessons: ['Cộng với 1', 'Cộng với 2', 'Bảng cộng trong phạm vi 5'] },
            { week: 4, topic: 'Phép cộng trong phạm vi 10', lessons: ['Cộng với 3, 4', 'Cộng với 5', 'Bảng cộng trong phạm vi 10'] },
            { week: 5, topic: 'Phép trừ trong phạm vi 5', lessons: ['Trừ đi 1, 2', 'Trừ đi 3', 'Bảng trừ trong phạm vi 5'] },
            { week: 6, topic: 'Phép trừ trong phạm vi 10', lessons: ['Trừ đi 4, 5', 'Trừ đi 6, 7', 'Bảng trừ trong phạm vi 10'] },
            { week: 7, topic: 'Hình học cơ bản', lessons: ['Hình vuông, hình tròn', 'Hình tam giác, hình chữ nhật', 'Thực hành nhận biết hình'] },
            { week: 8, topic: 'Đo lường', lessons: ['Dài hơn, ngắn hơn', 'Cao hơn, thấp hơn', 'Đo bằng gang tay'] },
            { week: 9, topic: 'Thời gian', lessons: ['Các ngày trong tuần', 'Xem giờ đúng', 'Thực hành xem giờ'] },
            { week: 10, topic: 'Ôn tập và kiểm tra', lessons: ['Ôn tập học kỳ 1', 'Kiểm tra giữa kỳ', 'Sửa bài và củng cố'] }
        ],
        learningOutcomes: [
            'Nhận biết và viết các số từ 1 đến 10',
            'Thực hiện phép cộng, trừ trong phạm vi 10',
            'Nhận biết các hình cơ bản',
            'Xem giờ đúng trên đồng hồ'
        ],
        prerequisites: ['Không yêu cầu kiến thức đầu vào'],
        targetAudience: 'Học sinh lớp 1, học sinh chuẩn bị vào lớp 1',
        certificate: true,
        lastUpdated: '2025-01-01'
    },
    {
        id: 2,
        name: 'Toán lớp 2 - Cơ bản',
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
        description: 'Khóa học toán lớp 2 với các phép tính có nhớ, bảng nhân chia đơn giản.',
        curriculum: [
            { week: 1, topic: 'Ôn tập số trong phạm vi 100', lessons: ['Đọc viết số', 'So sánh số', 'Số liền trước, liền sau'] },
            { week: 2, topic: 'Phép cộng có nhớ', lessons: ['Cộng với 9', 'Cộng với 8', 'Cộng với 7'] },
            { week: 3, topic: 'Phép cộng có nhớ (tiếp)', lessons: ['Cộng với 6, 5', 'Cộng các số', 'Giải toán có lời văn'] },
            { week: 4, topic: 'Phép trừ có nhớ', lessons: ['Trừ đi 9', 'Trừ đi 8', 'Trừ đi 7'] },
            { week: 5, topic: 'Phép trừ có nhớ (tiếp)', lessons: ['Trừ đi 6, 5', 'Trừ các số', 'Giải toán có lời văn'] },
            { week: 6, topic: 'Bảng nhân 2, 3', lessons: ['Bảng nhân 2', 'Bảng nhân 3', 'Thực hành nhân'] },
            { week: 7, topic: 'Bảng nhân 4, 5', lessons: ['Bảng nhân 4', 'Bảng nhân 5', 'Thực hành nhân'] },
            { week: 8, topic: 'Phép chia', lessons: ['Chia thành phần bằng nhau', 'Bảng chia 2', 'Bảng chia 3'] },
            { week: 9, topic: 'Phép chia (tiếp)', lessons: ['Bảng chia 4', 'Bảng chia 5', 'Giải toán có lời văn'] },
            { week: 10, topic: 'Ôn tập và kiểm tra', lessons: ['Ôn tập học kỳ', 'Kiểm tra', 'Tổng kết'] }
        ],
        learningOutcomes: [
            'Thực hiện phép cộng trừ có nhớ trong phạm vi 100',
            'Thuộc bảng nhân chia 2, 3, 4, 5',
            'Giải toán có lời văn hai phép tính'
        ],
        prerequisites: ['Hoàn thành chương trình Toán lớp 1'],
        targetAudience: 'Học sinh lớp 2',
        certificate: true,
        lastUpdated: '2025-01-01'
    },
    {
        id: 3,
        name: 'Toán lớp 3 - Cơ bản',
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
        description: 'Khóa học toán lớp 3 với bảng cửu chương, phép nhân chia nâng cao.',
        curriculum: [
            { week: 1, topic: 'Ôn tập và bổ sung', lessons: ['Đọc viết số có 3 chữ số', 'Cộng trừ không nhớ', 'Cộng trừ có nhớ'] },
            { week: 2, topic: 'Bảng nhân 6, 7', lessons: ['Bảng nhân 6', 'Bảng nhân 7', 'Thực hành'] },
            { week: 3, topic: 'Bảng nhân 8, 9', lessons: ['Bảng nhân 8', 'Bảng nhân 9', 'Thực hành'] },
            { week: 4, topic: 'Bảng chia 6, 7', lessons: ['Bảng chia 6', 'Bảng chia 7', 'Thực hành'] },
            { week: 5, topic: 'Bảng chia 8, 9', lessons: ['Bảng chia 8', 'Bảng chia 9', 'Thực hành'] },
            { week: 6, topic: 'Góc và hình học', lessons: ['Góc vuông, góc không vuông', 'Hình chữ nhật', 'Hình vuông'] },
            { week: 7, topic: 'Đơn vị đo độ dài', lessons: ['Đề-ca-mét, Héc-tô-mét', 'Bảng đơn vị đo độ dài', 'Thực hành đo'] },
            { week: 8, topic: 'Giải toán bằng hai phép tính', lessons: ['Bài toán liên quan rút về đơn vị', 'Bài toán gấp lên nhiều lần', 'Bài toán giảm đi một số lần'] },
            { week: 9, topic: 'Làm quen với biểu thức', lessons: ['Giá trị biểu thức', 'Tính giá trị biểu thức', 'Thực hành'] },
            { week: 10, topic: 'Ôn tập và kiểm tra', lessons: ['Ôn tập học kỳ', 'Kiểm tra', 'Tổng kết'] }
        ],
        learningOutcomes: [
            'Thuộc toàn bộ bảng cửu chương',
            'Thực hiện phép nhân chia trong phạm vi 1000',
            'Tính giá trị biểu thức đơn giản',
            'Giải toán có lời văn hai phép tính'
        ],
        prerequisites: ['Hoàn thành chương trình Toán lớp 2'],
        targetAudience: 'Học sinh lớp 3',
        certificate: true,
        lastUpdated: '2025-01-01'
    },
    {
        id: 4,
        name: 'Toán lớp 4 - Cơ bản',
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
        description: 'Khóa học toán lớp 4 với phân số, hình học, đo lường.',
        curriculum: [
            { week: 1, topic: 'Số tự nhiên', lessons: ['Số có nhiều chữ số', 'So sánh số', 'Dãy số tự nhiên'] },
            { week: 2, topic: 'Phép cộng, trừ số tự nhiên', lessons: ['Phép cộng', 'Phép trừ', 'Tính chất phép cộng'] },
            { week: 3, topic: 'Phép nhân, chia số tự nhiên', lessons: ['Nhân với số có 2, 3 chữ số', 'Chia cho số có 2, 3 chữ số', 'Tính chất phép nhân'] },
            { week: 4, topic: 'Dấu hiệu chia hết', lessons: ['Chia hết cho 2, 5', 'Chia hết cho 3, 9', 'Thực hành'] },
            { week: 5, topic: 'Phân số - Khái niệm', lessons: ['Khái niệm phân số', 'Phân số và phép chia', 'Phân số bằng nhau'] },
            { week: 6, topic: 'Phân số - Rút gọn và quy đồng', lessons: ['Rút gọn phân số', 'Quy đồng mẫu số', 'So sánh phân số'] },
            { week: 7, topic: 'Phép cộng, trừ phân số', lessons: ['Cộng phân số cùng mẫu', 'Cộng phân số khác mẫu', 'Trừ phân số'] },
            { week: 8, topic: 'Phép nhân, chia phân số', lessons: ['Nhân phân số', 'Chia phân số', 'Tìm phân số của một số'] },
            { week: 9, topic: 'Hình học', lessons: ['Hình bình hành', 'Hình thoi', 'Diện tích các hình'] },
            { week: 10, topic: 'Ôn tập và kiểm tra', lessons: ['Ôn tập học kỳ', 'Kiểm tra', 'Tổng kết'] }
        ],
        learningOutcomes: [
            'Nắm vững khái niệm và phép tính với phân số',
            'Tính diện tích các hình đã học',
            'Giải toán có lời văn phức tạp'
        ],
        prerequisites: ['Hoàn thành chương trình Toán lớp 3'],
        targetAudience: 'Học sinh lớp 4',
        certificate: true,
        lastUpdated: '2025-01-01'
    },
    {
        id: 5,
        name: 'Toán lớp 5 - Cơ bản',
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
        description: 'Khóa học toán lớp 5 với phân số nâng cao, số thập phân, tỉ số phần trăm.',
        curriculum: [
            { week: 1, topic: 'Ôn tập phân số', lessons: ['Khái niệm phân số', 'Rút gọn, quy đồng', 'So sánh phân số'] },
            { week: 2, topic: 'Phân số thập phân', lessons: ['Khái niệm', 'Hỗn số', 'Thực hành'] },
            { week: 3, topic: 'Số thập phân', lessons: ['Khái niệm', 'Đọc viết số thập phân', 'So sánh số thập phân'] },
            { week: 4, topic: 'Phép cộng, trừ số thập phân', lessons: ['Cộng số thập phân', 'Trừ số thập phân', 'Thực hành'] },
            { week: 5, topic: 'Phép nhân số thập phân', lessons: ['Nhân với số tự nhiên', 'Nhân với 10, 100, 1000', 'Nhân hai số thập phân'] },
            { week: 6, topic: 'Phép chia số thập phân', lessons: ['Chia cho số tự nhiên', 'Chia cho 10, 100, 1000', 'Chia hai số thập phân'] },
            { week: 7, topic: 'Tỉ số phần trăm', lessons: ['Khái niệm', 'Giải toán tỉ số phần trăm', 'Thực hành'] },
            { week: 8, topic: 'Hình học', lessons: ['Hình tam giác', 'Diện tích tam giác', 'Hình thang'] },
            { week: 9, topic: 'Hình hộp, hình lập phương', lessons: ['Thể tích', 'Diện tích xung quanh', 'Diện tích toàn phần'] },
            { week: 10, topic: 'Ôn tập và kiểm tra', lessons: ['Ôn tập cuối năm', 'Kiểm tra', 'Tổng kết'] }
        ],
        learningOutcomes: [
            'Thành thạo các phép tính với số thập phân',
            'Giải toán tỉ số phần trăm',
            'Tính thể tích các hình khối',
            'Sẵn sàng cho kỳ thi vào lớp 6'
        ],
        prerequisites: ['Hoàn thành chương trình Toán lớp 4'],
        targetAudience: 'Học sinh lớp 5, ôn thi vào lớp 6',
        certificate: true,
        lastUpdated: '2025-01-01'
    },
    {
        id: 6,
        name: 'Toán nâng cao lớp 5 - Luyện thi vào 6',
        teacher: 'Thầy Lê Văn Minh',
        teacherId: 3,
        price: 699000,
        lessons: 32,
        students: 450,
        rating: 4.9,
        reviews: 89,
        image: '🚀',
        class: 5,
        subject: 'toan',
        level: 'Nâng cao',
        duration: '5 tháng',
        description: 'Khóa học toán nâng cao dành cho học sinh lớp 5 muốn ôn thi vào trường chuyên, lớp chọn.',
        curriculum: [
            { week: 1, topic: 'Số và chữ số', lessons: ['Cấu tạo số', 'Dãy số', 'Tìm số'] },
            { week: 2, topic: 'Phân số nâng cao', lessons: ['So sánh phân số', 'Dãy phân số', 'Tìm phân số'] },
            { week: 3, topic: 'Số thập phân nâng cao', lessons: ['So sánh số thập phân', 'Tính nhanh', 'Tìm số thập phân'] },
            { week: 4, topic: 'Tỉ số phần trăm nâng cao', lessons: ['Bài toán lãi lỗ', 'Bài toán tăng giảm', 'Bài toán dung dịch'] },
            { week: 5, topic: 'Toán chuyển động', lessons: ['Chuyển động cùng chiều', 'Chuyển động ngược chiều', 'Chuyển động trên dòng nước'] },
            { week: 6, topic: 'Toán công việc', lessons: ['Công việc chung', 'Vòi nước', 'Năng suất'] },
            { week: 7, topic: 'Hình học phẳng', lessons: ['Tam giác', 'Tứ giác', 'Diện tích'] },
            { week: 8, topic: 'Hình học không gian', lessons: ['Hình hộp', 'Hình lập phương', 'Thể tích'] },
            { week: 9, topic: 'Tổng hợp đề thi', lessons: ['Đề thi vào lớp 6 (đề 1-3)', 'Đề thi vào lớp 6 (đề 4-6)', 'Chữa đề'] },
            { week: 10, topic: 'Luyện đề tổng hợp', lessons: ['Đề thi thử 1', 'Đề thi thử 2', 'Tổng kết'] }
        ],
        learningOutcomes: [
            'Giải thành thạo các dạng toán nâng cao',
            'Đạt điểm cao trong kỳ thi vào lớp 6',
            'Phát triển tư duy logic và sáng tạo'
        ],
        prerequisites: ['Hoàn thành chương trình Toán lớp 5 cơ bản'],
        targetAudience: 'Học sinh lớp 5 ôn thi vào trường chuyên, lớp chọn',
        certificate: true,
        lastUpdated: '2025-01-01'
    }
];

// ============================================
// PHẦN 5: DỮ LIỆU BÀI TẬP - SIÊU CHI TIẾT
// ============================================

window.exercises = {
    // TOÁN LỚP 5 - PHÂN SỐ CƠ BẢN
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
        description: 'Ôn tập các phép tính cơ bản với phân số',
        tags: ['phân số', 'cơ bản', 'toán 5'],
        skillsCovered: ['Cộng trừ phân số', 'Nhân chia phân số', 'Rút gọn phân số'],
        recommendedFor: ['Học sinh yếu môn Toán', 'Ôn tập kiến thức cơ bản']
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
        description: 'Các bài toán nâng cao về phân số',
        tags: ['phân số', 'nâng cao', 'toán 5'],
        skillsCovered: ['So sánh phân số phức tạp', 'Dãy phân số', 'Tìm phân số'],
        recommendedFor: ['Học sinh khá giỏi', 'Luyện thi học sinh giỏi']
    },
    'toan-5-3': {
        id: 'toan-5-3',
        title: 'Số thập phân - Cơ bản',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        questions: 18,
        time: 25,
        difficulty: 'Trung bình',
        completed: true,
        score: 85,
        description: 'Các phép tính với số thập phân',
        tags: ['số thập phân', 'cơ bản', 'toán 5'],
        skillsCovered: ['Đọc viết số thập phân', 'So sánh số thập phân', 'Phép tính cơ bản'],
        recommendedFor: ['Học sinh trung bình', 'Ôn tập']
    },
    'toan-5-4': {
        id: 'toan-5-4',
        title: 'Hình học - Tam giác và Hình thang',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        questions: 15,
        time: 20,
        difficulty: 'Trung bình',
        completed: false,
        score: null,
        description: 'Tính diện tích tam giác, hình thang',
        tags: ['hình học', 'tam giác', 'hình thang'],
        skillsCovered: ['Diện tích tam giác', 'Diện tích hình thang', 'Chiều cao'],
        recommendedFor: ['Học sinh lớp 5', 'Ôn thi học kỳ']
    },
    'toan-5-5': {
        id: 'toan-5-5',
        title: 'Tỉ số phần trăm - Cơ bản',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        questions: 12,
        time: 15,
        difficulty: 'Dễ',
        completed: false,
        score: null,
        description: 'Các bài toán về tỉ số phần trăm',
        tags: ['tỉ số phần trăm', 'cơ bản', 'toán 5'],
        skillsCovered: ['Tìm tỉ số phần trăm', 'Tìm giá trị phần trăm', 'Bài toán thực tế'],
        recommendedFor: ['Học sinh mới học', 'Ôn tập']
    },
    'toan-5-6': {
        id: 'toan-5-6',
        title: 'Chuyển động đều',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        questions: 15,
        time: 25,
        difficulty: 'Khó',
        completed: false,
        score: null,
        description: 'Bài toán chuyển động cùng chiều, ngược chiều',
        tags: ['chuyển động', 'vận tốc', 'toán 5'],
        skillsCovered: ['Tính vận tốc', 'Tính quãng đường', 'Tính thời gian'],
        recommendedFor: ['Học sinh khá giỏi', 'Luyện thi vào 6']
    },
    'toan-5-7': {
        id: 'toan-5-7',
        title: 'Thể tích hình hộp, hình lập phương',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        questions: 12,
        time: 20,
        difficulty: 'Trung bình',
        completed: false,
        score: null,
        description: 'Tính thể tích và diện tích các hình khối',
        tags: ['thể tích', 'hình hộp', 'hình lập phương'],
        skillsCovered: ['Thể tích hình hộp', 'Thể tích hình lập phương', 'Diện tích xung quanh'],
        recommendedFor: ['Học sinh lớp 5', 'Ôn tập']
    },

    // TOÁN LỚP 4
    'toan-4-1': {
        id: 'toan-4-1',
        title: 'Phép nhân, chia số lớn',
        subject: 'toan',
        subjectName: 'Toán',
        class: 4,
        questions: 15,
        time: 20,
        difficulty: 'Dễ',
        completed: true,
        score: 90,
        description: 'Ôn tập phép nhân, chia số có nhiều chữ số',
        tags: ['nhân chia', 'số lớn', 'toán 4']
    },
    'toan-4-2': {
        id: 'toan-4-2',
        title: 'Phân số - Khái niệm',
        subject: 'toan',
        subjectName: 'Toán',
        class: 4,
        questions: 18,
        time: 25,
        difficulty: 'Trung bình',
        completed: false,
        score: null,
        description: 'Giới thiệu về phân số, rút gọn và quy đồng',
        tags: ['phân số', 'toán 4']
    },
    'toan-4-3': {
        id: 'toan-4-3',
        title: 'Hình bình hành, Hình thoi',
        subject: 'toan',
        subjectName: 'Toán',
        class: 4,
        questions: 12,
        time: 15,
        difficulty: 'Trung bình',
        completed: false,
        score: null,
        description: 'Nhận biết và tính diện tích hình bình hành, hình thoi',
        tags: ['hình học', 'toán 4']
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
        description: 'Ôn tập bảng cửu chương từ 2 đến 9',
        tags: ['bảng cửu chương', 'nhân chia', 'toán 3']
    },
    'toan-3-2': {
        id: 'toan-3-2',
        title: 'Phép nhân, chia trong phạm vi 1000',
        subject: 'toan',
        subjectName: 'Toán',
        class: 3,
        questions: 18,
        time: 25,
        difficulty: 'Trung bình',
        completed: false,
        score: null,
        description: 'Nhân chia số có 2, 3 chữ số',
        tags: ['nhân chia', 'toán 3']
    },
    'toan-3-3': {
        id: 'toan-3-3',
        title: 'Tính giá trị biểu thức',
        subject: 'toan',
        subjectName: 'Toán',
        class: 3,
        questions: 15,
        time: 20,
        difficulty: 'Trung bình',
        completed: true,
        score: 78,
        description: 'Tính giá trị biểu thức có và không có dấu ngoặc',
        tags: ['biểu thức', 'toán 3']
    },

    // TIẾNG VIỆT LỚP 5
    'van-5-1': {
        id: 'van-5-1',
        title: 'Tập làm văn - Tả người',
        subject: 'van',
        subjectName: 'Tiếng Việt',
        class: 5,
        questions: 12,
        time: 25,
        difficulty: 'Trung bình',
        completed: false,
        score: null,
        description: 'Các dạng bài tập làm văn tả người',
        tags: ['tập làm văn', 'tả người', 'văn 5']
    },
    'van-5-2': {
        id: 'van-5-2',
        title: 'Chính tả - Phân biệt âm vần',
        subject: 'van',
        subjectName: 'Tiếng Việt',
        class: 5,
        questions: 10,
        time: 15,
        difficulty: 'Dễ',
        completed: false,
        score: null,
        description: 'Luyện viết chính tả, phân biệt âm vần dễ nhầm lẫn',
        tags: ['chính tả', 'văn 5']
    },
    'van-5-3': {
        id: 'van-5-3',
        title: 'Luyện từ và câu - Từ loại',
        subject: 'van',
        subjectName: 'Tiếng Việt',
        class: 5,
        questions: 15,
        time: 20,
        difficulty: 'Trung bình',
        completed: true,
        score: 75,
        description: 'Các dạng bài tập về từ loại, câu',
        tags: ['luyện từ và câu', 'từ loại', 'văn 5']
    },
    'van-5-4': {
        id: 'van-5-4',
        title: 'Đọc hiểu - Văn bản',
        subject: 'van',
        subjectName: 'Tiếng Việt',
        class: 5,
        questions: 10,
        time: 20,
        difficulty: 'Trung bình',
        completed: false,
        score: null,
        description: 'Đọc hiểu và trả lời câu hỏi',
        tags: ['đọc hiểu', 'văn 5']
    },

    // TIẾNG ANH LỚP 5
    'anh-5-1': {
        id: 'anh-5-1',
        title: 'Unit 1: Hello - Chào hỏi',
        subject: 'anh',
        subjectName: 'Tiếng Anh',
        class: 5,
        questions: 10,
        time: 15,
        difficulty: 'Dễ',
        completed: true,
        score: 90,
        description: 'Chào hỏi, giới thiệu bản thân',
        tags: ['hello', 'greetings', 'anh 5']
    },
    'anh-5-2': {
        id: 'anh-5-2',
        title: 'Unit 2: School - Trường học',
        subject: 'anh',
        subjectName: 'Tiếng Anh',
        class: 5,
        questions: 12,
        time: 20,
        difficulty: 'Trung bình',
        completed: false,
        score: null,
        description: 'Từ vựng và mẫu câu về trường học',
        tags: ['school', 'anh 5']
    },
    'anh-5-3': {
        id: 'anh-5-3',
        title: 'Unit 3: Friends - Bạn bè',
        subject: 'anh',
        subjectName: 'Tiếng Anh',
        class: 5,
        questions: 12,
        time: 20,
        difficulty: 'Trung bình',
        completed: false,
        score: null,
        description: 'Miêu tả bạn bè, tính cách',
        tags: ['friends', 'anh 5']
    },
    'anh-5-4': {
        id: 'anh-5-4',
        title: 'Grammar: Present Simple',
        subject: 'anh',
        subjectName: 'Tiếng Anh',
        class: 5,
        questions: 15,
        time: 20,
        difficulty: 'Trung bình',
        completed: false,
        score: null,
        description: 'Thì hiện tại đơn - Cấu trúc và bài tập',
        tags: ['grammar', 'present simple', 'anh 5']
    }
};

// ============================================
// PHẦN 6: DỮ LIỆU CÂU HỎI - NGÂN HÀNG CÂU HỎI
// ============================================

window.questions = {
    // TOÁN 5 - PHÂN SỐ CƠ BẢN
    'toan-5-1': [
        {
            id: 1,
            question: 'Kết quả của phép tính 1/2 + 1/2 là:',
            options: ['A. 1/4', 'B. 1/2', 'C. 1', 'D. 2'],
            answer: 2,
            explanation: '1/2 + 1/2 = (1+1)/2 = 2/2 = 1',
            difficulty: 'easy',
            skill: 'addition',
            points: 5
        },
        {
            id: 2,
            question: '2/3 của 12 là bao nhiêu?',
            options: ['A. 4', 'B. 6', 'C. 8', 'D. 10'],
            answer: 2,
            explanation: '2/3 × 12 = (2×12)/3 = 24/3 = 8',
            difficulty: 'easy',
            skill: 'multiplication',
            points: 5
        },
        {
            id: 3,
            question: '3/4 - 1/4 = ?',
            options: ['A. 1/4', 'B. 1/2', 'C. 3/4', 'D. 1'],
            answer: 1,
            explanation: '3/4 - 1/4 = (3-1)/4 = 2/4 = 1/2',
            difficulty: 'easy',
            skill: 'subtraction',
            points: 5
        },
        {
            id: 4,
            question: 'Phân số nào lớn hơn 1?',
            options: ['A. 3/4', 'B. 4/5', 'C. 5/4', 'D. 2/3'],
            answer: 2,
            explanation: '5/4 > 1 vì tử số 5 lớn hơn mẫu số 4',
            difficulty: 'easy',
            skill: 'comparison',
            points: 5
        },
        {
            id: 5,
            question: 'Rút gọn phân số 6/8 được kết quả:',
            options: ['A. 2/3', 'B. 3/4', 'C. 4/5', 'D. 5/6'],
            answer: 1,
            explanation: '6/8 = (6:2)/(8:2) = 3/4',
            difficulty: 'easy',
            skill: 'simplification',
            points: 5
        },
        {
            id: 6,
            question: '2/5 × 3/4 = ?',
            options: ['A. 5/20', 'B. 6/20', 'C. 3/10', 'D. 5/9'],
            answer: 2,
            explanation: '2/5 × 3/4 = (2×3)/(5×4) = 6/20 = 3/10',
            difficulty: 'medium',
            skill: 'multiplication',
            points: 5
        },
        {
            id: 7,
            question: '3/5 : 2/3 = ?',
            options: ['A. 9/10', 'B. 6/15', 'C. 5/8', 'D. 3/5'],
            answer: 0,
            explanation: '3/5 : 2/3 = 3/5 × 3/2 = 9/10',
            difficulty: 'medium',
            skill: 'division',
            points: 5
        },
        {
            id: 8,
            question: 'Phân số nào bằng phân số 2/3?',
            options: ['A. 4/5', 'B. 6/9', 'C. 3/4', 'D. 5/6'],
            answer: 1,
            explanation: '6/9 = (6:3)/(9:3) = 2/3',
            difficulty: 'medium',
            skill: 'equivalence',
            points: 5
        },
        {
            id: 9,
            question: 'Sắp xếp các phân số 1/2, 2/3, 3/4 theo thứ tự tăng dần:',
            options: ['A. 1/2 < 2/3 < 3/4', 'B. 3/4 < 2/3 < 1/2', 'C. 2/3 < 1/2 < 3/4', 'D. 1/2 < 3/4 < 2/3'],
            answer: 0,
            explanation: 'Quy đồng mẫu số 12: 1/2=6/12, 2/3=8/12, 3/4=9/12. Vậy 6/12 < 8/12 < 9/12',
            difficulty: 'medium',
            skill: 'comparison',
            points: 5
        },
        {
            id: 10,
            question: 'Một mảnh vườn có 2/5 diện tích trồng rau, 1/3 diện tích trồng hoa. Phần còn lại để trống chiếm bao nhiêu phần diện tích?',
            options: ['A. 4/15', 'B. 1/2', 'C. 2/3', 'D. 3/4'],
            answer: 0,
            explanation: 'Tổng diện tích đã dùng: 2/5 + 1/3 = 6/15 + 5/15 = 11/15. Phần còn lại: 1 - 11/15 = 4/15',
            difficulty: 'hard',
            skill: 'word_problem',
            points: 10
        }
    ],

    // TOÁN 5 - PHÂN SỐ NÂNG CAO
    'toan-5-2': [
        {
            id: 1,
            question: 'Kết quả của phép tính 2/3 + 3/4 là:',
            options: ['A. 5/7', 'B. 17/12', 'C. 5/12', 'D. 12/17'],
            answer: 1,
            explanation: '2/3 + 3/4 = 8/12 + 9/12 = 17/12 = 1 5/12',
            difficulty: 'medium',
            skill: 'addition',
            points: 5
        },
        {
            id: 2,
            question: 'Tìm x biết: x × 2/3 = 4/5',
            options: ['A. 8/15', 'B. 6/5', 'C. 5/6', 'D. 2/15'],
            answer: 1,
            explanation: 'x = 4/5 : 2/3 = 4/5 × 3/2 = 12/10 = 6/5',
            difficulty: 'medium',
            skill: 'equation',
            points: 5
        },
        {
            id: 3,
            question: 'Một bể nước có 3/4 thể tích chứa nước. Sau khi dùng 1/2 số nước trong bể thì còn lại bao nhiêu phần thể tích bể có nước?',
            options: ['A. 1/4', 'B. 3/8', 'C. 1/2', 'D. 5/8'],
            answer: 1,
            explanation: 'Số nước còn lại: 3/4 × 1/2 = 3/8 thể tích bể',
            difficulty: 'hard',
            skill: 'word_problem',
            points: 10
        },
        {
            id: 4,
            question: 'Cho dãy phân số: 1/2, 2/3, 3/4, 4/5, ... Phân số thứ 10 là:',
            options: ['A. 9/10', 'B. 10/11', 'C. 11/12', 'D. 12/13'],
            answer: 1,
            explanation: 'Quy luật: phân số thứ n có dạng n/(n+1). Vậy phân số thứ 10 là 10/11',
            difficulty: 'hard',
            skill: 'pattern',
            points: 10
        }
    ],

    // TIẾNG VIỆT 5
    'van-5-1': [
        {
            id: 1,
            question: 'Từ nào dưới đây là từ láy?',
            options: ['A. Xanh xanh', 'B. Xanh lè', 'C. Xanh ngắt', 'D. Xanh tươi'],
            answer: 0,
            explanation: 'Xanh xanh là từ láy (lặp lại âm đầu "x")',
            difficulty: 'easy',
            skill: 'vocabulary',
            points: 5
        },
        {
            id: 2,
            question: 'Từ "chạy" trong câu "Anh ấy chạy nhanh" thuộc từ loại gì?',
            options: ['A. Danh từ', 'B. Động từ', 'C. Tính từ', 'D. Đại từ'],
            answer: 1,
            explanation: '"Chạy" là động từ chỉ hoạt động',
            difficulty: 'easy',
            skill: 'grammar',
            points: 5
        },
        {
            id: 3,
            question: 'Câu nào dưới đây là câu ghép?',
            options: ['A. Trời mưa to.', 'B. Vì trời mưa to nên em không đi học.', 'C. Em không đi học.', 'D. Trời mưa.'],
            answer: 1,
            explanation: 'Câu ghép có hai vế câu nối với nhau bằng quan hệ từ "vì...nên"',
            difficulty: 'medium',
            skill: 'grammar',
            points: 5
        }
    ],

    'van-5-2': [
        {
            id: 1,
            question: 'Từ nào viết đúng chính tả?',
            options: ['A. Xanh sao', 'B. Xanh xao', 'C. Sanh sao', 'D. Sanh xao'],
            answer: 1,
            explanation: '"Xanh xao" là từ đúng chính tả',
            difficulty: 'easy',
            skill: 'spelling',
            points: 5
        },
        {
            id: 2,
            question: 'Điền vào chỗ trống: "Con ...ò" (ch/tr)',
            options: ['A. ch', 'B. tr'],
            answer: 1,
            explanation: '"Con trò" viết với "tr"',
            difficulty: 'easy',
            skill: 'spelling',
            points: 5
        }
    ],

    // TIẾNG ANH 5
    'anh-5-1': [
        {
            id: 1,
            question: '"Hello" có nghĩa là gì?',
            options: ['A. Tạm biệt', 'B. Xin chào', 'C. Cảm ơn', 'D. Xin lỗi'],
            answer: 1,
            explanation: 'Hello = Xin chào',
            difficulty: 'easy',
            skill: 'vocabulary',
            points: 5
        },
        {
            id: 2,
            question: '"My name is John." có nghĩa là:',
            options: ['A. Tên tôi là John', 'B. Tôi là John', 'C. Bạn tên là John', 'D. John là tôi'],
            answer: 0,
            explanation: 'My name is John = Tên tôi là John',
            difficulty: 'easy',
            skill: 'vocabulary',
            points: 5
        },
        {
            id: 3,
            question: '"How are you?" có nghĩa là:',
            options: ['A. Bạn là ai?', 'B. Bạn bao nhiêu tuổi?', 'C. Bạn có khỏe không?', 'D. Bạn tên là gì?'],
            answer: 2,
            explanation: 'How are you? = Bạn có khỏe không?',
            difficulty: 'easy',
            skill: 'communication',
            points: 5
        },
        {
            id: 4,
            question: 'Chọn câu trả lời đúng cho câu hỏi: "What\'s your name?"',
            options: ['A. I\'m fine', 'B. My name is Lan', 'C. I\'m 10 years old', 'D. Thank you'],
            answer: 1,
            explanation: 'Trả lời câu hỏi tên bằng "My name is..."',
            difficulty: 'medium',
            skill: 'communication',
            points: 5
        }
    ],

    'anh-5-2': [
        {
            id: 1,
            question: '"School" có nghĩa là:',
            options: ['A. Nhà', 'B. Trường học', 'C. Bệnh viện', 'D. Công viên'],
            answer: 1,
            explanation: 'School = Trường học',
            difficulty: 'easy',
            skill: 'vocabulary',
            points: 5
        },
        {
            id: 2,
            question: '"Teacher" có nghĩa là:',
            options: ['A. Học sinh', 'B. Bác sĩ', 'C. Giáo viên', 'D. Công an'],
            answer: 2,
            explanation: 'Teacher = Giáo viên',
            difficulty: 'easy',
            skill: 'vocabulary',
            points: 5
        },
        {
            id: 3,
            question: 'I ___ a student.',
            options: ['A. am', 'B. is', 'C. are', 'D. be'],
            answer: 0,
            explanation: 'I + am, he/she/it + is, you/we/they + are',
            difficulty: 'medium',
            skill: 'grammar',
            points: 5
        }
    ]
};

// ============================================
// PHẦN 7: DỮ LIỆU ĐỀ THI - SIÊU CHI TIẾT
// ============================================

window.exams = [
    {
        id: 1,
        name: 'Đề thi thử Toán lớp 5 - Tháng 3/2025',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        questions: 30,
        time: 45,
        attempts: 1234,
        rating: 4.8,
        type: 'monthly',
        price: 0,
        description: 'Đề thi thử theo cấu trúc mới nhất, bám sát chương trình học kỳ 2.',
        structure: {
            easy: 10,
            medium: 15,
            hard: 5
        },
        topics: ['Phân số', 'Số thập phân', 'Tỉ số phần trăm', 'Hình học'],
        createdAt: '2025-03-01',
        expiresAt: '2025-04-01',
        featured: true
    },
    {
        id: 2,
        name: 'Đề thi thử Toán lớp 5 - Tháng 2/2025',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        questions: 30,
        time: 45,
        attempts: 987,
        rating: 4.7,
        type: 'monthly',
        price: 0,
        description: 'Đề thi thử chất lượng cao, có đáp án chi tiết.',
        structure: {
            easy: 8,
            medium: 16,
            hard: 6
        },
        topics: ['Phân số', 'Hình học', 'Chuyển động'],
        createdAt: '2025-02-01',
        expiresAt: '2025-03-01',
        featured: false
    },
    {
        id: 3,
        name: 'Đề thi thử Tiếng Việt lớp 5 - Tháng 3/2025',
        subject: 'van',
        subjectName: 'Tiếng Việt',
        class: 5,
        questions: 25,
        time: 40,
        attempts: 756,
        rating: 4.7,
        type: 'monthly',
        price: 0,
        description: 'Đề thi thử môn Tiếng Việt, kiểm tra toàn diện 4 kỹ năng.',
        structure: {
            easy: 8,
            medium: 12,
            hard: 5
        },
        topics: ['Đọc hiểu', 'Chính tả', 'Luyện từ và câu', 'Tập làm văn'],
        createdAt: '2025-03-01',
        expiresAt: '2025-04-01',
        featured: true
    },
    {
        id: 4,
        name: 'Đề thi thử Tiếng Anh lớp 5 - Tháng 3/2025',
        subject: 'anh',
        subjectName: 'Tiếng Anh',
        class: 5,
        questions: 35,
        time: 50,
        attempts: 543,
        rating: 4.9,
        type: 'monthly',
        price: 0,
        description: 'Đề thi thử môn Tiếng Anh, format chuẩn Cambridge.',
        structure: {
            easy: 12,
            medium: 18,
            hard: 5
        },
        topics: ['Listening', 'Reading', 'Writing', 'Grammar'],
        createdAt: '2025-03-01',
        expiresAt: '2025-04-01',
        featured: true
    },
    {
        id: 5,
        name: 'Đề thi cuối kỳ 1 - Toán 5 (2024-2025)',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        questions: 40,
        time: 60,
        attempts: 890,
        rating: 4.8,
        type: 'final',
        price: 0,
        description: 'Đề thi cuối kỳ 1 chính thức, có barem điểm chi tiết.',
        structure: {
            easy: 15,
            medium: 20,
            hard: 5
        },
        topics: ['Phân số', 'Số thập phân', 'Đo lường', 'Hình học'],
        createdAt: '2024-12-15',
        expiresAt: null,
        featured: false
    },
    {
        id: 6,
        name: 'Đề thi thử vào lớp 6 - Toán (Trường Chuyên)',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        questions: 45,
        time: 70,
        attempts: 567,
        rating: 4.9,
        type: 'entrance',
        price: 0,
        description: 'Đề thi thử chuyển cấp vào lớp 6 trường chuyên, độ khó cao.',
        structure: {
            easy: 10,
            medium: 20,
            hard: 15
        },
        topics: ['Số học', 'Phân số nâng cao', 'Hình học không gian', 'Toán logic'],
        createdAt: '2025-02-15',
        expiresAt: null,
        featured: true
    }
];

// ============================================
// PHẦN 8: DỮ LIỆU BẢNG XẾP HẠNG - SIÊU CHI TIẾT
// ============================================

window.rankings = {
    week: [
        { rank: 1, name: 'Nguyễn Văn An', points: 1250, class: '5A1', avatar: 'A', school: 'Kim Đồng', trend: 'up', change: 2 },
        { rank: 2, name: 'Trần Thị Bình', points: 1180, class: '5A2', avatar: 'B', school: 'Lê Văn Tám', trend: 'down', change: -1 },
        { rank: 3, name: 'Lê Văn Cường', points: 1120, class: '4A1', avatar: 'C', school: 'Nguyễn Bá Ngọc', trend: 'up', change: 1 },
        { rank: 4, name: 'Phạm Thị Dung', points: 1090, class: '5A1', avatar: 'D', school: 'Trần Quốc Toản', trend: 'stable', change: 0 },
        { rank: 5, name: 'Hoàng Văn Em', points: 1050, class: '5A3', avatar: 'E', school: 'Lê Lợi', trend: 'down', change: -2 },
        { rank: 6, name: 'Ngô Thị Phương', points: 1020, class: '5A2', avatar: 'P', school: 'Kim Đồng', trend: 'up', change: 3 },
        { rank: 7, name: 'Đỗ Văn Quân', points: 980, class: '4A2', avatar: 'Q', school: 'Lê Văn Tám', trend: 'stable', change: 0 },
        { rank: 8, name: 'Vũ Thị Trang', points: 950, class: '5A1', avatar: 'T', school: 'Nguyễn Bá Ngọc', trend: 'up', change: 2 },
        { rank: 9, name: 'Lý Văn Sơn', points: 920, class: '4A3', avatar: 'S', school: 'Trần Quốc Toản', trend: 'down', change: -1 },
        { rank: 10, name: 'Trịnh Thị Hoa', points: 900, class: '5A2', avatar: 'H', school: 'Lê Lợi', trend: 'up', change: 4 }
    ],
    month: [
        { rank: 1, name: 'Nguyễn Văn An', points: 5200, class: '5A1', avatar: 'A', school: 'Kim Đồng', trend: 'up', change: 1 },
        { rank: 2, name: 'Trần Thị Bình', points: 4800, class: '5A2', avatar: 'B', school: 'Lê Văn Tám', trend: 'down', change: -1 },
        { rank: 3, name: 'Lê Văn Cường', points: 4500, class: '4A1', avatar: 'C', school: 'Nguyễn Bá Ngọc', trend: 'up', change: 2 },
        { rank: 4, name: 'Phạm Thị Dung', points: 4200, class: '5A1', avatar: 'D', school: 'Trần Quốc Toản', trend: 'stable', change: 0 },
        { rank: 5, name: 'Hoàng Văn Em', points: 4000, class: '5A3', avatar: 'E', school: 'Lê Lợi', trend: 'down', change: -2 }
    ],
    all: [
        { rank: 1, name: 'Nguyễn Văn An', points: 12500, class: '5A1', avatar: 'A', school: 'Kim Đồng', trend: 'stable', change: 0 },
        { rank: 2, name: 'Trần Thị Bình', points: 11800, class: '5A2', avatar: 'B', school: 'Lê Văn Tám', trend: 'stable', change: 0 },
        { rank: 3, name: 'Lê Văn Cường', points: 11200, class: '4A1', avatar: 'C', school: 'Nguyễn Bá Ngọc', trend: 'up', change: 1 },
        { rank: 4, name: 'Phạm Thị Dung', points: 10900, class: '5A1', avatar: 'D', school: 'Trần Quốc Toản', trend: 'down', change: -1 },
        { rank: 5, name: 'Hoàng Văn Em', points: 10500, class: '5A3', avatar: 'E', school: 'Lê Lợi', trend: 'stable', change: 0 }
    ]
};

// ============================================
// PHẦN 9: DỮ LIỆU GÓI HỌC - SIÊU CHI TIẾT
// ============================================

window.packages = {
    basic: {
        id: 'basic',
        name: 'Gói Cơ bản',
        price: 199000,
        originalPrice: 249000,
        period: 'tháng',
        discount: 20,
        features: [
            { name: '50 bài tập/tháng', included: true, icon: '📝' },
            { name: '5 đề thi thử', included: true, icon: '📋' },
            { name: 'Theo dõi tiến độ', included: true, icon: '📊' },
            { name: 'Hỏi đáp với giáo viên', included: false, icon: '💬' },
            { name: 'Bài giảng video', included: false, icon: '🎥' },
            { name: 'Kèm 1-1', included: false, icon: '👨‍🏫' },
            { name: 'Tài liệu PDF', included: false, icon: '📄' },
            { name: 'Học offline', included: false, icon: '📱' }
        ],
        popular: false,
        color: '#6c757d',
        badge: null,
        saveAmount: 50000
    },
    pro: {
        id: 'pro',
        name: 'Gói Pro',
        price: 399000,
        originalPrice: 499000,
        period: 'tháng',
        discount: 20,
        features: [
            { name: '200 bài tập/tháng', included: true, icon: '📝' },
            { name: '20 đề thi thử', included: true, icon: '📋' },
            { name: 'Theo dõi tiến độ', included: true, icon: '📊' },
            { name: 'Hỏi đáp với giáo viên', included: true, icon: '💬' },
            { name: 'Bài giảng video', included: true, icon: '🎥' },
            { name: 'Kèm 1-1', included: false, icon: '👨‍🏫' },
            { name: 'Tài liệu PDF', included: true, icon: '📄' },
            { name: 'Học offline', included: false, icon: '📱' }
        ],
        popular: true,
        color: '#00b14f',
        badge: 'PHỔ BIẾN NHẤT',
        saveAmount: 100000
    },
    vip: {
        id: 'vip',
        name: 'Gói VIP',
        price: 799000,
        originalPrice: 999000,
        period: 'tháng',
        discount: 20,
        features: [
            { name: 'Không giới hạn bài tập', included: true, icon: '📝' },
            { name: '50 đề thi thử', included: true, icon: '📋' },
            { name: 'Theo dõi tiến độ', included: true, icon: '📊' },
            { name: 'Hỏi đáp với giáo viên', included: true, icon: '💬' },
            { name: 'Bài giảng video', included: true, icon: '🎥' },
            { name: 'Kèm 1-1 với giáo viên', included: true, icon: '👨‍🏫' },
            { name: 'Tài liệu PDF độc quyền', included: true, icon: '📄' },
            { name: 'Học offline', included: true, icon: '📱' }
        ],
        popular: false,
        color: '#ffa502',
        badge: 'CAO CẤP NHẤT',
        saveAmount: 200000
    }
};

// ============================================
// PHẦN 10: DỮ LIỆU THÀNH TỰU - SIÊU CHI TIẾT
// ============================================

window.achievementsList = [
    {
        id: 1,
        name: 'Nhà toán học nhí',
        description: 'Hoàn thành 10 bài tập Toán',
        icon: '🏆',
        condition: { type: 'exercises', subject: 'toan', value: 10 },
        points: 100,
        rarity: 'common'
    },
    {
        id: 2,
        name: 'Vua Tiếng Việt',
        description: 'Đạt điểm 10 môn Tiếng Việt',
        icon: '📚',
        condition: { type: 'perfect_score', subject: 'van' },
        points: 150,
        rarity: 'rare'
    },
    {
        id: 3,
        name: 'Chuyên gia Tiếng Anh',
        description: 'Học 50 từ vựng mới',
        icon: '🇬🇧',
        condition: { type: 'vocabulary', value: 50 },
        points: 120,
        rarity: 'common'
    },
    {
        id: 4,
        name: 'Chăm chỉ',
        description: 'Học 7 ngày liên tiếp',
        icon: '📅',
        condition: { type: 'streak', value: 7 },
        points: 200,
        rarity: 'rare'
    },
    {
        id: 5,
        name: 'Cao thủ giải đề',
        description: 'Làm 20 đề thi thử',
        icon: '📝',
        condition: { type: 'exams', value: 20 },
        points: 300,
        rarity: 'epic'
    },
    {
        id: 6,
        name: 'Huy chương vàng',
        description: 'Đạt top 1 bảng xếp hạng tuần',
        icon: '🥇',
        condition: { type: 'rank', value: 1 },
        points: 500,
        rarity: 'legendary'
    },
    {
        id: 7,
        name: 'Siêu tốc độ',
        description: 'Hoàn thành bài tập trong thời gian ngắn nhất',
        icon: '⚡',
        condition: { type: 'speed_record' },
        points: 150,
        rarity: 'rare'
    },
    {
        id: 8,
        name: 'Toàn năng',
        description: 'Đạt điểm cao cả 3 môn',
        icon: '🌟',
        condition: { type: 'all_subjects', value: 80 },
        points: 250,
        rarity: 'epic'
    },
    {
        id: 9,
        name: 'Chinh phục 1000 điểm',
        description: 'Tích lũy 1000 điểm kinh nghiệm',
        icon: '💎',
        condition: { type: 'total_points', value: 1000 },
        points: 100,
        rarity: 'common'
    },
    {
        id: 10,
        name: 'Huyền thoại VioEdu',
        description: 'Mở khóa tất cả thành tựu',
        icon: '👑',
        condition: { type: 'all_achievements' },
        points: 1000,
        rarity: 'mythic'
    }
];

// ============================================
// PHẦN 11: DỮ LIỆU THÔNG BÁO - SIÊU CHI TIẾT
// ============================================

window.notifications = [
    {
        id: 1,
        title: '🎯 Bài tập mới được giao',
        content: 'Giáo viên vừa giao bài tập Toán lớp 5: Phân số - Nâng cao',
        time: '5 phút trước',
        read: false,
        type: 'assignment',
        priority: 'high',
        action: { type: 'navigate', url: 'bai-tap.html?id=toan-5-2' }
    },
    {
        id: 2,
        title: '🔧 Thông báo bảo trì',
        content: 'Hệ thống sẽ bảo trì từ 23:00 - 24:00 ngày 15/03/2025',
        time: '1 giờ trước',
        read: false,
        type: 'system',
        priority: 'medium',
        action: null
    },
    {
        id: 3,
        title: '🎉 Chúc mừng!',
        content: 'Bạn đã đạt thành tựu "Chăm chỉ" - Học 7 ngày liên tiếp!',
        time: '2 giờ trước',
        read: true,
        type: 'achievement',
        priority: 'high',
        action: { type: 'achievement', id: 4 }
    },
    {
        id: 4,
        title: '💰 Khuyến mãi đặc biệt',
        content: 'Giảm 30% khi nâng cấp lên Gói VIP - Chỉ còn 24h!',
        time: '1 ngày trước',
        read: true,
        type: 'promo',
        priority: 'high',
        action: { type: 'navigate', url: 'mua-goi.html' }
    },
    {
        id: 5,
        title: '🎂 Sinh nhật VioEdu',
        content: 'Mừng sinh nhật 10 năm - Nhận quà miễn phí!',
        time: '2 ngày trước',
        read: true,
        type: 'event',
        priority: 'medium',
        action: { type: 'event', id: 'birthday' }
    },
    {
        id: 6,
        title: '📊 Báo cáo tuần',
        content: 'Tuần này bạn đã hoàn thành 15 bài tập, tăng 20% so với tuần trước!',
        time: '3 ngày trước',
        read: true,
        type: 'report',
        priority: 'low',
        action: { type: 'navigate', url: 'lich-su.html' }
    }
];

// ============================================
// PHẦN 12: DỮ LIỆU LỊCH SỬ HỌC TẬP - SIÊU CHI TIẾT
// ============================================

window.studyHistory = [
    {
        id: 1,
        date: '2025-03-09',
        exercise: 'Phân số - Cơ bản',
        exerciseId: 'toan-5-1',
        subject: 'toan',
        subjectName: 'Toán',
        class: 5,
        score: 85,
        timeSpent: 15,
        status: 'completed',
        questions: 15,
        correct: 13,
        wrong: 2,
        skipped: 0,
        startTime: '19:00',
        endTime: '19:15',
        accuracy: 86.7,
        speed: 1.0
    },
    {
        id: 2,
        date: '2025-03-08',
        exercise: 'Tập làm văn - Tả người',
        exerciseId: 'van-5-1',
        subject: 'van',
        subjectName: 'Tiếng Việt',
        class: 5,
        score: 70,
        timeSpent: 20,
        status: 'completed',
        questions: 12,
        correct: 8,
        wrong: 4,
        skipped: 0,
        startTime: '20:00',
        endTime: '20:20',
        accuracy: 66.7,
        speed: 1.67
    },
    {
        id: 3,
        date: '2025-03-07',
        exercise: 'Unit 1: Hello',
        exerciseId: 'anh-5-1',
        subject: 'anh',
        subjectName: 'Tiếng Anh',
        class: 5,
        score: 90,
        timeSpent: 12,
        status: 'completed',
        questions: 10,
        correct: 9,
        wrong: 1,
        skipped: 0,
        startTime: '18:30',
        endTime: '18:42',
        accuracy: 90,
        speed: 1.2
    },
    {
        id: 4,
        date: '2025-03-06',
        exercise: 'Phép nhân, chia số lớn',
        exerciseId: 'toan-4-1',
        subject: 'toan',
        subjectName: 'Toán',
        class: 4,
        score: 95,
        timeSpent: 18,
        status: 'completed',
        questions: 15,
        correct: 14,
        wrong: 1,
        skipped: 0,
        startTime: '19:30',
        endTime: '19:48',
        accuracy: 93.3,
        speed: 1.2
    },
    {
        id: 5,
        date: '2025-03-05',
        exercise: 'Chính tả - Phân biệt âm vần',
        exerciseId: 'van-5-2',
        subject: 'van',
        subjectName: 'Tiếng Việt',
        class: 5,
        score: 80,
        timeSpent: 10,
        status: 'completed',
        questions: 10,
        correct: 8,
        wrong: 2,
        skipped: 0,
        startTime: '20:15',
        endTime: '20:25',
        accuracy: 80,
        speed: 1.0
    },
    {
        id: 6,
        date: '2025-03-04',
        exercise: 'Unit 2: School',
        exerciseId: 'anh-5-2',
        subject: 'anh',
        subjectName: 'Tiếng Anh',
        class: 5,
        score: 0,
        timeSpent: 0,
        status: 'pending',
        questions: 12,
        correct: 0,
        wrong: 0,
        skipped: 0,
        startTime: null,
        endTime: null,
        accuracy: 0,
        speed: 0
    }
];

// ============================================
// PHẦN 13: DỮ LIỆU PHƯƠNG THỨC THANH TOÁN
// ============================================

window.paymentMethods = [
    {
        id: 'momo',
        name: 'Ví MoMo',
        icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'50\' height=\'50\' viewBox=\'0 0 50 50\'%3E%3Ccircle cx=\'25\' cy=\'25\' r=\'25\' fill=\'%23a50064\'/%3E%3Ctext x=\'25\' y=\'30\' text-anchor=\'middle\' fill=\'white\' font-size=\'12\'%3EMoMo%3C/text%3E%3C/svg%3E',
        color: '#a50064',
        discount: 5,
        processingTime: 'Ngay lập tức'
    },
    {
        id: 'vnpay',
        name: 'VNPAY',
        icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'50\' height=\'50\' viewBox=\'0 0 50 50\'%3E%3Ccircle cx=\'25\' cy=\'25\' r=\'25\' fill=\'%23003399\'/%3E%3Ctext x=\'25\' y=\'30\' text-anchor='middle' fill='white' font-size='12'%3EVNPAY%3C/text%3E%3C/svg%3E',
        color: '#003399',
        discount: 3,
        processingTime: '1-2 phút'
    },
    {
        id: 'zalopay',
        name: 'ZaloPay',
        icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'50\' height=\'50\' viewBox=\'0 0 50 50\'%3E%3Ccircle cx=\'25\' cy=\'25\' r=\'25\' fill=\'%230066ff\'/%3E%3Ctext x=\'25\' y=\'30\' text-anchor=\'middle\' fill=\'white\' font-size=\'12\'%3EZalo%3C/text%3E%3C/svg%3E',
        color: '#0066ff',
        discount: 4,
        processingTime: 'Ngay lập tức'
    },
    {
        id: 'bank',
        name: 'Thẻ ATM nội địa',
        icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'50\' height=\'50\' viewBox=\'0 0 50 50\'%3E%3Ccircle cx=\'25\' cy=\'25\' r=\'25\' fill=\'%23333\'/%3E%3Ctext x=\'25\' y=\'30\' text-anchor=\'middle\' fill=\'white\' font-size=\'12\'%3EATM%3C/text%3E%3C/svg%3E',
        color: '#333333',
        discount: 0,
        processingTime: '5-10 phút'
    },
    {
        id: 'credit',
        name: 'Thẻ tín dụng quốc tế',
        icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'50\' height=\'50\' viewBox=\'0 0 50 50\'%3E%3Ccircle cx=\'25\' cy=\'25\' r=\'25\' fill=\'%23444\'/%3E%3Ctext x=\'25\' y=\'30\' text-anchor=\'middle\' fill=\'white\' font-size=\'12\'%3EVisa%3C/text%3E%3C/svg%3E',
        color: '#444444',
        discount: 2,
        processingTime: 'Ngay lập tức'
    }
];

// ============================================
// PHẦN 14: AI RECOMMENDATION ENGINE DATA
// ============================================

window.aiRecommendations = {
    // Gợi ý dựa trên điểm yếu
    byWeakness: {
        toan: [
            { type: 'exercise', id: 'toan-5-1', reason: 'Cần củng cố kiến thức phân số cơ bản' },
            { type: 'course', id: 5, reason: 'Khóa học Toán lớp 5 phù hợp với trình độ' }
        ],
        van: [
            { type: 'exercise', id: 'van-5-2', reason: 'Luyện thêm chính tả để cải thiện điểm số' },
            { type: 'exercise', id: 'van-5-3', reason: 'Ôn tập từ loại và câu' }
        ],
        anh: [
            { type: 'exercise', id: 'anh-5-1', reason: 'Bắt đầu với các bài cơ bản' },
            { type: 'exercise', id: 'anh-5-4', reason: 'Củng cố ngữ pháp hiện tại đơn' }
        ]
    },
    
    // Gợi ý dựa trên lịch sử học tập
    byHistory: {
        recent: [
            { type: 'exam', id: 1, reason: 'Bạn vừa học Toán, thử sức với đề thi thử' },
            { type: 'exercise', id: 'toan-5-3', reason: 'Tiếp tục với số thập phân' }
        ],
        similar: [
            { type: 'exercise', id: 'toan-5-4', reason: 'Bài tập tương tự bạn đã làm tốt' }
        ]
    },
    
    // Gợi ý dựa trên mục tiêu
    byGoal: {
        exam_prep: [
            { type: 'exam', id: 6, reason: 'Đề thi thử vào lớp 6 - Phù hợp mục tiêu' },
            { type: 'course', id: 6, reason: 'Khóa luyện thi vào 6 chuyên sâu' }
        ],
        daily_practice: [
            { type: 'exercise', id: 'toan-5-1', reason: 'Bài tập nhanh 15 phút' },
            { type: 'exercise', id: 'anh-5-1', reason: 'Ôn từ vựng cơ bản' }
        ]
    }
};

// ============================================
// PHẦN 15: UTILITY FUNCTIONS
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
    return window.achievementsList;
};

window.getStudyHistory = function(days = 30) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return window.studyHistory.filter(h => {
        const historyDate = new Date(h.date);
        return historyDate >= cutoff;
    });
};

window.getPaymentMethods = function() {
    return window.paymentMethods;
};

// AI Recommendation Functions
window.getPersonalizedRecommendations = function(userId) {
    const user = window.getUserById(userId);
    if (!user) return [];
    
    const recommendations = [];
    const profile = user.learningProfile;
    
    // Dựa trên điểm yếu
    profile.weaknesses.forEach(weakness => {
        const recs = window.aiRecommendations.byWeakness[weakness] || [];
        recommendations.push(...recs);
    });
    
    // Dựa trên lịch sử gần đây
    const recentHistory = window.studyHistory.slice(0, 3);
    if (recentHistory.length > 0) {
        recommendations.push(...window.aiRecommendations.byHistory.recent);
    }
    
    return recommendations.slice(0, 5); // Tối đa 5 gợi ý
};

// Analytics Functions
window.getLearningAnalytics = function(userId) {
    const user = window.getUserById(userId);
    const history = window.studyHistory.filter(h => h.status === 'completed');
    
    if (!user || history.length === 0) return null;
    
    // Tính toán các chỉ số
    const totalTime = history.reduce((sum, h) => sum + (h.timeSpent || 0), 0);
    const avgScore = history.reduce((sum, h) => sum + (h.score || 0), 0) / history.length;
    const accuracy = history.reduce((sum, h) => sum + (h.accuracy || 0), 0) / history.length;
    
    // Phân tích theo môn
    const subjectStats = {};
    ['toan', 'van', 'anh'].forEach(subject => {
        const subjectHistory = history.filter(h => h.subject === subject);
        if (subjectHistory.length > 0) {
            subjectStats[subject] = {
                completed: subjectHistory.length,
                avgScore: subjectHistory.reduce((s, h) => s + h.score, 0) / subjectHistory.length,
                totalTime: subjectHistory.reduce((s, h) => s + h.timeSpent, 0)
            };
        }
    });
    
    // Dự đoán điểm thi
    const predictedExamScore = Math.round(avgScore * 0.9 + (accuracy * 10));
    
    return {
        userId: userId,
        totalExercises: history.length,
        totalTime: totalTime,
        averageScore: Math.round(avgScore),
        accuracy: Math.round(accuracy),
        subjectStats: subjectStats,
        predictedExamScore: predictedExamScore,
        weeklyTrend: calculateWeeklyTrend(history),
        strengths: user.learningProfile.strengths,
        weaknesses: user.learningProfile.weaknesses,
        recommendations: getPersonalizedRecommendations(userId)
    };
};

function calculateWeeklyTrend(history) {
    // Tính xu hướng điểm số theo tuần
    const weeklyScores = {};
    history.forEach(h => {
        const date = new Date(h.date);
        const week = `${date.getFullYear()}-W${getWeekNumber(date)}`;
        if (!weeklyScores[week]) weeklyScores[week] = [];
        weeklyScores[week].push(h.score);
    });
    
    const weeks = Object.keys(weeklyScores).sort();
    if (weeks.length < 2) return 'stable';
    
    const lastWeek = weeklyScores[weeks[weeks.length - 1]].reduce((a,b) => a+b, 0) / weeklyScores[weeks[weeks.length - 1]].length;
    const prevWeek = weeklyScores[weeks[weeks.length - 2]].reduce((a,b) => a+b, 0) / weeklyScores[weeks[weeks.length - 2]].length;
    
    if (lastWeek > prevWeek + 5) return 'up';
    if (lastWeek < prevWeek - 5) return 'down';
    return 'stable';
}

function getWeekNumber(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const week1 = new Date(d.getFullYear(), 0, 4);
    return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

// Format Functions
window.formatCurrency = function(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
};

window.formatNumber = function(num) {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
};

window.formatTime = function(minutes) {
    if (minutes < 60) return minutes + ' phút';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours + 'h' + (mins > 0 ? mins + 'p' : '');
};

window.formatDate = function(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
};

console.log('%c✅ DATA.JS SIÊU THÔNG MINH LOADED!', 'color: #00b14f; font-size: 16px; font-weight: bold;');
console.log('%c🔥 Version 4.0 - Team C00LKIDD', 'color: #0088cc; font-size: 14px;');