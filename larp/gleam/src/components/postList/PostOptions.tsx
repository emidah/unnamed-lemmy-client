import { PostView } from "lemmy-js-client";
import "./postOptions.scss"
import "../../lemmy-client/client"

export default function PostOptions(props: { post: PostView }) {
    const post = props.post;
    const upvoted = props.post.my_vote;
    return <div className="postOptions">
        <div className="votes">
            <span className={ "material-symbols-outlined arrow" + (upvoted ? " active" : "") }>
                arrow_upward
            </span>
            <span>{post.counts.score}</span>
            <span className="material-symbols-outlined arrow">
                arrow_downward
            </span>
        </div>
        <div className="commentCount">{post.counts.comments} comments</div></div>
}