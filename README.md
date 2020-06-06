# react-cdv
react-cdv stands for react-component-documentation-viewer, it allows user to create documentation for their components and view them directly with custom configurations in their projects.

# Props
|Name|required|type|default|description|
|---|---|---|---|---|
|config|true|object||The config that controls the components and documentation
|url|false|string|'doc'|The url that will be used to browse the components

### Config
The documentation will be rendered based on the configuration provided, here are the fields that can be configured.

|Name|required|type|default|description|
|---|---|---|---|---|
|components|true|array||A list of components with configuration

### components
|Name|required|type|default|description|
|---|---|---|---|---|
|component|true|function \| class||The component that will be rendered
|name|false|string|The given component's name|The name of the component
|description|false|string|'No description'|The description of the component
|props|false|array|[]|A list of props that will be applied to the component with documentation

### props
|Name|required|type|default|description|
|---|---|---|---|---|
|name|true|string||The name of the prop
|value|true|string||The value of the prop
|required|false|boolean|false|Whether this prop is required by the component or not
|default|false|any||The default value of the prop
|type|false|string|'any'|The type of the prop
|doc|false|string|''|The documentation of this prop

# Example
An example of a valid config

```javascript
const CONFIG = {
  components: [
    {
      name: "Select",
      component: Select,
      description: "A well styled select component from react-select",
      props: [
        {
          name: "options",
          value: [{value: "foo", label: "FOO"},{value: "bar", label: "BAR"}],
          type: "array",
          required: true,
          doc: "Options that can be selected"
        },
      ],
    },
    {
      name: "CSelect",
      component: CSelect,
      description: "Custom selection",
      props: [
        {
          name: "className",
          value: "custom-className",
          type: "array",
          doc: "Options that can be selected"
        }
      ]
    },
    {
      name: "Input"
      component: Input,
    }
  ],
}
```

To run examples use `npm start` and go to [http://localhost:8080](http://localhost:8080) in your browser, see [examples](https://github.com/NielXu/react-cdv/tree/master/examples) folder for more information

# TODO

###### v1.0.0
- [x] Add example
- [x] Prevent name duplications
- [x] ~Improve add config using functions~ (Push to v1.1.0)
- [x] Change all bootstrap elements to React Bootstrap
- [x] Implement the search feature of the sidebar
- [x] Proper warning and error display
- [x] ~Figure out a way when user deleted required props and error is thrown~ (This only happens in react development mode)