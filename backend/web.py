import requests
from bs4 import BeautifulSoup

# Replace this with the URL of the website you want to scrape
url = "https://layerzero.foundation"

# Send an HTTP GET request to the URL
response = requests.get(url)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')

    # Now, you can access and manipulate the HTML elements within the 'soup' object
    # For example, print the title of the web page:
    print(soup.title)
    
    # To get the HTML as a string, you can use the 'prettify' method:
    html_code = soup.prettify()

    # You can also find specific elements by their tags, attributes, etc.
    # For example, find all the links in the page:
    links = soup.find_all('a')
    for link in links:
        print(link.get('href'))
else:
    print(f"Failed to retrieve the web page. Status code: {response.status_code}")
