export interface Ingradients {
id:number;
 name: string;
category:string
}
export interface IngredientMultiSelectProps {
  onSearch: (query: string) => void;
}