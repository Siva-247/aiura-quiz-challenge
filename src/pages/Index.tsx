import QRCodeGenerator from '@/components/QRCodeGenerator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const registrationUrl = `${window.location.origin}/register`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              AIURA Quiz Challenge
            </h1>
            <p className="text-xl text-muted-foreground">
              Test your programming knowledge with our interactive quiz
            </p>
          </div>

          {/* QR Code Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Scan to Register</h2>
            <QRCodeGenerator url={registrationUrl} size={250} />
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Scan the QR code above with your mobile device to access the registration page and start the quiz
            </p>
          </div>

          {/* Direct Link for Testing */}
          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">Or click below to register directly:</p>
            <Button asChild size="lg">
              <Link to="/register">Start Registration</Link>
            </Button>
          </div>

          {/* Admin Link */}
          <div className="pt-8 border-t">
            <Button asChild variant="outline">
              <Link to="/admin-login">Admin Access</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
