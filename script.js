// ============================================
// SCRIPT.JS SIÊU THÔNG MINH - PHẦN 1: KHỞI TẠO & CẤU HÌNH
// ============================================

// CẤU HÌNH TOÀN CỤC
const CONFIG = {
    APP_NAME: 'VioEdu',
    VERSION: '3.0',
    DEBUG: true,
    STORAGE_KEYS: {
        USER: 'vioedu_user',
        PACKAGE: 'selected_package',
        LOGIN_HISTORY: 'login_history',
        REGISTRATIONS: 'registrations',
        TRANSACTIONS: 'transactions',
        STUDY_HISTORY: 'study_history',
        SETTINGS: 'user_settings',
        BOOKMARKS: 'bookmarks',
        NOTES: 'notes',
        ACHIEVEMENTS: 'achievements',
        DAILY_GOALS: 'daily_goals',
        EXAM_HISTORY: 'exam_history'
    },
    NOTIFICATION_DURATION: 3000,
    MAX_HISTORY_ITEMS: 100,
    DEFAULT_USER: {
        username: 'hocsinh1',
        password: '123456'
    },
    EXAM_CONFIG: {
        TIME_PER_QUESTION: 60, // 60 giây/câu
        DEFAULT_QUESTIONS: 30,
        DEFAULT_TIME: 30 * 60 // 30 phút
    }
};

// BIẾN TOÀN CỤC
let currentUser = null;
let currentExercise = null;
let currentExam = null;
let currentAnswers = [];
let currentQuestions = [];
let currentQuestionIndex = 0;
let examTimer = null;
let examTimeLeft = 0;
let examStartTime = null;
let appSettings = {};
let dailyGoals = {};
let achievements = [];

// KHỞI TẠO ỨNG DỤNG
document.addEventListener('DOMContentLoaded', function() {
    console.log(`🚀 ${CONFIG.APP_NAME} v${CONFIG.VERSION} Script Loaded!`);
    
    // Khởi tạo theo thứ tự
    initializeSettings();
    checkLoginStatus();
    loadDailyGoals();
    loadPageContent();
    initializeEventListeners();
    updateUI();
    initializeAnimations();
    checkAchievements();
    
    // Log thông tin debug
    if (CONFIG.DEBUG) {
        console.log('✅ App initialized with config:', CONFIG);
    }
});

// KHỞI TẠO CÀI ĐẶT
function initializeSettings() {
    try {
        const savedSettings = localStorage.getItem(CONFIG.STORAGE_KEYS.SETTINGS);
        appSettings = savedSettings ? JSON.parse(savedSettings) : {
            theme: 'light',
            notifications: true,
            autoSave: true,
            language: 'vi',
            fontSize: 'medium',
            sound: true,
            autoNext: true,
            examReminder: true,
            dailyGoal: 30
        };
    } catch (e) {
        console.error('❌ Error loading settings:', e);
        appSettings = { 
            theme: 'light', 
            notifications: true, 
            autoSave: true, 
            language: 'vi',
            fontSize: 'medium',
            sound: true,
            autoNext: true,
            examReminder: true,
            dailyGoal: 30
        };
    }
}

// KIỂM TRA ĐĂNG NHẬP
function checkLoginStatus() {
    const user = sessionStorage.getItem(CONFIG.STORAGE_KEYS.USER) || 
                 localStorage.getItem(CONFIG.STORAGE_KEYS.USER);
    if (user) {
        try {
            currentUser = JSON.parse(user);
            console.log('✅ User logged in:', currentUser.name);
            trackUserActivity('login', { username: currentUser.username });
            updateLastActive();
            loadUserAchievements();
        } catch (e) {
            console.error('❌ Error parsing user data');
        }
    }
}

// CẬP NHẬT LẦN HOẠT ĐỘNG CUỐI
function updateLastActive() {
    if (currentUser) {
        currentUser.lastActive = new Date().toISOString();
        saveUserData();
    }
}

// LƯU DỮ LIỆU NGƯỜI DÙNG
function saveUserData() {
    if (currentUser) {
        const storage = currentUser.rememberMe ? localStorage : sessionStorage;
        storage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(currentUser));
    }
}

// THEO DÕI HOẠT ĐỘNG NGƯỜI DÙNG
function trackUserActivity(action, data = {}) {
    if (!currentUser && action !== 'login') return;
    
    try {
        let activities = JSON.parse(localStorage.getItem('user_activities') || '[]');
        activities.push({
            userId: currentUser?.id || 'guest',
            username: currentUser?.username || 'guest',
            action: action,
            data: data,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        });
        
        // Giữ tối đa 200 hoạt động
        if (activities.length > 200) activities = activities.slice(-200);
        localStorage.setItem('user_activities', JSON.stringify(activities));
    } catch (e) {
        console.error('Error tracking activity:', e);
    }
}

// TẢI MỤC TIÊU HÀNG NGÀY
function loadDailyGoals() {
    if (!currentUser) return;
    try {
        const saved = localStorage.getItem(`${CONFIG.STORAGE_KEYS.DAILY_GOALS}_${currentUser.id}`);
        dailyGoals = saved ? JSON.parse(saved) : {
            date: new Date().toDateString(),
            exercisesDone: 0,
            exercisesTarget: 5,
            timeSpent: 0,
            timeTarget: 30,
            examsDone: 0,
            examsTarget: 1,
            streak: 0
        };
        
        // Reset nếu ngày mới
        if (dailyGoals.date !== new Date().toDateString()) {
            const oldStreak = dailyGoals.streak;
            const wasCompleted = dailyGoals.exercisesDone >= dailyGoals.exercisesTarget;
            
            dailyGoals = {
                date: new Date().toDateString(),
                exercisesDone: 0,
                exercisesTarget: 5,
                timeSpent: 0,
                timeTarget: 30,
                examsDone: 0,
                examsTarget: 1,
                streak: wasCompleted ? oldStreak + 1 : 0
            };
            saveDailyGoals();
        }
    } catch (e) {
        console.error('Error loading daily goals:', e);
    }
}

// LƯU MỤC TIÊU HÀNG NGÀY
function saveDailyGoals() {
    if (!currentUser) return;
    localStorage.setItem(`${CONFIG.STORAGE_KEYS.DAILY_GOALS}_${currentUser.id}`, JSON.stringify(dailyGoals));
}

// TẢI THÀNH TỰU NGƯỜI DÙNG
function loadUserAchievements() {
    if (!currentUser) return;
    try {
        const saved = localStorage.getItem(`${CONFIG.STORAGE_KEYS.ACHIEVEMENTS}_${currentUser.id}`);
        achievements = saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error('Error loading achievements:', e);
        achievements = [];
    }
}

// KIỂM TRA THÀNH TỰU
function checkAchievements() {
    if (!currentUser || !window.achievementsList) return;
    
    const allAchievements = window.achievementsList || [];
    const unlocked = new Set(achievements.map(a => a.id));
    
    // Kiểm tra từng thành tựu
    allAchievements.forEach(achievement => {
        if (unlocked.has(achievement.id)) return;
        
        let earned = false;
        
        switch(achievement.condition.type) {
            case 'exercises':
                const history = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.STUDY_HISTORY) || '[]');
                earned = history.length >= achievement.condition.value;
                break;
            case 'score':
                const bestScore = Math.max(...(window.studyHistory || []).map(h => h.score || 0));
                earned = bestScore >= achievement.condition.value;
                break;
            case 'streak':
                earned = (dailyGoals.streak || 0) >= achievement.condition.value;
                break;
            case 'exams':
                const examHistory = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.EXAM_HISTORY) || '[]');
                earned = examHistory.length >= achievement.condition.value;
                break;
        }
        
        if (earned) {
            unlockAchievement(achievement);
        }
    });
}

// MỞ KHÓA THÀNH TỰU
function unlockAchievement(achievement) {
    achievements.push({
        id: achievement.id,
        name: achievement.name,
        unlockedAt: new Date().toISOString()
    });
    
    localStorage.setItem(`${CONFIG.STORAGE_KEYS.ACHIEVEMENTS}_${currentUser.id}`, JSON.stringify(achievements));
    
    showNotification(`🏆 Thành tựu: ${achievement.name}`, 'success');
    trackUserActivity('achievement_unlocked', { achievementId: achievement.id });
}
// ============================================
// SCRIPT.JS SIÊU THÔNG MINH - PHẦN 2: XỬ LÝ ĐĂNG NHẬP
// ============================================

// XỬ LÝ ĐĂNG NHẬP
function handleLogin() {
    const username = document.getElementById('username')?.value.trim();
    const password = document.getElementById('password')?.value.trim();
    const rememberMe = document.querySelector('.checkbox input')?.checked || false;
    
    if (!username || !password) {
        showNotification('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!', 'error');
        return;
    }
    
    // Kiểm tra trong fakeUsers
    const user = window.fakeUsers?.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Đăng nhập thành công
        currentUser = {
            ...user,
            rememberMe: rememberMe,
            lastLogin: new Date().toISOString()
        };
        
        // Lưu theo lựa chọn remember me
        if (rememberMe) {
            localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(currentUser));
        } else {
            sessionStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(currentUser));
        }
        
        // Ghi log
        saveLoginHistory(username, 'success');
        trackUserActivity('login_success', { username, rememberMe });
        
        showNotification(`Đăng nhập thành công! Chào mừng ${user.name}`, 'success');
        
        // Chuyển hướng sau 1s
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        // Đăng nhập thất bại
        showNotification('Sai tên đăng nhập hoặc mật khẩu! (Gợi ý: hocsinh1 / 123456)', 'error');
        saveLoginHistory(username, 'failed');
        trackUserActivity('login_failed', { username });
        
        // Gợi ý tài khoản demo
        suggestDemoAccount();
    }
}

// GỢI Ý TÀI KHOẢN DEMO
function suggestDemoAccount() {
    setTimeout(() => {
        const demoAlert = document.createElement('div');
        demoAlert.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: #00b14f;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 9998;
            cursor: pointer;
            animation: slideInLeft 0.3s;
        `;
        demoAlert.innerHTML = `
            <strong>🔑 Tài khoản demo:</strong> hocsinh1 / 123456
            <br><small>Click để tự động điền</small>
        `;
        demoAlert.onclick = () => {
            document.getElementById('username').value = 'hocsinh1';
            document.getElementById('password').value = '123456';
            demoAlert.remove();
        };
        document.body.appendChild(demoAlert);
        
        setTimeout(() => demoAlert.remove(), 8000);
    }, 2000);
}

// LƯU LỊCH SỬ ĐĂNG NHẬP
function saveLoginHistory(username, status) {
    try {
        let history = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.LOGIN_HISTORY) || '[]');
        history.push({
            username: username,
            status: status,
            time: new Date().toLocaleString('vi-VN'),
            userAgent: navigator.userAgent,
            ip: '127.0.0.1'
        });
        if (history.length > 50) history = history.slice(-50);
        localStorage.setItem(CONFIG.STORAGE_KEYS.LOGIN_HISTORY, JSON.stringify(history));
    } catch (e) {
        console.error('Error saving login history:', e);
    }
}

// ĐĂNG XUẤT
function logout() {
    trackUserActivity('logout', { username: currentUser?.username });
    sessionStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
    localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
    currentUser = null;
    
    showNotification('Đã đăng xuất!', 'info');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// HIỂN THỊ THÔNG BÁO
function showNotification(message, type = 'info', duration = CONFIG.NOTIFICATION_DURATION) {
    const colors = {
        success: '#00b14f',
        error: '#ff4757',
        warning: '#ffa502',
        info: '#00b14f'
    };
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${colors[type]};
        color: white;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 350px;
        cursor: pointer;
    `;
    notification.innerHTML = `${icons[type]} ${message}`;
    notification.onclick = () => notification.remove();
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s';
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
    
    addNotificationAnimations();
}

// THÊM ANIMATION CHO THÔNG BÁO
function addNotificationAnimations() {
    if (document.getElementById('notification-animations')) return;
    
    const style = document.createElement('style');
    style.id = 'notification-animations';
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes slideInLeft {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes popIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}
// ============================================
// SCRIPT.JS SIÊU THÔNG MINH - PHẦN 3: XỬ LÝ ĐĂNG KÝ
// ============================================

// XỬ LÝ ĐĂNG KÝ GOOGLE
function handleGoogleRegister() {
    showNotification('Tính năng đăng ký bằng Google đang phát triển!', 'warning');
    trackUserActivity('register_google_attempt');
    simulateOAuth('google');
}

// XỬ LÝ ĐĂNG KÝ FACEBOOK
function handleFacebookRegister() {
    showNotification('Tính năng đăng ký bằng Facebook đang phát triển!', 'warning');
    trackUserActivity('register_facebook_attempt');
    simulateOAuth('facebook');
}

// GIẢ LẬP OATH
function simulateOAuth(provider) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        animation: popIn 0.3s;
    `;
    
    popup.innerHTML = `
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%2300b14f' opacity='0.2'/%3E%3Ctext x='32' y='40' text-anchor='middle' fill='%2300b14f' font-size='32'%3E${provider === 'google' ? 'G' : 'f'}</text%3E%3C/svg%3E"
            alt="${provider}"
            style="margin-bottom: 20px;"
        >
        <h3 style="margin-bottom: 15px;">Đăng nhập bằng ${provider === 'google' ? 'Google' : 'Facebook'}</h3>
        <p style="margin-bottom: 20px; color: #666;">Đây là tính năng giả lập. Vui lòng đăng ký bằng email!</p>
        <button style="
            background: #00b14f;
            color: white;
            border: none;
            padding: 10px 30px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        " onclick="this.closest('.overlay').remove()">Đóng</button>
    `;
    
    overlay.className = 'overlay';
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

// XỬ LÝ SUBMIT FORM ĐĂNG KÝ
function handleRegisterSubmit(event) {
    event.preventDefault();
    
    const formData = {
        fullname: document.getElementById('fullname')?.value.trim(),
        email: document.getElementById('email')?.value.trim(),
        phone: document.getElementById('phone')?.value.trim(),
        password: document.getElementById('password')?.value,
        confirmPassword: document.getElementById('confirmPassword')?.value,
        class: document.getElementById('class')?.value
    };
    
    const errors = validateRegistration(formData);
    
    if (errors.length > 0) {
        showNotification(errors[0], 'error');
        highlightErrors(errors);
        return;
    }
    
    if (isEmailExists(formData.email)) {
        showNotification('Email đã được sử dụng!', 'error');
        return;
    }
    
    saveRegistration(formData);
    
    showNotification('Đăng ký thành công! Vui lòng đăng nhập.', 'success');
    trackUserActivity('register_success', { email: formData.email });
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// VALIDATE ĐĂNG KÝ
function validateRegistration(data) {
    const errors = [];
    
    if (!data.fullname) errors.push('Họ và tên không được để trống');
    else if (data.fullname.length < 3) errors.push('Họ và tên phải có ít nhất 3 ký tự');
    
    if (!data.email) errors.push('Email không được để trống');
    else if (!isValidEmail(data.email)) errors.push('Email không hợp lệ');
    
    if (data.phone && !isValidPhone(data.phone)) errors.push('Số điện thoại không hợp lệ');
    
    if (!data.password) errors.push('Mật khẩu không được để trống');
    else if (data.password.length < 6) errors.push('Mật khẩu phải có ít nhất 6 ký tự');
    else if (!isStrongPassword(data.password)) errors.push('Mật khẩu phải gồm chữ hoa, chữ thường và số');
    
    if (data.password !== data.confirmPassword) errors.push('Mật khẩu không khớp');
    
    return errors;
}

// KIỂM TRA EMAIL HỢP LỆ
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// KIỂM TRA SỐ ĐIỆN THOẠI
function isValidPhone(phone) {
    const re = /^(0|\+84)[3-9][0-9]{8}$/;
    return re.test(phone);
}

// KIỂM TRA MẬT KHẨU MẠNH
function isStrongPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password);
}

// KIỂM TRA EMAIL TỒN TẠI
function isEmailExists(email) {
    try {
        const registrations = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.REGISTRATIONS) || '[]');
        return registrations.some(r => r.email === email);
    } catch {
        return false;
    }
}

// LƯU ĐĂNG KÝ
function saveRegistration(data) {
    try {
        let registrations = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.REGISTRATIONS) || '[]');
        registrations.push({
            ...data,
            password: '********',
            time: new Date().toLocaleString('vi-VN'),
            verified: false
        });
        localStorage.setItem(CONFIG.STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
    } catch (e) {
        console.error('Error saving registration:', e);
        throw e;
    }
}

// HIGHLIGHT LỖI
function highlightErrors(errors) {
    const fields = ['fullname', 'email', 'phone', 'password', 'confirmPassword'];
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (input) input.style.borderColor = '#ddd';
    });
    
    errors.forEach(error => {
        if (error.includes('Họ và tên')) {
            document.getElementById('fullname').style.borderColor = '#ff4757';
        } else if (error.includes('Email')) {
            document.getElementById('email').style.borderColor = '#ff4757';
        } else if (error.includes('Mật khẩu')) {
            document.getElementById('password').style.borderColor = '#ff4757';
            document.getElementById('confirmPassword').style.borderColor = '#ff4757';
        }
    });
}
// ============================================
// SCRIPT.JS SIÊU THÔNG MINH - PHẦN 4: XỬ LÝ GÓI HỌC
// ============================================

const PACKAGES = {
    basic: { 
        name: 'Cơ bản', 
        price: 199000, 
        id: 'basic',
        features: [
            '50 bài tập/tháng',
            '5 đề thi thử',
            'Theo dõi tiến độ'
        ]
    },
    pro: { 
        name: 'Pro', 
        price: 399000, 
        id: 'pro',
        features: [
            '200 bài tập/tháng',
            '20 đề thi thử',
            'Theo dõi tiến độ',
            'Hỏi đáp với giáo viên',
            'Bài giảng video'
        ]
    },
    vip: { 
        name: 'VIP', 
        price: 799000, 
        id: 'vip',
        features: [
            'Không giới hạn bài tập',
            '50 đề thi thử',
            'Theo dõi tiến độ',
            'Hỏi đáp với giáo viên',
            'Bài giảng video',
            'Kèm 1-1 với giáo viên'
        ]
    }
};

function selectPackage(packageType) {
    const selectedPackage = PACKAGES[packageType];
    if (!selectedPackage) return;
    
    sessionStorage.setItem(CONFIG.STORAGE_KEYS.PACKAGE, JSON.stringify(selectedPackage));
    updatePaymentInfo(selectedPackage);
    suggestPackage(selectedPackage);
    
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'thanh-toan.html') {
        showNotification(`Bạn đã chọn gói ${selectedPackage.name}. Đang chuyển đến thanh toán...`, 'success');
        setTimeout(() => {
            window.location.href = 'thanh-toan.html';
        }, 1500);
    }
}

function suggestPackage(selectedPackage) {
    const history = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.STUDY_HISTORY) || '[]');
    const monthlyExercises = history.filter(h => {
        const date = new Date(h.date);
        const now = new Date();
        return date.getMonth() === now.getMonth();
    }).length;
    
    let suggestion = '';
    if (monthlyExercises > 150) {
        suggestion = 'Gói VIP phù hợp với nhu cầu học tập của bạn!';
    } else if (monthlyExercises > 50) {
        suggestion = 'Gói Pro là lựa chọn tốt nhất cho bạn!';
    }
    
    if (suggestion && selectedPackage.name !== 'VIP' && monthlyExercises > 150) {
        setTimeout(() => {
            showNotification(suggestion, 'info', 5000);
        }, 2000);
    }
}

function updatePaymentInfo(pkg) {
    const elements = {
        packageName: document.getElementById('packageName'),
        packagePrice: document.getElementById('packagePrice'),
        totalPrice: document.getElementById('totalPrice')
    };
    
    if (pkg) {
        if (elements.packageName) elements.packageName.textContent = pkg.name;
        if (elements.packagePrice) elements.packagePrice.textContent = formatCurrency(pkg.price);
        if (elements.totalPrice) elements.totalPrice.textContent = formatCurrency(pkg.price);
    }
}

function formatCurrency(amount) {
    return amount.toLocaleString() + 'đ';
}
// ============================================
// SCRIPT.JS SIÊU THÔNG MINH - PHẦN 5: XỬ LÝ THANH TOÁN
// ============================================

function selectPayment(method) {
    const selectedPackage = JSON.parse(sessionStorage.getItem(CONFIG.STORAGE_KEYS.PACKAGE));
    
    if (!selectedPackage) {
        showNotification('Vui lòng chọn gói học trước!', 'warning');
        return;
    }
    
    const transaction = createTransaction(selectedPackage, method);
    saveTransaction(transaction);
    processPaymentByMethod(transaction);
}

function createTransaction(pkg, method) {
    return {
        id: 'TXN' + Date.now() + Math.floor(Math.random() * 1000),
        package: pkg,
        method: method,
        amount: pkg.price,
        time: new Date().toISOString(),
        user: currentUser?.name || 'Khách',
        userEmail: currentUser?.email || '',
        userId: currentUser?.id || null,
        status: 'pending'
    };
}

function saveTransaction(transaction) {
    try {
        let transactions = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.TRANSACTIONS) || '[]');
        transactions.push(transaction);
        localStorage.setItem(CONFIG.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
        trackUserActivity('transaction_created', { 
            transactionId: transaction.id,
            amount: transaction.amount,
            method: transaction.method
        });
    } catch (e) {
        console.error('Error saving transaction:', e);
    }
}

function processPaymentByMethod(transaction) {
    const methodHandlers = {
        momo: () => simulatePayment(transaction, 'Ví MoMo', '#a50064'),
        vnpay: () => simulatePayment(transaction, 'VNPAY', '#003399'),
        zalopay: () => simulatePayment(transaction, 'ZaloPay', '#0066ff'),
        bank: () => simulatePayment(transaction, 'Thẻ ATM', '#333333'),
        credit: () => simulatePayment(transaction, 'Thẻ tín dụng', '#444444')
    };
    
    const handler = methodHandlers[transaction.method];
    if (handler) handler();
    else simulatePayment(transaction, 'Cổng thanh toán', '#00b14f');
}

function simulatePayment(transaction, methodName, color) {
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        z-index: 10000;
        text-align: center;
        min-width: 350px;
        animation: popIn 0.3s;
    `;
    
    popup.innerHTML = `
        <div style="width: 80px; height: 80px; background: ${color}; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 40px;">💰</span>
        </div>
        <h3 style="margin-bottom: 15px;">Đang xử lý thanh toán</h3>
        <p style="margin-bottom: 10px; color: #666;">Phương thức: <strong>${methodName}</strong></p>
        <p style="margin-bottom: 20px; font-size: 24px; color: #00b14f; font-weight: bold;">${formatCurrency(transaction.amount)}</p>
        <div style="width: 100%; height: 4px; background: #eee; border-radius: 2px; overflow: hidden;">
            <div class="payment-progress" style="width: 0%; height: 100%; background: ${color}; transition: width 0.1s;"></div>
        </div>
        <p class="payment-status" style="margin-top: 15px; color: #666;">Đang kết nối cổng thanh toán...</p>
    `;
    
    document.body.appendChild(popup);
    
    const steps = [
        { progress: 20, status: 'Đang kết nối cổng thanh toán...' },
        { progress: 40, status: 'Đang xác thực thông tin...' },
        { progress: 60, status: 'Đang xử lý giao dịch...' },
        { progress: 80, status: 'Đang chờ xác nhận...' },
        { progress: 100, status: 'Hoàn tất!' }
    ];
    
    let currentStep = 0;
    const progressBar = popup.querySelector('.payment-progress');
    const statusEl = popup.querySelector('.payment-status');
    
    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            const step = steps[currentStep];
            if (progressBar) progressBar.style.width = step.progress + '%';
            if (statusEl) statusEl.textContent = step.status;
            currentStep++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                if (popup.parentNode) {
                    popup.remove();
                    completePayment(transaction);
                }
            }, 500);
        }
    }, 600);
}

function completePayment(transaction) {
    try {
        let transactions = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.TRANSACTIONS) || '[]');
        const savedTransaction = transactions.find(t => t.id === transaction.id);
        if (savedTransaction) {
            savedTransaction.status = 'completed';
            savedTransaction.completedAt = new Date().toISOString();
            localStorage.setItem(CONFIG.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
        }
    } catch (e) {
        console.error('Error updating transaction:', e);
    }
    
    if (currentUser) {
        currentUser.package = transaction.package.id;
        currentUser.packageExpire = calculateExpireDate();
        saveUserData();
    }
    
    showNotification('Thanh toán thành công! Cảm ơn bạn đã sử dụng dịch vụ của VioEdu.', 'success');
    trackUserActivity('payment_success', { 
        transactionId: transaction.id,
        amount: transaction.amount 
    });
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 2000);
}

function calculateExpireDate() {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
}
// ============================================
// SCRIPT.JS SIÊU THÔNG MINH - PHẦN 6: LOAD NỘI DUNG TRANG
// ============================================

function loadPageContent() {
    const path = window.location.pathname.split('/').pop();
    
    switch(path) {
        case 'luyen-tap.html':
            loadExercises();
            break;
        case 'thi-thu.html':
            loadExams();
            break;
        case 'dashboard.html':
            loadDashboard();
            break;
        case 'thanh-toan.html':
            loadPaymentInfo();
            break;
        case 'khoa-hoc.html':
            loadCourses();
            break;
        case 'bang-xep-hang.html':
            loadRanking('week');
            break;
        case 'tai-khoan.html':
            loadProfile();
            break;
        case 'lich-su.html':
            loadStudyHistory();
            break;
        default:
            if (path.includes('bai-tap.html')) {
                loadExerciseDetail();
            } else if (path.includes('thi.html')) {
                loadExamDetail();
            }
    }
}

function loadDashboard() {
    if (!currentUser) {
        const user = sessionStorage.getItem(CONFIG.STORAGE_KEYS.USER) || 
                     localStorage.getItem(CONFIG.STORAGE_KEYS.USER);
        if (user) currentUser = JSON.parse(user);
    }
    
    updateUserInfo();
    updateStats();
    loadRecommendedExams();
    loadRecentActivities();
}

function updateUserInfo() {
    if (!currentUser) return;
    
    const elements = {
        userName: document.querySelectorAll('.user-name'),
        avatar: document.querySelectorAll('.avatar'),
        welcomeName: document.getElementById('welcomeName'),
        userNameDisplay: document.getElementById('userName'),
        userAvatar: document.getElementById('userAvatar'),
        profileName: document.getElementById('profileName'),
        profileClass: document.getElementById('profileClass'),
        userPoints: document.getElementById('userPoints'),
        userRank: document.getElementById('userRank')
    };
    
    elements.userName?.forEach(el => {
        if (el) el.textContent = currentUser.name;
    });
    
    elements.avatar?.forEach(el => {
        if (el) el.textContent = currentUser.name.charAt(0);
    });
    
    if (elements.welcomeName) elements.welcomeName.textContent = currentUser.name;
    if (elements.userNameDisplay) elements.userNameDisplay.textContent = currentUser.name;
    if (elements.userAvatar) elements.userAvatar.textContent = currentUser.name.charAt(0);
    if (elements.profileName) elements.profileName.textContent = currentUser.name;
    if (elements.profileClass) elements.profileClass.textContent = `Lớp ${currentUser.class}`;
    if (elements.userPoints) elements.userPoints.textContent = formatNumber(currentUser.points || 0);
    if (elements.userRank) elements.userRank.textContent = '#' + (currentUser.rank || 12);
}

function updateStats() {
    const stats = {
        totalExercises: document.getElementById('totalExercises'),
        completedExercises: document.getElementById('completedExercises'),
        avgScore: document.getElementById('avgScore'),
        studyTime: document.getElementById('studyTime'),
        streak: document.getElementById('streak'),
        rank: document.getElementById('rank')
    };
    
    const history = window.studyHistory || [];
    const total = history.length;
    const completed = history.filter(h => h.status === 'completed').length;
    const avgScore = history.length ? 
        Math.round(history.reduce((sum, h) => sum + (h.score || 0), 0) / history.length) : 85;
    
    if (stats.totalExercises) stats.totalExercises.textContent = total || '156';
    if (stats.completedExercises) stats.completedExercises.textContent = completed || '98';
    if (stats.avgScore) stats.avgScore.textContent = avgScore + '%';
    if (stats.studyTime) stats.studyTime.textContent = dailyGoals?.timeSpent || '127h';
    if (stats.streak) stats.streak.textContent = (dailyGoals?.streak || 7) + ' ngày';
    if (stats.rank) stats.rank.textContent = '#' + (currentUser?.rank || 12);
}

function loadRecommendedExams() {
    const container = document.querySelector('.recommended-exams');
    if (!container) return;
    
    const exams = window.exams || [];
    const recommended = exams.slice(0, 3);
    
    let html = '';
    recommended.forEach(exam => {
        html += `
            <div class="exam-item" onclick="location.href='thi.html?id=${exam.id}'">
                <h4>${exam.name}</h4>
                <p>${exam.questions} câu - ${exam.time} phút</p>
                <span class="tag">⭐ ${exam.rating}</span>
            </div>
        `;
    });
    
    container.innerHTML = html || '<p>Chưa có đề thi gợi ý</p>';
}

function loadRecentActivities() {
    const container = document.getElementById('recentActivities');
    if (!container) return;
    
    const history = window.studyHistory?.slice(0, 5) || [];
    
    let html = '';
    history.forEach(item => {
        const icon = item.status === 'completed' ? '✅' : '⏳';
        html += `
            <li>
                <i class="fas ${item.status === 'completed' ? 'fa-check-circle' : 'fa-clock'}"></i>
                <div>
                    <strong>${item.exercise}</strong>
                    <p>${item.subjectName} - ${item.score ? 'Đạt ' + item.score + '%' : 'Chưa hoàn thành'}</p>
                    <small>${item.date}</small>
                </div>
            </li>
        `;
    });
    
    container.innerHTML = html || '<li>Chưa có hoạt động</li>';
}
// ============================================
// SCRIPT.JS SIÊU THÔNG MINH - PHẦN 7: LOAD BÀI TẬP
// ============================================

function loadExercises() {
    const container = document.getElementById('exercisesList');
    if (!container) return;
    
    const classFilter = document.getElementById('filterClass')?.value || 'all';
    const subjectFilter = document.getElementById('filterSubject')?.value || 'all';
    const statusFilter = document.getElementById('filterStatus')?.value || 'all';
    
    let exercises = Object.values(window.exercises || {});
    
    if (classFilter !== 'all') {
        exercises = exercises.filter(ex => ex.class == classFilter);
    }
    if (subjectFilter !== 'all') {
        exercises = exercises.filter(ex => ex.subject === subjectFilter);
    }
    if (statusFilter !== 'all') {
        exercises = exercises.filter(ex => {
            if (statusFilter === 'completed') return ex.completed === true;
            if (statusFilter === 'pending') return ex.completed === false;
            return true;
        });
    }
    
    if (exercises.length === 0) {
        container.innerHTML = '<div class="no-data">Không có bài tập nào</div>';
        return;
    }
    
    let html = '';
    exercises.forEach(ex => {
        const progressPercent = ex.completed ? 100 : 0;
        const statusText = ex.completed ? 'Đã hoàn thành' : 'Chưa làm';
        const statusClass = ex.completed ? 'completed' : 'pending';
        
        html += `
            <div class="exercise-card" onclick="location.href='bai-tap.html?id=${ex.id}'">
                <div class="exercise-header">
                    <h3>${ex.title}</h3>
                    <span class="subject-badge ${ex.subject}">${ex.subjectName || ex.subject} ${ex.class}</span>
                </div>
                <p>${ex.questions} câu hỏi - ${ex.time} phút</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${progressPercent}%"></div>
                </div>
                <span class="status ${statusClass}">${statusText}</span>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function loadExerciseDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const exerciseId = urlParams.get('id');
    
    if (!exerciseId) {
        showNotification('Không tìm thấy bài tập!', 'error');
        return;
    }
    
    const exercise = window.exercises?.[exerciseId];
    if (!exercise) {
        showNotification('Bài tập không tồn tại!', 'error');
        return;
    }
    
    currentExercise = exerciseId;
    currentQuestions = window.questions?.[exerciseId] || [];
    currentAnswers = new Array(currentQuestions.length).fill(null);
    currentQuestionIndex = 0;
    
    updateExerciseUI();
}

function updateExerciseUI() {
    const titleEl = document.querySelector('h2');
    if (titleEl) titleEl.textContent = currentExercise?.title || 'Bài tập';
    
    const timerEl = document.getElementById('time');
    if (timerEl) timerEl.textContent = formatTime(currentExercise?.time * 60 || 1200);
    
    renderQuestionNav();
    renderQuestion();
}

function renderQuestionNav() {
    const navContainer = document.querySelector('.question-nav');
    if (!navContainer) return;
    
    let html = '';
    for (let i = 0; i < currentQuestions.length; i++) {
        const answered = currentAnswers[i] !== null;
        html += `
            <button class="q-nav-btn ${i === currentQuestionIndex ? 'active' : ''} 
                    ${answered ? 'answered' : ''}" 
                    onclick="goToQuestion(${i})">
                ${i + 1}
            </button>
        `;
    }
    navContainer.innerHTML = html;
}

function renderQuestion() {
    if (currentQuestions.length === 0) {
        document.querySelector('.question-container').innerHTML = '<p>Không có câu hỏi</p>';
        return;
    }
    
    const q = currentQuestions[currentQuestionIndex];
    if (!q) return;
    
    const container = document.querySelector('.question-container');
    const isLastQuestion = currentQuestionIndex === currentQuestions.length - 1;
    
    let html = `
        <h3>Câu ${currentQuestionIndex + 1}/${currentQuestions.length}</h3>
        <p class="question-text">${q.question}</p>
        <div class="options">
    `;
    
    q.options.forEach((opt, index) => {
        const checked = currentAnswers[currentQuestionIndex] === index ? 'checked' : '';
        html += `
            <label class="option">
                <input type="radio" name="q${currentQuestionIndex}" 
                       value="${index}" ${checked} onchange="saveAnswer(${currentQuestionIndex}, ${index})">
                ${opt}
            </label>
        `;
    });
    
    html += `</div>`;
    
    html += `<div class="question-nav-buttons">`;
    
    if (currentQuestionIndex > 0) {
        html += `<button class="btn-prev" onclick="prevQuestion()">Câu trước</button>`;
    } else {
        html += `<button class="btn-prev" disabled>Trước</button>`;
    }
    
    if (isLastQuestion) {
        html += `<button class="btn-submit" onclick="submitExercise()">Nộp bài</button>`;
    } else {
        html += `<button class="btn-next" onclick="nextQuestion()">Câu tiếp</button>`;
    }
    
    html += `</div>`;
    
    container.innerHTML = html;
}

function saveAnswer(questionIndex, answerIndex) {
    currentAnswers[questionIndex] = answerIndex;
    renderQuestionNav();
    
    if (appSettings.autoNext && questionIndex < currentQuestions.length - 1) {
        setTimeout(() => nextQuestion(), 300);
    }
}

function goToQuestion(index) {
    if (index >= 0 && index < currentQuestions.length) {
        currentQuestionIndex = index;
        renderQuestion();
        renderQuestionNav();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
        renderQuestionNav();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
        renderQuestionNav();
    }
}

function submitExercise() {
    const unanswered = currentAnswers.reduce((count, ans, idx) => {
        return ans === null ? count + 1 : count;
    }, 0);
    
    if (unanswered > 0) {
        if (!confirm(`Bạn còn ${unanswered} câu chưa trả lời. Vẫn nộp bài?`)) {
            return;
        }
    }
    
    let correct = 0;
    currentQuestions.forEach((q, index) => {
        if (currentAnswers[index] === q.answer) correct++;
    });
    
    const score = Math.round((correct / currentQuestions.length) * 100);
    
    saveStudyHistory({
        exerciseId: currentExercise,
        score: score,
        correct: correct,
        total: currentQuestions.length,
        answers: currentAnswers,
        timeSpent: currentExercise?.time || 20
    });
    
    if (dailyGoals) {
        dailyGoals.exercisesDone++;
        dailyGoals.timeSpent += currentExercise?.time || 20;
        saveDailyGoals();
    }
    
    window.location.href = `ket-qua.html?score=${score}&correct=${correct}&total=${currentQuestions.length}`;
}
// ============================================
// SCRIPT.JS SIÊU THÔNG MINH - PHẦN 8: XỬ LÝ ĐỀ THI
// ============================================

function loadExams() {
    const container = document.getElementById('examsList');
    if (!container) return;
    
    const exams = window.exams || [];
    
    if (exams.length === 0) {
        container.innerHTML = '<div class="no-data">Không có đề thi nào</div>';
        return;
    }
    
    let html = '';
    exams.forEach(exam => {
        html += `
            <div class="exam-item" onclick="location.href='thi.html?id=${exam.id}'">
                <div class="exam-info">
                    <h4>${exam.name}</h4>
                    <p><i class="far fa-clock"></i> ${exam.time} phút - <i class="far fa-file-alt"></i> ${exam.questions} câu</p>
                    <p class="exam-meta">Đã có ${(exam.attempts || 0).toLocaleString()} lượt làm</p>
                </div>
                <span class="exam-tag">⭐ ${exam.rating || 4.8}</span>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function loadExamDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const examId = urlParams.get('id');
    
    if (!examId) {
        showNotification('Không tìm thấy đề thi!', 'error');
        return;
    }
    
    const exam = window.exams?.find(e => e.id == examId);
    if (!exam) {
        showNotification('Đề thi không tồn tại!', 'error');
        return;
    }
    
    currentExam = exam;
    
    const examInfo = document.querySelector('.exam-info');
    if (examInfo) {
        examInfo.innerHTML = `
            <h2>${exam.name}</h2>
            <p><i class="far fa-clock"></i> Thời gian: ${exam.time} phút</p>
            <p><i class="far fa-file-alt"></i> Số câu: ${exam.questions} câu</p>
            <p><i class="fas fa-star"></i> Độ khó: ${exam.difficulty || 'Trung bình'}</p>
        `;
    }
    
    const startBtn = document.querySelector('.btn-start');
    if (startBtn) {
        startBtn.onclick = () => startExam(exam);
    }
}

function startExam(exam) {
    // Tạo đề thi ngẫu nhiên từ ngân hàng câu hỏi
    const allQuestions = window.questionBank?.[exam.subject] || [];
    const selectedQuestions = [];
    
    // Chọn ngẫu nhiên số câu theo cấu trúc đề
    const questionCounts = exam.structure || {
        easy: Math.floor(exam.questions * 0.3),
        medium: Math.floor(exam.questions * 0.5),
        hard: exam.questions - Math.floor(exam.questions * 0.3) - Math.floor(exam.questions * 0.5)
    };
    
    // Lấy câu hỏi theo độ khó
    ['easy', 'medium', 'hard'].forEach(level => {
        const levelQuestions = allQuestions.filter(q => q.difficulty === level);
        const shuffled = shuffleArray(levelQuestions);
        selectedQuestions.push(...shuffled.slice(0, questionCounts[level]));
    });
    
    // Xáo trộn lại để trộn các cấp độ
    currentQuestions = shuffleArray(selectedQuestions);
    currentAnswers = new Array(currentQuestions.length).fill(null);
    currentQuestionIndex = 0;
    examTimeLeft = exam.time * 60;
    examStartTime = Date.now();
    
    // Chuyển đến trang làm bài
    sessionStorage.setItem('current_exam', JSON.stringify({
        exam: exam,
        questions: currentQuestions,
        startTime: examStartTime
    }));
    
    window.location.href = 'lam-bai-thi.html';
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
// ============================================
// SCRIPT.JS SIÊU THÔNG MINH - PHẦN 9: XỬ LÝ BÀI THI
// ============================================

function loadExamTaking() {
    const examData = JSON.parse(sessionStorage.getItem('current_exam'));
    if (!examData) {
        window.location.href = 'thi-thu.html';
        return;
    }
    
    currentExam = examData.exam;
    currentQuestions = examData.questions;
    currentAnswers = new Array(currentQuestions.length).fill(null);
    currentQuestionIndex = 0;
    examTimeLeft = currentExam.time * 60;
    examStartTime = examData.startTime;
    
    document.title = `Đang làm bài: ${currentExam.name}`;
    
    const titleEl = document.querySelector('h2');
    if (titleEl) titleEl.textContent = currentExam.name;
    
    startExamTimer();
    renderExamQuestion();
    renderExamQuestionNav();
}

function startExamTimer() {
    if (examTimer) clearInterval(examTimer);
    
    const timerEl = document.getElementById('time');
    if (!timerEl) return;
    
    examTimer = setInterval(() => {
        examTimeLeft--;
        
        if (examTimeLeft <= 0) {
            clearInterval(examTimer);
            submitExam(true);
            return;
        }
        
        const minutes = Math.floor(examTimeLeft / 60);
        const seconds = examTimeLeft % 60;
        timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Cảnh báo khi còn 5 phút
        if (examTimeLeft === 300) {
            showNotification('Chỉ còn 5 phút!', 'warning');
        }
    }, 1000);
}

function renderExamQuestionNav() {
    const navContainer = document.querySelector('.question-nav');
    if (!navContainer) return;
    
    let html = '';
    for (let i = 0; i < currentQuestions.length; i++) {
        const answered = currentAnswers[i] !== null;
        const isActive = i === currentQuestionIndex;
        html += `
            <button class="q-nav-btn ${isActive ? 'active' : ''} 
                    ${answered ? 'answered' : ''}" 
                    onclick="goToExamQuestion(${i})">
                ${i + 1}
            </button>
        `;
    }
    navContainer.innerHTML = html;
}

function renderExamQuestion() {
    if (currentQuestions.length === 0) return;
    
    const q = currentQuestions[currentQuestionIndex];
    if (!q) return;
    
    const container = document.querySelector('.question-container');
    const isLastQuestion = currentQuestionIndex === currentQuestions.length - 1;
    
    let html = `
        <h3>Câu ${currentQuestionIndex + 1}/${currentQuestions.length}</h3>
        <p class="question-text">${q.question}</p>
        <div class="options">
    `;
    
    q.options.forEach((opt, index) => {
        const checked = currentAnswers[currentQuestionIndex] === index ? 'checked' : '';
        html += `
            <label class="option">
                <input type="radio" name="q${currentQuestionIndex}" 
                       value="${index}" ${checked} onchange="saveExamAnswer(${currentQuestionIndex}, ${index})">
                ${opt}
            </label>
        `;
    });
    
    html += `</div>`;
    
    html += `<div class="question-nav-buttons">`;
    
    if (currentQuestionIndex > 0) {
        html += `<button class="btn-prev" onclick="prevExamQuestion()">Câu trước</button>`;
    } else {
        html += `<button class="btn-prev" disabled>Trước</button>`;
    }
    
    html += `<button class="btn-next" onclick="nextExamQuestion()">Câu tiếp</button>`;
    
    if (isLastQuestion) {
        html += `<button class="btn-submit" onclick="submitExam()">Nộp bài</button>`;
    }
    
    html += `</div>`;
    
    container.innerHTML = html;
}

function saveExamAnswer(questionIndex, answerIndex) {
    currentAnswers[questionIndex] = answerIndex;
    renderExamQuestionNav();
}

function goToExamQuestion(index) {
    if (index >= 0 && index < currentQuestions.length) {
        currentQuestionIndex = index;
        renderExamQuestion();
        renderExamQuestionNav();
    }
}

function nextExamQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        renderExamQuestion();
        renderExamQuestionNav();
    }
}

function prevExamQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderExamQuestion();
        renderExamQuestionNav();
    }
}

function submitExam(timeout = false) {
    clearInterval(examTimer);
    
    if (timeout) {
        showNotification('Hết thời gian làm bài!', 'warning');
    }
    
    const unanswered = currentAnswers.reduce((count, ans) => ans === null ? count + 1 : count, 0);
    
    if (unanswered > 0 && !timeout) {
        if (!confirm(`Bạn còn ${unanswered} câu chưa trả lời. Vẫn nộp bài?`)) {
            startExamTimer();
            return;
        }
    }
    
    let correct = 0;
    currentQuestions.forEach((q, index) => {
        if (currentAnswers[index] === q.answer) correct++;
    });
    
    const score = Math.round((correct / currentQuestions.length) * 100);
    const timeSpent = Math.floor((Date.now() - examStartTime) / 1000);
    
    const examResult = {
        examId: currentExam.id,
        examName: currentExam.name,
        score: score,
        correct: correct,
        total: currentQuestions.length,
        timeSpent: timeSpent,
        date: new Date().toISOString(),
        answers: currentAnswers
    };
    
    // Lưu lịch sử
    let examHistory = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.EXAM_HISTORY) || '[]');
    examHistory.push(examResult);
    localStorage.setItem(CONFIG.STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(examHistory));
    
    // Cập nhật daily goals
    if (dailyGoals) {
        dailyGoals.examsDone++;
        dailyGoals.timeSpent += Math.floor(timeSpent / 60);
        saveDailyGoals();
    }
    
    // Xóa session
    sessionStorage.removeItem('current_exam');
    
    window.location.href = `ket-qua-thi.html?score=${score}&correct=${correct}&total=${currentQuestions.length}&exam=${currentExam.id}`;
}// ============================================
// SCRIPT.JS SIÊU THÔNG MINH - PHẦN 10: XỬ LÝ KẾT QUẢ
// ============================================

function loadExamResult() {
    const urlParams = new URLSearchParams(window.location.search);
    const score = urlParams.get('score') || '80';
    const correct = urlParams.get('correct') || '4';
    const total = urlParams.get('total') || '5';
    const examId = urlParams.get('exam');
    
    const scoreEl = document.querySelector('.score-number');
    const correctEl = document.querySelector('.result-details p');
    const examInfo = document.querySelector('.exam-info');
    
    if (scoreEl) scoreEl.textContent = score;
    if (correctEl) correctEl.textContent = `Đúng ${correct}/${total} câu`;
    
    // Hiển thị phân tích
    showScoreAnalysis(score);
    
    // Gợi ý bài học
    if (examId) {
        suggestNextSteps(score, examId);
    }
}

function showScoreAnalysis(score) {
    const analysisEl = document.querySelector('.score-analysis');
    if (!analysisEl) return;
    
    let analysis = '';
    let advice = '';
    
    if (score >= 90) {
        analysis = 'Xuất sắc!';
        advice = 'Bạn đã nắm rất vững kiến thức. Hãy thử sức với đề thi nâng cao hơn.';
    } else if (score >= 70) {
        analysis = 'Khá tốt!';
        advice = 'Bạn cần ôn lại một số phần còn yếu. Xem gợi ý bên dưới.';
    } else if (score >= 50) {
        analysis = 'Cần cố gắng hơn';
        advice = 'Bạn nên ôn lại kiến thức cơ bản trước khi làm đề tiếp theo.';
    } else {
        analysis = 'Cần ôn tập lại';
        advice = 'Hãy bắt đầu từ những bài học cơ bản nhất.';
    }
    
    analysisEl.innerHTML = `
        <h3>Phân tích kết quả</h3>
        <p class="analysis-text">${analysis}</p>
        <p class="advice-text">${advice}</p>
    `;
}

function suggestNextSteps(score, examId) {
    const suggestionsEl = document.querySelector('.suggestions');
    if (!suggestionsEl) return;
    
    const exam = window.exams?.find(e => e.id == examId);
    if (!exam) return;
    
    let html = '<h3>Gợi ý cho bạn</h3><ul>';
    
    if (score < 70) {
        html += `<li><a href="toan-${exam.class}.html">Ôn lại kiến thức lớp ${exam.class}</a></li>`;
    }
    
    html += `<li><a href="thi-thu.html?subject=${exam.subject}">Làm thêm đề thi môn ${exam.subjectName}</a></li>`;
    html += `<li><a href="luyen-tap.html?subject=${exam.subject}&class=${exam.class}">Luyện tập theo chủ đề</a></li>`;
    
    if (score >= 90) {
        html += `<li><a href="khoa-hoc.html?level=advanced">Khóa học nâng cao</a></li>`;
    }
    
    html += '</ul>';
    suggestionsEl.innerHTML = html;
}

function loadStudyHistory() {
    const container = document.getElementById('historyList');
    if (!container) return;
    
    const history = window.studyHistory || [];
    
    if (history.length === 0) {
        container.innerHTML = '<tr><td colspan="6" class="no-data">Chưa có lịch sử học tập</td></tr>';
        return;
    }
    
    let html = '';
    history.forEach(item => {
        html += `
            <tr>
                <td>${item.date}</td>
                <td>${item.exercise}</td>
                <td>${item.subjectName}</td>
                <td>${item.class}</td>
                <td>${item.score || 0}%</td>
                <td>${item.timeSpent || item.time || '15 phút'}</td>
            </tr>
        `;
    });
    
    container.innerHTML = html;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
// ============================================
// SCRIPT.JS SIÊU THÔNG MINH - PHẦN 11: XỬ LÝ KHÓA HỌC
// ============================================

function loadCourses() {
    const container = document.getElementById('coursesList');
    if (!container) return;
    
    const classFilter = document.getElementById('filterClass')?.value || 'all';
    const subjectFilter = document.getElementById('filterSubject')?.value || 'all';
    
    let courses = window.courses || [];
    
    if (classFilter !== 'all') {
        courses = courses.filter(c => c.class == classFilter);
    }
    if (subjectFilter !== 'all') {
        courses = courses.filter(c => c.subject === subjectFilter);
    }
    
    if (courses.length === 0) {
        container.innerHTML = '<div class="no-data">Không có khóa học nào</div>';
        return;
    }
    
    // Sắp xếp theo độ phổ biến
    courses.sort((a, b) => b.students - a.students);
    
    let html = '';
    courses.forEach(course => {
        const progress = getCourseProgress(course.id);
        html += `
            <div class="course-card" onclick="location.href='${course.subject}-${course.class}.html'">
                <div class="course-image">${course.image || '📚'}</div>
                <h3>${course.name}</h3>
                <p class="course-teacher">${course.teacher}</p>
                <div class="course-meta">
                    <span><i class="fas fa-video"></i> ${course.lessons} bài</span>
                    <span><i class="fas fa-users"></i> ${formatNumber(course.students)} học sinh</span>
                </div>
                ${progress > 0 ? `
                    <div class="course-progress">
                        <div class="progress-bar">
                            <div class="progress" style="width: ${progress}%"></div>
                        </div>
                        <span class="progress-text">${progress}% hoàn thành</span>
                    </div>
                ` : ''}
                <div class="course-price">${formatCurrency(course.price)}</div>
                <button class="btn-buy" onclick="event.stopPropagation(); selectPackage('${course.package || 'basic'}')">
                    ${progress > 0 ? 'Tiếp tục học' : 'Đăng ký ngay'}
                </button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function getCourseProgress(courseId) {
    if (!currentUser) return 0;
    
    const history = window.studyHistory || [];
    const courseExercises = history.filter(h => h.exercise.includes(courseId));
    
    if (courseExercises.length === 0) return 0;
    
    const totalLessons = window.courses.find(c => c.id === courseId)?.lessons || 20;
    return Math.min(100, Math.round((courseExercises.length / totalLessons) * 100));
}

function filterCourses() {
    loadCourses();
}
// ============================================
// SCRIPT.JS SIÊU THÔNG MINH - PHẦN 12: XỬ LÝ BẢNG XẾP HẠNG
// ============================================

function loadRanking(period = 'week') {
    const container = document.querySelector('.ranking-table tbody');
    if (!container) return;
    
    const rankings = window.rankings?.[period] || generateRankings(period);
    
    let html = '';
    rankings.forEach((item, index) => {
        const isCurrentUser = currentUser && item.name === currentUser.name;
        html += `
            <tr class="${isCurrentUser ? 'current-user' : ''}">
                <td>${index + 1}</td>
                <td>
                    <div class="rank-user">
                        <span class="rank-avatar">${item.avatar}</span>
                        ${item.name}
                    </div>
                </td>
                <td>${item.class}</td>
                <td>${item.points.toLocaleString()}</td>
                <td>${item.school || 'TH Kim Đồng'}</td>
            </tr>
        `;
    });
    
    container.innerHTML = html;
}

function generateRankings(period) {
    const rankings = [];
    const names = [
        'Nguyễn Văn An', 'Trần Thị Bình', 'Lê Văn Cường', 'Phạm Thị Dung',
        'Hoàng Văn Em', 'Ngô Thị Phương', 'Đỗ Văn Quân', 'Vũ Thị Trang',
        'Lý Văn Sơn', 'Trịnh Thị Hoa', 'Bùi Thị Ngọc', 'Đặng Văn Hùng'
    ];
    
    const classes = ['5A1', '5A2', '5A3', '4A1', '4A2', '4A3'];
    const avatars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M'];
    
    const multiplier = period === 'week' ? 1 : period === 'month' ? 4 : 12;
    
    for (let i = 0; i < 10; i++) {
        rankings.push({
            rank: i + 1,
            name: names[i % names.length],
            points: Math.floor(9500 + (10 - i) * 300 * multiplier + Math.random() * 100),
            class: classes[i % classes.length],
            avatar: avatars[i % avatars.length],
            school: 'TH Kim Đồng'
        });
    }
    
    return rankings;
}

function switchRanking(period) {
    const tabs = document.querySelectorAll('.ranking-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(tab => 
        tab.textContent.toLowerCase().includes(period === 'week' ? 'tuần' : (period === 'month' ? 'tháng' : 'mọi'))
    );
    if (activeTab) activeTab.classList.add('active');
    
    loadRanking(period);
}
// ============================================
// SCRIPT.JS SIÊU THÔNG MINH - PHẦN 13: XỬ LÝ TÀI KHOẢN
// ============================================

function loadProfile() {
    if (!currentUser) return;
    
    const elements = {
        fullName: document.getElementById('fullName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        class: document.getElementById('class'),
        school: document.getElementById('school'),
        displayName: document.getElementById('profileName'),
        displayClass: document.getElementById('profileClass')
    };
    
    if (elements.fullName) elements.fullName.value = currentUser.name;
    if (elements.email) elements.email.value = currentUser.email;
    if (elements.phone) elements.phone.value = currentUser.phone || '';
    if (elements.class) elements.class.value = currentUser.class?.replace('A', '') || '5';
    if (elements.school) elements.school.value = currentUser.school || 'Trường Tiểu học Kim Đồng';
    if (elements.displayName) elements.displayName.textContent = currentUser.name;
    if (elements.displayClass) elements.displayClass.textContent = `Lớp ${currentUser.class}`;
    
    loadUserStats();
    loadUserAchievementsDisplay();
}

function loadUserStats() {
    const statsContainer = document.querySelector('.user-stats');
    if (!statsContainer) return;
    
    const history = window.studyHistory || [];
    const examHistory = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.EXAM_HISTORY) || '[]');
    
    const totalExercises = history.length;
    const totalExams = examHistory.length;
    const avgScore = history.length ? 
        Math.round(history.reduce((sum, h) => sum + (h.score || 0), 0) / history.length) : 0;
    const bestScore = Math.max(...(history.map(h => h.score || 0)), 0);
    
    statsContainer.innerHTML = `
        <div class="stat-item">
            <span class="stat-value">${totalExercises}</span>
            <span class="stat-label">Bài tập</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${totalExams}</span>
            <span class="stat-label">Bài thi</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${avgScore}%</span>
            <span class="stat-label">Điểm TB</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${bestScore}%</span>
            <span class="stat-label">Cao nhất</span>
        </div>
    `;
}

function loadUserAchievementsDisplay() {
    const container = document.querySelector('.achievements-list');
    if (!container) return;
    
    const allAchievements = window.achievementsList || [];
    const unlockedSet = new Set(achievements.map(a => a.id));
    
    let html = '';
    allAchievements.slice(0, 6).forEach(achievement => {
        const unlocked = unlockedSet.has(achievement.id);
        html += `
            <div class="achievement-item ${unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">${achievement.icon || '🏆'}</div>
                <div class="achievement-info">
                    <h4>${achievement.name}</h4>
                    <p>${achievement.description}</p>
                </div>
                ${unlocked ? '<span class="achievement-check">✅</span>' : ''}
            </div>
        `;
    });
    
    container.innerHTML = html || '<p>Chưa có thành tích</p>';
}

function showProfileTab(tab) {
    const tabs = document.querySelectorAll('.profile-menu a');
    tabs.forEach(t => t.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(t => 
        t.textContent.toLowerCase().includes(tab === 'info' ? 'thông tin' : 'mật khẩu')
    );
    if (activeTab) activeTab.classList.add('active');
    
    document.getElementById('infoTab')?.classList.remove('active');
    document.getElementById('passwordTab')?.classList.remove('active');
    
    if (tab === 'info') {
        document.getElementById('infoTab')?.classList.add('active');
    } else {
        document.getElementById('passwordTab')?.classList.add('active');
    }
}

function saveProfile() {
    if (!currentUser) return;
    
    const fullName = document.getElementById('fullName')?.value;
    const phone = document.getElementById('phone')?.value;
    const classVal = document.getElementById('class')?.value;
    const school = document.getElementById('school')?.value;
    
    if (fullName) currentUser.name = fullName;
    if (phone) currentUser.phone = phone;
    if (classVal) currentUser.class = classVal + 'A1';
    if (school) currentUser.school = school;
    
    saveUserData();
    updateUserInfo();
    
    showNotification('Thông tin đã được cập nhật!', 'success');
}

function changePassword() {
    const current = document.getElementById('currentPassword')?.value;
    const newPass = document.getElementById('newPassword')?.value;
    const confirm = document.getElementById('confirmNewPassword')?.value;
    
    if (!current || !newPass || !confirm) {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
        return;
    }
    
    if (newPass !== confirm) {
        showNotification('Mật khẩu mới không khớp!', 'error');
        return;
    }
    
    if (newPass.length < 6) {
        showNotification('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
        return;
    }
    
    // Kiểm tra mật khẩu cũ (giả lập)
    if (current !== '123456' && currentUser?.username !== 'demo') {
        showNotification('Mật khẩu hiện tại không đúng!', 'error');
        return;
    }
    
    showNotification('Đổi mật khẩu thành công!', 'success');
    
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';
}
// ============================================
// SCRIPT.JS SIÊU THÔNG MINH - PHẦN 14: XỬ LÝ DỮ LIỆU HỌC TẬP
// ============================================

function saveStudyHistory(data) {
    try {
        let history = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.STUDY_HISTORY) || '[]');
        history.push({
            ...data,
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleString('vi-VN')
        });
        if (history.length > 100) history = history.slice(-100);
        localStorage.setItem(CONFIG.STORAGE_KEYS.STUDY_HISTORY, JSON.stringify(history));
        
        // Cập nhật window.studyHistory
        window.studyHistory = history;
        
        // Kiểm tra thành tựu
        checkAchievements();
    } catch (e) {
        console.error('Error saving study history:', e);
    }
}

function getRecommendations() {
    if (!currentUser) return [];
    
    const history = window.studyHistory || [];
    const examHistory = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.EXAM_HISTORY) || '[]');
    
    // Phân tích điểm yếu
    const weakSubjects = {};
    const allSubjects = ['toan', 'van', 'anh'];
    
    allSubjects.forEach(subject => {
        const subjectHistory = history.filter(h => h.subject === subject);
        if (subjectHistory.length > 0) {
            const avgScore = subjectHistory.reduce((sum, h) => sum + (h.score || 0), 0) / subjectHistory.length;
            weakSubjects[subject] = avgScore;
        }
    });
    
    // Gợi ý bài học cho môn yếu nhất
    const sortedSubjects = Object.entries(weakSubjects).sort((a, b) => a[1] - b[1]);
    const weakest = sortedSubjects[0];
    
    if (weakest && weakest[1] < 70) {
        return [{
            type: 'subject',
            subject: weakest[0],
            message: `Bạn cần cải thiện môn ${getSubjectName(weakest[0])}`,
            link: `luyen-tap.html?subject=${weakest[0]}`
        }];
    }
    
    return [];
}

function getSubjectName(subject) {
    const names = {
        toan: 'Toán',
        van: 'Tiếng Việt',
        anh: 'Tiếng Anh'
    };
    return names[subject] || subject;
}

function bookmarkExercise(exerciseId) {
    if (!currentUser) return;
    
    let bookmarks = JSON.parse(localStorage.getItem(`${CONFIG.STORAGE_KEYS.BOOKMARKS}_${currentUser.id}`) || '[]');
    
    if (bookmarks.includes(exerciseId)) {
        bookmarks = bookmarks.filter(id => id !== exerciseId);
        showNotification('Đã xóa khỏi danh sách yêu thích', 'info');
    } else {
        bookmarks.push(exerciseId);
        showNotification('Đã thêm vào danh sách yêu thích', 'success');
    }
    
    localStorage.setItem(`${CONFIG.STORAGE_KEYS.BOOKMARKS}_${currentUser.id}`, JSON.stringify(bookmarks));
}

function addNote(exerciseId, note) {
    if (!currentUser) return;
    
    let notes = JSON.parse(localStorage.getItem(`${CONFIG.STORAGE_KEYS.NOTES}_${currentUser.id}`) || '[]');
    notes.push({
        exerciseId: exerciseId,
        note: note,
        date: new Date().toISOString()
    });
    
    localStorage.setItem(`${CONFIG.STORAGE_KEYS.NOTES}_${currentUser.id}`, JSON.stringify(notes));
    showNotification('Đã lưu ghi chú', 'success');
}
// ============================================
// SCRIPT.JS SIÊU THÔNG MINH - PHẦN 15: HÀM TIỆN ÍCH & EXPORT
// ============================================

function formatNumber(num) {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function addPageTransition() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

function initializeAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        .q-nav-btn.answered {
            background: #00b14f;
            color: white;
            border-color: #00b14f;
        }
        .no-data {
            text-align: center;
            padding: 50px;
            color: #999;
            font-size: 16px;
        }
        .progress {
            transition: width 0.3s ease;
        }
        .course-card, .exercise-card, .exam-item {
            transition: all 0.3s ease;
        }
        .course-card:hover, .exercise-card:hover, .exam-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,177,79,0.2);
        }
    `;
    document.head.appendChild(style);
}

// Export functions cho HTML
window.handleLogin = handleLogin;
window.handleGoogleRegister = handleGoogleRegister;
window.handleFacebookRegister = handleFacebookRegister;
window.handleRegisterSubmit = handleRegisterSubmit;
window.selectPackage = selectPackage;
window.selectPayment = selectPayment;
window.processPayment = processPayment;
window.filterExercises = filterExercises;
window.filterCourses = filterCourses;
window.switchRanking = switchRanking;
window.showProfileTab = showProfileTab;
window.saveProfile = saveProfile;
window.changePassword = changePassword;
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.goToQuestion = goToQuestion;
window.submitExercise = submitExercise;
window.nextExamQuestion = nextExamQuestion;
window.prevExamQuestion = prevExamQuestion;
window.goToExamQuestion = goToExamQuestion;
window.submitExam = submitExam;
window.bookmarkExercise = bookmarkExercise;
window.logout = logout;
window.showNotification = showNotification;

// Animation khi load trang
addPageTransition();

console.log('%c✅ SCRIPT.JS SIÊU THÔNG MINH LOADED!', 'color: #00b14f; font-size: 16px; font-weight: bold;');
console.log('%c🔥 TEAM C00LKIDD, JOIN TODAY! 🔥', 'color: #00b14f; font-size: 20px; font-weight: bold;');