import { PostView } from "lemmy-js-client";
import Post from "./post";
import "./postList.scss"

export default function PostList(posts: PostView[]) {
    return <div className="postList">
        {posts.map((postItem => <Post key={postItem.post.id} post={postItem}></Post>))}
    </div>
}