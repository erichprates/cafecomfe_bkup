import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Devotional = Database['public']['Tables']['devotionals']['Row'];

export function useDevotional() {
  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodayDevotional = async () => {
      try {
        setIsLoading(true);
        
        // Buscar todos os devocionais para encontrar o dia correto
        const { data: devotionals, error: fetchError } = await supabase
          .from('devotionals')
          .select('*')
          .order('day');

        if (fetchError) {
          throw fetchError;
        }

        if (!devotionals || devotionals.length === 0) {
          throw new Error('Nenhum devocional encontrado');
        }

        // Encontrar o devocional para hoje
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)) + 1;
        
        // Usar módulo para garantir que sempre teremos um devocional válido
        const devotionalIndex = (dayOfYear - 1) % devotionals.length;
        const todayDevotional = devotionals[devotionalIndex];

        setDevotional(todayDevotional);
        setError(null);
      } catch (err: any) {
        console.error('Erro ao buscar devocional:', err);
        setError(err.message);
        setDevotional(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodayDevotional();
  }, []);

  return {
    devotional,
    isLoading,
    error
  };
}