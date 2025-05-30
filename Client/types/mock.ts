// Type definitions for mock data
export type MockFormData = {
  contentType: string;
  charset: string;
  httpBody: string;
  createdAt: string;
  httpHeader?: string;
  identifier: string;
  _v: number;
  _id?: string;
  name?: string;
  description?: string;
  date?: string;
  deleteUrl?: string;
  endpointUrl?: string;
};
// Mock table props
export interface MockTableProps {
  data: MockFormData[]; 
}
