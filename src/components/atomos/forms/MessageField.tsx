import React, { useState,memo} from 'react'
import { TextField } from '@material-ui/core'

interface PROPS {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    staff: boolean|null;
    inputEl: any;
    newComment: any;
}

export const MessageField:React.VFC<PROPS> = memo(({inputEl,text,setText,staff,newComment}) => {
    const [isComposed, setIsComposed] = useState(false);
    return (
        <TextField 
        inputRef={inputEl}
        autoFocus
        fullWidth={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
          onKeyDown={(e: any) => {
            if (isComposed) return;
            
            const text = e.target.value;
            if (text === '') return;

            if (e.key === 'Enter'){
              newComment(e);
            }
          }}
          onCompositionStart={() => setIsComposed(true)}
          onCompositionEnd={() => setIsComposed(false)}
          value={text}
        />
    )
    
})