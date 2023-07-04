import { useParams } from "react-router-dom";
import { getClient } from "../../lemmy-client/client";
import Comment from "./Comment";
import "./PostView.scss"

export default function PostView() {
    let { postId } = useParams();
    const client = getClient();
    const { data, isLoading, error } = client.getSinglePost(parseInt(postId || "-1", 10));
    if (isLoading || !data) {
        return <div>Loading</div>
    }
    if (!postId || error) {
        return <div>Error</div>
    }
    const [post, comments] = data!;
    const isImage = isImageUrl(post.post_view.post.url);
    const commentComponents = comments.get("0")!.map(comment => <Comment key={comment.comment.id} comment={comment} comments={comments} />)
    return <div className="post-view">
        <h1>{post.post_view.post.name}</h1>
        <div className="post-content">
            {isImage ? <img src={post.post_view.post.url}></img> : ""}
        </div>
        <div className="post-comments">{commentComponents}</div>

    </div>;
}

function isImageUrl(url: string | undefined) {
    if (!url) {
        return false;
    }
    const regex = /\.(jpg|jpeg|png|gif|webp)($|\?.*)/;
    return regex.test(url);
}