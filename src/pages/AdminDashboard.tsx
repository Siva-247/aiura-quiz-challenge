import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { characters } from '@/data/characters';

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  college_name: string;
  selected_character: string | null;
  created_at: string;
}

interface QuizResult {
  id: string;
  registration_id: string;
  score: number;
  total_questions: number;
  time_taken: number | null;
  completed_at: string;
  registrations: Registration;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    totalCompleted: 0,
    averageScore: 0,
    highestScore: 0
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      toast({
        title: "Access Denied",
        description: "Please login as admin first.",
        variant: "destructive"
      });
      navigate('/admin-login');
      return;
    }

    fetchData();
  }, [navigate, toast]);

  const fetchData = async () => {
    try {
      // Fetch registrations
      const { data: regData, error: regError } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (regError) throw regError;

      // Fetch quiz results with registration details
      const { data: resultData, error: resultError } = await supabase
        .from('quiz_results')
        .select(`
          *,
          registrations (
            id, name, email, phone, department, year, college_name, selected_character, created_at
          )
        `)
        .order('completed_at', { ascending: false });

      if (resultError) throw resultError;

      setRegistrations(regData || []);
      setResults(resultData || []);

      // Calculate stats
      const totalRegistrations = regData?.length || 0;
      const totalCompleted = resultData?.length || 0;
      const scores = resultData?.map(r => r.score) || [];
      const averageScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
      const highestScore = scores.length > 0 ? Math.max(...scores) : 0;

      setStats({
        totalRegistrations,
        totalCompleted,
        averageScore: Math.round(averageScore * 10) / 10,
        highestScore
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch admin data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin-login');
  };

  const getCharacterName = (characterId: string | null) => {
    if (!characterId) return 'Not Selected';
    const character = characters.find(c => c.id === characterId);
    return character ? `${character.avatar} ${character.name}` : 'Unknown';
  };

  const formatTime = (seconds: number | null) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 p-4">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{stats.totalRegistrations}</div>
              <p className="text-sm text-muted-foreground">Total Registrations</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-quiz-success">{stats.totalCompleted}</div>
              <p className="text-sm text-muted-foreground">Quiz Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-quiz-warning">{stats.averageScore}</div>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-quiz-error">{stats.highestScore}</div>
              <p className="text-sm text-muted-foreground">Highest Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Quiz Results */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
            <CardDescription>Results of completed quizzes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Character</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Time Taken</TableHead>
                    <TableHead>Completed At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium">{result.registrations.name}</TableCell>
                      <TableCell>{result.registrations.email}</TableCell>
                      <TableCell>{getCharacterName(result.registrations.selected_character)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {result.score}/{result.total_questions}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={result.score / result.total_questions >= 0.7 ? "default" : "secondary"}>
                          {Math.round((result.score / result.total_questions) * 100)}%
                        </Badge>
                      </TableCell>
                      <TableCell>{formatTime(result.time_taken)}</TableCell>
                      <TableCell>
                        {new Date(result.completed_at).toLocaleDateString()} {new Date(result.completed_at).toLocaleTimeString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* All Registrations */}
        <Card>
          <CardHeader>
            <CardTitle>All Registrations</CardTitle>
            <CardDescription>Complete list of registered participants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>College</TableHead>
                    <TableHead>Character</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Registered At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrations.map((reg) => {
                    const hasCompleted = results.some(r => r.registration_id === reg.id);
                    return (
                      <TableRow key={reg.id}>
                        <TableCell className="font-medium">{reg.name}</TableCell>
                        <TableCell>{reg.email}</TableCell>
                        <TableCell>{reg.phone}</TableCell>
                        <TableCell>{reg.department}</TableCell>
                        <TableCell>{reg.year}</TableCell>
                        <TableCell>{reg.college_name}</TableCell>
                        <TableCell>{getCharacterName(reg.selected_character)}</TableCell>
                        <TableCell>
                          <Badge variant={hasCompleted ? "default" : "secondary"}>
                            {hasCompleted ? "Completed" : "Registered"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(reg.created_at).toLocaleDateString()} {new Date(reg.created_at).toLocaleTimeString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;