import { useContext } from 'react';

import { UserStoreContext } from '../contexts/UserContext';
import { BASE_URL, endpoints } from '../endpoints';
import { createRequestOptions } from '../utils/utils';
import { UserActivityLevel, UserGoal, UserProfile } from '../types';

const activityMultiplier = {
  [UserActivityLevel.Low]: 1.2,
  [UserActivityLevel.Moderate]: 1.375,
  [UserActivityLevel.High]: 1.55,
  [UserActivityLevel.VeryHigh]: 1.725,
};

export const useUserStore = () => {
  const { user, authToken, setAuthToken, setUser } = useContext(UserStoreContext);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Login}`,
        createRequestOptions('POST', undefined, { email, password })
      );
      const result = await response.json();
      if (response.ok) {
        setAuthToken(result.access_token);
        return true;
      }
    } catch (e) {
      console.log(e);
      console.log('Failed to login Fit-Panda user');
    }
    return false;
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Register}`,
        createRequestOptions('POST', undefined, { email, password })
      );

      const result = await response.json();
      if (response.ok) {
        // setUser({ email: email, id: result.id });
        // this.updateStoredUser({ userId: result.id });
      } else {
        throw new Error(result.message);
      }
    } catch (e) {
      console.log('Failed to create Fit-Panda user');
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Profile}`,
        createRequestOptions('GET', authToken!)
      );
      const result = await response.json();
      if (response.ok) {
        setUser({ ...result });
      }
    } catch (e) {
      console.log(e);
      console.log('Failed to fetch Fit-Panda user');
    }
  };

  const updateUserProfile = async (user: Omit<UserProfile, 'userId'>): Promise<boolean> => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Profile}`,
        createRequestOptions('POST', authToken!, { ...user, userId: user.id! })
      );
      if (response.ok) {
        return true;
      }
    } catch (e) {
      console.log(e);
      console.log('Failed to update Fit-Panda user');
    }
    return false;
  };

  const computeBMR = (user: Pick<UserProfile, 'age' | 'height' | 'weight' | 'sex'>): number => {
    if (!user) {
      return 0;
    }
    return user.sex === 'male'
      ? 66 + 13.7 * user.weight + 5 * user.height - 6.8 * user.age
      : 655 + 9.6 * user.weight + 1.8 * user.height - 4.7 * user.age;
  };

  const computeTDEE = (
    user: Pick<UserProfile, 'activity' | 'goal' | 'height' | 'weight' | 'age' | 'sex'>
  ): number => {
    if (!user) {
      return 0;
    }
    return user.goal === UserGoal.MaintainWeight
      ? computeBMR(user) * activityMultiplier[user.activity]
      : user.goal === UserGoal.LoseWeight
      ? computeBMR(user) * activityMultiplier[user.activity] - 500
      : computeBMR(user) * activityMultiplier[user.activity] + 300;
  };

  return {
    user,
    authToken,
    login,
    register,
    getUserProfile,
    updateUserProfile,
    computeTDEE,
  };
};
