import { STORE_KEYS } from 'const';

export const loadHelpers = anbuBlockchain => {
  const { settings } = anbuBlockchain;

  return {
    incrementCurrentStep: () => {
      anbuBlockchain[STORE_KEYS.SETTINGS][STORE_KEYS.CURRENT_STEP].set(
        () => settings[STORE_KEYS.CURRENT_STEP] + 1
      );
    },
    resetCurrentStep: () => {
      anbuBlockchain[STORE_KEYS.SETTINGS][STORE_KEYS.CURRENT_STEP].set(() => 1);
    },
  };
};
