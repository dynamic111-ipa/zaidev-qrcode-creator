export type DotType =
  | 'rounded'
  | 'dots'
  | 'classy'
  | 'classy-rounded'
  | 'square'
  | 'extra-rounded';

export type CornerSquareType = 'dot' | 'square' | 'extra-rounded';

export type CornerDotType = 'dot' | 'square';

export interface QRCodeConfig {
  data: string;
  width: number;
  height: number;
  margin: number;
  qrOptions: {
    typeNumber: number;
    mode: 'Byte' | 'Numeric' | 'Alphanumeric' | 'Kanji';
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  };
  imageOptions: {
    hideBackgroundDots: boolean;
    imageSize: number;
    margin: number;
    crossOrigin: string;
  };
  dotsOptions: {
    color: string;
    type: DotType;
  };
  backgroundOptions: {
    color: string;
  };
  cornersSquareOptions: {
    color: string;
    type: CornerSquareType;
  };
  cornersDotOptions: {
    color: string;
    type: CornerDotType;
  };
}

export interface AppState {
  link: string;
  fgColor: string;
  bgColor: string;
  cornerSquareColor: string;
  cornerDotColor: string;
  dotType: DotType;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  logoUrl: string | null;
  frameType: 'none' | 'bottom-text' | 'top-text' | 'bubble';
  frameText: string;
  frameColor: string;
}
