import { PostView } from "lemmy-js-client"
import "./post.scss"
import PostOptions from "./PostOptions";

export default function Post(props: { post: PostView }) {
    const post = props.post.post;
    const creator = props.post.creator;
    const hasThumbnail = !!post.thumbnail_url;
    const thumbnail = post.thumbnail_url;
    const name = post.name;
    return <article className="post">
        <div className="columns">
            <div className="thumbnail-container">
                {hasThumbnail
                    ? <img src={thumbnail} className="thumbnail"></img>
                    : <div className="thumbnail-placeholder">
                        <span className="material-symbols-outlined">comment</span>
                    </div>}
            </div>
            <div className="title-container">
                <h2>{name}</h2>
                <div className="by-user">by {creator.name}</div>
                <PostOptions post={props.post}></PostOptions>
            </div>
        </div>
    </article>
}