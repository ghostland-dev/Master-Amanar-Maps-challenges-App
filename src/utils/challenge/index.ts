
import { Challenge } from "./types";
import { dropshippingChallenge } from "./dropshippingChallenge";
import { cryptoChallenge } from "./cryptoChallenge";
import { arbitrageChallenge } from "./arbitrageChallenge";
import { affiliationChallenge } from "./affiliationChallenge";
import { copywritingChallenge } from "./copywritingChallenge";
import { nftChallenge } from "./nftChallenge";

// Map of challenges
const challengesMap: Record<string, Challenge> = {
  "1": dropshippingChallenge,
  "2": cryptoChallenge,
  "3": arbitrageChallenge,
  "4": affiliationChallenge,
  "5": copywritingChallenge,
  "6": nftChallenge,
};

export const getChallengeData = (id: string): Challenge => {
  return challengesMap[id] || dropshippingChallenge;
};

export type { Challenge, ChallengeStep, ChallengeResource } from "./types";
export { 
  dropshippingChallenge,
  cryptoChallenge,
  arbitrageChallenge,
  affiliationChallenge,
  copywritingChallenge,
  nftChallenge
};
