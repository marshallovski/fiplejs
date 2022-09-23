fiple.root = document.getElementById('approot');
const italic = fiple.italic;

fiple.render(
  [{
    elem: 'h1',
    content: 'Hello, {name}!'
  },
  {
    elem: 'p',
    content: 'Welcome to the <b>fiple.js</b> demo.',
    style: {
      color: '#555'
    }
  },
  {
    elem: 'p',
    content: italic('Date now: {date}'),
    style: {
      color: '#999',
      fontFamily: 'JetBrains Mono',
      fontSize: '10px',
      marginTop: '1.5em'
    }
  }],
  params = { component: 'Heading' },
  props = { name: 'Jack', date: new Date(Date.now()) }
);