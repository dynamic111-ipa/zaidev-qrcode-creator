import React, { useState, useRef } from 'react';
import QRCodePreview, { QRCodePreviewRef } from './components/QRCodePreview';
import SidebarControls from './components/SidebarControls';
import { AppState } from './types';
import { Trash2 } from 'lucide-react';

const INITIAL_STATE: AppState = {
  link: 'https://aistudio.google.com/',
  fgColor: '#111111',
  bgColor: '#ffffff',
  cornerSquareColor: '#111111',
  cornerDotColor: '#111111',
  dotType: 'square',
  cornerSquareType: 'square',
  cornerDotType: 'square',
  logoUrl: null,
  frameType: 'none',
  frameText: 'SCAN ME',
  frameColor: '#FF9000',
};

export default function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  const previewRef = useRef<QRCodePreviewRef>(null);

  const handleStateChange = (updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleReset = () => {
    setState(INITIAL_STATE);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-neutral-900">
      {/* Header */}
      <header className="flex-none h-20 bg-white border-b border-neutral-200 px-6 lg:px-12 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3.5">
          <img 
            src="https://cdn.prod.website-files.com/66bda342c1bad702f5b635f6/66c06cd49fb59105a972d8ca_Group%201437253568%20(2).svg" 
            alt="QR Forge Logo" 
            className="h-9 w-auto"
            referrerPolicy="no-referrer"
          />
          <div className="h-6 w-px bg-neutral-200"></div>
          <span className="text-xs font-bold text-neutral-400 tracking-widest uppercase mt-0.5">QR Code Creator</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-600 rounded-full font-medium text-sm border border-neutral-200">
            <span>Free version for close loved ones only</span>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full mx-auto" style={{ height: 'calc(100vh - 5rem)' }}>
        {/* Sidebar Controls */}
        <aside className="w-full lg:w-[400px] xl:w-[460px] h-[50vh] lg:h-full flex-none bg-white shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 relative">
          <SidebarControls state={state} onChange={handleStateChange} />
        </aside>

        {/* Live Preview Area */}
        <section className="flex-1 h-[50vh] lg:h-full bg-[#F8F9FA] overflow-y-auto p-8 lg:p-12 flex flex-col items-center justify-center relative">
          
          <div className="absolute top-6 right-6 z-20">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-white text-neutral-500 hover:text-rose-600 rounded-full shadow-sm border border-neutral-200 hover:bg-rose-50 hover:border-rose-200 transition-all text-sm font-medium"
              title="Reset all settings"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }} />
          
          <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-2">Live Preview</h2>
              <p className="text-neutral-500 font-medium">Any changes you make are updated instantly.</p>
            </div>
            
            <QRCodePreview ref={previewRef} state={state} />
            
          </div>
        </section>
      </main>
    </div>
  );
}
