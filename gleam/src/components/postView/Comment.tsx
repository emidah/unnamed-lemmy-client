import { CommentView } from "lemmy-js-client";
import { formatCreator } from "../../helpers/user-helper";
import "./Comment.scss";
import MarkdownIt from "markdown-it";
const md = new MarkdownIt(); 

export default function Comment(props: {comment: CommentView, comments: Map<string, CommentView[]>}){
    const comment = props.comment;
    const replies = props.comments?.get(comment.comment.path);
    const creatorName = formatCreator(comment.creator);
    return <div className="comment-view">
        <div className="comment-header">
            {creatorName}
        </div>
        <div className="comment-content" dangerouslySetInnerHTML={{__html: md.render(comment.comment.content)}}>
        </div>
        {replies ?
            <div className="comment-replies">
                {replies.map(reply => <Comment key={reply.comment.id} comments={props.comments} comment={reply} />)}
            </div> : ""}
    </div>
}