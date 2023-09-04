import { db } from '$lib/db';

export async function GET({request}) {
  const result = await db.get('SELECT * FROM mirrors ORDER BY Visits ASC LIMIT 100');

  //send a request to URL each of the mirrors to see if they are up
  for(let i = 0; i < result.length; i++){
    
    let url = result[i].URL;
    try{
        let response = await fetch(url+"/ping");
        if(response.ok){
            result[i].Status = "Online";
        } else {
            result[i].Status = "Offline";
        }
    } catch(err){
        result[i].Status = "Offline";
    }
  }

  return new Response(JSON.stringify(result), {
    headers: {
      'Content-Type': 'application/json'
    },
    status: 200
  });
}

