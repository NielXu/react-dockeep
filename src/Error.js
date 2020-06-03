import React from 'react';

export default function Error({ message="Error", trace, style={} }) {
  return (
    <div style={style}>
      {message}
      {trace && (
        <div>
          The trace is:
          <code>
            <pre>{typeof trace === "object"? JSON.stringify(trace, null, 2) : trace}</pre>
          </code>
        </div>
      )}
    </div>
  )
}