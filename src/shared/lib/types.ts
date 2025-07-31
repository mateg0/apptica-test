export type Country = {
  id: number;
  name: string;
  country: string;
  active: boolean;
  icon: string;
  is_top_collected: boolean;
  top_apps: boolean;
  locale: string;
};

export type Category = {
  id: number;
  name: string;
};

export type RequestStatus = "initial" | "pending" | "done" | "fail";

export type TopHistory = Record<number, Record<number, Record<string, number>>>;
