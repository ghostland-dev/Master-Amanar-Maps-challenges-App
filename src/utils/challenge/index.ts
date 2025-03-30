
import { dropshippingChallenge } from './dropshippingChallenge';
import { affiliationChallenge } from './affiliationChallenge';
import { cryptoChallenge } from './cryptoChallenge';
import { marketingChallenge } from './marketingChallenge';
import { arbitrageChallenge } from './arbitrageChallenge';
import { achatReventeChallenge } from './achatReventeChallenge';
import { nftChallenge } from './nftChallenge';
import { copywritingChallenge } from './copywritingChallenge';
import { Challenge } from './types';

// Function to get all challenges as an array
export const getAllChallenges = (): Challenge[] => {
  // Return all challenges as an array
  return [
    dropshippingChallenge,
    affiliationChallenge,
    cryptoChallenge,
    marketingChallenge,
    arbitrageChallenge,
    achatReventeChallenge,
    nftChallenge,
    copywritingChallenge,
  ];
};

// Function to get a challenge by its ID
export const getChallengeData = (id: string): Challenge => {
  const challenge = getAllChallenges().find((ch) => ch.id === id);
  
  if (!challenge) {
    // Return a default challenge or throw an error
    return getAllChallenges()[0];
  }
  
  return challenge;
};

export * from './types';
