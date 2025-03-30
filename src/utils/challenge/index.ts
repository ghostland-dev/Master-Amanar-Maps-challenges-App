// Existing imports should remain

import * as dropshippingChallenge from './dropshippingChallenge';
import * as cryptoChallenge from './cryptoChallenge';
import * as arbitrageChallenge from './arbitrageChallenge';
import * as affiliationChallenge from './affiliationChallenge';
import * as copywritingChallenge from './copywritingChallenge';
import * as nftChallenge from './nftChallenge';
import * as achatReventeChallenge from './achatReventeChallenge';
import * as marketingChallenge from './marketingChallenge';

// Export individual challenges
export {
  dropshippingChallenge,
  cryptoChallenge,
  arbitrageChallenge,
  affiliationChallenge,
  copywritingChallenge,
  nftChallenge,
  achatReventeChallenge,
  marketingChallenge
};

// Group all challenges in a single object
export const challengesData = {
  dropshippingChallenge,
  cryptoChallenge,
  arbitrageChallenge,
  affiliationChallenge,
  copywritingChallenge,
  nftChallenge,
  achatReventeChallenge,
  marketingChallenge
};

// Function to get a specific challenge by ID
export const getChallengeData = (id: string) => {
  switch (id) {
    case "1":
      return dropshippingChallenge.dropshippingChallenge;
    case "2":
      return cryptoChallenge.cryptoChallenge;
    case "3":
      return arbitrageChallenge.arbitrageChallenge;
    case "4":
      return affiliationChallenge.affiliationChallenge;
    case "5":
      return copywritingChallenge.copywritingChallenge;
    case "6":
      return nftChallenge.nftChallenge;
    case "7":
      return achatReventeChallenge.achatReventeChallenge;
    case "8":
      return marketingChallenge.marketingChallenge;
    default:
      // Default to the dropshipping challenge if ID not found
      return dropshippingChallenge.dropshippingChallenge;
  }
};
