import React, {memo}from 'react'
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';



interface PROPS {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    staff: boolean|null;
    inputEl: any;
    newComment: any;
}

export const StaffMessageSubmitButton:React.VFC<PROPS> = memo(({inputEl,text,setText,staff,newComment}) => {
    return (
        <IconButton disabled={text === ''} value={text} onClick={(e) => {setText("");inputEl.current.focus();newComment(e);} }>
            <SendIcon />
        </IconButton>
        
    )
})
