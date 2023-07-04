import { PostView } from "lemmy-js-client"
import "./postListing.scss"
import PostOptions from "./PostOptions";
import { Link } from "react-router-dom";
import { formatCreator } from "../../helpers/user-helper";

export default function PostListing(props: { post: PostView, isOpen: boolean }) {
    const post = props.post.post;
    const isOpen = props.isOpen;
    const creator = formatCreator(props.post.creator);
    const hasThumbnail = !!post.thumbnail_url;
    const thumbnail = post.thumbnail_url;
    const name = post.name;
    return <article className={"postListing" + (isOpen ? " post-highlighted" : "") }>
        <div className="columns">
            <div className="thumbnail-container">
                {hasThumbnail
                    ? <img src={thumbnail} className="thumbnail"></img>
                    : <div className="thumbnail-placeholder">
                        <span className="material-symbols-outlined">comment</span>
                    </div>}
            </div>
            <div className="title-container">
                <h2><Link to={"post/" + post.id}>{name}</Link></h2>
                <div className="by-user">by <a href={props.post.creator.actor_id}>{creator}</a></div>
                <PostOptions post={props.post}></PostOptions>
            </div>
        </div>
    </article>
}