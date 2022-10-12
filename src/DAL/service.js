export const postData = async(url, data) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    });
           
  }