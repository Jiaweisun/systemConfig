export class PropertiesCondition {

    system: string;
    profile: string;
    filename: string;
    format: string;

  constructor(system?: string, profile?: string, filename?: string, format?:string){
     this.system = system ;
    this.profile = profile ;
    this.filename  = filename;
    this.format = format;
  
    }
}