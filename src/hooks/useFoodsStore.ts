import { useContext } from 'react';
import { FoodStoreContext } from '../contexts/FoodContext';
import { BASE_URL, endpoints } from '../endpoints';
import { createRequestOptions, objToQueryString } from '../utils/utils';
import { Food, Photo } from '../types';
import { UserStoreContext } from '../contexts/UserContext';

export const useFoodStore = () => {
  const { authToken } = useContext(UserStoreContext);
  const { foods, setFoods, selectedDate, selectDate } = useContext(FoodStoreContext);

  const getFoods = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Foods}?${objToQueryString({
          consumedAt: selectedDate.toISOString().substring(0, 10),
        })}`,
        createRequestOptions('GET', authToken!)
      );

      if (!response.ok) {
        throw new Error('Failed to get foods');
      }
      const result = await response.json();
      setFoods(result);
    } catch (e) {
      console.log(e);
      console.log('Failed to get foods');
      setFoods([]);
    }
  };

  const getFoodByBarCode = async (barcode: number): Promise<any> => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Foods}/search/${barcode}`,
        createRequestOptions('GET', authToken!)
      );

      if (!response.ok) {

        throw new Error('Failed to get food');
      }

      const result = await response.json();

      const scannedFood = {
        name: result.products[0].product_name,
        kcal: Number(result.products[0].nutriments["energy-kcal_value_computed"]),
      }

      return scannedFood;

      // setFoods(result);
    } catch (e) {
      console.log(e);
      console.log('Failed to get food');
      setFoods([]);
    }
  }

  const addFood = async (name: string, kcal: number): Promise<number | null> => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Foods}`,
        createRequestOptions('POST', authToken!, {
          name,
          kcal,
          consumedAt: new Date().toISOString(),
        })
      );

      if (!response.ok) {
        throw new Error('Failed to add food');
      }
      const result = await response.json();
      return parseInt(result.id);
    } catch (e) {
      console.log(e);
      console.log('Failed to add food');
    }
    return null;
  };

  const addFoodImage = async (foodId: number, photo: Photo): Promise<void> => {
    try {
      const data = new FormData();
      if (!photo.name) photo.name = 'Photo' + Date.now() + '.jpeg';
      if (!photo.type) photo.type = 'image/jpeg';
      data.append('file', photo as any);
      const response = await fetch(`${BASE_URL}${endpoints.Foods} /${foodId}/photo`, {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${authToken} ` },
        body: data,
      });
      if (!response.ok) {
        throw new Error('Failed add photo');
      }
      console.log('Added photo successful');
    } catch (e) {
      console.log(e);
      console.log('Failed to add photo');
    }
  };

  const totalConsumed = (): number => {
    return foods.reduce((sum, food) => sum + food.kcal, 0);
  };

  const deletePhoto = async (foodId: number) => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Foods} /${foodId}/photo`,
        createRequestOptions('DELETE', authToken!)
      );

      if (!response.ok) {
        throw new Error('Failed to delete photo');
      }
      const result = await response.json();
      return parseInt(result.id);
    } catch (e) {
      console.log(e);
      console.log('Failed to delete photo');
    }
    return null;
  };

  const deleteFood = async (foodId: number) => {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoints.Foods}/${foodId}`,
        createRequestOptions('DELETE', authToken!)
      );

      if (!response.ok) {
        throw new Error('Failed to delete food');
      }
      const result = await response.json();
      return parseInt(result.id);
    } catch (e) {
      console.log(e);
      console.log('Failed to delete food');
    }
    return null;
  };

  return {
    foods,
    getFoods,
    selectedDate,
    selectDate,
    totalConsumed,
    addFood,
    addFoodImage,
    deletePhoto,
    deleteFood,
    getFoodByBarCode,
  };
};
