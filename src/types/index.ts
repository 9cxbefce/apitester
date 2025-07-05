export interface RequestData {
  id: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
  timestamp: number;
  name?: string;
}

export interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  time: number;
  size: number;
}