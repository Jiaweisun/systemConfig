export class SystemConfig {
   public id:number;
  constructor(
    public system_id:number,
    public name: String,
    public key_name: String,
    public dev_value: String,
    public qa_value: String,
    public prod_value: String,
    public privatepro: number
    ){}
}