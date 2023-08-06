export interface ResponseFormat<TData> {
  status: number;
  message: string;
  data: TData;
}