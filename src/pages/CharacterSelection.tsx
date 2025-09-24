import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { characters, Character } from '@/data/characters';
import { supabase } from '@/integrations/supabase/client';

const CharacterSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleStartQuiz = async () => {
    if (!selectedCharacter) {
      toast({
        title: "No Character Selected",
        description: "Please select a character before starting the quiz.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const registrationId = localStorage.getItem('registrationId');

    if (!registrationId) {
      toast({
        title: "Registration Error", 
        description: "Please register first.",
        variant: "destructive"
      });
      navigate('/register');
      return;
    }

    try {
      const { error } = await supabase
        .from('registrations')
        .update({ selected_character: selectedCharacter.id })
        .eq('id', registrationId);

      if (error) throw error;

      localStorage.setItem('selectedCharacter', JSON.stringify(selectedCharacter));
      navigate('/quiz');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save character selection.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Choose Your Quiz Character</h1>
          <p className="text-xl text-muted-foreground">
            Select a character that represents your coding style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {characters.map((character) => (
            <Card
              key={character.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedCharacter?.id === character.id
                  ? 'ring-2 ring-primary bg-primary/5'
                  : 'hover:bg-accent'
              }`}
              onClick={() => handleCharacterSelect(character)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-4">{character.avatar}</div>
                <h3 className="font-semibold text-lg mb-2">{character.name}</h3>
                <p className="text-sm text-muted-foreground">{character.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedCharacter && (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">{selectedCharacter.avatar}</div>
              <CardTitle>You selected: {selectedCharacter.name}</CardTitle>
              <CardDescription>{selectedCharacter.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleStartQuiz} 
                className="w-full" 
                size="lg"
                disabled={loading}
              >
                {loading ? 'Starting Quiz...' : 'Start Quiz'}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CharacterSelection;