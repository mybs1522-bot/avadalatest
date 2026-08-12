import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SecureVideoPlayer } from '../components/SecureVideoPlayer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  PlayCircle, Lock, ShieldCheck, Clock, BookOpen, UserCheck, 
  Sparkles, LogOut, Video, ArrowLeft, ChevronRight, CheckCircle2
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

interface CourseItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  badge: string;
  totalLessons: number;
  modules: CourseModule[];
}

const COURSES_PORTAL_DATA: CourseItem[] = [
  {
    id: 'sketchup-vray-d5',
    title: 'Sketchup + Vray + D5 Render Complete Workflow',
    subtitle: 'Architectural 3D Modeling & Real-Time Visualization',
    description: 'Master 3D modeling in SketchUp, photorealistic exterior & interior rendering in V-Ray, and cinematic 4K animations in D5 Render.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    badge: '3 Modules • 7 Lessons',
    totalLessons: 7,
    modules: [
      {
        id: 'mod-1',
        name: 'Module 1: SketchUp & V-Ray Core Workflow',
        lessons: [
          {
            id: 'l1',
            title: '01. SketchUp Workspace & 3D Modeling Fundamentals',
            duration: '18 min',
            videoUrl: 'https://drive.google.com/file/d/1QBgN98YL4hdIgB7J9wyc8OpNOYeYMvxO/preview',
            description: 'Complete guide to setting up your SketchUp 3D workspace, camera controls, and shortcut keys.'
          },
          {
            id: 'l2',
            title: '02. V-Ray Exterior Sunlight & HDRI Setup',
            duration: '24 min',
            videoUrl: 'https://drive.google.com/file/d/1EmKelOgblDsBTdm7_PrXytEOMTdwItcm/preview',
            description: 'Master photorealistic exterior sunlighting, dome lights, and HDRI sky maps.'
          },
          {
            id: 'l3',
            title: '03. V-Ray Materials & Realistic Surface Textures',
            duration: '31 min',
            videoUrl: 'https://drive.google.com/file/d/1v3RSZOwwMk3bdLEVnsRASNuW6-fWTq_w/preview',
            description: 'Creating realistic glass, polished concrete, wood grains, and metallic surfaces.'
          }
        ]
      },
      {
        id: 'mod-2',
        name: 'Module 2: Advanced Rendering & Lighting Pass',
        lessons: [
          {
            id: 'l4',
            title: '04. Interior Lighting & Camera Exposure Control',
            duration: '22 min',
            videoUrl: 'https://drive.google.com/file/d/156QUihh-1d1f0wZ6boXclQlDPFAtUAhY/preview',
            description: 'Set up artificial interior lights, IES profiles, and camera exposure.'
          },
          {
            id: 'l5',
            title: '05. High-Resolution Rendering & AI Denoising',
            duration: '29 min',
            videoUrl: 'https://drive.google.com/file/d/10AgJvh6Ezoi3XdgYlF6VhV7mNQ7KyE-I/preview',
            description: 'Render settings for crisp 4K outputs, GPU acceleration, and AI denoising.'
          }
        ]
      },
      {
        id: 'mod-3',
        name: 'Module 3: D5 Render Real-Time Visualization',
        lessons: [
          {
            id: 'l6',
            title: '06. Real-Time Environment & Foliage Scattering',
            duration: '35 min',
            videoUrl: 'https://drive.google.com/file/d/10tFTa6jtLOJrBRGdsJlVE234GJsVMV6p/preview',
            description: 'Real-time raytracing, scattering trees, grass, and dynamic weather effects.'
          },
          {
            id: 'l7',
            title: '07. Cinematic Walkthrough Camera Paths',
            duration: '20 min',
            videoUrl: 'https://drive.google.com/file/d/1Hgl_oHb-ZMDWS2bevBrqbxV3qMZLiHcb/preview',
            description: 'Keyframe camera movement, depth of field, and video export settings.'
          }
        ]
      }
    ]
  },
  {
    id: 'masterclass-series-6',
    title: 'Master Architectural Visualization Series 6',
    subtitle: 'PBR Shading, Atmospheric Fog & Real-Time Render Pipeline',
    description: 'Learn advanced PBR shader creation, volumetric fog, atmospheric god rays, and smooth 60FPS walkthrough camera animations.',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    badge: '1 Module • 7 Lessons',
    totalLessons: 7,
    modules: [
      {
        id: 'mod-4',
        name: 'Master Series 6 Complete Masterclass',
        lessons: [
          {
            id: 'l8',
            title: '08. Master Series 6.1 — Lighting & Scene Setup',
            duration: '25 min',
            videoUrl: 'https://drive.google.com/file/d/1Ov1R2dYA9XAs0FRMLJYk7qY5jRXMxTpg/preview',
            description: 'Setting up master scene environment, camera composition, and sun angles.'
          },
          {
            id: 'l9',
            title: '09. Master Series 6.2 — Environment & Landscape',
            duration: '27 min',
            videoUrl: 'https://drive.google.com/file/d/1dFKiQ9Pq2HfrwFwxyDw4YTVy7GNLMZl8/preview',
            description: 'Adding 3D trees, grass assets, terrain modeling, and outdoor hardscaping.'
          },
          {
            id: 'l10',
            title: '10. Master Series 6.3 — Material & Shading Workflows',
            duration: '30 min',
            videoUrl: 'https://drive.google.com/file/d/19RsFIFgrJCKbd28wDLLeVghvDoPojiHi/preview',
            description: 'PBR shading workflows, PBR textures, and realistic displacement maps.'
          },
          {
            id: 'l11',
            title: '11. Master Series 6.4 — Camera Angles & Framing',
            duration: '21 min',
            videoUrl: 'https://drive.google.com/file/d/1O7oR1PEaafFI8vSKHM12H0S8pwPJGT8H/preview',
            description: 'Architectural photography principles, two-point perspective, and rule of thirds.'
          },
          {
            id: 'l12',
            title: '12. Master Series 6.5 — Atmospheric & Fog Effects',
            duration: '28 min',
            videoUrl: 'https://drive.google.com/file/d/1vmH4winaH1qkjX_fRqzZnTYUdY5RKxOc/preview',
            description: 'Volumetric fog, god rays, atmospheric haze, and realistic cloud layers.'
          },
          {
            id: 'l13',
            title: '13. Master Series 6.6 — D5 Realtime Render Pipeline',
            duration: '34 min',
            videoUrl: 'https://drive.google.com/file/d/1uMJ4PnOu61_-_74KHWzLAHacYtxZlFeG/preview',
            description: 'Real-time raytracing setup, asset scattering, and 4K animation output.'
          },
          {
            id: 'l14',
            title: '14. Master Series 6.7 — Cinematic Walkthrough Paths',
            duration: '23 min',
            videoUrl: 'https://drive.google.com/file/d/1VQ9YvGCJ9TtfAgy-YrMiMPnmSMQ27O0L/preview',
            description: 'Smooth camera animation paths, transition cuts, and 60FPS video rendering.'
          }
        ]
      }
    ]
  },
  {
    id: 'post-production-photoshop',
    title: 'Photoshop Post-Production & Color Grading',
    subtitle: 'Compositing, Scale Figures & Portfolio Layout',
    description: 'Transform raw renders into award-winning portfolio assets with Photoshop compositing, scale human figures, and Camera Raw color tuning.',
    imageUrl: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
    badge: '1 Module • 2 Lessons',
    totalLessons: 2,
    modules: [
      {
        id: 'mod-5',
        name: 'Photoshop Post-Production Masterclass',
        lessons: [
          {
            id: 'l15',
            title: '15. Post-Production — Sky & Human Figures',
            duration: '25 min',
            videoUrl: 'https://drive.google.com/file/d/17WzsGZzwN5419Fo1gDWyowx56Dv5uoOL/preview',
            description: 'Adding realistic skies, scale figures, vegetation, and lighting passes in Photoshop.'
          },
          {
            id: 'l16',
            title: '16. Portfolio Presentation & Camera Raw Grading',
            duration: '28 min',
            videoUrl: 'https://drive.google.com/file/d/1XXcEbzH3pedqDpkGkXhgPfqQkqDKrUJ2/preview',
            description: 'Color grading, Camera Raw filters, contrast tuning, and architectural portfolio layout.'
          }
        ]
      }
    ]
  },
  {
    id: 'advanced-series-8',
    title: 'Advanced Luxury Architecture Series 8',
    subtitle: 'Facade Design, Interior Ambiance & Night Scene Rendering',
    description: 'Design luxury residential facades, warm interior mood lighting, high-poly vegetation scattering, and 8K commercial rendering.',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    badge: '1 Module • 6 Lessons',
    totalLessons: 6,
    modules: [
      {
        id: 'mod-6',
        name: 'Advanced Series 8 Complete Masterclass',
        lessons: [
          {
            id: 'l17',
            title: '17. Series 8.1 — Exterior Architectural Design',
            duration: '31 min',
            videoUrl: 'https://drive.google.com/file/d/1-koPhy3_o9wffoEsTmgyVo89VLvNJbfl/preview',
            description: 'Modern luxury residential facade modeling, glass curtain walls, and exterior details.'
          },
          {
            id: 'l18',
            title: '18. Series 8.2 — Interior Lighting Masterclass',
            duration: '29 min',
            videoUrl: 'https://drive.google.com/file/d/1qXgyjH12P30uvXUvhQ7PXNO1jW2ZhpRD/preview',
            description: 'Cozy mood lighting, cove LED strips, spotlighting art, and realistic interior ambiance.'
          },
          {
            id: 'l19',
            title: '19. Series 8.3 — Parametric Geometry & Curved Surfaces',
            duration: '27 min',
            videoUrl: 'https://drive.google.com/file/d/1zh8Ms7tiaHW4ww3Xo8AySxDwpA1lTbIa/preview',
            description: 'Modeling complex parametric ceilings, acoustic wall panels, and custom furniture.'
          },
          {
            id: 'l20',
            title: '20. Series 8.4 — Advanced Vegetation & Site Landscape',
            duration: '33 min',
            videoUrl: 'https://drive.google.com/file/d/1WD98jJznJhTY-eXIom14dERFzX6Ju2eD/preview',
            description: 'High-poly 3D plant scatter, garden landscaping, water features, and pool reflection.'
          },
          {
            id: 'l21',
            title: '21. Series 8.5 — Dusk & Night Lighting Scene',
            duration: '26 min',
            videoUrl: 'https://drive.google.com/file/d/1W_IgwFKYKl9i3tYCACkc7qsmVqpEgEkk/preview',
            description: 'Dusk sky lighting setup, artificial interior glow, and exterior garden landscape lights.'
          },
          {
            id: 'l22',
            title: '22. Series 8.6 — Commercial Render Polish & Final Output',
            duration: '36 min',
            videoUrl: 'https://drive.google.com/file/d/1bgajytPRjkAzbWPRrDanOn28lasZGmWu/preview',
            description: 'Final 8K commercial rendering, EXR element passes, glare/bloom effects, and client delivery.'
          }
        ]
      }
    ]
  }
];

export default function StudentPortal() {
  const navigate = useNavigate();

  // Check existing session
  const [user, setUser] = useState<{ email: string; name: string; trialActive: boolean } | null>(() => {
    const saved = localStorage.getItem('student_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPhone, setLoginPhone] = useState('');

  // Selected course state (null = show course thumbnail grid view)
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

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
    setSelectedCourse(null);
  };

  const handleSelectCourse = (course: CourseItem) => {
    setSelectedCourse(course);
    if (course.modules.length > 0 && course.modules[0].lessons.length > 0) {
      setSelectedLesson(course.modules[0].lessons[0]);
    }
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        
        {/* ═══════ STEP 1: COURSE THUMBNAIL GRID VIEW ═══════ */}
        {!selectedCourse ? (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-foreground mb-1">Your Course Library</h2>
              <p className="text-sm text-muted-foreground">Select any course below to watch lessons with DRM anti-download stream protection.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {COURSES_PORTAL_DATA.map((course) => (
                <Card 
                  key={course.id} 
                  className="overflow-hidden flex flex-col group border-2 border-border hover:border-emerald-500/50 transition-all duration-300 shadow-md hover:shadow-2xl cursor-pointer"
                  onClick={() => handleSelectCourse(course)}
                >
                  <div className="aspect-video relative overflow-hidden bg-zinc-900">
                    <img 
                      src={course.imageUrl} 
                      alt={course.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <Sparkles size={12} /> {course.badge}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <span className="text-xs font-semibold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                        {course.totalLessons} Videos Included
                      </span>
                      <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-emerald-600/50">
                        <PlayCircle size={20} className="text-white fill-white" />
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-1.5 group-hover:text-emerald-600 transition-colors leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                        {course.subtitle}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-border flex items-center justify-between">
                      <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                        <CheckCircle2 size={14} className="text-emerald-500" /> Full HD 4K Stream
                      </span>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20">
                        Watch Videos <ChevronRight size={14} className="ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* ═══════ STEP 2: SINGLE COURSE VIDEO PLAYER VIEW ═══════ */
          <div className="space-y-6">
            {/* Back Button & Course Title */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedCourse(null)}
                className="text-xs font-bold border-border text-foreground hover:bg-muted"
              >
                <ArrowLeft size={16} className="mr-1.5" /> Back to Course Library
              </Button>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">
                {selectedCourse.title}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left 2 Cols: Single Video Stream Player */}
              <div className="lg:col-span-2 space-y-6">
                {selectedLesson && (
                  <>
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-600 mb-2">
                        <Video size={14} /> Currently Watching
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-tight mb-2">
                        {selectedLesson.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">{selectedLesson.description}</p>
                    </div>

                    {/* Protected Single Video Player */}
                    <SecureVideoPlayer
                      videoUrl={selectedLesson.videoUrl}
                      title={selectedLesson.title}
                      userEmail={user.email}
                    />
                  </>
                )}

                {/* Features & Security Shield Info */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Anti-Download DRM Active:</strong> This video is streaming with single-stream anti-download protection, inspect element blocking, and user session watermark.
                  </div>
                </div>
              </div>

              {/* Right Col: Lessons Checklist for Selected Course */}
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-sm">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
                    <h3 className="font-bold text-base flex items-center gap-2">
                      <BookOpen size={18} className="text-emerald-600" /> Course Lessons
                    </h3>
                    <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-600 px-2.5 py-1 rounded-full">
                      {selectedCourse.totalLessons} Videos
                    </span>
                  </div>

                  {/* Module Accordions */}
                  <div className="space-y-4">
                    {selectedCourse.modules.map((module) => (
                      <div key={module.id} className="border border-border/70 rounded-xl overflow-hidden">
                        <div className="bg-muted/40 px-3 py-2.5 font-bold text-xs text-foreground uppercase tracking-wide border-b border-border/50 flex justify-between items-center">
                          <span>{module.name}</span>
                          <span className="text-[10px] text-muted-foreground font-normal">{module.lessons.length} videos</span>
                        </div>

                        <div className="divide-y divide-border/40">
                          {module.lessons.map((lesson) => {
                            const isSelected = selectedLesson?.id === lesson.id;
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => setSelectedLesson(lesson)}
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
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
