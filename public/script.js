const ElementTree = (function (window) {
  const print = console.log;
  const printError = console.error;
  const doc = document;

  const runApp = function (data) {
    if (!data.body) return printError('Add a body to your application.');
    const AppRoot = doc.getElementById('app');
    AppRoot.appendChild(data.body);
  };

  const _mapChildren = function (element, data) {
    if (data && Array.isArray(data.children))
      data.children.map(item => element.appendChild(item));
  };

  const Text = function (data) {
    const element = doc.createElement('span');
    element.ElementName = this.constructor.name;
    element.appendChild(doc.createTextNode(data));
    return element;
  };

  const Container = function (data) {
    const element = doc.createElement('div');
    element.ElementName = this.constructor.name;
    _mapChildren(element, data);
    return element;
  };

  const Row = function (data) {
    const element = doc.createElement('div');
    element.ElementName = this.constructor.name;
    _mapChildren(element, data);
    element.style.display = 'flex';
    element.style.flexDirection = 'row';
    return element;
  };

  const Column = function (data) {
    const element = doc.createElement('div');
    element.ElementName = this.constructor.name;
    _mapChildren(element, data);
    element.style.display = 'flex';
    element.style.flexDirection = 'column';
    return element;
  };

  const Expanded = function (data) {
    const element = doc.createElement('div');
    element.ElementName = this.constructor.name;
    _mapChildren(element, data);
    element.style.flexGrow = '1';
    return element;
  };

  const Button = function (data) {
    const element = doc.createElement('button');
    element.ElementName = this.constructor.name;
    if (data) {
      if (data.child) element.appendChild(data.child);
      if (data.onPressed) element.onclick = data.onPressed;
    }
    return element;
  };
  
  const setState = function (element, toSet) {
    const parent = element.parentNode;
    let elIndex = null;
    parent.childNodes.forEach((item, index) => {
      if (item === element) {
        elIndex = index;
        return;
      }
    });

    if (typeof toSet === 'function')
      toSet();

    parent.insertBefore(new window[element.ElementName](), element);
    element.remove();
  };

  return {
    runApp,
    setState,
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
    setState(element, () => {
      state._counter++;
    });
  };

  const ElementBuilder = () => new Container({ children: [
    new Text(`Contador: ${state._counter}`),
    new Button({ 
      onPressed () { _increment(build) },
      child: new Text('Increment'), }),
  ] });
  const build = ElementBuilder();
  build.ElementName = this.constructor.name;
  window.CustomText = CustomText;

  return build;
};

const listTexts = () => {
  const length = 10000;
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(new Text(`Item: ${i}`));
  }
  return result;
};

runApp({
  body: new Row({
    children: [
      new Text("Olá"),
      new Expanded({ children: listTexts() }),
      new Text("Mundo!"),
    ],
  }),
});

