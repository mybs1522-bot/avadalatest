import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SecureVideoPlayer } from '../components/SecureVideoPlayer';
import { PRODUCTS, COURSES } from '../constants';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  PlayCircle, Lock, ShieldCheck, Clock, BookOpen, UserCheck, 
  Sparkles, CheckCircle2, LogOut, Video, FileText, ChevronRight
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
}

interface CourseModule {
  id: string;
  name: string;
  lessons: Lesson[];
}

const DRIVE_FOLDER_ID = '10O3hKlhf_grkBH4KRbJ0vxxCBk4im0kw';

const COURSE_MODULES: CourseModule[] = [
  {
    id: 'module-1',
    name: 'Module 1: SketchUp & V-Ray Essentials',
    lessons: [
      {
        id: 'l1',
        title: '01. SketchUp Workspace & 3D Modeling Fundamentals',
        duration: '18 min',
        videoUrl: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDER_ID}#grid`,
        description: 'Complete guide to setting up your SketchUp 3D workspace, camera controls, and shortcut keys.'
      },
      {
        id: 'l2',
        title: '02. V-Ray Exterior Sunlight & HDRI Environment Setup',
        duration: '24 min',
        videoUrl: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDER_ID}#grid`,
        description: 'Master photorealistic exterior sunlighting, dome lights, and HDRI sky maps.'
      },
      {
        id: 'l3',
        title: '03. V-Ray Materials & Realistic Surface Texturing',
        duration: '31 min',
        videoUrl: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDER_ID}#grid`,
        description: 'Creating realistic glass, polished concrete, wood grains, and metallic surfaces.'
      }
    ]
  },
  {
    id: 'module-2',
    name: 'Module 2: D5 Render Real-Time Visualization',
    lessons: [
      {
        id: 'l4',
        title: '04. D5 Render Real-Time Lighting & Asset Library',
        duration: '22 min',
        videoUrl: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDER_ID}#grid`,
        description: 'Importing models into D5 Render, setting up real-time raytracing, and scattering foliage.'
      },
      {
        id: 'l5',
        title: '05. Creating Cinematic Walkthrough Animations in D5',
        duration: '29 min',
        videoUrl: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDER_ID}#grid`,
        description: 'Setting up keyframe animation paths, depth of field, and rendering 4K video walkthroughs.'
      }
    ]
  },
  {
    id: 'module-3',
    name: 'Module 3: Complete Architecture Master Library',
    lessons: [
      {
        id: 'l6',
        title: '06. AutoCAD 2D Blueprints to 3D Revit BIM Model',
        duration: '35 min',
        videoUrl: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDER_ID}#grid`,
        description: 'Convert 2D CAD floor plans into parametric 3D Revit BIM models ready for construction.'
      },
      {
        id: 'l7',
        title: '07. Photoshop Post-Production & Final Render Polish',
        duration: '20 min',
        videoUrl: `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDER_ID}#grid`,
        description: 'Color correction, adding scale figures, sky replacements, and portfolio post-processing.'
      }
    ]
  }
];

export default function StudentPortal() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check existing session
  const [user, setUser] = useState<{ email: string; name: string; trialActive: boolean } | null>(() => {
    const saved = localStorage.getItem('student_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [activeModule, setActiveModule] = useState<CourseModule>(COURSE_MODULES[0]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(COURSE_MODULES[0].lessons[0]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPhone.trim()) {
      alert('Please enter your registered Email and Phone number');
      return;
    }

    const newUser = {
      email: loginEmail.trim(),
      name: loginEmail.split('@')[0],
      trialActive: true,
    };

    localStorage.setItem('student_session', JSON.stringify(newUser));
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('student_session');
    setUser(null);
  };

  // If user is not logged in, show student login form
  if (!user) {
    return (
      <div className="min-h-screen bg-muted/20 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Card className="border-border shadow-2xl overflow-hidden">
            <CardHeader className="bg-zinc-900 text-white p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <UserCheck size={24} />
              </div>
              <CardTitle className="text-2xl font-bold">Student Portal Login</CardTitle>
              <p className="text-xs text-zinc-400 mt-1">Access your 2-Day Trial Course Library & Video Stream</p>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                    Registered Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                    UPI Linked Mobile Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 shadow-lg shadow-emerald-600/25">
                  Sign In To Access Courses <ChevronRight size={18} className="ml-1" />
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-xs text-muted-foreground mb-3">Haven't started your 2-Day Free Trial yet?</p>
                <Button variant="outline" className="w-full text-xs font-semibold" onClick={() => navigate('/checkout')}>
                  <Sparkles size={14} className="mr-1 text-emerald-500" /> Start 2-Day Free Trial (₹0 Today)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      {/* ═══════ TOP STUDENT HEADER ═══════ */}
      <div className="bg-zinc-900 text-white border-b border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-2">
                <Sparkles size={12} /> 2-DAY FREE TRIAL ACTIVE
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome, <span className="text-emerald-400 capitalize">{user.name}</span>
              </h1>
              <p className="text-xs text-zinc-400 mt-1">Full unrestricted access to all architecture & rendering masterclasses.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-xl text-right">
                <p className="text-[10px] text-zinc-400 font-mono">TRIAL STATUS</p>
                <p className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Clock size={12} /> 48 Hours Remaining
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                <LogOut size={14} className="mr-1" /> Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ MAIN COURSE PLAYER & MODULE LIBRARY ═══════ */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left / Top 2 Cols: Protected Video Player */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-600 mb-2">
                <Video size={14} /> Currently Watching
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-tight mb-2">
                {selectedLesson.title}
              </h2>
              <p className="text-sm text-muted-foreground">{selectedLesson.description}</p>
            </div>

            {/* Anti-Download DRM Protected Player */}
            <SecureVideoPlayer
              videoUrl={selectedLesson.videoUrl}
              title={selectedLesson.title}
              userEmail={user.email}
            />

            {/* Features & Security Shield Info */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Anti-Download DRM Active:</strong> This video is protected against unauthorized downloads, screen copying, and link scraping. Enjoy continuous HD streaming on your registered device.
              </div>
            </div>
          </div>

          {/* Right Col: Course Modules & Lessons List */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <BookOpen size={18} className="text-emerald-600" /> Course Curriculum
                </h3>
                <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-600 px-2.5 py-1 rounded-full">
                  7 Lessons
                </span>
              </div>

              {/* Module Accordions */}
              <div className="space-y-4">
                {COURSE_MODULES.map((module) => (
                  <div key={module.id} className="border border-border/70 rounded-xl overflow-hidden">
                    <div className="bg-muted/40 px-3 py-2.5 font-bold text-xs text-foreground uppercase tracking-wide border-b border-border/50 flex justify-between items-center">
                      <span>{module.name}</span>
                      <span className="text-[10px] text-muted-foreground font-normal">{module.lessons.length} videos</span>
                    </div>

                    <div className="divide-y divide-border/40">
                      {module.lessons.map((lesson) => {
                        const isSelected = selectedLesson.id === lesson.id;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              setActiveModule(module);
                              setSelectedLesson(lesson);
                            }}
                            className={`w-full p-3 text-left flex items-start gap-3 transition-all ${
                              isSelected 
                                ? 'bg-emerald-500/10 border-l-4 border-emerald-500 font-semibold' 
                                : 'hover:bg-muted/50'
                            }`}
                          >
                            <PlayCircle size={16} className={`shrink-0 mt-0.5 ${isSelected ? 'text-emerald-600' : 'text-muted-foreground'}`} />
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs leading-snug truncate ${isSelected ? 'text-emerald-700 dark:text-emerald-300 font-bold' : 'text-foreground'}`}>
                                {lesson.title}
                              </p>
                              <span className="text-[10px] text-muted-foreground mt-0.5 block">{lesson.duration} • HD Stream</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Google Drive Resource Link */}
            <div className="bg-zinc-900 text-white rounded-2xl p-5 border border-zinc-800">
              <h4 className="font-bold text-sm mb-1 flex items-center gap-2 text-emerald-400">
                <FileText size={16} /> Drive Resource Folder
              </h4>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                Access exercise files, 3D SketchUp assets, and project materials directly in your stream.
              </p>
              <Button size="sm" variant="outline" className="w-full border-zinc-700 text-zinc-200 hover:bg-zinc-800 text-xs" asChild>
                <a href={`https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}`} target="_blank" rel="noreferrer">
                  Open Project Materials Folder
                </a>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
