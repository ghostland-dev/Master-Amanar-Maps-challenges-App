
import { dropshippingChallenges } from './dropshippingChallenge';
import { affiliationChallenges } from './affiliationChallenge';
import { cryptoChallenges } from './cryptoChallenge';
import { marketingChallenges } from './marketingChallenge';
import { arbitrageChallenges } from './arbitrageChallenge';
import { achatReventeChallenges } from './achatReventeChallenge';
import { nftChallenges } from './nftChallenge';
import { copywritingChallenges } from './copywritingChallenge';

export const getAllChallenges = () => {
  // Fusionner tous les défis de différentes catégories
  return [
    ...dropshippingChallenges,
    ...affiliationChallenges,
    ...cryptoChallenges,
    ...marketingChallenges,
    ...arbitrageChallenges,
    ...achatReventeChallenges,
    ...nftChallenges,
    ...copywritingChallenges,
  ];
};

export * from './types';
