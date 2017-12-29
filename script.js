const ElementTree = (function (window) {
  const print = console.log;
  const printError = console.error;
  const doc = document;

  const runApp = function (data) {
    if (!data.body) return printError('Add a body to your application.');
    const AppRoot = doc.getElementById('app');
    AppRoot.appendChild(data.body);
  };

  const Text = function (data) {
    const element = doc.createElement('span');
    element.appendChild(doc.createTextNode(data));
    return element;
  };

  const Container = function (data) {
    const element = doc.createElement('div');
    if (data.children) data.children.map(item => element.appendChild(item));
    return element;
  };

  const Row = function (data) {
    const element = doc.createElement('div');
    if (data.children) data.children.map(item => element.appendChild(item));
    element.style.display = 'flex';
    element.style.flexDirection = 'row';
    return element;
  };

  const Column = function (data) {
    const element = doc.createElement('div');
    if (data.children) data.children.map(item => element.appendChild(item));
    element.style.display = 'flex';
    element.style.flexDirection = 'column';
    return element;
  };

  const Expanded = function (data) {
    const element = doc.createElement('div');
    if (data.children) data.children.map(item => element.appendChild(item));
    element.style.flexGrow = '1';
    return element;
  };

  return {
    runApp,
    Text,
    Container,
    Column,
    Row,
    Expanded,
  };
})(window);

Object.assign(window, ElementTree);


runApp({
  body: new Row({
    children: [
      new Text("Olá"),
      new Expanded({ children: [
        new Text('hey there!'),
        new Text('we are awesome!'),
      ] }),
      new Text("Mundo!"),
    ],
  }),
});

