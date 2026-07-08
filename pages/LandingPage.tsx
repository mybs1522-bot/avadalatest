import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../lib/data';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { TESTIMONIALS_LANDING, FAQ_ITEMS_LANDING, SocialProofToast, FEAR_STATS, COURSES_LANDING } from './LandingHelpers';
import { Star, CheckCircle, ChevronDown, ArrowRight, Zap, ShieldCheck, Users, PlayCircle } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <SocialProofToast />
      
      {/* ═══════ HERO ═══════ */}
      <section className="w-full py-20 md:py-32 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30 border-b border-border/40">
        <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-6 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
          <Zap size={14} className="fill-primary" /> Trusted by 50,000+ architects & designers
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl mb-6 max-w-4xl leading-[1.1]">
          Master <span className="text-primary">Architecture</span> Design & Visualization
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Learn SketchUp, V-Ray, D5 Render, Lumion, AI Design and more. 
          Get lifetime access, 24/7 support, and a career-ready portfolio.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <Button size="lg" className="text-lg px-8 py-6 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow" onClick={() => navigate(`/product/${PRODUCTS[0].id}`)}>
            Get Started — ₹{PRODUCTS[0].price} <ArrowRight size={18} className="ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
            View All Courses
          </Button>
        </div>
        <div className="flex items-center gap-6 text-xs font-medium text-muted-foreground">
          <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-primary" /> 7-Day Money Back</span>
          <span className="flex items-center gap-1"><Zap size={14} className="text-primary" /> Instant Access</span>
          <span className="flex items-center gap-1"><Users size={14} className="text-primary" /> 24/7 Support</span>
        </div>
      </section>

      {/* ═══════ STATS BAR ═══════ */}
      <section className="w-full py-12 bg-zinc-900 text-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {FEAR_STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">{s.stat}</div>
              <p className="text-xs md:text-sm text-zinc-400 leading-snug max-w-[200px] mx-auto">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ FEATURED PRODUCTS ═══════ */}
      <section id="products" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Our Bundles</p>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Choose Your Path</h2>
            <p className="text-muted-foreground text-lg">Pick a bundle and start learning today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PRODUCTS.map((product) => (
              <Card key={product.id} className="overflow-hidden flex flex-col group border-2 border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl">
                <div className="aspect-video relative overflow-hidden bg-zinc-100">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    90% OFF
                  </div>
                </div>
                <CardContent className="p-6 flex-1">
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-primary">₹{product.price}</span>
                    <span className="text-lg text-muted-foreground line-through">₹{product.price * 10}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex flex-col gap-3">
                  <Button className="w-full text-base py-5 shadow-md shadow-primary/20" onClick={() => navigate(`/checkout?product=${product.id}`)}>
                    Buy Now — ₹{product.price} <ArrowRight size={16} className="ml-2" />
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/product/${product.id}`}>View Course Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WHAT'S INCLUDED ═══════ */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background border-y border-border/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Courses Included</p>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Learn Every Tool You Need</h2>
            <p className="text-muted-foreground text-lg">From beginner drafting to AI-powered design — all in one bundle.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES_LANDING.map((course) => (
              <div key={course.id} className="bg-card rounded-2xl border border-border overflow-hidden group hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                <div className="aspect-[4/3] relative overflow-hidden bg-zinc-100">
                  <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-full text-foreground border border-border">{course.software}</div>
                  <div className="absolute bottom-2 right-2 bg-primary/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{course.students} students</div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">{course.description}</p>
                  <ul className="space-y-1.5">
                    {course.learningPoints.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle size={12} className="text-primary mt-0.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="w-full py-16 md:py-24 bg-muted/20 overflow-hidden border-b border-border/40">
        <div className="max-w-5xl mx-auto px-5 mb-12 text-center">
          <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Student Reviews</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Loved by <span className="text-primary">50,000+</span> Students
          </h2>
          <p className="text-muted-foreground text-lg">Real stories from architects and designers across India.</p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory px-4 md:px-0 max-w-6xl mx-auto no-scrollbar">
          {TESTIMONIALS_LANDING.map((t, i) => (
            <div key={i} className="w-[300px] md:w-[350px] shrink-0 snap-center bg-card border border-border p-8 rounded-2xl hover:border-primary/30 transition-all shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} className="fill-primary text-primary" />)}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">"{t.content}"</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">{t.name[0]}</div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground flex items-center gap-1">{t.name} <CheckCircle size={12} className="text-primary" /></p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{t.role} • {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="w-full py-16 md:py-24 bg-background border-t border-border/40">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">Common Questions</h2>
            <p className="text-muted-foreground text-base">Everything you need to know before getting started.</p>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS_LANDING.map((faq, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:border-primary/30 transition-all">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm md:text-base font-semibold text-foreground pr-6">{faq.question}</span>
                  <ChevronDown size={18} className={`text-muted-foreground transition-transform shrink-0 ${openFaqIndex === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-5 text-muted-foreground text-sm leading-relaxed transition-all duration-300 overflow-hidden ${openFaqIndex === i ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="w-full py-20 bg-zinc-900 text-white text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Start Your Design Career Today</h2>
          <p className="text-zinc-400 mb-8 text-lg">Join 50,000+ professionals. Get instant access to every course.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-lg px-10 py-6 shadow-lg shadow-primary/30" onClick={() => navigate(`/checkout?product=${PRODUCTS[0].id}`)}>
              Get Started — ₹{PRODUCTS[0].price} <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-zinc-700 text-zinc-300 hover:bg-zinc-800" onClick={() => navigate(`/checkout?product=${PRODUCTS[1].id}`)}>
              All Courses — ₹{PRODUCTS[1].price}
            </Button>
          </div>
          <p className="text-zinc-500 text-xs mt-6">🔒 Secure checkout • 7-day money-back guarantee • Instant access</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
