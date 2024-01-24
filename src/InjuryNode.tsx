import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const DEFAULT_HANDLE_STYLE = {
  width: 8,
  height: 8,
};

export default memo(({ data, isConnectable, ...p }: any) => {
  return (
    <div
      style={{
        color: data.categoryColor,
        border: `1px solid ${data.categoryColor}`,
        padding: '12px',
        borderRadius: '50px',
        minWidth: '300px',
        textAlign: 'center'
      }}
    >
      <div>{data.label}</div>
      <Handle
        type="target"
        id="a"
        position={Position.Left}
        style={{ ...DEFAULT_HANDLE_STYLE, background: data.categoryColor }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
    </div>
  );
});
