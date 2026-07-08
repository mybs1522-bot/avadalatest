import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
          About <span className="text-primary">Avada Design</span>
        </h1>
        
        <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground space-y-6">
          <p>
            Welcome to Avada Design, the premier destination for architects, designers, and visualization artists
            looking to elevate their skills and master the tools of the trade.
          </p>
          <p>
            Founded by industry professionals with years of experience in architectural design and 3D visualization,
            our mission is to bridge the gap between academic theory and real-world practice. We believe that
            high-quality education should be accessible, practical, and inspiring.
          </p>
          <p>
            Whether you are a student preparing your portfolio, a junior architect looking to speed up your workflow,
            or a seasoned professional transitioning to new software like D5 Render or Rhino, we have a course
            designed specifically for you.
          </p>
          <div className="mt-12 p-8 bg-card rounded-lg border border-border/50 text-card-foreground">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="mb-0">
              To empower the next generation of designers with the tools and techniques they need to turn
              their boldest ideas into stunning realities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
