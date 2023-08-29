//accept post request that has a title in the body. set a cookie called title with the value of the title in the body
// but if the title is empty, delete the cookie

export async function POST({request}) {

    //read the request body
    const reader = request.body.getReader();
    //read the data from the request body
    const { done, value } = await reader.read();
    //decode the data and convert it to a string
    const text = new TextDecoder("utf-8").decode(value);
    //parse the string into a JSON object
    const body = JSON.parse(text);
    // Get the title from the request body
    const { title } = body;

    console.log(title);

    if (title && title.trim() !== '') {
      // Set the cookie if the title is not empty
      return new Response(JSON.stringify({ message: 'Cookie set' }), {
        headers: {
            'Set-Cookie': `title=${title}; Path=/; HttpOnly`,
        },
        status: 200,
      });
    } else {
      // Delete the cookie if the title is empty
      return new Response(JSON.stringify({ message: 'Cookie deleted' }), {
        status: 200,
        headers: {
            'Set-Cookie': 'title=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
        }
        });
    }
}
