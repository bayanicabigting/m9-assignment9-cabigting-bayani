const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

const makePoemHTML = poemData => {
  const poem = poemData[0]

  const makeH2 = makeTag('h2')
  const makeH3 = makeTag('h3')
  const makeP = makeTag('p')
  const makeEM = makeTag('em')

  const makeAuthor = pipe(
    name => "by " + name,
    makeEM,
    makeH3
  )
  
  const paragraphs = poem.lines
    .join("\n")
    .split("\n\n")
    .map(stanza =>
      makeP(
        stanza
          .split("\n")
          .join("<br>")
      )
    )
    .join("")
  
  return (
    makeH2(poem.title) +
    makeAuthor(poem.author) +
    paragraphs
  )
}

getPoemBtn.onclick = async function() {
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
