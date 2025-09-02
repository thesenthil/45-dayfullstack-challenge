 const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");

async function getQuote() {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    if (!response.ok) throw new Error("API not working");
    const data = await response.json();

    // Remove and re-add fade-in animation
    quoteText.classList.remove("fade-in");
    authorText.classList.remove("fade-in");
    void quoteText.offsetWidth;
    void authorText.offsetWidth;

    quoteText.textContent = `"${data.quote}"`;
    authorText.textContent = `- ${data.author}`;

    quoteText.classList.add("fade-in");
    authorText.classList.add("fade-in");
  } catch (error) {
    quoteText.textContent = "Oops! Could not fetch a quote.";
    authorText.textContent = "";
    console.error(error);
  }
}

// Fetch quote on load
getQuote();

// Button click event
newQuoteBtn.addEventListener("click", getQuote);
