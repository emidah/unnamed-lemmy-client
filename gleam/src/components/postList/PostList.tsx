import { PostView } from "lemmy-js-client";
import PostListing from "./PostListing";
import "./postList.scss"
import { useParams } from "react-router";

export default function PostList(posts: PostView[]) {
  let { postId } = useParams();
  return <div className="postList">
    {posts.map((postItem => <PostListing isOpen={String(postItem.post.id) === postId} key={postItem.post.id} post={postItem}></PostListing>))}
  </div>
}
