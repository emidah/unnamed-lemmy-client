import { useParams } from "react-router-dom";

export default function PostView(){
    let { postId } = useParams();
    return <div style={{width: "50vw"}}>Hello there! Post {postId}</div>;
}