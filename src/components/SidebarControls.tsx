import React, { useRef } from 'react';
import { AppState, DotType, CornerSquareType, CornerDotType } from '../types';
import { Link, Palette, LayoutTemplate, ImagePlus, Frame, Type } from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  state: AppState;
  onChange: (updates: Partial<AppState>) => void;
}

const DOT_TYPES: { value: DotType; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Rounded' },
];

const CORNER_SQUARE_TYPES: { value: CornerSquareType; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
];

const CORNER_DOT_TYPES: { value: CornerDotType; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
];

const FRAME_TYPES: { value: AppState['frameType']; label: string }[] = [
  { value: 'none', label: 'No Frame' },
  { value: 'bottom-text', label: 'Bottom Text' },
  { value: 'top-text', label: 'Top Text' },
  { value: 'bubble', label: 'Speech Bubble' },
];

export default function SidebarControls({ state, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      onChange({ logoUrl: event.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full h-full overflow-y-auto p-6 space-y-8 bg-white border-r border-neutral-100">
      
      {/* 1. Content */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-neutral-900 font-semibold text-lg">
          <Link className="w-5 h-5 text-[#FF9000]" />
          <h2>Destination URL</h2>
        </div>
        <div>
          <input
            type="url"
            value={state.link}
            onChange={(e) => onChange({ link: e.target.value })}
            placeholder="https://your-link.com"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF9000] focus:border-transparent transition-all shadow-sm text-neutral-700"
          />
        </div>
      </section>

      {/* 2. Colors */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-neutral-900 font-semibold text-lg">
          <Palette className="w-5 h-5 text-[#FF9000]" />
          <h2>Colors</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-500">Foreground</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={state.fgColor}
                onChange={(e) => onChange({ fgColor: e.target.value })}
                className="w-10 h-10 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-sm font-medium uppercase text-neutral-700">{state.fgColor}</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-500">Background</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={state.bgColor}
                onChange={(e) => onChange({ bgColor: e.target.value })}
                className="w-10 h-10 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-sm font-medium uppercase text-neutral-700">{state.bgColor}</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-500">Finder Border</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={state.cornerSquareColor}
                onChange={(e) => onChange({ cornerSquareColor: e.target.value })}
                className="w-10 h-10 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-sm font-medium uppercase text-neutral-700">{state.cornerSquareColor}</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-500">Finder Dot</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={state.cornerDotColor}
                onChange={(e) => onChange({ cornerDotColor: e.target.value })}
                className="w-10 h-10 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-sm font-medium uppercase text-neutral-700">{state.cornerDotColor}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Styles */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-neutral-900 font-semibold text-lg">
          <LayoutTemplate className="w-5 h-5 text-[#FF9000]" />
          <h2>Design Styles</h2>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-500">Pattern</label>
            <div className="grid grid-cols-3 gap-2">
              {DOT_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => onChange({ dotType: type.value })}
                  className={cn(
                    "px-3 py-2 text-xs font-medium rounded-lg border transition-all",
                    state.dotType === type.value
                      ? "bg-neutral-900 text-white border-neutral-900 shadow-md"
                      : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-500">Corner Squares</label>
            <div className="grid grid-cols-3 gap-2">
              {CORNER_SQUARE_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => onChange({ cornerSquareType: type.value })}
                  className={cn(
                    "px-3 py-2 text-xs font-medium rounded-lg border transition-all",
                    state.cornerSquareType === type.value
                      ? "bg-neutral-900 text-white border-neutral-900 shadow-md"
                      : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Logo */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-neutral-900 font-semibold text-lg">
          <ImagePlus className="w-5 h-5 text-[#FF9000]" />
          <h2>Center Logo</h2>
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleLogoUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-neutral-300 rounded-xl hover:bg-neutral-50 hover:border-[#FF9000] transition-colors text-neutral-600 font-medium"
          >
            <ImagePlus className="w-5 h-5" />
            {state.logoUrl ? 'Change Logo' : 'Upload Logo'}
          </button>
          {state.logoUrl && (
            <button
              onClick={() => onChange({ logoUrl: null })}
              className="text-sm text-red-500 font-medium hover:underline text-left"
            >
              Remove Logo
            </button>
          )}
        </div>
      </section>

      {/* 5. Frames */}
      <section className="space-y-4 pb-8">
        <div className="flex items-center gap-2 text-neutral-900 font-semibold text-lg">
          <Frame className="w-5 h-5 text-[#FF9000]" />
          <h2>Frames & CTA</h2>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {FRAME_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => onChange({ frameType: type.value })}
                className={cn(
                  "px-3 py-2 text-xs font-medium rounded-lg border transition-all",
                  state.frameType === type.value
                    ? "bg-[#FF9000] text-white border-[#FF9000] shadow-md"
                    : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>

          {state.frameType !== 'none' && (
            <div className="space-y-4 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-500 flex items-center gap-1">
                  <Type className="w-4 h-4" /> Call to Action Text
                </label>
                <input
                  type="text"
                  value={state.frameText}
                  onChange={(e) => onChange({ frameText: e.target.value })}
                  placeholder="SCAN ME"
                  maxLength={24}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF9000]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-500">Frame Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={state.frameColor}
                    onChange={(e) => onChange({ frameColor: e.target.value })}
                    className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-sm font-medium uppercase text-neutral-700">{state.frameColor}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
