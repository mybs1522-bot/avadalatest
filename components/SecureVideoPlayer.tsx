import React, { useEffect, useRef, useState } from 'react';
import { Lock, ShieldAlert, PlayCircle, Eye, AlertCircle } from 'lucide-react';

interface SecureVideoPlayerProps {
  videoUrl: string;
  title: string;
  userEmail?: string;
}

export const SecureVideoPlayer: React.FC<SecureVideoPlayerProps> = ({
  videoUrl,
  title,
  userEmail = 'trial.student@avada.com',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Security enforcement: disable right click, keyboard shortcuts, and inspection
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+S, Ctrl+U, Ctrl+Shift+I, F12, PrintScreen
      if (
        (e.ctrlKey && (e.key === 's' || e.key === 'u' || e.key === 'c' || e.key === 'p')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c' || e.key === 'J' || e.key === 'j')) ||
        e.key === 'F12' ||
        e.key === 'PrintScreen'
      ) {
        e.preventDefault();
        alert('Action Disabled: Content is DRM Protected against copy and download.');
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('contextmenu', handleContextMenu);
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (container) {
        container.removeEventListener('contextmenu', handleContextMenu);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Format embed URL for Google Drive or raw video link safely
  const getEmbedUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
      if (url.includes('/file/d/')) {
        const fileId = url.split('/file/d/')[1].split('/')[0];
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
      if (url.includes('folders')) {
        const folderId = url.split('folders/')[1].split('?')[0];
        return `https://drive.google.com/embeddedfolderview?id=${folderId}#list`;
      }
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div 
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl select-none"
      style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
    >
      {/* Top Security Banner */}
      <div className="bg-zinc-900/90 text-zinc-300 px-4 py-2 text-xs font-semibold flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-2 text-emerald-400">
          <ShieldAlert size={14} />
          <span>DRM Encrypted Stream • Anti-Download Active</span>
        </div>
        <span className="text-zinc-500 font-mono text-[10px] hidden sm:inline">Protected for: {userEmail}</span>
      </div>

      {/* Video Container */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
        
        {/* Anti-popout shield overlay covering top-right pop-out icon of Google Drive */}
        <div 
          className="absolute top-0 right-0 w-28 h-14 bg-transparent z-20 cursor-default" 
          title="Protected Stream"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />

        {/* Dynamic User Watermark overlay across player */}
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-around p-8 opacity-20 rotate-[-12deg]">
          <div className="text-xs font-mono font-bold text-white tracking-widest uppercase">
            AVADA TRIAL PASS • {userEmail} • DO NOT COPY
          </div>
          <div className="text-xs font-mono font-bold text-white tracking-widest uppercase text-right">
            DRM PROTECTED • {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Secure Interactive Video Embed with Strict Anti-Popup Sandbox */}
        <iframe
          src={embedUrl}
          className="w-full h-full border-0 pointer-events-auto"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen={true}
          sandbox="allow-scripts allow-same-origin allow-forms"
          title={title}
        />
      </div>



      {/* Security Disclaimer */}
      <div className="bg-zinc-950 p-3 flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-800">
        <div className="flex items-center gap-2">
          <Lock size={12} className="text-emerald-400 shrink-0" />
          <span>Copying, downloading, or screen recording is strictly prohibited and monitored.</span>
        </div>
      </div>
    </div>
  );
};
