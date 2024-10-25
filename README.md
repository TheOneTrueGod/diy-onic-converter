# To execute the function
Copy everything in public/diy-onic-converter.js and paste it into the console of any web page.

Then call `diyOnicConverter(#QUERY_SELECTOR)` and it will transform the page.
Might I recommend `diyOnicConverter('body')` for the discerning code reviewer?

# Notes from Jeremy
Hi, and welcome to my interview answer for diy-onic-converter.

The approach I used was to navigate through the document tree recursively.
We're not at a particularly high risk of running out of memory from the recursive approach, and an iterative approach seemed more complicated for little gain.
Once I found the text nodes, I used a tokenizer based approach to split each text node up into words, and then replaced each word with a new DOM element.
I tried to keep the DOM as flat as I could -- this will add at most two additonal Elements and one additional TextNode of depth to the DOM.

This approach allows the structure of the document to remain in place (anchor tags, <strong> tags, etc), and gives us some pretty strong flexibility when it comes to identifying words and where / how to place the bolding.

I ignored the suggestion to start with the basic requirements.  I had the DOM Node structure explained to me many years ago, and I wanted to take this opportunity to learn it first hand, and once I was doing that it was easier to just go for the advanced version.
I enjoyed re-learning the tokenizer approaches I was taught in my university days!

# Testing

I used this text on the bionic reading app to test out how it works;
`This is a test to (input some) sample text.  It includes a url like www.google.com.  I wonder what will happen.  I also wonder what happens with numbers like 12.30 or 5542 or 6tarting a word or one in the m1ddle of a word or near3r to the end`
This text also summarizes the text edge cases I looked at.
One edge case my approach does not have a solution for;
- If you run this multiple times, the page will get more and more bold.
  - This is fixable by storing the original value in a Shadow DOM, and checking to see if we're working on "raw" nodes or "modified" nodes

I tested it out on;
- This wikipedia page [Fuso class battleship](https://en.wikipedia.org/wiki/Fus%C5%8D-class_battleship)
- Our gmail conversation
  - google tends to have quite complicated page layouts so I figured this would be a good way to check that
- [Reddit](https://www.reddit.com)
  - Testing complex layouts with images & sidebars
  - This showcases one of the limiations of this approach -- it's overrideable by the styles on the website.
  - Making the bolding `!important` is a way around this, but we would still at the mercy of the web page not using its own `!important`s
- Hacker News
  - A very text-heavy site
- [Stack Overflow](https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number) (Incidentally, the one I copied some code from!)
  - This shows another limiation;  It's kinda slow to run.  Since we are doing this based on a selector, we could split it up into multiple smaller calls that yield the thread, or use web workers to make it async.


# diy-onic-converter
Coding challenge to make your own (DIY) “bionic reading converter.”

Start by reading the challenge instructions in [INTERVIEW.md](./INTERVIEW.md). When you are finished, you can edit this file to include any documentation for your work.

_or…_

**Sta**rt **b**y **read**ing **th**e **challen**ge **instructio**ns **i**n **[INTERVIEW.](./INTERVIEW.md)**[md](./INTERVIEW.md). **Whe**n **yo**u **ar**e **finish**ed, **yo**u **ca**n **edi**t **thi**s **fil**e **t**o **inclu**de **an**y **documentat**ion **fo**r **you**r **wor**k.
