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
