import { PostView } from "lemmy-js-client";
import PostListing from "./PostListing";
import "./postList.scss"

export default function PostList(posts: PostView[]) {
  return <div className="postList">
    {posts.map((postItem => <PostListing key={postItem.post.id} post={postItem}></PostListing>))}
  </div>
}
