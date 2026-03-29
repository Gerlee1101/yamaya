"use client";

import { AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function ScannerInstructions() {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-900 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Хэрэглэх заавар
        </CardTitle>
      </CardHeader>

      <div className="px-6 pb-6">
        <ul className="space-y-2 text-blue-800">
          <li>• Вэб хөтчөөс камерын зөвшөөрөл асуухад зөвшөөрнө үү</li>
          <li>
            • Төхөөрөмжөө тогтвортой барин, баркодыг сканерын талбайд байрлуулна
            уу
          </li>
          <li>
            • Сканнер автоматаар баркодыг танин, бүтээгдэхүүний хуудас руу
            шилжүүлнэ
          </li>
          <li>• Системийг турших бол дээрх жишээ баркодуудыг ашиглана уу</li>
        </ul>
      </div>
    </Card>
  );
}
