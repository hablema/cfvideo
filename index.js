addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Get the original response
  const response = await fetch(request)
  
  // Get the URL
  const url = new URL(request.url)
  
  // Check if it's an MP4 file
  if (url.pathname.toLowerCase().endsWith('.mp4')) {
    // Clone the response
    const newHeaders = new Headers(response.headers)
    
    // Add the Accept-Ranges header
    newHeaders.set('Accept-Ranges', 'bytes')
    
    // Return a new response with the modified headers
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    })
  }
  
  return response
}
