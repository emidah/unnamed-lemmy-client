import { useParams } from "react-router-dom";
import { getClient } from "../../lemmy-client/client";
import Comment from "./Comment";
import "./PostView.scss"
import MarkdownIt from "markdown-it";
import { Error } from "../message/Error";
import Loading from "../message/Loading";
import sanitizeUrl from "../../helpers/sanitizer";
const md = new MarkdownIt();

export default function PostView() {
    let { postId } = useParams();
    const client = getClient();
    const { data, isLoading, error } = client.getSinglePost(parseInt(postId || "-1", 10));
    if (isLoading) {
        return <Loading />
    }
    if (!data || !postId || error) {
        return <Error />
    }
    const [post, comments] = data!;
    const isImage = isImageUrl(post.post_view.post.url);
    const commentComponents = comments.get("0")!.map(comment => <Comment key={comment.comment.id} comment={comment} comments={comments} />)
    return <div className="post-view">
        <h1>{post.post_view.post.name}</h1>
        <div className="post-content">
            {post.post_view.post.url && isImage ? 
                <a href={sanitizeUrl(post.post_view.post.url)} target="_blank">
                    <img src={post.post_view.post.url}></img>
                </a> : ""}
            {post.post_view.post.url && !isImage ? <a href={sanitizeUrl(post.post_view.post.url)} target="_blank">{post.post_view.post.url}</a> : ""}
            {post.post_view.post.body ? <div className="post-body" dangerouslySetInnerHTML={{ __html: md.render(post.post_view.post.body!) }}></div> : ""}
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