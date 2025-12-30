import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTokenPrice } from '@/store/appSlice'; 
import { RootState } from '@/store/store'; 

export const useTokenSocket = () => {
  const dispatch = useDispatch();
  const tokens = useSelector((state: RootState) => state.app.tokens);

  useEffect(() => {
    if (tokens.length === 0) return;

    const intervalId = setInterval(() => {
      // 1. Pick a random token
      const randomIndex = Math.floor(Math.random() * tokens.length);
      const randomToken = tokens[randomIndex];

      // 2. Calculate Random Changes
      const volatility = 0.05; 
      const change = 1 + (Math.random() * volatility * 2 - volatility);
      const newPrice = randomToken.price * change;
      
      // 3. SIMULATE GROWTH (So they move columns)
      // Add 5% progress every time it gets picked, looping back to 0 if > 100
      let newProgress = randomToken.progress + 5; 
      if (newProgress > 105) newProgress = 0; // Reset to start for demo purposes

      // 4. Dispatch update (You might need to update your slice to handle progress updates too)
      // For now, let's assume updateTokenPrice handles the whole object or create a new action
      dispatch(updateTokenPrice({ 
        ticker: randomToken.ticker, 
        newPrice: newPrice,
        newProgress: newProgress // <--- You need to update appSlice to accept this
      }));

    }, 500); // Slowed down slightly so you can see it happen

    return () => clearInterval(intervalId);
  }, [tokens, dispatch]);
};