import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

interface PROPS {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    staff: boolean|null;
}

export const MessageField:React.VFC<PROPS> = ({text,setText,staff}) => {
    const [isComposed, setIsComposed] = useState(false);
    return (
        <TextField 
        fullWidth={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
          onKeyDown={(e: any) => {
            if (isComposed) return;
            
            const text = e.target.value;
            if (text === '') return;

            if (e.key === 'Enter'){
              setText('');
              e.preventDefault();
            }
          }}
          onCompositionStart={() => setIsComposed(true)}
          onCompositionEnd={() => setIsComposed(false)}
          value={text}
        />
    )
    
}