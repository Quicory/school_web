export interface Paging {
  Page: number | 1;
  PageSize: number | 10;
  FieldOrder?: string;
  IsAsc: boolean | true;
  FilterFieldName?: string;
  Filter?: string;
}
