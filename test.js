// test.js

function extractVideoId(url) {
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    let match;
    while ((match = regex.exec(url))) {
      if (match[1] === 'v') {
        return match[2];
      }
    }
    return null;
  }
  
  // Test cases
  const testUrls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.youtube.com/watch?v=abcdefg',
    'https://www.youtube.com/watch?foo=bar&v=12345',
    'https://www.youtube.com/watch?param1=value1&param2=value2&v=test',
  ];
  
  testUrls.forEach((url) => {
    const videoId = extractVideoId(url);
    console.log(`URL: ${url} => Video ID: ${videoId}`);
  });
  