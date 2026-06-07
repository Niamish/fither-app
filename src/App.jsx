import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Heart,
  Star,
  Trophy,
  Calendar,
  Clock,
  Activity,
  Target,
  TrendingUp,
  Award,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Plus,
  Minus,
  Camera,
  Settings,
  User,
  Home,
  Search,
  MessageCircle,
  Share2,
  BookOpen,
  Volume2,
  Music,
  Zap,
  Flame,
  Droplets,
  Wind,
  Sun,
  Moon,
  Bell,
  Shield,
  Award as AwardIcon,
  Users,
  BarChart3,
  Check,
  Edit,
} from "lucide-react";

// Main App Component
const DEFAULT_USER_DATA = {
  name: "Ava",
  email: "ava.fitness@example.com",
  phone: "+1 (555) 123-4567",
  birthday: "March 15, 1995",
  height: 165,
  startWeight: 75,
  currentWeight: 70.5,
  goalWeight: 65,
  streak: 7,
  totalWorkouts: 127,
  notifications: 3,
};

export default function FitnessApp() {
  const [activeView, setActiveView] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  const [userData, setUserData] = useState(() => {
    try {
      const saved = localStorage.getItem("fither-user-data");
      return saved ? JSON.parse(saved) : DEFAULT_USER_DATA;
    } catch {
      return DEFAULT_USER_DATA;
    }
  });

  useEffect(() => {
    localStorage.setItem("fither-user-data", JSON.stringify(userData));
  }, [userData]);
  // Add parallax effect to orbs
  useEffect(() => {
    const handleMouseMove = (e) => {
      const orbs = document.querySelectorAll(".orb");
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 50;
        const xPos = (x - 0.5) * speed;
        const yPos = (y - 0.5) * speed;
        orb.style.transform = `translate(${xPos}px, ${yPos}px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="app-container">
      <AnimatedBackground />
      <Navigation
        setActiveView={setActiveView}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        userData={userData}
      />
      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setActiveView={setActiveView}
      />

      <div className="main-content">
        {activeView === "dashboard" && (
          <Dashboard userData={userData} setUserData={setUserData} />
        )}
        {activeView === "workouts" && (
          <WorkoutsSection userData={userData} setUserData={setUserData} />
        )}
        {activeView === "nutrition" && (
          <NutritionSection userData={userData} setUserData={setUserData} />
        )}
        {activeView === "progress" && (
          <ProgressSection userData={userData} setUserData={setUserData} />
        )}
        {activeView === "community" && <CommunitySection userData={userData} />}
        {activeView === "profile" && (
          <ProfileSection userData={userData} setUserData={setUserData} />
        )}
      </div>

      <BottomTabBar activeView={activeView} setActiveView={setActiveView} />

      <style>{`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    background: #050512;
  }

  button,
  input,
  textarea,
  select {
    font-family: inherit;
  }

  .app-container {
    min-height: 100vh;
    color: white;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    overflow-x: hidden;
    position: relative;
  }

  .main-content {
    padding: 96px 22px 116px;
    max-width: 1440px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  ::selection {
    background: rgba(255, 0, 110, 0.55);
    color: white;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.04);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #ff006e, #8338ec);
    border-radius: 999px;
  }

  @media (max-width: 768px) {
    .main-content {
      padding: 82px 14px 110px;
    }
  }
.stat-card,
.today-schedule,
.nutrition-snapshot,
.challenge-card,
.workout-card,
.category-card,
.featured-workout-card,
.workout-tile,
.trainer-card {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 18px 50px rgba(0, 0, 0, 0.22);
}

.stat-card,
.today-schedule,
.nutrition-snapshot,
.challenge-card,
.workout-card,
.category-card,
.workout-tile,
.trainer-card {
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.035)),
    rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.stat-card:hover,
.challenge-card:hover,
.workout-card:hover,
.category-card:hover,
.workout-tile:hover,
.trainer-card:hover {
  border-color: rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 24px 70px rgba(0, 0, 0, 0.34);
    }
    .mobile-menu {
  display: none !important;
}

@media (max-width: 768px) {
  .mobile-menu {
    display: block !important;
    position: fixed;
    top: 78px;
    left: 10px;
    right: 10px;
    background: rgba(8, 8, 18, 0.88);
    backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.14);
    transform: translateY(-140%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.3s ease, opacity 0.3s ease;
    z-index: 999;
    padding: 14px;
    border-radius: 22px;
    box-shadow: 0 18px 55px rgba(0, 0, 0, 0.35);
  }

  .mobile-menu.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
}
      `}</style>
    </div>
  );
}
      
// 1. Animated Background Component
function AnimatedBackground() {
  return (
    <div className="animated-bg" aria-hidden="true">
      <div className="mesh-gradient"></div>
      <div className="aurora aurora-one"></div>
      <div className="aurora aurora-two"></div>
      <div className="aurora aurora-three"></div>

      <div className="orb orb-one"></div>
      <div className="orb orb-two"></div>
      <div className="orb orb-three"></div>
      <div className="orb orb-four"></div>

      <div className="grid-overlay"></div>
      <div className="grain-overlay"></div>
      <div className="vignette-overlay"></div>

      <style>{`
        .animated-bg {
          position: fixed;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          background: #050512;
        }

        .mesh-gradient {
          position: absolute;
          inset: -20%;
          background:
            radial-gradient(circle at 18% 18%, rgba(255, 0, 110, 0.38), transparent 30%),
            radial-gradient(circle at 82% 12%, rgba(6, 255, 165, 0.18), transparent 28%),
            radial-gradient(circle at 50% 55%, rgba(131, 56, 236, 0.32), transparent 35%),
            radial-gradient(circle at 80% 85%, rgba(0, 153, 255, 0.26), transparent 30%),
            linear-gradient(135deg, #050512 0%, #0a0f2f 42%, #120724 100%);
          animation: meshMove 18s ease-in-out infinite alternate;
        }

        @keyframes meshMove {
          0% {
            transform: scale(1) rotate(0deg);
          }
          100% {
            transform: scale(1.08) rotate(2deg);
          }
        }

        .aurora {
          position: absolute;
          width: 70vw;
          height: 28vh;
          border-radius: 999px;
          filter: blur(42px);
          opacity: 0.35;
          mix-blend-mode: screen;
        }

        .aurora-one {
          top: 8%;
          left: -18%;
          background: linear-gradient(90deg, transparent, rgba(255, 0, 110, 0.7), transparent);
        }

        .aurora-two {
          top: 38%;
          right: -24%;
          background: linear-gradient(90deg, transparent, rgba(6, 255, 165, 0.55), transparent);
        }

        .aurora-three {
          bottom: 12%;
          left: 8%;
          background: linear-gradient(90deg, transparent, rgba(131, 56, 236, 0.75), transparent);
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.62;
        }

        .orb-one {
          width: 420px;
          height: 420px;
          top: -120px;
          left: -120px;
          background: radial-gradient(circle, rgba(255, 0, 110, 0.95), rgba(131, 56, 236, 0.1) 70%);
        }

        .orb-two {
          width: 360px;
          height: 360px;
          right: -110px;
          top: 18%;
          background: radial-gradient(circle, rgba(6, 255, 165, 0.8), rgba(0, 153, 255, 0.08) 70%);
        }

        .orb-three {
          width: 460px;
          height: 460px;
          left: 36%;
          bottom: -200px;
          background: radial-gradient(circle, rgba(255, 183, 0, 0.45), rgba(255, 0, 110, 0.05) 72%);
        }

        .orb-four {
          width: 260px;
          height: 260px;
          right: 22%;
          bottom: 24%;
          background: radial-gradient(circle, rgba(131, 56, 236, 0.75), rgba(0, 0, 0, 0) 72%);
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 58px 58px;
          opacity: 0.6;
        }

        .grain-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.18;
          background-image:
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18) 0 1px, transparent 1px),
            radial-gradient(circle at 80% 30%, rgba(255,255,255,0.12) 0 1px, transparent 1px);
          background-size: 180px 180px, 220px 220px;
        }

        .vignette-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.2) 58%, rgba(0, 0, 0, 0.74) 100%);
        }
      `}</style>
    </div>
  );
}
// 2. Navigation Component
function Navigation({ setActiveView, menuOpen, setMenuOpen, userData }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navigation ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-content">
        <Logo onClick={() => setActiveView("dashboard")} />
        <DesktopMenu setActiveView={setActiveView} />
        <UserQuickActions userData={userData} setActiveView={setActiveView} />
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <style>{`
        .navigation {
          position: fixed;
          top: 14px;
          left: 14px;
          right: 14px;
          width: auto;
          z-index: 1000;
          backdrop-filter: blur(26px);
          background: rgba(8, 8, 18, 0.54);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 12px 18px;
          transition: all 0.3s ease;
          border-radius: 24px;
          box-shadow: 0 18px 55px rgba(0, 0, 0, 0.28);
        }

        .navigation.scrolled {
          top: 10px;
          background: rgba(8, 8, 18, 0.78);
          border-color: rgba(255, 255, 255, 0.18);
          box-shadow: 0 20px 70px rgba(0, 0, 0, 0.4);
        }

        .nav-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .navigation {
            top: 10px;
            left: 10px;
            right: 10px;
            padding: 12px 14px;
            border-radius: 20px;
          }

          .mobile-menu-btn {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
}

// 3. Logo Component
function Logo({ onClick }) {
  return (
    <div className="logo" onClick={onClick}>
      <Zap size={28} />
      <span>FitHer</span>
      <style>{`
        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 24px;
          font-weight: 700;
          color: white;
          cursor: pointer;
          text-shadow: 0 0 20px rgba(255, 0, 110, 0.5);
          transition: text-shadow 0.3s ease;
        }
        .logo:hover {
          text-shadow: 0 0 30px rgba(255, 0, 110, 0.8);
        }
      `}</style>
    </div>
  );
}

// 4. Desktop Menu Component
function DesktopMenu({ setActiveView }) {
  return (
    <div className="desktop-menu">
      <MenuItem label="Dashboard" onClick={() => setActiveView("dashboard")} />
      <MenuItem label="Workouts" onClick={() => setActiveView("workouts")} />
      <MenuItem label="Nutrition" onClick={() => setActiveView("nutrition")} />
      <MenuItem label="Progress" onClick={() => setActiveView("progress")} />
      <MenuItem label="Community" onClick={() => setActiveView("community")} />
      <style>{`
        .desktop-menu {
          display: flex;
          gap: 30px;
        }
        @media (max-width: 768px) {
          .desktop-menu {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

// 5. Menu Item Component
function MenuItem({ label, onClick }) {
  return (
    <button className="menu-item" onClick={onClick}>
      {label}
      <style>{`
        .menu-item {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.8);
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          position: relative;
          padding: 5px 0;
          transition: color 0.3s ease;
        }
        .menu-item:hover {
          color: white;
        }
        .menu-item::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff006e, #8338ec);
          transition: width 0.3s ease;
        }
        .menu-item:hover::after {
          width: 100%;
        }
      `}</style>
    </button>
  );
}

// 6. User Quick Actions Component
function UserQuickActions({ userData, setActiveView }) {
  return (
    <div className="quick-actions">
      <NotificationBell notifications={userData.notifications} />
      <StreakCounter streak={userData.streak} />
      <ProfileAvatar onClick={() => setActiveView("profile")} />
      <style>{`
        .quick-actions {
          display: flex;
          gap: 20px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .quick-actions {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

// 7. Notification Bell Component
function NotificationBell({ notifications }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="notification-bell">
      <Bell
        size={20}
        onClick={() => setShowNotifications(!showNotifications)}
      />
      {notifications > 0 && (
        <span className="notification-dot">{notifications}</span>
      )}
      {showNotifications && (
        <div className="notification-dropdown">
          <div className="notification-item">New workout available!</div>
          <div className="notification-item">Sarah liked your post</div>
          <div className="notification-item">Challenge ends tomorrow</div>
        </div>
      )}
      <style>{`
        .notification-bell {
          position: relative;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.8);
          transition: color 0.3s ease;
        }
        .notification-bell:hover {
          color: white;
        }
        .notification-dot {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 18px;
          height: 18px;
          background: #ff006e;
          border-radius: 50%;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
        .notification-dropdown {
          position: absolute;
          top: 30px;
          right: 0;
          width: 250px;
          background: rgba(20, 20, 20, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 10px;
          z-index: 100;
        }
        .notification-item {
          padding: 10px;
          font-size: 14px;
          border-radius: 8px;
          transition: background 0.2s ease;
        }
        .notification-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}

// 8. Streak Counter Component
function StreakCounter({ streak }) {
  return (
    <div className="streak-counter">
      <Flame size={20} />
      <span>{streak}</span>
      <style>{`
        .streak-counter {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          background: rgba(255, 107, 0, 0.2);
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          color: #ff6b00;
        }
      `}</style>
    </div>
  );
}

// 9. Profile Avatar Component
function ProfileAvatar({ onClick }) {
  return (
    <div className="profile-avatar" onClick={onClick}>
      <img
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=FitUser"
        alt="Profile"
      />
      <style>{`
        .profile-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
        }
        .profile-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}

// 10. Mobile Menu Component
function MobileMenu({ menuOpen, setMenuOpen, setActiveView }) {
  return (
    <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
      <div className="menu-items">
        <MobileMenuItem
          icon={<Home />}
          label="Dashboard"
          onClick={() => {
            setActiveView("dashboard");
            setMenuOpen(false);
          }}
        />
        <MobileMenuItem
          icon={<Activity />}
          label="Workouts"
          onClick={() => {
            setActiveView("workouts");
            setMenuOpen(false);
          }}
        />
        <MobileMenuItem
          icon={<BookOpen />}
          label="Nutrition"
          onClick={() => {
            setActiveView("nutrition");
            setMenuOpen(false);
          }}
        />
        <MobileMenuItem
          icon={<TrendingUp />}
          label="Progress"
          onClick={() => {
            setActiveView("progress");
            setMenuOpen(false);
          }}
        />
        <MobileMenuItem
          icon={<MessageCircle />}
          label="Community"
          onClick={() => {
            setActiveView("community");
            setMenuOpen(false);
          }}
        />
      </div>
      <style>{`
        .mobile-menu {
          position: fixed;
          top: 60px;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transform: translateY(-100%);
          transition: transform 0.3s ease;
          z-index: 999;
          padding: 20px;
        }
        .mobile-menu.open {
          transform: translateY(0);
        }
        .menu-items {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      `}</style>
    </div>
  );
}

// 11. Mobile Menu Item Component
function MobileMenuItem({ icon, label, onClick }) {
  return (
    <button className="mobile-menu-item" onClick={onClick}>
      {icon}
      <span>{label}</span>
      <style>{`
        .mobile-menu-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px 20px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .mobile-menu-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
        }
      `}</style>
    </button>
  );
}

// 12. Bottom Tab Bar Component
function BottomTabBar({ activeView, setActiveView }) {
  return (
    <div className="bottom-tab-bar">
      <TabItem
        icon={<Home />}
        label="Home"
        active={activeView === "dashboard"}
        onClick={() => setActiveView("dashboard")}
      />
      <TabItem
        icon={<Activity />}
        label="Workouts"
        active={activeView === "workouts"}
        onClick={() => setActiveView("workouts")}
      />
      <TabItem
        icon={<Target />}
        label="Goals"
        active={activeView === "progress"}
        onClick={() => setActiveView("progress")}
      />
      <TabItem
        icon={<User />}
        label="Profile"
        active={activeView === "profile"}
        onClick={() => setActiveView("profile")}
      />
      <style>{`
        .bottom-tab-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: none;
          padding: 10px 0;
        }
        @media (max-width: 768px) {
          .bottom-tab-bar {
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}

// 13. Tab Item Component
function TabItem({ icon, label, active, onClick }) {
  return (
    <button className={`tab-item ${active ? "active" : ""}`} onClick={onClick}>
      {icon}
      <span>{label}</span>
      <style>{`
        .tab-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          font-size: 11px;
          cursor: pointer;
          padding: 5px 15px;
          transition: color 0.3s ease;
        }
        .tab-item.active {
          color: #ff006e;
        }
        .tab-item span {
          font-weight: 500;
        }
      `}</style>
    </button>
  );
}

// 14. Dashboard Component
function Dashboard({ userData, setUserData }) {
  const [todayStats, setTodayStats] = useState({
    calories: 1850,
    minutes: 45,
    water: 6,
    goalsCompleted: 85,
  });

  return (
    <div className="dashboard">
      <WelcomeHeader name={userData.name} />
      <QuickStats stats={todayStats} />
      <TodaySchedule />
      <RecommendedWorkouts />
      <NutritionSnapshot stats={todayStats} setStats={setTodayStats} />
      <ChallengesWidget />
      <style>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
      `}</style>
    </div>
  );
}

// 15. Welcome Header Component
function WelcomeHeader({ name }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting =
    currentTime.getHours() < 12
      ? "Good Morning"
      : currentTime.getHours() < 18
      ? "Good Afternoon"
      : "Good Evening";

  const formattedDate = currentTime.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="welcome-hero">
      <div className="hero-left">
        <span className="eyebrow">{formattedDate}</span>
        <h1>
          {greeting}, <span>{name}</span>
        </h1>
        <p>
          Your body is not a project. It is your home. Train with clarity,
          eat with care, and keep your momentum alive.
        </p>

        <div className="hero-actions">
          <button className="primary-cta">
            <Play size={18} />
            Start Today’s Workout
          </button>
          <button className="secondary-cta">
            <Calendar size={18} />
            View Plan
          </button>
        </div>
      </div>

      <div className="hero-card">
        <div className="score-ring">
          <span>85%</span>
          <small>Daily Goal</small>
        </div>
        <div className="hero-metrics">
          <div>
            <strong>7</strong>
            <small>Day Streak</small>
          </div>
          <div>
            <strong>45</strong>
            <small>Active Min</small>
          </div>
          <div>
            <strong>1.5L</strong>
            <small>Water</small>
          </div>
        </div>
      </div>

      <style>{`
        .welcome-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.6fr);
          gap: 24px;
          align-items: stretch;
          padding: 32px;
          border-radius: 28px;
          background:
            radial-gradient(circle at top left, rgba(255, 0, 110, 0.25), transparent 35%),
            radial-gradient(circle at bottom right, rgba(6, 255, 165, 0.16), transparent 30%),
            rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(24px);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          position: relative;
        }

        .welcome-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
              rgba(255, 255, 255, 0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.035) 1px,
              transparent 1px
            );
          background-size: 42px 42px;
          pointer-events: none;
          mask-image: linear-gradient(to bottom, black, transparent);
        }

        .hero-left,
        .hero-card {
          position: relative;
          z-index: 1;
        }

        .eyebrow {
          display: inline-flex;
          margin-bottom: 14px;
          padding: 7px 12px;
          border-radius: 999px;
          color: #06ffa5;
          background: rgba(6, 255, 165, 0.1);
          border: 1px solid rgba(6, 255, 165, 0.2);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.2px;
        }

        .hero-left h1 {
          font-size: clamp(34px, 6vw, 68px);
          line-height: 0.95;
          letter-spacing: -3px;
          margin: 0 0 18px;
          color: white;
        }

        .hero-left h1 span {
          background: linear-gradient(135deg, #ff006e, #ffb700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-left p {
          max-width: 680px;
          font-size: 18px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.72);
          margin: 0 0 26px;
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .primary-cta,
        .secondary-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border: none;
          border-radius: 999px;
          padding: 14px 20px;
          font-size: 15px;
          font-weight: 800;
          color: white;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }

        .primary-cta {
          background: linear-gradient(135deg, #ff006e, #8338ec);
          box-shadow: 0 16px 35px rgba(255, 0, 110, 0.28);
        }

        .secondary-cta {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
        }

        .primary-cta:hover,
        .secondary-cta:hover {
          transform: translateY(-2px);
        }

        .hero-card {
          min-height: 260px;
          border-radius: 24px;
          padding: 24px;
          background: rgba(0, 0, 0, 0.22);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .score-ring {
          width: 150px;
          height: 150px;
          margin: 0 auto;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background:
            radial-gradient(circle, rgba(0,0,0,0.8) 55%, transparent 56%),
            conic-gradient(#06ffa5 0 85%, rgba(255,255,255,0.12) 85% 100%);
          box-shadow: inset 0 0 35px rgba(6, 255, 165, 0.1);
        }

        .score-ring span {
          font-size: 32px;
          font-weight: 900;
        }

        .score-ring small {
          color: rgba(255,255,255,0.6);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .hero-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 20px;
        }

        .hero-metrics div {
          padding: 12px;
          border-radius: 16px;
          text-align: center;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .hero-metrics strong {
          display: block;
          font-size: 20px;
        }

        .hero-metrics small {
          display: block;
          margin-top: 4px;
          color: rgba(255, 255, 255, 0.55);
          font-size: 11px;
        }

        @media (max-width: 900px) {
          .welcome-hero {
            grid-template-columns: 1fr;
            padding: 24px;
          }

          .hero-left h1 {
            letter-spacing: -1.6px;
          }

          .hero-left p {
            font-size: 16px;
          }
        }

        @media (max-width: 520px) {
          .welcome-hero {
            padding: 20px;
            border-radius: 22px;
          }

          .hero-actions {
            flex-direction: column;
          }

          .primary-cta,
          .secondary-cta {
            width: 100%;
          }

          .hero-metrics {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

// 16. Quick Stats Component
function QuickStats({ stats }) {
  return (
    <div className="quick-stats">
      <StatCard
        icon={<Flame />}
        value={stats.calories.toLocaleString()}
        label="Calories Burned"
        color="#ff6b00"
      />
      <StatCard
        icon={<Activity />}
        value={stats.minutes}
        label="Minutes Active"
        color="#06ffa5"
      />
      <StatCard
        icon={<Droplets />}
        value={`${stats.water * 250}ml`}
        label="Water Intake"
        color="#0099ff"
      />
      <StatCard
        icon={<Target />}
        value={`${stats.goalsCompleted}%`}
        label="Goals Met"
        color="#8338ec"
      />
      <style>{`
        .quick-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 15px;
        }
      `}</style>
    </div>
  );
}

// 17. Stat Card Component
function StatCard({ icon, value, label, color }) {
  return (
    <div className="stat-card">
      <div className="icon-wrapper" style={{ background: `${color}20` }}>
        {React.cloneElement(icon, { color, size: 20 })}
      </div>
      <h3>{value}</h3>
      <p>{label}</p>
      <style>{`
        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .stat-card:hover::before {
          opacity: 1;
        }
        .icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 10px;
          position: relative;
          z-index: 1;
        }
        .stat-card h3 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .stat-card p {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
        }
          
      `}</style>
    </div>
  );
}

// 18. Today Schedule Component
function TodaySchedule() {
  const [schedule, setSchedule] = useState([
    {
      id: 1,
      time: "7:00 AM",
      activity: "Morning Yoga",
      duration: "30 min",
      type: "yoga",
      completed: true,
    },
    {
      id: 2,
      time: "12:30 PM",
      activity: "HIIT Cardio",
      duration: "20 min",
      type: "cardio",
      completed: false,
    },
    {
      id: 3,
      time: "6:00 PM",
      activity: "Strength Training",
      duration: "45 min",
      type: "strength",
      completed: false,
    },
  ]);

  const toggleComplete = (id) => {
    setSchedule(
      schedule.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="today-schedule">
      <SectionHeader title="Today's Schedule" action="View All" />
      <div className="schedule-list">
        {schedule.map((item) => (
          <ScheduleItem
            key={item.id}
            {...item}
            onToggle={() => toggleComplete(item.id)}
          />
        ))}
      </div>
      <style>{`
        .today-schedule {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .schedule-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

// 19. Section Header Component
function SectionHeader({ title, action, onAction }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {action && (
        <button className="action-btn" onClick={onAction}>
          {action}
          <ChevronRight size={16} />
        </button>
      )}
      <style>{`
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .section-header h2 {
          font-size: 20px;
          font-weight: 600;
        }
        .action-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          color: #ff006e;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }
        .action-btn:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}

// 20. Schedule Item Component
function ScheduleItem({ time, activity, duration, type, completed, onToggle }) {
  const typeColors = {
    yoga: "#06ffa5",
    cardio: "#ff006e",
    strength: "#8338ec",
  };

  return (
    <div
      className={`schedule-item ${completed ? "completed" : ""}`}
      onClick={onToggle}
    >
      <div className="time-block">
        <Clock size={16} />
        <span>{time}</span>
      </div>
      <div className="activity-info">
        <h4>{activity}</h4>
        <span className="duration">{duration}</span>
      </div>
      <div
        className="type-badge"
        style={{ background: `${typeColors[type]}20`, color: typeColors[type] }}
      >
        {type}
      </div>
      <div className="check-icon">
        {completed ? <Check size={20} /> : <div className="empty-check" />}
      </div>
      <style>{`
        .schedule-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .schedule-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .schedule-item.completed {
          opacity: 0.7;
        }
        .schedule-item.completed .activity-info h4 {
          text-decoration: line-through;
        }
        .time-block {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          min-width: 90px;
        }
        .activity-info {
          flex: 1;
        }
        .activity-info h4 {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 2px;
        }
        .duration {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
        }
        .type-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
        }
        .check-icon {
          color: #06ffa5;
        }
        .empty-check {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}

// 21. Recommended Workouts Component
function RecommendedWorkouts() {
  const [workouts] = useState([
    {
      id: 1,
      title: "Full Body Burn",
      duration: "30 min",
      difficulty: "Intermediate",
      calories: 250,
      liked: false,
    },
    {
      id: 2,
      title: "Glute Sculptor",
      duration: "25 min",
      difficulty: "Beginner",
      calories: 180,
      liked: true,
    },
    {
      id: 3,
      title: "Core Crusher",
      duration: "15 min",
      difficulty: "Advanced",
      calories: 120,
      liked: false,
    },
  ]);

  const [likedWorkouts, setLikedWorkouts] = useState(workouts);

  const toggleLike = (id) => {
    setLikedWorkouts(
      likedWorkouts.map((workout) =>
        workout.id === id ? { ...workout, liked: !workout.liked } : workout
      )
    );
  };

  return (
    <div className="recommended-workouts">
      <SectionHeader title="Recommended for You" action="Browse All" />
      <div className="workout-cards">
        {likedWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            {...workout}
            onLike={() => toggleLike(workout.id)}
          />
        ))}
      </div>
      <style>{`
        .recommended-workouts {
          margin-top: 20px;
        }
        .workout-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

// 22. Workout Card Component
function WorkoutCard({ title, duration, difficulty, calories, liked, onLike }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const difficultyColors = {
    Beginner: "#06ffa5",
    Intermediate: "#ffb700",
    Advanced: "#ff006e",
  };

  return (
    <div className="workout-card">
      <div className="workout-image">
        <PlayButton
          isPlaying={isPlaying}
          onClick={() => setIsPlaying(!isPlaying)}
        />
        <button className="like-btn" onClick={onLike}>
          <Heart size={20} fill={liked ? "#ff006e" : "none"} color="#ff006e" />
        </button>
      </div>
      <div className="workout-details">
        <h3>{title}</h3>
        <div className="workout-stats">
          <span>
            <Clock size={14} /> {duration}
          </span>
          <span>
            <Flame size={14} /> {calories} cal
          </span>
        </div>
        <div
          className="difficulty-badge"
          style={{ color: difficultyColors[difficulty] }}
        >
          {difficulty}
        </div>
      </div>
      <style>{`
        .workout-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .workout-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .workout-image {
          height: 165px;
          background:
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.28), transparent 24%),
            radial-gradient(circle at 80% 10%, rgba(6,255,165,0.22), transparent 26%),
            linear-gradient(135deg, #ff006e 0%, #8338ec 55%, #111827 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .like-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .like-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }
        .workout-details {
          padding: 20px;
        }
        .workout-details h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .workout-stats {
          display: flex;
          gap: 15px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          margin-bottom: 10px;
        }
        .workout-stats span {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .difficulty-badge {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
}

// 23. Play Button Component
function PlayButton({ isPlaying, onClick }) {
  return (
    <div className="play-button" onClick={onClick}>
      {isPlaying ? (
        <Pause size={24} fill="white" />
      ) : (
        <Play size={24} fill="white" />
      )}
      <style>{`
        .play-button {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .play-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}

// 24. Nutrition Snapshot Component
function NutritionSnapshot({ stats, setStats }) {
  const [calories] = useState({
    consumed: 1450,
    goal: 2000,
  });

  return (
    <div className="nutrition-snapshot">
      <SectionHeader title="Nutrition Today" action="Log Food" />
      <CalorieProgress consumed={calories.consumed} goal={calories.goal} />
      <MacrosBreakdown />
      <style>{`
        .nutrition-snapshot {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}

// 25. Calorie Progress Component
function CalorieProgress({ consumed, goal }) {
  const percentage = (consumed / goal) * 100;

  return (
    <div className="calorie-progress">
      <div className="progress-header">
        <span className="consumed">{consumed} cal</span>
        <span className="remaining">{goal - consumed} remaining</span>
      </div>
      <ProgressBar percentage={percentage} />
      <style>{`
        .calorie-progress {
          margin: 20px 0;
        }
        .progress-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .consumed {
          font-size: 24px;
          font-weight: 700;
        }
        .remaining {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}

// 26. Progress Bar Component
function ProgressBar({ percentage }) {
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
      <style>{`
        .progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff006e, #8338ec);
          border-radius: 4px;
          transition: width 0.5s ease;
        }
      `}</style>
    </div>
  );
}

// 27. Macros Breakdown Component
function MacrosBreakdown() {
  const [macros] = useState([
    { name: "Protein", value: 85, goal: 120, color: "#ff006e" },
    { name: "Carbs", value: 180, goal: 250, color: "#06ffa5" },
    { name: "Fats", value: 45, goal: 67, color: "#ffb700" },
  ]);

  return (
    <div className="macros-breakdown">
      {macros.map((macro, index) => (
        <MacroItem key={index} {...macro} />
      ))}
      <style>{`
        .macros-breakdown {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

// 28. Macro Item Component
function MacroItem({ name, value, goal, color }) {
  const percentage = (value / goal) * 100;

  return (
    <div className="macro-item">
      <CircularProgress percentage={percentage} color={color} />
      <h4>{name}</h4>
      <p>
        {value}g / {goal}g
      </p>
      <style>{`
        .macro-item {
          text-align: center;
        }
        .macro-item h4 {
          font-size: 14px;
          font-weight: 500;
          margin: 8px 0 4px;
        }
        .macro-item p {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
}

// 29. Circular Progress Component
function CircularProgress({ percentage, color }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="70" height="70">
      <circle
        cx="35"
        cy="35"
        r={radius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="4"
      />
      <circle
        cx="35"
        cy="35"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 35 35)"
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
      <text
        x="35"
        y="40"
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="600"
      >
        {Math.round(percentage)}%
      </text>
    </svg>
  );
}

// 30. Challenges Widget Component
function ChallengesWidget() {
  const [challenges] = useState([
    {
      id: 1,
      title: "30-Day Plank Challenge",
      progress: 18,
      total: 30,
      participants: 1234,
    },
    {
      id: 2,
      title: "Summer Body Challenge",
      progress: 5,
      total: 21,
      participants: 892,
    },
  ]);

  const [joinedChallenges, setJoinedChallenges] = useState([1]);

  const toggleJoin = (id) => {
    if (joinedChallenges.includes(id)) {
      setJoinedChallenges(joinedChallenges.filter((cId) => cId !== id));
    } else {
      setJoinedChallenges([...joinedChallenges, id]);
    }
  };

  return (
    <div className="challenges-widget">
      <SectionHeader title="Active Challenges" action="Join New" />
      <div className="challenges-list">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            {...challenge}
            joined={joinedChallenges.includes(challenge.id)}
            onToggleJoin={() => toggleJoin(challenge.id)}
          />
        ))}
      </div>
      <style>{`
        .challenges-widget {
          margin-top: 20px;
        }
        .challenges-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

// 31. Challenge Card Component
function ChallengeCard({
  title,
  progress,
  total,
  participants,
  joined,
  onToggleJoin,
}) {
  const percentage = (progress / total) * 100;

  return (
    <div className={`challenge-card ${joined ? "joined" : ""}`}>
      <div className="challenge-header">
        <Trophy size={20} color="#ffb700" />
        <h3>{title}</h3>
      </div>
      <div className="challenge-progress">
        <span>
          Day {progress} of {total}
        </span>
        <ProgressBar percentage={percentage} />
      </div>
      <div className="challenge-footer">
        <span className="participants">
          <User size={14} />
          {participants} participants
        </span>
        <button className="join-btn" onClick={onToggleJoin}>
          {joined ? "Leave" : "Join"}
        </button>
      </div>
      <style>{`
        .challenge-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .challenge-card.joined {
          border-color: #ffb700;
        }
        .challenge-card:hover {
          background: rgba(255, 255, 255, 0.08);
        }
        .challenge-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        .challenge-header h3 {
          font-size: 16px;
          font-weight: 600;
        }
        .challenge-progress {
          margin-bottom: 15px;
        }
        .challenge-progress span {
          display: block;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 8px;
        }
        .challenge-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .participants {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
        }
        .join-btn {
          padding: 6px 16px;
          background: rgba(255, 183, 0, 0.2);
          border: 1px solid rgba(255, 183, 0, 0.3);
          border-radius: 20px;
          color: #ffb700;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .join-btn:hover {
          background: rgba(255, 183, 0, 0.3);
        }
      `}</style>
    </div>
  );
}

// 32. Workouts Section Component
function WorkoutsSection({ userData, setUserData }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentWorkout, setCurrentWorkout] = useState(null);

  return (
    <div className="workouts-section">
      <h1>Workouts</h1>
      <WorkoutCategories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <FeaturedWorkouts
        currentWorkout={currentWorkout}
        setCurrentWorkout={setCurrentWorkout}
      />
      <WorkoutLibrary
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <PersonalTrainers />
      <style>{`
        .workouts-section h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 30px;
          background: linear-gradient(
            135deg,
            #fff 0%,
            rgba(255, 255, 255, 0.8) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
          letter-spacing: -1px;
        }
      `}</style>
    </div>
  );
}

// 33. Workout Categories Component
function WorkoutCategories({ selectedCategory, setSelectedCategory }) {
  const categories = [
    { name: "Strength", Icon: Activity, count: 45, color: "#ff006e" },
    { name: "Cardio", Icon: Heart, count: 38, color: "#ff6b00" },
    { name: "Yoga", Icon: Wind, count: 27, color: "#06ffa5" },
    { name: "HIIT", Icon: Zap, count: 32, color: "#ffb700" },
    { name: "Pilates", Icon: Target, count: 21, color: "#8338ec" },
    { name: "Dance", Icon: Music, count: 18, color: "#0099ff" },
  ];

  return (
    <div className="workout-categories">
      {categories.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          Icon={category.Icon}
          count={category.count}
          color={category.color}
          selected={selectedCategory === category.name}
          onClick={() => setSelectedCategory(category.name)}
        />
      ))}

      <style>{`
        .workout-categories {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 16px;
          margin-bottom: 40px;
        }
      `}</style>
    </div>
  );
}
// 34. Category Card Component
function CategoryCard({ name, Icon, count, color, selected, onClick }) {
  return (
    <div
      className={`category-card ${selected ? "selected" : ""}`}
      onClick={onClick}
      style={{
        "--category-color": color,
      }}
    >
      <div className="category-icon">
        <Icon size={30} strokeWidth={2.4} />
      </div>

      <h3>{name}</h3>
      <p>{count} workouts</p>

      <style>{`
        .category-card {
          background:
            radial-gradient(circle at top, color-mix(in srgb, var(--category-color) 22%, transparent), transparent 48%),
            rgba(255, 255, 255, 0.055);
          backdrop-filter: blur(22px);
          border-radius: 18px;
          padding: 22px 18px;
          border: 1px solid rgba(255, 255, 255, 0.11);
          text-align: center;
          cursor: pointer;
          transition: transform 0.28s ease, border-color 0.28s ease, background 0.28s ease, box-shadow 0.28s ease;
          position: relative;
          overflow: hidden;
        }

        .category-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.14),
            transparent 45%
          );
          opacity: 0;
          transition: opacity 0.28s ease;
        }

        .category-card.selected {
          border-color: var(--category-color);
          box-shadow:
            0 18px 45px color-mix(in srgb, var(--category-color) 26%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.14);
        }

        .category-card:hover {
          transform: translateY(-6px);
          border-color: color-mix(in srgb, var(--category-color) 70%, white 10%);
          background:
            radial-gradient(circle at top, color-mix(in srgb, var(--category-color) 30%, transparent), transparent 52%),
            rgba(255, 255, 255, 0.075);
          box-shadow: 0 22px 60px rgba(0, 0, 0, 0.28);
        }

        .category-card:hover::before {
          opacity: 1;
        }

        .category-icon {
          width: 58px;
          height: 58px;
          margin: 0 auto 14px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--category-color);
          background: color-mix(in srgb, var(--category-color) 16%, transparent);
          border: 1px solid color-mix(in srgb, var(--category-color) 32%, transparent);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
          position: relative;
          z-index: 1;
        }

        .category-card h3 {
          font-size: 16px;
          font-weight: 750;
          margin-bottom: 5px;
          position: relative;
          z-index: 1;
        }

        .category-card p {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.62);
          position: relative;
          z-index: 1;
        }

        @media (max-width: 520px) {
          .category-card {
            padding: 18px 14px;
          }

          .category-icon {
            width: 52px;
            height: 52px;
          }
        }
      `}</style>
    </div>
  );
}

// 35. Featured Workouts Component
function FeaturedWorkouts({ currentWorkout, setCurrentWorkout }) {
  return (
    <div className="featured-workouts">
      <SectionHeader title="Featured This Week" />
      <WorkoutSlider
        currentWorkout={currentWorkout}
        setCurrentWorkout={setCurrentWorkout}
      />

      <style>{`
        .featured-workouts {
          margin-bottom: 40px;
        }
      `}</style>
    </div>
  );
}

// 36. Workout Slider Component
function WorkoutSlider({ currentWorkout, setCurrentWorkout }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const workouts = [
    {
      id: 1,
      title: "Beach Body Bootcamp",
      trainer: "Jessica Chen",
      duration: "45 min",
      intensity: "High",
    },
    {
      id: 2,
      title: "Mindful Morning Flow",
      trainer: "Sarah Williams",
      duration: "30 min",
      intensity: "Low",
    },
    {
      id: 3,
      title: "Power Hour",
      trainer: "Maria Garcia",
      duration: "60 min",
      intensity: "High",
    },
  ];

  return (
    <div className="workout-slider">
      <div className="slider-content">
        <FeaturedWorkoutCard
          {...workouts[currentSlide]}
          onStart={() => setCurrentWorkout(workouts[currentSlide])}
        />
      </div>
      <div className="slider-controls">
        <button onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}>
          <ChevronLeft size={20} />
        </button>
        <div className="slider-dots">
          {workouts.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
        <button
          onClick={() =>
            setCurrentSlide(Math.min(workouts.length - 1, currentSlide + 1))
          }
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <style>{`
        .workout-slider {
          margin-top: 20px;
        }
        .slider-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-top: 20px;
        }
        .slider-controls button {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .slider-controls button:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .slider-dots {
          display: flex;
          gap: 8px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: background 0.3s ease;
          cursor: pointer;
        }
        .dot.active {
          background: #ff006e;
        }
      `}</style>
    </div>
  );
}

// 37. Featured Workout Card Component
function FeaturedWorkoutCard({ title, trainer, duration, intensity, onStart }) {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
    onStart();
    // Here you could implement actual workout tracking
  };

  return (
    <div className="featured-workout-card">
      <div className="workout-backdrop"></div>
      <div className="workout-content">
        <h2>{title}</h2>
        <p className="trainer">with {trainer}</p>
        <div className="workout-meta">
          <span>
            <Clock size={16} /> {duration}
          </span>
          <span>
            <Zap size={16} /> {intensity} Intensity
          </span>
        </div>
        <button className="start-workout-btn" onClick={handleStart}>
          {isStarted ? (
            <>
              <Pause size={20} />
              Pause Workout
            </>
          ) : (
            <>
              <Play size={20} />
              Start Workout
            </>
          )}
        </button>
      </div>
      <style>{`
        .featured-workout-card {
          position: relative;
          height: 300px;
          border-radius: 20px;
          overflow: hidden;
        }
        .workout-backdrop {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #ff006e 0%, #8338ec 100%);
          opacity: 0.8;
        }
        .workout-content {
          position: relative;
          height: 100%;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .workout-content h2 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .trainer {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 20px;
        }
        .workout-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
        }
        .workout-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
        }
        .start-workout-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 30px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 30px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: fit-content;
          box-shadow: 0 4px 15px rgba(131, 56, 236, 0.4);
        }
        .start-workout-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(131, 56, 236, 0.6);
        }
      `}</style>
    </div>
  );
}

// 38. Workout Library Component
function WorkoutLibrary({ activeFilter, setActiveFilter }) {
  const filters = [
    "All",
    "Beginner",
    "Intermediate",
    "Advanced",
    "No Equipment",
    "Quick",
  ];

  return (
    <div className="workout-library">
      <SectionHeader title="Workout Library" />
      <WorkoutFilters
        filters={filters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <WorkoutGrid filter={activeFilter} />
      <style>{`
        .workout-library {
          margin-bottom: 40px;
        }
      `}</style>
    </div>
  );
}

// 39. Workout Filters Component
function WorkoutFilters({ filters, activeFilter, setActiveFilter }) {
  return (
    <div className="workout-filters">
      {filters.map((filter, index) => (
        <FilterChip
          key={index}
          label={filter}
          active={activeFilter === filter}
          onClick={() => setActiveFilter(filter)}
        />
      ))}
      <style>{`
        .workout-filters {
          display: flex;
          gap: 10px;
          margin: 20px 0;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}

// 40. Filter Chip Component
function FilterChip({ label, active, onClick }) {
  return (
    <button
      className={`filter-chip ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
      <style>{`
        .filter-chip {
          padding: 8px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .filter-chip:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
        .filter-chip.active {
          background: linear-gradient(135deg, #ff006e, #8338ec);
          border-color: transparent;
          color: white;
        }
      `}</style>
    </button>
  );
}

// 41. Workout Grid Component
function WorkoutGrid({ filter }) {
  const [workouts] = useState([
    {
      id: 1,
      title: "Booty Blast",
      duration: "25 min",
      equipment: "Resistance Band",
      difficulty: "Intermediate",
      liked: false,
    },
    {
      id: 2,
      title: "Ab Sculptor",
      duration: "15 min",
      equipment: "None",
      difficulty: "Beginner",
      liked: true,
    },
    {
      id: 3,
      title: "Full Body Flow",
      duration: "40 min",
      equipment: "Dumbbells",
      difficulty: "Advanced",
      liked: false,
    },
    {
      id: 4,
      title: "Cardio Dance",
      duration: "30 min",
      equipment: "None",
      difficulty: "Beginner",
      liked: false,
    },
    {
      id: 5,
      title: "Upper Body Tone",
      duration: "35 min",
      equipment: "Dumbbells",
      difficulty: "Intermediate",
      liked: true,
    },
    {
      id: 6,
      title: "Leg Day",
      duration: "45 min",
      equipment: "Barbell",
      difficulty: "Advanced",
      liked: false,
    },
  ]);

  const [likedWorkouts, setLikedWorkouts] = useState(workouts);

  const filteredWorkouts =
    filter === "All"
      ? likedWorkouts
      : likedWorkouts.filter((w) => {
          if (filter === "No Equipment") return w.equipment === "None";
          if (filter === "Quick") return parseInt(w.duration) <= 20;
          return w.difficulty === filter;
        });

  const toggleLike = (id) => {
    setLikedWorkouts(
      likedWorkouts.map((w) => (w.id === id ? { ...w, liked: !w.liked } : w))
    );
  };

  return (
    <div className="workout-grid">
      {filteredWorkouts.map((workout) => (
        <WorkoutTile
          key={workout.id}
          {...workout}
          onLike={() => toggleLike(workout.id)}
        />
      ))}
      <style>{`
        .workout-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
      `}</style>
    </div>
  );
}

// 42. Workout Tile Component
function WorkoutTile({
  title,
  duration,
  equipment,
  difficulty,
  liked,
  onLike,
}) {
  const [started, setStarted] = useState(false);

  return (
    <div className="workout-tile">
      <div className="tile-header">
        <h3>{title}</h3>
        <Heart
          size={20}
          fill={liked ? "#ff006e" : "none"}
          color="#ff006e"
          onClick={onLike}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="tile-details">
        <span>
          <Clock size={14} /> {duration}
        </span>
        <span>{equipment}</span>
        <span className={`difficulty ${difficulty.toLowerCase()}`}>
          {difficulty}
        </span>
      </div>
      <button className="start-btn" onClick={() => setStarted(!started)}>
        {started ? "Stop" : "Start"}
      </button>
      <style>{`
        .workout-tile {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .workout-tile:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.08);
        }
        .tile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        .tile-header h3 {
          font-size: 18px;
          font-weight: 600;
        }
        .tile-details {
          display: flex;
          gap: 15px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 15px;
        }
        .tile-details span {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .difficulty {
          font-weight: 500;
        }
        .difficulty.beginner {
          color: #06ffa5;
        }
        .difficulty.intermediate {
          color: #ffb700;
        }
        .difficulty.advanced {
          color: #ff006e;
        }
        .start-btn {
          width: 100%;
          padding: 8px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .start-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

// 43. Personal Trainers Component
function PersonalTrainers() {
  const [trainers] = useState([
    {
      id: 1,
      name: "Jessica Chen",
      specialty: "HIIT & Strength",
      rating: 4.9,
      sessions: 1250,
      available: true,
    },
    {
      id: 2,
      name: "Sarah Williams",
      specialty: "Yoga & Mindfulness",
      rating: 5.0,
      sessions: 980,
      available: false,
    },
    {
      id: 3,
      name: "Maria Garcia",
      specialty: "Dance Fitness",
      rating: 4.8,
      sessions: 850,
      available: true,
    },
  ]);

  const [bookedTrainers, setBookedTrainers] = useState([]);

  const toggleBooking = (id) => {
    if (bookedTrainers.includes(id)) {
      setBookedTrainers(bookedTrainers.filter((tId) => tId !== id));
    } else {
      setBookedTrainers([...bookedTrainers, id]);
    }
  };

  return (
    <div className="personal-trainers">
      <SectionHeader title="Featured Trainers" action="View All" />
      <div className="trainers-grid">
        {trainers.map((trainer) => (
          <TrainerCard
            key={trainer.id}
            {...trainer}
            booked={bookedTrainers.includes(trainer.id)}
            onBook={() => toggleBooking(trainer.id)}
          />
        ))}
      </div>
      <style>{`
        .personal-trainers {
          margin-top: 40px;
        }
        .trainers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

// 44. Trainer Card Component
function TrainerCard({
  name,
  specialty,
  rating,
  sessions,
  available,
  booked,
  onBook,
}) {
  return (
    <div className="trainer-card">
      <div className="trainer-avatar">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
          alt={name}
        />
        <span className={`status ${available ? "available" : "busy"}`}>
          {available ? "Available" : "Busy"}
        </span>
      </div>
      <h3>{name}</h3>
      <p className="specialty">{specialty}</p>
      <div className="trainer-stats">
        <div className="stat">
          <Star size={16} fill="#ffb700" color="#ffb700" />
          <span>{rating}</span>
        </div>
        <div className="stat">
          <span>{sessions} sessions</span>
        </div>
      </div>
      <button
        className="book-session-btn"
        onClick={onBook}
        disabled={!available}
      >
        {booked ? "Cancel Booking" : "Book Session"}
      </button>
      <style>{`
        .trainer-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          transition: all 0.3s ease;
        }
        .trainer-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.08);
        }
        .trainer-avatar {
          width: 80px;
          height: 80px;
          margin: 0 auto 15px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(255, 255, 255, 0.2);
          position: relative;
        }
        .trainer-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .status {
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          padding: 2px 10px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 600;
        }
        .status.available {
          background: #06ffa5;
          color: #000;
        }
        .status.busy {
          background: #ff006e;
          color: #fff;
        }
        .trainer-card h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 5px;
        }
        .specialty {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          margin-bottom: 15px;
        }
        .trainer-stats {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }
        .stat {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
        }
        .book-session-btn {
          width: 100%;
          padding: 10px;
          background: linear-gradient(135deg, #ff006e, #8338ec);
          border: none;
          border-radius: 25px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(131, 56, 236, 0.4);
        }
        .book-session-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(131, 56, 236, 0.6);
        }
        .book-session-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

// Continue with remaining components...
// 45. Nutrition Section Component
function NutritionSection({ userData, setUserData }) {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [todayMeals, setTodayMeals] = useState([]);

  return (
    <div className="nutrition-section">
      <h1>Nutrition</h1>
      <NutritionOverview todayMeals={todayMeals} />
      <MealPlanner selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <RecipeLibrary
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <NutritionTracking
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        todayMeals={todayMeals}
        setTodayMeals={setTodayMeals}
      />
      <style>{`
        .nutrition-section h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 30px;
          background: linear-gradient(
            135deg,
            #fff 0%,
            rgba(255, 255, 255, 0.8) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
          letter-spacing: -1px;
        }
      `}</style>
    </div>
  );
}

// 46. Nutrition Overview Component
function NutritionOverview({ todayMeals }) {
  const calculateCalories = () => {
    return todayMeals.reduce((total, meal) => total + meal.calories, 0);
  };

  return (
    <div className="nutrition-overview">
      <DailyCalorieGoal currentCalories={calculateCalories()} />
      <WaterIntakeTracker />
      <NutrientBalance />
      <style>{`
        .nutrition-overview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
      `}</style>
    </div>
  );
}

// 47. Daily Calorie Goal Component
function DailyCalorieGoal({ currentCalories = 1450 }) {
  const goal = 2000;
  const percentage = (currentCalories / goal) * 100;

  return (
    <div className="daily-calorie-goal">
      <h3>Daily Calorie Goal</h3>
      <div className="calorie-display">
        <span className="current">{currentCalories.toLocaleString()}</span>
        <span className="divider">/</span>
        <span className="goal">{goal.toLocaleString()}</span>
      </div>
      <ProgressBar percentage={percentage} />
      <div className="meal-breakdown">
        <MealCalories meal="Breakfast" calories={380} />
        <MealCalories meal="Lunch" calories={520} />
        <MealCalories meal="Dinner" calories={450} />
        <MealCalories meal="Snacks" calories={100} />
      </div>
      <style>{`
        .daily-calorie-goal {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .daily-calorie-goal h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .calorie-display {
          display: flex;
          align-items: baseline;
          gap: 5px;
          margin-bottom: 15px;
        }
        .current {
          font-size: 36px;
          font-weight: 700;
        }
        .divider {
          font-size: 24px;
          color: rgba(255, 255, 255, 0.5);
        }
        .goal {
          font-size: 24px;
          color: rgba(255, 255, 255, 0.7);
        }
        .meal-breakdown {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      `}</style>
    </div>
  );
}

// 48. Meal Calories Component
function MealCalories({ meal, calories }) {
  return (
    <div className="meal-calories">
      <span className="meal-name">{meal}</span>
      <span className="calories">{calories} cal</span>
      <style>{`
        .meal-calories {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }
        .meal-name {
          color: rgba(255, 255, 255, 0.7);
        }
        .calories {
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

// 49. Water Intake Tracker Component
function WaterIntakeTracker() {
  const [glasses, setGlasses] = useState(6);
  const goal = 8;

  return (
    <div className="water-intake-tracker">
      <h3>Water Intake</h3>
      <div className="water-visual">
        <Droplets size={48} color="#0099ff" />
        <div className="water-stats">
          <span className="current">{glasses * 250}ml</span>
          <span className="goal">Goal: {goal * 250}ml</span>
        </div>
      </div>
      <div className="water-glasses">
        {[...Array(goal)].map((_, index) => (
          <WaterGlass
            key={index}
            filled={index < glasses}
            onClick={() => setGlasses(index + 1)}
          />
        ))}
      </div>
      <button
        className="add-water-btn"
        onClick={() => setGlasses(Math.min(goal, glasses + 1))}
      >
        <Plus size={16} />
        Add Glass
      </button>
      <style>{`
        .water-intake-tracker {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .water-intake-tracker h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .water-visual {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
        }
        .water-stats {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .water-stats .current {
          font-size: 24px;
          font-weight: 700;
        }
        .water-stats .goal {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
        }
        .water-glasses {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }
        .add-water-btn {
          width: 100%;
          padding: 10px;
          background: rgba(0, 153, 255, 0.2);
          border: 1px solid rgba(0, 153, 255, 0.3);
          border-radius: 25px;
          color: #0099ff;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .add-water-btn:hover {
          background: rgba(0, 153, 255, 0.3);
        }
      `}</style>
    </div>
  );
}

// 50. Water Glass Component
function WaterGlass({ filled, onClick }) {
  return (
    <div className={`water-glass ${filled ? "filled" : ""}`} onClick={onClick}>
      <style>{`
        .water-glass {
          aspect-ratio: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .water-glass::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 0;
          background: rgba(0, 153, 255, 0.5);
          transition: height 0.3s ease;
        }
        .water-glass.filled::before {
          height: 100%;
        }
        .water-glass:hover {
          border-color: rgba(0, 153, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

// Continue with remaining components...

// 51. Nutrient Balance Component
function NutrientBalance() {
  const [nutrients] = useState([
    { name: "Vitamin C", percentage: 85, color: "#06ffa5" },
    { name: "Iron", percentage: 70, color: "#ff006e" },
    { name: "Calcium", percentage: 60, color: "#ffb700" },
    { name: "Fiber", percentage: 90, color: "#8338ec" },
  ]);

  return (
    <div className="nutrient-balance">
      <h3>Nutrient Balance</h3>
      <div className="nutrients-list">
        {nutrients.map((nutrient, index) => (
          <NutrientBar key={index} {...nutrient} />
        ))}
      </div>
      <style>{`
        .nutrient-balance {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .nutrient-balance h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .nutrients-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
      `}</style>
    </div>
  );
}

// 52. Nutrient Bar Component
function NutrientBar({ name, percentage, color }) {
  return (
    <div className="nutrient-bar">
      <div className="nutrient-info">
        <span className="name">{name}</span>
        <span className="percentage">{percentage}%</span>
      </div>
      <div className="bar-container">
        <div
          className="bar-fill"
          style={{ width: `${percentage}%`, background: color }}
        ></div>
      </div>
      <style>{`
        .nutrient-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 14px;
        }
        .name {
          color: rgba(255, 255, 255, 0.8);
        }
        .percentage {
          font-weight: 600;
        }
        .bar-container {
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
        }
        .bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.5s ease;
        }
      `}</style>
    </div>
  );
}

// 53. Meal Planner Component
function MealPlanner({ selectedDay, setSelectedDay }) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [mealPlan, setMealPlan] = useState({
    Monday: [
      {
        id: 1,
        type: "Breakfast",
        name: "Protein Smoothie Bowl",
        calories: 380,
        time: "7:00 AM",
      },
      {
        id: 2,
        type: "Lunch",
        name: "Grilled Chicken Salad",
        calories: 520,
        time: "12:30 PM",
      },
      {
        id: 3,
        type: "Snack",
        name: "Greek Yogurt & Berries",
        calories: 150,
        time: "3:30 PM",
      },
      {
        id: 4,
        type: "Dinner",
        name: "Salmon & Quinoa",
        calories: 580,
        time: "7:00 PM",
      },
    ],
    Tuesday: [
      {
        id: 5,
        type: "Breakfast",
        name: "Overnight Oats",
        calories: 350,
        time: "7:00 AM",
      },
      {
        id: 6,
        type: "Lunch",
        name: "Buddha Bowl",
        calories: 480,
        time: "12:30 PM",
      },
    ],
  });

  const swapMeal = (day, mealId) => {
    // In a real app, this would open a meal selection dialog
    console.log("Swapping meal", mealId, "on", day);
  };

  return (
    <div className="meal-planner">
      <SectionHeader title="Weekly Meal Plan" action="Edit Plan" />
      <DaySelector
        days={days}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <MealPlanDay
        day={selectedDay}
        meals={mealPlan[selectedDay] || []}
        onSwapMeal={(mealId) => swapMeal(selectedDay, mealId)}
      />
      <style>{`
        .meal-planner {
          margin-bottom: 40px;
        }
      `}</style>
    </div>
  );
}

// 54. Day Selector Component
function DaySelector({ days, selectedDay, setSelectedDay }) {
  return (
    <div className="day-selector">
      {days.map((day, index) => (
        <DayChip
          key={index}
          day={day}
          selected={selectedDay === day}
          onClick={() => setSelectedDay(day)}
        />
      ))}
      <style>{`
        .day-selector {
          display: flex;
          gap: 10px;
          margin: 20px 0;
          overflow-x: auto;
          padding-bottom: 10px;
        }
      `}</style>
    </div>
  );
}

// 55. Day Chip Component
function DayChip({ day, selected, onClick }) {
  return (
    <button
      className={`day-chip ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {day.slice(0, 3)}
      <style>{`
        .day-chip {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .day-chip:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
        .day-chip.selected {
          background: linear-gradient(135deg, #06ffa5, #0099ff);
          border-color: transparent;
          color: white;
        }
      `}</style>
    </button>
  );
}

// 56. Meal Plan Day Component
function MealPlanDay({ day, meals, onSwapMeal }) {
  return (
    <div className="meal-plan-day">
      {meals.length > 0 ? (
        meals.map((meal) => (
          <MealPlanItem
            key={meal.id}
            {...meal}
            onSwap={() => onSwapMeal(meal.id)}
          />
        ))
      ) : (
        <p>No meals planned for {day}</p>
      )}
      <style>{`
        .meal-plan-day {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 15px;
        }
        .meal-plan-day p {
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          padding: 40px;
          grid-column: 1 / -1;
        }
      `}</style>
    </div>
  );
}

// 57. Meal Plan Item Component
function MealPlanItem({ type, name, calories, time, onSwap }) {
  const typeIcons = {
    Breakfast: "🌅",
    Lunch: "☀️",
    Snack: "🍎",
    Dinner: "🌙",
  };

  return (
    <div className="meal-plan-item">
      <div className="meal-header">
        <span className="meal-type">
          <span className="type-icon">{typeIcons[type]}</span>
          {type}
        </span>
        <span className="meal-time">{time}</span>
      </div>
      <h4>{name}</h4>
      <div className="meal-footer">
        <span className="calories">{calories} cal</span>
        <button className="swap-btn" onClick={onSwap}>
          <Share2 size={16} />
          Swap
        </button>
      </div>
      <style>{`
        .meal-plan-item {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .meal-plan-item:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.08);
        }
        .meal-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .meal-type {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }
        .type-icon {
          font-size: 18px;
        }
        .meal-time {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
        }
        .meal-plan-item h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 15px;
        }
        .meal-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .calories {
          font-size: 14px;
          font-weight: 500;
          color: #06ffa5;
        }
        .swap-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 15px;
          color: white;
          font-size: 13px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .swap-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

// 58. Recipe Library Component
function RecipeLibrary({ selectedCategory, setSelectedCategory }) {
  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Smoothies",
  ];

  return (
    <div className="recipe-library">
      <SectionHeader title="Healthy Recipes" action="Submit Recipe" />
      <RecipeCategories
        categories={categories}
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />
      <RecipeGrid category={selectedCategory} />
      <style>{`
        .recipe-library {
          margin-bottom: 40px;
        }
      `}</style>
    </div>
  );
}

// 59. Recipe Categories Component
function RecipeCategories({ categories, selected, setSelected }) {
  return (
    <div className="recipe-categories">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`category-btn ${selected === category ? "active" : ""}`}
          onClick={() => setSelected(category)}
        >
          {category}
        </button>
      ))}
      <style>{`
        .recipe-categories {
          display: flex;
          gap: 10px;
          margin: 20px 0;
          overflow-x: auto;
          padding-bottom: 10px;
        }
        .category-btn {
          padding: 8px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .category-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
        .category-btn.active {
          background: linear-gradient(135deg, #06ffa5, #0099ff);
          border-color: transparent;
          color: white;
        }
      `}</style>
    </div>
  );
}

// 60. Recipe Grid Component
function RecipeGrid({ category }) {
  const [recipes] = useState([
    {
      id: 1,
      title: "Protein Pancakes",
      time: "15 min",
      calories: 320,
      rating: 4.8,
      category: "Breakfast",
      liked: false,
    },
    {
      id: 2,
      title: "Buddha Bowl",
      time: "20 min",
      calories: 450,
      rating: 4.9,
      category: "Lunch",
      liked: true,
    },
    {
      id: 3,
      title: "Green Smoothie",
      time: "5 min",
      calories: 180,
      rating: 4.7,
      category: "Smoothies",
      liked: false,
    },
    {
      id: 4,
      title: "Quinoa Salad",
      time: "25 min",
      calories: 380,
      rating: 4.6,
      category: "Lunch",
      liked: true,
    },
  ]);

  const [likedRecipes, setLikedRecipes] = useState(recipes);

  const filteredRecipes =
    category === "All"
      ? likedRecipes
      : likedRecipes.filter((r) => r.category === category);

  const toggleLike = (id) => {
    setLikedRecipes(
      likedRecipes.map((r) => (r.id === id ? { ...r, liked: !r.liked } : r))
    );
  };

  return (
    <div className="recipe-grid">
      {filteredRecipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          {...recipe}
          onLike={() => toggleLike(recipe.id)}
        />
      ))}
      <style>{`
        .recipe-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
      `}</style>
    </div>
  );
}

// 61. Recipe Card Component
function RecipeCard({ title, time, calories, rating, liked, onLike }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="recipe-card">
      <div className="recipe-image">
        <div className="recipe-badge">
          <Clock size={14} />
          {time}
        </div>
        <button className="like-btn" onClick={onLike}>
          <Heart size={16} fill={liked ? "#ff006e" : "none"} color="#ff006e" />
        </button>
      </div>
      <div className="recipe-content">
        <h4>{title}</h4>
        <div className="recipe-stats">
          <span className="calories">{calories} cal</span>
          <span className="rating">
            <Star size={14} fill="#ffb700" color="#ffb700" />
            {rating}
          </span>
        </div>
        <button className="save-btn" onClick={() => setSaved(!saved)}>
          {saved ? "Saved" : "Save Recipe"}
        </button>
      </div>
      <style>{`
        .recipe-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .recipe-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .recipe-image {
          height: 140px;
          background: linear-gradient(135deg, #06ffa5 0%, #0099ff 100%);
          position: relative;
        }
        .recipe-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .like-btn {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .like-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }
        .recipe-content {
          padding: 20px;
        }
        .recipe-content h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .recipe-stats {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          margin-bottom: 15px;
        }
        .calories {
          color: #06ffa5;
        }
        .rating {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .save-btn {
          width: 100%;
          padding: 8px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .save-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

// 62. Nutrition Tracking Component
function NutritionTracking({
  searchTerm,
  setSearchTerm,
  todayMeals,
  setTodayMeals,
}) {
  return (
    <div className="nutrition-tracking">
      <SectionHeader title="Track Your Meals" />
      <div className="tracking-grid">
        <FoodLogger
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddMeal={(meal) => setTodayMeals([...todayMeals, meal])}
        />
        <RecentMeals
          meals={todayMeals}
          onAddAgain={(meal) =>
            setTodayMeals([...todayMeals, { ...meal, id: Date.now() }])
          }
        />
      </div>
      <style>{`
        .nutrition-tracking {
          margin-bottom: 40px;
        }
        .tracking-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 20px;
        }
        @media (max-width: 768px) {
          .tracking-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

// 63. Food Logger Component
function FoodLogger({ searchTerm, setSearchTerm, onAddMeal }) {
  const [scanningBarcode, setScanningBarcode] = useState(false);

  const handleQuickAdd = (foodName, calories) => {
    const meal = {
      id: Date.now(),
      name: foodName,
      calories: calories,
      time: new Date().toLocaleTimeString(),
    };
    onAddMeal(meal);
  };

  return (
    <div className="food-logger">
      <div className="search-bar">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <QuickAddButtons onQuickAdd={handleQuickAdd} />
      <BarcodeScanButton
        isScanning={scanningBarcode}
        onClick={() => setScanningBarcode(!scanningBarcode)}
      />
      <style>{`
        .food-logger {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 30px;
          margin-bottom: 20px;
        }
        .search-bar input {
          flex: 1;
          background: none;
          border: none;
          color: white;
          font-size: 16px;
          outline: none;
        }
        .search-bar input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

// 64. Quick Add Buttons Component
function QuickAddButtons({ onQuickAdd }) {
  const quickAdds = [
    { name: "Apple", calories: 95 },
    { name: "Banana", calories: 105 },
    { name: "Chicken Breast", calories: 165 },
    { name: "Brown Rice", calories: 216 },
    { name: "Salad", calories: 120 },
    { name: "Protein Shake", calories: 240 },
  ];

  return (
    <div className="quick-add-buttons">
      <h4>Quick Add</h4>
      <div className="buttons-grid">
        {quickAdds.map((item, index) => (
          <button
            key={index}
            className="quick-add-btn"
            onClick={() => onQuickAdd(item.name, item.calories)}
          >
            <Plus size={14} />
            {item.name}
          </button>
        ))}
      </div>
      <style>{`
        .quick-add-buttons {
          margin-bottom: 20px;
        }
        .quick-add-buttons h4 {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 10px;
        }
        .buttons-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .quick-add-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          color: white;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .quick-add-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}

// 65. Barcode Scan Button Component
function BarcodeScanButton({ isScanning, onClick }) {
  return (
    <button className="barcode-scan-btn" onClick={onClick}>
      <Camera size={20} />
      {isScanning ? "Scanning..." : "Scan Barcode"}
      <style>{`
        .barcode-scan-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          background: linear-gradient(135deg, #ff006e, #8338ec);
          border: none;
          border-radius: 25px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(131, 56, 236, 0.4);
        }
        .barcode-scan-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(131, 56, 236, 0.6);
        }
      `}</style>
    </button>
  );
}

// 66. Recent Meals Component
function RecentMeals({ meals, onAddAgain }) {
  const defaultMeals = [
    {
      id: 1,
      name: "Grilled Chicken Salad",
      time: "2 hours ago",
      calories: 420,
    },
    { id: 2, name: "Protein Smoothie", time: "5 hours ago", calories: 280 },
    { id: 3, name: "Overnight Oats", time: "Yesterday", calories: 350 },
  ];

  const displayMeals = meals.length > 0 ? meals : defaultMeals;

  return (
    <div className="recent-meals">
      <h3>Recent Meals</h3>
      <div className="meals-list">
        {displayMeals
          .slice(-5)
          .reverse()
          .map((meal) => (
            <RecentMealItem
              key={meal.id}
              {...meal}
              onAddAgain={() => onAddAgain(meal)}
            />
          ))}
      </div>
      <style>{`
        .recent-meals {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .recent-meals h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .meals-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
      `}</style>
    </div>
  );
}

// 67. Recent Meal Item Component
function RecentMealItem({ name, time, calories, onAddAgain }) {
  return (
    <div className="recent-meal-item">
      <div className="meal-info">
        <h5>{name}</h5>
        <span className="time">{time}</span>
      </div>
      <div className="meal-actions">
        <span className="calories">{calories} cal</span>
        <button className="add-again-btn" onClick={onAddAgain}>
          <Plus size={16} />
        </button>
      </div>
      <style>{`
        .recent-meal-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          transition: background 0.3s ease;
        }
        .recent-meal-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .meal-info h5 {
          font-size: 15px;
          font-weight: 500;
          margin-bottom: 4px;
        }
        .time {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
        }
        .meal-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .calories {
          font-size: 14px;
          font-weight: 500;
          color: #06ffa5;
        }
        .add-again-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .add-again-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

// 68. Progress Section Component
function ProgressSection({ userData, setUserData }) {
  const [weightData, setWeightData] = useState([
    { date: "Jan 1", weight: 75 },
    { date: "Jan 15", weight: 74.2 },
    { date: "Feb 1", weight: 73.5 },
    { date: "Feb 15", weight: 72.8 },
    { date: "Mar 1", weight: 71.9 },
    { date: "Mar 15", weight: 70.5 },
  ]);

  const [measurements, setMeasurements] = useState([
    { area: "Waist", current: 68, previous: 72, unit: "cm" },
    { area: "Hips", current: 95, previous: 98, unit: "cm" },
    { area: "Arms", current: 28, previous: 30, unit: "cm" },
    { area: "Thighs", current: 55, previous: 58, unit: "cm" },
  ]);

  const addWeightEntry = (weight) => {
    const newEntry = {
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      weight: weight,
    };
    setWeightData([...weightData, newEntry]);
    setUserData({ ...userData, currentWeight: weight });
  };

  return (
    <div className="progress-section">
      <h1>Your Progress</h1>
      <ProgressDashboard userData={userData} />
      <WeightTracker
        weightData={weightData}
        currentWeight={userData.currentWeight}
        goalWeight={userData.goalWeight}
        startWeight={userData.startWeight}
        onAddEntry={addWeightEntry}
      />
      <MeasurementsTracker
        measurements={measurements}
        onUpdate={(newMeasurements) => setMeasurements(newMeasurements)}
      />
      <PhotoProgress />
      <AchievementsGallery totalWorkouts={userData.totalWorkouts} />
      <style>{`
        .progress-section h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 30px;
          background: linear-gradient(
            135deg,
            #fff 0%,
            rgba(255, 255, 255, 0.8) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
          letter-spacing: -1px;
        }
      `}</style>
    </div>
  );
}

// 69. Progress Dashboard Component
function ProgressDashboard({ userData }) {
  const weightLost = userData.startWeight - userData.currentWeight;

  return (
    <div className="progress-dashboard">
      <ProgressSummaryCard
        title="Total Workouts"
        value={userData.totalWorkouts}
        change="+12 this month"
        positive
      />
      <ProgressSummaryCard
        title="Weight Lost"
        value={`${weightLost.toFixed(1)} kg`}
        change="-1.2 kg this week"
        positive
      />
      <ProgressSummaryCard
        title="Avg. Daily Calories"
        value="1,850"
        change="+50 from last week"
      />
      <ProgressSummaryCard
        title="Streak"
        value={`${userData.streak} days`}
        change="Personal best!"
        positive
      />
      <style>{`
        .progress-dashboard {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
      `}</style>
    </div>
  );
}

// 70. Progress Summary Card Component
function ProgressSummaryCard({ title, value, change, positive }) {
  return (
    <div className="progress-summary-card">
      <h3>{title}</h3>
      <div className="value">{value}</div>
      <div className={`change ${positive ? "positive" : ""}`}>
        <TrendingUp size={16} />
        {change}
      </div>
      <style>{`
        .progress-summary-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .progress-summary-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.08);
        }
        .progress-summary-card h3 {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 10px;
        }
        .value {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .change {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
        }
        .change.positive {
          color: #06ffa5;
        }
      `}</style>
    </div>
  );
}

// 71. Weight Tracker Component
function WeightTracker({
  weightData,
  currentWeight,
  goalWeight,
  startWeight,
  onAddEntry,
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWeight, setNewWeight] = useState("");

  const handleAddWeight = () => {
    const weight = parseFloat(newWeight);
    if (weight > 0) {
      onAddEntry(weight);
      setNewWeight("");
      setShowAddModal(false);
    }
  };

  return (
    <div className="weight-tracker">
      <SectionHeader
        title="Weight Progress"
        action="Add Entry"
        onAction={() => setShowAddModal(true)}
      />
      <WeightChart data={weightData} />
      <WeightStats
        currentWeight={currentWeight}
        goalWeight={goalWeight}
        startWeight={startWeight}
      />

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add Weight Entry</h3>
            <input
              type="number"
              placeholder="Enter weight (kg)"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              step="0.1"
            />
            <div className="modal-actions">
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleAddWeight}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .weight-tracker {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 40px;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: rgba(20, 20, 20, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 30px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          width: 90%;
          max-width: 400px;
        }
        .modal-content h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .modal-content input {
          width: 100%;
          padding: 12px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .modal-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }
        .modal-actions button {
          padding: 10px 20px;
          border-radius: 20px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .modal-actions button:first-child {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
        .save-btn {
          background: linear-gradient(135deg, #ff006e, #8338ec);
          color: white;
        }
      `}</style>
    </div>
  );
}

// 72. Weight Chart Component
function WeightChart({ data }) {
  const maxWeight = Math.max(...data.map((d) => d.weight));
  const minWeight = Math.min(...data.map((d) => d.weight));
  const range = maxWeight - minWeight;

  return (
    <div className="weight-chart">
      <div className="chart-container">
        {data.map((point, index) => {
          const height = ((point.weight - minWeight) / range) * 150 || 10;
          const isLast = index === data.length - 1;

          return (
            <div key={index} className="chart-bar">
              <div
                className={`bar ${isLast ? "current" : ""}`}
                style={{ height: `${height}px` }}
              >
                <span className="weight-label">{point.weight}</span>
              </div>
              <span className="date-label">{point.date}</span>
            </div>
          );
        })}
      </div>
      <style>{`
        .weight-chart {
          margin: 30px 0;
        }
        .chart-container {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 200px;
          padding: 20px 0;
          overflow-x: auto;
          gap: 15px;
        }
        .chart-bar {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 60px;
        }
        .bar {
          width: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px 8px 0 0;
          position: relative;
          transition: all 0.3s ease;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }
        .bar.current {
          background: linear-gradient(to top, #ff006e, #8338ec);
        }
        .bar:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .weight-label {
          position: absolute;
          top: -25px;
          font-size: 12px;
          font-weight: 600;
        }
        .date-label {
          margin-top: 10px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
}

// 73. Weight Stats Component
function WeightStats({ currentWeight, goalWeight, startWeight }) {
  const totalLoss = startWeight - currentWeight;
  const toGo = currentWeight - goalWeight;
  const progress = ((totalLoss / (startWeight - goalWeight)) * 100).toFixed(1);

  return (
    <div className="weight-stats">
      <div className="stat">
        <span className="label">Current</span>
        <span className="value">{currentWeight} kg</span>
      </div>
      <div className="stat highlight">
        <span className="label">Goal</span>
        <span className="value">{goalWeight} kg</span>
      </div>
      <div className="stat">
        <span className="label">Lost</span>
        <span className="value">{totalLoss.toFixed(1)} kg</span>
      </div>
      <div className="stat">
        <span className="label">To Go</span>
        <span className="value">{toGo.toFixed(1)} kg</span>
      </div>
      <div className="stat">
        <span className="label">Progress</span>
        <span className="value">{progress}%</span>
      </div>
      <style>{`
        .weight-stats {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }
        .stat {
          flex: 1;
          min-width: 80px;
          text-align: center;
          padding: 15px 10px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        .stat:hover {
          background: rgba(255, 255, 255, 0.08);
        }
        .stat.highlight {
          background: rgba(255, 0, 110, 0.1);
          border: 1px solid rgba(255, 0, 110, 0.3);
        }
        .label {
          display: block;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 5px;
        }
        .value {
          display: block;
          font-size: 18px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

// 74. Measurements Tracker Component
function MeasurementsTracker({ measurements, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [editedMeasurements, setEditedMeasurements] = useState(measurements);

  const handleSave = () => {
    onUpdate(editedMeasurements);
    setEditing(false);
  };

  const updateMeasurement = (index, value) => {
    const updated = [...editedMeasurements];
    updated[index] = { ...updated[index], current: parseFloat(value) || 0 };
    setEditedMeasurements(updated);
  };

  return (
    <div className="measurements-tracker">
      <SectionHeader
        title="Body Measurements"
        action={editing ? "Save" : "Edit"}
        onAction={editing ? handleSave : () => setEditing(true)}
      />
      <div className="measurements-grid">
        {editedMeasurements.map((measurement, index) => (
          <MeasurementCard
            key={index}
            {...measurement}
            editing={editing}
            onUpdate={(value) => updateMeasurement(index, value)}
          />
        ))}
      </div>
      <style>{`
        .measurements-tracker {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 40px;
        }
        .measurements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

// 75. Measurement Card Component
function MeasurementCard({ area, current, previous, unit, editing, onUpdate }) {
  const change = previous - current;
  const changePercent = ((change / previous) * 100).toFixed(1);

  return (
    <div className="measurement-card">
      <h4>{area}</h4>
      {editing ? (
        <input
          type="number"
          value={current}
          onChange={(e) => onUpdate(e.target.value)}
          step="0.1"
        />
      ) : (
        <>
          <div className="current-value">
            {current} {unit}
          </div>
          <div className={`change ${change > 0 ? "positive" : "negative"}`}>
            {change > 0 ? "-" : "+"}
            {Math.abs(change)} {unit} ({changePercent}%)
          </div>
          <div className="previous">
            Previous: {previous} {unit}
          </div>
        </>
      )}
      <style>{`
        .measurement-card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s ease;
        }
        .measurement-card:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .measurement-card h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 15px;
          color: rgba(255, 255, 255, 0.9);
        }
        .measurement-card input {
          width: 100%;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-size: 16px;
        }
        .current-value {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .change {
          font-size: 14px;
          margin-bottom: 8px;
        }
        .change.positive {
          color: #06ffa5;
        }
        .change.negative {
          color: #ff006e;
        }
        .previous {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

// 76. Photo Progress Component
function PhotoProgress() {
  const [photos, setPhotos] = useState([
    { id: 1, date: "Jan 1, 2025", type: "front" },
    { id: 2, date: "Feb 1, 2025", type: "front" },
    { id: 3, date: "Mar 1, 2025", type: "front" },
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="photo-progress">
      <SectionHeader title="Progress Photos" action="Add Photo" />
      <div className="photo-timeline">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            {...photo}
            onClick={() => setSelectedPhoto(photo)}
          />
        ))}
        <AddPhotoCard />
      </div>
      <style>{`
        .photo-progress {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 40px;
        }
        .photo-timeline {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

// 77. Photo Card Component
function PhotoCard({ date, type, onClick }) {
  return (
    <div className="photo-card" onClick={onClick}>
      <div className="photo-placeholder">
        <Camera size={24} />
      </div>
      <p>{date}</p>
      <span className="photo-type">{type}</span>
      <style>{`
        .photo-card {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .photo-card:hover {
          transform: translateY(-5px);
        }
        .photo-placeholder {
          aspect-ratio: 3/4;
          background: linear-gradient(
            135deg,
            rgba(255, 0, 110, 0.1),
            rgba(131, 56, 236, 0.1)
          );
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .photo-card p {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
        }
        .photo-type {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          text-transform: capitalize;
        }
      `}</style>
    </div>
  );
}

// 78. Add Photo Card Component
function AddPhotoCard() {
  return (
    <div className="add-photo-card">
      <div className="add-placeholder">
        <Plus size={32} />
        <span>Add Photo</span>
      </div>
      <style>{`
        .add-photo-card {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .add-photo-card:hover {
          transform: translateY(-5px);
        }
        .add-placeholder {
          aspect-ratio: 3/4;
          background: rgba(255, 255, 255, 0.05);
          border: 2px dashed rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
        }
        .add-placeholder:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
        }
        .add-placeholder span {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
}

// 79. Achievements Gallery Component
function AchievementsGallery({ totalWorkouts }) {
  const achievements = [
    {
      id: 1,
      title: "First Workout",
      icon: "🎯",
      unlocked: true,
      date: "Jan 1, 2025",
    },
    {
      id: 2,
      title: "7 Day Streak",
      icon: "🔥",
      unlocked: true,
      date: "Jan 7, 2025",
    },
    {
      id: 3,
      title: "50 Workouts",
      icon: "💪",
      unlocked: totalWorkouts >= 50,
      date: totalWorkouts >= 50 ? "Feb 15, 2025" : null,
    },
    {
      id: 4,
      title: "100 Workouts",
      icon: "🏆",
      unlocked: totalWorkouts >= 100,
      date: totalWorkouts >= 100 ? "Mar 10, 2025" : null,
    },
    { id: 5, title: "Goal Weight", icon: "⭐", unlocked: false, date: null },
    { id: 6, title: "Marathon Ready", icon: "🏃‍♀️", unlocked: false, date: null },
  ];

  return (
    <div className="achievements-gallery">
      <SectionHeader title="Achievements" action="View All" />
      <div className="achievements-grid">
        {achievements.map((achievement) => (
          <AchievementBadge key={achievement.id} {...achievement} />
        ))}
      </div>
      <style>{`
        .achievements-gallery {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

// 80. Achievement Badge Component
function AchievementBadge({ title, icon, unlocked, date }) {
  return (
    <div className={`achievement-badge ${unlocked ? "unlocked" : "locked"}`}>
      <div className="badge-icon">{unlocked ? icon : "🔒"}</div>
      <h5>{title}</h5>
      {date && <span className="date">{date}</span>}
      <style>{`
        .achievement-badge {
          text-align: center;
          transition: all 0.3s ease;
        }
        .achievement-badge:hover {
          transform: translateY(-5px);
        }
        .badge-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 10px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .unlocked .badge-icon {
          background: linear-gradient(
            135deg,
            rgba(255, 183, 0, 0.2),
            rgba(255, 183, 0, 0.1)
          );
          border-color: rgba(255, 183, 0, 0.3);
          box-shadow: 0 0 20px rgba(255, 183, 0, 0.3);
        }
        .locked .badge-icon {
          filter: grayscale(1);
          opacity: 0.5;
        }
        .achievement-badge h5 {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .date {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

// 81. Community Section Component
function CommunitySection({ userData }) {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div className="community-section">
      <h1>Community</h1>
      <CommunityTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "feed" && <CommunityFeed />}
      {activeTab === "challenges" && <CommunityChallenges />}
      {activeTab === "groups" && <CommunityGroups />}
      {activeTab === "leaderboard" && <Leaderboard />}

      <style>{`
        .community-section h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 30px;
          background: linear-gradient(
            135deg,
            #fff 0%,
            rgba(255, 255, 255, 0.8) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
          letter-spacing: -1px;
        }
      `}</style>
    </div>
  );
}

// 82. Community Tabs Component
function CommunityTabs({ activeTab, setActiveTab }) {
  const tabs = ["feed", "challenges", "groups", "leaderboard"];

  return (
    <div className="community-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab ${activeTab === tab ? "active" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
      <style>{`
        .community-tabs {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 15px;
        }
        .tab {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          padding: 8px 16px;
          border-radius: 20px;
          transition: all 0.3s ease;
        }
        .tab:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }
        .tab.active {
          color: white;
          background: linear-gradient(135deg, #ff006e, #8338ec);
        }
      `}</style>
    </div>
  );
}

// 83. Community Feed Component
function CommunityFeed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Emma Wilson",
      time: "2 hours ago",
      content: "Just crushed my first 5K run! Feeling amazing 💪",
      likes: 45,
      comments: 12,
      liked: false,
    },
    {
      id: 2,
      author: "Sophia Chen",
      time: "5 hours ago",
      content:
        "New personal record on deadlifts today! Progress feels so good.",
      likes: 89,
      comments: 23,
      liked: true,
    },
  ]);

  const toggleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  return (
    <div className="community-feed">
      <CreatePost />
      {posts.map((post) => (
        <PostCard key={post.id} {...post} onLike={() => toggleLike(post.id)} />
      ))}
      <style>{`
        .community-feed {
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}

// 84. Create Post Component
function CreatePost() {
  const [postContent, setPostContent] = useState("");

  return (
    <div className="create-post">
      <textarea
        placeholder="Share your fitness journey..."
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <div className="post-actions">
        <button className="attach-btn">
          <Camera size={20} />
        </button>
        <button className="post-btn">Post</button>
      </div>
      <style>{`
        .create-post {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 30px;
        }
        .create-post textarea {
          width: 100%;
          min-height: 80px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 15px;
          color: white;
          font-size: 15px;
          resize: none;
          margin-bottom: 15px;
        }
        .create-post textarea::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        .post-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .attach-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .attach-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .post-btn {
          padding: 10px 30px;
          background: linear-gradient(135deg, #ff006e, #8338ec);
          border: none;
          border-radius: 25px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .post-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(131, 56, 236, 0.6);
        }
      `}</style>
    </div>
  );
}

// 85. Post Card Component
function PostCard({ author, time, content, likes, comments, liked, onLike }) {
  return (
    <div className="post-card">
      <div className="post-header">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`}
          alt={author}
        />
        <div>
          <h4>{author}</h4>
          <span className="time">{time}</span>
        </div>
      </div>
      <p className="post-content">{content}</p>
      <div className="post-footer">
        <button
          className={`action-btn ${liked ? "liked" : ""}`}
          onClick={onLike}
        >
          <Heart size={18} fill={liked ? "#ff006e" : "none"} />
          {likes}
        </button>
        <button className="action-btn">
          <MessageCircle size={18} />
          {comments}
        </button>
        <button className="action-btn">
          <Share2 size={18} />
        </button>
      </div>
      <style>{`
        .post-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }
        .post-card:hover {
          background: rgba(255, 255, 255, 0.08);
        }
        .post-header {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
        }
        .post-header img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        .post-header h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .time {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
        }
        .post-content {
          font-size: 15px;
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .post-footer {
          display: flex;
          gap: 20px;
        }
        .action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .action-btn:hover {
          color: white;
        }
        .action-btn.liked {
          color: #ff006e;
        }
      `}</style>
    </div>
  );
}

// 86. Community Challenges Component
function CommunityChallenges() {
  const challenges = [
    {
      id: 1,
      title: "10K Steps Daily",
      participants: 2341,
      days: 30,
      reward: "500 points",
    },
    {
      id: 2,
      title: "Plank Progress",
      participants: 1892,
      days: 21,
      reward: "300 points",
    },
    {
      id: 3,
      title: "Hydration Hero",
      participants: 3124,
      days: 7,
      reward: "100 points",
    },
  ];

  return (
    <div className="community-challenges">
      <div className="challenges-grid">
        {challenges.map((challenge) => (
          <CommunityChallenge key={challenge.id} {...challenge} />
        ))}
      </div>
      <style>{`
        .challenges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
      `}</style>
    </div>
  );
}

// 87. Community Challenge Component
function CommunityChallenge({ title, participants, days, reward }) {
  const [joined, setJoined] = useState(false);

  return (
    <div className="community-challenge">
      <div className="challenge-header">
        <Trophy size={24} color="#ffb700" />
        <h3>{title}</h3>
      </div>
      <div className="challenge-details">
        <div className="detail">
          <Users size={16} />
          <span>{participants.toLocaleString()} participants</span>
        </div>
        <div className="detail">
          <Calendar size={16} />
          <span>{days} days</span>
        </div>
        <div className="detail">
          <Award size={16} />
          <span>{reward}</span>
        </div>
      </div>
      <button
        className={`join-challenge-btn ${joined ? "joined" : ""}`}
        onClick={() => setJoined(!joined)}
      >
        {joined ? "Leave Challenge" : "Join Challenge"}
      </button>
      <style>{`
        .community-challenge {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .community-challenge:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.08);
        }
        .challenge-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }
        .challenge-header h3 {
          font-size: 20px;
          font-weight: 600;
        }
        .challenge-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 25px;
        }
        .detail {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }
        .join-challenge-btn {
          width: 100%;
          padding: 12px;
          background: rgba(255, 183, 0, 0.2);
          border: 1px solid rgba(255, 183, 0, 0.3);
          border-radius: 25px;
          color: #ffb700;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .join-challenge-btn:hover {
          background: rgba(255, 183, 0, 0.3);
        }
        .join-challenge-btn.joined {
          background: rgba(255, 0, 110, 0.2);
          border-color: rgba(255, 0, 110, 0.3);
          color: #ff006e;
        }
      `}</style>
    </div>
  );
}

// 88. Community Groups Component
function CommunityGroups() {
  const groups = [
    { id: 1, name: "Morning Warriors", members: 450, category: "Fitness" },
    { id: 2, name: "Yoga & Mindfulness", members: 823, category: "Wellness" },
    { id: 3, name: "Nutrition Nerds", members: 612, category: "Diet" },
  ];

  return (
    <div className="community-groups">
      <div className="groups-grid">
        {groups.map((group) => (
          <GroupCard key={group.id} {...group} />
        ))}
      </div>
      <style>{`
        .groups-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
      `}</style>
    </div>
  );
}

// 89. Group Card Component
function GroupCard({ name, members, category }) {
  const [joined, setJoined] = useState(false);

  return (
    <div className="group-card">
      <div className="group-icon">
        <Users size={32} />
      </div>
      <h3>{name}</h3>
      <span className="category">{category}</span>
      <p className="members">{members} members</p>
      <button
        className={`join-group-btn ${joined ? "joined" : ""}`}
        onClick={() => setJoined(!joined)}
      >
        {joined ? "Leave" : "Join"}
      </button>
      <style>{`
        .group-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          transition: all 0.3s ease;
        }
        .group-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.08);
        }
        .group-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background: linear-gradient(
            135deg,
            rgba(131, 56, 236, 0.2),
            rgba(255, 0, 110, 0.2)
          );
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .group-card h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .category {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          font-size: 12px;
          margin-bottom: 10px;
        }
        .members {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 20px;
        }
        .join-group-btn {
          width: 100%;
          padding: 10px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 25px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .join-group-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .join-group-btn.joined {
          background: linear-gradient(135deg, #ff006e, #8338ec);
          border: none;
        }
      `}</style>
    </div>
  );
}

// 90. Leaderboard Component
function Leaderboard() {
  const leaders = [
    { rank: 1, name: "Jessica Chen", points: 2450, change: "up" },
    { rank: 2, name: "Emma Wilson", points: 2380, change: "up" },
    { rank: 3, name: "Sarah Johnson", points: 2290, change: "same" },
    { rank: 4, name: "Maria Garcia", points: 2150, change: "down" },
    { rank: 5, name: "Sophia Williams", points: 2050, change: "up" },
  ];

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h2>This Week's Top Performers</h2>
        <select className="timeframe">
          <option>This Week</option>
          <option>This Month</option>
          <option>All Time</option>
        </select>
      </div>
      <div className="leaders-list">
        {leaders.map((leader) => (
          <LeaderboardItem key={leader.rank} {...leader} />
        ))}
      </div>
      <style>{`
        .leaderboard {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          max-width: 600px;
          margin: 0 auto;
        }
        .leaderboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }
        .leaderboard-header h2 {
          font-size: 20px;
          font-weight: 600;
        }
        .timeframe {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          color: white;
          font-size: 14px;
          cursor: pointer;
        }
        .leaders-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
      `}</style>
    </div>
  );
}

// 91. Leaderboard Item Component
function LeaderboardItem({ rank, name, points, change }) {
  const getRankIcon = () => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  return (
    <div className="leaderboard-item">
      <div className="rank">{getRankIcon()}</div>
      <img
        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
        alt={name}
      />
      <div className="user-info">
        <h4>{name}</h4>
        <span className="points">{points.toLocaleString()} points</span>
      </div>
      <div className={`change ${change}`}>
        {change === "up" && <TrendingUp size={16} />}
        {change === "down" && (
          <ChevronRight size={16} style={{ transform: "rotate(90deg)" }} />
        )}
        {change === "same" && <Minus size={16} />}
      </div>
      <style>{`
        .leaderboard-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        .leaderboard-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .rank {
          font-size: 20px;
          font-weight: 700;
          min-width: 30px;
        }
        .leaderboard-item img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        .user-info {
          flex: 1;
        }
        .user-info h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .points {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
        }
        .change {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .change.up {
          color: #06ffa5;
        }
        .change.down {
          color: #ff006e;
        }
        .change.same {
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

// 92. Profile Section Component
function ProfileSection({ userData, setUserData }) {
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);

  const handleSave = () => {
    setUserData(editedData);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setEditing(false);
  };

  return (
    <div className="profile-section">
      <h1>Profile</h1>
      <ProfileHeader
        userData={editing ? editedData : userData}
        editing={editing}
        onEdit={() => setEditing(true)}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <ProfileDetails
        userData={editing ? editedData : userData}
        editing={editing}
        onChange={setEditedData}
      />
      <ProfileSettings />
      <style>{`
        .profile-section h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 30px;
          background: linear-gradient(
            135deg,
            #fff 0%,
            rgba(255, 255, 255, 0.8) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
          letter-spacing: -1px;
        }
      `}</style>
    </div>
  );
}

// 93. Profile Header Component
function ProfileHeader({ userData, editing, onEdit, onSave, onCancel }) {
  return (
    <div className="profile-header">
      <div className="profile-cover"></div>
      <div className="profile-info">
        <div className="profile-avatar-large">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=FitUser"
            alt="Profile"
          />
          {editing && (
            <button className="change-photo">
              <Camera size={20} />
            </button>
          )}
        </div>
        <div className="profile-details">
          <h2>{userData.name}</h2>
          <p>{userData.email}</p>
          <div className="profile-stats">
            <div className="stat">
              <span className="value">{userData.totalWorkouts}</span>
              <span className="label">Workouts</span>
            </div>
            <div className="stat">
              <span className="value">{userData.streak}</span>
              <span className="label">Day Streak</span>
            </div>
            <div className="stat">
              <span className="value">
                {(userData.startWeight - userData.currentWeight).toFixed(1)}kg
              </span>
              <span className="label">Lost</span>
            </div>
          </div>
        </div>
        <div className="profile-actions">
          {editing ? (
            <>
              <button className="cancel-btn" onClick={onCancel}>
                Cancel
              </button>
              <button className="save-btn" onClick={onSave}>
                Save Changes
              </button>
            </>
          ) : (
            <button className="edit-btn" onClick={onEdit}>
              <Edit size={16} />
              Edit Profile
            </button>
          )}
        </div>
      </div>
      <style>{`
        .profile-header {
          position: relative;
          margin-bottom: 40px;
        }
        .profile-cover {
          height: 200px;
          background: linear-gradient(135deg, #ff006e 0%, #8338ec 100%);
          border-radius: 20px;
        }
        .profile-info {
          position: relative;
          display: flex;
          align-items: center;
          gap: 30px;
          padding: 20px 30px 30px;
          margin-top: -60px;
        }
        .profile-avatar-large {
          position: relative;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid #141414;
          background: white;
          flex-shrink: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        .profile-avatar-large img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .change-photo {
          position: absolute;
          bottom: 5px;
          right: 5px;
          background: rgba(20, 20, 20, 0.8);
          backdrop-filter: blur(10px);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .change-photo:hover {
          background: rgba(20, 20, 20, 0.9);
          transform: scale(1.1);
        }
        .profile-details {
          flex: 1;
        }
        .profile-details h2 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .profile-details p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 15px;
        }
        .profile-stats {
          display: flex;
          gap: 30px;
        }
        .profile-stats .stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .profile-stats .value {
          font-size: 20px;
          font-weight: 600;
        }
        .profile-stats .label {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
        }
        .profile-actions {
          display: flex;
          gap: 10px;
        }
        .edit-btn,
        .save-btn,
        .cancel-btn {
          padding: 10px 20px;
          border-radius: 25px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .edit-btn {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
        .save-btn {
          background: linear-gradient(135deg, #06ffa5, #0099ff);
          color: white;
        }
        .cancel-btn {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }
        @media (max-width: 768px) {
          .profile-info {
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-top: -40px;
          }
          .profile-avatar-large {
            margin-top: -60px;
          }
          .profile-stats {
            justify-content: center;
          }
          .profile-actions {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

// 94. Profile Details Component
function ProfileDetails({ userData, editing, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...userData, [field]: value });
  };

  return (
    <div className="profile-details-section">
      <div className="details-grid">
        <DetailCard title="Personal Information">
          <DetailRow
            label="Full Name"
            value={userData.name}
            editing={editing}
            onChange={(value) => handleChange("name", value)}
          />
          <DetailRow
            label="Email"
            value={userData.email}
            editing={editing}
            onChange={(value) => handleChange("email", value)}
          />
          <DetailRow
            label="Phone"
            value={userData.phone}
            editing={editing}
            onChange={(value) => handleChange("phone", value)}
          />
          <DetailRow
            label="Birthday"
            value={userData.birthday}
            editing={editing}
            onChange={(value) => handleChange("birthday", value)}
          />
        </DetailCard>

        <DetailCard title="Fitness Goals">
          <DetailRow
            label="Height"
            value={`${userData.height} cm`}
            editing={editing}
            onChange={(value) => handleChange("height", parseInt(value))}
            type="number"
          />
          <DetailRow
            label="Current Weight"
            value={`${userData.currentWeight} kg`}
            editing={editing}
            onChange={(value) =>
              handleChange("currentWeight", parseFloat(value))
            }
            type="number"
          />
          <DetailRow
            label="Goal Weight"
            value={`${userData.goalWeight} kg`}
            editing={editing}
            onChange={(value) => handleChange("goalWeight", parseFloat(value))}
            type="number"
          />
          <DetailRow
            label="Activity Level"
            value="Moderate"
            editing={editing}
          />
        </DetailCard>
      </div>
      <style>{`
        .profile-details-section {
          margin-bottom: 40px;
        }
        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 20px;
        }
      `}</style>
    </div>
  );
}

// 95. Detail Card Component
function DetailCard({ title, children }) {
  return (
    <div className="detail-card">
      <h3>{title}</h3>
      <div className="detail-content">{children}</div>
      <style>{`
        .detail-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .detail-card h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .detail-content {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
      `}</style>
    </div>
  );
}

// 96. Detail Row Component
function DetailRow({ label, value, editing, onChange, type = "text" }) {
  return (
    <div className="detail-row">
      <span className="label">{label}</span>
      {editing ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <span className="value">{value}</span>
      )}
      <style>{`
        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .label {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
        }
        .value {
          font-size: 14px;
          font-weight: 500;
        }
        .detail-row input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 6px 12px;
          color: white;
          font-size: 14px;
          text-align: right;
          width: 150px;
        }
      `}</style>
    </div>
  );
}

// 97. Profile Settings Component
function ProfileSettings() {
  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    mealReminders: true,
    communityUpdates: false,
    achievements: true,
  });

  const toggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  return (
    <div className="profile-settings">
      <h2>Settings & Preferences</h2>
      <div className="settings-grid">
        <SettingsCard title="Notifications">
          <ToggleSetting
            label="Workout Reminders"
            enabled={notifications.workoutReminders}
            onToggle={() => toggleNotification("workoutReminders")}
          />
          <ToggleSetting
            label="Meal Reminders"
            enabled={notifications.mealReminders}
            onToggle={() => toggleNotification("mealReminders")}
          />
          <ToggleSetting
            label="Community Updates"
            enabled={notifications.communityUpdates}
            onToggle={() => toggleNotification("communityUpdates")}
          />
          <ToggleSetting
            label="Achievement Alerts"
            enabled={notifications.achievements}
            onToggle={() => toggleNotification("achievements")}
          />
        </SettingsCard>

        <SettingsCard title="Privacy">
          <ToggleSetting label="Profile Visibility" enabled={true} />
          <ToggleSetting label="Share Progress" enabled={false} />
          <ToggleSetting label="Show Activity" enabled={true} />
        </SettingsCard>

        <SettingsCard title="Account">
          <button className="settings-btn">Change Password</button>
          <button className="settings-btn">Export Data</button>
          <button className="settings-btn danger">Delete Account</button>
        </SettingsCard>
      </div>
      <style>{`
        .profile-settings h2 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 25px;
        }
        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .settings-btn {
          width: 100%;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 10px;
        }
        .settings-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .settings-btn.danger {
          color: #ff006e;
          border-color: rgba(255, 0, 110, 0.3);
        }
        .settings-btn.danger:hover {
          background: rgba(255, 0, 110, 0.1);
        }
      `}</style>
    </div>
  );
}

// 98. Settings Card Component
function SettingsCard({ title, children }) {
  return (
    <div className="settings-card">
      <h3>{title}</h3>
      <div className="settings-content">{children}</div>
      <style>{`
        .settings-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .settings-card h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .settings-content {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
      `}</style>
    </div>
  );
}

// 99. Toggle Setting Component
function ToggleSetting({ label, enabled, onToggle }) {
  return (
    <div className="toggle-setting">
      <span>{label}</span>
      <button
        className={`toggle ${enabled ? "enabled" : ""}`}
        onClick={onToggle}
      >
        <span className="toggle-slider"></span>
      </button>
      <style>{`
        .toggle-setting {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
        }
        .toggle-setting span {
          font-size: 14px;
        }
        .toggle {
          position: relative;
          width: 48px;
          height: 24px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 24px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .toggle.enabled {
          background: linear-gradient(135deg, #06ffa5, #0099ff);
        }
        .toggle-slider {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transition: transform 0.3s ease;
        }
        .toggle.enabled .toggle-slider {
          transform: translateX(24px);
        }
      `}</style>
    </div>
  );
}