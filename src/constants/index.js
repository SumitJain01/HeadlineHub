export const newsApiUrl = "https://newsapi.org/v2/everything?q=usa&from=2024-07-26&pageSize=100&sortBy=publishedAt&apiKey=bec96f53f4e6492f872dd34bd42eccbe"

export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12;

    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${hours}:${minutesStr} ${ampm}`;
  };
  
