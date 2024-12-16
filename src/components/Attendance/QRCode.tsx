import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ 
  value, 
  size = 256 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg">
      <QRCodeSVG
        value={value}
        size={size}
        level="H"
        includeMargin={true}
      />
      <p className="mt-4 text-sm text-gray-600">Scan this code to check in/out</p>
    </div>
  );
};