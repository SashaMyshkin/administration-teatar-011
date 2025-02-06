import { AuditionProps } from "@/types/audition";
import AuditionsUI from "./AuditionsUI";

export default async function Auditions() {

  const urlStr = process.env.API ?? "";

  const auditionProps:AuditionProps = {
    error:false,
    message:"",
    data:{
      rows:[]
    }
  }

  try{
    const url = new URL(urlStr);
    url.pathname += 'auditions';
    const result = await fetch(url);
    const json = await result.json();
    auditionProps.error = json.error;
    auditionProps.message = json.message;
    auditionProps.data = json.data;
  } catch(error){
    auditionProps.error = true;
    auditionProps.message = "An error has occured while fetching data.";
    auditionProps.data = {rows:[]};
  }

  
    return (
      <AuditionsUI {...auditionProps}/>
    );
  }
