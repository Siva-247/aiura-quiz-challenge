import QRCode from 'react-qr-code';
import { Card, CardContent } from '@/components/ui/card';

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
}

const QRCodeGenerator = ({ url, size = 200 }: QRCodeGeneratorProps) => {
  return (
    <Card className="w-fit mx-auto">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <QRCode 
            value={url} 
            size={size}
            bgColor="#ffffff"
            fgColor="#000000"
            level="M"
            className="mx-auto"
          />
          <p className="text-sm text-muted-foreground">
            Scan to register for the quiz
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;