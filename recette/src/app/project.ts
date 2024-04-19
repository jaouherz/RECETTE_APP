import {Users} from "./users";

export interface Project{
  id: number;
  name: string;
  description: string;
  url: string;
  vav_metier: string;
  vav_orga: string; // Use the User interface for the vav_orga property
  datedajout: Date; // Use the Date type for the datedajout property
  dpt_id: File; // Use the File interface for the dpt_id property
  T_U: File; // Use the File interface for the T_U property
  envi: boolean; // Set the default value of the 'envi' field to false
  intervention: boolean; // Set the default value of the 'intervention' field to false
etat:string;
}



