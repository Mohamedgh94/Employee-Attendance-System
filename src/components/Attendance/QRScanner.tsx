import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface QRScannerProps {
  onScan: (data: string | null) => void;
  onError: (error: Error) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onError }) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        'qr-reader',
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          showTorchButtonIfSupported: true,
        },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          onScan(decodedText);
        },
        (error) => {
          if (error?.message) {
            onError(new Error(error.message));
          }
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .clear()
          .catch((error) => console.error('Failed to clear scanner', error));
      }
    };
  }, [onScan, onError]);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Scan QR Code</h2>
        <div id="qr-reader" className="w-full" />
      </div>
    </div>
  );
};