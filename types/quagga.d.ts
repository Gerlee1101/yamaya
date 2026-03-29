declare module 'quagga' {
  interface QuaggaJSConfigObject {
    inputStream: {
      name: string;
      type: string;
      target: HTMLElement | null;
      constraints: {
        width: number;
        height: number;
        facingMode: string;
      };
    };
    decoder: {
      readers: string[];
    };
  }

  interface QuaggaJSResultObject {
    codeResult: {
      code: string;
    };
  }

  interface QuaggaJS {
    init(config: QuaggaJSConfigObject, callback: (err?: Error) => void): void;
    start(): void;
    stop(): void;
    onDetected(callback: (data: QuaggaJSResultObject) => void): void;
  }

  const Quagga: QuaggaJS;
  export default Quagga;
}