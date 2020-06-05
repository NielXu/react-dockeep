import React from 'react';

function Topbar({ items, style={} }) {
  return (
    <div style={{ width: '100%', position: 'fixed', top: 0, ...style }}>
      {
        items.map((e, i) => {
          return <a style={{ padding: 15 }} key={i} href={e.url}>{e.name}</a>
        })
      }
    </div>
  )
}

export default Topbar;

export const TopbarConfig = {
  component: Topbar,
  description: "An example of fixed top bar",
  props: [
    {
      name: "items",
      value: [
        {
          url: "#home",
          name: "Home"
        },
        {
          url: "#about",
          name: "About"
        }
      ],
      required: true,
      doc: "An array of items on top bar",
      type: "Array"
    },
    {
      name: "style",
      value: { position: 'relative' },
      doc: "Additional style applied to the component",
      type: "object"
    }
  ]
}