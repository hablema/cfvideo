addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Get the response from the origin
  let response = await fetch(request)
  
  // Get the URL to check if it's an MP4 file
  const url = new URL(request.url)
  
  // Check if the request is for an MP4 file
  if (url.pathname.endsWith('.mp4')) {
    // Clone the response so we can modify it
    const newResponse = new Response(response.body, response)
    
    // Add the Accept-Ranges header
    newResponse.headers.set('Accept-Ranges', 'bytes')
    
    return newResponse
  }
  
  // Return the original response for non-MP4 files
  return response
}
