export type Weather = {
    temperature: number;
    humidity: number;
    description: string;
  };
  
  export type Subscription = {
    email: string;
    city: string;
    frequency: "hourly" | "daily";
  };