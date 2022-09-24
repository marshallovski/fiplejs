fiple.root = document.getElementById('approot');
const italic = fiple.italic;
let clickTimes = 0;

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
    elem: 'button',
    content: 'Click me please...',
    id: 'clickBtn',
    style: { marginTop: '1em' },
    events: {
      click: () => {
        clickTimes++;
        document.getElementById('clickBtn').textContent = `${clickTimes} times clicked!`;
      }
    }
  },
  {
    elem: 'p',
    class: ['heheClass', 'test', 'haha'],
    id: 'testID',
    content: italic('Date now: {date}'),
    style: {
      color: '#999',
      fontSize: '10px',
      marginTop: '1.5em'
    }
  }],
  params = { component: 'Home' },
  props = { name: 'Jack', date: new Date(Date.now()) }
);