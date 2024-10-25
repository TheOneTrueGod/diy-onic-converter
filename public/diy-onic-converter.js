/**
 * Implement your converter function here.
 */

const CHARS_TO_BOLD = 2

// enum values
const ELEMENT_NODE = 1
const TEXT_NODE = 3

// Won't work for other languages :(
function isLetter(str) {
  return str.length === 1 && str.match(/[A-Za-z]/i);
}

// We use isLetter to find the start of a word, and isLetterOrNumber to find the end of a word, so that we include acronyms or l33t speak
function isLetterOrNumber(str) {
  return str.length === 1 && str.match(/[A-Za-z.0-9]/i);
}
// Also need to deal with periods and numbers

const convertWord = (word) => {
  // If you wanted to change the number of characters to bold, this is the place to do it
  const wrapper = document.createElement('span')
  const boldLength = Math.min(CHARS_TO_BOLD, word.length)
  const strongCharacters = word.slice(0, boldLength)
  const weakCharacters = word.slice(boldLength, word.length)

  const strongPart = document.createElement('strong')
  strongPart.appendChild(document.createTextNode(strongCharacters))

  const weakPart = document.createTextNode(weakCharacters)

  wrapper.appendChild(strongPart)
  wrapper.appendChild(weakPart)

  return wrapper
}

// Use a lexer / tokenizer approach to iterate through the string so we only replace actual words
const convertNode = (node) => {
  const newNode = document.createElement('span')
  const nodeText = node.nodeValue
  // iterate through characters
  let wordStart = undefined
  let lastWordEnd = 0
  for (let i = 0; i < nodeText.length; i++) {
    if (wordStart === undefined && isLetter(nodeText[i])) {
      wordStart = i
      if (lastWordEnd !== i) {
        // Up to now, there were no words.  Add the text as unemphasized
        newNode.appendChild(document.createTextNode(nodeText.slice(lastWordEnd, wordStart)))
      }
    }
    if (wordStart !== undefined && !isLetterOrNumber(nodeText[i])) {
      const word = nodeText.slice(wordStart, i)
      // We found a word!  Convert it and add it
      newNode.appendChild(convertWord(word))

      // Update our position marker
      lastWordEnd = i
      wordStart = undefined
    }
  }

  if (wordStart === undefined) {
    // We didn't find the start of a word.  Just add the rest unemphasized.
    newNode.appendChild(document.createTextNode(nodeText.slice(lastWordEnd)))
  } else {
    // We found the start of a word, but not the end.  Add the remainder as a word
    newNode.appendChild(convertWord(nodeText.slice(wordStart)))
  }
  node.replaceWith(newNode)
}

const recursivelyConvert = (container) => {
  if (!container.childNodes) {
    return // done
  }

  container.childNodes.forEach((node) => {
    switch (node.nodeType) {
      case TEXT_NODE:
        convertNode(node)
        break
      case ELEMENT_NODE:
        recursivelyConvert(node)
        break
      default:
        // As far as I know (and through my testing), the above should be sufficient
        break
    }
  })
}

const diyOnicConverter = (textContentContainerSelector) => {
  const container = document.querySelector(textContentContainerSelector);
  recursivelyConvert(container)
  /* Etc. etc. etc. your code etc. */
};

// Allow global access so that this can be executed from the console.
window.diyOnicConverter = diyOnicConverter;

// Uncomment me for faster / easier development
/*window.onload = () => {
  diyOnicConverter(".convertMe")
}*/
