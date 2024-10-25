# To execute the function
Copy everything in public/diy-onic-converter.js and paste it into the console of any web page.

Then call `diyOnicConverter(#QUERY_SELECTOR)` and it will transform the page.
Might I recommend `diyOnicConverter('body')` for the discerning code reviewer?

# Notes from Jeremy
Hi, and welcome to my interview answer for diy-onic-converter.

The approach I used was to navigate through the document tree recursively.
We're not at a particularly high risk of running out of memory from the recursive approach, and an iterative approach seemed more complicated for little gain.
Once I found the text nodes, I used a tokenizer based approach to split each text node up into words, and then replaced each word with a new DOM element.
I tried to keep the DOM as flat as I could -- this will add at most one additonal Element and one additional TextNode of depth to the DOM.

This approach allows the structure of the document to remain in place (anchor tags, <strong> tags, etc), and gives us some pretty strong flexibility when it comes to identifying words and where / how to place the bolding.

I ignored the suggestion to start with the basic requirements.  I had the DOM Node structure explained to me many years ago, and I wanted to take this opportunity to learn it first hand, and once I was doing that it was easier to just go for the advanced version.
I enjoyed re-learning the tokenizer approaches I was taught in my university days!

# Testing

I tested it out on this wikipedia page [Fuso class battleship](https://en.wikipedia.org/wiki/Fus%C5%8D-class_battleship) and found that it messed with the layout of images a bit.


# diy-onic-converter
Coding challenge to make your own (DIY) “bionic reading converter.”

Start by reading the challenge instructions in [INTERVIEW.md](./INTERVIEW.md). When you are finished, you can edit this file to include any documentation for your work.

_or…_

**Sta**rt **b**y **read**ing **th**e **challen**ge **instructio**ns **i**n **[INTERVIEW.](./INTERVIEW.md)**[md](./INTERVIEW.md). **Whe**n **yo**u **ar**e **finish**ed, **yo**u **ca**n **edi**t **thi**s **fil**e **t**o **inclu**de **an**y **documentat**ion **fo**r **you**r **wor**k.
