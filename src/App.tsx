import { ThemeToggle } from './components/ThemeToggle';
import { Header } from './components/Header';
import { BibleVerse } from './components/BibleVerse';
import { Devotional } from './components/Devotional';
import { PracticalApplication } from './components/PracticalApplication';
import { SpotifyPlayer } from './components/SpotifyPlayer';
import { DevDateControls } from './components/DevDateControls';
import { useDevotional } from './hooks/useDevotional';
import { useTheme } from './contexts/ThemeContext';
import { useEffect, useState } from 'react';

function App() {
  const { isDark } = useTheme();
  const { devotional, isLoading, error } = useDevotional();
  const [logoUrl, setLogoUrl] = useState(
    isDark 
      ? 'https://basisbranding.com.br/wp-content/uploads/2024/12/logo2.png'
      : 'https://basisbranding.com.br/wp-content/uploads/2024/12/logo1.png'
  );
  
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    setLogoUrl(
      isDark 
        ? 'https://basisbranding.com.br/wp-content/uploads/2024/12/logo2.png'
        : 'https://basisbranding.com.br/wp-content/uploads/2024/12/logo1.png'
    );
  }, [isDark]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-red-500">Erro ao carregar devocional: {error}</div>
      </div>
    );
  }

  if (!devotional) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-700 dark:text-gray-300">Nenhum devocional encontrado para hoje.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex justify-center mb-8">
          <img 
            src={logoUrl} 
            alt="Café com Fé" 
            className="h-20 w-auto transition-all duration-300 ease-in-out"
          />
        </div>
        
        <ThemeToggle />

        <div className="flex flex-col gap-6">
          <div className="card-enter card-hover bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <Header
              date={today}
              title={devotional.title}
            />
          </div>

          <div className="card-enter card-hover bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <BibleVerse
              book={devotional.verse_book}
              chapter={devotional.verse_chapter}
              verse={devotional.verse_number}
              text={devotional.verse_text}
              reference={devotional.verse_reference}
            />
          </div>

          <div className="card-enter card-hover bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <Devotional
              text={devotional.devotional_text}
            />
          </div>

          <div className="card-enter card-hover bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <PracticalApplication
              text={devotional.practical_text}
            />
          </div>

          <div className="card-enter card-hover bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <SpotifyPlayer day={devotional.day} />
          </div>
        </div>
      </div>

      {import.meta.env.DEV && <DevDateControls />}
    </div>
  );
}

export default App;