// ============================================
// SCRIPT.JS SIÊU THÔNG MINH - VERSION 5.0
// ============================================
// Hệ thống điều khiển thông minh với AI và ML
// Team C00LKIDD - VioEdu Platform
// Features: AI Assistant, Smart Analytics, Offline Mode, PWA Ready
// ============================================

'use strict';

console.log('%c🚀 SCRIPT.JS SIÊU THÔNG MINH V5.0 LOADING...', 'color: #00b14f; font-size: 16px; font-weight: bold;');

// ============================================
// PHẦN 1: CẤU HÌNH TOÀN CỤC & CONSTANTS
// ============================================

const CONFIG = {
    APP_NAME: 'VioEdu',
    VERSION: '5.0.0',
    BUILD: '2025.03.15',
    DEBUG: true,
    
    // Storage Keys
    STORAGE_KEYS: {
        USER: 'vioedu_user',
        CURRENT_USER: 'vioedu_current_user',
        PACKAGE: 'selected_package',
        LOGIN_HISTORY: 'login_history',
        REGISTRATIONS: 'registrations',
        TRANSACTIONS: 'transactions',
        STUDY_HISTORY: 'study_history',
        EXAM_HISTORY: 'exam_history',
        SETTINGS: 'user_settings',
        BOOKMARKS: 'bookmarks',
        NOTES: 'notes',
        ACHIEVEMENTS: 'achievements',
        DAILY_GOALS: 'daily_goals',
        AI_CACHE: 'ai_cache',
        OFFLINE_DATA: 'offline_data',
        SYNC_QUEUE: 'sync_queue'
    },
    
    // API Endpoints (Simulated)
    API: {
        BASE_URL: 'https://api.vioedu.com/v1',
        TIMEOUT: 30000,
        RETRY_ATTEMPTS: 3
    },
    
    // UI Configuration
    NOTIFICATION_DURATION: 5000,
    ANIMATION_DURATION: 300,
    AUTO_SAVE_INTERVAL: 30000,
    SESSION_TIMEOUT: 3600000, // 1 hour
    
    // AI Configuration
    AI: {
        ENABLED: true,
        MODEL_VERSION: 'vioedu-ai-v2',
        CONFIDENCE_THRESHOLD: 0.7,
        MAX_RECOMMENDATIONS: 5
    },
    
    // Exam Configuration
    EXAM_CONFIG: {
        TIME_PER_QUESTION: 60,
        DEFAULT_QUESTIONS: 30,
        DEFAULT_TIME: 45,
        WARNING_TIME: 300 // 5 minutes
    },
    
    // Game Configuration
    GAME_CONFIG: {
        ENABLED: true,
        REWARD_POINTS: 10,
        DAILY_BONUS: 50
    },
    
    // Default Settings
    DEFAULT_SETTINGS: {
        theme: 'light',
        notifications: true,
        sound: true,
        autoSave: true,
        fontSize: 'medium',
        language: 'vi',
        offlineMode: false,
        aiAssistant: true,
        autoNext: true,
        examReminder: true,
        dailyGoal: 30,
        privacyMode: false
    }
};

// ============================================
// PHẦN 2: GLOBAL STATE MANAGEMENT
// ============================================

class AppState {
    constructor() {
        this.currentUser = null;
        this.currentExercise = null;
        this.currentExam = null;
        this.currentQuestions = [];
        this.currentAnswers = [];
        this.currentQuestionIndex = 0;
        this.examTimer = null;
        this.examTimeLeft = 0;
        this.examStartTime = null;
        this.settings = { ...CONFIG.DEFAULT_SETTINGS };
        this.dailyGoals = {};
        this.achievements = [];
        this.bookmarks = [];
        this.notes = [];
        this.offlineQueue = [];
        this.isOnline = navigator.onLine;
        this.sessionStartTime = Date.now();
        this.lastActivity = Date.now();
        this.aiCache = new Map();
        
        // Bind methods
        this.initialize = this.initialize.bind(this);
        this.saveState = this.saveState.bind(this);
        this.loadState = this.loadState.bind(this);
    }
    
    initialize() {
        this.loadSettings();
        this.loadUserState();
        this.loadDailyGoals();
        this.loadAchievements();
        this.loadBookmarks();
        this.loadNotes();
        this.setupOfflineSupport();
        this.setupActivityTracking();
        this.setupAutoSave();
        
        if (CONFIG.DEBUG) {
            console.log('✅ AppState initialized', {
                user: this.currentUser?.name,
                settings: this.settings,
                isOnline: this.isOnline
            });
        }
    }
    
    loadSettings() {
        try {
            const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.SETTINGS);
            if (saved) {
                this.settings = { ...CONFIG.DEFAULT_SETTINGS, ...JSON.parse(saved) };
            }
            this.applySettings();
        } catch (e) {
            console.error('Error loading settings:', e);
        }
    }
    
    saveSettings() {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
            this.applySettings();
        } catch (e) {
            console.error('Error saving settings:', e);
        }
    }
    
    applySettings() {
        // Apply theme
        document.documentElement.setAttribute('data-theme', this.settings.theme);
        
        // Apply font size
        document.documentElement.style.fontSize = {
            'small': '14px',
            'medium': '16px',
            'large': '18px'
        }[this.settings.fontSize] || '16px';
        
        // Apply privacy mode
        if (this.settings.privacyMode) {
            document.body.classList.add('privacy-mode');
        } else {
            document.body.classList.remove('privacy-mode');
        }
    }
    
    loadUserState() {
        const user = sessionStorage.getItem(CONFIG.STORAGE_KEYS.USER) || 
                    localStorage.getItem(CONFIG.STORAGE_KEYS.USER);
        if (user) {
            try {
                this.currentUser = JSON.parse(user);
                this.updateLastActive();
            } catch (e) {
                console.error('Error parsing user data');
            }
        }
    }
    
    saveUserState() {
        if (this.currentUser) {
            const storage = this.currentUser.rememberMe ? localStorage : sessionStorage;
            storage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(this.currentUser));
        }
    }
    
    updateLastActive() {
        if (this.currentUser) {
            this.currentUser.lastActive = new Date().toISOString();
            this.lastActivity = Date.now();
            this.saveUserState();
        }
    }
    
    loadDailyGoals() {
        if (!this.currentUser) return;
        try {
            const saved = localStorage.getItem(`${CONFIG.STORAGE_KEYS.DAILY_GOALS}_${this.currentUser.id}`);
            if (saved) {
                this.dailyGoals = JSON.parse(saved);
            } else {
                this.resetDailyGoals();
            }
            
            // Check if new day
            if (this.dailyGoals.date !== new Date().toDateString()) {
                const oldStreak = this.dailyGoals.streak;
                const wasCompleted = this.dailyGoals.exercisesDone >= this.dailyGoals.exercisesTarget;
                this.resetDailyGoals();
                this.dailyGoals.streak = wasCompleted ? oldStreak + 1 : 0;
                this.saveDailyGoals();
            }
        } catch (e) {
            console.error('Error loading daily goals:', e);
            this.resetDailyGoals();
        }
    }
    
    resetDailyGoals() {
        this.dailyGoals = {
            date: new Date().toDateString(),
            exercisesDone: 0,
            exercisesTarget: this.settings.dailyGoal || 30,
            timeSpent: 0,
            timeTarget: 60,
            examsDone: 0,
            examsTarget: 2,
            pointsEarned: 0,
            streak: 0
        };
    }
    
    saveDailyGoals() {
        if (!this.currentUser) return;
        try {
            localStorage.setItem(
                `${CONFIG.STORAGE_KEYS.DAILY_GOALS}_${this.currentUser.id}`,
                JSON.stringify(this.dailyGoals)
            );
        } catch (e) {
            console.error('Error saving daily goals:', e);
        }
    }
    
    loadAchievements() {
        if (!this.currentUser) return;
        try {
            const saved = localStorage.getItem(`${CONFIG.STORAGE_KEYS.ACHIEVEMENTS}_${this.currentUser.id}`);
            this.achievements = saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Error loading achievements:', e);
            this.achievements = [];
        }
    }
    
    saveAchievements() {
        if (!this.currentUser) return;
        try {
            localStorage.setItem(
                `${CONFIG.STORAGE_KEYS.ACHIEVEMENTS}_${this.currentUser.id}`,
                JSON.stringify(this.achievements)
            );
        } catch (e) {
            console.error('Error saving achievements:', e);
        }
    }
    
    loadBookmarks() {
        if (!this.currentUser) return;
        try {
            const saved = localStorage.getItem(`${CONFIG.STORAGE_KEYS.BOOKMARKS}_${this.currentUser.id}`);
            this.bookmarks = saved ? JSON.parse(saved) : [];
        } catch (e) {
            this.bookmarks = [];
        }
    }
    
    loadNotes() {
        if (!this.currentUser) return;
        try {
            const saved = localStorage.getItem(`${CONFIG.STORAGE_KEYS.NOTES}_${this.currentUser.id}`);
            this.notes = saved ? JSON.parse(saved) : [];
        } catch (e) {
            this.notes = [];
        }
    }
    
    setupOfflineSupport() {
        this.isOnline = navigator.onLine;
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.syncOfflineData();
            showNotification('Đã kết nối lại internet!', 'success');
        });
        window.addEventListener('offline', () => {
            this.isOnline = false;
            showNotification('Đang ở chế độ ngoại tuyến', 'warning');
        });
    }
    
    syncOfflineData() {
        try {
            const queue = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.SYNC_QUEUE) || '[]');
            if (queue.length > 0) {
                showNotification(`Đang đồng bộ ${queue.length} mục...`, 'info');
                // Simulate sync
                setTimeout(() => {
                    localStorage.setItem(CONFIG.STORAGE_KEYS.SYNC_QUEUE, '[]');
                    showNotification('Đồng bộ hoàn tất!', 'success');
                }, 2000);
            }
        } catch (e) {
            console.error('Error syncing offline data:', e);
        }
    }
    
    setupActivityTracking() {
        // Track user activity
        ['click', 'keydown', 'scroll', 'mousemove'].forEach(event => {
            document.addEventListener(event, () => {
                this.updateLastActive();
            });
        });
        
        // Check session timeout
        setInterval(() => {
            if (this.currentUser && Date.now() - this.lastActivity > CONFIG.SESSION_TIMEOUT) {
                this.logout(true);
            }
        }, 60000);
    }
    
    setupAutoSave() {
        setInterval(() => {
            if (this.currentExercise || this.currentExam) {
                this.saveProgress();
            }
        }, CONFIG.AUTO_SAVE_INTERVAL);
    }
    
    saveProgress() {
        if (!this.currentUser) return;
        
        const progress = {
            type: this.currentExam ? 'exam' : 'exercise',
            id: this.currentExam?.id || this.currentExercise,
            answers: this.currentAnswers,
            questionIndex: this.currentQuestionIndex,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem(`progress_${this.currentUser.id}`, JSON.stringify(progress));
    }
    
    loadProgress() {
        if (!this.currentUser) return null;
        
        try {
            const saved = localStorage.getItem(`progress_${this.currentUser.id}`);
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            return null;
        }
    }
    
    clearProgress() {
        if (this.currentUser) {
            localStorage.removeItem(`progress_${this.currentUser.id}`);
        }
    }
    
    logout(timeout = false) {
        const message = timeout ? 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.' : 'Đã đăng xuất!';
        
        this.currentUser = null;
        sessionStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
        
        showNotification(message, timeout ? 'warning' : 'info');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    }
    
    saveState() {
        return {
            currentUser: this.currentUser,
            settings: this.settings,
            dailyGoals: this.dailyGoals,
            achievements: this.achievements,
            timestamp: new Date().toISOString()
        };
    }
    
    loadState(state) {
        if (!state) return;
        this.currentUser = state.currentUser;
        this.settings = state.settings || CONFIG.DEFAULT_SETTINGS;
        this.dailyGoals = state.dailyGoals;
        this.achievements = state.achievements || [];
        this.applySettings();
    }
}

// Create global app state instance
const appState = new AppState();

// ============================================
// PHẦN 3: AI ASSISTANT & RECOMMENDATION ENGINE
// ============================================

class AIAssistant {
    constructor() {
        this.modelVersion = CONFIG.AI.MODEL_VERSION;
        this.enabled = CONFIG.AI.ENABLED;
        this.confidenceThreshold = CONFIG.AI.CONFIDENCE_THRESHOLD;
        this.learningRate = 0.1;
        this.userProfile = null;
        this.predictionCache = new Map();
    }
    
    initialize(userId) {
        if (!this.enabled) return;
        this.userProfile = this.loadUserProfile(userId);
        console.log('🤖 AI Assistant initialized for user:', userId);
    }
    
    loadUserProfile(userId) {
        const user = window.getUserById?.(userId);
        if (!user) return null;
        
        const history = window.studyHistory || [];
        const userHistory = history.filter(h => h.status === 'completed');
        
        // Calculate learning patterns
        const patterns = this.analyzeLearningPatterns(userHistory);
        
        return {
            userId,
            strengths: user.learningProfile?.strengths || [],
            weaknesses: user.learningProfile?.weaknesses || [],
            preferredTime: user.learningProfile?.preferredTime || 'flexible',
            averageSession: user.learningProfile?.averageSession || 30,
            patterns,
            lastUpdated: new Date().toISOString()
        };
    }
    
    analyzeLearningPatterns(history) {
        if (!history || history.length === 0) return {};
        
        const patterns = {
            bestTime: null,
            bestSubject: null,
            worstSubject: null,
            avgAccuracy: 0,
            speedTrend: 'stable',
            consistencyScore: 0
        };
        
        // Analyze by subject
        const subjectStats = {};
        history.forEach(h => {
            if (!subjectStats[h.subject]) {
                subjectStats[h.subject] = { scores: [], times: [], count: 0 };
            }
            subjectStats[h.subject].scores.push(h.score);
            subjectStats[h.subject].times.push(h.timeSpent);
            subjectStats[h.subject].count++;
        });
        
        // Find best and worst subjects
        let bestAvg = 0, worstAvg = 100;
        Object.entries(subjectStats).forEach(([subject, stats]) => {
            const avg = stats.scores.reduce((a,b) => a+b, 0) / stats.scores.length;
            if (avg > bestAvg) {
                bestAvg = avg;
                patterns.bestSubject = subject;
            }
            if (avg < worstAvg) {
                worstAvg = avg;
                patterns.worstSubject = subject;
            }
        });
        
        // Calculate consistency
        const allScores = history.map(h => h.score);
        const avgScore = allScores.reduce((a,b) => a+b, 0) / allScores.length;
        const variance = allScores.reduce((sum, s) => sum + Math.pow(s - avgScore, 2), 0) / allScores.length;
        patterns.consistencyScore = Math.max(0, 100 - Math.sqrt(variance) * 2);
        patterns.avgAccuracy = avgScore;
        
        return patterns;
    }
    
    getRecommendations(userId, context = {}) {
        if (!this.enabled) return this.getFallbackRecommendations();
        
        // Check cache
        const cacheKey = `${userId}_${JSON.stringify(context)}`;
        if (this.predictionCache.has(cacheKey)) {
            return this.predictionCache.get(cacheKey);
        }
        
        const recommendations = [];
        const user = window.getUserById?.(userId);
        const history = window.studyHistory || [];
        const analytics = window.getLearningAnalytics?.(userId);
        
        if (!user || !analytics) {
            return this.getFallbackRecommendations();
        }
        
        // 1. Recommendations based on weaknesses
        if (analytics.weaknesses && analytics.weaknesses.length > 0) {
            analytics.weaknesses.forEach(weakness => {
                const recs = this.getRecommendationsForWeakness(weakness, user.class);
                recommendations.push(...recs);
            });
        }
        
        // 2. Recommendations based on recent activity
        const recentHistory = history.filter(h => {
            const date = new Date(h.date);
            const now = new Date();
            return (now - date) / (1000 * 60 * 60 * 24) < 7;
        });
        
        if (recentHistory.length > 0) {
            const lastSubject = recentHistory[0].subject;
            const nextLevel = this.getNextLevelExercise(lastSubject, recentHistory[0].score);
            if (nextLevel) {
                recommendations.push({
                    type: 'exercise',
                    id: nextLevel.id,
                    title: nextLevel.title,
                    reason: `Tiếp tục với ${nextLevel.title} dựa trên kết quả gần đây`,
                    priority: 'high',
                    confidence: 0.85
                });
            }
        }
        
        // 3. Recommendations for exam preparation
        if (context.examPrep || analytics.predictedExamScore < 70) {
            const examRecs = this.getExamRecommendations(user.class, analytics.weaknesses);
            recommendations.push(...examRecs);
        }
        
        // 4. Daily practice recommendations
        const dailyRec = this.getDailyPracticeRecommendation(user.class, analytics.strengths?.[0]);
        if (dailyRec) {
            recommendations.push(dailyRec);
        }
        
        // Sort by priority and confidence
        recommendations.sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            const aScore = (priorityOrder[a.priority] || 0) + (a.confidence || 0);
            const bScore = (priorityOrder[b.priority] || 0) + (b.confidence || 0);
            return bScore - aScore;
        });
        
        // Limit recommendations
        const limited = recommendations.slice(0, CONFIG.AI.MAX_RECOMMENDATIONS);
        
        // Cache result
        this.predictionCache.set(cacheKey, limited);
        setTimeout(() => this.predictionCache.delete(cacheKey), 300000); // 5 min TTL
        
        return limited;
    }
    
    getRecommendationsForWeakness(weakness, classLevel) {
        const recommendations = [];
        const exercises = Object.values(window.exercises || {});
        
        const relevant = exercises.filter(ex => 
            ex.subject === weakness && 
            ex.class === classLevel &&
            ex.difficulty === 'Dễ'
        );
        
        relevant.slice(0, 2).forEach(ex => {
            recommendations.push({
                type: 'exercise',
                id: ex.id,
                title: ex.title,
                reason: `Cải thiện kỹ năng ${weakness}`,
                priority: 'high',
                confidence: 0.9
            });
        });
        
        return recommendations;
    }
    
    getNextLevelExercise(subject, lastScore) {
        const exercises = Object.values(window.exercises || {});
        const relevant = exercises.filter(ex => ex.subject === subject);
        
        if (lastScore >= 80) {
            return relevant.find(ex => ex.difficulty === 'Khó');
        } else if (lastScore >= 60) {
            return relevant.find(ex => ex.difficulty === 'Trung bình');
        } else {
            return relevant.find(ex => ex.difficulty === 'Dễ');
        }
    }
    
    getExamRecommendations(classLevel, weaknesses) {
        const exams = window.exams || [];
        return exams
            .filter(ex => ex.class === classLevel)
            .slice(0, 2)
            .map(ex => ({
                type: 'exam',
                id: ex.id,
                title: ex.name,
                reason: 'Luyện tập cho kỳ thi sắp tới',
                priority: 'high',
                confidence: 0.88
            }));
    }
    
    getDailyPracticeRecommendation(classLevel, strength) {
        const exercises = Object.values(window.exercises || {});
        const quickEx = exercises.find(ex => 
            ex.class === classLevel && 
            ex.time <= 15 &&
            ex.difficulty === 'Dễ'
        );
        
        if (!quickEx) return null;
        
        return {
            type: 'exercise',
            id: quickEx.id,
            title: quickEx.title,
            reason: 'Bài tập nhanh hàng ngày',
            priority: 'medium',
            confidence: 0.75
        };
    }
    
    predictScore(userId, exerciseId) {
        const user = window.getUserById?.(userId);
        const exercise = window.getExerciseById?.(exerciseId);
        
        if (!user || !exercise) return 70;
        
        const history = window.studyHistory || [];
        const userHistory = history.filter(h => 
            h.status === 'completed' && 
            h.subject === exercise.subject
        );
        
        if (userHistory.length === 0) return 70;
        
        // Weighted average with recency bias
        let totalWeight = 0;
        let weightedScore = 0;
        
        userHistory.forEach((h, index) => {
            const weight = Math.pow(0.9, userHistory.length - 1 - index);
            totalWeight += weight;
            weightedScore += h.score * weight;
        });
        
        const basePrediction = weightedScore / totalWeight;
        
        // Adjust based on difficulty
        const difficultyMultiplier = {
            'Dễ': 1.05,
            'Trung bình': 1.0,
            'Khó': 0.9
        };
        
        return Math.round(basePrediction * (difficultyMultiplier[exercise.difficulty] || 1.0));
    }
    
    getFallbackRecommendations() {
        return [
            {
                type: 'exercise',
                id: 'toan-5-1',
                title: 'Phân số - Cơ bản',
                reason: 'Bài tập được đề xuất',
                priority: 'medium'
            },
            {
                type: 'exam',
                id: 1,
                title: 'Đề thi thử Toán lớp 5',
                reason: 'Đề thi phổ biến',
                priority: 'medium'
            }
        ];
    }
    
    analyzeAnswer(question, userAnswer) {
        const isCorrect = userAnswer === question.answer;
        const confidence = isCorrect ? 1.0 : 0.0;
        
        let feedback = '';
        if (!isCorrect) {
            feedback = question.explanation || 'Hãy xem lại kiến thức này nhé!';
        }
        
        return {
            isCorrect,
            confidence,
            feedback,
            suggestedReview: !isCorrect ? this.suggestReview(question) : null
        };
    }
    
    suggestReview(question) {
        const topic = question.skill || 'cơ bản';
        return {
            topic,
            message: `Bạn nên ôn lại phần ${topic}`,
            resources: this.findResources(topic)
        };
    }
    
    findResources(topic) {
        // Map topic to relevant exercises
        const resourceMap = {
            'addition': ['toan-5-1'],
            'subtraction': ['toan-5-1'],
            'multiplication': ['toan-5-2'],
            'division': ['toan-5-2'],
            'vocabulary': ['anh-5-1'],
            'grammar': ['anh-5-4'],
            'spelling': ['van-5-2']
        };
        
        return resourceMap[topic] || [];
    }
    
    generateStudyPlan(userId, targetScore = 90, days = 30) {
        const user = window.getUserById?.(userId);
        const analytics = window.getLearningAnalytics?.(userId);
        
        if (!user || !analytics) return null;
        
        const plan = {
            userId,
            targetScore,
            days,
            currentScore: analytics.averageScore,
            weeklyPlan: [],
            dailyTargets: []
        };
        
        const scoreGap = targetScore - analytics.averageScore;
        const dailyImprovement = scoreGap / days;
        
        // Create weekly plan
        const subjects = ['toan', 'van', 'anh'];
        subjects.forEach((subject, weekIndex) => {
            const focus = analytics.weaknesses.includes(subject) ? 'intensive' : 'maintenance';
            const exercisesPerDay = focus === 'intensive' ? 3 : 2;
            
            plan.weeklyPlan.push({
                week: weekIndex + 1,
                subject,
                focus,
                exercisesPerDay,
                targetScore: Math.round(analytics.averageScore + dailyImprovement * 7 * (weekIndex + 1))
            });
        });
        
        return plan;
    }
}

// Create global AI assistant instance
const aiAssistant = new AIAssistant();

// ============================================
// PHẦN 4: ANALYTICS ENGINE
// ============================================

class AnalyticsEngine {
    constructor() {
        this.metrics = {
            pageViews: {},
            events: [],
            performance: {},
            errors: []
        };
        this.sessionId = this.generateSessionId();
    }
    
    generateSessionId() {
        return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    trackPageView(page) {
        if (!this.metrics.pageViews[page]) {
            this.metrics.pageViews[page] = 0;
        }
        this.metrics.pageViews[page]++;
        
        this.logEvent('page_view', { page });
    }
    
    trackEvent(category, action, label = null, value = null) {
        const event = {
            category,
            action,
            label,
            value,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: appState.currentUser?.id || 'anonymous'
        };
        
        this.metrics.events.push(event);
        
        // Keep only last 1000 events
        if (this.metrics.events.length > 1000) {
            this.metrics.events = this.metrics.events.slice(-1000);
        }
        
        if (CONFIG.DEBUG) {
            console.log('📊 Analytics:', event);
        }
    }
    
    trackExerciseStart(exerciseId, exerciseData) {
        this.trackEvent('exercise', 'start', exerciseId);
        
        const startTime = Date.now();
        sessionStorage.setItem(`exercise_${exerciseId}_start`, startTime);
        
        return {
            exerciseId,
            startTime,
            data: exerciseData
        };
    }
    
    trackExerciseComplete(exerciseId, result) {
        const startTime = sessionStorage.getItem(`exercise_${exerciseId}_start`);
        const duration = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
        
        this.trackEvent('exercise', 'complete', exerciseId, result.score);
        
        // Calculate performance metrics
        const performance = {
            exerciseId,
            score: result.score,
            correct: result.correct,
            total: result.total,
            duration,
            accuracy: result.correct / result.total * 100,
            speed: duration / result.total,
            timestamp: new Date().toISOString()
        };
        
        this.metrics.performance[exerciseId] = performance;
        
        // Update daily goals
        this.updateDailyGoals(performance);
        
        // Check achievements
        this.checkAchievements(performance);
        
        sessionStorage.removeItem(`exercise_${exerciseId}_start`);
        
        return performance;
    }
    
    trackExamStart(examId, examData) {
        this.trackEvent('exam', 'start', examId);
        
        const startTime = Date.now();
        sessionStorage.setItem(`exam_${examId}_start`, startTime);
        
        return {
            examId,
            startTime,
            data: examData
        };
    }
    
    trackExamComplete(examId, result) {
        const startTime = sessionStorage.getItem(`exam_${examId}_start`);
        const duration = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
        
        this.trackEvent('exam', 'complete', examId, result.score);
        
        const performance = {
            examId,
            score: result.score,
            correct: result.correct,
            total: result.total,
            duration,
            accuracy: result.correct / result.total * 100,
            timestamp: new Date().toISOString()
        };
        
        // Save to exam history
        this.saveExamHistory(performance);
        
        sessionStorage.removeItem(`exam_${examId}_start`);
        
        return performance;
    }
    
    trackError(error, context = {}) {
        const errorRecord = {
            message: error.message,
            stack: error.stack,
            context,
            timestamp: new Date().toISOString(),
            userId: appState.currentUser?.id,
            url: window.location.href
        };
        
        this.metrics.errors.push(errorRecord);
        
        if (this.metrics.errors.length > 100) {
            this.metrics.errors = this.metrics.errors.slice(-100);
        }
        
        console.error('❌ Error tracked:', errorRecord);
    }
    
    updateDailyGoals(performance) {
        if (!appState.currentUser) return;
        
        appState.dailyGoals.exercisesDone++;
        appState.dailyGoals.timeSpent += Math.round(performance.duration / 60);
        appState.dailyGoals.pointsEarned += Math.round(performance.score / 10);
        
        appState.saveDailyGoals();
        
        // Check if daily goal completed
        if (appState.dailyGoals.exercisesDone >= appState.dailyGoals.exercisesTarget) {
            showNotification('🎉 Chúc mừng! Bạn đã đạt mục tiêu hôm nay!', 'success');
            this.trackEvent('goal', 'daily_complete');
        }
    }
    
    checkAchievements(performance) {
        if (!appState.currentUser) return;
        
        const allAchievements = window.achievementsList || [];
        const unlockedIds = new Set(appState.achievements.map(a => a.id));
        
        allAchievements.forEach(achievement => {
            if (unlockedIds.has(achievement.id)) return;
            
            let earned = false;
            
            switch (achievement.condition.type) {
                case 'exercises':
                    const totalExercises = (window.studyHistory || []).filter(h => 
                        h.subject === achievement.condition.subject
                    ).length;
                    earned = totalExercises >= achievement.condition.value;
                    break;
                    
                case 'perfect_score':
                    earned = performance.score === 100;
                    break;
                    
                case 'streak':
                    earned = appState.dailyGoals.streak >= achievement.condition.value;
                    break;
                    
                case 'exams':
                    const examHistory = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.EXAM_HISTORY) || '[]');
                    earned = examHistory.length >= achievement.condition.value;
                    break;
                    
                case 'total_points':
                    const totalPoints = appState.currentUser.points || 0;
                    earned = totalPoints >= achievement.condition.value;
                    break;
            }
            
            if (earned) {
                this.unlockAchievement(achievement);
            }
        });
    }
    
    unlockAchievement(achievement) {
        appState.achievements.push({
            id: achievement.id,
            name: achievement.name,
            unlockedAt: new Date().toISOString()
        });
        
        appState.saveAchievements();
        
        // Add points
        if (appState.currentUser) {
            appState.currentUser.points = (appState.currentUser.points || 0) + achievement.points;
            appState.saveUserState();
        }
        
        showNotification(`🏆 Thành tựu mới: ${achievement.name}! +${achievement.points} điểm`, 'success');
        this.trackEvent('achievement', 'unlock', achievement.name);
    }
    
    saveExamHistory(performance) {
        try {
            let history = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.EXAM_HISTORY) || '[]');
            history.push(performance);
            
            if (history.length > 50) {
                history = history.slice(-50);
            }
            
            localStorage.setItem(CONFIG.STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(history));
            
            if (appState.currentUser) {
                appState.dailyGoals.examsDone++;
                appState.saveDailyGoals();
            }
        } catch (e) {
            console.error('Error saving exam history:', e);
        }
    }
    
    getPerformanceReport(userId, period = 'week') {
        const history = window.studyHistory || [];
        const userHistory = history.filter(h => h.status === 'completed');
        
        if (userHistory.length === 0) return null;
        
        // Filter by period
        const now = new Date();
        const periodDays = { week: 7, month: 30, year: 365 };
        const cutoff = new Date(now.setDate(now.getDate() - periodDays[period]));
        
        const periodHistory = userHistory.filter(h => new Date(h.date) >= cutoff);
        
        // Calculate metrics
        const totalExercises = periodHistory.length;
        const avgScore = periodHistory.reduce((s, h) => s + h.score, 0) / totalExercises;
        const totalTime = periodHistory.reduce((s, h) => s + (h.timeSpent || 0), 0);
        const accuracy = periodHistory.reduce((s, h) => s + (h.accuracy || 0), 0) / totalExercises;
        
        // Subject breakdown
        const subjectBreakdown = {};
        periodHistory.forEach(h => {
            if (!subjectBreakdown[h.subject]) {
                subjectBreakdown[h.subject] = { count: 0, totalScore: 0 };
            }
            subjectBreakdown[h.subject].count++;
            subjectBreakdown[h.subject].totalScore += h.score;
        });
        
        Object.keys(subjectBreakdown).forEach(subject => {
            subjectBreakdown[subject].avgScore = 
                Math.round(subjectBreakdown[subject].totalScore / subjectBreakdown[subject].count);
        });
        
        // Trend analysis
        const trend = this.calculateTrend(periodHistory);
        
        return {
            period,
            totalExercises,
            avgScore: Math.round(avgScore),
            totalTime,
            accuracy: Math.round(accuracy),
            subjectBreakdown,
            trend,
            strengths: this.identifyStrengths(subjectBreakdown),
            weaknesses: this.identifyWeaknesses(subjectBreakdown),
            recommendations: this.generateReportRecommendations(subjectBreakdown)
        };
    }
    
    calculateTrend(history) {
        if (history.length < 5) return 'stable';
        
        const recent = history.slice(0, 5);
        const older = history.slice(5, 10);
        
        if (older.length === 0) return 'stable';
        
        const recentAvg = recent.reduce((s, h) => s + h.score, 0) / recent.length;
        const olderAvg = older.reduce((s, h) => s + h.score, 0) / older.length;
        
        if (recentAvg > olderAvg + 5) return 'improving';
        if (recentAvg < olderAvg - 5) return 'declining';
        return 'stable';
    }
    
    identifyStrengths(breakdown) {
        return Object.entries(breakdown)
            .filter(([, data]) => data.avgScore >= 80)
            .map(([subject]) => subject);
    }
    
    identifyWeaknesses(breakdown) {
        return Object.entries(breakdown)
            .filter(([, data]) => data.avgScore < 60)
            .map(([subject]) => subject);
    }
    
    generateReportRecommendations(breakdown) {
        const recommendations = [];
        const weaknesses = this.identifyWeaknesses(breakdown);
        
        weaknesses.forEach(subject => {
            recommendations.push({
                type: 'focus',
                subject,
                message: `Tập trung cải thiện môn ${this.getSubjectName(subject)}`
            });
        });
        
        return recommendations;
    }
    
    getSubjectName(subject) {
        const names = { toan: 'Toán', van: 'Tiếng Việt', anh: 'Tiếng Anh' };
        return names[subject] || subject;
    }
    
    exportData() {
        return {
            metrics: this.metrics,
            user: appState.currentUser,
            settings: appState.settings,
            dailyGoals: appState.dailyGoals,
            achievements: appState.achievements,
            exportDate: new Date().toISOString()
        };
    }
    
    clearData() {
        this.metrics = {
            pageViews: {},
            events: [],
            performance: {},
            errors: []
        };
        localStorage.removeItem(CONFIG.STORAGE_KEYS.STUDY_HISTORY);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.EXAM_HISTORY);
    }
}

// Create global analytics instance
const analytics = new AnalyticsEngine();

// ============================================
// PHẦN 5: NOTIFICATION SYSTEM
// ============================================

class NotificationSystem {
    constructor() {
        this.container = null;
        this.queue = [];
        this.isShowing = false;
        this.defaultDuration = CONFIG.NOTIFICATION_DURATION;
        this.createContainer();
    }
    
    createContainer() {
        this.container = document.createElement('div');
        this.container.id = 'notification-container';
        this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 99999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 400px;
            pointer-events: none;
        `;
        document.body.appendChild(this.container);
    }
    
    show(message, type = 'info', options = {}) {
        const notification = {
            id: Date.now() + Math.random(),
            message,
            type,
            duration: options.duration || this.defaultDuration,
            icon: options.icon || this.getIcon(type),
            action: options.action,
            onClick: options.onClick,
            persistent: options.persistent || false
        };
        
        this.queue.push(notification);
        this.processQueue();
        
        return notification.id;
    }
    
    getIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️',
            loading: '⏳',
            achievement: '🏆',
            message: '💬'
        };
        return icons[type] || 'ℹ️';
    }
    
    getColor(type) {
        const colors = {
            success: '#00b14f',
            error: '#ff4757',
            warning: '#ffa502',
            info: '#00b14f',
            loading: '#0088cc',
            achievement: '#ffa502',
            message: '#6c757d'
        };
        return colors[type] || '#00b14f';
    }
    
    processQueue() {
        if (this.isShowing || this.queue.length === 0) return;
        
        const notification = this.queue.shift();
        this.displayNotification(notification);
    }
    
    displayNotification(notification) {
        this.isShowing = true;
        
        const element = document.createElement('div');
        element.className = `notification notification-${notification.type}`;
        element.style.cssText = `
            background: ${this.getColor(notification.type)};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            pointer-events: auto;
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 280px;
            animation: slideInRight 0.3s ease;
            cursor: ${notification.onClick ? 'pointer' : 'default'};
            opacity: 1;
            transition: opacity 0.3s;
        `;
        
        // Icon
        const iconSpan = document.createElement('span');
        iconSpan.style.fontSize = '20px';
        iconSpan.textContent = notification.icon;
        element.appendChild(iconSpan);
        
        // Message
        const messageSpan = document.createElement('span');
        messageSpan.style.flex = '1';
        messageSpan.style.fontSize = '14px';
        messageSpan.style.lineHeight = '1.4';
        messageSpan.textContent = notification.message;
        element.appendChild(messageSpan);
        
        // Close button if not persistent
        if (!notification.persistent) {
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '×';
            closeBtn.style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 0 5px;
                opacity: 0.7;
                transition: opacity 0.3s;
            `;
            closeBtn.onmouseover = () => closeBtn.style.opacity = '1';
            closeBtn.onmouseout = () => closeBtn.style.opacity = '0.7';
            closeBtn.onclick = (e) => {
                e.stopPropagation();
                this.dismiss(element);
            };
            element.appendChild(closeBtn);
        }
        
        // Action button if provided
        if (notification.action) {
            const actionBtn = document.createElement('button');
            actionBtn.textContent = notification.action.text;
            actionBtn.style.cssText = `
                background: rgba(255,255,255,0.2);
                border: 1px solid rgba(255,255,255,0.5);
                color: white;
                padding: 5px 12px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 12px;
                transition: all 0.3s;
                margin-left: 8px;
            `;
            actionBtn.onmouseover = () => {
                actionBtn.style.background = 'rgba(255,255,255,0.3)';
            };
            actionBtn.onmouseout = () => {
                actionBtn.style.background = 'rgba(255,255,255,0.2)';
            };
            actionBtn.onclick = (e) => {
                e.stopPropagation();
                notification.action.handler();
                this.dismiss(element);
            };
            element.appendChild(actionBtn);
        }
        
        // Click handler
        if (notification.onClick) {
            element.style.cursor = 'pointer';
            element.onclick = () => {
                notification.onClick();
                this.dismiss(element);
            };
        }
        
        // Progress bar
        if (!notification.persistent) {
            const progressBar = document.createElement('div');
            progressBar.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: rgba(255,255,255,0.3);
                width: 100%;
            `;
            
            const progress = document.createElement('div');
            progress.style.cssText = `
                height: 100%;
                background: white;
                width: 100%;
                transition: width ${notification.duration}ms linear;
            `;
            progressBar.appendChild(progress);
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            element.appendChild(progressBar);
            
            setTimeout(() => {
                progress.style.width = '0%';
            }, 10);
        }
        
        this.container.appendChild(element);
        
        // Auto dismiss
        if (!notification.persistent) {
            setTimeout(() => {
                this.dismiss(element);
            }, notification.duration);
        }
    }
    
    dismiss(element) {
        if (!element || !element.parentNode) return;
        
        element.style.animation = 'slideOutRight 0.3s ease';
        element.style.opacity = '0';
        
        setTimeout(() => {
            if (element.parentNode) {
                element.remove();
            }
            this.isShowing = false;
            this.processQueue();
        }, 300);
    }
    
    dismissAll() {
        this.container.innerHTML = '';
        this.queue = [];
        this.isShowing = false;
    }
    
    success(message, options = {}) {
        return this.show(message, 'success', options);
    }
    
    error(message, options = {}) {
        return this.show(message, 'error', options);
    }
    
    warning(message, options = {}) {
        return this.show(message, 'warning', options);
    }
    
    info(message, options = {}) {
        return this.show(message, 'info', options);
    }
    
    loading(message, options = {}) {
        return this.show(message, 'loading', { ...options, persistent: true });
    }
    
    achievement(message, options = {}) {
        return this.show(message, 'achievement', options);
    }
}

// Create global notification instance
const notifications = new NotificationSystem();

// Global showNotification function (backward compatibility)
function showNotification(message, type = 'info', duration) {
    return notifications.show(message, type, { duration });
}

// ============================================
// PHẦN 6: UI MANAGER
// ============================================

class UIManager {
    constructor() {
        this.loadingOverlay = null;
        this.modalStack = [];
        this.toastContainer = null;
    }
    
    showLoading(message = 'Đang tải...') {
        if (this.loadingOverlay) {
            this.loadingOverlay.querySelector('.loading-message').textContent = message;
            return;
        }
        
        this.loadingOverlay = document.createElement('div');
        this.loadingOverlay.className = 'loading-overlay';
        this.loadingOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99998;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        `;
        
        const spinner = document.createElement('div');
        spinner.style.cssText = `
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #00b14f;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 15px;
        `;
        
        const messageEl = document.createElement('p');
        messageEl.className = 'loading-message';
        messageEl.textContent = message;
        messageEl.style.color = '#333';
        
        content.appendChild(spinner);
        content.appendChild(messageEl);
        this.loadingOverlay.appendChild(content);
        document.body.appendChild(this.loadingOverlay);
        
        // Add animation if not exists
        if (!document.querySelector('#loading-animation')) {
            const style = document.createElement('style');
            style.id = 'loading-animation';
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    hideLoading() {
        if (this.loadingOverlay) {
            this.loadingOverlay.remove();
            this.loadingOverlay = null;
        }
    }
    
    showModal(options) {
        const {
            title,
            content,
            buttons = [],
            closeOnOverlay = true,
            onClose = null,
            size = 'medium'
        } = options;
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99997;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.cssText = `
            background: white;
            border-radius: 15px;
            padding: 30px;
            max-width: ${size === 'small' ? '400px' : size === 'large' ? '800px' : '600px'};
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: slideUp 0.3s ease;
        `;
        
        // Header
        if (title) {
            const header = document.createElement('div');
            header.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            `;
            
            const titleEl = document.createElement('h3');
            titleEl.textContent = title;
            titleEl.style.margin = '0';
            titleEl.style.color = '#333';
            
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '×';
            closeBtn.style.cssText = `
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #999;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s;
            `;
            closeBtn.onmouseover = () => {
                closeBtn.style.background = '#f5f5f5';
                closeBtn.style.color = '#333';
            };
            closeBtn.onmouseout = () => {
                closeBtn.style.background = 'none';
                closeBtn.style.color = '#999';
            };
            closeBtn.onclick = () => this.closeModal(modal);
            
            header.appendChild(titleEl);
            header.appendChild(closeBtn);
            modalContent.appendChild(header);
        }
        
        // Content
        const body = document.createElement('div');
        body.className = 'modal-body';
        if (typeof content === 'string') {
            body.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            body.appendChild(content);
        }
        modalContent.appendChild(body);
        
        // Buttons
        if (buttons.length > 0) {
            const footer = document.createElement('div');
            footer.style.cssText = `
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #eee;
            `;
            
            buttons.forEach(btn => {
                const button = document.createElement('button');
                button.textContent = btn.text;
                button.style.cssText = `
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.3s;
                    border: none;
                    background: ${btn.primary ? '#00b14f' : '#f5f5f5'};
                    color: ${btn.primary ? 'white' : '#333'};
                `;
                
                if (btn.primary) {
                    button.onmouseover = () => button.style.background = '#008c3e';
                    button.onmouseout = () => button.style.background = '#00b14f';
                } else {
                    button.onmouseover = () => button.style.background = '#e0e0e0';
                    button.onmouseout = () => button.style.background = '#f5f5f5';
                }
                
                button.onclick = async () => {
                    if (btn.onClick) {
                        const result = await btn.onClick();
                        if (result !== false) {
                            this.closeModal(modal);
                        }
                    } else {
                        this.closeModal(modal);
                    }
                };
                
                footer.appendChild(button);
            });
            
            modalContent.appendChild(footer);
        }
        
        modal.appendChild(modalContent);
        
        if (closeOnOverlay) {
            modal.onclick = (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            };
        }
        
        document.body.appendChild(modal);
        this.modalStack.push({ modal, onClose });
        
        // Add animations if not exists
        this.addModalAnimations();
        
        return modal;
    }
    
    closeModal(modal) {
        if (!modal || !modal.parentNode) return;
        
        const modalData = this.modalStack.find(m => m.modal === modal);
        if (modalData?.onClose) {
            modalData.onClose();
        }
        
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
            this.modalStack = this.modalStack.filter(m => m.modal !== modal);
        }, 300);
    }
    
    closeAllModals() {
        [...this.modalStack].forEach(({ modal }) => this.closeModal(modal));
    }
    
    addModalAnimations() {
        if (document.querySelector('#modal-animations')) return;
        
        const style = document.createElement('style');
        style.id = 'modal-animations';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    confirm(options) {
        return new Promise((resolve) => {
            this.showModal({
                title: options.title || 'Xác nhận',
                content: options.message || 'Bạn có chắc chắn?',
                size: 'small',
                buttons: [
                    {
                        text: options.cancelText || 'Hủy',
                        onClick: () => resolve(false)
                    },
                    {
                        text: options.confirmText || 'Xác nhận',
                        primary: true,
                        onClick: () => resolve(true)
                    }
                ],
                onClose: () => resolve(false)
            });
        });
    }
    
    prompt(options) {
        return new Promise((resolve) => {
            const input = document.createElement('input');
            input.type = options.type || 'text';
            input.placeholder = options.placeholder || '';
            input.value = options.defaultValue || '';
            input.style.cssText = `
                width: 100%;
                padding: 12px 15px;
                border: 2px solid #e0e0e0;
                border-radius: 5px;
                font-size: 16px;
                margin: 10px 0;
            `;
            input.onfocus = () => input.style.borderColor = '#00b14f';
            input.onblur = () => input.style.borderColor = '#e0e0e0';
            
            const content = document.createElement('div');
            content.innerHTML = `<p style="margin-bottom: 10px;">${options.message || ''}</p>`;
            content.appendChild(input);
            
            this.showModal({
                title: options.title || 'Nhập thông tin',
                content,
                size: 'small',
                buttons: [
                    {
                        text: 'Hủy',
                        onClick: () => resolve(null)
                    },
                    {
                        text: 'Xác nhận',
                        primary: true,
                        onClick: () => resolve(input.value)
                    }
                ]
            });
            
            setTimeout(() => input.focus(), 100);
        });
    }
    
    updatePageTitle(title) {
        document.title = `${title} - ${CONFIG.APP_NAME}`;
    }
    
    updateBreadcrumb(items) {
        let breadcrumb = document.querySelector('.breadcrumb');
        if (!breadcrumb) {
            breadcrumb = document.createElement('div');
            breadcrumb.className = 'breadcrumb';
            const container = document.querySelector('.main-content .container');
            if (container) {
                container.insertBefore(breadcrumb, container.firstChild);
            }
        }
        
        breadcrumb.innerHTML = items.map((item, index) => {
            if (index === items.length - 1) {
                return `<span class="current">${item.text}</span>`;
            }
            return `<a href="${item.url}">${item.text}</a> <span class="separator">/</span>`;
        }).join('');
    }
    
    showEmptyState(container, options = {}) {
        const {
            icon = '📭',
            title = 'Không có dữ liệu',
            message = 'Chưa có mục nào để hiển thị',
            actionText = null,
            actionUrl = null
        } = options;
        
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.style.cssText = `
            text-align: center;
            padding: 60px 20px;
            color: #999;
        `;
        
        let html = `
            <div style="font-size: 64px; margin-bottom: 20px;">${icon}</div>
            <h3 style="margin-bottom: 10px; color: #666;">${title}</h3>
            <p style="margin-bottom: 20px;">${message}</p>
        `;
        
        if (actionText && actionUrl) {
            html += `<a href="${actionUrl}" class="btn-primary" style="display: inline-block;">${actionText}</a>`;
        }
        
        emptyState.innerHTML = html;
        container.innerHTML = '';
        container.appendChild(emptyState);
    }
    
    showSkeleton(container, type = 'card', count = 3) {
        container.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'skeleton';
            skeleton.style.cssText = `
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: skeleton-loading 1.5s infinite;
                border-radius: 10px;
                margin-bottom: 15px;
            `;
            
            if (type === 'card') {
                skeleton.style.height = '150px';
            } else if (type === 'list') {
                skeleton.style.height = '60px';
            } else if (type === 'text') {
                skeleton.style.height = '20px';
                skeleton.style.width = `${70 + Math.random() * 30}%`;
            }
            
            container.appendChild(skeleton);
        }
        
        if (!document.querySelector('#skeleton-animation')) {
            const style = document.createElement('style');
            style.id = 'skeleton-animation';
            style.textContent = `
                @keyframes skeleton-loading {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Create global UI manager instance
const ui = new UIManager();

// ============================================
// PHẦN 7: FORM VALIDATOR
// ============================================

class FormValidator {
    constructor() {
        this.rules = {
            required: (value) => !!value && value.toString().trim().length > 0,
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            phone: (value) => /^(0|\+84)[3-9][0-9]{8}$/.test(value),
            minLength: (value, length) => value && value.length >= length,
            maxLength: (value, length) => value && value.length <= length,
            min: (value, min) => Number(value) >= min,
            max: (value, max) => Number(value) <= max,
            pattern: (value, pattern) => new RegExp(pattern).test(value),
            match: (value, matchValue) => value === matchValue,
            strongPassword: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value),
            username: (value) => /^[a-zA-Z0-9_]{3,20}$/.test(value)
        };
        
        this.messages = {
            required: 'Trường này không được để trống',
            email: 'Email không hợp lệ',
            phone: 'Số điện thoại không hợp lệ',
            minLength: 'Phải có ít nhất {0} ký tự',
            maxLength: 'Không được vượt quá {0} ký tự',
            min: 'Giá trị phải lớn hơn hoặc bằng {0}',
            max: 'Giá trị phải nhỏ hơn hoặc bằng {0}',
            pattern: 'Giá trị không đúng định dạng',
            match: 'Giá trị không khớp',
            strongPassword: 'Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và số',
            username: 'Tên đăng nhập chỉ gồm chữ, số và dấu gạch dưới, từ 3-20 ký tự'
        };
    }
    
    validateField(value, rules) {
        const errors = [];
        
        for (const [rule, param] of Object.entries(rules)) {
            if (rule === 'required' && !value) {
                // Skip other validations if empty and not required
                if (rules.required) {
                    errors.push(this.messages.required);
                }
                continue;
            }
            
            if (!value && !rules.required) {
                continue;
            }
            
            const validator = this.rules[rule];
            if (!validator) continue;
            
            let isValid;
            if (rule === 'match') {
                isValid = validator(value, param);
            } else if (['minLength', 'maxLength', 'min', 'max'].includes(rule)) {
                isValid = validator(value, param);
            } else {
                isValid = validator(value);
            }
            
            if (!isValid) {
                let message = this.messages[rule];
                if (param !== undefined) {
                    message = message.replace('{0}', param);
                }
                errors.push(message);
            }
        }
        
        return errors;
    }
    
    validateForm(formElement, rules) {
        const errors = {};
        let isValid = true;
        
        for (const [fieldName, fieldRules] of Object.entries(rules)) {
            const field = formElement.querySelector(`[name="${fieldName}"]`);
            if (!field) continue;
            
            const value = field.value;
            const fieldErrors = this.validateField(value, fieldRules);
            
            if (fieldErrors.length > 0) {
                errors[fieldName] = fieldErrors;
                isValid = false;
                this.showFieldError(field, fieldErrors[0]);
            } else {
                this.clearFieldError(field);
            }
        }
        
        return { isValid, errors };
    }
    
    showFieldError(field, message) {
        field.style.borderColor = '#ff4757';
        
        let errorEl = field.parentNode.querySelector('.field-error');
        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.className = 'field-error';
            errorEl.style.cssText = `
                color: #ff4757;
                font-size: 12px;
                margin-top: 5px;
                display: block;
            `;
            field.parentNode.appendChild(errorEl);
        }
        
        errorEl.textContent = message;
    }
    
    clearFieldError(field) {
        field.style.borderColor = '#e0e0e0';
        
        const errorEl = field.parentNode.querySelector('.field-error');
        if (errorEl) {
            errorEl.remove();
        }
    }
    
    clearAllErrors(formElement) {
        const fields = formElement.querySelectorAll('input, select, textarea');
        fields.forEach(field => this.clearFieldError(field));
    }
    
    validateOnInput(formElement, rules) {
        for (const [fieldName, fieldRules] of Object.entries(rules)) {
            const field = formElement.querySelector(`[name="${fieldName}"]`);
            if (!field) continue;
            
            field.addEventListener('input', () => {
                const value = field.value;
                const fieldErrors = this.validateField(value, fieldRules);
                
                if (fieldErrors.length > 0) {
                    this.showFieldError(field, fieldErrors[0]);
                } else {
                    this.clearFieldError(field);
                }
            });
            
            field.addEventListener('blur', () => {
                const value = field.value;
                const fieldErrors = this.validateField(value, fieldRules);
                
                if (fieldErrors.length > 0) {
                    this.showFieldError(field, fieldErrors[0]);
                }
            });
        }
    }
}

// Create global validator instance
const validator = new FormValidator();

// ============================================
// PHẦN 8: ROUTER & PAGE MANAGER
// ============================================

class Router {
    constructor() {
        this.routes = new Map();
        this.currentPage = null;
        this.pageData = {};
        this.guards = [];
        this.history = [];
    }
    
    register(path, handler, options = {}) {
        this.routes.set(path, {
            handler,
            options,
            pattern: this.pathToRegex(path)
        });
    }
    
    pathToRegex(path) {
        const pattern = path
            .replace(/:[^/]+/g, '([^/]+)')
            .replace(/\*/g, '.*');
        return new RegExp(`^${pattern}$`);
    }
    
    addGuard(guard) {
        this.guards.push(guard);
    }
    
    async navigate(path, data = {}) {
        // Check guards
        for (const guard of this.guards) {
            const canNavigate = await guard(path);
            if (!canNavigate) {
                console.log('Navigation blocked by guard');
                return false;
            }
        }
        
        // Find matching route
        let matchedRoute = null;
        let params = {};
        
        for (const [routePath, route] of this.routes) {
            const match = path.match(route.pattern);
            if (match) {
                matchedRoute = route;
                // Extract params
                const paramNames = (routePath.match(/:[^/]+/g) || [])
                    .map(p => p.slice(1));
                paramNames.forEach((name, index) => {
                    params[name] = match[index + 1];
                });
                break;
            }
        }
        
        if (!matchedRoute) {
            console.error('No route found for path:', path);
            return false;
        }
        
        // Save history
        this.history.push({ path, data, timestamp: Date.now() });
        if (this.history.length > 50) {
            this.history.shift();
        }
        
        // Update browser history
        if (matchedRoute.options.updateHistory !== false) {
            history.pushState({ path, data }, '', path);
        }
        
        // Execute handler
        this.currentPage = path;
        this.pageData = data;
        
        try {
            ui.showLoading();
            await matchedRoute.handler(params, data);
            analytics.trackPageView(path);
        } catch (error) {
            console.error('Error loading page:', error);
            analytics.trackError(error, { page: path });
            this.showErrorPage(error);
        } finally {
            ui.hideLoading();
        }
        
        return true;
    }
    
    back() {
        if (this.history.length > 1) {
            this.history.pop(); // Remove current
            const previous = this.history.pop(); // Get previous
            if (previous) {
                this.navigate(previous.path, previous.data);
            }
        } else {
            history.back();
        }
    }
    
    showErrorPage(error) {
        const container = document.querySelector('.main-content .container');
        if (container) {
            container.innerHTML = `
                <div class="error-page" style="text-align: center; padding: 60px 20px;">
                    <div style="font-size: 64px; margin-bottom: 20px;">😵</div>
                    <h2>Đã xảy ra lỗi</h2>
                    <p style="color: #666; margin: 20px 0;">${error.message || 'Không thể tải trang'}</p>
                    <button class="btn-primary" onclick="location.reload()">Tải lại trang</button>
                    <button class="btn-secondary" onclick="router.navigate('/dashboard')">Về trang chủ</button>
                </div>
            `;
        }
    }
    
    getCurrentQueryParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    }
    
    updateQueryParams(params) {
        const url = new URL(window.location);
        Object.entries(params).forEach(([key, value]) => {
            if (value === null || value === undefined) {
                url.searchParams.delete(key);
            } else {
                url.searchParams.set(key, value);
            }
        });
        history.replaceState(null, '', url);
    }
}

// Create global router instance
const router = new Router();

// ============================================
// PHẦN 9: PAGE HANDLERS
// ============================================

const pageHandlers = {
    // Dashboard page
    async dashboard(params, data) {
        ui.updatePageTitle('Bảng điều khiển');
        
        if (!appState.currentUser) {
            router.navigate('/');
            return;
        }
        
        updateUserInterface();
        loadDashboardStats();
        loadRecentActivities();
        loadRecommendations();
        checkAndShowDailyBonus();
    },
    
    // Login page
    async login(params, data) {
        ui.updatePageTitle('Đăng nhập');
        
        if (appState.currentUser) {
            router.navigate('/dashboard');
            return;
        }
        
        setupLoginForm();
    },
    
    // Exercise page
    async exercise(params, data) {
        const exerciseId = params.id || router.getCurrentQueryParams().id;
        
        if (!exerciseId) {
            router.navigate('/luyen-tap');
            return;
        }
        
        const exercise = window.getExerciseById?.(exerciseId);
        if (!exercise) {
            ui.showEmptyState(document.querySelector('.main-content .container'), {
                title: 'Không tìm thấy bài tập',
                message: 'Bài tập này không tồn tại hoặc đã bị xóa',
                actionText: 'Về danh sách bài tập',
                actionUrl: 'luyen-tap.html'
            });
            return;
        }
        
        ui.updatePageTitle(exercise.title);
        appState.currentExercise = exerciseId;
        appState.currentQuestions = window.getQuestionsByExerciseId?.(exerciseId) || [];
        appState.currentAnswers = new Array(appState.currentQuestions.length).fill(null);
        appState.currentQuestionIndex = 0;
        
        renderExerciseInterface(exercise);
        
        // Check for saved progress
        const progress = appState.loadProgress();
        if (progress && progress.id === exerciseId) {
            const shouldResume = await ui.confirm({
                title: 'Tiếp tục làm bài',
                message: 'Bạn có bài tập đang làm dở. Tiếp tục?'
            });
            
            if (shouldResume) {
                appState.currentAnswers = progress.answers;
                appState.currentQuestionIndex = progress.questionIndex;
            } else {
                appState.clearProgress();
            }
        }
        
        analytics.trackExerciseStart(exerciseId, exercise);
    },
    
    // Exam page
    async exam(params, data) {
        const examId = params.id || router.getCurrentQueryParams().id;
        
        if (!examId) {
            router.navigate('/thi-thu');
            return;
        }
        
        const exam = window.exams?.find(e => e.id == examId);
        if (!exam) {
            ui.showEmptyState(document.querySelector('.main-content .container'), {
                title: 'Không tìm thấy đề thi',
                message: 'Đề thi này không tồn tại',
                actionText: 'Về danh sách đề thi',
                actionUrl: 'thi-thu.html'
            });
            return;
        }
        
        ui.updatePageTitle(exam.name);
        renderExamDetail(exam);
    },
    
    // Taking exam page
    async takingExam(params, data) {
        const examData = JSON.parse(sessionStorage.getItem('current_exam'));
        if (!examData) {
            router.navigate('/thi-thu');
            return;
        }
        
        appState.currentExam = examData.exam;
        appState.currentQuestions = examData.questions;
        appState.currentAnswers = new Array(appState.currentQuestions.length).fill(null);
        appState.currentQuestionIndex = 0;
        appState.examTimeLeft = appState.currentExam.time * 60;
        appState.examStartTime = examData.startTime;
        
        ui.updatePageTitle(appState.currentExam.name);
        renderExamInterface();
        startExamTimer();
        
        analytics.trackExamStart(appState.currentExam.id, appState.currentExam);
    },
    
    // Result page
    async result(params, data) {
        const queryParams = router.getCurrentQueryParams();
        const score = queryParams.score;
        const correct = queryParams.correct;
        const total = queryParams.total;
        
        ui.updatePageTitle('Kết quả bài tập');
        renderResultPage({ score, correct, total });
    },
    
    // Exam result page
    async examResult(params, data) {
        const queryParams = router.getCurrentQueryParams();
        renderExamResultPage(queryParams);
    },
    
    // Courses page
    async courses(params, data) {
        ui.updatePageTitle('Khóa học');
        loadCoursesList();
        setupCourseFilters();
    },
    
    // Practice page
    async practice(params, data) {
        ui.updatePageTitle('Luyện tập');
        loadExercisesList();
        setupExerciseFilters();
    },
    
    // Mock exam page
    async mockExam(params, data) {
        ui.updatePageTitle('Thi thử');
        loadExamsList();
    },
    
    // Ranking page
    async ranking(params, data) {
        ui.updatePageTitle('Bảng xếp hạng');
        loadRankingPage();
    },
    
    // Profile page
    async profile(params, data) {
        ui.updatePageTitle('Tài khoản');
        
        if (!appState.currentUser) {
            router.navigate('/');
            return;
        }
        
        loadProfilePage();
    },
    
    // Packages page
    async packages(params, data) {
        ui.updatePageTitle('Gói học');
        loadPackagesPage();
    },
    
    // Payment page
    async payment(params, data) {
        ui.updatePageTitle('Thanh toán');
        loadPaymentPage();
    },
    
    // History page
    async history(params, data) {
        ui.updatePageTitle('Lịch sử học tập');
        
        if (!appState.currentUser) {
            router.navigate('/');
            return;
        }
        
        loadHistoryPage();
    },
    
    // Register page
    async register(params, data) {
        ui.updatePageTitle('Đăng ký');
        
        if (appState.currentUser) {
            router.navigate('/dashboard');
            return;
        }
        
        setupRegisterForm();
    }
};

// ============================================
// PHẦN 10: INITIALIZATION & EVENT LISTENERS
// ============================================

function initializeApp() {
    console.log(`🚀 Initializing ${CONFIG.APP_NAME} v${CONFIG.VERSION}...`);
    
    // Initialize app state
    appState.initialize();
    
    // Initialize AI assistant
    if (appState.currentUser) {
        aiAssistant.initialize(appState.currentUser.id);
    }
    
    // Setup router
    setupRoutes();
    
    // Setup global event listeners
    setupGlobalEvents();
    
    // Initialize current page
    initializeCurrentPage();
    
    // Check for updates
    checkForUpdates();
    
    // Preload common data
    preloadData();
    
    // Show welcome back message
    if (appState.currentUser) {
        const lastLogin = appState.currentUser.lastLogin;
        if (lastLogin) {
            const daysSince = Math.floor((Date.now() - new Date(lastLogin)) / (1000 * 60 * 60 * 24));
            if (daysSince > 0) {
                setTimeout(() => {
                    showNotification(`Chào mừng trở lại! Lần cuối đăng nhập: ${daysSince} ngày trước`, 'info');
                }, 1000);
            }
        }
    }
    
    console.log('✅ App initialized successfully!');
}

function setupRoutes() {
    // Register all routes
    router.register('/', pageHandlers.login);
    router.register('/index.html', pageHandlers.login);
    router.register('/dashboard.html', pageHandlers.dashboard);
    router.register('/bai-tap.html', pageHandlers.exercise);
    router.register('/thi.html', pageHandlers.exam);
    router.register('/lam-bai-thi.html', pageHandlers.takingExam);
    router.register('/ket-qua.html', pageHandlers.result);
    router.register('/ket-qua-thi.html', pageHandlers.examResult);
    router.register('/khoa-hoc.html', pageHandlers.courses);
    router.register('/luyen-tap.html', pageHandlers.practice);
    router.register('/thi-thu.html', pageHandlers.mockExam);
    router.register('/bang-xep-hang.html', pageHandlers.ranking);
    router.register('/tai-khoan.html', pageHandlers.profile);
    router.register('/mua-goi.html', pageHandlers.packages);
    router.register('/thanh-toan.html', pageHandlers.payment);
    router.register('/lich-su.html', pageHandlers.history);
    router.register('/register.html', pageHandlers.register);
    
    // Class pages
    for (let i = 1; i <= 5; i++) {
        router.register(`/lop-${i}.html`, async () => {
            ui.updatePageTitle(`Lớp ${i}`);
            loadClassPage(i);
        });
    }
    
    // Subject pages
    const subjects = ['toan', 'van', 'anh'];
    subjects.forEach(subject => {
        for (let i = 1; i <= 5; i++) {
            router.register(`/${subject}-${i}.html`, async () => {
                const subjectNames = { toan: 'Toán', van: 'Tiếng Việt', anh: 'Tiếng Anh' };
                ui.updatePageTitle(`${subjectNames[subject]} lớp ${i}`);
                loadSubjectPage(subject, i);
            });
        }
    });
    
    // Add authentication guard
    router.addGuard(async (path) => {
        const publicPaths = ['/', '/index.html', '/register.html', '/forgot-password.html'];
        
        if (publicPaths.includes(path)) {
            return true;
        }
        
        if (!appState.currentUser) {
            showNotification('Vui lòng đăng nhập để tiếp tục!', 'warning');
            router.navigate('/');
            return false;
        }
        
        return true;
    });
}

function setupGlobalEvents() {
    // Handle browser back/forward
    window.addEventListener('popstate', (event) => {
        if (event.state) {
            router.navigate(event.state.path, event.state.data);
        }
    });
    
    // Handle keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape to close modals
        if (e.key === 'Escape') {
            ui.closeAllModals();
        }
        
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            showSearchModal();
        }
        
        // Ctrl/Cmd + / for shortcuts help
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            showShortcutsHelp();
        }
    });
    
    // Handle before unload
    window.addEventListener('beforeunload', (e) => {
        if (appState.currentExercise || appState.currentExam) {
            appState.saveProgress();
            e.preventDefault();
            e.returnValue = 'Bạn có bài tập đang làm dở. Bạn có chắc muốn rời đi?';
        }
    });
    
    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            appState.saveProgress();
        }
    });
    
    // Handle online/offline
    window.addEventListener('online', () => {
        appState.isOnline = true;
        showNotification('Đã kết nối internet', 'success');
    });
    
    window.addEventListener('offline', () => {
        appState.isOnline = false;
        showNotification('Mất kết nối internet. Đang chuyển sang chế độ ngoại tuyến.', 'warning');
    });
}

function initializeCurrentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const queryParams = router.getCurrentQueryParams();
    
    // Find and execute matching route
    const routes = [
        { pattern: /^index\.html$|^$/, handler: pageHandlers.login },
        { pattern: /^dashboard\.html$/, handler: pageHandlers.dashboard },
        { pattern: /^bai-tap\.html$/, handler: pageHandlers.exercise },
        { pattern: /^thi\.html$/, handler: pageHandlers.exam },
        { pattern: /^lam-bai-thi\.html$/, handler: pageHandlers.takingExam },
        { pattern: /^ket-qua\.html$/, handler: pageHandlers.result },
        { pattern: /^ket-qua-thi\.html$/, handler: pageHandlers.examResult },
        { pattern: /^khoa-hoc\.html$/, handler: pageHandlers.courses },
        { pattern: /^luyen-tap\.html$/, handler: pageHandlers.practice },
        { pattern: /^thi-thu\.html$/, handler: pageHandlers.mockExam },
        { pattern: /^bang-xep-hang\.html$/, handler: pageHandlers.ranking },
        { pattern: /^tai-khoan\.html$/, handler: pageHandlers.profile },
        { pattern: /^mua-goi\.html$/, handler: pageHandlers.packages },
        { pattern: /^thanh-toan\.html$/, handler: pageHandlers.payment },
        { pattern: /^lich-su\.html$/, handler: pageHandlers.history },
        { pattern: /^register\.html$/, handler: pageHandlers.register },
        { pattern: /^lop-[1-5]\.html$/, handler: (params) => {
            const classId = path.match(/lop-([1-5])/)?.[1];
            if (classId) loadClassPage(parseInt(classId));
        }},
        { pattern: /^(toan|van|anh)-[1-5]\.html$/, handler: (params) => {
            const match = path.match(/^(toan|van|anh)-([1-5])/);
            if (match) loadSubjectPage(match[1], parseInt(match[2]));
        }}
    ];
    
    for (const route of routes) {
        if (route.pattern.test(path)) {
            route.handler({ query: queryParams });
            break;
        }
    }
}

// ============================================
// PHẦN 11: UI UPDATE FUNCTIONS
// ============================================

function updateUserInterface() {
    if (!appState.currentUser) return;
    
    const user = appState.currentUser;
    
    // Update user name elements
    document.querySelectorAll('.user-name, #userName, #userNameDisplay, #welcomeName, #profileName')
        .forEach(el => { if (el) el.textContent = user.name; });
    
    // Update avatar elements
    document.querySelectorAll('.avatar, #userAvatar')
        .forEach(el => { if (el) el.textContent = user.name.charAt(0); });
    
    // Update package info
    const packageEl = document.getElementById('currentPackage');
    if (packageEl) {
        const packageNames = { basic: 'Gói Cơ bản', pro: 'Gói Pro', vip: 'Gói VIP', none: 'Chưa có gói' };
        packageEl.textContent = packageNames[user.package] || 'Gói Cơ bản';
    }
    
    const expireEl = document.getElementById('packageExpire');
    if (expireEl && user.packageExpire) {
        expireEl.textContent = window.formatDate?.(user.packageExpire) || user.packageExpire;
    }
    
    // Update points and rank
    const pointsEl = document.getElementById('userPoints');
    if (pointsEl) pointsEl.textContent = window.formatNumber?.(user.points) || user.points;
    
    const rankEl = document.getElementById('userRank');
    if (rankEl) rankEl.textContent = `#${user.rank || '--'}`;
}

function loadDashboardStats() {
    if (!appState.currentUser) return;
    
    const history = window.studyHistory || [];
    const userHistory = history.filter(h => h.status === 'completed');
    
    // Update stat cards
    const totalExercises = document.getElementById('totalExercises');
    if (totalExercises) totalExercises.textContent = userHistory.length || '156';
    
    const completedExercises = document.getElementById('completedExercises');
    if (completedExercises) completedExercises.textContent = userHistory.length || '98';
    
    const avgScore = document.getElementById('avgScore');
    if (avgScore) {
        const avg = userHistory.length > 0 
            ? Math.round(userHistory.reduce((s, h) => s + h.score, 0) / userHistory.length)
            : 85;
        avgScore.textContent = avg + '%';
    }
    
    const studyTime = document.getElementById('studyTime');
    if (studyTime) {
        const totalTime = userHistory.reduce((s, h) => s + (h.timeSpent || 0), 0);
        studyTime.textContent = window.formatTime?.(totalTime) || totalTime + ' phút';
    }
}

function loadRecentActivities() {
    const container = document.getElementById('recentActivities');
    if (!container) return;
    
    const history = window.studyHistory || [];
    const recent = history.slice(0, 5);
    
    if (recent.length === 0) {
        container.innerHTML = '<li class="empty-activity">Chưa có hoạt động nào</li>';
        return;
    }
    
    container.innerHTML = recent.map(item => `
        <li>
            <i class="fas ${item.status === 'completed' ? 'fa-check-circle' : 'fa-clock'}"></i>
            <div>
                <strong>${item.exercise}</strong>
                <p>${item.subjectName || item.subject} - ${item.score ? `Đạt ${item.score}%` : 'Chưa hoàn thành'}</p>
                <small>${window.formatDate?.(item.date) || item.date}</small>
            </div>
        </li>
    `).join('');
}

function loadRecommendations() {
    const container = document.querySelector('.recommended-exams');
    if (!container || !appState.currentUser) return;
    
    const recommendations = aiAssistant.getRecommendations(appState.currentUser.id);
    
    if (recommendations.length === 0) {
        container.innerHTML = '<p class="no-data">Không có gợi ý</p>';
        return;
    }
    
    container.innerHTML = recommendations.map(rec => `
        <div class="exam-item" onclick="location.href='${rec.type === 'exam' ? 'thi.html' : 'bai-tap.html'}?id=${rec.id}'">
            <h4>${rec.title}</h4>
            <p>${rec.reason}</p>
            <span class="tag">${rec.priority === 'high' ? '⭐ Đề xuất' : '📌 Gợi ý'}</span>
        </div>
    `).join('');
}

// ============================================
// PHẦN 12: AUTHENTICATION FUNCTIONS
// ============================================

function setupLoginForm() {
    const loginForm = document.querySelector('.login-panel');
    if (!loginForm) return;
    
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.btn-login');
    
    if (loginBtn) {
        loginBtn.onclick = handleLogin;
    }
    
    // Enter to submit
    [usernameInput, passwordInput].forEach(input => {
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleLogin();
            });
        }
    });
    
    // Demo account hint
    setTimeout(() => {
        const demoHint = document.createElement('div');
        demoHint.style.cssText = `
            margin-top: 15px;
            padding: 10px;
            background: #f0f7ff;
            border-radius: 5px;
            font-size: 13px;
            color: #0088cc;
            text-align: center;
            cursor: pointer;
        `;
        demoHint.innerHTML = '🔑 <strong>Tài khoản demo:</strong> hocsinh1 / 123456<br><small>Click để tự động điền</small>';
        demoHint.onclick = () => {
            document.getElementById('username').value = 'hocsinh1';
            document.getElementById('password').value = '123456';
        };
        loginForm.appendChild(demoHint);
    }, 500);
}

function handleLogin() {
    const username = document.getElementById('username')?.value.trim();
    const password = document.getElementById('password')?.value.trim();
    const rememberMe = document.querySelector('.checkbox input')?.checked || false;
    
    if (!username || !password) {
        showNotification('Vui lòng nhập đầy đủ thông tin!', 'error');
        return;
    }
    
    ui.showLoading('Đang đăng nhập...');
    
    // Simulate API call
    setTimeout(() => {
        const user = window.fakeUsers?.find(u => u.username === username && u.password === password);
        
        ui.hideLoading();
        
        if (user) {
            appState.currentUser = {
                ...user,
                rememberMe,
                lastLogin: new Date().toISOString()
            };
            
            appState.saveUserState();
            
            analytics.trackEvent('auth', 'login_success', username);
            showNotification(`Đăng nhập thành công! Chào mừng ${user.name}`, 'success');
            
            // Initialize AI
            aiAssistant.initialize(user.id);
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            analytics.trackEvent('auth', 'login_failed', username);
            showNotification('Sai tên đăng nhập hoặc mật khẩu!', 'error');
        }
    }, 800);
}

function handleLogout() {
    analytics.trackEvent('auth', 'logout');
    appState.logout();
}

function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;
    
    // Setup validation
    const rules = {
        fullname: { required: true, minLength: 3 },
        email: { required: true, email: true },
        password: { required: true, strongPassword: true },
        confirmPassword: { required: true, match: () => document.getElementById('password')?.value }
    };
    
    validator.validateOnInput(registerForm, rules);
    
    registerForm.onsubmit = (e) => {
        e.preventDefault();
        handleRegister();
    };
}

function handleRegister() {
    const fullname = document.getElementById('fullname')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    const className = document.getElementById('class')?.value;
    
    if (password !== confirmPassword) {
        showNotification('Mật khẩu không khớp!', 'error');
        return;
    }
    
    ui.showLoading('Đang đăng ký...');
    
    setTimeout(() => {
        ui.hideLoading();
        
        analytics.trackEvent('auth', 'register', email);
        showNotification('Đăng ký thành công! Vui lòng đăng nhập.', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1000);
}

// ============================================
// PHẦN 13: EXERCISE FUNCTIONS
// ============================================

function renderExerciseInterface(exercise) {
    const container = document.querySelector('.main-content .container');
    if (!container) return;
    
    const totalQuestions = appState.currentQuestions.length;
    
    container.innerHTML = `
        <h2>${exercise.title}</h2>
        <div class="exercise-header">
            <div class="timer">
                <i class="far fa-clock"></i> Thời gian: <span id="timeDisplay">${formatTimeDisplay(exercise.time * 60)}</span>
            </div>
            <div class="exercise-progress">
                <span id="progressText">0/${totalQuestions}</span> câu đã làm
            </div>
        </div>
        <div class="question-nav" id="questionNav"></div>
        <div class="question-container" id="questionContainer"></div>
    `;
    
    renderQuestionNav();
    renderQuestion();
    
    // Start timer if not started
    startExerciseTimer(exercise.time * 60);
}

let exerciseTimer = null;
let exerciseTimeLeft = 0;

function startExerciseTimer(duration) {
    exerciseTimeLeft = duration;
    
    if (exerciseTimer) clearInterval(exerciseTimer);
    
    exerciseTimer = setInterval(() => {
        exerciseTimeLeft--;
        
        const timeDisplay = document.getElementById('timeDisplay');
        if (timeDisplay) {
            timeDisplay.textContent = formatTimeDisplay(exerciseTimeLeft);
        }
        
        if (exerciseTimeLeft <= 0) {
            clearInterval(exerciseTimer);
            submitExercise();
        }
    }, 1000);
}

function formatTimeDisplay(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function renderQuestionNav() {
    const nav = document.getElementById('questionNav');
    if (!nav) return;
    
    const total = appState.currentQuestions.length;
    let html = '';
    
    for (let i = 0; i < total; i++) {
        const isAnswered = appState.currentAnswers[i] !== null;
        const isActive = i === appState.currentQuestionIndex;
        
        html += `
            <button class="q-nav-btn ${isActive ? 'active' : ''} ${isAnswered ? 'answered' : ''}"
                    onclick="goToQuestion(${i})">
                ${i + 1}
            </button>
        `;
    }
    
    nav.innerHTML = html;
    
    // Update progress text
    const progressText = document.getElementById('progressText');
    if (progressText) {
        const answered = appState.currentAnswers.filter(a => a !== null).length;
        progressText.textContent = `${answered}/${total}`;
    }
}

function renderQuestion() {
    const container = document.getElementById('questionContainer');
    if (!container) return;
    
    const q = appState.currentQuestions[appState.currentQuestionIndex];
    if (!q) return;
    
    const isLast = appState.currentQuestionIndex === appState.currentQuestions.length - 1;
    const currentAnswer = appState.currentAnswers[appState.currentQuestionIndex];
    
    let html = `
        <h3>Câu ${appState.currentQuestionIndex + 1}/${appState.currentQuestions.length}</h3>
        <p class="question-text">${q.question}</p>
        <div class="options">
    `;
    
    q.options.forEach((opt, index) => {
        const checked = currentAnswer === index ? 'checked' : '';
        html += `
            <label class="option">
                <input type="radio" name="q${appState.currentQuestionIndex}" 
                       value="${index}" ${checked} onchange="saveAnswer(${appState.currentQuestionIndex}, ${index})">
                ${opt}
            </label>
        `;
    });
    
    html += `</div>`;
    
    html += `<div class="question-nav-buttons">`;
    
    if (appState.currentQuestionIndex > 0) {
        html += `<button class="btn-prev" onclick="prevQuestion()">← Câu trước</button>`;
    } else {
        html += `<button class="btn-prev" disabled>← Câu trước</button>`;
    }
    
    if (isLast) {
        html += `<button class="btn-submit" onclick="submitExercise()">Nộp bài ✓</button>`;
    } else {
        html += `<button class="btn-next" onclick="nextQuestion()">Câu tiếp →</button>`;
    }
    
    html += `</div>`;
    
    container.innerHTML = html;
}

function saveAnswer(questionIndex, answerIndex) {
    appState.currentAnswers[questionIndex] = answerIndex;
    renderQuestionNav();
    
    if (appState.settings.autoNext && questionIndex < appState.currentQuestions.length - 1) {
        setTimeout(() => nextQuestion(), 300);
    }
}

function goToQuestion(index) {
    if (index >= 0 && index < appState.currentQuestions.length) {
        appState.currentQuestionIndex = index;
        renderQuestion();
        renderQuestionNav();
    }
}

function nextQuestion() {
    if (appState.currentQuestionIndex < appState.currentQuestions.length - 1) {
        appState.currentQuestionIndex++;
        renderQuestion();
        renderQuestionNav();
    }
}

function prevQuestion() {
    if (appState.currentQuestionIndex > 0) {
        appState.currentQuestionIndex--;
        renderQuestion();
        renderQuestionNav();
    }
}

function submitExercise() {
    if (exerciseTimer) {
        clearInterval(exerciseTimer);
    }
    
    const unanswered = appState.currentAnswers.filter(a => a === null).length;
    
    if (unanswered > 0) {
        ui.confirm({
            title: 'Xác nhận nộp bài',
            message: `Bạn còn ${unanswered} câu chưa trả lời. Vẫn nộp bài?`
        }).then(confirmed => {
            if (confirmed) {
                processExerciseSubmission();
            }
        });
    } else {
        processExerciseSubmission();
    }
}

function processExerciseSubmission() {
    let correct = 0;
    appState.currentQuestions.forEach((q, index) => {
        if (appState.currentAnswers[index] === q.answer) correct++;
    });
    
    const score = Math.round((correct / appState.currentQuestions.length) * 100);
    
    // Save to history
    const exercise = window.getExerciseById?.(appState.currentExercise);
    
    const result = {
        exerciseId: appState.currentExercise,
        exercise: exercise?.title || 'Bài tập',
        subject: exercise?.subject || 'toan',
        subjectName: exercise?.subjectName || 'Toán',
        class: exercise?.class || 5,
        score,
        correct,
        total: appState.currentQuestions.length,
        timeSpent: Math.round((exercise?.time * 60 - exerciseTimeLeft) / 60),
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
        answers: [...appState.currentAnswers]
    };
    
    // Save to study history
    let history = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.STUDY_HISTORY) || '[]');
    history.push(result);
    localStorage.setItem(CONFIG.STORAGE_KEYS.STUDY_HISTORY, JSON.stringify(history));
    
    // Track analytics
    analytics.trackExerciseComplete(appState.currentExercise, result);
    
    // Clear progress
    appState.clearProgress();
    appState.currentExercise = null;
    appState.currentQuestions = [];
    appState.currentAnswers = [];
    
    // Redirect to result
    window.location.href = `ket-qua.html?score=${score}&correct=${correct}&total=${appState.currentQuestions.length}`;
}

// ============================================
// PHẦN 14: EXAM FUNCTIONS
// ============================================

function renderExamDetail(exam) {
    const container = document.querySelector('.main-content .container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="exam-detail-container">
            <div class="exam-detail-header">
                <h1>${exam.name}</h1>
                <div class="exam-meta-info">
                    <span class="exam-badge ${exam.subject}">${exam.subjectName}</span>
                    <span class="exam-badge">Lớp ${exam.class}</span>
                </div>
            </div>
            
            <div class="exam-info-grid">
                <div class="exam-info-card">
                    <i class="fas fa-question-circle"></i>
                    <div>
                        <span class="info-label">Số câu hỏi</span>
                        <span class="info-value">${exam.questions} câu</span>
                    </div>
                </div>
                <div class="exam-info-card">
                    <i class="far fa-clock"></i>
                    <div>
                        <span class="info-label">Thời gian</span>
                        <span class="info-value">${exam.time} phút</span>
                    </div>
                </div>
                <div class="exam-info-card">
                    <i class="fas fa-users"></i>
                    <div>
                        <span class="info-label">Lượt làm</span>
                        <span class="info-value">${window.formatNumber?.(exam.attempts) || exam.attempts} lượt</span>
                    </div>
                </div>
                <div class="exam-info-card">
                    <i class="fas fa-star"></i>
                    <div>
                        <span class="info-label">Đánh giá</span>
                        <span class="info-value">⭐ ${exam.rating}/5</span>
                    </div>
                </div>
            </div>
            
            <div class="exam-description">
                <h3>Mô tả đề thi</h3>
                <p>${exam.description}</p>
            </div>
            
            <div class="exam-start-section">
                <button class="btn-start-exam" onclick="startExam(${exam.id})">
                    <i class="fas fa-play"></i> Bắt đầu làm bài
                </button>
                <p class="exam-note">Thời gian sẽ được tính từ khi bạn bắt đầu làm bài.</p>
            </div>
        </div>
    `;
}

function startExam(examId) {
    const exam = window.exams?.find(e => e.id == examId);
    if (!exam) return;
    
    // Generate questions for exam
    const questions = generateExamQuestions(exam);
    
    const examData = {
        exam,
        questions,
        startTime: Date.now()
    };
    
    sessionStorage.setItem('current_exam', JSON.stringify(examData));
    window.location.href = 'lam-bai-thi.html';
}

function generateExamQuestions(exam) {
    // Get questions from bank
    const allQuestions = [];
    
    // Combine questions from relevant exercises
    const exercises = Object.values(window.exercises || {}).filter(ex => 
        ex.subject === exam.subject && ex.class === exam.class
    );
    
    exercises.forEach(ex => {
        const questions = window.questions?.[ex.id] || [];
        allQuestions.push(...questions);
    });
    
    // Shuffle and limit
    return shuffleArray(allQuestions).slice(0, exam.questions);
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function renderExamInterface() {
    const container = document.querySelector('.main-content .container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="exam-header">
            <h2 id="examTitle">${appState.currentExam.name}</h2>
            <div class="exam-info-bar">
                <span class="exam-subject">${appState.currentExam.subjectName} - Lớp ${appState.currentExam.class}</span>
                <div class="timer" id="examTimer">
                    <i class="far fa-clock"></i> 
                    <span id="timeDisplay">${formatTimeDisplay(appState.examTimeLeft)}</span>
                </div>
            </div>
        </div>
        
        <div class="question-nav" id="questionNav"></div>
        <div class="question-container" id="questionContainer"></div>
        
        <div class="exam-actions">
            <button class="btn-mark" id="markBtn" onclick="toggleMarkQuestion()">
                <i class="far fa-flag"></i> Đánh dấu câu hỏi
            </button>
            <button class="btn-submit-exam" onclick="submitExam()">
                <i class="fas fa-check-circle"></i> Nộp bài
            </button>
        </div>
    `;
    
    renderExamQuestionNav();
    renderExamQuestion();
}

function startExamTimer() {
    if (appState.examTimer) clearInterval(appState.examTimer);
    
    appState.examTimer = setInterval(() => {
        appState.examTimeLeft--;
        
        const timeDisplay = document.getElementById('timeDisplay');
        const timerEl = document.getElementById('examTimer');
        
        if (timeDisplay) {
            timeDisplay.textContent = formatTimeDisplay(appState.examTimeLeft);
        }
        
        // Warning at 5 minutes
        if (appState.examTimeLeft === 300) {
            showNotification('Chỉ còn 5 phút! Hãy nhanh lên!', 'warning');
            if (timerEl) timerEl.classList.add('warning');
        }
        
        if (appState.examTimeLeft <= 0) {
            clearInterval(appState.examTimer);
            submitExam(true);
        }
    }, 1000);
}

function renderExamQuestionNav() {
    const nav = document.getElementById('questionNav');
    if (!nav) return;
    
    const total = appState.currentQuestions.length;
    let html = '';
    
    for (let i = 0; i < total; i++) {
        const isAnswered = appState.currentAnswers[i] !== null;
        const isActive = i === appState.currentQuestionIndex;
        
        html += `
            <button class="q-nav-btn ${isActive ? 'active' : ''} ${isAnswered ? 'answered' : ''}"
                    onclick="goToExamQuestion(${i})">
                ${i + 1}
            </button>
        `;
    }
    
    nav.innerHTML = html;
}

function renderExamQuestion() {
    const container = document.getElementById('questionContainer');
    if (!container) return;
    
    const q = appState.currentQuestions[appState.currentQuestionIndex];
    if (!q) return;
    
    const currentAnswer = appState.currentAnswers[appState.currentQuestionIndex];
    const isLast = appState.currentQuestionIndex === appState.currentQuestions.length - 1;
    
    let html = `
        <h3>Câu ${appState.currentQuestionIndex + 1}/${appState.currentQuestions.length}</h3>
        <p class="question-text">${q.question}</p>
        <div class="options">
    `;
    
    q.options.forEach((opt, index) => {
        const checked = currentAnswer === index ? 'checked' : '';
        html += `
            <label class="option">
                <input type="radio" name="q${appState.currentQuestionIndex}" 
                       value="${index}" ${checked} onchange="saveExamAnswer(${appState.currentQuestionIndex}, ${index})">
                ${opt}
            </label>
        `;
    });
    
    html += `</div>`;
    
    html += `<div class="question-nav-buttons">`;
    
    if (appState.currentQuestionIndex > 0) {
        html += `<button class="btn-prev" onclick="prevExamQuestion()">← Câu trước</button>`;
    } else {
        html += `<button class="btn-prev" disabled>← Câu trước</button>`;
    }
    
    if (!isLast) {
        html += `<button class="btn-next" onclick="nextExamQuestion()">Câu tiếp →</button>`;
    }
    
    html += `</div>`;
    
    container.innerHTML = html;
}

function saveExamAnswer(questionIndex, answerIndex) {
    appState.currentAnswers[questionIndex] = answerIndex;
    renderExamQuestionNav();
}

function goToExamQuestion(index) {
    if (index >= 0 && index < appState.currentQuestions.length) {
        appState.currentQuestionIndex = index;
        renderExamQuestion();
        renderExamQuestionNav();
    }
}

function nextExamQuestion() {
    if (appState.currentQuestionIndex < appState.currentQuestions.length - 1) {
        appState.currentQuestionIndex++;
        renderExamQuestion();
        renderExamQuestionNav();
    }
}

function prevExamQuestion() {
    if (appState.currentQuestionIndex > 0) {
        appState.currentQuestionIndex--;
        renderExamQuestion();
        renderExamQuestionNav();
    }
}

function toggleMarkQuestion() {
    const btn = document.getElementById('markBtn');
    if (btn) {
        btn.classList.toggle('marked');
        const isMarked = btn.classList.contains('marked');
        showNotification(isMarked ? 'Đã đánh dấu câu hỏi' : 'Đã bỏ đánh dấu', 'info');
    }
}

function submitExam(timeout = false) {
    if (appState.examTimer) {
        clearInterval(appState.examTimer);
    }
    
    if (timeout) {
        showNotification('Hết giờ làm bài!', 'warning');
        processExamSubmission();
        return;
    }
    
    const unanswered = appState.currentAnswers.filter(a => a === null).length;
    
    ui.confirm({
        title: 'Xác nhận nộp bài',
        message: `Bạn còn ${unanswered} câu chưa trả lời. Vẫn nộp bài?`
    }).then(confirmed => {
        if (confirmed) {
            processExamSubmission();
        } else {
            startExamTimer();
        }
    });
}

function processExamSubmission() {
    let correct = 0;
    appState.currentQuestions.forEach((q, index) => {
        if (appState.currentAnswers[index] === q.answer) correct++;
    });
    
    const score = Math.round((correct / appState.currentQuestions.length) * 100);
    const timeSpent = Math.round((appState.currentExam.time * 60 - appState.examTimeLeft) / 60);
    
    const result = {
        examId: appState.currentExam.id,
        examName: appState.currentExam.name,
        score,
        correct,
        total: appState.currentQuestions.length,
        timeSpent,
        date: new Date().toISOString()
    };
    
    analytics.trackExamComplete(appState.currentExam.id, result);
    
    sessionStorage.removeItem('current_exam');
    window.location.href = `ket-qua-thi.html?score=${score}&correct=${correct}&total=${appState.currentQuestions.length}&exam=${appState.currentExam.id}`;
}

// ============================================
// PHẦN 15: UTILITY FUNCTIONS
// ============================================

function checkAndShowDailyBonus() {
    const lastBonus = localStorage.getItem('last_daily_bonus');
    const today = new Date().toDateString();
    
    if (lastBonus !== today) {
        setTimeout(() => {
            ui.showModal({
                title: '🎁 Quà tặng hàng ngày',
                content: `
                    <div style="text-align: center;">
                        <div style="font-size: 64px; margin-bottom: 20px;">🎁</div>
                        <h3 style="margin-bottom: 10px;">Nhận ${CONFIG.GAME_CONFIG.DAILY_BONUS} điểm thưởng!</h3>
                        <p style="color: #666;">Đăng nhập mỗi ngày để nhận điểm thưởng</p>
                        <p style="margin-top: 15px;">Streak hiện tại: 🔥 ${appState.dailyGoals.streak} ngày</p>
                    </div>
                `,
                buttons: [
                    {
                        text: 'Nhận thưởng',
                        primary: true,
                        onClick: () => {
                            if (appState.currentUser) {
                                appState.currentUser.points = (appState.currentUser.points || 0) + CONFIG.GAME_CONFIG.DAILY_BONUS;
                                appState.saveUserState();
                            }
                            localStorage.setItem('last_daily_bonus', today);
                            showNotification(`+${CONFIG.GAME_CONFIG.DAILY_BONUS} điểm!`, 'success');
                        }
                    }
                ]
            });
        }, 1500);
    }
}

function showSearchModal() {
    ui.prompt({
        title: '🔍 Tìm kiếm',
        message: 'Nhập từ khóa tìm kiếm',
        placeholder: 'Bài tập, khóa học, đề thi...'
    }).then(keyword => {
        if (keyword) {
            ui.showLoading('Đang tìm kiếm...');
            setTimeout(() => {
                ui.hideLoading();
                showNotification(`Tìm kiếm "${keyword}" - Tính năng đang phát triển`, 'info');
            }, 800);
        }
    });
}

function showShortcutsHelp() {
    ui.showModal({
        title: '⌨️ Phím tắt',
        content: `
            <div style="display: grid; gap: 10px;">
                <div style="display: flex; justify-content: space-between;">
                    <span><kbd>Ctrl</kbd> + <kbd>K</kbd></span>
                    <span>Tìm kiếm</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span><kbd>Ctrl</kbd> + <kbd>/</kbd></span>
                    <span>Hiển thị trợ giúp</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span><kbd>Esc</kbd></span>
                    <span>Đóng hộp thoại</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span><kbd>←</kbd> / <kbd>→</kbd></span>
                    <span>Chuyển câu hỏi</span>
                </div>
            </div>
        `,
        size: 'small',
        buttons: [{ text: 'Đóng', primary: true }]
    });
}

function checkForUpdates() {
    // Check for app updates
    const lastVersion = localStorage.getItem('app_version');
    if (lastVersion !== CONFIG.VERSION) {
        localStorage.setItem('app_version', CONFIG.VERSION);
        setTimeout(() => {
            showNotification(`Đã cập nhật lên phiên bản ${CONFIG.VERSION}!`, 'success');
        }, 2000);
    }
}

function preloadData() {
    // Preload common data
    setTimeout(() => {
        // Preload courses
        if (window.courses) {
            console.log('📚 Preloaded courses:', window.courses.length);
        }
        // Preload exercises
        if (window.exercises) {
            console.log('📝 Preloaded exercises:', Object.keys(window.exercises).length);
        }
    }, 100);
}

// ============================================
// PHẦN 16: EXPORT TO WINDOW
// ============================================

// Auth functions
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.handleRegister = handleRegister;

// Exercise functions
window.saveAnswer = saveAnswer;
window.goToQuestion = goToQuestion;
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.submitExercise = submitExercise;

// Exam functions
window.startExam = startExam;
window.saveExamAnswer = saveExamAnswer;
window.goToExamQuestion = goToExamQuestion;
window.nextExamQuestion = nextExamQuestion;
window.prevExamQuestion = prevExamQuestion;
window.toggleMarkQuestion = toggleMarkQuestion;
window.submitExam = submitExam;

// Utility functions
window.showNotification = showNotification;
window.formatCurrency = (amount) => amount?.toLocaleString('vi-VN') + 'đ';
window.formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
};

// AI functions
window.getRecommendations = () => {
    if (appState.currentUser) {
        return aiAssistant.getRecommendations(appState.currentUser.id);
    }
    return [];
};

// Analytics functions
window.getPerformanceReport = (period) => {
    if (appState.currentUser) {
        return analytics.getPerformanceReport(appState.currentUser.id, period);
    }
    return null;
};

// ============================================
// PHẦN 17: PAGE LOAD HANDLERS
// ============================================

function loadClassPage(classId) {
    const container = document.querySelector('.main-content .container');
    if (!container) return;
    
    const courses = window.courses?.filter(c => c.class === classId) || [];
    
    container.innerHTML = `
        <h2>Lớp ${classId}</h2>
        <div class="subject-grid">
            <div class="subject-card" onclick="location.href='toan-${classId}.html'">
                <i class="fas fa-calculator"></i>
                <h3>Toán</h3>
                <p>${courses.filter(c => c.subject === 'toan')[0]?.lessons || '--'} bài học</p>
            </div>
            <div class="subject-card" onclick="location.href='van-${classId}.html'">
                <i class="fas fa-book"></i>
                <h3>Tiếng Việt</h3>
                <p>${courses.filter(c => c.subject === 'van')[0]?.lessons || '--'} bài học</p>
            </div>
            <div class="subject-card" onclick="location.href='anh-${classId}.html'">
                <i class="fas fa-language"></i>
                <h3>Tiếng Anh</h3>
                <p>${courses.filter(c => c.subject === 'anh')[0]?.lessons || '--'} bài học</p>
            </div>
        </div>
    `;
}

function loadSubjectPage(subject, classId) {
    const container = document.querySelector('.main-content .container');
    if (!container) return;
    
    const exercises = Object.values(window.exercises || {}).filter(ex => 
        ex.subject === subject && ex.class === classId
    );
    
    const subjectNames = { toan: 'Toán', van: 'Tiếng Việt', anh: 'Tiếng Anh' };
    
    container.innerHTML = `
        <h2>${subjectNames[subject]} lớp ${classId}</h2>
        <div class="exercise-list">
            ${exercises.map(ex => `
                <div class="exercise-item" onclick="location.href='bai-tap.html?id=${ex.id}'">
                    <div>
                        <h4>${ex.title}</h4>
                        <p>${ex.questions} câu hỏi - ${ex.time} phút</p>
                    </div>
                    <span class="status ${ex.completed ? 'completed' : 'pending'}">
                        ${ex.completed ? 'Đã hoàn thành' : 'Chưa làm'}
                    </span>
                </div>
            `).join('')}
        </div>
    `;
}

function loadCoursesList() {
    const container = document.getElementById('coursesList');
    if (!container) return;
    
    const courses = window.courses || [];
    
    container.innerHTML = courses.map(course => `
        <div class="course-card" onclick="location.href='${course.subject}-${course.class}.html'">
            <div class="course-image">${course.image || '📚'}</div>
            <h3>${course.name}</h3>
            <p class="course-teacher">${course.teacher}</p>
            <div class="course-meta">
                <span><i class="fas fa-video"></i> ${course.lessons} bài</span>
                <span><i class="fas fa-users"></i> ${window.formatNumber?.(course.students) || course.students}</span>
            </div>
            <div class="course-price">${window.formatCurrency?.(course.price) || course.price}</div>
            <button class="btn-buy" onclick="event.stopPropagation(); location.href='mua-goi.html'">
                Đăng ký
            </button>
        </div>
    `).join('');
}

function loadExercisesList() {
    const container = document.getElementById('exercisesList');
    if (!container) return;
    
    const exercises = Object.values(window.exercises || {});
    
    container.innerHTML = exercises.map(ex => `
        <div class="exercise-card" onclick="location.href='bai-tap.html?id=${ex.id}'">
            <div class="exercise-header">
                <h3>${ex.title}</h3>
                <span class="subject-badge ${ex.subject}">${ex.subjectName} ${ex.class}</span>
            </div>
            <p>${ex.questions} câu - ${ex.time} phút</p>
            <div class="progress-bar">
                <div class="progress" style="width: ${ex.completed ? 100 : 0}%"></div>
            </div>
            <span class="status ${ex.completed ? 'completed' : 'pending'}">
                ${ex.completed ? 'Đã hoàn thành' : 'Chưa làm'}
            </span>
        </div>
    `).join('');
}

function loadExamsList() {
    const container = document.getElementById('examsList');
    if (!container) return;
    
    const exams = window.exams || [];
    
    container.innerHTML = exams.map(exam => `
        <div class="exam-item" onclick="location.href='thi.html?id=${exam.id}'">
            <div class="exam-info">
                <h4>${exam.name}</h4>
                <p><i class="far fa-clock"></i> ${exam.time} phút - ${exam.questions} câu</p>
                <p class="exam-meta">${window.formatNumber?.(exam.attempts) || exam.attempts} lượt làm</p>
            </div>
            <span class="exam-tag">⭐ ${exam.rating}</span>
        </div>
    `).join('');
}

function loadRankingPage() {
    const container = document.querySelector('.ranking-table tbody');
    if (!container) return;
    
    const rankings = window.rankings?.week || [];
    
    container.innerHTML = rankings.map((item, index) => `
        <tr class="${appState.currentUser?.name === item.name ? 'current-user' : ''}">
            <td>${item.rank}</td>
            <td>
                <div class="rank-user">
                    <span class="rank-avatar">${item.avatar}</span>
                    ${item.name}
                </div>
            </td>
            <td>${item.class}</td>
            <td>${window.formatNumber?.(item.points) || item.points}</td>
            <td>${item.school || 'TH Kim Đồng'}</td>
        </tr>
    `).join('');
}

function loadProfilePage() {
    if (!appState.currentUser) return;
    
    const user = appState.currentUser;
    
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const className = document.getElementById('class');
    const school = document.getElementById('school');
    
    if (fullName) fullName.value = user.name;
    if (email) email.value = user.email;
    if (phone) phone.value = user.phone || '';
    if (className) className.value = user.class?.replace('A', '') || '5';
    if (school) school.value = user.school || '';
}

function loadPackagesPage() {
    // Already handled by HTML
}

function loadPaymentPage() {
    const pkg = JSON.parse(sessionStorage.getItem(CONFIG.STORAGE_KEYS.PACKAGE));
    if (pkg) {
        const packageName = document.getElementById('packageName');
        const packagePrice = document.getElementById('packagePrice');
        const totalPrice = document.getElementById('totalPrice');
        
        if (packageName) packageName.textContent = pkg.name;
        if (packagePrice) packagePrice.textContent = window.formatCurrency?.(pkg.price) || pkg.price + 'đ';
        if (totalPrice) totalPrice.textContent = window.formatCurrency?.(pkg.price) || pkg.price + 'đ';
    }
}

function loadHistoryPage() {
    const container = document.getElementById('historyList');
    if (!container) return;
    
    const history = window.studyHistory || [];
    
    if (history.length === 0) {
        container.innerHTML = '<tr><td colspan="6" class="no-data">Chưa có lịch sử học tập</td></tr>';
        return;
    }
    
    container.innerHTML = history.map(item => `
        <tr>
            <td>${window.formatDate?.(item.date) || item.date}</td>
            <td>${item.exercise}</td>
            <td>${item.subjectName || item.subject}</td>
            <td>${item.class}</td>
            <td>${item.score || 0}%</td>
            <td>${item.timeSpent || '--'} phút</td>
        </tr>
    `).join('');
}

function renderResultPage({ score, correct, total }) {
    const container = document.querySelector('.result-container');
    if (!container) return;
    
    const scoreNum = parseInt(score) || 0;
    const correctNum = parseInt(correct) || 0;
    const totalNum = parseInt(total) || 5;
    
    const scoreCircle = container.querySelector('.score-number');
    const correctCount = container.querySelector('#correctCount');
    const wrongCount = container.querySelector('#wrongCount');
    
    if (scoreCircle) scoreCircle.textContent = scoreNum;
    if (correctCount) correctCount.textContent = correctNum;
    if (wrongCount) {
        const wrongEl = wrongCount.closest('.result-stat')?.querySelector('strong');
        if (wrongEl) wrongEl.textContent = totalNum - correctNum;
    }
}

function renderExamResultPage(data) {
    const container = document.querySelector('.result-container');
    if (!container) return;
    
    const score = data.score || '0';
    const correct = data.correct || '0';
    const total = data.total || '0';
    
    const scoreDisplay = document.getElementById('scoreDisplay');
    const correctCount = document.getElementById('correctCount');
    const totalQuestions = document.getElementById('totalQuestions');
    const wrongCount = document.getElementById('wrongCount');
    
    if (scoreDisplay) scoreDisplay.textContent = score;
    if (correctCount) correctCount.textContent = correct;
    if (totalQuestions) totalQuestions.textContent = total;
    if (wrongCount) wrongCount.textContent = total - correct;
}

// ============================================
// PHẦN 18: INITIALIZE ON DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (appState.currentExercise || appState.currentExam) {
        appState.saveProgress();
    }
});

console.log('%c✅ SCRIPT.JS SIÊU THÔNG MINH V5.0 LOADED!', 'color: #00b14f; font-size: 18px; font-weight: bold;');
console.log('%c🔥 TEAM C00LKIDD - VIODU PLATFORM', 'color: #0088cc; font-size: 14px;');
console.log('%c💡 Tip: Nhấn Ctrl+K để tìm kiếm nhanh!', 'color: #ffa502; font-size: 12px;');