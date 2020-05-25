# react-cview
react-cview is a lightweight component that allows user to create documentation for their components and view them directly without extra configurations.

# Get started
react-cview is not published to npm yet, run the following commands to test it in your local project:

```sh
git clone https://github.com/NielXu/react-cview.git
cd react-cview
npm install
npm link

cd /path/to/your/local/project
npm link react-cview
```

Then you can import react-cview in your index.js and start using it

```sh
import React from 'react';
import ReactDOM from 'react-dom';
import CView from 'react-cview';

const CONFIG = {...}

ReactDOM.render(
  <React.StrictMode>
    <CView config={CONFIG}>
      <App />
    </CView>
  </React.StrictMode>,
  document.getElementById('root')
);
```

# Config
The documentation will be rendered based on the configuration provided, here are a list of fields that can be configured.

- `cols(optional)` Control how many components will be shown per row
- `components(required)` A list of components with the following properties
    - `component(required)` The actual component that will be rendered
    - `description(optional)` The description of this component
    - `props(optional)` A list of props that will be applied to the component with the following properties
        - `name(required)` Name of the property
        - `value(required)` The value of the property
        - `editable(optional)` Whether or not this property can be tested and edited
        - `type(optional)` The type of the value
        - `required(optional)` Whether or not this property is required
        - `doc(optional)` The documentation of this property

An example of a valid config

```
const CONFIG = {
  components: [
    {
      component: Select,
      description: "A well styled select component from react-select",
      props: [
        {
          name: "options",
          value: [{value: "foo", label: "FOO"},{value: "bar", label: "BAR"}],
          editable: false,
          type: "array",
          required: true,
          doc: "Options that can be selected"
        },
      ],
    },
    {
      component: CSelect,
      description: "Custom selection",
      props: [
        {
          name: "className",
          value: "custom-className",
          editable: true,
          type: "array",
          required: false,
          doc: "Options that can be selected"
        }
      ]
    },
    {
      component: Input,
    }
  ],
}
```

