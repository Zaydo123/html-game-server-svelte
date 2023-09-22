import { db } from '$lib/db';

// Object to store last request times
const lastRequestTimes = {};

export async function POST(data) {
  const { request } = data;
  // Read the request body
  const reader = request.body.getReader();
  // Read the data from the request body
  const { done, value } = await reader.read();

  // Convert the data to a string
  const text = new TextDecoder("utf-8").decode(value);

  // Use regular expression to extract requestType and requestDetails
  const requestTypeMatch = text.match(/name="requestType"\r\n\r\n(.*?)\r\n/);
  const requestDetailsMatch = text.match(/name="requestDetails"\r\n\r\n([\s\S]*?)\r\n/);

  const requestType = requestTypeMatch ? requestTypeMatch[1] : null;
  const requestDetails = requestDetailsMatch ? requestDetailsMatch[1] : null;

  // Get Request IP 
  let clientAddress = data.getClientAddress();

  if (!clientAddress){
    // no problem, just default to localhost
    clientAddress = "No Ip found";
  } else if(clientAddress.includes("::ffff:")){
    // remove the ipv6 prefix
    clientAddress = clientAddress.replace("::ffff:", "");
  } else if(clientAddress.length < 1){
    // no problem, just default to localhost
    clientAddress = "No Ip found";
  }

  // Check for cooldown
  const currentTime = Date.now();
  const lastRequestTime = lastRequestTimes[clientAddress] || 0;

  if (currentTime - lastRequestTime < 10000) {
    return new Response("Cooldown, please wait 10 seconds between requests.", { status: 429 });
  }

  // Update last request time
  lastRequestTimes[clientAddress] = currentTime;

  // Database operations
  let sql = ` INSERT INTO requests (Type, Details, IP) VALUES (?, ?, ?)`;
  let params = [requestType, requestDetails, clientAddress];
  let result = await db.insert(sql, params);

  if(result.affectedRows > 0){
    return new Response("Success!", { status: 200 });
  } else {
    return new Response("Error!", { status: 500 });
  }
}
