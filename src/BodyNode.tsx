import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const DEFAULT_HANDLE_STYLE = {
  width: 8,
  height: 8,
};

const TYPE_STYLE: any = {
  "head-face-center": { top: 50, left: 295 },
  "chest-upper-right": { top: 130, left: 260 },
  "abdomen-upper-center": { top: 200, left: 295 },
  "leg-lower-right": { top: 535, left: 248 },
  "arm-upper-left": { top: 150, left: 360 },
  "arm-lower-left": { top: 230, left: 420 },
}

export default memo(({ data, isConnectable }: any) => {
  return (
    <div>
      <img width={600} alt='Lineart Male Front' src='/Lineart_Male_Front.png' />
      {
        data.handles?.map((item: any) => (
          <Handle
            type="source"
            id={item.id}
            position={Position.Right}
            style={{ ...DEFAULT_HANDLE_STYLE, ...(TYPE_STYLE[item.id] || {}), background: item.color }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={isConnectable}
          />
        ))
      }
    </div>
  );
});
