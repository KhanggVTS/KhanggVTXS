// ============================================
// SCRIPT.JS - PHẦN 1: KHỞI TẠO & BIẾN TOÀN CỤC
// ============================================

// Biến toàn cục
let currentUser = null;
let currentExercise = null;
let currentAnswers = [];
let currentQuestions = [];
let currentQuestionIndex = 0;

// Khởi tạo khi load trang
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 VioEdu Script Loaded!');
    checkLoginStatus();
    loadPageContent();
    initializeEventListeners();
    updateUI();
});

// Kiểm tra đăng nhập
function checkLoginStatus() {
    const user = sessionStorage.getItem('vioedu_user');
    if (user) {
        try {
            currentUser = JSON.parse(user);
            console.log('✅ User logged in:', currentUser.name);
        } catch (e) {
            console.error('❌ Error parsing user data');
        }
    }
}

// Cập nhật UI
function updateUI() {
    updateUserInfo();
    updateStats();
}

// Khởi tạo event listeners
function initializeEventListeners() {
    // Xử lý đăng xuất
    const logoutLinks = document.querySelectorAll('a[onclick="logout()"]');
    logoutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    });
    
    // Xử lý Enter key trong form đăng nhập
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleLogin();
            }
        });
    }
}
// ============================================
// SCRIPT.JS - PHẦN 2: XỬ LÝ NGƯỜI DÙNG
// ============================================

// Cập nhật thông tin người dùng trên UI
function updateUserInfo() {
    if (!currentUser) return;
    
    const elements = {
        userName: document.querySelectorAll('.user-name'),
        avatar: document.querySelectorAll('.avatar'),
        welcomeName: document.getElementById('welcomeName'),
        userNameDisplay: document.getElementById('userName'),
        userAvatar: document.getElementById('userAvatar'),
        profileName: document.getElementById('profileName'),
        profileClass: document.getElementById('profileClass')
    };
    
    // Cập nhật tất cả elements
    elements.userName.forEach(el => {
        if (el) el.textContent = currentUser.name;
    });
    
    elements.avatar.forEach(el => {
        if (el) el.textContent = currentUser.name.charAt(0);
    });
    
    if (elements.welcomeName) elements.welcomeName.textContent = currentUser.name;
    if (elements.userNameDisplay) elements.userNameDisplay.textContent = currentUser.name;
    if (elements.userAvatar) elements.userAvatar.textContent = currentUser.name.charAt(0);
    if (elements.profileName) elements.profileName.textContent = currentUser.name;
    if (elements.profileClass) elements.profileClass.textContent = `Lớp ${currentUser.class}`;
}

// Xử lý đăng nhập
function handleLogin() {
    const username = document.getElementById('username')?.value.trim();
    const password = document.getElementById('password')?.value.trim();
    
    if (!username || !password) {
        showNotification('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!', 'error');
        return;
    }
    
    // Kiểm tra trong fakeUsers
    const user = window.fakeUsers?.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        sessionStorage.setItem('vioedu_user', JSON.stringify(user));
        saveLoginHistory(username, 'success');
        showNotification(`Đăng nhập thành công! Chào mừng ${user.name}`, 'success');
        window.location.href = 'dashboard.html';
    } else {
        showNotification('Sai tên đăng nhập hoặc mật khẩu! (Gợi ý: hocsinh1 / 123456)', 'error');
        saveLoginHistory(username, 'failed');
    }
}

// Lưu lịch sử đăng nhập
function saveLoginHistory(username, status) {
    try {
        let history = JSON.parse(localStorage.getItem('login_history') || '[]');
        history.push({
            username: username,
            status: status,
            time: new Date().toLocaleString('vi-VN'),
            userAgent: navigator.userAgent
        });
        // Giữ tối đa 50 bản ghi
        if (history.length > 50) history = history.slice(-50);
        localStorage.setItem('login_history', JSON.stringify(history));
    } catch (e) {
        console.error('Error saving login history:', e);
    }
}

// Đăng xuất
function logout() {
    sessionStorage.removeItem('vioedu_user');
    showNotification('Đã đăng xuất!', 'info');
    window.location.href = 'index.html';
}

// Hiển thị thông báo
function showNotification(message, type = 'info') {
    const colors = {
        success: '#00b14f',
        error: '#ff4757',
        warning: '#ffa502',
        info: '#00b14f'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${colors[type]};
        color: white;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
// ============================================
// SCRIPT.JS - PHẦN 3: XỬ LÝ ĐĂNG KÝ
// ============================================

// Xử lý đăng ký bằng Google
function handleGoogleRegister() {
    showNotification('Tính năng đăng ký bằng Google đang phát triển!', 'warning');
}

// Xử lý đăng ký bằng Facebook
function handleFacebookRegister() {
    showNotification('Tính năng đăng ký bằng Facebook đang phát triển!', 'warning');
}

// Xử lý submit form đăng ký
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
    
    // Validate
    if (!formData.fullname || !formData.email || !formData.password) {
        showNotification('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
        return;
    }
    
    if (formData.password !== formData.confirmPassword) {
        showNotification('Mật khẩu không khớp!', 'error');
        return;
    }
    
    if (formData.password.length < 6) {
        showNotification('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
        return;
    }
    
    if (!isValidEmail(formData.email)) {
        showNotification('Email không hợp lệ!', 'error');
        return;
    }
    
    // Lưu thông tin đăng ký
    try {
        let registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
        registrations.push({
            ...formData,
            password: '********', // Không lưu mật khẩu thật
            time: new Date().toLocaleString('vi-VN')
        });
        localStorage.setItem('registrations', JSON.stringify(registrations));
        
        showNotification('Đăng ký thành công! Vui lòng đăng nhập.', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } catch (e) {
        showNotification('Có lỗi xảy ra! Vui lòng thử lại.', 'error');
    }
}

// Kiểm tra email hợp lệ
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
// ============================================
// SCRIPT.JS - PHẦN 4: XỬ LÝ GÓI HỌC & THANH TOÁN
// ============================================

// Chọn gói học
function selectPackage(packageType) {
    const packages = {
        basic: { name: 'Cơ bản', price: 199000, id: 'basic' },
        pro: { name: 'Pro', price: 399000, id: 'pro' },
        vip: { name: 'VIP', price: 799000, id: 'vip' }
    };
    
    const selectedPackage = packages[packageType];
    if (!selectedPackage) return;
    
    sessionStorage.setItem('selected_package', JSON.stringify(selectedPackage));
    
    // Cập nhật thông tin trên trang thanh toán nếu đang ở đó
    updatePaymentInfo(selectedPackage);
    
    showNotification(`Bạn đã chọn gói ${selectedPackage.name}. Vui lòng chọn phương thức thanh toán.`, 'success');
    
    // Chuyển đến trang thanh toán nếu chưa ở đó
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'thanh-toan.html') {
        setTimeout(() => {
            window.location.href = 'thanh-toan.html';
        }, 1500);
    }
}

// Cập nhật thông tin thanh toán
function updatePaymentInfo(pkg) {
    const elements = {
        packageName: document.getElementById('packageName'),
        packagePrice: document.getElementById('packagePrice'),
        totalPrice: document.getElementById('totalPrice')
    };
    
    if (pkg) {
        if (elements.packageName) elements.packageName.textContent = pkg.name;
        if (elements.packagePrice) elements.packagePrice.textContent = pkg.price.toLocaleString() + 'đ';
        if (elements.totalPrice) elements.totalPrice.textContent = pkg.price.toLocaleString() + 'đ';
    }
}

// Chọn phương thức thanh toán
function selectPayment(method) {
    const selectedPackage = JSON.parse(sessionStorage.getItem('selected_package'));
    
    if (!selectedPackage) {
        showNotification('Vui lòng chọn gói học trước!', 'warning');
        return;
    }
    
    // Lưu giao dịch
    try {
        let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const transaction = {
            id: Date.now(),
            package: selectedPackage,
            method: method,
            amount: selectedPackage.price,
            time: new Date().toLocaleString('vi-VN'),
            user: currentUser?.name || 'Khách',
            userEmail: currentUser?.email || '',
            status: 'pending',
            transactionId: 'TXN' + Date.now()
        };
        
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        
        // Giả lập chuyển đến cổng thanh toán
        simulatePayment(transaction);
    } catch (e) {
        showNotification('Có lỗi xảy ra! Vui lòng thử lại.', 'error');
    }
}

// Giả lập thanh toán
function simulatePayment(transaction) {
    showNotification(`Đang chuyển đến cổng thanh toán ${getMethodName(transaction.method)}...`, 'info');
    
    setTimeout(() => {
        // Cập nhật trạng thái giao dịch
        let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const lastTransaction = transactions.find(t => t.id === transaction.id);
        if (lastTransaction) {
            lastTransaction.status = 'completed';
            lastTransaction.paymentTime = new Date().toLocaleString('vi-VN');
            localStorage.setItem('transactions', JSON.stringify(transactions));
        }
        
        showNotification('Thanh toán thành công! Cảm ơn bạn đã sử dụng dịch vụ của VioEdu.', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    }, 3000);
}

// Xử lý thanh toán trực tiếp
function processPayment() {
    const selectedMethod = document.querySelector('input[name="payment"]:checked')?.id;
    
    if (!selectedMethod) {
        showNotification('Vui lòng chọn phương thức thanh toán!', 'warning');
        return;
    }
    
    selectPayment(selectedMethod);
}

// Lấy tên phương thức thanh toán
function getMethodName(methodId) {
    const methods = {
        momo: 'Ví MoMo',
        vnpay: 'VNPAY',
        zalopay: 'ZaloPay',
        bank: 'Thẻ ATM',
        credit: 'Thẻ tín dụng'
    };
    return methods[methodId] || methodId;
}

// Load thông tin thanh toán
function loadPaymentInfo() {
    const selectedPackage = JSON.parse(sessionStorage.getItem('selected_package'));
    if (selectedPackage) {
        updatePaymentInfo(selectedPackage);
    }
}
// ============================================
// SCRIPT.JS - PHẦN 5: LOAD NỘI DUNG TRANG
// ============================================

// Load nội dung theo trang
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
            }
    }
}

// Load dashboard
function loadDashboard() {
    if (!currentUser) {
        const user = sessionStorage.getItem('vioedu_user');
        if (user) currentUser = JSON.parse(user);
    }
    
    updateUserInfo();
    updateStats();
}

// Cập nhật thống kê
function updateStats() {
    const stats = {
        totalExercises: document.getElementById('totalExercises'),
        completedExercises: document.getElementById('completedExercises'),
        avgScore: document.getElementById('avgScore'),
        studyTime: document.getElementById('studyTime')
    };
    
    // Lấy dữ liệu từ history
    const history = window.studyHistory || [];
    const total = history.length;
    const completed = history.filter(h => h.status === 'completed').length;
    const avgScore = history.length ? 
        Math.round(history.reduce((sum, h) => sum + (h.score || 0), 0) / history.length) : 0;
    const totalTime = history.reduce((sum, h) => sum + parseInt(h.time || '0'), 0);
    
    if (stats.totalExercises) stats.totalExercises.textContent = total || '156';
    if (stats.completedExercises) stats.completedExercises.textContent = completed || '98';
    if (stats.avgScore) stats.avgScore.textContent = (avgScore || '85') + '%';
    if (stats.studyTime) stats.studyTime.textContent = Math.round(totalTime / 60) + 'h';
}
// ============================================
// SCRIPT.JS - PHẦN 6: LOAD BÀI TẬP & ĐỀ THI
// ============================================

// Load bài tập
function loadExercises() {
    const container = document.getElementById('exercisesList');
    if (!container) return;
    
    // Lọc theo filter nếu có
    const classFilter = document.getElementById('filterClass')?.value || 'all';
    const subjectFilter = document.getElementById('filterSubject')?.value || 'all';
    const statusFilter = document.getElementById('filterStatus')?.value || 'all';
    
    let exercises = Object.values(window.exercises || {});
    
    // Áp dụng filter
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

// Load đề thi
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
            <div class="exam-item" onclick="location.href='bai-tap.html?exam=${exam.id}'">
                <div class="exam-info">
                    <h4>${exam.name}</h4>
                    <p><i class="far fa-clock"></i> ${exam.time} phút - <i class="far fa-file-alt"></i> ${exam.questions} câu</p>
                    <p class="exam-meta">Đã có ${exam.attempts?.toLocaleString() || 0} lượt làm</p>
                </div>
                ${exam.rating ? `<span class="exam-tag">⭐ ${exam.rating}</span>` : ''}
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Load khóa học
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
    
    let html = '';
    courses.forEach(course => {
        html += `
            <div class="course-card" onclick="location.href='${course.subject}-${course.class}.html'">
                <div class="course-image">${course.image || '📚'}</div>
                <h3>${course.name}</h3>
                <p class="course-teacher">${course.teacher}</p>
                <div class="course-meta">
                    <span><i class="fas fa-video"></i> ${course.lessons} bài</span>
                    <span><i class="fas fa-users"></i> ${(course.students / 1000).toFixed(1)}K học sinh</span>
                </div>
                <div class="course-price">${course.price.toLocaleString()}đ</div>
                <button class="btn-buy" onclick="event.stopPropagation(); selectPackage('${course.id}')">Mua ngay</button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Lọc bài tập
function filterExercises() {
    loadExercises();
}

// Lọc khóa học
function filterCourses() {
    loadCourses();
}
// ============================================
// SCRIPT.JS - PHẦN 7: XỬ LÝ LÀM BÀI TẬP
// ============================================

// Load chi tiết bài tập
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

// Cập nhật UI bài tập
function updateExerciseUI() {
    const titleEl = document.querySelector('h2');
    if (titleEl) titleEl.textContent = currentExercise?.title || 'Bài tập';
    
    const timerEl = document.getElementById('time');
    if (timerEl) timerEl.textContent = formatTime(currentExercise?.time * 60 || 1200);
    
    renderQuestionNav();
    renderQuestion();
}

// Render điều hướng câu hỏi
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

// Render câu hỏi hiện tại
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
    
    // Thêm nút điều hướng
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

// Lưu câu trả lời
function saveAnswer(questionIndex, answerIndex) {
    currentAnswers[questionIndex] = answerIndex;
    renderQuestionNav();
}

// Chuyển đến câu hỏi cụ thể
function goToQuestion(index) {
    if (index >= 0 && index < currentQuestions.length) {
        currentQuestionIndex = index;
        renderQuestion();
        renderQuestionNav();
    }
}

// Câu tiếp theo
function nextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
        renderQuestionNav();
    }
}

// Câu trước
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
        renderQuestionNav();
    }
}

// Nộp bài
function submitExercise() {
    // Kiểm tra đã trả lời hết chưa
    const unanswered = currentAnswers.reduce((count, ans, idx) => {
        return ans === null ? count + 1 : count;
    }, 0);
    
    if (unanswered > 0) {
        if (!confirm(`Bạn còn ${unanswered} câu chưa trả lời. Vẫn nộp bài?`)) {
            return;
        }
    }
    
    // Tính điểm
    let correct = 0;
    currentQuestions.forEach((q, index) => {
        if (currentAnswers[index] === q.answer) correct++;
    });
    
    const score = Math.round((correct / currentQuestions.length) * 100);
    
    // Lưu lịch sử
    saveStudyHistory({
        exerciseId: currentExercise,
        score: score,
        correct: correct,
        total: currentQuestions.length,
        answers: currentAnswers
    });
    
    // Chuyển sang trang kết quả
    window.location.href = `ket-qua.html?score=${score}&correct=${correct}&total=${currentQuestions.length}`;
}

// Lưu lịch sử học tập
function saveStudyHistory(data) {
    try {
        let history = JSON.parse(localStorage.getItem('study_history') || '[]');
        history.push({
            ...data,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleString('vi-VN')
        });
        if (history.length > 100) history = history.slice(-100);
        localStorage.setItem('study_history', JSON.stringify(history));
    } catch (e) {
        console.error('Error saving study history:', e);
    }
}
// ============================================
// SCRIPT.JS - PHẦN 8: XỬ LÝ KẾT QUẢ & LỊCH SỬ
// ============================================

// Load trang kết quả
function loadResult() {
    const urlParams = new URLSearchParams(window.location.search);
    const score = urlParams.get('score') || '80';
    const correct = urlParams.get('correct') || '4';
    const total = urlParams.get('total') || '5';
    
    const scoreEl = document.querySelector('.score-number');
    const correctEl = document.querySelector('.result-details p');
    
    if (scoreEl) scoreEl.textContent = score;
    if (correctEl) correctEl.textContent = `Đúng ${correct}/${total} câu`;
}

// Load lịch sử học tập
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
                <td>${item.score}%</td>
                <td>${item.time}</td>
            </tr>
        `;
    });
    
    container.innerHTML = html;
}

// Format thời gian
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
// ============================================
// SCRIPT.JS - PHẦN 9: XỬ LÝ BẢNG XẾP HẠNG & TÀI KHOẢN
// ============================================

// Load bảng xếp hạng
function loadRanking(period = 'week') {
    const container = document.querySelector('.ranking-table tbody');
    if (!container) return;
    
    const rankings = window.rankings?.[period] || window.rankings?.week || [];
    
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
                <td>${item.school || ''}</td>
            </tr>
        `;
    });
    
    container.innerHTML = html;
}

// Chuyển tab bảng xếp hạng
function switchRanking(period) {
    const tabs = document.querySelectorAll('.ranking-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(tab => 
        tab.textContent.toLowerCase().includes(period === 'week' ? 'tuần' : (period === 'month' ? 'tháng' : 'mọi'))
    );
    if (activeTab) activeTab.classList.add('active');
    
    loadRanking(period);
}

// Load thông tin tài khoản
function loadProfile() {
    if (!currentUser) return;
    
    const elements = {
        fullName: document.getElementById('fullName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        class: document.getElementById('class'),
        school: document.getElementById('school')
    };
    
    if (elements.fullName) elements.fullName.value = currentUser.name;
    if (elements.email) elements.email.value = currentUser.email;
    if (elements.phone) elements.phone.value = currentUser.phone;
    if (elements.class) elements.class.value = currentUser.class?.replace('A', '') || '5';
    if (elements.school) elements.school.value = currentUser.school || 'Trường Tiểu học Kim Đồng';
}

// Hiển thị tab tài khoản
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

// Lưu thông tin cá nhân
function saveProfile() {
    showNotification('Thông tin đã được cập nhật!', 'success');
}

// Đổi mật khẩu
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
    
    showNotification('Đổi mật khẩu thành công!', 'success');
    
    // Reset form
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';
}
// ============================================
// SCRIPT.JS - PHẦN 10: HÀM TIỆN ÍCH & EXPORT
// ============================================

// Log console đẹp
function log(message, type = 'info') {
    const styles = {
        info: 'color: #00b14f;',
        success: 'color: #00b14f; font-weight: bold;',
        warning: 'color: #ffa502; font-weight: bold;',
        error: 'color: #ff4757; font-weight: bold;'
    };
    console.log(`%c${message}`, styles[type]);
}

// Format số
function formatNumber(num) {
    return num?.toLocaleString() || '0';
}

// Lấy tham số URL
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Animation khi load trang
function addPageTransition() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// Thêm CSS animations
function addAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .no-data {
            text-align: center;
            padding: 50px;
            color: #999;
            font-size: 16px;
        }
        
        .q-nav-btn.answered {
            background: #00b14f;
            color: white;
            border-color: #00b14f;
        }
    `;
    document.head.appendChild(style);
}

// Khởi chạy
addPageTransition();
addAnimations();

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
window.logout = logout;
window.showNotification = showNotification;

console.log('%c✅ SCRIPT.JS LOADED SUCCESSFULLY!', 'color: #00b14f; font-size: 16px; font-weight: bold;');
console.log('%c🔥 TEAM C00LKIDD, JOIN TODAY! 🔥', 'color: #00b14f; font-size: 20px; font-weight: bold;');