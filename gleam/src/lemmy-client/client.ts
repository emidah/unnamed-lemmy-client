import { LemmyHttp, GetPostsResponse, Instance } from 'lemmy-js-client';
import { SWRResponse } from 'swr';
import useSWRImmutable from 'swr/immutable';

const clients = new Map<string, LemmyClient>();

const getClient = () => { 
    const url = "http://localhost:3000";
    if(clients.has(url)){
        return clients.get(url)!;
    }
    const client = new LemmyHttp(url);
    const toReturn: LemmyClient = {
        getMainPosts: (page: number) => getMainPosts(client, page),
        getFederated: () => getFederated(client),
        invalidate: (action) => (action),
    };
    clients.set(url, toReturn);
    return toReturn;
};

function getMainPosts(client: LemmyHttp, page: number){
    return useSWRImmutable("getMainPosts", () => log('get posts') && client.getPosts({ type_: "All", page, limit: 40, sort: "TopDay" }))
}

function getFederated(client: LemmyHttp) {
    return useSWRImmutable("getFederated", () => log('get instances') && getFederatedInstances(client))
};

function log(method: string): true{
    console.log(method);
    return true;
}

type LemmyClient = {
    getMainPosts: (page: number) => SWRResponse<GetPostsResponse, any, any>;
    getFederated: () => SWRResponse<Map<number, Instance>, any, any>;
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
