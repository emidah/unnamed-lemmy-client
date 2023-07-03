import { Post, PostView } from "lemmy-js-client";
import "./postOptions.scss"

export default function PostOptions(props: { post: PostView }){
    const post = props.post;
    return <div className="postOptions">
        <span className="commentCount">{post.counts.comments} comments</span></div>
}