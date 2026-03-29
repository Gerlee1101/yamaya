export interface DetectedBarcode {
  rawValue: string;
}

export interface ScannerState {
  scanResult: string;
  isScanning: boolean;
  error: string;
  isRedirecting: boolean;
}

export interface DemoProduct {
  code: string;
  name: string;
}