import { PostView } from "lemmy-js-client"
import "./postListing.scss"
import PostOptions from "./PostOptions";
import { getClient } from "../../lemmy-client/client";
import { Link } from "react-router-dom";

export default function PostListing(props: { post: PostView }) {
    const post = props.post.post;
    const creator = formatCreator(props.post);
    const hasThumbnail = !!post.thumbnail_url;
    const thumbnail = post.thumbnail_url;
    const name = post.name;
    return <article className="postListing">
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

function formatCreator(post: PostView): string {
    const client = getClient();
    const { data: federated } = client.getFederated();
    let instanceName: string = "???";
    if(federated){
       const instance = federated.get(post.creator.instance_id);
       instanceName = instance?.domain ?? instanceName;
    }
    const name = `@${post.creator.name}@${instanceName}`;
    return name;
}