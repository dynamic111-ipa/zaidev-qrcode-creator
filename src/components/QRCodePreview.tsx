import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { AppState } from '../types';
import { cn } from '../lib/utils';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FileImage, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  state: AppState;
}

export interface QRCodePreviewRef {
  downloadPNG: () => void;
  downloadPDF: () => void;
}

const QRCodePreview = forwardRef<QRCodePreviewRef, Props>(({ state }, ref) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Single instance to prevent double-mounting or race conditions
  const [qrCode] = useState(() => new QRCodeStyling({
    width: 1024,
    height: 1024,
    margin: 10,
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: 'H',
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 20,
      crossOrigin: 'anonymous',
    },
  }));

  // Update properties when state changes
  useEffect(() => {
    qrCode.update({
      data: state.link || 'https://example.com',
      dotsOptions: {
        color: state.fgColor,
        type: state.dotType,
      },
      backgroundOptions: {
        color: state.bgColor,
      },
      image: state.logoUrl || undefined,
      cornersSquareOptions: {
        color: state.cornerSquareColor || state.fgColor,
        type: state.cornerSquareType,
      },
      cornersDotOptions: {
        color: state.cornerDotColor || state.fgColor,
        type: state.cornerDotType,
      },
    });
  }, [
    qrCode,
    state.link,
    state.fgColor,
    state.bgColor,
    state.cornerSquareColor,
    state.cornerDotColor,
    state.dotType,
    state.cornerSquareType,
    state.cornerDotType,
    state.logoUrl,
  ]);

  // Re-append the canvas when the frame type changes and the DOM node updates
  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.append(qrRef.current);
    }
  }, [qrCode, state.frameType]);

  const triggerDownload = async (format: 'png' | 'pdf') => {
    if (!containerRef.current) return;
    
    // Use html2canvas to capture the entire frame
    const canvas = await html2canvas(containerRef.current, {
      scale: 3, // High quality
      useCORS: true,
      backgroundColor: null,
    });

    if (format === 'png') {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qr-code.png';
      a.click();
    } else if (format === 'pdf') {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 3, canvas.height / 3],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 3, canvas.height / 3);
      pdf.save('qr-code.pdf');
    }
  };

  useImperativeHandle(ref, () => ({
    downloadPNG: () => triggerDownload('png'),
    downloadPDF: () => triggerDownload('pdf'),
  }));

  const qrContainerClass = "flex items-center justify-center overflow-hidden [&>canvas]:w-full [&>canvas]:max-w-[300px] [&>canvas]:h-auto [&>canvas]:block";

  const renderFrame = () => {
    const isFrame = state.frameType !== 'none';
    if (!isFrame) {
      return <div ref={qrRef} className={cn("rounded-xl shadow-sm", qrContainerClass)} />;
    }

    if (state.frameType === 'bottom-text') {
      return (
        <div
          ref={containerRef}
          className="flex flex-col items-center overflow-hidden rounded-[32px] border-8"
          style={{ borderColor: state.frameColor, backgroundColor: state.bgColor, color: '#000000', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)' }}
        >
          <div ref={qrRef} className={cn("pt-6 px-6 pb-2", qrContainerClass)} />
          <div
            className="w-full text-center py-4 font-bold text-xl tracking-wide uppercase"
            style={{ backgroundColor: state.frameColor, color: getContrastColor(state.frameColor) }}
          >
            {state.frameText || 'SCAN ME'}
          </div>
        </div>
      );
    }

    if (state.frameType === 'top-text') {
      return (
        <div
          ref={containerRef}
          className="flex flex-col items-center overflow-hidden rounded-[32px] border-8"
          style={{ borderColor: state.frameColor, backgroundColor: state.bgColor, color: '#000000', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)' }}
        >
          <div
            className="w-full text-center py-4 font-bold text-xl tracking-wide uppercase"
            style={{ backgroundColor: state.frameColor, color: getContrastColor(state.frameColor) }}
          >
            {state.frameText || 'SCAN ME'}
          </div>
          <div ref={qrRef} className={cn("pb-6 px-6 pt-2", qrContainerClass)} />
        </div>
      );
    }

    if (state.frameType === 'bubble') {
      return (
        <div ref={containerRef} className="flex flex-col items-center" style={{ color: '#000000' }}>
          <div
            className="px-8 py-3 rounded-full font-bold text-lg mb-4 relative"
            style={{ backgroundColor: state.frameColor, color: getContrastColor(state.frameColor), boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
          >
            {state.frameText || 'SCAN ME'}
            <div
              className="absolute w-4 h-4 rotate-45 -bottom-2 left-1/2 -translate-x-1/2"
              style={{ backgroundColor: state.frameColor }}
            />
          </div>
          <div
            className="rounded-[32px] p-4 border-4"
            style={{ borderColor: state.frameColor, backgroundColor: state.bgColor, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)' }}
          >
            <div ref={qrRef} className={cn("rounded-xl", qrContainerClass)} />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="relative group">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          key={state.frameType} // Force animation re-run when frame changes
        >
          {state.frameType === 'none' ? (
            <div ref={containerRef} className="p-4 rounded-3xl" style={{ backgroundColor: state.bgColor, color: '#000000', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)' }}>
               <div ref={qrRef} className={cn("rounded-xl", qrContainerClass)} />
            </div>
          ) : (
            renderFrame()
          )}
        </motion.div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => triggerDownload('png')}
          className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors shadow-md hover:shadow-lg font-medium"
        >
          <FileImage className="w-5 h-5" />
          Export PNG
        </button>
        <button
          onClick={() => triggerDownload('pdf')}
          className="flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors shadow-sm hover:shadow-md font-medium"
        >
          <FileText className="w-5 h-5" />
          Export PDF
        </button>
      </div>
    </div>
  );
});

QRCodePreview.displayName = 'QRCodePreview';

export default QRCodePreview;

// Helper to determine text color based on background
function getContrastColor(hexColor: string) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}
