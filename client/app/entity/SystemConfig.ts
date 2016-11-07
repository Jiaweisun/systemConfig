export class SystemConfig {
   public id:number;
  constructor(
    public system_id:number,
    public name: string,
    public key_name: string,
    public dev_value: string,
    public qa_value: string,
    public prod_value: string,
    public privatepro: number
    ){}
}