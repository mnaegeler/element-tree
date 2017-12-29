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

  const Button = function (data) {
    const element = doc.createElement('button');
    if (data.child) element.appendChild(data.child);
    if (data.onPressed) element.onclick = data.onPressed;
    return element;
  };

  return {
    runApp,
    Text,
    Container,
    Column,
    Row,
    Expanded,
    Button,
  };
})(window);

Object.assign(window, ElementTree);

let state = {
  _counter: 1,
};
const CustomText = function () {

  const _increment = (element) => {
    const parent = element.parentNode;
    let elementIndex = null;
    parent.childNodes.forEach((item, index) => {
      if (item === element) {
        elementIndex = index;
        return;
      }
    });
    state._counter++;
    parent.insertBefore(new CustomText(), element);
    element.remove();
  };

  const ElementBuilder = () => new Container({ children: [
    new Text(`Contador: ${state._counter}`),
    new Button({ 
      onPressed () { _increment(build) },
      child: new Text('Increment'), }),
  ] });
  const build = ElementBuilder();

  return build;
};

runApp({
  body: new Row({
    children: [
      new Text("Olá"),
      new Expanded({ children: [
        new Text('hey there!'),
        new CustomText(),
      ] }),
      new Text("Mundo!"),
    ],
  }),
});

