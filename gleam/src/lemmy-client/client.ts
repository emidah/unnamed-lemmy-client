import { LemmyHttp, GetPostsResponse, Instance, GetPostResponse, CommentView } from 'lemmy-js-client';
import { SWRResponse } from 'swr';
import useSWRImmutable from 'swr/immutable';

const clients = new Map<string, LemmyClient>();

const getClient = () => {
    const url = "http://localhost:3000";
    if (clients.has(url)) {
        return clients.get(url)!;
    }
    const client = new LemmyHttp(url);
    const toReturn: LemmyClient = {
        getMainPosts: (page: number) => getMainPosts(client, page),
        getFederated: () => getFederated(client),
        getSinglePost: (id: number) => getSinglePost(client, id),
        invalidate: (action) => (action),
    };
    clients.set(url, toReturn);
    return toReturn;
};

function getMainPosts(client: LemmyHttp, page: number) {
    return useSWRImmutable("getMainPosts/" + page, () => log('get posts page ' + page) && client.getPosts({ type_: "All", page, limit: 40, sort: "TopDay" }))
}

function getFederated(client: LemmyHttp) {
    return useSWRImmutable("getFederated", () => log('get instances') && getFederatedInstances(client))
};

function getSinglePost(client: LemmyHttp, id: number){
    const action = async () => {
        const post = client.getPost({ id: id });
        const comments = client.getComments({ post_id: id, max_depth: 8, sort: "Hot", type_: "All", limit: 50 });
        await Promise.all([post, comments]);
        const commentMap = new Map<String, CommentView[]>();
        (await comments).comments.forEach(comment => {
            const lastDot = comment.comment.path.lastIndexOf(".");
            const parentPath = comment.comment.path.substring(0, lastDot);
            let parentReplies = commentMap.get(parentPath);
            if (!parentReplies) {
                parentReplies = [];
                commentMap.set(parentPath, parentReplies);
            }
            parentReplies.push(comment);
        });
        const postResult = await post;
        return [postResult, commentMap] as [GetPostResponse, Map<string, CommentView[]>];
    }
    return useSWRImmutable<[GetPostResponse, Map<string, CommentView[]>]>("getSinglePost/" + id, () => log('get single post ' + id) && action())
};


function log(method: string): true {
    console.log(method);
    return true;
}

type LemmyClient = {
    getMainPosts: (page: number) => SWRResponse<GetPostsResponse, any, any>;
    getFederated: () => SWRResponse<Map<number, Instance>, any, any>;
    getSinglePost: (id: number) => SWRResponse<[GetPostResponse, Map<string, CommentView[]>], any, any>;
    invalidate: (action: LemmyAction) => void;
}

type LemmyAction = "getMainPosts" | "getFederated";

export { getClient };
export type { LemmyClient }

async function getFederatedInstances(client: LemmyHttp) {
    const federated = await client.getFederatedInstances();
    const map = new Map<number, Instance>();
    federated.federated_instances!.linked.forEach(instance => map.set(instance.id, instance));
    return map;
}

