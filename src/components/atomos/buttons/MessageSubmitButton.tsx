import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';


interface PROPS {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    staff: boolean|null;
}

export const MessageSubmitButton:React.VFC<PROPS> = ({text,setText,staff}) => {
    return (
       
        <IconButton disabled={text === ''}>
            <SendIcon />
        </IconButton>
        
    )
}
