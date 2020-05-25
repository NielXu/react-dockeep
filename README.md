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

ReactDOM.render(
  <React.StrictMode>
    <CView config={CONFIG}>
      <App />
    </CView>
  </React.StrictMode>,
  document.getElementById('root')
);
```