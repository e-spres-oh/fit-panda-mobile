import React from "react";
import { BASE_URL, endpoints } from '../endpoints';

export type UserProfile = {
    name: string;
    sex: string;
    height: number;
    weight: number;
    age: number;
    activity: string;
    goal: string;
    target: number;
    userId: number;
};

export interface IMyStore {
    isLoggedIn: boolean;
    userId: number;
    token: string;
    userProfile: UserProfile | null;
    saveUserProfile(userProfile: UserProfile, userId: number): void;
    fetchUserProfile(): Promise<UserProfile>;
    register(email: string, password: string): void;
    login(email: string, password: string): void;
    logout(): void;
    reset(): void;
    bmrCalculator(): number
}

export const defaultUserProfile: UserProfile = {
    name: "PLACEHOLDER",
    sex: "F",
    height: 160,
    weight: 70,
    age: 16,
    activity: "LOW",
    goal: "LOSE_WEIGHT",
    target: 80,
    userId: 0,
};

export class MyStore implements IMyStore {
    isLoggedIn: boolean = false;
    userId: number = 0;
    token: string = "";
    userProfile: UserProfile | null = null;

    reset() {
        this.userId = 0;
        this.userProfile = null;
        this.isLoggedIn = false;
        this.token = "";
    }

    async saveUserProfile(userProfile: UserProfile, userId: number) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({ ...userProfile, userId }),
        };
        console.log("saveUserProfile: ", JSON.stringify(requestOptions));
        try {
            const response = await fetch(`${BASE_URL}${endpoints.Profile}`,
                requestOptions
            );
            const result = await response.json();
            console.log("save profile: ", JSON.stringify(result));
        } catch (e) {
            console.log(e);
            console.log("Failed to save profile");
        }
    }

    async fetchUserProfile(): Promise<UserProfile> {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
        };
        try {
            const response = await fetch(
                `${BASE_URL}${endpoints.Profile}`,
                requestOptions
            );
            const result = await response.json();
            console.log("fetchUserProfile result: ", JSON.stringify(result));
            this.userId = result.userId;
            delete result["id"];
            this.userProfile = result as UserProfile;
            return this.userProfile ?? defaultUserProfile;
        } catch (e) {
            this.userProfile = null;
            console.log(e);
            console.log("Failed to fetch user profile");
            return defaultUserProfile;
        }
    }

    async register(email: string, password: string) {

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        };

        try {
            const response = await fetch(
                "https://fit-panda.e-spres-oh.com/auth/register",
                requestOptions
            );
            const result = await response.json();
            console.log("register result: ", JSON.stringify(result));
            this.userId = result.id;
            await this.login(email, password);
            await this.saveUserProfile(defaultUserProfile, this.userId);
        } catch (e) {
            console.log(e);
            console.log("Failed to create Fit-Panda user");
        }
    }

    async login(email: string, password: string) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        };

        try {
            const response = await fetch(
                `${BASE_URL}${endpoints.Login}`,
                requestOptions
            );
            const result = await response.json();
            if (response.ok) {
                this.isLoggedIn = true;
                this.token = result.access_token;
                console.log("login result: ", JSON.stringify(result));
            } else {
                this.isLoggedIn = false;
                console.log(JSON.stringify(result));
                console.log(result.message);
            }
        } catch (e) {
            this.isLoggedIn = false;
            console.log(e);
            console.log("Failed to create Fit-Panda user");
        }
    }


    bmrCalculator = () => {
        let bmr: number = 0;

        if (this.userProfile?.sex === "M") {
            bmr = 66 + (13.7 * this.userProfile.weight) + (5 * this.userProfile.height) - (6.8 * this.userProfile.age);
        } else if (this.userProfile?.sex === "F") {
            bmr = 655 + (9.6 * this.userProfile.weight) + (1.8 * this.userProfile.height) - (4.7 * this.userProfile.age);
        } else {
            bmr = -1;
        }

        if (bmr > 0) {
            if (this.userProfile?.activity === "LOW") {
                bmr = bmr * 1.2;
            } else if (this.userProfile?.activity === "MODERATE") {
                bmr = bmr * 1.375;
            } else if (this.userProfile?.activity === "HIGH") {
                bmr = bmr * 1.725;
            } else if (this.userProfile?.activity === "VERY_HIGH") {
                bmr = bmr * 1.9;
            }

            if (this.userProfile?.goal === "LOSE_WEIGHT") {
                bmr = 0.8 * bmr;
            } else if (this.userProfile?.goal === "GAIN_WEIGHT ") {
                bmr = bmr + 300;
            }


            bmr = Math.round(bmr);

            return bmr;

        } else {
            console.log("Error when calc BMR");
            return -1
        }

        return 0;
    }

    logout() {
        this.reset();
    }
}

export const MyContext = React.createContext<IMyStore>(new MyStore());